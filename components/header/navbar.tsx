import Link from "next/link";
import React from "react";

import { Button } from "../ui/button";
import Image from "next/image";
import { ModeToggle } from "../mode-toggle";
import { NavItemsMenu } from "./navitems-menu";
import googleImg from "@/public/header/google.png";

export default function Navbar() {
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
          <Button className="hidden md:flex" variant={"outline"}>
            <Image
              width={25}
              height={25}
              alt="google authentication using 0auth"
              src={googleImg}
              className="bg-cover"
            />
            Sign in with Google
          </Button>
          <ModeToggle />
        </section>
      </div>
    </header>
  );
}
