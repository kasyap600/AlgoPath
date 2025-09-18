// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

/**
 * ProtectedRoute
 * - Shows `children` only to authenticated users.
 * - While Firebase resolves the auth state, shows null (you can replace with a spinner).
 * - If not authenticated, redirects to /login.
 */
export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  // Show nothing while auth status is being determined.
  // Optionally render a spinner or skeleton here.
  if (checking) return null;

  if (!user) {
    // Not signed in -> redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is signed in -> render protected children
  return children;
}
