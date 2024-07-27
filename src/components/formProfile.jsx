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
      console.log(result.message);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium mb-2">Name</h2>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Email</h2>
          <input
            name="email"
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-600 transition duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
};
