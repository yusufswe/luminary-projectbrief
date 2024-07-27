"use client";

import { useActionState } from "react";
import { loginAction } from "./action";
import { Toast } from "@/components/toast";
import Link from "next/link";
import { GoogleLogin } from "@/components/googleLogin";
import { useEffect } from  "react";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <main className="flex justify-center items-center h-screen">
      <Toast state={state} />
      <form action={formAction} className="w-[300px] space-y-4">
        <h1 className="text-3xl text-center font-bold">Login</h1>
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
              <span className="opacity-0">Login</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-t-2 border-r-2 border-blue-200 rounded-full animate-spin"></div>
              </div>
            </>
          ) : (
            "Login"
          )}
        </button>
        <div className="flex items-center justify-center space-x-4">
          <hr className="w-full border-gray-600" />
          <span className="px-4 text-gray-400">or</span>
          <hr className="w-full border-gray-600" />
        </div>
        <GoogleLogin />
        <div className="text-center">
          <span>Dont have an account?</span>
          <Link
            href="/register"
            className="text-blue-700  font-semibold tracking-wide"
          >
            {" "}
            Register
          </Link>
        </div>
      </form>
    </main>
  );
}
