"use client";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { depositCheckError } from "@/server/actions/paymentUpload";
import { useAction } from "next-safe-action/hooks";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DepHeader() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showFailedMessage, setShowFailedMessage] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  let toastId: any;

  const { execute, status } = useAction(depositCheckError, {
    onError(error) {
      if (error.error.fetchError)
        toast.error("Error communicating with server", {
          id: toastId,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: toastId,
        });
      if (error.error.validationErrors)
        toast.error("Error performing task", {
          id: toastId,
        });
      setIsVerifying(false);
      setShowFailedMessage(true);
    },
    onExecute() {
      setIsVerifying(true);
      setShowFailedMessage(false);
    },
    onSuccess() {
      // This won't be called in our simulated failure scenario
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVerifying) {
      timer = setTimeout(() => {
        setIsVerifying(false);
        setShowFailedMessage(true);
      }, 8000);
    }
    return () => clearTimeout(timer);
  }, [isVerifying]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (file) {
      execute(Number(amount));
    } else {
      toast.error("Please upload a check image");
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setAmount("");
    setFile(null);
    setShowFailedMessage(false);
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-y-2 md:gap-y-0">
      <div className="md:bg-white  dark:md:rounded-none dark:bg-neutral-900 py-4 px-2 rounded-sm">
        <div className="flex justify-between items-center">
          <div>
            <div className="dep-type text-xs gap-x-1 bg-neutral-500/5 dark:bg-blue-500/10 dark:text-blue-500 p-2 md:px-4 rounded-sm inline-flex items-center font-semibold text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 13a3.5 3.5 0 0 1-1.41-6.705A3.5 3.5 0 0 1 9.72 4.124a2.5 2.5 0 0 1 3.197 3.018A3.001 3.001 0 0 1 12 13H4.5Zm.72-5.03a.75.75 0 0 0 1.06 1.06l.97-.97v2.69a.75.75 0 0 0 1.5 0V8.06l.97.97a.75.75 0 1 0 1.06-1.06L8.53 5.72a.75.75 0 0 0-1.06 0L5.22 7.97Z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Deposits</p>
            </div>
            <div
              className={`Fixed-balance text-3xl mt-2 pl-2 font-bold text-neutral-600 dark:text-neutral-400 ${inter.className}`}
            >
              <span className="text-sm">$</span>
              {data.depositHistory
                .filter((deposit) => deposit.status === "success")
                .reduce((acc, deposit) => acc + deposit.amount, 0)
                .toLocaleString()}
            </div>
            <p className="text-neutral-400 dark:text-neutral-300 text-xs mt-1 font-medium pl-2">
              Total successful deposits
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
              <div className="cont p-3 rounded-full cursor-pointer bg-base-color/5 text-base-color/80 dark:bg-blue-500/10 dark:text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                </svg>
              </div>
            </DialogTrigger>
            <DialogContent className="w-[95%] sm:max-w-[425px]">
              {!isVerifying && !showFailedMessage && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-lg font-semibold">Deposit Check</h2>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Deposit Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="check-image">Upload Check Image</Label>
                    <Input
                      id="check-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || status === "executing"}
                    className="w-full"
                  >
                    {isSubmitting || status === "executing"
                      ? "Processing..."
                      : "Deposit Check"}
                  </Button>
                </form>
              )}
              {isVerifying && (
                <div className="text-center py-8">
                  <svg
                    className="animate-spin h-10 w-10 text-primary mx-auto mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p className="text-lg font-semibold">Verifying deposit...</p>
                </div>
              )}
              {showFailedMessage && (
                <div className="text-center py-8">
                  <svg
                    className="h-10 w-10 text-red-500 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold mb-2">Deposit Failed</h3>
                  <p className="text-gray-600 mb-4">
                    {" We're sorry"}, but your check deposit could not be
                    processed at this time. Please contact our support team for
                    further assistance.
                  </p>
                  <Button
                    onClick={() => {
                      setDialogOpen(false);
                      resetForm();
                    }}
                    className="w-full"
                  >
                    Close
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="md:bg-white bg-neutral-50/70 dark:md:rounded-none dark:bg-neutral-900 py-4 px-2 rounded border-l border-r border-neutral-500/10">
        <div className="flex justify-between items-center">
          <div>
            <div className="dep-type text-xs gap-x-1 bg-base-color/5 p-2 md:px-4 rounded-sm inline-flex items-center font-semibold dark:text-blue-500 dark:bg-blue-500/10 text-base-color/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Account Info</p>
            </div>
            <div
              className={`Fixed-balance text-xl mt-2 pl-2 font-bold text-neutral-600 dark:text-neutral-400 ${inter.className}`}
            >
              {data.bankRoutingNumber}
            </div>
            <p className="text-neutral-400 text-xs mt-1 font-medium pl-2">
              Bank routing number
            </p>
          </div>
          <div className="copy-icon">
            <div
              className="cont p-3 rounded-full cursor-pointer bg-base-color/5 dark:bg-blue-500/10 dark:text-blue-500 text-base-color/80"
              onClick={() => {
                toast.success("Copied");
                navigator.clipboard.writeText(data.bankRoutingNumber);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3A1.501 1.501 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3h-3Zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="md:bg-white bg-neutral-50/70 dark:bg-neutral-900 py-4 px-2 rounded-sm dark:md:rounded-none border-l border-r md:border-none border-neutral-500/10">
        <div className="flex justify-between items-center">
          <div>
            <div className="dep-type text-xs gap-x-1 bg-base-color/5 p-2 md:px-4 rounded-sm inline-flex items-center font-semibold dark:bg-blue-500/10 dark:text-blue-500 text-base-color/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Account Info</p>
            </div>
            <div
              className={`Fixed-balance text-xl mt-2 pl-2 font-bold dark:text-neutral-400 text-neutral-700 ${inter.className}`}
            >
              {data.bankAccountNumber}
            </div>
            <p className="text-neutral-400 text-xs mt-1 font-medium pl-2">
              Bank account number
            </p>
          </div>
          <div className="copy-icon">
            <div
              className="cont p-3 rounded-full cursor-pointer bg-base-color/5 dark:bg-blue-500/10 dark:text-blue-500 text-base-color/80"
              onClick={() => {
                toast.success("Copied");
                navigator.clipboard.writeText(data.bankAccountNumber);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3A1.501 1.501 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3h-3Zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
