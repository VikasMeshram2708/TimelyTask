import { z } from "zod";

// Define enums for priority and state
const PriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);
type PriorityEnum = z.infer<typeof PriorityEnum>;

const StateEnum = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]);
type StateEnum = z.infer<typeof StateEnum>;

export const reminderSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"), // Add length validation
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"), // Add length validation
  dueDate: z.coerce.date().refine((date) => date > new Date(), {
    message: "Due date must be in the future", // Ensure due date is in the future
  }),
  priority: PriorityEnum.default("LOW"), // Default to LOW if not provided
  state: StateEnum.default("PENDING"), // Default to PENDING if not provided
});

// Infer the type from the schema
export type reminderSchema = z.infer<typeof reminderSchema>;

/**
 * Delete Schema
 */

export const deleteReminderSchema = z.object({
  id: z.string({ required_error: "Reminder id is required" }).uuid(),
});

// Infer the type from the schema
export type deleteReminderSchema = z.infer<typeof deleteReminderSchema>;
