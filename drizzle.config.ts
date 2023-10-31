import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: "./.env.local" });

export default {
  schema: "./src/database/schemas/*",
  out: "./src/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_CONNECTION_STRING,
  },
} satisfies Config;
