import { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function ProblemForm() {
  const [form, setForm] = useState({
    title: "",
    platform: "",
    difficulty: "Easy",
    date: "",
    status: "Unsolved",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Login first!");

    try {
      await addDoc(collection(db, "users", user.uid, "problems"), form);
      alert("Problem added!");
      setForm({ title: "", platform: "", difficulty: "Easy", date: "", status: "Unsolved" });
    } catch (err) {
      console.error("Error adding problem:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Problem Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="platform"
        placeholder="Platform (LeetCode, Codeforces...)"
        value={form.platform}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full p-2 border rounded">
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
        <option>Unsolved</option>
        <option>In Progress</option>
        <option>Solved</option>
      </select>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Add Problem
      </button>
    </form>
  );
}
