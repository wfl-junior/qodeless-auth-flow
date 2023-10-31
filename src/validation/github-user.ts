import { z } from "zod";

export const githubUserValidationSchema = z.object({
  id: z.number(),
});
