import React from "react";
import Image from "next/image";
import cardImage from "@/public/assets/cardImage.jpg";

export default function ImageJuggler() {
  return (
    <div className="relative w-full flex items-center justify-center h-full">
      <Image
        src={cardImage}
        alt="Credit card illustration"
        quality={100}
        width={1000}
        height={1000}
        className="object-cover"
      />
    </div>
  );
}
