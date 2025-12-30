"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  amount: {
    label: "Amount",
  },
  transfers: {
    label: "Transfers",
    color: "#ff0000",
  },
  fixed: {
    label: "Fixed",
    color: "#333333",
  },
  deposits: {
    label: "Deposits",
    color: "hsl(var(--chart-3))",
  },
  cards: {
    label: "Cards",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;
import { Inter } from "next/font/google";
import { useFetchInfo } from "@/lib/data/fetchPost";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function Chart() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const chartData = [
    { data: "transfers", Amount: 27095, fill: "#200cf7" },
    { data: "fixed", Amount: data.fixedBalance, fill: "#150f90" },
    { data: "deposits", Amount: 23387, fill: "#625fff" },
    { data: "cards", Amount: data.cardBalance, fill: "#c8cfff" },
  ];
  return (
    <Card className="flex flex-col border-none shadow-none dark:bg-neutral-900 border-black/5">
      <CardHeader className="items-start pl-12 pb-0">
        <div className="text-lg font-bold text-neutral-600 dark:text-neutral-300">
          Account Data Summary
        </div>
        <div className="font-medium text-sm">
          LIve accumulative chart of your account
        </div>
      </CardHeader>
      <CardContent className="lg:flex w-full pb-0 items-center">
        <div className="w-full">
          {" "}
          <ChartContainer
            config={chartConfig}
            className="mx-auto /md:mx-0 aspect-square /max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="Amount"
                nameKey="data"
                innerRadius={60}
                strokeWidth={8}
              ></Pie>
            </PieChart>
          </ChartContainer>
        </div>

        <div className="chart-data w-full">
          {" "}
          <div className=" grid grid-cols-2 gap-4  md:gap-8 p-4">
            <div className="font-medium leading-none flex md:justify-center items-center gap-x-2">
              <div className="h-2 w-2 rounded-full bg-[#200cf7]" />
              <div>
                <p className="text-xs">Transfers</p>
                <div
                  className={`ml-auto font-semibold text-sm ${inter.className}`}
                >
                  ${chartData[0].Amount.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="font-medium leading-none flex md:justify-center items-center gap-x-2">
              <div className="h-2 w-2 rounded-full bg-[#150f90]" />
              <div>
                <p className="text-xs">Fixed</p>
                <div
                  className={`ml-auto font-semibold text-sm ${inter.className}`}
                >
                  ${data.fixedBalance.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="font-medium leading-none flex md:justify-center items-center gap-x-2">
              <div className="h-2 w-2 rounded-full bg-[#625fff]" />
              <div>
                <p className="text-xs">Deposits</p>
                <div
                  className={`ml-auto font-semibold text-sm ${inter.className}`}
                >
                  ${chartData[2].Amount.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="font-medium leading-none flex md:justify-center items-center gap-x-2">
              <div className="h-2 w-2 rounded-full bg-[#c8cfff]" />
              <div>
                <p className="text-xs">Cards</p>
                <div
                  className={`ml-auto font-semibold text-sm ${inter.className}`}
                >
                  ${data.cardBalance.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground dark:text-neutral-300">
          Showing data for the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
}
