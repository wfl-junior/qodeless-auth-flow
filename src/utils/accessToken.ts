import { SignJWT, jwtVerify } from "jose";
import { JWT_DURATION_IN_SECONDS } from "./constants";

export interface JwtPayload {
  sub: string;
}

export async function sign(payload: JwtPayload): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + JWT_DURATION_IN_SECONDS;

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

export async function verify(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );

  return payload as JwtPayload;
}
