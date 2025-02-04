"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { reminderSchema } from "@/models/reminder";
import { revalidatePath } from "next/cache";

export const setReminder = async (incData: unknown) => {
  const authResult = await auth();

  if (!authResult) {
    return {
      error: "Unauthorized",
      success: false,
    };
  }

  try {
    // Sanitize the incoming data
    const sanitize = reminderSchema.safeParse(incData);

    if (!sanitize.success) {
      return {
        success: false,
        sanitizeError: sanitize.error.flatten().fieldErrors,
      };
    }

    await prisma.reminder.create({
      data: {
        title: sanitize.data.title,
        description: sanitize.data.description,
        dueDate: sanitize.data.dueDate,
        priority: sanitize.data.priority,
        state: sanitize.data.state,
        User: {
          connect: {
            email: String(authResult.user?.email),
          },
        },
      },
    });

    revalidatePath("/playground");

    return {
      success: true,
      message: "Reminder set successfully",
    };
  } catch (error) {
    console.error(`Failed to set reminder: ${error}`);
    return {
      success: false,
      error: "Failed to set reminder. Please try again.",
    };
  }
};
