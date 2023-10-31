import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { cache } from "react";
import { database } from "~/database";
import { User, users } from "~/database/schemas/users";
import { verify } from "./accessToken";
import { ACCESS_TOKEN_COOKIE_NAME } from "./constants";

export const getAuthenticatedUser = cache(async (): Promise<User | null> => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const { sub } = await verify(accessToken);
    const [user] = await database.select().from(users).where(eq(users.id, sub));
    return user ?? null;
  } catch (error) {
    console.error(error);
    cookies().delete(ACCESS_TOKEN_COOKIE_NAME);
    return null;
  }
});
