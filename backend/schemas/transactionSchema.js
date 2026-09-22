import { z } from "zod";

// Create transaction schema
export const createTransactionSchema = z.object({
  title: z
  .string()
  .min(2, "Title must contain at least 2 characters")
  .regex(/[A-Za-z]/, "Title must contain at least one letter"),

  amount: z.number().positive("Amount must be positive"),

  type: z.enum(["income", "expense"]),

  category: z.string().min(1, "Category is required"),

  date: z.coerce.date().optional(),
});

// Update transaction schema can be the same as createTransactionSchema, but all fields are optional
export const updateTransactionSchema = z.object({
  title: z
  .string()
  .min(2, "Title must contain at least 2 characters")
  .regex(/[A-Za-z]/, "Title must contain at least one letter")
  .optional(),

  amount: z.number().positive("Amount must be positive").optional(),

  type: z.enum(["income", "expense"]).optional(),

  category: z.string().min(1, "Category is required").optional(),

  date: z.coerce.date().optional(),
});