"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { ToggleVisibility } from "./util";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAction } from "next-safe-action/hooks";
import { changeTransactionPin } from "@/server/dashboard/settingActions";
import { toast } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function TransactionPin() {
  const { data: deets } = useFetchInfo();
  let toastId: any;
  const data = deets!.data;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPin, setNewPin] = useState("");

  const [showTransactionPin, setShowTransactionPin] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("showTransactionPin");
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem(
      "showTransactionPin",
      JSON.stringify(showTransactionPin)
    );
  }, [showTransactionPin]);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPin(e.target.value);
  };

  const { execute, status } = useAction(changeTransactionPin, {
    onSuccess() {
      toast.success("Pin changed successfully", { id: toastId });
      toast.dismiss(toastId);
    },
    onExecute() {
      toast.loading("Changing pin, please wait...", { id: toastId });
    },
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

      toast.dismiss(toastId);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New PIN:", newPin);
    execute({ transactionPin: parseInt(newPin) });
    setNewPin("");
    setIsDialogOpen(false);
  };

  const handleToggleTransactionPin = () => {
    setShowTransactionPin((prev: any) => !prev);
  };

  return (
    <Card className=" rounded-sm border-none bg-neutral-50 dark:bg-neutral-800 p-0">
      <div className="p-4">
        <div className="text-base text-neutral-700 dark:text-neutral-400 font-semibold py-1">
          Transaction
        </div>
        <div className="mt- text-sm text-neutral-500 dark:text-neutral-300 font-medium">
          Manage your transaction pin
        </div>
      </div>
      <CardContent className="p-4 dark:bg-neutral-800 mb-2">
        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <div className="py-2 px-3 flex items-center justify-between bg-neutral-100 dark:bg-neutral-700/30 rounded-sm ">
              <div className="name_pin">
                <div className="name text-xs font-medium text-neutral-500 dark:text-neutral-300">
                  Transaction Pin
                </div>
                <div
                  className={`${inter.className} transition-all ${
                    showTransactionPin ? "blur-md" : ""
                  } text-neutral-700 mt-1 font-bold text-lg dark:text-neutral-200`}
                >
                  {data.transactionPin}
                </div>
              </div>
              <div className="ctrls flex items-center gap-x-1">
                {" "}
                <ToggleVisibility
                  show={showTransactionPin}
                  onToggle={handleToggleTransactionPin}
                />
              </div>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full font-semibold dark:bg-blue-500 bg-base-color/70 text-white rounded-sm">
                Change pin
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Transaction PIN</DialogTitle>
                <DialogDescription>
                  {
                    "Enter your new transaction PIN below. Make sure it's secure and easy to remember."
                  }
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-2">
                    <Label htmlFor="new-pin" className="">
                      New PIN
                    </Label>
                    <Input
                      id="new-pin"
                      type="password"
                      value={newPin}
                      onChange={handlePinChange}
                      className="bg-neutral-50 border border-neutral-500/10"
                      maxLength={4}
                      pattern="\d{4}"
                      required
                    />
                  </div>
                </div>
                <DialogFooter className="w-full">
                  <Button
                    type="submit"
                    disabled={newPin.length !== 4 || status === "executing"}
                    className="w-full font-bold"
                  >
                    Change PIN
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
