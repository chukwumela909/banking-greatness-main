import React from "react";
import { Inter } from "next/font/google";
import TransferInfo from "./TransferInfo";
import TransferHeaders from "./TransferHeaders";
import TransferHistory from "./TransferHistory";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Transfers() {
  return (
    <div>
      {" "}
      <TransferHeaders />
      <TransferInfo />
      <TransferHistory />
    </div>
  );
}
