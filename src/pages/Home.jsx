// src/pages/Home.jsx
import React, { useEffect, useState, useCallback } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CalendarStreak from "../components/CalendarStreak";
import BrandLogo from "../assets/brand.svg";
import problemsData from "../data/problemsData";
import plans from "../data/plans";

// (ConfettiBurst component same as before...)

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [solvedDates, setSolvedDates] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [showWelcomeToast, setShowWelcomeToast] = useState(false);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((u) => {
      if (!u) {
        navigate("/login");
        return;
      }
      setUser(u);

      const metaRef = doc(db, "users", u.uid, "meta", "metaDoc");
      onSnapshot(metaRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setSolvedDates(
            Array.isArray(data.solvedDates)
              ? data.solvedDates.map((d) =>
                  typeof d === "string"
                    ? d.slice(0, 10)
                    : new Date(d).toISOString().slice(0, 10)
                )
              : []
          );
        }
      });

      const progressRef = doc(db, "users", u.uid, "progress", "problems");
      onSnapshot(progressRef, (snap) => {
        const userProgress = snap.exists() ? snap.data() : {};
        const solvedCount = Object.values(userProgress).filter(Boolean).length;
        const total = Object.values(problemsData).reduce(
          (sum, arr) => sum + arr.length,
          0
        );
        setProgressPercent(
          total ? Math.round((solvedCount / total) * 100) : 0
        );
      });

      // show toast once per session
      if (!sessionStorage.getItem(`welcome_${u.uid}`)) {
        setShowWelcomeToast(true);
        sessionStorage.setItem(`welcome_${u.uid}`, "1");
        setTimeout(() => setShowWelcomeToast(false), 3500);
      }
    });

    return () => unsubAuth();
  }, [navigate]);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "You";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Hero & Actions */}
        <section className="col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <img src={BrandLogo} alt="DSA Tracker" className="w-10 h-10" />
            <div>
              <div className="text-xs text-gray-500">Welcome back</div>
              <h1 className="text-3xl font-extrabold">
                Structured study plans that help you get interview-ready
              </h1>
            </div>
          </div>
          <p className="text-gray-600">
            Follow a guided path, measure progress, and focus on the high-impact
            problems recruiters expect.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/plans")}
              className="px-5 py-3 bg-indigo-600 text-white rounded-lg"
            >
              Explore plans
            </button>
            <button
              onClick={() => navigate("/neo")}
              className="px-5 py-3 border rounded-lg"
            >
              Open Explorer
            </button>
          </div>
        </section>

        {/* Right: Calendar instead of DSA stats */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 border shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Your Streak</h3>
          <CalendarStreak solvedDates={solvedDates} />
          <div className="mt-4 text-sm text-gray-500">
            Keep solving daily — 🔥 marks your streak!
          </div>
        </section>
      </main>

      {/* toast */}
      <AnimatePresence>
        {showWelcomeToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35 }}
            className="fixed left-6 bottom-6 z-50 bg-white dark:bg-gray-800 border shadow-lg px-4 py-3 rounded-lg"
          >
            👋 Welcome back, {displayName}!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
