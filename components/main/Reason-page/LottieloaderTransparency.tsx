"use client";
import React from "react";
import Lottie from "lottie-react";
import dynamic from "next/dynamic";
import animationData from "@/public/assets/transparency.json";

export default function LottieloaderTransperency() {
  const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
    ssr: false,
  });
  return (
    <div className="  /bg-blue-50/80 rounded-xl w-full py-6 md:py-0 flex items-center justify-center h-full">
      <Lottie
        animationData={animationData}
        className="size-24 grayscale opacity-20"
      />
    </div>
  );
}
