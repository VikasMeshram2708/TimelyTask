import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const DashBoardPage = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin/google");
  }
  return <div>{children}</div>;
};

export default DashBoardPage;
