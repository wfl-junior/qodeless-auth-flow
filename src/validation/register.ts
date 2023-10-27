import { z } from "zod";
import { loginValidationSchema } from "./login";

export const registerValidationSchema = loginValidationSchema
  .extend({ passwordConfirmation: z.string().optional() })
  .superRefine(({ password, passwordConfirmation }, context) => {
    if (passwordConfirmation !== password) {
      context.addIssue({
        code: "custom",
        path: ["passwordConfirmation"],
        message: "A confirmação está incorreta",
      });
    }
  });

export type RegisterFormInput = z.input<typeof registerValidationSchema>;
