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
