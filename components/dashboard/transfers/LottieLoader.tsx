"use client";
import React from "react";
import dynamic from "next/dynamic";
import animationData from "./transfer-anim.json";

export default function LottieLoader() {
  const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
    ssr: false,
  });
  return (
    <div className=" top-0 left-0 w-full h-full flex items-center justify-center">
      <Lottie
        animationData={animationData}
        className="w-full h-[10rem] opacity-60"
      />
    </div>
  );
}
