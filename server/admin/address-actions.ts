"use server";

import Address, { PaymentAddress } from "@/server/addressSchema";
import { revalidatePath } from "next/cache";
import dbConnect from "..";

export async function updateAddress(address: PaymentAddress) {
  try {
    await dbConnect();

    // Check if the document exists
    let existingAddress = await Address.findOne({ name: address.name });

    if (existingAddress) {
      // If it exists, update it
      existingAddress.set(address);
      const result = await existingAddress.save();

      if (!result) {
        return { success: false, error: "Failed to update address" };
      }
    } else {
      // If it doesn't exist, create a new one
      const newAddress = new Address(address);
      const result = await newAddress.save();

      if (!result) {
        return { success: false, error: "Failed to create new address" };
      }
    }

    console.log("Updated/Created address:", address);

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating payment address:", error);
    return { success: false, error: String(error) };
  }
}
