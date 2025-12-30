"use client";
import React from "react";
import Lottie from "lottie-react";
import dynamic from "next/dynamic";
import animationData from "@/public/assets/testlottie.json";

export default function LottieLoader() {
  const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
    ssr: false,
  });
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <Lottie animationData={animationData} className="w-full h-[18rem] " />
    </div>
  );
}
