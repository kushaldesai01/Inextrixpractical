import { z } from "zod";

// Login body schema
export const loginSchema = z.object({
  email: z
    .string({ invalid_type_error: "email must be string", required_error: "email required" })
    .min(1, "email required")
    .email("Invalid email"),
  password: z
    .string({ invalid_type_error: "password must be string", required_error: "password required" })
    .min(1, "password required"),
});

// Signup body schema
export const signupSchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be string", required_error: "name required" })
    .min(2, "name must be of atleast 2 characters"),
  email: z
    .string({ invalid_type_error: "email must be string", required_error: "email required" })
    .min(1, "email required")
    .email("Invalid email"),
  password: z
    .string({ invalid_type_error: "password must be string", required_error: "password required" })
    .min(8, "password must be of atleast 8 characters")
    .regex(/[A-Z]/, "password must contain atleast one capital letter")
    .regex(/[a-z]/, "password must contain atleast one small letter")
    .regex(/[0-9]/, "password must contain atleast one number")
    .regex(/[\W_]/, "password must contain atleast one special character"),
});
