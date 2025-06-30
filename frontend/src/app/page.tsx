"use client";

import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "react-lottie-player";
import loaderData from "@/animation/ai-loader.json";

export default function Home() {
  const [symptoms, setSymptoms] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
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

      if (data.status === "ok") {
        setAdvice(data.advice);
      } else {
        setAdvice("AI could not analyze your symptoms right now. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setAdvice("Error contacting AI server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/doctor-bg.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Glass morphic card */}
      <div className="glass-wrapper">
        <h1 className="text-3xl font-semibold text-white text-center mb-6">
          HealthEcho <br /> Symptom Analyzer
        </h1>

        <input
          type="text"
          className="glass-input"
          placeholder="Describe your symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <button
          className="glass-button"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing…" : "Analyze Symptoms"}
        </button>

        <div className="glass-output">
          {loading ? (
            <div className="flex justify-center">
              <Lottie
                animationData={loaderData}
                play
                loop
                style={{ width: 80, height: 80 }}
              />
            </div>
          ) : advice ? (
            <Typewriter
              words={[advice]}
              cursor
              cursorStyle="|"
              typeSpeed={40}
              deleteSpeed={0}
              delaySpeed={500}
            />
          ) : (
            <p className="text-white/70">Your advice will appear here.</p>
          )}
        </div>
      </div>
    </main>
  );
}
