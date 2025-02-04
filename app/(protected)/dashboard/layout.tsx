"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ActivityIcon, LogOut, Rss, Settings, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  const data = [
    { icon: <UserIcon />, title: "Profile", url: "/dashboard/profile" },
    { icon: <ActivityIcon />, title: "Activity", url: "/dashboard/activity" },
    { icon: <Rss />, title: "Billing", url: "/dashboard/billing" },
    { icon: <Settings />, title: "Settings", url: "/dashboard/settings" },
  ];

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto flex flex-col md:flex-row">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 md:w-80 w-full md:h-screen bg-muted/40 rounded-3xl md:sticky md:top-0"
        >
          <ul className="grid gap-7 mt-10">
            {data.map((item, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "rounded-xl",
                  `${
                    path === item.url
                      ? "dark:bg-muted/50 bg-muted text-primary font-bold"
                      : "text-foreground dark:text-primary-foreground"
                  }`
                )}
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-3 capitalize w-full p-2"
                >
                  {item.icon}
                  {item.title}
                </Link>
              </motion.li>
            ))}
            <Button className="font-bold" variant={"destructive"}>
              <LogOut />
              Logout
            </Button>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 rounded-3xl p-5"
        >
          <Suspense
            fallback={
              <div
                className="flex flex-col items-center justify-center w-full min-h-screen"
              >
                <span className="loader dark:text-white"></span>
              </div>
            }
          >
            {children}
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}
