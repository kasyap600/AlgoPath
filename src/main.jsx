// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingGate from "./pages/LandingGate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlansLanding from "./pages/PlansLanding";
import Plans from "./pages/Plans";
import PlanView from "./pages/PlanView";
import NeoProblemExplorer from "./components/NeoProblemExplorer";
import Profile from "./pages/Profile";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public landing (intro) */}
        <Route path="/" element={<LandingGate />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected app routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Nest under /app instead of / */}
          <Route path="home" element={<PlansLanding />} />
          <Route path="plans" element={<Plans />} />
          <Route path="plans/:planId" element={<PlanView />} />
          <Route path="plans/beginner-to-advance" element={<NeoProblemExplorer />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Navigate to="home" replace />} />
        </Route>

        {/* Fallback: redirect unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Toast notifications (streaks, achievements, etc.) */}
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  </React.StrictMode>
);
