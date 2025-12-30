"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { changePassword } from "@/server/dashboard/settingActions";

type PersonalInfoItem = {
  label: string;
  value: string;
};

export default function PersonalInformation() {
  const { data: deets, refetch } = useFetchInfo();
  const data = deets!.data;

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const personalInfo: PersonalInfoItem[] = [
    { label: "First Name", value: data.firstName },
    { label: "Last Name", value: data.lastName },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
    { label: "Account Type", value: data.accountType },
    { label: "Account Number", value: data.bankAccountNumber },
    { label: "Routing Number", value: data.bankRoutingNumber },
    { label: "Mother's Maiden Name", value: data.motherMaidenName },
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPassword !== data.password) {
      toast.error("Incorrect password, check your current password");
      console.log(data.password);
      return;
    }
    setIsChangingPassword(true);

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      setIsChangingPassword(false);
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      toast.success("Password changed successfully");
      setIsDialogOpen(false);
      refetch(); // Refresh user data if needed
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Please try again.");
    } finally {
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <Card className="mb-2 rounded-sm border-none bg-neutral-50 dark:bg-neutral-900 p-0">
      <div className="p-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 items-center">
          <div>
            <div className="text-base text-neutral-700 dark:text-neutral-300 font-semibold py-1">
              Personal Information
            </div>
            <div className="mt- text-sm text-neutral-500 dark:text-neutral-400 font-medium md:text-balance">
              These are your account information with us, which are securely
              stored and protected from unauthorized access.
            </div>
          </div>
          <div className="flex md:justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="font-medium items-center inline-flex gap-x-2 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-500 bg-neutral-100 p-3 rounded-md text-neutral-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Change password</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    Enter your current password and a new password to update
                    your account security.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleChangePassword}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-2">
                      <Label htmlFor="current-password" className="">
                        Current Password
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="col-span-3 bg-neutral-50 border-neutral-500/10"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2">
                      <Label htmlFor="new-password" className="">
                        New Password
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="col-span-3 bg-neutral-50 border-neutral-500/10"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2">
                      <Label htmlFor="confirm-password" className="">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="col-span-3 bg-neutral-50 border-neutral-500/10"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full font-bold"
                      disabled={isChangingPassword}
                    >
                      {isChangingPassword ? "Changing..." : "Change Password"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <CardContent className="p-0">
        <div className="px-5 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalInfo.map((item, index) => (
              <div key={index} className="relative mt-3">
                <Label
                  htmlFor={`info-${index}`}
                  className="text-sm font-medium"
                >
                  {item.label}
                </Label>
                <div className="flex items-center bg-neutral-100 dark:pb-2 dark:bg-neutral-800 py-2 px-3 rounded-md">
                  <div
                    id={`info-${index}`}
                    className="bg-neutral-100 dark:bg-neutral-800 capitalize p-2 text-sm rounded-md flex-grow mr-2"
                  >
                    {item.value}
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.value, item.label)}
                    className="p-2 hover:bg-neutral-200/70 rounded-full transition-colors"
                    aria-label={`Copy ${item.label}`}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </button>
                </div>
                {copiedField === item.label && (
                  <span
                    className="absolute bg-neutral-500 right-0 rounded-md p-2 flex justify-center animate__faster animate__animated capitalize animate__fadeInUp top-0 text-xs text-white"
                    role="status"
                    aria-live="polite"
                  >
                    <p className="z-20">Copied!</p>
                    <div className="arrow bg-neutral-500 rounded absolute size-4 rotate-45 -bottom-1 z-10 mx-auto"></div>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
