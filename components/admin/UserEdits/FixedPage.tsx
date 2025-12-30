"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { IUser } from "@/server/userSchema";
import { MoreHorizontal, Loader2, DollarSign } from "lucide-react";
import { payUserAndUpdateStatus } from "@/server/admin/edit-user-actions";

export default function FixedPage({ data }: { data: IUser }) {
  const [fixedInvestments, setFixedInvestments] = useState<FixedType[]>(
    data.fixedHistory || []
  );
  const [loadingInvestmentId, setLoadingInvestmentId] = useState<string | null>(
    null
  );

  const sortedFixedInvestments = [...fixedInvestments].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePayUser = async (id: string, totalReturn: number) => {
    setLoadingInvestmentId(id);
    try {
      const result = await payUserAndUpdateStatus(data.email, id, totalReturn);
      if (result.success) {
        setFixedInvestments((prevInvestments) =>
          prevInvestments.map((investment) =>
            investment.id === id
              ? { ...investment, status: "completed" }
              : investment
          )
        );
        toast.success("Payment successful and status updated");
      } else {
        throw new Error(result.error || "Payment failed");
      }
    } catch (error) {
      toast.error("Failed to process payment: " + (error as Error).message);
    } finally {
      setLoadingInvestmentId(null);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Fixed Cycle</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>ROI</TableHead>
              <TableHead>Total Return</TableHead>
              <TableHead>Duration (Months)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFixedInvestments.map((investment) => (
              <TableRow key={investment.id}>
                <TableCell>{investment.name}</TableCell>
                <TableCell>{formatDate(investment.startDate)}</TableCell>
                <TableCell>{formatDate(investment.endDate)}</TableCell>
                <TableCell>${investment.amount.toFixed(2)}</TableCell>
                <TableCell>{investment.roi}%</TableCell>
                <TableCell>${investment.totalReturn.toFixed(2)}</TableCell>
                <TableCell>{investment.duration}</TableCell>
                <TableCell>{investment.status}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger
                      asChild
                      disabled={investment.status === "completed"}
                    >
                      <Button className="dark:border-neutral-800 dark:hover:bg-neutral-800 bg-neutral-100 text-neutral-500 dark:text-white hover:bg-neutral-200 dark:bg-neutral-800">
                        {loadingInvestmentId === investment.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="h-4 w-4" />
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="dark:bg-neutral-800 dark:border-neutral-800">
                      <div className="flex flex-col space-y-2">
                        <Button
                          onClick={() =>
                            handlePayUser(investment.id, investment.totalReturn)
                          }
                          className="hover:dark:bg-neutral-700 text-neutral-500 dark:text-white hover:bg-neutral-200 bg-transparent"
                          disabled={
                            loadingInvestmentId === investment.id ||
                            investment.status === "completed"
                          }
                        >
                          <DollarSign className="mr-2 h-4 w-4" />
                          Pay User
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
