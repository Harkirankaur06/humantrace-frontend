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

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

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
  // ANALYZE
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
        process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "API URL is not configured."
        );
      }

      const response = await fetch(
        `${apiUrl}/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
          }),
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Prediction failed."
        );
      }

      setResult(data);
    } catch (err) {
      console.error(
        "Prediction error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to HumanTrace."
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
      const fileName =
        file.name.toLowerCase();

      let extractedText = "";

      // --------------------------------------------------------
      // PDF
      // --------------------------------------------------------

      if (fileName.endsWith(".pdf")) {
        const arrayBuffer =
          await file.arrayBuffer();

        /*
         * PDF.js worker
         *
         * We use the worker file from /public.
         * This avoids Turbopack trying to treat
         * pdf.worker.mjs as a JavaScript module.
         */

        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "/pdf.worker.min.mjs";

        const pdf =
          await pdfjsLib
            .getDocument({
              data: arrayBuffer,
            })
            .promise;

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
              .map((item) => {
                if ("str" in item) {
                  return item.str;
                }

                return "";
              })
              .join(" ");

          extractedText +=
            pageText + "\n";
        }
      }

      // --------------------------------------------------------
      // DOCX
      // --------------------------------------------------------

      else if (
        fileName.endsWith(".docx")
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
      // UNSUPPORTED
      // --------------------------------------------------------

      else {
        throw new Error(
          "Please upload a PDF or DOCX file."
        );
      }

      // --------------------------------------------------------
      // VALIDATE
      // --------------------------------------------------------

      if (!extractedText.trim()) {
        throw new Error(
          "Could not extract any text from this file. Scanned PDFs may require OCR."
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
      e.target.value = "";
    }
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <>
      <div className="glass rounded-[32px] p-10">

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
            <p>
              Characters: {text.length}
            </p>

            <p>
              Words: {wordCount}
            </p>
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
              onClick={clearText}
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
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                hidden
                onChange={uploadFile}
              />

            </label>

          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-red-300">
            {error}
          </div>
        )}

        <button
          onClick={analyze}
          disabled={
            loading ||
            !text.trim()
          }
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

      </div>

      {result && (
        <ResultCard
          result={result}
        />
      )}
    </>
  );
}
