import Transfers from "@/components/dashboard/transfers/Transfer";
import React from "react";

export default function page() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-md p-3 h-[calc(100vh-5.5rem)] w-[calc(100vw-0.8rem)] md:w-full  pb-[4.5rem]  overflow-x-hidden">
      <Transfers />
    </div>
  );
}
