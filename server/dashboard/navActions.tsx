"use server";

import { actionClient } from "@/lib/safeActionClient";
import { cookies } from "next/headers";
import { z } from "zod";
import dbConnect from "..";
import User from "../userSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const deleteCardIdSchema = z.object({
  id: z.any(),
});

export const logout = () => {
  cookies().delete("userEmail");
  redirect("/auth/login");
};

export const deleteNotification = actionClient
  .schema(deleteCardIdSchema)
  .action(async ({ parsedInput: { id } }) => {
    await dbConnect();
    const email = cookies().get("userEmail")?.value;

    try {
      const user = await User.findOne({ email });
      if (user) {
        user.notifications = user.notifications.filter(
          (notification) => notification.id !== id
        );
        revalidatePath("/dashboard");
        user.save();
      }
      return { message: "Notification deleted succesfully" };
    } catch (error) {}
  });

export const readNotifications = async () => {
  const email = cookies().get("userEmail")?.value;
  const user = await User.findOne({ email });
  if (user) {
    user.readNotification = true;
    user.save();
    revalidatePath("/dashboard");
  }
};
