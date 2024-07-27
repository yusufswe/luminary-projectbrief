"use client";

import { logout } from "@/libs/logout";

const LogoutButton = ({ }) => {

  const handleLogout = () => {
    logout();
  };

  return (
    <li onClick={handleLogout}>
      <a>Logout</a>
    </li>
  );
};

export default LogoutButton;
