import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email("This is not a valid email."),
  password: z.string().min(1, { message: "Password is required!" }),
  remember: z.boolean().default(false).optional(),
});

export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required!",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
});
