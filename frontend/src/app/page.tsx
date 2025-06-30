"use client";

import { useState } from "react";

export default function Home() {
  const [symptoms, setSymptoms] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeSymptoms = async () => {
    setLoading(true);
    setAdvice("");
    try {
      const res = await fetch("http://localhost:5000/api/analyze/symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms }),
      });
      const data = await res.json();
      setAdvice(data.advice);
    } catch (error) {
      setAdvice("Failed to get advice. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <h1 className="text-3xl font-bold text-white mb-4">HealthEcho Symptom Analyzer 🚑</h1>
      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Describe your symptoms..."
        className="w-full max-w-md p-3 rounded border border-gray-300 mb-4"
        rows={4}
      />
      <button
        onClick={analyzeSymptoms}
        disabled={loading}
        className="bg-white text-green-600 font-semibold px-6 py-2 rounded shadow hover:bg-green-100 transition"
      >
        {loading ? "Analyzing..." : "Analyze Symptoms"}
      </button>
      {advice && (
        <p className="mt-6 text-white text-lg text-center">{advice}</p>
      )}
    </main>
  );
}
