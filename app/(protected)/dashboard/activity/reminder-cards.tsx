"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ReminderState, Priority } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { ReminderDropDown } from "./page";
import { sliceDate } from "@/lib/date-formatter";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterReminderSchema } from "@/models/reminder";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type ReminderCardsProps = {
  data:
    | {
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        dueDate: Date;
        description: string | null;
        state: ReminderState;
        priority: Priority;
        userId: string | null;
      }[]
    | undefined;
};

export default function ReminderCards({ data }: ReminderCardsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const searchQuery = useDebounce(searchTerm, 500);

  useEffect(() => {
    function filterItems() {
      // sanitize the inc data
      const sanitize = filterReminderSchema.safeParse({
        searchValue: searchQuery,
      });

      if (!sanitize.success) {
        const er = sanitize.error.flatten().fieldErrors.searchValue;
        return toast(er || "Please provide valid data");
      }

      const res = data?.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log("filt", filteredData);
      return setFilteredData(res);
    }
    if (searchQuery.length) filterItems();
  }, [searchQuery]);

  return (
    <section className="w-full flex flex-col gap-3">
      {filteredData && filteredData.length === 0 ? "No reminders found" : ""}
      <section className="flex items-center gap-5 justify-between">
        <section className="flex gap-2 w-full">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="text-sm w-full max-w-lg"
            placeholder="Type here"
          />
          <Button onClick={() => location.reload()}>Refresh</Button>
          {searchQuery.length > 1 && (
            <>
              <Button variant={"destructive"} onClick={() => setSearchTerm("")}>
                <X />
              </Button>
            </>
          )}
        </section>

        {/* Sorting */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Descending</SelectItem>
            <SelectItem value="dec">Ascending</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Dropdown */}
      <ul className="grid gap-4">
        {filteredData?.map((reminder) => (
          <Card key={reminder.id}>
            <CardHeader>
              <section className="flex justify-between">
                <CardTitle className="capitalize">{reminder.title}</CardTitle>
                {/* Drop Down */}
                <ReminderDropDown remId={reminder.id} />
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
    </section>
  );
}
