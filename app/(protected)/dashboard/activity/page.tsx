import { Badge } from "@/components/ui/badge";

import { deleteReminder, getReminders } from "@/data-access/actions";
import { NextPage } from "next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";
import { EllipsisVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { sliceDate } from "@/lib/date-formatter";
import ReminderCards from "./reminder-cards";
import toast from "react-hot-toast";
import DeleteReminder from "./delete-reminder";

export const revalidate = 60;

const ActivityPage: NextPage = async () => {
  const allReminders = getReminders();
  const reminders = await allReminders;

  if (reminders && reminders.meta?.count === 0) {
    return (
      <div className="min-h-screen w-full">
        <h1 className="text-base py-5 md:text-xl lg:text-2xl font-bold">
          No Reminders
        </h1>
        <Button variant={"ghost"}>
          <Link href="/playground">Create Reminder</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-6 py-2">
        <h1 className="text-base py-5 md:text-xl lg:text-2xl font-bold">
          Last 5 Reminders
        </h1>
        <ReminderCards data={reminders.meta?.data} />
      </div>
    </div>
  );
};

export default ActivityPage;

export function ReminderDropDown({ remId }: { remId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Take Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Edit */}
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger
              className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
            >
              Edit
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>

        {/* Delete */}
        <DeleteReminder remId={remId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
