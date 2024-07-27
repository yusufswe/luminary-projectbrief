"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    cookies().set("token", { value: "", maxAge: 0 });
    redirect( "/login");
}
