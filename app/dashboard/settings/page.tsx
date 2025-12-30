import Settings from "@/components/dashboard/settings/Settings";
import React from "react";

export default function Page() {
  return (
    <div className="bg-white dark:bg-neutral-900  rounded-sm md:pt-0.5 p-2 md:p-0 h-[calc(100vh-5.5rem)] w-[calc(100vw-0.8rem)] md:w-full  pb-[4.5rem] md:pb-2  overflow-x-hidden">
      <Settings />
    </div>
  );
}
