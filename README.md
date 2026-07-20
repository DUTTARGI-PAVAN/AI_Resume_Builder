# 🤖 AI Resume Builder

An intelligent, full-stack resume builder powered by **Google Gemini** and **LangChain** — featuring an AI interview agent, ATS scoring, STAR-method bullet generation, and version history.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📝 Resume CRUD | Create, edit, and delete resumes with multiple sections |
| 📄 PDF Upload & Parsing | Upload an existing resume — AI extracts structured data |
| 🎨 5 Professional Templates | Classic, Modern, Creative, Minimal, Executive |
| 🤖 AI Interview Agent | Real AI agent using LangChain function calling — autonomously updates resume sections |
| ⭐ STAR Bullet Generator | Transforms raw experience into optimized bullet points |
| 📊 ATS Scoring (10 Metrics) | Hybrid algorithmic + AI scoring against job descriptions |
| 🔍 Resume Review | Comprehensive feedback from an AI career counselor |
| 🕐 Version History | Save, restore, and compare resume snapshots |
| 🔐 Google OAuth + JWT | Secure authentication |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — UI framework
- **Vite** — Build tool
- **React Router** — Client-side routing

### Backend
- **Node.js + Express** — REST API server
- **MongoDB + Mongoose** — Database and ODM
- **JWT** — Authentication tokens
- **Multer** — PDF file upload handling
- **pdfjs-dist** — PDF text extraction

### AI / ML
- **Google Gemini (gemini-2.5-flash)** — Core AI model for all generative features
- **LangChain JS** — Agent framework for the AI interview agent
- **LangGraph** — ReAct agent loop execution

---

## 📁 Project Structure

```
AI_Resume_Builder/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Route-level pages
│   │   └── ...
│   ├── .env                    # Frontend environment variables
│   └── package.json
│
└── server/                     # Express backend
    ├── src/
    │   ├── config/
    │   │   ├── gemini.config.js    # Gemini API setup
    │   │   └── agent.tools.js      # LangChain tool definitions
    │   ├── constants/
    │   │   └── prompts.js          # All AI prompt templates
    │   ├── controllers/
    │   │   ├── resume.controller.js
    │   │   ├── ai.controller.js
    │   │   └── version.controller.js
    │   ├── middleware/
    │   │   ├── auth.middleware.js   # JWT verification
    │   │   └── upload.middleware.js # Multer PDF upload
    │   ├── models/
    │   │   ├── Resume.model.js
    │   │   ├── ChatHistory.model.js
    │   │   └── ResumeVersion.model.js
    │   ├── routes/
    │   │   ├── resume.routes.js
    │   │   ├── ai.routes.js
    │   │   ├── version.routes.js
    │   │   └── index.js
    │   ├── services/
    │   │   ├── resume.service.js
    │   │   ├── ai.service.js
    │   │   └── agent.service.js    # LangChain ReAct agent
    │   └── utils/
    │       ├── resumeParser.js     # pdfjs-dist text extraction
    │       ├── keywordAnalyzer.js  # ATS keyword matching
    │       ├── formatChecker.js    # Action verb & format checks
    │       └── scoreCalculator.js  # Weighted ATS score
    ├── .env                        # Backend environment variables
    └── package.json
```

---

## ⚙️ Prerequisites

- **Node.js** v18+
- **MongoDB Atlas** account (free tier works)
- **Google Gemini API key** — [aistudio.google.com](https://aistudio.google.com)
- **Google OAuth Client ID** — [console.cloud.google.com](https://console.cloud.google.com)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Install dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 3. Configure environment variables

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/ai-resume-builder
JWT_SECRET=your_long_random_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

### 4. Run the development servers

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🔌 API Endpoints

### Resumes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/resumes` | Create a new resume |
| `GET` | `/api/resumes` | Get all resumes for logged-in user |
| `GET` | `/api/resumes/:id` | Get a specific resume |
| `PUT` | `/api/resumes/:id` | Update full resume |
| `PUT` | `/api/resumes/:id/sections/:section` | Update a specific section |
| `PUT` | `/api/resumes/:id/template` | Change resume template |
| `DELETE` | `/api/resumes/:id` | Delete a resume |
| `POST` | `/api/resumes/upload` | Upload and parse a PDF resume |

### AI

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ai/chat` | Chat with the AI interview agent |
| `GET` | `/api/ai/chat-history/:resumeId` | Get conversation history |
| `POST` | `/api/ai/bullets` | Generate STAR-method bullet points |
| `POST` | `/api/ai/summary` | Generate a professional summary |
| `POST` | `/api/ai/ats-score` | Score resume against a job description |
| `POST` | `/api/ai/review` | Get comprehensive resume review |
| `POST` | `/api/ai/match-job` | Match resume to job description |
| `POST` | `/api/ai/skill-gaps` | Detect skill gaps vs job description |

### Versions

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/resumes/:resumeId/versions` | Save a resume snapshot |
| `GET` | `/api/resumes/:resumeId/versions` | List all versions |
| `GET` | `/api/resumes/:resumeId/versions/:versionId` | Get a specific version |
| `POST` | `/api/resumes/:resumeId/versions/:versionId/restore` | Restore a version |
| `DELETE` | `/api/resumes/:resumeId/versions/:versionId` | Delete a version |

---

## 🧠 AI Architecture

The project uses **two AI patterns** side by side:

### Direct Prompting (Gemini)
Used for: Bullet Writer, Summary Writer, ATS Scorer, Resume Reviewer

```
User request → Prompt template → Gemini → Parse JSON → Response
```

### Agentic Loop (LangChain ReAct)
Used for: AI Interview Agent

```
User message → LangChain Agent → Decide which tool to call
                               → Execute tool (update resume section, generate bullets...)
                               → Observe result → Continue or respond
```

The agent has 4 tools available:
- `update_resume_section` — Updates any section of the resume
- `generate_bullet_points` — Writes STAR-method bullets
- `get_ats_score` — Checks ATS compatibility
- `get_resume_summary` — Reads the current resume state

---

## 📊 ATS Scoring Metrics

The ATS score is a weighted average of 10 metrics:

| Metric | Weight |
|---|---|
| Keyword Match | 20% |
| Bullet Quality | 15% |
| Formatting | 10% |
| Section Completeness | 10% |
| Summary Strength | 10% |
| Skill Coverage | 10% |
| Quantification | 10% |
| Action Verbs | 5% |
| Resume Length | 5% |
| Contact Info | 5% |

Scores are computed using a **hybrid approach** — algorithmic analysis first, then Gemini AI evaluation — and the two are averaged for each metric.

---

## 🔐 Authentication Flow

1. User clicks **"Sign in with Google"**
2. Google OAuth returns an ID token
3. Backend verifies the token with Google, finds or creates the user in MongoDB
4. Backend returns a signed JWT
5. All subsequent requests include the JWT in the `Authorization: Bearer <token>` header

## 🙏 Acknowledgements

- [Google Gemini](https://aistudio.google.com) — AI model
- [LangChain JS](https://js.langchain.com) — Agent framework
- [MongoDB Atlas](https://www.mongodb.com/atlas) — Cloud database
- [pdfjs-dist](https://github.com/mozilla/pdf.js) — PDF text extraction