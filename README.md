# 🚀 OneAtlas AI Engine
> AI-powered application architecture generator that transforms natural language prompts into a validated production-ready AppSpec using a multi-stage LLM pipeline.
Built as part of the **OneAtlas AI Engineer Trial Assignment**.

---

## 🌐 Live Demo

### Frontend
👉 https://oneatlas-ai-engine-frontend.vercel.app/

### Backend API
👉 https://oneatlas-ai-engine.onrender.com
---

## ✨ Features

### 🤖 Multi-LLM AI Pipeline
The application executes a complete AI workflow consisting of:
- Intent Extraction
- Schema Generation
- AppSpec Generation
- Validation Engine
- Repair Engine
- Final Output Generation

---

### ⚡ Multi Provider Gateway
Implemented Providers
- Groq
- OpenAI
- Google Gemini

Provider interfaces are also prepared for:
- Anthropic
- OpenRouter
- DeepSeek
- Google AI
- Mistral

Automatic provider fallback is supported whenever possible.

---

### ✅ Validation Engine
Each pipeline stage is validated before moving to the next stage.
Validation includes:
- Required fields
- JSON validation
- Cross-layer consistency
- Workflow verification
- Integration validation
- AppSpec validation

---

### 🔧 Repair Engine
Automatically repairs invalid AI responses using multiple strategies.
Current repair strategies include:
- Missing Field Repair
- JSON Repair
- Schema Validation Repair
- Consistency Repair

Repair history is stored and displayed in the dashboard.

---

### 📈 Cost Tracking
Every generation tracks:
- Provider
- Model
- Input Tokens
- Output Tokens
- Latency
- Estimated Cost

---

### 📡 Live Pipeline Monitoring
Real-time updates using **Server Sent Events (SSE)**.
Frontend displays:
- Current Stage
- Progress
- Terminal Logs
- Pipeline Status

---

### 🔌 Integration Registry
Supported integrations include:
- Slack
- Gmail
- Stripe
- Google Drive
- Supabase

Each integration defines:
- Triggers
- Actions
- Workflow Templates

---

## 🖥 Dashboard
The frontend provides:
- AI Prompt Input
- Live Pipeline Visualization
- Progress Tracking
- Terminal Logs
- Intent Viewer
- Schema Viewer
- AppSpec Viewer
- Validation Report
- Cost Dashboard
- Repair History
- Copy JSON
- Download JSON

---

# 🏗 System Architecture
```
User Prompt
      │
      ▼
Intent Extraction
      │
      ▼
Schema Generation
      │
      ▼
AppSpec Generation
      │
      ▼
Validation Engine
      │
      ▼
Repair Engine
      │
      ▼
Final Output
      │
      ▼
Frontend Dashboard
```

---

# 🛠 Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Backend
- Node.js
- Express
- TypeScript

## AI Providers
- Groq
- OpenAI
- Google Gemini

## Deployment
- Vercel
- Render

---

# 📂 Project Structure

```
apps
│
├── backend
│   ├── controllers
│   ├── gateway
│   ├── integrations
│   ├── pipeline
│   ├── repair
│   ├── routes
│   ├── validation
│   └── sse
│
└── frontend
    ├── app
    ├── components
    ├── context
    ├── services
    └── lib
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|----------|-------------------------------|----------------------------|
| POST | `/api/v1/generate` | Start generation |
| GET | `/api/v1/jobs/:jobId` | Get job status |
| GET | `/api/v1/events/:jobId` | Live SSE events |
| GET | `/api/v1/costs/:jobId` | Cost summary |
| GET | `/api/v1/evaluation/:jobId` | Evaluation report |
| GET | `/api/v1/integrations` | Supported integrations |
| POST | `/api/v1/repair/:jobId` | Run repair engine |

---

# 🔑 Environment Variables

Backend
```env
OPENAI_API_KEY=

GROQ_API_KEY=

GEMINI_API_KEY=
```

Optional
```env
ANTHROPIC_API_KEY=

OPENROUTER_API_KEY=

DEEPSEEK_API_KEY=

GOOGLE_AI_API_KEY=

MISTRAL_API_KEY=
```

Frontend
```env
NEXT_PUBLIC_API_URL=https://oneatlas-ai-engine.onrender.com/api/v1
```

---

# 🚀 Running Locally

Clone the repository
```bash
git clone https://github.com/ishi141/oneatlas-ai-engine.git
```

Install dependencies
```bash
pnpm install
```

Run Backend
```bash
cd apps/backend
pnpm dev
```

Run Frontend
```bash
cd apps/frontend

pnpm dev
```
---

# 🎯 Design Decisions
- Modular pipeline architecture
- Provider abstraction layer
- Validation after every stage
- Automatic repair before retry
- Real-time progress using SSE
- Independent cost tracking
- Extensible integration registry

---

# 🚧 Current Limitations
- OAuth integrations are mocked
- No persistent database
- Some AI providers are interface-ready but not configured
- Evaluation report export is not implemented

---

# 🔮 Future Improvements
- PostgreSQL persistence
- Redis job queue
- Docker support
- Authentication
- Prompt versioning
- Streaming LLM responses
- PDF export
- Provider benchmarking

---

# 👨‍💻 Author

**Ishika Choubey**
