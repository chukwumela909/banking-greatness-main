"use server";
import dbConnect from "..";
import { z } from "zod";
import User from "../userSchema";
import { actionClient } from "@/lib/safeActionClient";

// Define a schema specifically for checking the email and phone
const checkEmailPhoneSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().nonempty().optional(),
});
const checkSsnSchema = z.object({
  ssn: z.string().nonempty().optional(),
});
export const checkEmail = actionClient
  .schema(checkEmailPhoneSchema)
  .action(async ({ parsedInput: { email, phone } }) => {
    await dbConnect();

    try {
      const userExists = await User.findOne({
        $or: [{ email }, { phone }],
      });

      if (userExists) {
        return { exists: true };
      } else {
        return { exists: false };
      }
    } catch (error) {
      console.error("Error checking email and phone existence:", error);
      throw new Error("Error checking email and phone existence");
    }
  });

export const checkSsn = actionClient
  .schema(checkSsnSchema)
  .action(async ({ parsedInput: { ssn } }) => {
    await dbConnect();
    try {
      const ssnExist = await User.findOne({ ssn });
      if (ssnExist) {
        return { exists: true };
      } else {
        return { exists: false };
      }
    } catch (error) {}
  });
