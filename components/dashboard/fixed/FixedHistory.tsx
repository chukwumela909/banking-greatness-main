"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { useState } from "react";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
export default function FixedHistory({ tab }: { tab: string }) {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const fixedHistory = data.fixedHistory.reverse();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = fixedHistory.filter(
    (item) =>
      (tab === "all" || item.status === tab) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

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
    <div className="bg-white dark:bg-neutral-900">
      <div className=" mx-auto py-4">
        <div className="title text-neutral-800 dark:text-neutral-200 mb-4 font-semibold">
          Fixed Transaction History
        </div>
        <div className="md:flex md:justify-between md:items-center grid grid-cols-1  mb-4">
          <Tabs value={tab || "all"} className="md:w-[400px] w-full">
            <TabsList className="bg-neutral-50 dark:bg-neutral-800 text-sm text-neutral-500">
              <Link href={"?tab=all"}>
                <TabsTrigger value="all" className="text-nuetral-500">
                  All
                </TabsTrigger>
              </Link>
              <Link href={"?tab=running"}>
                <TabsTrigger value="running" className="text-nuetral-500">
                  Running
                </TabsTrigger>
              </Link>
              <Link href={"?tab=completed"}>
                <TabsTrigger value="completed" className="text-nuetral-500">
                  Completed
                </TabsTrigger>
              </Link>
            </TabsList>
          </Tabs>
          <Input
            placeholder="Search by name or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:max-w-md mt-2 md:mt-0 bg-neutral-50/50 border-neutral-500/20"
          />
        </div>
        <div className=" rounded-md  ">
          <Table className="overflow-x-scroll overflow-y-hidden  mx-auto">
            <TableHeader className="text-neutral-500 ">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-nowrap">Amount</TableHead>
                <TableHead className="text-nowrap">Status</TableHead>
                <TableHead className="text-nowrap">Duration</TableHead>
                <TableHead className="text-nowrap">ROI</TableHead>
                <TableHead className="text-nowrap">Total Return</TableHead>
                <TableHead className="text-nowrap">Start Date</TableHead>
                <TableHead className="text-nowrap">End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length >= 1 &&
                filteredData.map((item) => (
                  <TableRow className="border-none" key={item.id}>
                    <TableCell className="font-medium text-nowrap">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {formatCurrency(item.amount)}
                    </TableCell>
                    <TableCell className="flex items-center justify-center">
                      <Badge
                        variant={
                          item.status === "running"
                            ? "default"
                            : item.status === "completed"
                            ? "secondary"
                            : "outline"
                        }
                        className={`flex items-center dark:text-white capitalize gap-x-2  ${
                          item.status === "running"
                            ? "bg-yellow-500 hover:bg-yellow-500 cursor-pointer"
                            : item.status === "completed"
                            ? "bg-green-600 hover:bg-green-600 text-white"
                            : "outline"
                        }`}
                      >
                        <div>{item.status}</div>
                        {item.status === "running" ? (
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
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {item.duration} Months
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {formatCurrency(item.totalReturn - item.amount)}
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {formatCurrency(item.totalReturn)}
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {formatDate(item.startDate)}
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {formatDate(item.endDate)}
                    </TableCell>
                  </TableRow>
                ))}

              {filteredData.length < 1 && (
                <TableRow className="border-none" key={Math.random()}>
                  <TableCell
                    colSpan={7}
                    className="text-center font-semibold text-neutral-500"
                  >
                    {" "}
                    Nothing to see here
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
