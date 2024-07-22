"use client";
import { loginWithGoogleAction } from "@/app/(auth)/login/actionLoginWithGoogle";

export const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      // Call your Google login action here
      await loginWithGoogleAction();
      // Redirect or update UI as needed
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-blue-500 p-2 hover:bg-blue-700 text-white transition-colors duration-300"
      type="button"
    >
      Continue with Google
    </button>
  );
};
