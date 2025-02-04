import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getReminders } from "@/data-access/actions";
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

export const revalidate = 60;

const ActivityPage: NextPage = async () => {
  const sliceDate = (dateValue: string) => {
    return new Date(dateValue).toLocaleDateString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };
  const allReminders = getReminders();
  const reminders = await allReminders;

  if (reminders && reminders.meta?.count === 0) {
    return (
      <div className="min-h-screen w-full">
        <h1 className="text-base py-5 md:text-xl lg:text-2xl font-bold">No Reminders</h1>
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
        <ul>
          {reminders?.success &&
            reminders?.meta?.data.map((reminder) => (
              <Card key={reminder.id}>
                <CardHeader>
                  <section className="flex justify-between">
                    <CardTitle className="capitalize">
                      {reminder.title}
                    </CardTitle>
                    <ReminderDropDown />
                  </section>
                </CardHeader>
                <CardContent>
                  <p className="capitalize">{reminder.description}</p>
                </CardContent>
                <CardFooter>
                  <Badge>
                    Created on : {sliceDate(reminder.createdAt.toString())}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityPage;

function ReminderDropDown() {
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
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger
              className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
            >
              Delete
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
