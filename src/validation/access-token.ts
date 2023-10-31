import { z } from "zod";

export const accessTokenValidationSchema = z.object({
  access_token: z.string(),
});
