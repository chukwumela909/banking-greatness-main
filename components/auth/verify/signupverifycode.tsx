"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useColors } from "@/context/colorContext";
import dynamic from "next/dynamic";
import animationData from "@/components/auth/verify/verify.json";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSignUpContext } from "@/context/signUpFormContext";
import nookies from "nookies";
import { useAction } from "next-safe-action/hooks";
import {
  resendCode,
  sendCode,
  verifyCode,
} from "@/server/actions/codeVerification";
import { toast } from "sonner";

const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
  ssr: false,
});

export default function SignupVerifyOTP({
  email,
  type,
}: {
  email: string | undefined;
  type: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  let codeToastId: any;
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [countdown, setCountdown] = useState<number>(60);
  const [resendEnabled, setResendEnabled] = useState<boolean>(false);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const colors = useColors();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { execute, status } = useAction(sendCode, {
    onExecute() {
      toast.loading("Sending code please wait...", {
        id: codeToastId,
        duration: 3000,
      });
    },
    onSuccess({ data }) {
      if (data?.success) {
        toast.success("Code sent", {
          id: codeToastId,
          duration: 3000,
        });
        setCodeSent(!codeSent);
      }
      if (!data?.success)
        toast.error("Error sending code, please try again", {
          id: codeToastId,
          duration: 3000,
        });

      toast.dismiss(codeToastId);
    },

    onError(error) {
      if (error.error.fetchError)
        toast.error("Error sending code", {
          id: codeToastId,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: codeToastId,
        });
      if (error.error.validationErrors)
        toast.error("Error, try again later", {
          id: codeToastId,
        });

      toast.dismiss(codeToastId);
    },
  });
  const { execute: resendCodeFn, status: resendCodeStatus } = useAction(
    resendCode,
    {
      onExecute() {
        toast.loading("Resending code please wait...", {
          id: codeToastId,
          duration: 3000,
        });
      },
      onSuccess({ data }) {
        if (data?.success) {
          toast.success("Code resent", {
            id: codeToastId,
            duration: 3000,
          });
          startCountdown();

          setResendEnabled(false);
        }
        if (!data?.success)
          toast.error("Error resending code, please try again", {
            id: codeToastId,
            duration: 3000,
          });

        toast.dismiss(codeToastId);
      },

      onError(error) {
        if (error.error.fetchError)
          toast.error("Error resending code", {
            id: codeToastId,
          });
        if (error.error.serverError)
          toast.error("Error connecting to servers", {
            id: codeToastId,
          });
        if (error.error.validationErrors)
          toast.error("Error, try again later", {
            id: codeToastId,
          });

        toast.dismiss(codeToastId);
      },
    }
  );

  const handleClick = () => {
    execute({ email });
  };
  useEffect(() => {
    // Get the userEmail from localStorage

    startCountdown();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  const startCountdown = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCountdown(60);
    setResendEnabled(false);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setResendEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const { execute: verifyCodeFn, status: verificationStatus } = useAction(
    verifyCode,
    {
      onError(error) {
        if (error.error.fetchError)
          toast.error("Error verifying code", {
            id: codeToastId,
          });
        if (error.error.serverError)
          toast.error("Error verifying code, Please resend code.", {
            id: codeToastId,
          });
        if (error.error.validationErrors)
          toast.error("Error, try again later", {
            id: codeToastId,
          });

        toast.dismiss(codeToastId);
      },
      onExecute() {
        toast.loading("Verifying code, Please wait...", {
          id: codeToastId,
          duration: 3000,
        });
      },
      onSuccess({ data }) {
        if (data?.verified) {
          toast.success("Congrats! Your email has been verified", {
            id: codeToastId,
            duration: 3000,
          });
          router.push("/dashboard", { scroll: true });
        }
        if (!data?.verified) {
          toast.error("Invalid code! Either Incorrect or Expired", {
            id: codeToastId,
            duration: 3000,
          });
        }
        toast.dismiss(codeToastId);
      },
    }
  );
  const handleVerification = () => {
    verifyCodeFn({ code: value });
  };

  const handleResendCode = () => {
    resendCodeFn({ email });

    // Simulate the resend code action
    // Here you would typically call an API to resend the code
  };

  return (
    <div className="flex min-h-screen dark:bg-white flex-col items-center justify-center bg-background">
      <Card className="w-full max-w-md dark:bg-white dark:border-neutral-300">
        <div className="flex justify-center">
          <Lottie animationData={animationData} className="w-[90%] h-[13rem]" />
        </div>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-xl font-bold dark:text-neutral-800">
            {type.includes("signup") ? "Verify your email" : "Verify it's you"}
          </CardTitle>
          {codeSent && (
            <CardDescription>
              Enter the 6-digit code sent to{" "}
              <span className="font-bold">{email}</span> email address
            </CardDescription>
          )}
          {!codeSent && (
            <div className="text-sm text-black/70 text-wrap">
              {"We'll send a"} 6-digit code sent to{" "}
              <span className="font-bold">{email}</span> to{" "}
              {type.includes("signup") ? "verify the email" : "verify it's you"}{" "}
              <div className="note bg-gray-100 py-2 rounded-md md:mx-6 mt-3 text-black/80">
                <span className="font-bold">Note:</span>{" "}
                <span className="font-medium">
                  {" "}
                  The sent code will expire in 10 minutes
                </span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4 dark:bg-white">
          {!codeSent && (
            <>
              <Button
                type="button"
                disabled={status === "executing"}
                onClick={handleClick}
                style={{
                  background: colors.defaultblue + "10",
                  color: colors.defaultblue,
                }}
                className="flex disabled:opacity-50 items-center gap-x-2 bg-gray-100 text-sm w-full font-semibold hover:bg-gray-200 text-black/80 rounded-md h-12"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Send Code</p>
              </Button>
            </>
          )}
          {codeSent && (
            <>
              {" "}
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  pattern="^[0-9]+$"
                  onChange={(val) => setValue(val)}
                >
                  <InputOTPGroup className="dark:border-neutral-400">
                    <InputOTPSlot
                      index={0}
                      className="dark:border-neutral-300 dark:text-neutral-700"
                    />
                    <InputOTPSlot
                      index={1}
                      className="dark:border-neutral-300 dark:text-neutral-700"
                    />
                    <InputOTPSlot
                      index={2}
                      className="dark:border-neutral-300 dark:text-neutral-700"
                    />
                    <InputOTPSlot
                      index={3}
                      className="dark:border-neutral-300 dark:text-neutral-700"
                    />
                    <InputOTPSlot
                      index={4}
                      className="dark:border-neutral-300 dark:text-neutral-700"
                    />
                    <InputOTPSlot
                      index={5}
                      className="dark:border-neutral-300 dark:text-neutral-700"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex text-sm justify-center text-muted-foreground">
                <p>
                  {resendEnabled ? (
                    <Link href="#" prefetch={false} onClick={handleResendCode}>
                      {"Didn't"} Recieve Code?{" "}
                      <span className="underline">Resend code</span>{" "}
                    </Link>
                  ) : (
                    `Resend code in ${countdown} seconds`
                  )}
                </p>
              </div>
            </>
          )}
        </CardContent>
        {codeSent && (
          <CardFooter>
            <Button
              style={{ background: colors.defaultblue }}
              type="submit"
              onClick={handleVerification}
              disabled={
                value == null ||
                value?.length < 6 ||
                status === "executing" ||
                resendCodeStatus === "executing" ||
                verificationStatus === "executing"
              }
              className="w-full h-12 font-bold flex items-center gap-x-1"
            >
              <p>Verify code</p>
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
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
