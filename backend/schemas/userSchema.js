import { z } from "zod";

const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
      "Name can only contain letters"
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),
})

// update user schema
const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
      "Name can only contain letters"
    )
    .optional(),

  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .optional(),
})

export { createUserSchema, updateUserSchema };