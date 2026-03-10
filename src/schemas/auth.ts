import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Please enter a valid luxury-grade email address"),
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username is too long"),
  password: z.string().min(8, "Password must be at least 8 characters for maximum security"),
  role: z.enum(["SELLER", "BIDDER"], {
    required_error: "Please select your role within the Aureus ecosystem",
  }),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid luxury-grade email address"),
  password: z.string().min(1, "Password is required to access your vault"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
