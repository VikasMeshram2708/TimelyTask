import { JSX } from "react";

type NavItem = {
  title: string;
  url: string;
  icon: JSX.Element;
};

type sanitizeErrorType = {
  title?: string[] | undefined;
  description?: string[] | undefined;
  dueDate?: string[] | undefined;
  priority?: string[] | undefined;
  state?: string[] | undefined;
};

const StateEnum = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]);
type StateEnum = z.infer<typeof StateEnum>;

const PriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);
type PriorityEnum = z.infer<typeof PriorityEnum>;

type Reminder = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  state: StateEnum;
  priority: PriorityEnum;
  createdAt: string;
  updatedAt: string;
  userId: string;
};
