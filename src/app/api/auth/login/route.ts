import { compare } from "bcrypt";
import { and, eq, isNotNull } from "drizzle-orm";
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

    const user = await database.query.users.findFirst({
      where: and(isNotNull(users.password), eq(users.email, credentials.email)),
      columns: {
        id: true,
        password: true,
      },
    });

    if (!user || !(await compare(credentials.password, user.password!))) {
      return NextResponse.json({ sucess: false }, { status: 400 });
    }

    const accessToken = await sign({ sub: user.id });

    cookies().set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      path: "/",
      httpOnly: true,
      maxAge: JWT_DURATION_IN_SECONDS,
    });

    return NextResponse.json({ sucess: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
