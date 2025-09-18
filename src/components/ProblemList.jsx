import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { problemsData } from "../data/problemsData";

const badgeColor = {
  Easy: "text-emerald-300 bg-emerald-500/10 border-emerald-400/30",
  Medium: "text-sky-300 bg-sky-500/10 border-sky-400/30",
  Hard: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-400/30",
};

export default function ProblemList() {
  const [solvedProblems, setSolvedProblems] = useState({});
  const [search, setSearch] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const fetchProgress = async () => {
      const ref = doc(db, "users", user.uid, "progress", "problems");
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setSolvedProblems(snapshot.data());
      }
    };
    fetchProgress();
  }, [user]);

    const toggleProblem = async (topic, title) => {
    const key = `${topic}::${title}`; // Changed from ${topic}-${title}
    const newStatus = !solvedProblems[key];
    const updated = { ...solvedProblems, [key]: newStatus };
    setSolvedProblems(updated);

    if (user) {
        const ref = doc(db, "users", user.uid, "progress", "problems");
        await setDoc(ref, updated, { merge: true });
    }
};

  // Calculate topic progress
  const getTopicProgress = (topic) => {
    const problems = problemsData[topic] || [];
    const total = problems.length;
    const solved = problems.filter(p => solvedProblems[`${topic}-${p.title}`]).length;
    return { solved, total };
  };

  // Filter problems
  const filteredProblems = (topic) => {
    return (problemsData[topic] || []).filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400">
          📘 DSA Problem List
        </h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search problems..."
          className="w-full mb-6 bg-gray-800/50 p-3 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {Object.keys(problemsData).map((topic) => {
          const { solved, total } = getTopicProgress(topic);
          return (
            <div key={topic} className="mb-8">
              <h3 className="text-xl font-bold text-purple-400 mb-4">{topic}</h3>

              {/* Topic Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>{solved}/{total} solved</span>
                  <span>{total ? Math.round((solved / total) * 100) : 0}%</span>
                </div>
                <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${total ? (solved / total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Problems Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProblems(topic).map((problem) => {
                  const key = `${topic}-${problem.title}`;
                  const done = !!solvedProblems[key];
                  return (
                    <div
                      key={problem.title}
                      className={`relative rounded-2xl border p-4 bg-gray-800/70 hover:bg-gray-800/90 transition-all duration-200 shadow-md hover:shadow-lg ${done ? 'border-emerald-400/40' : 'border-gray-700'}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-semibold text-gray-100">{problem.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full border ${badgeColor[problem.difficulty] || 'text-gray-400 border-gray-500/30 bg-gray-500/10'}`}>
                          {problem.difficulty || "—"}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <a
                          href={problem.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm underline-offset-4 hover:underline ${problem.link && problem.link !== "#" ? "text-cyan-400" : "text-gray-500 cursor-not-allowed"}`}
                        >
                          {problem.link && problem.link !== "#" ? "Solve the problem ↗" : "Link coming soon"}
                        </a>
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-purple-500 transition-all"
                            checked={done}
                            onChange={() => toggleProblem(topic, problem.title)}
                          />
                          <span className={`text-xs ${done ? "text-emerald-300" : "text-gray-400"}`}>
                            {done ? "Solved" : "Mark solved"}
                          </span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}