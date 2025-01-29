import { z } from "zod";
import mongoose from "mongoose";

// Add book api's body schema
export const addBookSchema = z.object({
  title: z
    .string({ invalid_type_error: "title must be string", required_error: "title required" })
    .min(1, "title required"),
  author: z
    .string({ invalid_type_error: "author must be string", required_error: "author required" })
    .min(1, "author required"),
  isbn: z
    .string({ invalid_type_error: "isbn must be string", required_error: "isbn required" })
    .min(1, "isbn required")
    .regex(/^\d{3}-\d{1}-\d{4}-\d{4}-\d{1}$/, "Invalid ISBN format, it should be like xxx-x-xxxx-xxxx-x"),
});

// Get and delete book api's body schema
export const getDeleteBookSchema = z.object({
  id: z
    .string({ invalid_type_error: "id must be string", required_error: "id required" })
    .min(1, "id required")
    .refine((value) => mongoose.isValidObjectId(value), {
      message: "Invalid mongo objectId",
    }),
});

// Update book api's body schema
export const updateBookSchema = z.object({
  id: z
    .string({ invalid_type_error: "id must be string", required_error: "id required" })
    .min(1, "id required")
    .refine((value) => mongoose.isValidObjectId(value), {
      message: "Invalid mongo objectId",
    }),
  title: z.string({ invalid_type_error: "title must be string" }).optional(),
  author: z.string({ invalid_type_error: "author must be string" }).optional(),
  isbn: z
    .string({ invalid_type_error: "isbn must be string" })
    .optional()
    .refine((val) => !val || (val.length > 0 && /^\d{3}-\d{1}-\d{4}-\d{4}-\d{1}$/.test(val)), {
      message: "Invalid ISBN format, it should be like xxx-x-xxxx-xxxx-x",
    }),
});
