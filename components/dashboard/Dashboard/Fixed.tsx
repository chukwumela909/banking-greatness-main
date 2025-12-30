"use client";
import React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { Badge } from "@/components/ui/badge";
import { FixedDialog } from "../fixed/FixedDailog";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Fixed() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const fixedHistory = data.fixedHistory;

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) {
      return ""; // or some other default value
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return ""; // or some other default value
    }
    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="w-full border-none shadow-none rounded-md p-4 bg-white dark:bg-neutral-900">
      <div className="flex justify-between items-center">
        <div className="">
          <div className="Fixed-type text-xs gap-x-1 bg-base-color/5 dark:bg-blue-500/10 dark:text-blue-500 p-2 rounded-md inline-flex items-center font-semibold text-base-color/80">
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
            className={`Fixed-balance text-3xl dark:text-neutral-300 mt-2 /blur-md font-bold text-neutral-600 ${inter.className}`}
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
          <p className="text-neutral-400 text-xs mt-1 font-medium">
            Total running
          </p>
        </div>
        <div className="icons flex gap-x-2">
          {" "}
          <FixedDialog text={false} />
          <Link
            href={"/dashboard/fixed"}
            className="fixed-history-action rounded-sm bg-base-color/5 dark:bg-blue-500/10 dark:text-blue-500 /border /border-black/10 p-3 text-base-color/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M3.5 2A1.5 1.5 0 0 0 2 3.5V15a3 3 0 1 0 6 0V3.5A1.5 1.5 0 0 0 6.5 2h-3Zm11.753 6.99L9.5 14.743V6.257l1.51-1.51a1.5 1.5 0 0 1 2.122 0l2.121 2.121a1.5 1.5 0 0 1 0 2.122ZM8.364 18H16.5a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-2.136l-6 6ZM5 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="separator w-20 h-0.5 mt-4 bg-black/10 mx-auto"></div>
      <div className="Fixed-info">
        <h1 className="text-neutral-700 font-bold dark:text-neutral-400 text-sm mt-5">
          Fixed history
        </h1>
        <div className="Fixed-limit-info mt-5 space-y-6">
          {fixedHistory.length >= 1 &&
            fixedHistory
              .slice(0, 2)
              .sort((a: any, b: any) => b.startDate - a.startDate)
              .map((hist, index) => (
                <>
                  <div
                    key={hist.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-x-2">
                      <div className="icon-cont rounded-full relative justify-center items-center dark:bg-blue-500/10 dark:text-blue-500 flex bg-neutral-500/10 /border text-neutral-500 /border-white/10 p-4 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M13.2 2.24a.75.75 0 0 0 .04 1.06l2.1 1.95H6.75a.75.75 0 0 0 0 1.5h8.59l-2.1 1.95a.75.75 0 1 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 0 0-1.06.04Zm-6.4 8a.75.75 0 0 0-1.06-.04l-3.5 3.25a.75.75 0 0 0 0 1.1l3.5 3.25a.75.75 0 1 0 1.02-1.1l-2.1-1.95h8.59a.75.75 0 0 0 0-1.5H4.66l2.1-1.95a.75.75 0 0 0 .04-1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="Fixed-limit capitalize text-neutral-800 dark:text-neutral-200 font-semibold text-sm">
                        <div>{hist.name}</div>
                        <div className="amount text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-medium /text-base">
                          <p className={`${inter.className}`}>
                            ${hist.amount.toLocaleString()} | Due{" "}
                            {formatDate(hist.endDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        hist.status === "running"
                          ? "default"
                          : hist.status === "completed"
                          ? "secondary"
                          : "outline"
                      }
                      className={`flex dark:text-white items-center capitalize gap-x-2  ${
                        hist.status === "running"
                          ? "bg-yellow-500 hover:bg-yellow-500 cursor-pointer"
                          : hist.status === "completed"
                          ? "bg-green-600 hover:bg-green-600 text-white"
                          : "outline"
                      }`}
                    >
                      <div>{hist.status}</div>
                      {hist.status === "running" ? (
                        <div className="animate-spin">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </Badge>
                  </div>{" "}
                  {index < fixedHistory.slice(0, 2).length - 1 && (
                    <div className="separator w-5/6 h-[1px] my-1 dark:bg-white/10 bg-black/10 mx-auto" />
                  )}
                </>
              ))}
          {fixedHistory.length < 1 && (
            <div className="flex items-center min-h-44 h-full justify-center">
              <div className="inner-items /text-center">
                <div className="icon flex justify-center text-neutral-600 dark:text-neutral-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h9.454a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73Zm3.068-5.852A1.25 1.25 0 0 1 5.273 4.5h9.454a1.25 1.25 0 0 1 1.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 0 0-.86.49l-.606 1.02a1 1 0 0 1-.86.49H8.236a1 1 0 0 1-.894-.553l-.448-.894A1 1 0 0 0 6 11H2.53l.015-.062 1.523-5.52Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text text-neutral-500 dark:text-neutral-400 text-sm font-semibold">
                  No Fixed History
                </div>
              </div>
            </div>
          )}
          {fixedHistory.length >= 1 && (
            <Link
              className="fixed-main-hist-link flex items-center justify-center text-sm gap-x-1 font-semibold dark:border-blue-500/60 text-blue-500 text-base-color/80 border border-base-color/10 hover:bg-base-color/5 transition-all /bg-black/5 w-full rounded-md py-3"
              href={"/dashboard/fixed"}
            >
              <p>View all history</p>
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.75.75 0 0 1 .75.75v8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.22 1.22V2.75A.75.75 0 0 1 8 2Z"
                clipRule="evenodd"
              />
            </svg> */}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
