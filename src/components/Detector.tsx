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

interface PredictionResult {
  prediction: "human" | "ai";
  confidence: number;
  ai_probability: number;
  human_probability: number;
}

export default function Detector() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
    useState<PredictionResult | null>(null);
  const [error, setError] = useState("");

  const wordCount =
    text.trim() === ""
      ? 0
      : text.trim().split(/\s+/).length;

  // ============================================================
  // ANALYZE TEXT
  // ============================================================

  async function analyze() {
    if (!text.trim()) {
      setError("Please enter some text first.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://humantrace.onrender.com";

      const response = await fetch(
        `${apiUrl}/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text.trim(),
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

    } catch (err) {
      console.error(
        "HumanTrace API error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to HumanTrace API."
      );

    } finally {
      setLoading(false);
    }
  }

  // ============================================================
  // PASTE
  // ============================================================

  async function pasteClipboard() {
    try {
      const clip =
        await navigator.clipboard.readText();

      if (!clip.trim()) {
        setError("Clipboard is empty.");
        return;
      }

      setText(clip);
      setResult(null);
      setError("");

    } catch {
      setError(
        "Clipboard access denied. Please paste the text manually."
      );
    }
  }

  // ============================================================
  // CLEAR
  // ============================================================

  function clearText() {
    setText("");
    setResult(null);
    setError("");
  }

  // ============================================================
  // SAMPLE
  // ============================================================

  function loadSample() {
    setText(
      `Artificial intelligence has transformed modern software development by enabling automation, natural language processing, and intelligent decision-making. Developers now integrate machine learning models into applications to improve user experiences and increase productivity.`
    );

    setResult(null);
    setError("");
  }

  // ============================================================
  // FILE UPLOAD
  // ============================================================

  async function uploadFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setResult(null);

    try {
      let extractedText = "";

      // --------------------------------------------------------
      // PDF
      // --------------------------------------------------------

      if (
        file.name.toLowerCase().endsWith(".pdf")
      ) {
        const pdfjsLib =
          await import("pdfjs-dist");

        const arrayBuffer =
          await file.arrayBuffer();

        const pdf =
          await pdfjsLib.getDocument({
            data: arrayBuffer,
          }).promise;

        for (
          let pageNum = 1;
          pageNum <= pdf.numPages;
          pageNum++
        ) {
          const page =
            await pdf.getPage(pageNum);

          const content =
            await page.getTextContent();

          const pageText =
            content.items
              .map((item: any) => item.str)
              .join(" ");

          extractedText +=
            pageText + "\n";
        }
      }

      // --------------------------------------------------------
      // DOCX
      // --------------------------------------------------------

      else if (
        file.name.toLowerCase().endsWith(".docx")
      ) {
        const mammoth =
          await import("mammoth");

        const arrayBuffer =
          await file.arrayBuffer();

        const extracted =
          await mammoth.extractRawText({
            arrayBuffer,
          });

        extractedText =
          extracted.value;
      }

      // --------------------------------------------------------
      // INVALID FILE
      // --------------------------------------------------------

      else {
        throw new Error(
          "Please upload a PDF or DOCX file."
        );
      }

      // --------------------------------------------------------
      // EMPTY FILE
      // --------------------------------------------------------

      if (!extractedText.trim()) {
        throw new Error(
          "Could not extract any text from this file."
        );
      }

      setText(
        extractedText.trim()
      );

    } catch (err) {
      console.error(
        "File upload error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to read the file."
      );

    } finally {
      // Allow the same file to be selected again.
      e.target.value = "";
    }
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <>
      <div className="glass rounded-[32px] p-10">

        {/* ---------------------------------------------------- */}
        {/* HEADER */}
        {/* ---------------------------------------------------- */}

        <h1 className="text-5xl font-bold">
          Detect
          <span className="gradientText">
            {" "}AI Text
          </span>
        </h1>

        <p className="text-slate-400 mt-4">
          Paste your text below and let
          HumanTrace analyze it.
        </p>

        {/* ---------------------------------------------------- */}
        {/* TEXTAREA */}
        {/* ---------------------------------------------------- */}

        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setResult(null);
            setError("");
          }}
          placeholder="Paste your article, essay or report here..."
          className="mt-10 w-full h-72 rounded-3xl bg-slate-900/50 border border-white/10 p-6 outline-none resize-none focus:border-indigo-500/50 transition"
        />

        {/* ---------------------------------------------------- */}
        {/* STATS + ACTIONS */}
        {/* ---------------------------------------------------- */}

        <div className="flex flex-wrap justify-between mt-6 gap-4">

          {/* Text statistics */}

          <div className="text-slate-400">
            <p>
              Characters: {text.length}
            </p>

            <p>
              Words: {wordCount}
            </p>
          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-3">

            {/* Paste */}

            <button
              onClick={pasteClipboard}
              type="button"
              className="glass px-5 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
            >
              <Clipboard size={18} />

              Paste
            </button>

            {/* Clear */}

            <button
              onClick={clearText}
              type="button"
              className="glass px-5 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
            >
              <Trash2 size={18} />

              Clear
            </button>

            {/* Sample */}

            <button
              onClick={loadSample}
              type="button"
              className="glass px-5 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
            >
              <FileText size={18} />

              Sample
            </button>

            {/* Upload */}

            <label className="glass px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer hover:scale-105 transition">

              <Upload size={18} />

              Upload

              <input
                type="file"
                accept=".pdf,.docx"
                hidden
                onChange={uploadFile}
              />

            </label>

          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* ERROR */}
        {/* ---------------------------------------------------- */}

        {error && (
          <div className="mt-6 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-red-300">
            {error}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* ANALYZE BUTTON */}
        {/* ---------------------------------------------------- */}

        <button
          onClick={analyze}
          type="button"
          disabled={loading || !text.trim()}
          className="mt-10 w-full rounded-2xl bg-indigo-600 py-5 text-lg font-semibold hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader2
                className="animate-spin"
                size={22}
              />

              Analyzing...
            </>
          ) : (
            "Analyze with HumanTrace"
          )}
        </button>

      </div>

      {/* ------------------------------------------------------ */}
      {/* RESULT */}
      {/* ------------------------------------------------------ */}

      {result && (
        <ResultCard result={result} />
      )}
    </>
  );
}