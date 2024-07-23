"use client";

import { useActionState } from "react";
import { registerAction } from "./action";
import { Toast } from "@/components/toast";
import Link from "next/link";
import { GoogleLogin } from "@/components/googleLogin";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, null);

  return (
    <main className="flex justify-center items-center h-screen">
      <Toast state={state} />

      <form action={formAction} className="w-[300px] space-y-4">
        <h1 className="text-3xl font-bold text-center">Register</h1>
        <input
          defaultValue={state?.data?.name}
          name="name"
          placeholder="Name"
        ></input>
        <input
          defaultValue={state?.data?.email}
          name="email"
          placeholder="Email"
          type="email"
        ></input>
        <input
          defaultValue={state?.data?.password}
          name="password"
          placeholder="Password"
          type="password"
        ></input>
        <div>
          <button
            disabled={pending}
            className={`w-full p-2 text-white rounded relative transition-colors duration-300 ${
              pending
                ? "bg-blue-700 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {pending ? (
              <>
                <span className="opacity-0">Register</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-t-2 border-r-2 border-blue-200 rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <hr className="w-full border-gray-600" />
          <span className="px-4 text-gray-400">or</span>
          <hr className="w-full border-gray-600" />
        </div>
        <GoogleLogin />
        <div className="text-center ">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="text-blue-700 font-semibold tracking-wide"
          >
            {" "}
            Login
          </Link>
        </div>
      </form>
    </main>
  );
}
