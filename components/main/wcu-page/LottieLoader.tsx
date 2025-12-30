"use client";
import React from "react";
import Lottie from "lottie-react";
import dynamic from "next/dynamic";
import animationData from "@/public/assets/bankLoad.json";
import { StringExpression } from "mongoose";

export default function LottieLoader({
  className,
  size,
}: {
  className: string | undefined;
  size: string | undefined;
}) {
  const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
    ssr: false,
  });
  return (
    <div className={className}>
      <Lottie animationData={animationData} className={size} />
    </div>
  );
}
