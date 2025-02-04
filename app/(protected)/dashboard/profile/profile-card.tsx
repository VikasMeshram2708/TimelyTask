"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { sliceDate } from "@/lib/date-formatter";
import { Mail, Bell, Settings, CreditCard } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";

type ProfileCardProps = {
  res: {
    createdAt: Date;
    email: string;
    image: string;
    lastSeen: Date;
    name: string;
    role: "USER" | "ADMIN";
    updatedAt: Date;
    subscription: [];
  };
};

export default function ProfileCard({res}: ProfileCardProps) {
  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden shadow-lg max-w-2xl mx-auto">
            <CardHeader className="p-0">
              <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <motion.div
                  className="absolute -bottom-12 left-[42.5%] -translate-x-1/2 z-40"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Image
                    priority
                    className="border-4 border-white rounded-full bg-cover bg-primary-foreground"
                    width={120}
                    height={120}
                    src={res.image as string}
                    alt={res.name as string}
                  />
                </motion.div>
              </div>
            </CardHeader>
            <CardContent className="mt-16 text-center">
              <motion.h2
                className="text-2xl font-bold capitalize"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {res.name}
              </motion.h2>
              <motion.div
                className="text-gray-600 flex items-center justify-center gap-2 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Mail className="w-4 h-4" />
                <p>{res.email}</p>
              </motion.div>
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Badge className="bg-blue-100 text-blue-600">
                  Joined at:{" "}
                  {sliceDate(res.createdAt.toString() || Date.now().toString())}
                </Badge>
              </motion.div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 mt-6">
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { icon: <Bell className="w-6 h-6" />, label: "Reminders" },
                    {
                      icon: <CreditCard className="w-6 h-6" />,
                      label: "Subscription",
                    },
                    {
                      icon: <Settings className="w-6 h-6" />,
                      label: "Settings",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="p-4 bg-white/40 shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
