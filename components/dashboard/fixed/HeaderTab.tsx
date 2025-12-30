"use client";
import React from "react";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { FixedDialog } from "./FixedDailog";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function HeaderTab() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;

  return (
    <div>
      {" "}
      <div className="flex justify-between items-center">
        <div className="">
          <div className="Fixed-type text-xs gap-x-1 dark:bg-blue-500/10 dark:text-blue-500 bg-neutral-500/5 p-2 md:px-4 rounded-md inline-flex items-center font-semibold text-neutral-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M9.638 1.093a.75.75 0 0 1 .724 0l2 1.104a.75.75 0 1 1-.724 1.313L10 2.607l-1.638.903a.75.75 0 1 1-.724-1.313l2-1.104ZM5.403 4.287a.75.75 0 0 1-.295 1.019l-.805.444.805.444a.75.75 0 0 1-.724 1.314L3.5 7.02v.73a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .388-.657l1.996-1.1a.75.75 0 0 1 1.019.294Zm9.194 0a.75.75 0 0 1 1.02-.295l1.995 1.101A.75.75 0 0 1 18 5.75v2a.75.75 0 0 1-1.5 0v-.73l-.884.488a.75.75 0 1 1-.724-1.314l.806-.444-.806-.444a.75.75 0 0 1-.295-1.02ZM7.343 8.284a.75.75 0 0 1 1.02-.294L10 8.893l1.638-.903a.75.75 0 1 1 .724 1.313l-1.612.89v1.557a.75.75 0 0 1-1.5 0v-1.557l-1.612-.89a.75.75 0 0 1-.295-1.019ZM2.75 11.5a.75.75 0 0 1 .75.75v1.557l1.608.887a.75.75 0 0 1-.724 1.314l-1.996-1.101A.75.75 0 0 1 2 14.25v-2a.75.75 0 0 1 .75-.75Zm14.5 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-.388.657l-1.996 1.1a.75.75 0 1 1-.724-1.313l1.608-.887V12.25a.75.75 0 0 1 .75-.75Zm-7.25 4a.75.75 0 0 1 .75.75v.73l.888-.49a.75.75 0 0 1 .724 1.313l-2 1.104a.75.75 0 0 1-.724 0l-2-1.104a.75.75 0 1 1 .724-1.313l.888.49v-.73a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            <p> Fixed account</p>
          </div>
          <div
            className={`Fixed-balance text-3xl mt-2 dark:text-neutral-300 pl-3 /blur-md font-bold text-neutral-600 ${inter.className}`}
          >
            <span className="text-sm">$</span>
            {data.fixedHistory
              .filter((hist) => hist.status === "running")
              .reduce((acc, curr) => acc + curr.amount, 0)
              .toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
          </div>{" "}
          <p className="text-neutral-400 dark:text-neutral-500 text-xs mt-1 font-medium pl-3 ">
            Available Balance
          </p>
        </div>
        <div className="icons flex gap-x-2">
          {" "}
          <FixedDialog text={true} />
        </div>
      </div>
    </div>
  );
}
