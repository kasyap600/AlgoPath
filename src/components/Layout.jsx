// src/components/Layout.jsx
import React from "react";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
      <Header />
      <main>{children}</main>
    </div>
  );
}
