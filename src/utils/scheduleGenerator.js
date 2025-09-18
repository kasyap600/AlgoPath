// src/utils/scheduleGenerator.js
import { problemsData } from "../data/problemsData";

/** simple shuffle */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** collect all problems in an array */
export function flattenProblems() {
  const all = [];
  for (const topic of Object.keys(problemsData)) {
    for (const p of problemsData[topic]) {
      all.push({ ...p, topic });
    }
  }
  return all;
}

/**
 * generateSchedule(days, totalProblems)
 * - days: number of days
 * - totalProblems: optional number of problems to schedule (defaults to all)
 * returns: { day1: [...], day2: [...], ... } zero-indexed as array of arrays
 */
export function generateSchedule(days = 30, totalProblems = null) {
  const all = shuffle(flattenProblems());
  const use = totalProblems ? all.slice(0, totalProblems) : all;
  const schedule = Array.from({ length: days }, () => []);
  // Round-robin distribute to balance topics
  for (let i = 0; i < use.length; i++) {
    schedule[i % days].push(use[i]);
  }
  return schedule; // array of day arrays
}
