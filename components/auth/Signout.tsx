"use client";
import { logout } from "@/server/dashboard/navActions";
import React from "react";

export default function Signout() {
  return (
    <div className="fixed w-full p-3">
      <button
        onClick={() => logout()}
        className="action inline left-0 bottom-20 text-white bg-base-color p-3 rounded-md font-bold text-xs"
      >
        Signout
      </button>
    </div>
  );
}
