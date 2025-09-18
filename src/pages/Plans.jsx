// src/pages/Plans.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import plans from "../data/plans";
import { FaCalendarAlt } from "react-icons/fa";
import BrandLogo from "../assets/brand.svg";

/**
 * ConfirmModal - polished modal where user can pick an optional start date
 */
function ConfirmModal({ open, onClose, onConfirm, plan }) {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10); // yyyy-mm-dd
  });

  useEffect(() => {
    if (open) {
      const d = new Date();
      setStartDate(d.toISOString().slice(0, 10));
    }
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold">{`Start "${plan?.title || ""}"`}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{plan?.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 rounded-full p-1"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <label className="block text-xs text-gray-600 dark:text-gray-300 mb-2">Choose start date (optional)</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-4 focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(startDate)}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm"
          >
            Start plan
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Plans Page - updated UI
 */
export default function Plans() {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(null);

  // Theme toggle (local)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("dsa-theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("dsa-theme", theme);
    } catch {}
  }, [theme]);

  const handleStartClick = (plan) => {
    setActivePlan(plan);
    setConfirmOpen(true);
  };

  const handleConfirm = (startDate) => {
    setConfirmOpen(false);
    // pass optional state with startDate + theme so PlanView receives the theme
    navigate(`/plans/${activePlan.id}`, { state: { startDate, theme } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
      {/* Top bar */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={BrandLogo} alt="DSA Tracker" className="w-10 h-10" />
            <div>
              <div className="text-lg font-semibold leading-tight">Plans</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Choose a study track</div>
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
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Choose a Study Plan</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
            Select a plan that matches your goal — we’ll map problems and track your progress. Click “Start” to pick an optional start date and begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p) => (
            <div
              key={p.id}
              className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 pr-3">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                    {p.type === "challenge" ? "Challenge" : p.type === "custom" ? "Custom" : "Plan"}
                  </div>

                  <h2 className="mt-4 text-xl font-semibold leading-snug">{p.title}</h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{p.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.type === "challenge" ? (
                      <span className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full text-xs text-indigo-700 dark:text-indigo-300">
                        <FaCalendarAlt /> {p.days} days
                      </span>
                    ) : p.type === "custom" && p.problems ? (
                      <span className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs">
                        {p.problems.length} problems
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs">
                        {p.type}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 text-right">
                  <div className="w-14 h-14 rounded-full grid place-items-center bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold">
                    →
                  </div>
                  <div className="text-sm text-gray-500">{p.tag || ""}</div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => handleStartClick(p)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm text-sm"
                >
                  Start
                </button>

                <button
                  onClick={() => navigate(`/plans/${p.id}`, { state: { theme } })}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-200"
                >
                  Open
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="ml-auto px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-200"
                  aria-label="Open explorer"
                >
                  Explorer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation modal */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        plan={activePlan || {}}
      />
    </div>
  );
}
