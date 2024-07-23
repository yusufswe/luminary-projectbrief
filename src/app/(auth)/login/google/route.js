import { google } from "@/utils/arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { prisma } from "@/utils/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const codeVerifier = cookies().get("codeVerifier").value;

  const tokens = await google.validateAuthorizationCode(code, codeVerifier);

  const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });

  const user = await res.json();

  const findUser = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });

  if (!findUser) {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
    cookies().set("token", jwtToken);

    redirect("/");
  }

  const payload = {
    id: findUser.id,
    name: findUser.name,
    email: findUser.email,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
  cookies().set("token", jwtToken);

  redirect("/");
}
