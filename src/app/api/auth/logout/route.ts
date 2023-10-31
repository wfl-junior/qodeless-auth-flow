import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE_NAME } from "~/utils/constants";

export async function GET(request: NextRequest) {
  const redirectUrl = new URL("/login", request.url);
  const response = NextResponse.redirect(redirectUrl);

  response.cookies.delete({
    path: "/",
    httpOnly: true,
    name: ACCESS_TOKEN_COOKIE_NAME,
  });

  return response;
}
