"use client";

import { useState } from "react";
import {
  Clipboard,
  Trash2,
  Loader2,
  Upload,
  FileText,
} from "lucide-react";
import ResultCard from "./ResultCard";

type PredictionResult = {
  prediction: "human" | "ai";
  confidence: number;
  ai_probability: number;
  human_probability: number;
};

export default function Detector() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState("");

  const wordCount =
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  async function analyze() {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Prediction failed."
        );
      }

      setResult(data);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to connect to the HumanTrace backend."
      );

    } finally {

      setLoading(false);

    }
  }

  async function pasteClipboard() {
    try {
      const clip = await navigator.clipboard.readText();
      setText(clip);
      setResult(null);
      setError("");
    } catch {
      alert("Clipboard access denied.");
    }
  }

  function loadSample() {
    setText(
      `Artificial intelligence has transformed modern software development by enabling automation, natural language processing, and intelligent decision-making. Developers now integrate machine learning models into applications to improve user experiences and increase productivity.`
    );

    setResult(null);
    setError("");
  }

  function uploadFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      setText(event.target?.result as string);
      setResult(null);
      setError("");
    };

    reader.readAsText(file);
  }

  return (
    <>
      <div className="glass rounded-[32px] p-10">

        <h1 className="text-5xl font-bold">
          Detect
          <span className="gradientText"> AI Text</span>
        </h1>

        <p className="text-slate-400 mt-4">
          Paste your text below and let HumanTrace analyze it.
        </p>

        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setResult(null);
            setError("");
          }}
          placeholder="Paste your article, essay or report here..."
          className="mt-10 w-full h-72 rounded-3xl bg-slate-900/50 border border-white/10 p-6 outline-none resize-none"
        />

        <div className="flex flex-wrap justify-between mt-6 gap-4">

          <div className="text-slate-400">
            <p>Characters: {text.length}</p>
            <p>Words: {wordCount}</p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={pasteClipboard}
              className="glass px-5 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
            >
              <Clipboard size={18} />
              Paste
            </button>

            <button
              onClick={() => {
                setText("");
                setResult(null);
                setError("");
              }}
              className="glass px-5 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
            >
              <Trash2 size={18} />
              Clear
            </button>

            <button
              onClick={loadSample}
              className="glass px-5 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
            >
              <FileText size={18} />
              Sample
            </button>

            <label className="glass px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer hover:scale-105 transition">

              <Upload size={18} />

              Upload

              <input
                type="file"
                accept=".txt"
                hidden
                onChange={uploadFile}
              />

            </label>

          </div>

        </div>

        <button
          onClick={analyze}
          disabled={loading || !text.trim()}
          className="mt-10 w-full rounded-2xl bg-indigo-600 py-5 text-lg font-semibold hover:bg-indigo-500 transition disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze with HumanTrace"
          )}
        </button>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-center text-red-300">
            {error}
          </div>
        )}

      </div>

      {result && (
        <ResultCard
          result={result}
        />
      )}
    </>
  );
}