# The Skill Gap

> **Bridge the distance between academic knowledge and real-world industry demand.**

🌐 **Live Product**: [https://skillgap-jade.vercel.app](https://skillgap-jade.vercel.app)

---

## 📌 Description

**The Skill Gap** is an intelligent career readiness and curriculum mapping platform designed for students, bootcamp graduates, and transitioning developers. 

While academic coursework and online tutorials often focus on basic syntax and toy algorithms, industry hiring managers look for production reliability, testing, containerization, cloud deployment, and system architecture.

**The Skill Gap** analyzes what a student already knows against modern 2026 tech industry hiring benchmarks or specific posted job descriptions. It:
1. Calculates an authentic **Skill Match Percentage** across core domains (Fundamentals, Frameworks, Cloud & DevOps, Testing & Reliability).
2. Categorizes missing competencies into **Dealbreakers** (resume screen filters), **High Priority** (core day-to-day requirements), and **Competitive Advantages** (top 5% applicant differentiators).
3. Produces a personalized, phased **Step-by-Step Learning Roadmap** tailored to the student's timeline and weekly study hours.
4. Provides actionable **Hands-On Deliverables**, curated learning resources, and technical interview flashcards with model answers.
5. Dynamically tracks progress with celebration milestones, updating the student's **Projected Match Score** as they complete deliverables.

---

## 🚀 Key Features

- **8 Curated Industry Role Benchmarks**: Full-Stack Web Developer, AI & LLM Application Engineer, Frontend Engineer, Cloud & DevOps Engineer, Data Analyst, Cyber Security Analyst, Mobile Developer, and Backend Systems Engineer.
- **Custom Job Description Matcher**: Paste any job description directly from LinkedIn, Indeed, or Handshake to map your profile against exact company requirements.
- **1-Click Test Drive Profiles**: Instantly load realistic learner profiles (CS Sophomore, Frontend Bootcamp Grad, Data Analyst transitioning to AI, Sysadmin transitioning to DevOps).
- **Resume & Coursework Scanner**: Paste resume text or syllabus notes to automatically parse and extract technical skills.
- **Interactive Deep Dive Modal**: Click any gap to learn why recruiters test for it, get a 30-minute starter task, a weekend portfolio project idea, and top technical interview questions.
- **Interactive Milestone Tracker**: Check off milestones to trigger celebratory confetti and observe your projected match score climb towards 100%.
- **Exportable Study Plan**: Download your roadmap as a clean Markdown (`.md`) file or copy the study plan directly to your clipboard.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, Motion, Canvas-Confetti
- **Backend**: Node.js, Express, tsx
- **AI Engine**: Google Gemini (`@google/genai` with `gemini-3.8-flash`) + Deterministic Benchmark Fallback Engine
- **Tooling**: Vite 8

---

## 🏃 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the development server**:
   ```bash
   npm run dev
   ```
3. Open your browser to `http://localhost:3000`.
