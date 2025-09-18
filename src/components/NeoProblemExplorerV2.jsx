// src/components/NeoProblemExplorerV2.jsx
import { useEffect, useMemo, useState } from "react";
import { problemsData } from "../data/problemsData";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import ProgressRing from "./ProgressRing";
import { FaExternalLinkAlt, FaSearch, FaFilter } from "react-icons/fa";

const difficultyColor = {
  Easy: "bg-emerald-600/20 text-emerald-300 border-emerald-400/30",
  Medium: "bg-sky-600/20 text-sky-300 border-sky-400/30",
  Hard: "bg-fuchsia-600/20 text-fuchsia-300 border-fuchsia-400/30",
};

export default function NeoProblemExplorerV2() {
  const topics = Object.keys(problemsData);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [progress, setProgress] = useState({});
  const [userId, setUserId] = useState(null);

  // UI states
  const [q, setQ] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [showOnlySolved, setShowOnlySolved] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (u) {
        setUserId(u.uid);
        const ref = doc(db, "users", u.uid, "progress", "problems");
        const snap = await getDoc(ref);
        if (snap.exists()) setProgress(snap.data());
      } else {
        setUserId(null);
        setProgress({});
      }
    });
    return () => unsub();
  }, []);

  const topicStats = useMemo(() => {
    const list = problemsData[selectedTopic] || [];
    let solved = 0;
    for (const p of list) if (progress[`${selectedTopic}::${p.title}`]) solved++;
    return { solved, total: list.length, percent: list.length ? (solved / list.length) * 100 : 0 };
  }, [selectedTopic, progress]);

  const toggleSolved = async (topic, title) => {
    const key = `${topic}::${title}`;
    const updated = { ...progress, [key]: !progress[key] };
    setProgress(updated);
    if (userId) {
      const ref = doc(db, "users", userId, "progress", "problems");
      await setDoc(ref, updated, { merge: true });
    }
  };

  // filtered list by search and difficulty and solved toggle
  const visibleProblems = useMemo(() => {
    const list = problemsData[selectedTopic] || [];
    return list.filter((p) => {
      if (difficultyFilter !== "All" && p.difficulty !== difficultyFilter) return false;
      if (q && !p.title.toLowerCase().includes(q.toLowerCase())) return false;
      const done = !!progress[`${selectedTopic}::${p.title}`];
      if (showOnlySolved && !done) return false;
      return true;
    });
  }, [selectedTopic, q, difficultyFilter, showOnlySolved, progress]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-300">
            DSA Explorer Pro
          </h1>
          <p className="text-sm text-gray-300 mt-1">Sleek roadmap, progress tracking & focused practice.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 rounded-xl p-2">
            <FaSearch className="text-gray-300" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search problems..."
              className="bg-transparent outline-none text-gray-200 placeholder-gray-400 w-56"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-white/5 px-3 py-2 rounded-xl text-gray-200 outline-none"
            >
              <option value="All">All difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <button
              onClick={() => setShowOnlySolved((s) => !s)}
              className={`px-3 py-2 rounded-xl border ${showOnlySolved ? "border-emerald-400/40 bg-emerald-500/10" : "border-white/10"}`}
              title="Toggle solved"
            >
              <FaFilter className="inline-block mr-2" /> {showOnlySolved ? "Solved" : "All"}
            </button>
          </div>
        </div>
      </div>

      {/* topics row */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-6">
        {topics.map((t) => {
          const active = t === selectedTopic;
          return (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition ${active ? "bg-gradient-to-r from-fuchsia-600/10 to-cyan-600/6 border-fuchsia-400/40 shadow-[0_6px_30px_rgba(124,58,237,0.12)]" : "bg-white/2 border-white/6 hover:border-white/20"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/3">
                  <ProgressRing size={44} stroke={5} progress={Math.round((() => {
                    const arr = problemsData[t] || [];
                    let s = 0;
                    for (const p of arr) if (progress[`${t}::${p.title}`]) s++;
                    return arr.length ? (s / arr.length) * 100 : 0;
                  })())} />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-100">{t}</div>
                  <div className="text-xs text-gray-400">{(problemsData[t] || []).length} problems</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* left: topic summary + quick actions */}
        <div className="col-span-1 bg-gradient-to-br from-white/3 to-white/2 rounded-2xl p-5 border border-white/6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-300">Topic</div>
              <div className="text-lg font-semibold">{selectedTopic}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">Progress</div>
              <div className="text-lg font-semibold">{topicStats.solved}/{topicStats.total}</div>
            </div>
          </div>

          <div className="my-4">
            <ProgressRing size={110} stroke={8} progress={topicStats.percent} />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                // mark all as solved
                const upd = { ...progress };
                for (const p of problemsData[selectedTopic]) upd[`${selectedTopic}::${p.title}`] = true;
                setProgress(upd);
                if (userId) setDoc(doc(db, "users", userId, "progress", "problems"), upd, { merge: true });
              }}
              className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-semibold"
            >
              Mark all solved
            </button>
            <button
              onClick={() => {
                const upd = { ...progress };
                for (const p of problemsData[selectedTopic]) upd[`${selectedTopic}::${p.title}`] = false;
                setProgress(upd);
                if (userId) setDoc(doc(db, "users", userId, "progress", "problems"), upd, { merge: true });
              }}
              className="px-4 py-2 rounded-xl border border-white/8 text-gray-200"
            >
              Reset
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-400">
            Pro tip: use the search box to jump to a specific problem. Click the link to open the official problem in a new tab.
          </div>
        </div>

        {/* right: problems list */}
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleProblems.map((p) => {
              const key = `${selectedTopic}::${p.title}`;
              const done = !!progress[key];
              return (
                <div
                  key={p.title}
                  className={`p-4 rounded-2xl border ${done ? "border-emerald-400/30 bg-emerald-900/5" : "border-white/6 bg-white/3"} backdrop-blur-md transition transform hover:-translate-y-1 hover:scale-[1.01]`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white leading-tight">{p.title}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full border ${difficultyColor[p.difficulty] || "bg-white/5"}`}>{p.difficulty}</span>
                        <span className="text-xs text-gray-400">• {p.link && p.link !== "#" ? "LeetCode" : "External"}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-xs text-gray-300">+{p.difficulty === "Easy" ? 50 : p.difficulty === "Medium" ? 100 : 200} XP</div>
                      <div className="flex items-center gap-2">
                        <a
                          href={p.link || "#"}
                          target="_blank"
                          rel="noreferrer"
                          className={`p-2 rounded-lg border border-white/6 ${p.link && p.link !== "#" ? "hover:border-cyan-400" : "opacity-60 cursor-not-allowed"}`}
                        >
                          <FaExternalLinkAlt className="text-xs" />
                        </a>

                        <button
                          onClick={() => toggleSolved(selectedTopic, p.title)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${done ? "bg-emerald-500/20 text-emerald-200" : "bg-white/5 text-gray-200"}`}
                        >
                          {done ? "Solved" : "Mark"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-gray-400">Topic: <span className="text-gray-200">{selectedTopic}</span></div>
                </div>
              );
            })}
            {visibleProblems.length === 0 && (
              <div className="col-span-full p-8 rounded-2xl border border-white/6 text-center text-gray-400">
                No problems match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
