// formProfile.jsx
"use client";
import { ProfileAction } from "@/app/(profile)/profile/action.js";
import { useState } from "react";

export const FormProfile = ({ user }) => {
  const [name, setName] = useState(user?.name || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);

    try {
      const result = await ProfileAction(null, formData);
      // Handle success (e.g., show a success message)
      console.log(result.message);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-3">
        <h2 className="mt-12">Name</h2>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Yusuf"
        />
        <h2>Email</h2>
        <input
          name="email"
          type="email"
          value={user?.email || ""}
          readOnly
          className="bg-gray-100 cursor-not-allowed"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-slate-700 text-white py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};
