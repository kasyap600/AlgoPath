// src/components/CalendarStreak.jsx
import React from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isToday,
  format,
} from "date-fns";

export default function CalendarStreak({
  solvedDates = [],
  onToggleDate = () => {},
  initialDate = new Date(),
}) {
  const monthStart = startOfMonth(initialDate);
  const monthEnd = endOfMonth(initialDate);
  const start = startOfWeek(monthStart, { weekStartsOn: 0 });
  const end = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start, end });
  const solvedSet = new Set(solvedDates.map((d) => d.slice(0, 10)));

  const handleClick = (day, e) => {
    const dateISO = day.toISOString().slice(0, 10);
    const alreadySolved = solvedSet.has(dateISO);
    const coords = e ? { x: e.clientX, y: e.clientY } : null;
    onToggleDate(dateISO, !alreadySolved, coords);
  };

  return (
    <div className="w-full">
      {/* Days of week header */}
      <div className="grid grid-cols-7 text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-sm">
        {days.map((day) => {
          const dateISO = day.toISOString().slice(0, 10);
          const inMonth = isSameMonth(day, monthStart);
          const solved = solvedSet.has(dateISO);
          const today = isToday(day);

          return (
            <button
              key={dateISO}
              onClick={(e) => handleClick(day, e)}
              className={`h-10 w-10 flex items-center justify-center rounded-lg transition
                ${inMonth ? "" : "text-gray-300 dark:text-gray-600"}
                ${today ? "ring-2 ring-indigo-500" : ""}
                ${
                  solved
                    ? "bg-orange-100 text-orange-600 dark:bg-orange-600/30 dark:text-orange-400 font-bold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              {solved ? "🔥" : format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
