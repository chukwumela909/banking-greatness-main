import Admin from "@/components/admin";
import dbConnect from "@/server";
import User, { IUser } from "@/server/userSchema";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

export default async function AdminPage() {
  noStore();
  await dbConnect();

  const rawData = await User.find({}).lean();
  const data: IUser[] = JSON.parse(JSON.stringify(rawData));

  return (
    <div className="w-full h-screen bg-white dark:bg-neutral-950">
      <Admin initialData={data} />
    </div>
  );
}
