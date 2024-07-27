"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export async function loginAction(_, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!findUser) {
    return {
      status: "error",
      message: "User not found",
      data: {
        email,
        password,
      },
    };
  }

  const isPasswordMatch = await bcrypt.compare(password, findUser.password);

  if (!isPasswordMatch) {
    return {
      status: "error",
      message: "Invalid Credential",
      data: {
        email,
        password,
      },
    };
  }

  const payload = {
    id: findUser.id,
    name: findUser.name,
    email: findUser.email,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  cookies().set("token", jwtToken, { httpOnly: true, secure: true });

  redirect("/");
}
