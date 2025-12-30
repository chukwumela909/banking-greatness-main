"use client";
import React from "react";
import Lottie from "lottie-react";
import dynamic from "next/dynamic";
import animationData from "@/public/assets/lottieload.json";

export default function LottieLoader() {
  const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
    ssr: false,
  });
  return (
    <div>
      <Lottie
        animationData={animationData}
        className="w-full h-[15rem] md:h-[22rem] "
      />
    </div>
  );
}
