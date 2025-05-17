// zodSchemas.ts
import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mobile: z.string().min(10, "Invalid mobile number"),
  address: z.string().min(3, "Address is too short")
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(3, "Password must be at least 6 characters"),
});
