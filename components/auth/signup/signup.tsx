"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import cardImage from "@/public/assets/cardImage.jpg";
import { useColors } from "@/context/colorContext";
import StepsLoader from "./Steps";
import SignUpForm from "./SignUpForm";
import { useState } from "react";
import SignUpFormTwo from "./SignUpFormTwo";

export default function SignUp() {
  const colors = useColors();
  const totalSteps = 2;
  const [steps, setSteps] = useState(0.1);
  return (
    <div className="grid min-h-[100dvh] w-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block w-full h-full /border relative /overflow-hidden">
        <Image
          src={cardImage}
          alt=""
          width="1920"
          height="1080"
          className="/h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center/">
            <h1 className="text-3xl font-bold text-black/70">
              Create an Account
            </h1>
            <p className="text-gray-500 /text-sm dark:text-gray-400">
              Join us today to experience next level banking
            </p>

            <StepsLoader steps={steps} totalSteps={totalSteps} />
          </div>
          {steps >= 0 && steps < 1 && <SignUpForm setSteps={setSteps} />}
          {steps >= 1 && steps < 2 && <SignUpFormTwo setSteps={setSteps} />}
        </div>
      </div>
    </div>
  );
}
