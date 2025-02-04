"use client";

import { useStore } from "@/app/store";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteReminder } from "@/data-access/actions";
import { cn } from "@/lib/utils";
import React, { FormEvent } from "react";
import toast from "react-hot-toast";

export default function DeleteReminder({ remId }: { remId: string }) {
  const onDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await deleteReminder({ id: remId });
    if (res.error) {
      return toast.error(res.error);
    }
    return toast.success(res.message);
  };
  return (
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
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction asChild>
              <form onSubmit={onDelete}>
                <Button type="submit">Confirm</Button>
              </form>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenuItem>
  );
}
