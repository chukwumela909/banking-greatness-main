"use client";
import React from "react";
import Lottie from "lottie-react";
import dynamic from "next/dynamic";
import animationData from "@/public/assets/lottieprivacy.json";

export default function LottieLoaderPrivacy() {
  const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
    ssr: false,
  });
  return (
    <div className=" /bg-blue-50/80 rounded-xl py-5 md:py-0 w-full  flex items-center justify-center h-full">
      <Lottie
        animationData={animationData}
        className="size-20 grayscale opacity-20"
      />
    </div>
  );
}
