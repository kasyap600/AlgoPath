// src/utils/firestoreStreaks.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { todayISO, calculateCurrentStreak } from "./streak";

/**
 * safeAddSolvedDate:
 * - reads users/{uid}/meta/metaDoc
 * - adds today's date if not present (keeps existing array)
 * - returns the updated solvedDates array and current streak
 */
export async function safeAddSolvedDate(db, uid) {
  if (!db || !uid) throw new Error("db and uid required");
  const metaRef = doc(db, "users", uid, "meta", "metaDoc");
  try {
    const snap = await getDoc(metaRef);
    let solvedDates = [];
    if (snap.exists()) {
      const data = snap.data();
      solvedDates = Array.isArray(data.solvedDates) ? data.solvedDates.slice() : [];
    }
    const today = todayISO();
    if (!solvedDates.includes(today)) {
      solvedDates.push(today);
      // optional: sort unique
      solvedDates = Array.from(new Set(solvedDates)).sort();
      await setDoc(metaRef, { solvedDates }, { merge: true });
    }
    const streak = calculateCurrentStreak(solvedDates);
    return { solvedDates, streak };
  } catch (err) {
    console.error("safeAddSolvedDate failed", err);
    throw err;
  }
}

/**
 * optional: you may want a function to fetch solvedDates for UI, returns {solvedDates, streak}
 */
export async function fetchSolvedDatesAndStreak(db, uid) {
  const metaRef = doc(db, "users", uid, "meta", "metaDoc");
  const snap = await getDoc(metaRef);
  const solvedDates = snap.exists() && Array.isArray(snap.data().solvedDates) ? snap.data().solvedDates : [];
  const streak = calculateCurrentStreak(solvedDates);
  return { solvedDates, streak };
}
