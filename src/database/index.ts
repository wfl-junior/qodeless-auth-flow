import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
});

export const database = drizzle(pool, { logger: true });
