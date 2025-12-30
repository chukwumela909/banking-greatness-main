"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useColors } from "@/context/colorContext";
import { toast } from "sonner";

export default function ContactInfo() {
  const colors = useColors();
  const [isLoading, setIsLoading] = useState(false);
  let loadingToast: any;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Show loading toast
    toast.loading("Submitting your message...", {
      id: loadingToast,
    });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 4000));

      // Simulate successful submission
      toast.success("Message sent successfully!", {
        id: loadingToast,
      });
      toast.dismiss(loadingToast);
    } catch (error) {
      // Handle error case
      toast.error("Failed to send message. Please try again.", {
        id: loadingToast,
      });
      toast.dismiss(loadingToast);
    } finally {
      toast.dismiss(loadingToast);

      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="w-full lg:px-8 px-4 rounded-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="mb-1" htmlFor="first-name">
                First Name
              </Label>
              <Input
                id="first-name"
                className="rounded-lg h-12 bg-neutral-50 dark:bg-neutral-50 border-neutral-500/10"
                placeholder="John"
                disabled={isLoading}
                required
              />
            </div>
            <div className="flex-1">
              <Label className="mb-1" htmlFor="last-name">
                Last Name
              </Label>
              <Input
                id="last-name"
                className="rounded-lg h-12 bg-neutral-50 dark:bg-neutral-50 border-neutral-500/10"
                placeholder="Doe"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="mb-1" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                className="rounded-lg h-12 bg-neutral-50 dark:bg-neutral-50 border-neutral-500/10"
                placeholder="You@example.com"
                type="email"
                disabled={isLoading}
                required
              />
            </div>
            <div className="flex-1">
              <Label className="mb-1" htmlFor="phone-number">
                Phone Number
              </Label>
              <Input
                id="phone-number"
                className="rounded-lg h-12 bg-neutral-50 dark:bg-neutral-50 border-neutral-500/10"
                placeholder="+1 (xxx) xxxx"
                type="tel"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label className="" htmlFor="message">
              Message
            </Label>
            <Textarea
              className="min-h-[150px] rounded-lg bg-neutral-50 border-neutral-500/10"
              id="message"
              placeholder="Message"
              disabled={isLoading}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-white font-bold flex rounded-lg items-center justify-center gap-x-3"
            style={{
              background: colors.defaultblue,
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
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
                Submitting...
              </>
            ) : (
              <>
                <p>Submit</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
