// src/pages/PlanView.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import plans from "../data/plans";
import must150 from "../data/150_must_solve";
import thirtyDayPlan from "../data/30_day_plan";
import ninetyDayPlan from "../data/90_day_plan"; // <-- ensure this file exists
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import BrandLogo from "../assets/brand.svg";

/** SmallRing component (visual progress indicator) */
function SmallRing({ percent = 0, size = 48, stroke = 5 }) {
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (Math.max(0, Math.min(100, percent)) / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="g-ring" x1="0" x2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="rgba(15,23,42,0.06)"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="url(#g-ring)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        fill="none"
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        style={{ fontSize: 10, fontWeight: 700 }}
        className="fill-slate-900 dark:fill-white"
      >
        {Math.round(percent)}%
      </text>
    </svg>
  );
}

export default function PlanView() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const plan = plans.find((p) => p.id === planId);

  const [userId, setUserId] = useState(null);
  const [progress, setProgress] = useState({}); // shape: { "<plan-prefix>::...": true }
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [savingKey, setSavingKey] = useState(null); // string key or `day-{idx}` for day-level ops

  // Load auth & global progress doc (users/{uid}/progress/problems)
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) {
        navigate("/login");
        return;
      }
      setUserId(u.uid);
      try {
        const ref = doc(db, "users", u.uid, "progress", "problems");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProgress(snap.data() || {});
        } else {
          // create baseline doc non-blocking
          await setDoc(ref, {}, { merge: true });
          setProgress({});
        }
      } catch (err) {
        console.error("Failed to load progress doc:", err);
      } finally {
        setLoadingPlan(false);
      }
    });
    return () => unsub();
  }, [navigate]);

  // Helper to count solved keys starting with prefix
  const countSolvedKeysWithPrefix = (prefix) =>
    Object.entries(progress).filter(([k, v]) => k.startsWith(prefix) && v).length;

  // Unified toggle: writes single key to global progress doc (optimistic)
  const toggleSolved = async (key) => {
    const newVal = !progress[key];
    // optimistic update
    setProgress((prev) => ({ ...prev, [key]: newVal }));
    setSavingKey(key);
    try {
      if (userId) {
        const ref = doc(db, "users", userId, "progress", "problems");
        await setDoc(ref, { [key]: newVal }, { merge: true });
      }
    } catch (err) {
      console.error("Failed to save progress:", err);
      // revert
      setProgress((prev) => ({ ...prev, [key]: !newVal }));
    } finally {
      setSavingKey(null);
    }
  };

  // Mark all problems for a specific day as solved (or clear them)
  // dayPrefix e.g. "30-days::5::" (note trailing ::)
  // setTo boolean true -> mark solved, false -> clear
  const setWholeDay = async (dayPrefix, problemsForDay, setTo = true) => {
    const keys = problemsForDay.map((p, idx) => `${dayPrefix}${p.title}`);
    const updated = { ...progress };
    keys.forEach((k) => {
      updated[k] = setTo;
    });

    // optimistic
    setProgress(updated);
    setSavingKey(`day-${dayPrefix}`); // signal a day-level save

    try {
      if (userId) {
        const ref = doc(db, "users", userId, "progress", "problems");
        // prepare object for setDoc merge
        const toWrite = {};
        keys.forEach((k) => {
          toWrite[k] = setTo;
        });
        await setDoc(ref, toWrite, { merge: true });
      }
    } catch (err) {
      console.error("Failed to save day progress:", err);
      // revert by re-fetching the doc as safe fallback
      try {
        if (userId) {
          const ref = doc(db, "users", userId, "progress", "problems");
          const snap = await getDoc(ref);
          setProgress(snap.exists() ? snap.data() || {} : {});
        }
      } catch (e) {
        console.error("Failed to reload progress after day save failure:", e);
      }
    } finally {
      setSavingKey(null);
    }
  };

  // -------------------------
  // Special case: 150 must-solve (flat list)
  // -------------------------
  if (planId === "150-must-solve") {
    const solvedCount = countSolvedKeysWithPrefix("150-must-solve::");
    const percent = must150.length
      ? Math.round((solvedCount / must150.length) * 100)
      : 0;

    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src={BrandLogo} alt="DSA Tracker" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-semibold">150 Must Solve Problems</h1>
              <p className="text-sm text-gray-500">High-frequency interview questions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">{solvedCount}/{must150.length} solved</div>
            <SmallRing percent={percent} />
            <button onClick={() => navigate("/plans")} className="px-3 py-2 rounded-lg border">Back</button>
          </div>
        </header>

        {loadingPlan ? (
          <div className="text-center py-20 text-gray-500">Loading…</div>
        ) : (
          <div className="space-y-3">
            {must150.map((p, idx) => {
              const key = `150-must-solve::${p.title}`;
              const solved = !!progress[key];
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border flex items-center justify-between ${solved ? "border-emerald-400/40 bg-emerald-50/5" : "border-gray-200 dark:border-gray-800"}`}
                >
                  <div>
                    <a href={p.link} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                      {idx + 1}. {p.title}
                    </a>
                    <div className="text-xs text-gray-400 mt-1">{p.difficulty || "N/A"}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleSolved(key)}
                      disabled={savingKey === key}
                      className={`px-3 py-1 rounded text-sm ${solved ? "bg-emerald-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
                    >
                      {savingKey === key ? "Saving…" : solved ? "Solved" : "Mark"}
                    </button>
                    <a href={p.link} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 hover:underline">Open</a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // -------------------------
  // Special case: 30-day plan (day grouped)
  // -------------------------
  if (planId === "30-days") {
    const flatProblems = thirtyDayPlan.flat();
    const total = flatProblems.length;
    const solvedCount = countSolvedKeysWithPrefix("30-days::");
    const percent = total ? Math.round((solvedCount / total) * 100) : 0;

    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src={BrandLogo} alt="DSA Tracker" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-semibold">30-Day Challenge</h1>
              <p className="text-sm text-gray-500">2 problems/day • Arrays → DP</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">{solvedCount}/{total} solved</div>
            <SmallRing percent={percent} />
            <button onClick={() => navigate("/plans")} className="px-3 py-2 rounded-lg border">Back</button>
          </div>
        </header>

        {loadingPlan ? (
          <div className="text-center py-20 text-gray-500">Loading…</div>
        ) : (
          <div className="space-y-8">
            {thirtyDayPlan.map((dayProblems, idx) => {
              const dayPrefix = `30-days::${idx}::`;
              const solvedThisDay = dayProblems.filter((p) => progress[`${dayPrefix}${p.title}`]).length;
              return (
                <section key={idx} className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Day {idx + 1}</h3>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-500">{solvedThisDay}/{dayProblems.length} solved</div>
                      <button
                        onClick={() => setWholeDay(dayPrefix, dayProblems, true)}
                        disabled={savingKey === `day-${dayPrefix}`}
                        className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
                      >
                        {savingKey === `day-${dayPrefix}` ? "Saving…" : "Mark day"}
                      </button>
                      <button
                        onClick={() => setWholeDay(dayPrefix, dayProblems, false)}
                        disabled={savingKey === `day-${dayPrefix}`}
                        className="px-3 py-1 rounded border text-sm"
                      >
                        Clear day
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {dayProblems.map((p, j) => {
                      const key = `${dayPrefix}${p.title}`;
                      const solved = !!progress[key];
                      return (
                        <div key={j} className={`p-4 rounded-lg border flex items-center justify-between ${solved ? "border-emerald-400/40 bg-emerald-50/5" : "border-gray-200 dark:border-gray-800"}`}>
                          <div>
                            <a href={p.link} target="_blank" rel="noreferrer" className="font-medium hover:underline">{p.title}</a>
                            <div className="text-xs text-gray-400 mt-1">{p.difficulty || "N/A"} • {p.topic || "—"}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleSolved(key)}
                              disabled={savingKey === key || savingKey === `day-${dayPrefix}`}
                              className={`px-3 py-1 rounded text-sm ${solved ? "bg-emerald-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
                            >
                              {savingKey === key ? "Saving…" : solved ? "Solved" : "Mark"}
                            </button>
                            <a href={p.link} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 hover:underline">Open</a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // -------------------------
  // Special case: 90-day plan (day grouped) — same UI as 30-days but larger dataset
  // -------------------------
  if (planId === "90-days") {
    const flatProblems = ninetyDayPlan.flat();
    const total = flatProblems.length;
    const solvedCount = countSolvedKeysWithPrefix("90-days::");
    const percent = total ? Math.round((solvedCount / total) * 100) : 0;

    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src={BrandLogo} alt="DSA Tracker" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-semibold">DSA Grandmaster 90</h1>
              <p className="text-sm text-gray-500">Foundations → Advanced → Interview mastery (1–2 problems/day)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">{solvedCount}/{total} solved</div>
            <SmallRing percent={percent} />
            <button onClick={() => navigate("/plans")} className="px-3 py-2 rounded-lg border">Back</button>
          </div>
        </header>

        {loadingPlan ? (
          <div className="text-center py-20 text-gray-500">Loading…</div>
        ) : (
          <div className="space-y-8">
            {ninetyDayPlan.map((dayProblems, idx) => {
              const dayPrefix = `90-days::${idx}::`;
              const solvedThisDay = dayProblems.filter((p) => progress[`${dayPrefix}${p.title}`]).length;
              return (
                <section key={idx} className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Day {idx + 1}</h3>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-500">{solvedThisDay}/{dayProblems.length} solved</div>
                      <button
                        onClick={() => setWholeDay(dayPrefix, dayProblems, true)}
                        disabled={savingKey === `day-${dayPrefix}`}
                        className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
                      >
                        {savingKey === `day-${dayPrefix}` ? "Saving…" : "Mark day"}
                      </button>
                      <button
                        onClick={() => setWholeDay(dayPrefix, dayProblems, false)}
                        disabled={savingKey === `day-${dayPrefix}`}
                        className="px-3 py-1 rounded border text-sm"
                      >
                        Clear day
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {dayProblems.map((p, j) => {
                      const key = `${dayPrefix}${p.title}`;
                      const solved = !!progress[key];
                      return (
                        <div key={j} className={`p-4 rounded-lg border flex items-center justify-between ${solved ? "border-emerald-400/40 bg-emerald-50/5" : "border-gray-200 dark:border-gray-800"}`}>
                          <div>
                            <a href={p.link} target="_blank" rel="noreferrer" className="font-medium hover:underline">{p.title}</a>
                            <div className="text-xs text-gray-400 mt-1">{p.difficulty || "N/A"} • {p.topic || "—"}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleSolved(key)}
                              disabled={savingKey === key || savingKey === `day-${dayPrefix}`}
                              className={`px-3 py-1 rounded text-sm ${solved ? "bg-emerald-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
                            >
                              {savingKey === key ? "Saving…" : solved ? "Solved" : "Mark"}
                            </button>
                            <a href={p.link} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 hover:underline">Open</a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // -------------------------
  // Fallback for other plans (topic / custom / challenge)
  // -------------------------
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Plan: {plan?.title}</h2>
      <p className="text-gray-500">Other plan rendering here…</p>
    </div>
  );
}
