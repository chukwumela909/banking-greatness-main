import FixedHistory from "@/components/dashboard/fixed/FixedHistory";
import HeaderTab from "@/components/dashboard/fixed/HeaderTab";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const currentTab = searchParams.tab || "all";

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-md p-3 h-[calc(100vh-5.5rem)] w-[calc(100vw-0.8rem)] md:w-full  /pb-[4.5rem]  overflow-x-hidden">
      <HeaderTab />
      <div className="separator w-20 h-0.5 my-4 bg-black/10 mx-auto" />
      <div className="">
        {" "}
        <FixedHistory tab={currentTab} />
      </div>
    </div>
  );
}
