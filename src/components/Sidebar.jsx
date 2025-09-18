// src/components/Sidebar.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FaHome, FaListAlt, FaSearch, FaChevronLeft, FaFolder } from "react-icons/fa";

/**
 * Props:
 * - topics: string[] (list of topic names)
 * - onSelectTopic(topic)
 * - onSearch(query)
 * - onToggleLevel(level) -> "basic" | "advanced"
 * - onNavigate(name) -> "home" | "track" | ... (optional)
 * - collapsed (bool) optional to control collapsed state externally
 */
export default function Sidebar({
  topics = [],
  onSelectTopic = () => {},
  onSearch = () => {},
  onToggleLevel = () => {},
  onNavigate = () => {},
  collapsed: collapsedProp = false,
}) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("advanced");
  const [active, setActive] = useState(null);
  const [collapsed, setCollapsed] = useState(!!collapsedProp);

  useEffect(() => setCollapsed(!!collapsedProp), [collapsedProp]);

  // debounce search to avoid spamming parent
  useEffect(() => {
    const t = setTimeout(() => {
      onSearch(query.trim());
    }, 250);
    return () => clearTimeout(t);
  }, [query, onSearch]);

  const handleSelect = (topic) => {
    setActive(topic);
    onSelectTopic(topic);
  };

  const handleLevel = (l) => {
    setLevel(l);
    onToggleLevel(l);
  };

  const navButtons = [
    { id: "home", label: "Home", icon: <FaHome /> },
    { id: "track", label: "Track", icon: <FaListAlt /> },
  ];

  const topicsList = useMemo(() => topics || [], [topics]);

  return (
    <aside
      className={`flex flex-col ${
        collapsed ? "w-16" : "w-64"
      } h-screen bg-[#0b0f19] border-r border-white/6 text-gray-200 transition-all duration-200`}
    >
      {/* top: logo + collapse */}
      <div className="px-3 py-4 flex items-center justify-between border-b border-white/6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 grid place-items-center text-white font-bold">
            D
          </div>
          {!collapsed && (
            <div>
              <div className="text-sm font-semibold">DSA Explorer</div>
              <div className="text-xs text-gray-400">Track · Solve · Level up</div>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed((s) => !s)}
          className="p-2 rounded-md hover:bg-white/4"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <FaChevronLeft className={`${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* search */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-white/6">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <FaSearch />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-[#0f1317] border border-white/6 rounded-lg py-2 pl-10 pr-3 text-sm placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => handleLevel("basic")}
              className={`flex-1 px-3 py-1 rounded-md text-sm ${level === "basic" ? "bg-indigo-600 text-white" : "bg-white/3"}`}
            >
              Basic
            </button>
            <button
              onClick={() => handleLevel("advanced")}
              className={`flex-1 px-3 py-1 rounded-md text-sm ${level === "advanced" ? "bg-indigo-600 text-white" : "bg-white/3"}`}
            >
              Advanced
            </button>
          </div>
        </div>
      )}

      {/* folder list */}
      <nav className="flex-1 overflow-auto px-1 py-3">
        <ul className="space-y-1">
          {topicsList.map((t) => {
            const isActive = t === active;
            return (
              <li key={t}>
                <button
                  onClick={() => handleSelect(t)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/4 transition ${
                    isActive ? "bg-indigo-600/30 text-white" : "text-gray-300"
                  }`}
                >
                  <span className="w-5 text-gray-300"><FaFolder /></span>
                  {!collapsed && <span className="text-sm">{t}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* bottom compact nav */}
      <div className="px-2 py-3 border-t border-white/6">
        <div className="flex flex-col gap-2">
          {navButtons.map((b) => (
            <button
              key={b.id}
              onClick={() => onNavigate(b.id)}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/4"
            >
              <div className="w-8 h-8 grid place-items-center text-lg">{b.icon}</div>
              {!collapsed && <div className="text-sm">{b.label}</div>}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
