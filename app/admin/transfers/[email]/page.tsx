import TransfersPage from "@/components/admin/UserEdits/TransfersPage";
import dbConnect from "@/server";
import User, { IUser } from "@/server/userSchema";
import React from "react";

export default async function Transfers({
  params,
}: {
  params: { email: string };
}) {
  await dbConnect();

  const email = params.email.replace("%40", "@");
  const rawData = await User.findOne({ email });
  const data: IUser = JSON.parse(JSON.stringify(rawData));

  return (
    <div className="w-full h-screen overflow-scroll dark:bg-neutral-950">
      <TransfersPage data={data} />
    </div>
  );
}
