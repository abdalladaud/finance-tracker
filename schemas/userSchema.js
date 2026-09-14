import { z } from "zod";

const createUserSchema = z.object({
  name: z
  .string()
  .min(1, "Name is required"),
  email: z
    .string()
    .email("Please provide a valid email")
    .toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),
});

// update user schema
const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .optional(),

  email: z
    .string()
    .email("Please provide a valid email")
    .toLowerCase()
    .optional(),
});

export { createUserSchema, updateUserSchema };