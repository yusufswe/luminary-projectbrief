"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/utils/prisma";

export async function registerAction(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return { status: "error", message: "Data Tidak boleh kosong" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return { status: "error", message: "Email sudah terdaftar" };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return { status: "success", message: "Berhasil register" };
  } catch (error) {
    console.error("Error during registration:", error);
    return { status: "error", message: "Terjadi kesalahan saat registrasi" };
  }
}
