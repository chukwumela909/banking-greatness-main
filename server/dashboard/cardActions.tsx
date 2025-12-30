"use server";
import dbConnect from "..";
import { z } from "zod";
import User from "../userSchema";
import { actionClient } from "@/lib/safeActionClient";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Define a schema specifically for checking the email and phone
const creditCard = z.object({
  cardType: z.string(),
  cardNumber: z.string(),
  cardExpiry: z.string(),
  cardCVC: z.string(),
  cardBillingAddress: z.string(),
  cardZipCode: z.string(),
});

export const createCard = actionClient
  .schema(creditCard)
  .action(
    async ({
      parsedInput: {
        cardNumber,
        cardExpiry,
        cardCVC,
        cardType,
        cardBillingAddress,
        cardZipCode,
      },
    }) => {
      await dbConnect();
      const email = cookies().get("userEmail")?.value;
      try {
        const user = await User.findOne({
          email,
        });

        if (user) {
          user.card = {
            cardNumber,
            cardExpiry,
            cardCVC,
            cardType,
            cardBillingAddress,
            cardZipCode,
          };

          user.notifications.push({
            dateAdded: new Date(),
            id: crypto.randomUUID(),
            status: "success",
            type: "card",
            message: `Your ${cardType} credit card has been created and issues`,
          });
          user.readNotification = false;

          user.save();
        }
        revalidatePath("/");
        return {
          message: `${cardType} card created succesfully`,
          data: { cardNumber, cardExpiry, cardCVC },
        };
      } catch (error) {
        console.error("Error Creating card", error);
        throw new Error("Error attempting card creation");
      }
    }
  );
export const DeleteCard = actionClient.action(async () => {
  await dbConnect();
  const email = cookies().get("userEmail")?.value;
  try {
    const user = await User.findOne({
      email,
    });

    if (user) {
      user.card = {
        cardNumber: "",
        cardExpiry: "",
        cardCVC: "",
        cardType: "",
        cardBillingAddress: "",
        cardZipCode: "",
      };
      user.notifications.push({
        dateAdded: new Date(),
        id: crypto.randomUUID(),
        status: "success",
        type: "card",
        message: `Your credit card has been revoked and deleted`,
      });
      user.readNotification = false;
      user.save();
    }
    revalidatePath("/");
    return {
      message: `Credit Card deletion successful`,
    };
  } catch (error) {
    console.error("Error Deleting card", error);
    throw new Error("Error attempting card deletion");
  }
});
