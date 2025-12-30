"use client";

import { PaymentAddress } from "@/server/addressSchema";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateAddress } from "@/server/admin/address-actions";
import { useRouter } from "next/navigation";

export default function AddressEdit({ data }: { data: PaymentAddress }) {
  const [address, setAddress] = useState<PaymentAddress>(data);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await updateAddress(address);
      if (result.success) {
        toast.success("Payment address updated successfully");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(
        "Failed to update payment address: " + (error as Error).message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
      <div
        className="back dark:bg-neutral-800 mt-3 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer dark:text-white text-neutral-500 inline bg-neutral-50"
        onClick={() => {
          const proceed = confirm(
            "You might have unsaved changes, continue anyway?"
          );
          if (proceed) router.back();
        }}
      >
        Back
      </div>
      <h1 className="text-2xl  font-bold mb-6">Edit Payment Address</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {" "}
        {Object.entries(address)
          .filter(([key]) => !["_id", "__v"].includes(key))
          .map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </Label>
              <Input
                type="text"
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full"
                placeholder={`Enter ${key
                  .replace(/([A-Z])/g, " $1")
                  .trim()
                  .toLowerCase()}`}
              />
            </div>
          ))}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
