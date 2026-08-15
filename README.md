# HumanTrace — Frontend

HumanTrace is a modern web application for detecting whether text is likely to be **human-written or AI-generated**.

This repository contains the frontend of HumanTrace, built with **Next.js, React, TypeScript, and Tailwind CSS**.

The frontend provides the user interface for entering text, uploading documents, communicating with the HumanTrace backend, and displaying prediction results.

---

## Features

* Modern responsive interface
* Animated HumanTrace splash screen
* AI text detection interface
* Human vs AI classification results
* Confidence score visualization
* Human probability visualization
* AI probability visualization
* PDF document upload
* DOCX document upload
* Automatic text extraction from uploaded documents
* Clipboard paste support
* Sample text loading
* Text clearing
* Character and word counter
* Loading state during analysis
* Error handling
* Backend API integration
* Responsive design for different screen sizes

---

# Application Flow

```text
                    HumanTrace Frontend
                           │
                           ▼
                    Enter / Upload Text
                           │
              ┌────────────┴────────────┐
              │                         │
           Text Input             PDF / DOCX
              │                         │
              │                   Text Extraction
              │                         │
              └────────────┬────────────┘
                           │
                           ▼
                    Analyze with
                     HumanTrace
                           │
                           ▼
                    Flask Backend
                           │
                           ▼
                    DistilBERT Model
                           │
                           ▼
                 Prediction + Scores
                           │
                           ▼
                    Result Card
```

---

# Technology Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React

## Document Processing

* PDF.js
* Mammoth

## Backend Communication

* REST API
* Fetch API

---

# Project Structure

```text
humantrace-frontend/
│
├── public/
│   └── pdf.worker.min.mjs
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── about/
│   │   └── detect/
│   │
│   └── components/
│       ├── Detector.tsx
│       ├── ResultCard.tsx
│       ├── SplashScreen.tsx
│       └── ...
│
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

# Main Components

## SplashScreen

The splash screen introduces HumanTrace when the application loads.

It includes:

* HumanTrace typing animation
* Backspace transition
* Animated tagline
* Framer Motion animations
* Gradient visual effects

The animation transitions from:

```text
HumanTrace
```

to:

```text
Human
```

followed by the HumanTrace tagline.

---

## Detector

`Detector.tsx` is the primary detection interface.

Users can:

* type or paste text
* load sample text
* clear the editor
* upload PDF files
* upload DOCX files
* submit text for analysis

The component also displays:

```text
Characters
Words
```

and handles:

```text
Loading
Errors
Prediction results
```

---

## ResultCard

`ResultCard.tsx` displays the prediction returned by the backend.

It presents:

* prediction
* confidence
* human probability
* AI probability
* analysis summary
* processing time
* model information

Example:

```text
Analysis Result

Human Written

Confidence
99.85%

Human Probability
99.85%

AI Probability
0.15%

Model
DistilBERT
```

---

# Document Upload

HumanTrace supports:

```text
PDF
DOCX
```

When a document is uploaded, the frontend extracts its text locally before sending it to the backend.

### PDF

PDF.js is used to extract text from PDF pages.

```text
PDF
 ↓
PDF.js
 ↓
Extract page text
 ↓
Combine text
 ↓
HumanTrace API
```

### DOCX

Mammoth is used to extract raw text from Word documents.

```text
DOCX
 ↓
Mammoth
 ↓
Extract text
 ↓
HumanTrace API
```

The application currently works with text-based documents.

Scanned PDFs containing only images may require OCR and are not automatically converted into text.

---

# Backend Integration

The frontend communicates with the HumanTrace Flask backend through the `/predict` endpoint.

The API URL is configured using:

```text
NEXT_PUBLIC_API_URL
```

Example local configuration:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
```

The frontend sends:

```json
{
  "text": "Text to analyze..."
}
```

The backend returns:

```json
{
  "prediction": "human",
  "confidence": 0.9985,
  "ai_probability": 0.0015,
  "human_probability": 0.9985
}
```

---

# Environment Variables

Create:

```text
.env.local
```

in the frontend root.

Example:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
```

For production, replace the URL with the deployed backend URL.

### Important

`.env.local` is intentionally excluded from Git.

Do **not** commit API URLs containing private credentials or secrets.

---

# Installation

Clone the repository:

```powershell
git clone https://github.com/Harkirankaur06/humantrace-frontend.git
```

Enter the project:

```powershell
cd humantrace-frontend
```

Install dependencies:

```powershell
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
```

---

# Running Locally

Start the development server:

```powershell
npm run dev
```

The application will normally be available at:

```text
http://localhost:3000
```

Make sure the HumanTrace Flask backend is also running:

```text
http://127.0.0.1:5000
```

The complete local setup is therefore:

```text
Frontend
http://localhost:3000
       │
       │ POST /predict
       ▼
Backend
http://127.0.0.1:5000
       │
       ▼
DistilBERT
```

---

# Production Build

To create an optimized production build:

```powershell
npm run build
```

To start the production server:

```powershell
npm start
```

---

# Detection Workflow

```text
1. User enters text
        ↓
2. User clicks "Analyze with HumanTrace"
        ↓
3. Frontend sends POST /predict
        ↓
4. Flask validates the request
        ↓
5. DistilBERT performs classification
        ↓
6. Backend returns probabilities
        ↓
7. Frontend receives prediction
        ↓
8. ResultCard displays the result
```

---

# User Interaction

The detection page provides several input methods.

### Paste

Reads text from the user's clipboard.

### Sample

Loads a predefined sample paragraph for testing.

### Clear

Removes the current text and prediction.

### Upload

Allows users to upload:

```text
.pdf
.docx
```

The extracted text is placed into the editor so the user can review it before analysis.

---

# Error Handling

The frontend handles common errors including:

* Empty input
* Clipboard permission errors
* Unsupported file formats
* Empty documents
* PDF extraction errors
* DOCX extraction errors
* Backend connection failures
* Invalid API responses
* Prediction errors

Errors are displayed directly in the detection interface.

---

# Design

HumanTrace uses a dark, glassmorphism-inspired interface.

The UI includes:

* Glass cards
* Gradient typography
* Animated transitions
* Rounded components
* Responsive layouts
* Interactive buttons
* Framer Motion animations

The design is intended to create a modern AI-product experience while keeping the detection workflow simple.

---

# Important Note About Detection

HumanTrace provides a machine-learning-based prediction rather than definitive proof of authorship.

The displayed confidence represents the model's confidence in its classification.

Human-written and AI-generated text can share similar linguistic characteristics, so predictions should be interpreted as **probabilistic signals**.

---

# Related Repository

The HumanTrace backend is maintained separately:

```text
https://github.com/Harkirankaur06/humantrace
```

The backend contains:

* Flask API
* Model inference
* Prediction logic
* Dataset pipeline
* Model training
* Model evaluation

---

# Deployment

The frontend can be deployed using Vercel or another Next.js-compatible hosting platform.

The deployed frontend requires the `NEXT_PUBLIC_API_URL` environment variable to point to the HumanTrace backend.

Example:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.example.com
```

---

# Author

**Harkiran Kaur**

GitHub:

```text
https://github.com/Harkirankaur06
```

---

## License

This project is released under the **MIT License**.
