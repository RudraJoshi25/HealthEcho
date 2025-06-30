"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const checkHealth = async () => {
    const res = await fetch("http://localhost:5000/api/health/check");
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-6">HealthEcho Frontend Works! 🚀</h1>
      <button
        onClick={checkHealth}
        className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-100 transition"
      >
        Check Backend Health
      </button>
      {message && (
        <p className="mt-6 text-white text-lg">{message}</p>
      )}
    </main>
  );
}
