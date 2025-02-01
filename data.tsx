import { Clock10, GlobeLock, Home, NotepadText, ReceiptText, Store } from "lucide-react";
import { NavItem } from "./types";

export const navItem: NavItem[] = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Playground",
    url: "/playgronud",
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
