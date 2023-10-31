import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { database } from "~/database";
import { users } from "~/database/schemas/users";
import { sign } from "~/utils/accessToken";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  JWT_DURATION_IN_SECONDS,
} from "~/utils/constants";
import { accessTokenValidationSchema } from "~/validation/access-token";
import { githubUserValidationSchema } from "~/validation/github-user";

interface AccessTokenResponse {
  access_token: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const accessTokenResponse = await axios.post<AccessTokenResponse>(
      "https://github.com/login/oauth/access_token",
      undefined,
      {
        params: {
          code,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        },
        headers: {
          Accept: "application/json",
        },
      },
    );

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${
          accessTokenValidationSchema.parse(accessTokenResponse.data)
            .access_token
        }`,
      },
    });

    const userInfo = githubUserValidationSchema.parse(userResponse.data);

    const [user] = await database
      .insert(users)
      .values({
        githubId: userInfo.id,
      })
      .onConflictDoUpdate({
        target: users.githubId,
        set: {
          updatedAt: new Date(),
        },
      })
      .returning({ id: users.id });

    const accessToken = await sign({ sub: user.id });

    cookies().set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      path: "/",
      httpOnly: true,
      maxAge: JWT_DURATION_IN_SECONDS,
    });

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
