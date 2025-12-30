"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Inter } from "next/font/google";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { ToggleVisibility } from "./util";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function SocialSecurity() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;

  const [showSSN, setShowSSN] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("showSSN");
      return saved !== null ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("showSSN", JSON.stringify(showSSN));
  }, [showSSN]);

  const handleToggleSSN = () => {
    setShowSSN((prev: any) => !prev);
  };

  return (
    <Card className="mb-2 rounded-sm border-none bg-neutral-50 dark:bg-neutral-800 p-0">
      <div className="p-4">
        <div className="text-base text-neutral-700 dark:text-neutral-400 font-semibold py-1">
          Social Security
        </div>
        <div className="mt- text-sm text-neutral-500 dark:text-neutral-300 font-medium">
          View your social security number
        </div>
      </div>
      <CardContent className="p-4 dark:bg-neutral-800">
        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <div className="py-2 px-3 flex items-center justify-between bg-neutral-100 dark:bg-neutral-700/30 rounded-sm ">
              <div className="name_pin">
                <div className="name text-xs font-medium text-neutral-500 dark:text-neutral-300">
                  SSN
                </div>
                <div
                  className={`${inter.className} transition-all ${
                    showSSN ? "blur-md" : ""
                  } text-neutral-700 mt-1 font-bold text-lg dark:text-neutral-200`}
                >
                  {data.ssn}
                </div>
              </div>
              <div className="ctrls flex items-center gap-x-1">
                <ToggleVisibility show={showSSN} onToggle={handleToggleSSN} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
