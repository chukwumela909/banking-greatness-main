import PaymentSection from "@/components/auth/signup/PaymentSection";
import dbConnect from "@/server";
import Address, { PaymentAddress } from "@/server/addressSchema";
import React from "react";

export const dynamic = "force-dynamic";

export default async function page() {
  await dbConnect();

  let rawData = await Address.findOne({ name: "capitalnexusonline" });
  
  // Create default document if it doesn't exist
  if (!rawData) {
    rawData = await Address.create({
      name: "capitalnexusonline",
      bitcoin: "",
      ethereum: "",
      litecoin: "",
      dogecoin: "",
      cashapp: "",
      zelle: "",
      venmo: "",
      paypal: "",
    });
  }
  
  const data: PaymentAddress = JSON.parse(JSON.stringify(rawData));

  return (
    <div>
      <PaymentSection data={data} />
    </div>
  );
}
