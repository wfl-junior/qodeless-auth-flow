import { z } from "zod";

export const googleUserValidationSchema = z.object({
  sub: z.string(),
});
