import Link from "next/link";
import React from "react";

import { Button } from "../ui/button";
import Image from "next/image";
import { ModeToggle } from "../mode-toggle";
import { NavItemsMenu } from "./navitems-menu";
import googleImg from "@/public/header/google.png";
import { auth, signIn } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import { profileDropDownItems } from "@/data";

export default async function Navbar() {
  const session = await auth();

  if (session?.user) {
    return (
      <header>
        <div className="container mx-auto p-5 flex items-center justify-between">
          {/* Mobile Nav */}
          <NavItemsMenu />

          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold">
            <Link href="/">TimelyTask</Link>
          </h1>

          {/* Profile  & theme*/}
          <section className="flex items-center gap-4">
            <ProfileDropdown auth={session.user} />
            <ModeToggle />
          </section>
        </div>
      </header>
    );
  }
  // Non authenticated navbar
  return (
    <header>
      <div className="container mx-auto p-5 flex items-center justify-between">
        {/* Mobile Nav */}
        <NavItemsMenu />

        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold">
          <Link href="/">TimelyTask</Link>
        </h1>

        {/* Auth  & theme*/}
        <section className="flex items-center gap-4">
          <AuthButton />
          <ModeToggle />
        </section>
      </div>
    </header>
  );
}

export function AuthButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" className="hidden md:flex" variant={"outline"}>
        <Image
          width={25}
          height={25}
          alt="google authentication using 0auth"
          src={googleImg}
          className="bg-cover"
        />
        Sign in with Google
      </Button>
    </form>
  );
}

function ProfileDropdown({ auth }: { auth: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={auth.image as string} alt={auth.name as string} />
          <AvatarFallback className="uppercase">
            {auth.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileDropDownItems?.map((item) => (
          <DropdownMenuItem key={item.title} className="capitalize">
            <Link href={item.url}>{item.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
