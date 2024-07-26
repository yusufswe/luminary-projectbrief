"use client"

/* eslint-disable @next/next/no-img-element */
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/styles/globals.css";
import { useState,useEffect } from "react";
import { authCheck } from "./actionAuth";
import AuthContext from "./authContext";

export default function RootLayout({ children }) {
  const [auth, setAuth] = useState(false);

  // async function fetchData() {
  //       const user = await authCheck();
  //       if (user) {
  //         setAuth(true);
  //       }
  //     }

  // fetchData();


  const login = () => {
    setAuth(true);
  }

  const logout = () => {
    setAuth(false);
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
    <html lang="en">
      <body
        className={`${inter.className} bg-white  min-h-dvh tracking-tight`}
      >
        {auth != false ? (
          <div className="container flex justify-between items-center">
            <div className="text-xl font-bold">Brief AI</div>
            <div className="flex items-center">
              <a href="/bookmark">
              <button className="btn btn-ghost">Bookmarks</button>
              </a>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost">
                  <div className="avatar">
                    <div className="rounded-full w-8 h-8">
                      {/* Replace with user avatar */}
                      <img src="user.png" alt="User Avatar" />
                    </div>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a href="">Profile</a>
                  </li>
                  <li>
                    <button className="bg-red-500 hover:bg-red-900"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <header className="bg-base-100 shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
              <div className="text-xl font-bold">Brief AI</div>
              <div>
                <a href="/login">
                <button className="btn btn-primary mr-2">LogIn</button>
                </a>
                <a href="/register">
                <button className="btn btn-secondary">Register</button>
                </a>
              </div>
            </div>
          </header>
        )}
        {children}
      </body>
    </html>
    </AuthContext.Provider>
  );
}
