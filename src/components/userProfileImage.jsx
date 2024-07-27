"use client";
import { ProfileAction } from "@/app/(profile)/profile/action.js";
import Image from "next/image";

export const UserProfileImage = ({ user }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await ProfileAction(null, formData);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <form className="space-y-3">
      <Image
        width={300}
        height={300}
        alt="profile image"
        src={`${process.env.R2_PUBLIC_URL}/brief-project-ai/${user.id}/${user.photoUrl}`}
        className="bg-red-800 rounded-full object-cover w-32 h-32"
      />{" "}
      <label className="w-full bg-transparent text-center text-white font-semibold cursor-pointer">
        Upload Photo
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </label>
    </form>
  );
};
