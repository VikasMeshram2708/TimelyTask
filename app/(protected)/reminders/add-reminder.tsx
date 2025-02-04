"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { reminderSchema } from "@/models/reminder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setReminder } from "@/data-access/actions";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { sanitizeErrorType } from "@/types";
import * as z from "zod";

export default function AddReminder() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState<sanitizeErrorType | null>(null);
  const dialogRef = useRef<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState(false);

  // Define form type based on schema
  type FormData = z.infer<typeof reminderSchema>;

  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      priority: "LOW",
      state: "PENDING",
    },
    resolver: zodResolver(reminderSchema),
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", { ...data, dueDate: date });
    setLoading(true);

    // Make API call / server action call
    const res = await setReminder(data);

    if (!res.success) {
      if (res.sanitizeError) {
        setError({
          description: res.sanitizeError.description,
          title: res.sanitizeError.title,
          dueDate: res.sanitizeError.dueDate,
          priority: res.sanitizeError.priority,
          state: res.sanitizeError.state,
        });
      } else {
        toast.error(res.error || "Something went wrong");
      }
      return;
    }

    // Reset errors and show success message
    setError(null);
    setLoading(false);
    toast.success(res.message || "Reminder set successfully");

    // Reset form and close modal
    form.reset();
    dialogRef.current?.click();
  };

  return (
    <section>
      <Dialog>
        <DialogTrigger ref={dialogRef} asChild>
          <Button variant="outline" type="button">
            Add Reminder
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95%] sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] overflow-y-auto max-h-[90vh]">
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle>Set a Reminder</DialogTitle>
            <DialogDescription>Increase your productivity.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            {loading ? (
              <div className="flex flex-col items-center justify-center h-80">
                <div className="flex gap-4 items-center">
                  <p className="text-lg font-bold">Please wait...</p>
                  <span className="loader dark:text-white"></span>
                </div>
              </div>
            ) : (
              <form
                className="b grid gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col md:flex-row gap-5">
                  <FormField
                    name="priority"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Priority</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Set Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="LOW">Low</SelectItem>
                            <SelectItem value="MEDIUM">Medium</SelectItem>
                            <SelectItem value="HIGH">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="dueDate"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full">
                                {date ? date.toDateString() : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(selectedDate) => {
                                  setDate(selectedDate);
                                  field.onChange(selectedDate);
                                }}
                                className="rounded-md border"
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="state"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Set Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IN_PROGRESS">
                            In Progress
                          </SelectItem>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button className="w-full md:w-auto" type="submit">
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            )}
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
