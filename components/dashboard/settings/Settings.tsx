"use client";

import React from "react";
import { useFetchInfo } from "@/lib/data/fetchPost";

import { Card } from "@/components/ui/card";
import ProfilePicture from "./profilePicture";
import Preferences from "./preferences";
import TransactionPin from "./transactionPin";
import SocialSecurity from "./socialSecurity";
import AccountLimit from "./accountLimit";
import AccountVerification from "./accountVerification";
import PersonalInformation from "./personalInfo";

export default function Settings() {
  return (
    <div className="md:container mx-auto p-2 md:p-4">
      <h1 className="text-lg font-semibold mb-2 md:hidden">Account Settings</h1>

      <div className="grid grid-cols-1 ">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-2">
          <ProfilePicture />
          <Preferences />
          <TransactionPin />
          <SocialSecurity />
          <AccountLimit />
          <AccountVerification />
        </div>

        <PersonalInformation />
      </div>
    </div>
  );
}
