import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ReminderState, Priority, Reminder } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { ReminderDropDown } from "./page";
import { sliceDate } from "@/lib/date-formatter";

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
  return (
    <ul className="grid gap-4">
      {data?.map((reminder) => (
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
  );
}
