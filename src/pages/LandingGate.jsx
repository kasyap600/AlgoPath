// src/pages/LandingGate.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../assets/brand.svg";
import HeroIll from "../assets/hero-ill.png";
import ReactLogo from "../assets/react.svg";

/**
 * Enhanced landing gate showcasing DSA topics
 * - Click anywhere opens auth prompt (existing behavior)
 * - Data Structures / Algorithms panels with search & filters
 * - Clicking a card opens auth prompt (if not authenticated) or navigates (you wire routes)
 */

const DATA_STRUCTURES = [
  { id: "array", title: "Arrays", blurb: "Indexing & contiguous storage", emoji: "🧩", popularity: "Core" },
  { id: "linked-list", title: "Linked List", blurb: "Pointer-based linear lists", emoji: "🔗", popularity: "Core" },
  { id: "stack-queue", title: "Stack & Queue", blurb: "LIFO / FIFO patterns", emoji: "📚", popularity: "Core" },
  { id: "hashmap", title: "Hash Map", blurb: "Constant-time lookups with hashes", emoji: "🔐", popularity: "High" },
  { id: "tree", title: "Trees", blurb: "Hierarchical data, traversals", emoji: "🌳", popularity: "High" },
  { id: "graph", title: "Graphs", blurb: "Nodes & edges — modelling relations", emoji: "🕸️", popularity: "High" },
  { id: "heap", title: "Heap / Priority Queue", blurb: "Top-k and scheduling", emoji: "📈", popularity: "Medium" },
  { id: "trie", title: "Trie", blurb: "Prefix trees for strings", emoji: "🔤", popularity: "Niche" },
];

const ALGORITHMS = [
  { id: "two-pointer", title: "Two Pointers", blurb: "Linear scans from both ends", emoji: "↔️", difficulty: "Easy" },
  { id: "binary-search", title: "Binary Search", blurb: "Logarithmic search on sorted arrays", emoji: "🔍", difficulty: "Easy" },
  { id: "dfs-bfs", title: "DFS / BFS", blurb: "Graph/tree traversal basics", emoji: "🌊", difficulty: "Medium" },
  { id: "dijkstra", title: "Dijkstra", blurb: "Shortest path on weighted graphs", emoji: "🛣️", difficulty: "Medium" },
  { id: "knapsack", title: "Knapsack (DP)", blurb: "Dynamic programming fundamentals", emoji: "🎒", difficulty: "Hard" },
  { id: "divide-conquer", title: "Divide & Conquer", blurb: "Break problems into subproblems", emoji: "✂️", difficulty: "Medium" },
  { id: "sorts", title: "Sorting (merge/quick)", blurb: "Foundational orderings", emoji: "🔃", difficulty: "Easy" },
  { id: "union-find", title: "Union-Find", blurb: "Disjoint-set union operations", emoji: "🤝", difficulty: "Medium" },
];

export default function LandingGate() {
  const navigate = useNavigate();
  const [authPromptOpen, setAuthPromptOpen] = useState(false);

  // Clicking anywhere triggers the prompt (capture phase so it fires early)
  useEffect(() => {
    const onClick = () => setAuthPromptOpen(true);
    window.addEventListener("click", onClick, { capture: true });
    return () => window.removeEventListener("click", onClick, { capture: true });
  }, []);

  // local search + filters for DS / Algo
  const [query, setQuery] = useState("");
  const [algoFilter, setAlgoFilter] = useState("All");
  const [dsFilter, setDsFilter] = useState("All");

  const filteredDS = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DATA_STRUCTURES.filter((d) => {
      if (dsFilter !== "All" && d.popularity !== dsFilter) return false;
      if (!q) return true;
      return d.title.toLowerCase().includes(q) || d.blurb.toLowerCase().includes(q);
    });
  }, [query, dsFilter]);

  const filteredAlgos = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALGORITHMS.filter((a) => {
      if (algoFilter !== "All" && a.difficulty !== algoFilter) return false;
      if (!q) return true;
      return a.title.toLowerCase().includes(q) || a.blurb.toLowerCase().includes(q);
    });
  }, [query, algoFilter]);

  const goLogin = (e) => {
    e?.stopPropagation();
    setAuthPromptOpen(false);
    navigate("/login");
  };
  const goRegister = (e) => {
    e?.stopPropagation();
    setAuthPromptOpen(false);
    navigate("/register");
  };

  // handle clicking a card — open auth prompt (or navigate if auth check is wired)
  const onCardClick = (e, route) => {
    e.stopPropagation();
    // If you later check auth here, route to the page; for now, show auth prompt to match gating behavior
    setAuthPromptOpen(true);
    // Example: if user is authenticated you could do: navigate(route)
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-slate-900 dark:text-gray-100 antialiased">
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block absolute -left-40 -top-40 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-indigo-100/30 to-purple-100/20 dark:from-indigo-900/30 dark:to-purple-900/20 blur-3xl transform rotate-[15deg]" />
      </div>

      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={BrandLogo} alt="DSA Tracker" className="w-10 h-10" />
          <div>
            <div className="text-lg font-semibold tracking-tight">DSA Tracker</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">practice • track • level up</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/plans");
            }}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-gray-800 text-sm hover:bg-slate-50 dark:hover:bg-gray-900 transition"
          >
            Browse plans
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setAuthPromptOpen(true);
            }}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700 text-sm"
          >
            Get started
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-start gap-12 py-12 lg:py-24">
        {/* Left: Hero + Search */}
        <section className="lg:flex-1 w-full max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-indigo-50/40 dark:bg-indigo-900/20 px-3 py-1.5">
            <img src={ReactLogo} alt="" className="w-6 h-6 opacity-90" />
            <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">New • DSA Planner</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Master data structures & algorithms — the practical way.
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
            Track progress, practice curated interview problems, follow guided study paths and level up your problem solving with a clean, distraction-free workspace.
          </p>

          <div className="flex gap-3 items-center mb-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAuthPromptOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
            >
              Start solving — Login
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/plans");
              }}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-700 text-sm hover:shadow-sm transition"
            >
              Explore plans
            </button>
          </div>

          {/* Search + filters */}
          <div className="flex gap-3 flex-wrap items-center mb-8">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Search topics or algorithms (e.g. Graph, Binary Search)"
              className="flex-1 min-w-[200px] p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600"
              aria-label="Search DSA topics"
            />
            <div className="flex gap-2">
              <select
                value={dsFilter}
                onChange={(e) => setDsFilter(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm"
                aria-label="Filter data structures"
              >
                <option value="All">All DS</option>
                <option value="Core">Core</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Niche">Niche</option>
              </select>

              <select
                value={algoFilter}
                onChange={(e) => setAlgoFilter(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm"
                aria-label="Filter algorithms"
              >
                <option value="All">All Algo</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <h4 className="font-semibold mb-1">Structured paths</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Beginner → Advanced tracks with daily tasks and progress tracking.</p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <h4 className="font-semibold mb-1">150+ Interview problems</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">High-frequency questions with links to practice solutions.</p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <h4 className="font-semibold mb-1">Notes & progress</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Save notes per problem and sync progress with your account.</p>
            </div>
          </div>
        </section>

        {/* Right: Illustration & quick explorer preview */}
        <aside className="lg:w-1/2 w-full flex flex-col items-center gap-6">
          <div className="w-full max-w-md">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/40 dark:from-gray-900/60 dark:to-gray-900/40 p-6">
              <img src={HeroIll} alt="Illustration" className="w-full h-auto object-cover" />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 w-full">
              <div>Designed for focused learning</div>
              <div>• • •</div>
            </div>
          </div>

          {/* Quick preview: Data Structures + Algorithms cards */}
          <div className="w-full max-w-md mt-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h4 className="text-sm font-semibold mb-3">Popular Data Structures</h4>
              <div className="grid grid-cols-2 gap-3">
                {DATA_STRUCTURES.slice(0, 4).map((d) => (
                  <button
                    key={d.id}
                    onClick={(e) => onCardClick(e, `/explorer/ds/${d.id}`)}
                    className="text-left p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:shadow-sm transition bg-white dark:bg-gray-900"
                    onMouseDown={(e) => e.stopPropagation()}
                    aria-label={`Open ${d.title}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{d.emoji}</div>
                      <div className="flex-1">
                        <div className="font-medium">{d.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{d.blurb}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <hr className="my-3 border-gray-100 dark:border-gray-800" />

              <h4 className="text-sm font-semibold mb-3">Key Algorithms</h4>
              <div className="grid grid-cols-2 gap-3">
                {ALGORITHMS.slice(0, 4).map((a) => (
                  <button
                    key={a.id}
                    onClick={(e) => onCardClick(e, `/explorer/algo/${a.id}`)}
                    className="text-left p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:shadow-sm transition bg-white dark:bg-gray-900"
                    onMouseDown={(e) => e.stopPropagation()}
                    aria-label={`Open ${a.title}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{a.emoji}</div>
                      <div className="flex-1">
                        <div className="font-medium">{a.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{a.blurb}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">Click any card to explore — you'll be prompted to log in.</div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-slate-400">
        Built with care • © {new Date().getFullYear()} DSA Tracker
      </footer>

      {/* Auth prompt modal */}
      {authPromptOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setAuthPromptOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Welcome to DSA Tracker</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    To continue, please login or create a free account.
                  </p>
                </div>
                <button onClick={() => setAuthPromptOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">×</button>
              </div>

              <div className="mt-6 grid gap-3">
                <button onClick={goLogin} className="w-full px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">Login</button>
                <button onClick={goRegister} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-800 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-gray-900">Create account</button>
                <button onClick={() => setAuthPromptOpen(false)} className="w-full mt-2 text-xs text-slate-500">Continue as guest (limited)</button>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500">
              We’ll never share your data — sync progress with Firebase when you sign up.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
