"use client";

import { navItem, profileDropDownItems } from "@/data";
import Link from "next/link";
import React from "react";
// import { Button } from "../ui/button";
// import googleImg from "@/public/header/googleImg.png";
// import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import { useWindowSize } from "@uidotdev/usehooks";
import { ModeToggle } from "../mode-toggle";
import { motion } from "motion/react";
// import { signIn } from "next-auth/react";
import AuthButton from "./auth-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { data, status } = useSession();
  const { width } = useWindowSize();

  if (width && width < 768) {
    return (
      <header className="p-4">
        <div className="container mx-auto flex items-center justify-between">
          <SideBar />
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl lg:text-4xl font-bold"
          >
            <Link href="/">TimelyShift</Link>
          </motion.h1>
          <ModeToggle />
        </div>
      </header>
    );
  }

  return (
    <header className="p-4">
      <div className="container mx-auto flex items-center justify-between gap-7">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl lg:text-4xl font-bold"
        >
          <Link href="/">TimelyShift</Link>
        </motion.h1>
        <nav>
          <ul className="flex items-center gap-5 text-sm">
            {navItem.map((item, index) => (
              <motion.li
                key={item.url}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="capitalize hover:text-primary transition-colors"
              >
                <Link href={item.url}>{item.title}</Link>
              </motion.li>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: navItem.length * 0.1 }}
            >
              {status === "authenticated" && data ? (
                <ProfileDropdown auth={data.user || null} />
              ) : (
                <AuthButton />
              )}
            </motion.div>
            <ModeToggle />
          </ul>
        </nav>
      </div>
    </header>
  );
}

function SideBar() {
  const { data, status } = useSession();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={"24"} />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">
            <Link href="/">TimelyTask</Link>
          </SheetTitle>
          <SheetDescription className="py-10" asChild>
            <ul className="grid gap-7">
              {navItem.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.url}
                    className={cn("capitalize flex items-center gap-2", {})}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetDescription>
          <SheetFooter>
            {data && status === "authenticated" ? (
              <Button
                onClick={() => signOut()}
                className="w-full"
                variant={"destructive"}
              >
                <LogOut />
                Logout
              </Button>
            ) : (
              <Button>ok</Button>
            )}
          </SheetFooter>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

function ProfileDropdown({ auth }: { auth: User | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={auth?.image as string} alt={auth?.name as string} />
          <AvatarFallback className="uppercase">
            {auth?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileDropDownItems?.map((item) => (
          <DropdownMenuItem key={item.title} className="capitalize">
            <Link href={item.url} className="w-full">
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
