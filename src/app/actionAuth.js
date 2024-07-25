"use server"

import findById from "@/libs/findById";

export async function authCheck() {
  console.log("auth check");
  const user = await findById();
  return user;
}

