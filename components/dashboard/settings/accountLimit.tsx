"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import { useFetchInfo } from "@/lib/data/fetchPost";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function AccountLimit() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  return (
    <Card className="mb-2 rounded-sm border-none bg-neutral-50 dark:bg-neutral-800 p-0">
      <div className="p-4">
        <div className="text-base text-neutral-700 dark:text-neutral-400 font-semibold py-1">
          Account Limit
        </div>
        <div className="mt- text-sm text-neutral-500 dark:text-neutral-300 font-medium">
          Manage your account limits
        </div>
      </div>
      <CardContent className="p-4 dark:bg-neutral-800 mb-2">
        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <div className="py-2 px-3 flex items-center justify-between bg-neutral-100 dark:bg-neutral-700/30 rounded-sm ">
              <div className="name_pin">
                <div className="name text-xs font-medium text-neutral-500 dark:text-neutral-300">
                  Account Limit
                </div>
                <div
                  className={`limit text-neutral-700 dark:text-neutral-200 font-bold text-lg `}
                >
                  {" "}
                  <span className="text-xs font-semibold ">$</span>
                  <span className={`${inter.className}`}>
                    {data.accountLimit.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Dialog>
            <DialogTrigger className="w-full py-0">
              <div className="w-full py-[0.6rem] font-semibold dark:bg-blue-500 bg-base-color/70 text-white text-sm rounded-sm">
                Increase Limit
              </div>
            </DialogTrigger>
            <DialogContent className="w-[90%]">
              <DialogTitle className="text-neutral-600 dark:text-neutral-400 text-base">
                {" "}
                Account Limit Upgrade
              </DialogTitle>
              <DialogDescription className="text-neutral-500 dark:text-neutral-300 text-sm">
                Increase your account limit to perform more heavy transactions{" "}
              </DialogDescription>
              <div className="message p-3 text-sm bg-neutral-50 dark:bg-neutral-700/30 dark:text-neutral-400 border border-neutral-500/10 rounded-sm ">
                {" "}
                To upgrade your account please{" "}
                <strong>verify your account.</strong>{" "}
                {
                  "If you've been verified and still see this message please contact our support immediately."
                }
              </div>
              <div className="flex justify-between w-full">
                <DialogClose className="bg-base-color/5 /border border-base-color/10 dark:bg-blue-500/10 dark:text-blue-500 text-base-color/80 px-5 text-sm rounded-md py-3 font-semibold">
                  Close
                </DialogClose>
                <Link
                  href={"/dashboard/support"}
                  className="bg-base-color/80  dark:bg-blue-500 /border border-base-color/10 text-white flex items-center gap-x-2 px-5 text-sm rounded-md py-3 font-semibold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 0 0 1.33 0l1.713-3.293a.783.783 0 0 1 .642-.413 41.102 41.102 0 0 0 3.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0 0 10 2ZM6.75 6a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p>Support</p>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
