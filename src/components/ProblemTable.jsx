import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function ProblemTable() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // 🔥 Real-time listener for user's problems
    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "problems"),
      (snapshot) => {
        setProblems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );

    return () => unsubscribe();
  }, []);

  // ❌ Delete Problem
  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(db, "users", user.uid, "problems", id));
  };

  // ✏️ Toggle Status (Solved <-> Unsolved)
  const toggleStatus = async (id, currentStatus) => {
    const user = auth.currentUser;
    if (!user) return;

    const newStatus =
      currentStatus === "Solved"
        ? "Unsolved"
        : currentStatus === "Unsolved"
        ? "In Progress"
        : "Solved";

    await updateDoc(doc(db, "users", user.uid, "problems", id), {
      status: newStatus,
    });
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Platform</th>
            <th className="p-3 text-left">Difficulty</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{p.title}</td>
              <td className="p-3">{p.platform}</td>
              <td
                className={`p-3 font-medium ${
                  p.difficulty === "Easy"
                    ? "text-green-600"
                    : p.difficulty === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {p.difficulty}
              </td>
              <td className="p-3">{p.date}</td>
              <td
                onClick={() => toggleStatus(p.id, p.status)}
                className={`p-3 cursor-pointer ${
                  p.status === "Solved"
                    ? "text-green-600"
                    : p.status === "In Progress"
                    ? "text-yellow-600"
                    : "text-gray-500"
                }`}
              >
                {p.status}
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {problems.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No problems logged yet 🚀
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
