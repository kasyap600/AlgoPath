// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import BrandLogo from "../assets/brand.svg";

export default function Header({ compact = false }) {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">


        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
            <button onClick={() => document.documentElement.classList.remove("dark")} className="px-2 py-1 rounded-full text-sm">☀️</button>
            <button onClick={() => document.documentElement.classList.add("dark")} className="px-2 py-1 rounded-full text-sm">🌙</button>
          </div>

          <div className="hidden sm:flex items-center gap-3 px-3 py-1 rounded-lg">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 grid place-items-center text-white font-medium">
              {user?.email?.[0]?.toUpperCase?.() || "U"}
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{user?.displayName || user?.email || "You"}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Student</div>
            </div>
          </div>

          <button onClick={handleLogout} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
