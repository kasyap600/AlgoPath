// src/pages/Register.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setErrorMsg("Please provide an email and password.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, normalizedEmail, password);

      // Try to set displayName (non-blocking)
      if (displayName && cred?.user) {
        try {
          await updateProfile(cred.user, { displayName: displayName.trim() });
        } catch (err) {
          console.warn("updateProfile failed:", err);
        }
      }

      navigate("/home");
    } catch (err) {
      const code = err?.code || "";
      if (code === "auth/email-already-in-use") {
        setErrorMsg("This email is already registered. Try logging in.");
      } else if (code === "auth/invalid-email") {
        setErrorMsg("Please enter a valid email address.");
      } else if (code === "auth/weak-password") {
        setErrorMsg("Password is too weak. Use at least 6 characters.");
      } else {
        setErrorMsg(err?.message || "Registration failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-gray-950 py-12">
      <div className="w-full max-w-4xl mx-6">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left: Brand + Illustration */}
          <div className="relative hidden md:flex items-center justify-center p-12 bg-gradient-to-br from-white via-white to-neutral-50 dark:from-gray-900/40 dark:via-gray-900/30">
            <div className="w-full max-w-sm">
              <div className="flex items-center gap-3 mb-8">
                <img src="/assets/brand.svg" alt="DSA Tracker logo" className="w-10 h-10" />
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Algo Path</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 -mt-0.5">
                    Build streaks. Track topics. Crush interviews.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <img src="/assets/hero-ill.png" alt="Progress illustration" className="w-full h-auto select-none" />
              </div>

              <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-0.5 w-6 h-6 rounded-full bg-neutral-100 dark:bg-gray-800 grid place-items-center text-xs font-medium text-neutral-700">✓</span>
                  <span>Email-based auth connected to Firebase</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-0.5 w-6 h-6 rounded-full bg-neutral-100 dark:bg-gray-800 grid place-items-center text-xs font-medium text-neutral-700">★</span>
                  <span>Track practice, earn XP, and level up</span>
                </li>
              </ul>
            </div>
            <div aria-hidden className="absolute -right-20 -bottom-14 w-56 h-56 rounded-full bg-gradient-to-tr from-neutral-100 to-neutral-50 opacity-60 blur-3xl dark:opacity-30" />
          </div>

          {/* Right: Registration Form */}
          <div className="p-8 md:p-12">
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Create your account</h1>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Join DSA Tracker — keep streaks, track topics, and level up.
              </p>
            </header>

            <form onSubmit={handleRegister} className="space-y-5" noValidate>
              {errorMsg && (
                <div role="alert" className="rounded-md bg-red-50 border border-red-100 p-3 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}

              <div>
                <label htmlFor="displayName" className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-2">
                  Full name (optional)
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-neutral-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition placeholder:text-neutral-300 text-neutral-900 dark:text-neutral-100"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-neutral-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition placeholder:text-neutral-300 text-neutral-900 dark:text-neutral-100"
                  placeholder="you@college.edu"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-neutral-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition placeholder:text-neutral-300 text-neutral-900 dark:text-neutral-100"
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label htmlFor="confirm" className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-2">
                  Confirm password
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-neutral-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition placeholder:text-neutral-300 text-neutral-900 dark:text-neutral-100"
                  placeholder="Re-type password"
                />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className={`w-full rounded-xl py-3 text-white text-sm font-semibold shadow-sm transform transition ${loading ? "bg-indigo-300 cursor-wait" : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.995]"}`}
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>

                <Link
                  to="/login"
                  className="w-full text-center block rounded-xl py-3 border border-neutral-200 bg-white text-sm font-medium hover:shadow-sm transition"
                >
                  Already have an account? Log in
                </Link>
              </div>

              <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
                <span>By creating an account you agree to our </span>
                <Link to="/terms" className="text-indigo-600 hover:underline">Terms</Link>
                <span className="mx-1">&</span>
                <Link to="/privacy" className="text-indigo-600 hover:underline">Privacy</Link>
              </div>
            </form>

            <p className="mt-6 text-xs text-neutral-400 dark:text-neutral-500 text-center">
              Need help? <Link to="/help" className="text-indigo-600 hover:underline">Contact support</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
