# 🎬 YouTube Video Summarizer Web App

A fully frontend-based YouTube summarization tool that supports **multilingual summaries**, **short notes**, **mind maps**, and **QnA generation**, with **export options** for PDF, TXT, and PNG.

---

## 🛠️ Features

- 🎯 Summarize YouTube videos in **any language**
- 📝 Auto-generate short notes & QnA
- 🧠 Mind Map generation via `markmap.js`
- 🌐 Translate summaries to/from **any language**
- 📤 Export summary to **PDF**, **TXT**, or **PNG**
- ⚡ Works fully on frontend using **HTML/CSS/JS or React**
- 📺 Input: Just paste a YouTube URL

---

## 📆 6-Day Development Plan

---

### ✅ **Day 1: UI/UX Design + Project Setup**

- [x] Design clean and responsive UI layout
- [x] Input: YouTube URL + Target Language
- [x] Tabs for: Summary, Notes, Mind Map, QnA
- [x] Export buttons (PDF, TXT, PNG)
- [x] Project initialized (HTML/CSS/JS or React)

---

### ✅ **Day 2: Fetch YouTube Transcript (Multilingual)**

- [x] Integrate YouTube Transcript API (unofficial or RapidAPI)
- [x] Support auto-detection or selection of transcript language
- [x] Handle transcript unavailability gracefully

---

### ✅ **Day 3: AI-Powered Summarization + Translation**

- [x] Send transcript to OpenAI / Gemini API
- [x] Summarize into short notes (bullets + paragraphs)
- [x] Translate summary into user-selected language
- [x] Display summary output in app

---

### ✅ **Day 4: Mind Map + QnA Generation**

- [x] Parse summary into structured format for `markmap.js`
- [x] Render interactive mind map
- [x] Generate 5–10 QnAs using transcript
- [x] Display QnA in user-friendly format

---

### ✅ **Day 5: Export Features + Language Enhancements**

- [x] PDF export via `html2pdf.js`
- [x] TXT export via Blob
- [x] PNG export using `html-to-image`
- [x] Fine-tune multilingual support (including RTL support)

---

### ✅ **Day 6: Testing, Polishing, Extras**

- [x] Cross-browser and mobile testing
- [x] Error handling (invalid URL, no transcript, API failure)
- [x] UI polish (Dark mode, transitions, loading spinners)
- [x] Bonus: Save project locally via `localStorage`

---

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (or React)
- **APIs:** YouTube Transcript API, OpenAI/Gemini, Google Translate (optional)
- **Libraries:** 
  - `markmap-lib` – Mind map rendering
  - `html2pdf.js`, `html-to-image` – Export features

---

## 🌍 Future Scope

- 🧠 AI Chatbot for follow-up QnA
- 🧩 Chrome Extension
- 🧾 Citation/reference generator
- 🔐 User authentication + save history
- 📚 Playlist summarization

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/youtube-summarizer.git
cd youtube-summarizer

# Open index.html (if HTML/JS project)
# or run dev server if using React
npm install
npm run dev
