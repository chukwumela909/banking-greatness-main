"use client";
import React from "react";
import dynamic from "next/dynamic";
import animationData from "@/public/assets/update.json";

export default function LottieLoaderUpdate() {
  const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
    ssr: false,
  });
  return (
    <div className="  /bg-blue-50/80 rounded-xl w-full flex items-center justify-center h-full">
      <Lottie
        animationData={animationData}
        className="size-24 grayscale opacity-20"
      />
    </div>
  );
}
