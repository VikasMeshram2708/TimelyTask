import {
  Clock10,
  GlobeLock,
  Home,
  NotepadText,
  ReceiptText,
  Store,
} from "lucide-react";
import { NavItem } from "./types";

export const navItem: NavItem[] = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Playground",
    url: "/playground",
    icon: <Clock10 />,
  },
  {
    title: "About",
    url: "/about",
    icon: <Store />,
  },
  {
    title: "Privacy",
    url: "/privacy",
    icon: <GlobeLock />,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: <ReceiptText />,
  },
  {
    title: "Terms & Condition",
    url: "/terms",
    icon: <NotepadText />,
  },
];

export const profileDropDownItems = [
  {
    title: "Profile",
    url: "/dashboard/profile",
  },
  {
    title: "Billing",
    url: "/dashboard/billing",
  },
  {
    title: "Logout",
    url: "/api/auth/signout",
  },
  {
    title: "Subscription",
    url: "/dashboard/subscription",
  },
];
