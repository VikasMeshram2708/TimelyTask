"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { deleteReminderSchema, reminderSchema } from "@/models/reminder";
import { revalidatePath } from "next/cache";

// Set Reminder
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

    revalidatePath("/reminders");

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

// Get Reminders
export const getReminders = async () => {
  const authResult = await auth(); // Check if the user is authenticated

  if (!authResult) {
    return {
      error: "Unauthorized",
      success: false,
    };
  }

  try {
    // check the count
    const remindersCount = await prisma.reminder.count({
      where: {
        User: {
          email: String(authResult.user?.email),
        },
      },
    });

    // get only 5 reminders
    const reminders = await prisma.reminder.findMany({
      where: {
        User: {
          email: String(authResult.user?.email),
        },
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!reminders) {
      return {
        success: false,
        error: "No reminders found",
      };
    }

    return {
      success: true,
      meta: {
        count: remindersCount,
        data: reminders,
      },
    };
  } catch (error) {
    console.error(`Failed to get reminder: ${error}`);
    return {
      success: false,
      error: "Failed to get reminder. Please try again.",
    };
  }
};

// Delete Reminder
export const deleteReminder = async (data: { id: string }) => {
  const authResult = await auth(); // Check if the user is authenticated

  if (!authResult) {
    return {
      error: "Unauthorized",
      success: false,
    };
  }

  try {
    // Sanitize the incoming data
    const sanitize = deleteReminderSchema.safeParse(data);
    if (!sanitize.success) {
      return {
        success: false,
        error: sanitize.error.flatten().fieldErrors,
      };
    }

    // Validate if the reminder exists
    const reminderExists = await prisma.reminder.findUnique({
      where: {
        id: sanitize.data.id, // Use the sanitized ID directly
        User: {
          email: authResult.user?.email as string,
        },
      },
    });

    if (!reminderExists) {
      return {
        success: false,
        error: "Reminder doesn't exist",
      };
    }

    // Delete the reminder
    await prisma.reminder.delete({
      where: {
        id: sanitize.data.id, // Corrected: Use the sanitized ID here
      },
    });

    // Optionally revalidate or refresh paths
    revalidatePath("/reminders");

    return {
      success: true,
      message: "Reminder deleted successfully",
    };
  } catch (error) {
    console.error(`Failed to delete reminder: ${error}`);
    return {
      success: false,
      error: "Failed to delete reminder. Please try again.",
    };
  }
};

// Get Profile
export const getProfile = async () => {
  const authResult = await auth(); // Check if the user is authenticated

  if (!authResult) {
    return {
      error: "Unauthorized",
      success: false,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: String(authResult.user?.email),
      },
      select: {
        createdAt: true,
        email: true,
        image: true,
        lastSeen: true,
        name: true,
        role: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "No user found",
      };
    }

    return {
      success: true,
      meta: {
        data: user,
      },
    };
  } catch (error) {
    console.error(`Failed to get user details: ${error}`);
    return {
      success: false,
      error: "Failed to get user details. Please try again.",
    };
  }
};
