import React from "react";
import AddressEdit from "@/components/admin/UserEdits/AddresssEdit";
import dbConnect from "@/server";
import Address, { PaymentAddress } from "@/server/addressSchema";

export const dynamic = "force-dynamic";

export default async function Page() {
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
      <AddressEdit data={data} />
    </div>
  );
}
