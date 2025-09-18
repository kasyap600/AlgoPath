// src/pages/PlansLanding.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import must150 from "../data/150_must_solve";
import thirtyDayPlan from "../data/30_day_plan";
import ninetyDayPlan from "../data/90_day_plan";
import CalendarStreak from "../components/CalendarStreak";
import BrandLogo from "../assets/brand.svg";

export default function PlansLanding() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [progressDoc, setProgressDoc] = useState({});
  const [solvedDates, setSolvedDates] = useState([]);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("dsa-theme") || "dark";
    } catch {
      return "dark";
    }
  });

  // apply theme to root and persist locally
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("dsa-theme", theme);
    } catch {}
  }, [theme]);

  // auth + realtime listeners (progress + meta)
  useEffect(() => {
    let unsubProgress = null;
    let unsubMeta = null;

    const unsubscribeAuth = auth.onAuthStateChanged((u) => {
      if (!u) {
        setUser(null);
        setProgressDoc({});
        setSolvedDates([]);
        // ensure previous listeners cleaned
        if (typeof unsubProgress === "function") {
          unsubProgress();
          unsubProgress = null;
        }
        if (typeof unsubMeta === "function") {
          unsubMeta();
          unsubMeta = null;
        }
        return;
      }

      setUser(u);

      try {
        const ref = doc(u && u.uid ? require("../firebase").db : null, "users", u.uid, "progress", "problems");
        // subscribe to progress doc (if db exists)
        if (ref) {
          unsubProgress = onSnapshot(
            ref,
            (snap) => setProgressDoc(snap.exists() ? snap.data() || {} : {}),
            (err) => {
              console.error("progress onSnapshot error", err);
              setProgressDoc({});
            }
          );
        }
      } catch (err) {
        console.error("progress listener setup failed:", err);
        setProgressDoc({});
      }

      try {
        const metaRef = doc(require("../firebase").db, "users", u.uid, "meta", "metaDoc");
        unsubMeta = onSnapshot(
          metaRef,
          (snap) => {
            if (!snap.exists()) {
              setSolvedDates([]);
              return;
            }
            const data = snap.data();
            const arr = Array.isArray(data.solvedDates)
              ? data.solvedDates.map((d) =>
                  typeof d === "string" ? d.slice(0, 10) : new Date(d).toISOString().slice(0, 10)
                )
              : [];
            setSolvedDates(arr);
          },
          (err) => {
            console.error("meta snapshot error", err);
            setSolvedDates([]);
          }
        );

        // persist theme preference non-blocking
        (async () => {
          try {
            const prefRef = doc(require("../firebase").db, "users", u.uid, "prefs", "meta");
            await setDoc(prefRef, { theme }, { merge: true });
          } catch (e) {
            // non-critical
          }
        })();
      } catch (err) {
        console.error("meta listener setup failed:", err);
        setSolvedDates([]);
      }
    });

    return () => {
      // cleanup
      try {
        unsubscribeAuth();
      } catch {}
      try {
        if (typeof unsubProgress === "function") unsubProgress();
      } catch {}
      try {
        if (typeof unsubMeta === "function") unsubMeta();
      } catch {}
    };
    // note: we intentionally don't include progressDoc or solvedDates in deps
  }, [theme, navigate]);

  // logout -> redirect to landing page ("/")
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Signout failed:", err);
    } finally {
      // navigate to landing (root)
      navigate("/");
    }
  };

  const plans = [
    {
      id: "beginner-to-advance",
      title: "Beginner → Advanced",
      subtitle: "Full roadmap from fundamentals to interview-ready",
      blurb:
        "Start from basics, build patterns, and progress toward complex problems — curated and progressive.",
      route: "/plans/beginner-to-advance",
      tag: "Recommended",
      accent: "linear-gradient(90deg,#06b6d4,#8b5cf6)",
    },
    {
      id: "150-must-solve",
      title: "150 Must-Solve",
      subtitle: "High-frequency interview problems",
      blurb:
        "Hand-picked problems that show up in interviews. High ROI practice to sharpen your skills.",
      route: "/plans/150-must-solve",
      tag: "Plan",
      accent: "linear-gradient(90deg,#6366f1,#ec4899)",
    },
    {
      id: "30-days",
      title: "30-Day Challenge",
      subtitle: "Daily curated problems",
      blurb: "Short daily tasks to build a sustainable practice habit.",
      route: "/plans/30-days",
      tag: "Challenge",
      accent: "linear-gradient(90deg,#fb7185,#fb923c)",
    },
    {
      id: "90-days",
      title: "90-Day Mastery",
      subtitle: "Deep commitment, real results",
      blurb: "A long-term plan for retention and deep understanding.",
      route: "/plans/90-days",
      tag: "Challenge",
      accent: "linear-gradient(90deg,#10b981,#059669)",
    },
  ];

  const totalForPlan = (p) => {
    if (p.id === "150-must-solve") return must150.length;
    if (p.id === "30-days") return Array.isArray(thirtyDayPlan) ? thirtyDayPlan.flat().length : 0;
    if (p.id === "90-days") return Array.isArray(ninetyDayPlan) ? ninetyDayPlan.flat().length : 0;
    if (p.problems && Array.isArray(p.problems)) return p.problems.length;
    const keysForPlan = Object.keys(progressDoc).filter((k) => k.startsWith(`${p.id}::`));
    return keysForPlan.length > 0 ? keysForPlan.length : 0;
  };

  const solvedForPlan = (p) =>
    Object.entries(progressDoc).filter(([k, v]) => k.startsWith(`${p.id}::`) && v).length;

  // small helper for circular progress stroke
  const ringCircumference = 2 * Math.PI * 20; // r=20 used in svg below

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={BrandLogo} alt="DSA Tracker" className="w-10 h-10" />
            <div>
              <div className="text-lg font-semibold leading-tight">DSA Tracker</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">practice • track • level up</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setTheme("light")}
                className={`px-2 py-1 rounded-full text-sm ${theme === "light" ? "bg-white dark:bg-gray-900 shadow-sm" : "text-gray-500"}`}
                aria-label="Light theme"
              >
                ☀️
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`px-2 py-1 rounded-full text-sm ${theme === "dark" ? "bg-white dark:bg-gray-900 shadow-sm" : "text-gray-500"}`}
                aria-label="Dark theme"
              >
                🌙
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3 px-3 py-1 rounded-lg">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 grid place-items-center text-white font-medium">
                {user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{user?.displayName || user?.email || "Guest"}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Student</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight">Structured study plans that help you get interview-ready</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Follow a guided path, measure progress, and focus on the high-impact problems recruiters expect. Select a plan to begin.
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => document.getElementById("plans-grid")?.scrollIntoView({ behavior: "smooth" })}
                className="px-5 py-3 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700"
              >
                Explore plans
              </button>
            </div>
          </div>

          {/* CalendarStreak */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Your Streak</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Days you solved problems — click to mark 🔥</p>
            <CalendarStreak solvedDates={solvedDates} />
            <div className="mt-4 text-xs text-gray-400">Stay consistent to build momentum. Each solved day shows a 🔥.</div>
          </div>
        </section>

        {/* Plans grid */}
        <section id="plans-grid" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Choose a plan</h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">Pick a track tailored to your goal</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p) => {
              const total = totalForPlan(p);
              const solved = solvedForPlan(p);
              const percent = total ? Math.round((solved / total) * 100) : 0;
              const dashOffset = Math.max(0, ringCircumference - (percent / 100) * ringCircumference);

              return (
                <button
                  key={p.id}
                  onClick={() => navigate(p.route)}
                  className="group text-left p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow hover:shadow-lg transform hover:-translate-y-1 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 pr-3">
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">{p.tag}</div>
                      <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{p.subtitle}</p>
                      <p className="mt-3 text-sm text-gray-400 line-clamp-3">{p.blurb}</p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <div className="w-14 h-14 rounded-full grid place-items-center text-white font-bold" style={{ background: "linear-gradient(90deg,#6366f1,#ec4899)" }}>→</div>

                      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
                        <circle cx="24" cy="24" r="20" stroke="#e6e6e6" strokeWidth="4" fill="none" />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="url(#g)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          fill="none"
                          strokeDasharray={ringCircumference}
                          strokeDashoffset={dashOffset}
                          transform="rotate(-90 24 24)"
                        />
                        <defs>
                          <linearGradient id="g" x1="0" x2="1">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="10" className="fill-gray-700 dark:fill-gray-200">
                          {percent}%
                        </text>
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
