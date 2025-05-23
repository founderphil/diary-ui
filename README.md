# Business Diary · Diary‑UI 📒💬  
_The conversational front‑end for a solo‑entrepreneur’s back‑office._

This package is the **Next.js 15 App‑Router** frontend for the Business Diary monorepo.

-------


## 🗺️ Folder tour

```
src/
 ├─ app/                  # App‑Router entrypoints
 │   └─ page.tsx          # Diary chat + task ledger
 ├─ components/
 │   └─ ui/               # shadcn‑ui atoms copied in by CLI
 ├─ lib/
 │   └─ api.ts            # fetch helpers for /chat and /tasks
 └─ styles/
     └─ globals.css       # Tailwind & shadcn layer imports
```



## roadmap milestones

**DONE** 
Milestone 1: Scaffold the monorepo with a Next.js chat UI, Python FastAPI backend, Supabase/pgvector for memory, and a Pub/Sub emulator for messaging.

**DONE** 
Milestone 2: Wire up the chat round-trip so user messages and AI replies are saved (with embeddings) in Postgres/pgvector.

**DONE** 
Milestone 3: Enhance the AI task agent to use OpenAI function-calling to translate diary instructions into TaskCreate JSON, persist tasks in the database, and publish them to the invoicing topic.

**IN PROGRESS**
Milestone 4: Flesh out the Invoicing Agent to generate a real Google Sheets invoice, export it as a PDF to Drive, send it via Gmail, and update the task’s status through running → done/error.

**IN QUEUE**
Milestone 5: Add a front-end dashboard (and in-chat attachments) that surfaces invoice history with live status badges and links to the actual PDF files.

**WILL NOT BE PUBLISHED**
Milestone 6...is private

