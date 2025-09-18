// src/utils/streak.js
// Helpers for streak calculation

/**
 * return array of consecutive dates strings YYYY-MM-DD ending at today if included
 * solvedDates should be array of 'YYYY-MM-DD' strings (not Date objects)
 */
export function calculateCurrentStreak(solvedDates = []) {
  if (!Array.isArray(solvedDates) || solvedDates.length === 0) return 0;
  // make a set for O(1) lookup
  const set = new Set(solvedDates);
  const today = new Date();
  const toISO = (d) => d.toISOString().slice(0, 10);

  let streak = 0;
  // if today is not solved, streak still can be >0 (count last consecutive days)
  let cursor = new Date(); // start from today
  // if today is not in set, start counting from yesterday
  if (!set.has(toISO(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!set.has(toISO(cursor))) {
      return 0;
    }
  }
  // now walk backwards while dates in set
  while (set.has(toISO(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** returns boolean whether dateStr is yesterday relative to today (YYYY-MM-DD) */
export function isYesterday(dateStr) {
  const d = new Date(dateStr);
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return y.toISOString().slice(0, 10) === d.toISOString().slice(0, 10);
}

/** format today's YYYY-MM-DD */
export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
