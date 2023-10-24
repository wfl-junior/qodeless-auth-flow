declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    DATABASE_CONNECTION_STRING: string;

    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    GITHUB_CLIENT_SECRET: string;
    NEXT_PUBLIC_GITHUB_CLIENT_ID: string;
  }
}
