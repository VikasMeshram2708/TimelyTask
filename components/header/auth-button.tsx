"use client";

import React from "react";
import googleImg from "@/public/header/googleImg.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function AuthButton() {
  return (
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
  );
}
