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

1. **Streaming chat** – Switch `/chat` fetch to an event‑stream for token‑by‑token replies.  
2. **Tailwind dark‑mode** – Respect system preference for late‑night founders.  
3. **Real‑time tasks** – Replace polling with WebSocket push from the backend.


