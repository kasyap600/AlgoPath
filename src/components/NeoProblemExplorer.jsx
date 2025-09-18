import { useEffect, useMemo, useState } from "react";
import { problemsData } from "../data/problemsData";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom"; // Assuming React Router

const badgeColor = {
  Easy: "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800",
  Medium: "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-800",
  Hard: "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800",
};

export default function NeoProblemExplorer() {
  const topics = Object.keys(problemsData);
  const [selected, setSelected] = useState(topics[0] || "");
  const [progress, setProgress] = useState({}); // key: `${topic}::${title}` -> boolean
  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [notesOpen, setNotesOpen] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [notes, setNotes] = useState({});
  const [loadingSave, setLoadingSave] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Theme (light/dark) state persisted to localStorage + optional firestore
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("dsa-theme") || "light";
    } catch {
      return "light";
    }
  });

  // Apply theme class to documentElement immediately
  useEffect(() => {
    const root = document.documentElement;
    console.log("Applying theme:", theme); // Debug log
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("dsa-theme", theme);
    } catch (e) {
      console.warn("LocalStorage set failed:", e);
    }
    // Persist to Firestore if user is signed in
    const savePref = async () => {
      if (userId) {
        try {
          const prefRef = doc(db, "users", userId, "prefs", "theme");
          await setDoc(prefRef, { theme }, { merge: true });
          console.log("Theme saved to Firestore:", theme);
        } catch (err) {
          console.warn("Could not persist theme to Firestore:", err);
        }
      }
    };
    savePref();
  }, [theme, userId]);

  // Auth guard & load progress + notes + prefs
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (u) {
        setUserId(u.uid);
        try {
          const progressRef = doc(db, "users", u.uid, "progress", "problems");
          const notesRef = doc(db, "users", u.uid, "notes", "problems");
          const prefRef = doc(db, "users", u.uid, "prefs", "theme");

          const [progressSnap, notesSnap, prefSnap] = await Promise.all([
            getDoc(progressRef),
            getDoc(notesRef),
            getDoc(prefRef),
          ]);

          if (progressSnap.exists()) setProgress(progressSnap.data());
          if (notesSnap.exists()) setNotes(notesSnap.data());
          if (prefSnap.exists()) {
            const remoteTheme = prefSnap.data()?.theme;
            if (remoteTheme && remoteTheme !== theme) {
              console.log("Syncing theme from Firestore:", remoteTheme); // Debug log
              setTheme(remoteTheme);
            }
          }
        } catch (err) {
          console.error("Failed to load user data:", err);
        }
      } else {
        setUserId(null);
      }
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // Derived stats for current topic
  const { solved, total } = useMemo(() => {
    const list = problemsData[selected] || [];
    let s = 0;
    for (const p of list) {
      if (progress[`${selected}::${p.title}`]) s++;
    }
    return { solved: s, total: list.length };
  }, [selected, progress]);

  // Global stats
  const globalStats = useMemo(() => {
    let easySolved = 0,
      easyTotal = 0,
      mediumSolved = 0,
      mediumTotal = 0,
      hardSolved = 0,
      hardTotal = 0;
    Object.keys(problemsData).forEach((topic) => {
      problemsData[topic].forEach((p) => {
        const key = `${topic}::${p.title}`;
        if (p.difficulty === "Easy") {
          easyTotal++;
          if (progress[key]) easySolved++;
        }
        if (p.difficulty === "Medium") {
          mediumTotal++;
          if (progress[key]) mediumSolved++;
        }
        if (p.difficulty === "Hard") {
          hardTotal++;
          if (progress[key]) hardSolved++;
        }
      });
    });
    return { easySolved, easyTotal, mediumSolved, mediumTotal, hardSolved, hardTotal };
  }, [progress]);

  // Filter + sort problems
  const filteredAndSortedProblems = useMemo(() => {
    let filtered = (problemsData[selected] || []).filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (difficultyFilter === "All" || p.difficulty === difficultyFilter)
    );
    if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "solved") {
      filtered.sort(
        (a, b) =>
          !!progress[`${selected}::${b.title}`] - !!progress[`${selected}::${a.title}`]
      );
    }
    return filtered;
  }, [selected, search, difficultyFilter, sortBy, progress]);

  // Recommend next topic (lowest completion)
  const nextTopic = useMemo(() => {
    const topicStats = topics.map((t) => {
      const total = problemsData[t].length;
      const solved = problemsData[t].filter((p) => progress[`${t}::${p.title}`]).length;
      return { topic: t, completion: total > 0 ? solved / total : 0 };
    });
    topicStats.sort((a, b) => a.completion - b.completion);
    return topicStats.length ? topicStats[0].topic : topics[0] || "";
  }, [progress, topics]);

  // Toggle solved and persist quickly (optimistic)
  const toggleSolved = async (topic, title) => {
    const key = `${topic}::${title}`;
    const newVal = !progress[key];
    const updated = { ...progress, [key]: newVal };
    setProgress(updated);
    if (userId) {
      const ref = doc(db, "users", userId, "progress", "problems");
      try {
        await setDoc(ref, updated, { merge: true });
      } catch (error) {
        console.error("Firebase update failed:", error);
        // revert on failure
        setProgress((prev) => ({ ...prev, [key]: !newVal }));
      }
    }
  };

  // Save notes (explicit)
  const saveNotes = async (closeAfter = false) => {
    if (!userId) {
      // just close for anonymous users (or you can prompt to sign in)
      if (closeAfter) setNotesOpen(false);
      return;
    }
    setLoadingSave(true);
    const ref = doc(db, "users", userId, "notes", "problems");
    try {
      await setDoc(ref, notes, { merge: true });
      setLoadingSave(false);
      if (closeAfter) setNotesOpen(false);
    } catch (error) {
      console.error("Notes save failed:", error);
      setLoadingSave(false);
    }
  };

  // When opening notes, ensure a current problem is set
  const openNotesFor = (p) => {
    setCurrentProblem(p);
    setNotesOpen(true);
  };

  // Helper to open problem link (new tab)
  const openProblemLink = (p) => {
    if (p?.link && p.link !== "#") {
      window.open(p.link, "_blank", "noopener,noreferrer");
    }
  };

  // Ensure selected exists when topics change
  useEffect(() => {
    if (!selected && topics.length) setSelected(topics[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics]);

  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
      setProfileOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userName = auth.currentUser ? auth.currentUser.displayName || auth.currentUser.email.split('@')[0] : "Guest";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0 fixed inset-y-0 left-0 z-40" : "translate-x-0 static"}
            md:static md:translate-x-0`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Categories</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-500 dark:text-gray-400"
            >
              ×
            </button>
          </div>

          <nav className="space-y-2">
            {topics.map((t) => {
              const list = problemsData[t] || [];
              const completed = list.filter((p) => progress[`${t}::${p.title}`]).length;
              return (
                <button
                  key={t}
                  onClick={() => {
                    setSelected(t);
                    setSidebarOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-3 py-3 rounded-lg flex items-center justify-between transition
                    ${selected === t ? "bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-600 dark:border-purple-400 text-indigo-700 dark:text-purple-200" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/40"}
                  `}
                >
                  <div>
                    <div className="text-sm font-medium">{t}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {completed}/{list.length} solved
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{list.length}</div>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
            Tip: Use the search and filters to quickly find problems.
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Controls */}
            <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex gap-3 items-center flex-wrap">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search problems, e.g., Two Sum, Binary Search..."
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none md:w-auto md:flex-1"
                  aria-label="Search problems"
                />
                <button
                  onClick={() => setDifficultyFilter("All")}
                  className={`px-4 py-2 rounded-lg ${difficultyFilter === "All" ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setDifficultyFilter("Easy")}
                  className={`px-4 py-2 rounded-lg ${difficultyFilter === "Easy" ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                >
                  Easy
                </button>
                <button
                  onClick={() => setDifficultyFilter("Medium")}
                  className={`px-4 py-2 rounded-lg ${difficultyFilter === "Medium" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setDifficultyFilter("Hard")}
                  className={`px-4 py-2 rounded-lg ${difficultyFilter === "Hard" ? "bg-red-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                >
                  Hard
                </button>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                >
                  <option value="title">Sort by Title</option>
                  <option value="solved">Sort by Solved</option>
                </select>

                <div className="text-sm text-gray-500 dark:text-gray-400">Next topic:</div>
                <button
                  onClick={() => setSelected(nextTopic)}
                  className="px-3 py-2 rounded-lg bg-indigo-600 text-white"
                >
                  {nextTopic}
                </button>
              </div>
            </section>

            {/* Progress indicator */}
            <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                    DSA Explorer
                  </span>
                  <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 block font-medium mt-1">
                    Track · Solve · Level up
                  </span>
                </h1>
                <div className="text-sm text-gray-500 dark:text-gray-400">{solved}/{total} solved • {total ? Math.round((solved / total) * 100) : 0}%</div>
              </div>

              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-700"
                  style={{ width: `${total ? (solved / total) * 100 : 0}%` }}
                />
              </div>
            </section>

            {/* Problems grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProblems.length ? (
                filteredAndSortedProblems.map((p) => {
                  const key = `${selected}::${p.title}`;
                  const done = !!progress[key];
                  return (
                    <article
                      key={p.title}
                      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{p.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{p.description || p.title}</p>

                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${badgeColor[p.difficulty] || "text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700"}`}>
                              {p.difficulty || "—"}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-600">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{p.link && p.link !== "#" ? "External link" : "No link"}</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <button
                            onClick={() => openProblemLink(p)}
                            disabled={!p.link || p.link === "#"}
                            className={`px-3 py-2 rounded-lg text-sm font-medium ${p.link && p.link !== "#" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500"}`}
                          >
                            Solve
                          </button>

                          <button
                            onClick={() => openNotesFor(p)}
                            className="text-sm text-indigo-600 dark:text-cyan-300 hover:underline"
                          >
                            Notes
                          </button>

                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={done}
                              onChange={() => toggleSolved(selected, p.title)}
                              className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 focus:ring-indigo-500"
                            />
                            <span className={`text-sm ${done ? "text-green-600 dark:text-emerald-300" : "text-gray-500 dark:text-gray-400"}`}>
                              {done ? "Solved" : "Mark solved"}
                            </span>
                          </label>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-lg text-gray-500 dark:text-gray-400">No problems found. Try a different search or filter.</p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      {/* Notes Modal */}
      {notesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{currentProblem?.title || "Notes"}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selected}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      saveNotes(true); // save and close
                    }}
                    className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm disabled:bg-green-400"
                    disabled={loadingSave}
                  >
                    {loadingSave ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setNotesOpen(false);
                    }}
                    className="px-3 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>

              <textarea
                value={notes[`${selected}::${currentProblem?.title}`] || ""}
                onChange={(e) =>
                  setNotes((prev) => ({ ...prev, [`${selected}::${currentProblem?.title}`]: e.target.value }))
                }
                placeholder="Write notes, hints, or your approach here..."
                className="w-full h-64 mt-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
              />

              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Notes are saved to your profile (if signed in).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}