"use client";

import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";

export const Toast = ({ state }) => {
  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state?.message);
    } else if (state?.status === "error") {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
