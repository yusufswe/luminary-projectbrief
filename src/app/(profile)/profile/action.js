// action.js
"use server";
import { uploadFile } from "@/libs/uploadFile";
import { prisma } from "@/utils/prisma";
import { auth } from "@/libs/auth";

export async function ProfileAction(_, formData) {
  const user = auth();

  const name = formData.get("name");
  const file = formData.get("file");
  const updateData = {};

  if (name) updateData.name = name;

  try {
    const profile = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    if (file) {
      await uploadFile({ key: file.name, body: file, folder: profile.id });
      await prisma.user.update({
        where: { id: profile.id },
        data: { photoUrl: `${file.name}` },
      });
    }

    return { status: "success", message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { status: "error", message: "Failed to update profile" };
  }
}
