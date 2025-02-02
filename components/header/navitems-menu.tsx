"use client";

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
import { navItem } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import googleImg from "@/public/header/google.png";
import { useWindowSize } from "@uidotdev/usehooks";
import { signIn, signOut, useSession } from "next-auth/react";

// Component for small screens
const NavItemsMenuSM = () => {
  const { data, status } = useSession();

  if (data && status === "authenticated") {
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
              <Button
                onClick={() => signOut()}
                className="w-full"
                variant={"destructive"}
              >
                <LogOut />
                Logout
              </Button>
            </SheetFooter>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }
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
            <Button
              onClick={() => signIn("google")}
              className="w-full"
              variant={"outline"}
            >
              <Image
                width={25}
                height={25}
                alt="google authentication using 0auth"
                src={googleImg}
                className="bg-cover"
              />
              Sign in with Google
            </Button>
          </SheetFooter>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

// Component for medium screens
const NavItemsMenuMD = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={"24"} />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">
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
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export function NavItemsMenu() {
  const { width } = useWindowSize();

  // Determine which component to render based on screen width
  if (width && width < 768) {
    return <NavItemsMenuSM />;
  } else {
    return <NavItemsMenuMD />;
  }
}
