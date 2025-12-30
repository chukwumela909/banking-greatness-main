"use client";

import { AlertCircle, Home, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/server/dashboard/navActions";

export default function AccountNotFound() {
  const router = useRouter();

  const handleLogout = async (path: string) => {
    try {
      await logout();
      router.push(path);
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <Card className="w-full max-w-md dark:bg-neutral-900 dark:border-neutral-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <AlertCircle className="mr-2 h-6 w-6 text-red-500" />
            Account Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            {"We're"} sorry, but we {"couldn't"} find your account. This may be
            due to one of the following reasons:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Your account has been temporarily suspended</li>
            <li>Your account has been permanently deleted</li>
            <li>{"There's"} a technical issue on our end</li>
          </ul>
          <p className="text-center font-semibold">
            Please contact our support team for further assistance.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button
            variant="outline"
            className="dark:bg-neutral-800 dark:text-white dark:border-neutral-700/60"
            onClick={() => handleLogout("/auth/login")}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
          <Button
            className="dark:bg-blue-500 bg-base-color/80 text-white"
            onClick={() => handleLogout("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
