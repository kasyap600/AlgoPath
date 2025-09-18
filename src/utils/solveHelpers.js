// src/utils/solveHelpers.js
import { doc, updateDoc, arrayUnion, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * markDateSolved(uid, dateStr)
 * - Adds dateStr (YYYY-MM-DD) to user's solvedDates set.
 * - If dateStr omitted, uses today's local date.
 */
export async function markDateSolved(uid, dateStr = null) {
  if (!uid) return;
  const date = dateStr ?? new Date().toISOString().slice(0, 10);
  const ref = doc(db, "users", uid, "meta", "metaDoc");

  try {
    await updateDoc(ref, {
      solvedDates: arrayUnion(date),
      lastSolveAt: serverTimestamp(),
    });
  } catch (err) {
    // if doc doesn't exist, create it
    await setDoc(ref, {
      solvedDates: [date],
      lastSolveAt: serverTimestamp(),
    }, { merge: true });
  }
}
