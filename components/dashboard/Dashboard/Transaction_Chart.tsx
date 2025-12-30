"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

export const description = "A multiple line chart";

const chartData = [
  { deposits: 186, transfers: 80 },
  { deposits: 305, transfers: 200 },
  { deposits: 237, transfers: 120 },
  { deposits: 73, transfers: 190 },
  { deposits: 209, transfers: 130 },
  { deposits: 214, transfers: 140 },
];

const chartConfig = {
  desktop: {
    label: "Deposits",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Transfers",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Transaction_Chart() {
  return (
    <Card className="shadow-none border-none dark:bg-neutral-900">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Recent Transactions
        </CardTitle>
        <CardDescription className="text-sm font-medium">
          Deposit ~ Transfer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="deposits"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="transfers"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <div className="text-center w-full">
        <div className="text-sm text-center">
          Showing data for the last 6 months
        </div>
      </div>
    </Card>
  );
}
