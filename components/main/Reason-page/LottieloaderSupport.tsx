"use client";
import React from "react";
import dynamic from "next/dynamic";
import animationData from "@/public/assets/support.json";

export default function LottieloaderSupport() {
  const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
    ssr: false,
  });
  return (
    <div className="  /bg-blue-50/80 rounded-xl w-full py-6 flex items-center justify-center h-full">
      <Lottie
        animationData={animationData}
        className="size-16 grayscale opacity-20"
      />
    </div>
  );
}
