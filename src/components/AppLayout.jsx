// src/components/AppLayout.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { FaMoon, FaSun, FaChevronDown } from "react-icons/fa";
import BrandLogo from "../assets/brand.svg"; // optional - replace or remove

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("dsa-theme") || "dark";
    } catch {
      return "dark";
    }
  });

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    // auth state
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    // theme application
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("dsa-theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    function onDocClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const goHome = () => navigate("/home");

  // show search bar only on explorer pages
  const showSearch =
    location.pathname.startsWith("/plans/beginner-to-advance") ||
    location.pathname.startsWith("/explorer");

  return (
    <div className="min-h-screen bg-[#07070a] text-gray-100">
      <header className="sticky top-0 z-40 bg-gradient-to-b from-[#06060a]/60 to-transparent border-b border-white/6 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 h-16">
            {/* LEFT: Logo + Title */}
            <div className="flex items-center gap-3">
              {BrandLogo ? (
                <img src={BrandLogo} alt="logo" className="w-10 h-10 rounded-md" />
              ) : (
                <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-indigo-500 to-purple-500 grid place-items-center text-white font-bold">
                  D
                </div>
              )}
              <div className="hidden sm:block">
                <div className="text-2xl font-extrabold tracking-tight text-indigo-300">
                  DSA Explorer
                </div>
                <div className="text-xs text-gray-400">Track · Solve · Level up</div>
              </div>
            </div>

            {/* CENTER: Search bar (only if showSearch true) */}
            {showSearch && (
              <div className="flex-1 flex justify-center">
                <div className="w-full max-w-2xl">
                  <input
                    type="text"
                    placeholder="Search problems, e.g., Two Sum, Binary Search..."
                    className="w-full bg-[#0b0f19] border border-white/6 rounded-xl py-3 pl-4 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Search problems"
                  />
                </div>
              </div>
            )}

            {/* RIGHT: Theme toggle, Home, Profile */}
            <div className="flex items-center gap-4 ml-auto">
              <button
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                className="p-2 rounded-md bg-white/3 hover:bg-white/6 transition"
                title="Toggle theme"
              >
                {theme === "dark" ? (
                  <FaMoon className="text-yellow-300" />
                ) : (
                  <FaSun className="text-orange-400" />
                )}
              </button>

              <button
                onClick={goHome}
                className={`hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-md ${
                  location.pathname === "/home" ? "bg-white/6" : "bg-transparent"
                } hover:bg-white/6`}
              >
                Home
              </button>

              {/* Profile dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/3 hover:bg-white/6"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 grid place-items-center text-white font-semibold">
                    {user?.email?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <FaChevronDown className="text-gray-300" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0b0f19] border border-white/6 rounded-md shadow-lg overflow-hidden">
                    <div className="p-3 text-sm text-gray-300">
                      <div className="font-semibold mb-1">
                        {user?.displayName ?? user?.email}
                      </div>
                      <div className="text-xs text-gray-400 mb-2">Member</div>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/profile");
                        }}
                        className="w-full text-left px-3 py-2 rounded hover:bg-white/4"
                      >
                        View profile
                      </button>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-3 py-2 rounded text-rose-400 hover:bg-white/4"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
