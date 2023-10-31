import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { database } from "~/database";
import { users } from "~/database/schemas/users";
import { sign } from "~/utils/accessToken";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  GOOGLE_AUTH_REDIRECT_URL,
  JWT_DURATION_IN_SECONDS,
} from "~/utils/constants";
import { accessTokenValidationSchema } from "~/validation/access-token";
import { googleUserValidationSchema } from "~/validation/google-user";

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

    const accessTokenResponse = await axios.postForm<AccessTokenResponse>(
      "https://www.googleapis.com/oauth2/v4/token",
      {
        code,
        grant_type: "authorization_code",
        redirect_uri: GOOGLE_AUTH_REDIRECT_URL,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      },
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        params: {
          access_token: accessTokenValidationSchema.parse(
            accessTokenResponse.data,
          ).access_token,
        },
      },
    );

    const userInfo = googleUserValidationSchema.parse(userResponse.data);

    const [user] = await database
      .insert(users)
      .values({
        googleId: userInfo.sub,
      })
      .onConflictDoUpdate({
        target: users.googleId,
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
