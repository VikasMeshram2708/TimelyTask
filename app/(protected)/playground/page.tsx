"use client";

import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { reminderSchema } from "@/models/reminder";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { z } from "zod";

const PlayGroundPage: NextPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Define form type based on schema
  type FormData = z.infer<typeof reminderSchema>;

  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      priority: "LOW",
      state: "IN_PROGRESS",
    },
    resolver: zodResolver(reminderSchema),
  });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log("Form Data:", { ...data, dueDate: date });
    form.reset();
  };
  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-6 py-2">
        <h1 className="text-xl md:text-2xl font-bold py-10">PlayGround</h1>
        <section>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" type="button">
                Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95%] sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] overflow-y-auto max-h-[90vh]">
              <DialogHeader className="flex items-center justify-center">
                <DialogTitle>Set a Reminder</DialogTitle>
                <DialogDescription>
                  Increase your productivity.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  className="grid gap-5"
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
                  <DialogFooter>
                    <Button className="w-full md:w-auto" type="submit">
                      Save changes
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </div>
  );
};

export default PlayGroundPage;
