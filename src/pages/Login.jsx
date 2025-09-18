// src/pages/Login.jsx
import React, { useState } from "react";
import { auth, provider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Animated Login (Framer Motion + Tailwind)
 * - Entrance animation for the card
 * - Floating illustration animation
 * - Button hover/press micro-interactions
 * - Error shake when login fails
 * - Optional displayName field (applied after sign-in)
 *
 * Make sure /assets/brand.svg and /assets/hero-ill.png exist (or change paths).
 */

export default function Login() {
  const navigate = useNavigate();

  // form
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [shakeKey, setShakeKey] = useState(0); // trigger shake animation

  // Animations
  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.995 },
    enter: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 280, damping: 30 } },
    exit: { opacity: 0, y: 12 },
  };

  const floatVariants = {
    float: {
      y: [0, -10, 0],
      rotate: [0, 1, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setErrorMsg("Please enter email and password.");
      setLoading(false);
      setShakeKey(k => k + 1);
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, normalizedEmail, password);

      // if user provided displayName (optional), set it if not present
      if (displayName && cred?.user && !cred.user.displayName) {
        try {
          await updateProfile(cred.user, { displayName: displayName.trim() });
        } catch (err) {
          // non-fatal
        }
      }

      navigate("/home");
    } catch (err) {
      const code = err?.code || "";
      if (code === "auth/user-not-found" || code === "auth/wrong-password") {
        setErrorMsg("Invalid email or password.");
      } else if (code === "auth/invalid-email") {
        setErrorMsg("Please enter a valid email address.");
      } else {
        setErrorMsg(err?.message || "Sign in failed. Try again.");
      }
      setLoading(false);
      setShakeKey(k => k + 1);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      // if displayName provided and profile missing
      if (displayName && result?.user && !result.user.displayName) {
        try {
          await updateProfile(result.user, { displayName: displayName.trim() });
        } catch (err) {}
      }
      navigate("/home");
    } catch (err) {
      setErrorMsg(err?.message || "Google sign-in failed.");
      setLoading(false);
      setShakeKey(k => k + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-50 dark:from-black dark:to-slate-900">
      {/* Decorative animated background blob */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute -left-36 top-[-8rem] w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-indigo-100/40 to-purple-100/30 blur-3xl dark:from-indigo-900/30 dark:to-purple-900/20" />
        <div className="absolute right-[-14rem] bottom-[-8rem] w-[36rem] h-[36rem] rounded-full bg-gradient-to-bl from-cyan-100/30 to-rose-100/20 blur-3xl dark:from-cyan-900/25 dark:to-rose-900/15" />
      </motion.div>

      <AnimatePresence>
        <motion.div
          key={shakeKey} // re-mounts inner form to replay shake if needed
          variants={cardVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          className="relative z-10 w-full max-w-4xl mx-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
            {/* LEFT: Illustration + branding */}
            <div className="relative hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-white via-white to-slate-50 dark:from-gray-900/30 dark:via-gray-900/20">
              <motion.div
                className="absolute inset-0 opacity-0 md:opacity-100"
                variants={floatVariants}
                animate="float"
                aria-hidden
              >
                {/* subtle floating illustration container */}
                <div className="w-full h-full flex items-center justify-center">
                  <img src="/assets/hero-ill.png" alt="" className="max-w-[26rem] pointer-events-none" />
                </div>
              </motion.div>

              <div className="relative z-10 w-full max-w-sm">
                <div className="flex items-center gap-3 mb-6">
                  <img src="/assets/brand.svg" alt="DSA Tracker" className="w-10 h-10" />
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Algo Path</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Practice · Track · Level up</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Structured learning paths, streaks, and 150+ interview problems — all in a calm, focused workspace.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex w-6 h-6 rounded-full bg-slate-100 dark:bg-gray-800 items-center justify-center text-xs">✓</span>
                    <span>Daily study plans</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex w-6 h-6 rounded-full bg-slate-100 dark:bg-gray-800 items-center justify-center text-xs">★</span>
                    <span>Progress tracking & notes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT: Form (animated shaking on error) */}
            <motion.div
              key={"form-" + shakeKey}
              initial={{ x: 0 }}
              animate={errorMsg ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
              transition={errorMsg ? { duration: 0.6 } : { duration: 0 }}
              className="p-8 md:p-12"
            >
              <header className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Sign in to continue to your DSA practice dashboard</p>
              </header>

              <form onSubmit={handleLogin} className="space-y-5" noValidate>
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="rounded-md bg-red-50 border border-red-100 p-3 text-sm text-red-700"
                      role="alert"
                    >
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Display name (optional) */}
                <div>
                  <label htmlFor="displayName" className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">Display name (optional)</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="How should we call you?"
                    className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">Email</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@college.edu"
                    className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-xs font-medium text-slate-600 dark:text-slate-300">Password</label>
                    <Link to="/forgot" className="text-xs text-indigo-600 hover:underline">Forgot?</Link>
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileTap={{ scale: 0.995 }}
                    className={`w-full rounded-xl py-3 text-white text-sm font-semibold shadow-sm transform transition ${loading ? "bg-indigo-300 cursor-wait" : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.995]"}`}
                    aria-busy={loading}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    whileTap={{ scale: 0.995 }}
                    className="w-full rounded-xl py-3 border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium flex items-center justify-center gap-3 hover:shadow-sm transition"
                  >
                    {/* Google SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="w-5 h-5" aria-hidden>
                      <path fill="#4285f4" d="M533.5 278.4c0-18-1.6-35.1-4.7-51.8H272v98.2h146.9c-6.4 34.8-25 64.3-53.3 84.1v69.9h86.2c50.6-46.6 80.7-115.3 80.7-199.4z"/>
                      <path fill="#34a853" d="M272 544.3c72 0 132.6-23.9 176.9-64.9l-86.2-69.9c-24 16.1-54.7 25.7-90.7 25.7-69.7 0-128.8-47.2-150-110.6H34.6v69.6C78.9 492.1 168.6 544.3 272 544.3z"/>
                      <path fill="#fbbc04" d="M121.9 325.6c-5.6-16.8-8.9-34.8-8.9-53.6s3.3-36.8 8.9-53.6V148.8H34.6C12.4 191.6 0 232.8 0 272s12.4 80.4 34.6 123.2l87.3-69.6z"/>
                      <path fill="#ea4335" d="M272 107.8c39.2 0 74.4 13.5 102.1 39.9l76.5-76.5C404.6 24.3 344 0 272 0 168.6 0 78.9 52.2 34.6 128.8l87.3 69.6C143.2 155 202.3 107.8 272 107.8z"/>
                    </svg>
                    Continue with Google
                  </motion.button>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
                  <span>Don’t have an account? </span>
                  <Link to="/register" className="text-indigo-600 hover:underline">Create one</Link>
                </div>
              </form>

              <p className="mt-6 text-xs text-slate-400 text-center">
                By signing in you agree to our <Link to="/terms" className="text-indigo-600 hover:underline">Terms</Link> & <Link to="/privacy" className="text-indigo-600 hover:underline">Privacy</Link>.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
