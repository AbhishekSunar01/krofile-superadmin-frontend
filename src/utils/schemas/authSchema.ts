import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email("This is not a valid email."),
  password: z.string().min(1, { message: "Password is required!" }),
  remember: z.boolean().default(false).optional(),
});
