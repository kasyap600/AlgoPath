// src/pages/Profile.jsx
import React, { useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

/**
 * Profile page with:
 * - Progress overview (total/attempted/percent)
 * - Difficulty breakdown
 * - Streaks (current & longest)
 * - Simple SVG charts (bar + radial)
 * - Recent activity (solvedLog from meta doc or built from progress)
 * - Edit display name, theme toggle, export JSON, share link
 *
 * Tailwind CSS required.
 */

function SmallRing({ easy = 0, medium = 0, hard = 0, size = 88, stroke = 12 }) {
  // simple ring representing difficulty share
  const total = easy + medium + hard || 1;
  const center = size / 2;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  // segments expressed as dasharray lengths
  const easyLen = (easy / total) * circumference;
  const mediumLen = (medium / total) * circumference;
  const hardLen = (hard / total) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <defs>
        <linearGradient id="g-e" x1="0" x2="1"><stop offset="0%" stopColor="#34d399"/><stop offset="100%" stopColor="#10b981"/></linearGradient>
        <linearGradient id="g-m" x1="0" x2="1"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#6366f1"/></linearGradient>
        <linearGradient id="g-h" x1="0" x2="1"><stop offset="0%" stopColor="#fb7185"/><stop offset="100%" stopColor="#ef4444"/></linearGradient>
      </defs>

      <circle cx={center} cy={center} r={radius} stroke="#f3f4f6" strokeWidth={stroke} fill="none" />
      {/* easy */}
      <circle cx={center} cy={center} r={radius} stroke="url(#g-e)" strokeWidth={stroke} fill="none"
        strokeDasharray={`${easyLen} ${circumference - easyLen}`} strokeDashoffset={0} strokeLinecap="round" transform={`rotate(-90 ${center} ${center})`} />
      {/* medium (offset by easy) */}
      <circle cx={center} cy={center} r={radius} stroke="url(#g-m)" strokeWidth={stroke} fill="none"
        strokeDasharray={`${mediumLen} ${circumference - mediumLen}`} strokeDashoffset={-easyLen} strokeLinecap="round" transform={`rotate(-90 ${center} ${center})`} />
      {/* hard (offset by easy+medium) */}
      <circle cx={center} cy={center} r={radius} stroke="url(#g-h)" strokeWidth={stroke} fill="none"
        strokeDasharray={`${hardLen} ${circumference - hardLen}`} strokeDashoffset={-(easyLen + mediumLen)} strokeLinecap="round" transform={`rotate(-90 ${center} ${center})`} />

      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-sm font-semibold fill-slate-900 dark:fill-white">
        {Math.round((easy + medium + hard) ? ( (easy+medium+hard) / (easy+medium+hard) * 100 ) : 0)}%
      </text>
    </svg>
  );
}

function BarChartWeekly({ weeklyCounts = [] }) {
  // weeklyCounts: array of 7 numbers (Mon..Sun or any order)
  const max = Math.max(...weeklyCounts, 1);
  const labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return (
    <div className="w-full">
      <div className="flex items-end gap-3 h-28">
        {weeklyCounts.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full flex items-end">
              <div
                title={`${v} solves`}
                className="w-full rounded-t-md"
                style={{
                  height: `${(v/max)*100}%`,
                  background: "linear-gradient(180deg,#60a5fa,#6366f1)",
                }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">{labels[i] || `D${i+1}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({}); // problems progress doc
  const [meta, setMeta] = useState({}); // meta doc: solvedDates, solvedLog
  const [prefs, setPrefs] = useState({});
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("dsa-theme") || "dark"; } catch { return "dark"; }
  });

  // apply theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark");
    try { localStorage.setItem("dsa-theme", theme); } catch {}
    // persist to Firestore if user & prefs doc present
    if (user) {
      const ref = doc(db, "users", user.uid, "prefs", "meta");
      // non-blocking
      setDoc(ref, { theme }, { merge: true }).catch(()=>{/* ignore */});
    }
  }, [theme, user]);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(async (u) => {
      if (!u) {
        // not logged in -> redirect to landing
        navigate("/login");
        return;
      }
      setUser(u);
      setDisplayName(u.displayName || (u.email ? u.email.split("@")[0] : ""));

      try {
        setLoading(true);
        const progressRef = doc(db, "users", u.uid, "progress", "problems");
        const metaRef = doc(db, "users", u.uid, "meta", "metaDoc");
        const prefsRef = doc(db, "users", u.uid, "prefs", "meta");

        // initial fetch + realtime
        const unsubProgress = onSnapshot(progressRef, (snap) => {
          setProgress(snap.exists() ? snap.data() : {});
        });

        const unsubMeta = onSnapshot(metaRef, (snap) => {
          setMeta(snap.exists() ? snap.data() : {});
        });

        const unsubPrefs = onSnapshot(prefsRef, (snap) => {
          setPrefs(snap.exists() ? snap.data() : {});
          if (snap.exists() && snap.data()?.theme) {
            setTheme(snap.data().theme);
          }
        });

        setLoading(false);

        return () => {
          try { unsubProgress(); } catch {}
          try { unsubMeta(); } catch {}
          try { unsubPrefs(); } catch {}
        };
      } catch (err) {
        console.error("profile load error", err);
        setLoading(false);
      }
    });

    return () => unsubAuth();
  }, [navigate]);

  // derived stats:
  const totals = useMemo(() => {
    const keys = Object.keys(progress || {});
    let solved = 0, attempted = 0;
    let easy=0, medium=0, hard=0;
    for (const k of keys) {
      attempted++;
      if (progress[k]) {
        solved++;
        // try to infer difficulty from key or meta.solvedLog
        // fallback: treat unknown as medium
        const log = (meta.solvedLog || []).find(x => x.key === k || x.title === k.split("::").pop());
        const difficulty = log?.difficulty || "Medium";
        if (difficulty === "Easy") easy++; else if (difficulty === "Hard") hard++; else medium++;
      }
    }
    const percent = attempted ? Math.round((solved / attempted) * 100) : 0;
    return { solved, attempted, percent, easy, medium, hard };
  }, [progress, meta]);

  // streak calculations (meta.solvedDates expected as array of ISO strings yyyy-mm-dd)
  const streaks = useMemo(() => {
    const arr = Array.isArray(meta.solvedDates) ? meta.solvedDates.map(d => String(d).slice(0,10)) : [];
    if (!arr.length) return { current: 0, longest: 0 };
    const days = Array.from(new Set(arr)).sort(); // ascending
    const parsed = days.map(d => new Date(d + "T00:00:00"));
    let longest = 1, current = 1;
    // find longest and current streak up to today
    for (let i = 1; i < parsed.length; i++) {
      const diff = Math.round((parsed[i] - parsed[i-1]) / (1000*60*60*24));
      if (diff === 1) {
        current += 1;
        longest = Math.max(longest, current);
      } else {
        current = 1;
      }
    }
    // compute current streak ending today
    const todayISO = new Date().toISOString().slice(0,10);
    let curStreak = 0;
    for (let i = parsed.length-1; i >= 0; i--) {
      const iso = parsed[i].toISOString().slice(0,10);
      if (i === parsed.length-1) {
        // last day must be today or yesterday to count
        const dDiff = Math.round((new Date(todayISO + "T00:00:00") - new Date(iso + "T00:00:00"))/(1000*60*60*24));
        if (dDiff === 0) curStreak = 1;
        else if (dDiff === 1) curStreak = 1; else break;
      } else {
        const prevIso = parsed[i+1].toISOString().slice(0,10);
        const diff = Math.round((new Date(prevIso+"T00:00:00") - new Date(parsed[i].toISOString().slice(0,10)+"T00:00:00"))/(1000*60*60*24));
        if (diff === 1) curStreak++; else break;
      }
    }
    return { current: curStreak, longest: Math.max(longest, curStreak) };
  }, [meta.solvedDates]);

  // recent activity: prefer meta.solvedLog (array of {title, link, iso, difficulty}), else build from progress (no timestamps)
  const recentActivity = useMemo(() => {
    if (Array.isArray(meta.solvedLog) && meta.solvedLog.length) {
      return [...meta.solvedLog].slice(-8).reverse();
    }
    // fallback build: from progress keys (no timestamps)
    const keys = Object.keys(progress || {}).filter(k => progress[k]).slice(-8).reverse();
    return keys.map(k => {
      const parts = k.split("::");
      return { title: parts.slice(-1)[0] || k, link: "#", iso: null, difficulty: "N/A", key: k };
    });
  }, [meta.solvedLog, progress]);

  // weekly chart data (construct counts for past 7 days from meta.solvedDates)
  const weeklyCounts = useMemo(() => {
    const out = Array(7).fill(0); // Mon..Sun (we will align to current weekday)
    const today = new Date();
    // build map of iso->count
    const isoSet = {};
    (meta.solvedDates || []).forEach(d => {
      const iso = String(d).slice(0,10);
      isoSet[iso] = (isoSet[iso] || 0) + 1;
    });
    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(today.getDate() - i);
      const iso = day.toISOString().slice(0,10);
      // map to Mon..Sun index: getDay() -> 0..6 Sun..Sat
      const idx = (day.getDay() + 6) % 7; // convert Sun(0) -> 6, Mon(1)->0... so Monday starts at 0
      out[idx] = isoSet[iso] || 0;
    }
    return out;
  }, [meta.solvedDates]);

  // badge logic: simple thresholds
  const badges = useMemo(() => {
    const s = totals.solved || 0;
    const unlocked = [];
    if (s >= 10) unlocked.push({ id: "10", label: "Solver 10", emoji: "🔰" });
    if (s >= 50) unlocked.push({ id: "50", label: "50 Solves", emoji: "🏅" });
    if (s >= 100) unlocked.push({ id: "100", label: "100 Problems", emoji: "🏆" });
    if (streaks.current >= 7) unlocked.push({ id: "7streak", label: "7-day Streak", emoji: "🔥" });
    return unlocked;
  }, [totals, streaks]);

  // helpers
  const exportProfile = () => {
    if (!user) return;
    const out = {
      uid: user.uid,
      displayName: displayName,
      email: user.email,
      totals,
      streaks,
      recent: recentActivity,
      prefs,
      meta,
      generatedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dsa-profile-${user.uid}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyShareLink = async () => {
    if (!user) return;
    const url = `${window.location.origin}/u/${user.uid}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Profile link copied to clipboard");
    } catch {
      alert("Could not copy. URL: " + url);
    }
  };

  const saveDisplayName = async () => {
    if (!user) return;
    const name = String(displayName || "").trim();
    // update Firestore prefs and user profile if desired
    const prefsRef = doc(db, "users", user.uid, "prefs", "meta");
    try {
      await setDoc(prefsRef, { displayName: name }, { merge: true });
      // update firebase auth profile is optional; we avoid auth.updateProfile here for simplicity
      setEditingName(false);
      alert("Saved!");
    } catch (err) {
      console.error("save name failed", err);
      alert("Could not save name. See console.");
    }
  };

  if (!user) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="mt-4">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">Welcome{displayName ? `, ${displayName}` : ""}</h1>
            <p className="text-sm text-gray-500">Your learning snapshot & stats</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              <button onClick={() => setTheme("light")} className={`px-2 py-1 rounded-full ${theme === "light" ? "bg-white shadow-sm" : "text-gray-500"}`}>☀️</button>
              <button onClick={() => setTheme("dark")} className={`px-2 py-1 rounded-full ${theme === "dark" ? "bg-white shadow-sm" : "text-gray-500"}`}>🌙</button>
            </div>

            <button onClick={exportProfile} className="px-3 py-2 rounded-lg border text-sm">Export</button>
            <button onClick={copyShareLink} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm">Share</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* left column: overview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 grid place-items-center text-white text-2xl font-semibold">
                {user.photoURL ? <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover rounded-full" /> : (user.email?.[0]?.toUpperCase() || "U")}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-semibold">{displayName || user.displayName || user.email}</div>
                  {!editingName ? (
                    <button onClick={() => setEditingName(true)} className="text-sm text-indigo-600">Edit</button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 text-sm" />
                      <button onClick={saveDisplayName} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm">Save</button>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">Member since {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "—"}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totals.solved}</div>
                  <div className="text-xs text-gray-500">Solved</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{totals.percent}%</div>
                  <div className="text-xs text-gray-500">Completion</div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="text-xs text-gray-500">Difficulty breakdown</div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div style={{ width: `${(totals.easy/(totals.easy+totals.medium+totals.hard || 1))*100}%` }} className="h-3 bg-green-400 inline-block" />
                  <div style={{ width: `${(totals.medium/(totals.easy+totals.medium+totals.hard || 1))*100}%` }} className="h-3 bg-blue-500 inline-block" />
                  <div style={{ width: `${(totals.hard/(totals.easy+totals.medium+totals.hard || 1))*100}%` }} className="h-3 bg-red-400 inline-block" />
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full" /> Easy {totals.easy}</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full" /> Medium {totals.medium}</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 bg-red-400 rounded-full" /> Hard {totals.hard}</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-gray-500">Streak</div>
              <div className="mt-2 flex items-center gap-4">
                <div className="px-4 py-3 rounded-lg bg-white/5 dark:bg-gray-800 text-center">
                  <div className="text-lg font-semibold">{streaks.current}d</div>
                  <div className="text-xs text-gray-400">Current</div>
                </div>
                <div className="px-4 py-3 rounded-lg bg-white/5 dark:bg-gray-800 text-center">
                  <div className="text-lg font-semibold">{streaks.longest}d</div>
                  <div className="text-xs text-gray-400">Longest</div>
                </div>
              </div>
            </div>
          </div>

          {/* center: charts */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Activity</div>
                <div className="text-lg font-semibold">Weekly solves</div>
              </div>
            </div>

            <div className="mt-4">
              <BarChartWeekly weeklyCounts={weeklyCounts} />
            </div>

            <div className="mt-6 flex items-center gap-6">
              <div className="flex-1">
                <div className="text-sm text-gray-500">Difficulty share</div>
                <div className="mt-4 w-32">
                  <SmallRing easy={totals.easy} medium={totals.medium} hard={totals.hard} />
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Badges</div>
                <div className="mt-3 flex gap-3">
                  {badges.length ? badges.map(b => (
                    <div key={b.id} className="px-3 py-2 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white text-xs">{b.emoji} {b.label}</div>
                  )) : <div className="text-sm text-gray-400">No badges yet — keep solving!</div>}
                </div>
              </div>
            </div>
          </div>

          {/* right column: recent activity & settings */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Recent activity</div>
                <div className="text-lg font-semibold">Last solves</div>
              </div>
            </div>

            <ul className="mt-4 space-y-3">
              {recentActivity.length ? recentActivity.map((r, i) => (
                <li key={i} className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-gray-400">{r.iso ? r.iso : "—"}</div>
                  </div>
                  <div className="text-xs text-gray-500">{r.difficulty || ""}</div>
                </li>
              )) : <li className="text-gray-500">No recent activity yet</li>}
            </ul>

            <div className="mt-6 border-t pt-4">
              <div className="text-sm text-gray-500">Settings</div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Theme</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setTheme("light")} className={`px-2 py-1 rounded ${theme === "light" ? "bg-gray-200" : "bg-transparent"}`}>Light</button>
                    <button onClick={() => setTheme("dark")} className={`px-2 py-1 rounded ${theme === "dark" ? "bg-gray-200" : "bg-transparent"}`}>Dark</button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">Public profile</div>
                  <div>
                    <input type="checkbox" checked={!!prefs.publicProfile} onChange={async (e) => {
                      if (!user) return;
                      const ref = doc(db, "users", user.uid, "prefs", "meta");
                      try {
                        await setDoc(ref, { publicProfile: e.target.checked }, { merge: true });
                      } catch (err) {
                        console.error(err);
                      }
                    }} />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={exportProfile} className="px-3 py-2 rounded-lg border text-sm">Export JSON</button>
                  <button onClick={copyShareLink} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm">Copy profile link</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
