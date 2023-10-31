import { hash } from "bcrypt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { database } from "~/database";
import { users } from "~/database/schemas/users";
import { sign } from "~/utils/accessToken";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  JWT_DURATION_IN_SECONDS,
} from "~/utils/constants";
import { loginValidationSchema } from "~/validation/login";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const credentials = loginValidationSchema.parse(body);

    const [user] = await database
      .insert(users)
      .values({
        email: credentials.email,
        password: await hash(credentials.password, 10),
      })
      .returning({ id: users.id });

    const accessToken = await sign({ sub: user.id });

    cookies().set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      path: "/",
      httpOnly: true,
      maxAge: JWT_DURATION_IN_SECONDS,
    });

    return NextResponse.json({ sucess: true }, { status: 200 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("users_email_unique")
    ) {
      return NextResponse.json({ success: false }, { status: 409 });
    }

    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
