import PaymentSelect from "@/components/auth/PaymentMeans/PaymentSelect";
import Signout from "@/components/auth/Signout";
import React from "react";

export default function page() {
  return (
    <div className="bg-grid-blue-50">
      <div className="mt-3"></div>
      <PaymentSelect />
    </div>
  );
}
