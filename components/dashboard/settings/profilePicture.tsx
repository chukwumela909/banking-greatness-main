"use client";

import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Pen } from "lucide-react";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { toast } from "sonner";
import { uploadImage } from "@/server/dashboard/settingActions";

export default function ProfilePicture() {
  const { data: deets, refetch } = useFetchInfo();
  const data = deets!.data;
  const [isUploading, setIsUploading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        await uploadImage(formData);
        await refetch(); // Refresh user data
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to update profile picture. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className=" rounded-sm border-none bg-neutral-50 dark:bg-neutral-800 p-0">
      <div className="p-4">
        <div className="text-base text-neutral-700 dark:text-neutral-400 font-semibold py-1">
          Profile Picture
        </div>
        <div className="mt- text-sm text-neutral-500 dark:text-neutral-300 font-medium">
          Update your profile picture
        </div>
      </div>
      <CardContent className="flex w-full justify-center dark:bg-neutral-800 items-center p-4 space-x-2">
        <button
          disabled={isUploading}
          className="relative  disabled:opacity-30 mx-auto rounded-full size-28 cursor-pointer overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Avatar
            className="size-28 cursor-pointer overflow-hidden"
            onClick={triggerFileInput}
          >
            <AvatarImage
              src={data.profilePictureLink}
              alt="Profile picture"
              className="border-neutral-500/10"
            />
            <AvatarFallback className="font-bold text-2xl border border-base-color/30 text-base-color/80 bg-base-color/5 dark:text-blue-500 dark:bg-blue-500/5 dark:border-blue-500/30">
              {data.firstName.charAt(0).toUpperCase()}
              {data.lastName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isHovering && (
            <div
              onClick={triggerFileInput}
              className="absolute animate__animated animate__fadeInUp animate__faster cursor-pointer  inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
            >
              <Pen className="text-white" size={24} />
            </div>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          aria-label="Upload profile picture"
        />
        <div>
          <button
            onClick={triggerFileInput}
            disabled={isUploading}
            className="rounded-sm font-semibold py-2 px-4 text-sm disabled:opacity-35 bg-neutral-100 text-neutral-600 dark:bg-blue-500/10 dark:text-blue-500"
          >
            {isUploading ? "Changing ..." : "Change Picture"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
