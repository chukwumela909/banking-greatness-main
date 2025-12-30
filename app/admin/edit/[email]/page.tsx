import UserEdit from "@/components/admin/UserEdits/DetailsEdit";
import dbConnect from "@/server";
import User, { IUser } from "@/server/userSchema";
import React from "react";

export default async function Edit({ params }: { params: { email: string } }) {
  await dbConnect();

  const email = params.email.replace("%40", "@");
  const rawData = await User.findOne({ email });
  const data: IUser | null = JSON.parse(JSON.stringify(rawData));

  return (
    <div className="dark:bg-neutral-900">
      <UserEdit data={data} />
    </div>
  );
}
