# Architecture

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 15 (App Router) | Server components, API routes |
| Language | TypeScript 5 (strict mode) | End-to-end type safety |
| Styling | Tailwind CSS 4 | Utility-first, no component library dependency |
| AI | Anthropic Claude (via `@anthropic-ai/sdk`) | Optional — app works in demo mode without an API key |
| Database | None | All policy data is static TypeScript files |
| Deployment | Vercel (recommended) or any Node.js host | `npm run build` produces a standard Next.js output |

No database, no ORM, no authentication layer. The application is deliberately simple: policy data lives in version-controlled TypeScript files, which means every change is auditable and reversible via git.

---

## Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser / Client                         │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP
┌────────────────────────────▼────────────────────────────────────┐
│                       Next.js App Router                        │
│                                                                 │
│  app/                                                           │
│  ├── page.tsx              ← Policy list / homepage             │
│  ├── layout.tsx            ← Root layout, nav                   │
│  └── api/                                                       │
│      └── ask/route.ts      ← AI Q&A endpoint (streaming)        │
│                                                                 │
│  components/                                                    │
│  ├── nav.tsx               ← Site navigation                    │
│  ├── policy-card.tsx       ← Policy summary card                │
│  ├── evidence-badge.tsx    ← Evidence strength indicator        │
│  ├── confidence-bar.tsx    ← Confidence percentage bar          │
│  ├── priority-score.tsx    ← Computed priority display          │
│  └── what-would-change-mind.tsx  ← Falsifiability section       │
└───────────┬───────────────────────────────┬─────────────────────┘
            │                               │
┌───────────▼──────────┐      ┌─────────────▼──────────────────┐
│      lib/            │      │          data/                  │
│                      │      │                                 │
│  policies.ts         │◄─────│  policies.ts   ← 18 policies   │
│  (query helpers)     │      │  sources.ts    ← bibliography  │
│                      │      └─────────────────────────────────┘
│  scoring.ts          │
│  (priority formula)  │      ┌─────────────────────────────────┐
│                      │      │        External                 │
│  ai/                 │─────►│  Anthropic API (claude-*)       │
│  (prompt builder,    │      │  (optional, streaming)          │
│   context assembly)  │      └─────────────────────────────────┘
└──────────────────────┘
```

---

## Data Flow

```
data/policies.ts
  └── exports Policy[] (static, version-controlled)
       │
       ▼
lib/policies.ts
  └── getAllPolicies(), getPolicyById(), filterPolicies(), sortPolicies()
       │
       ├──► app/page.tsx          (renders policy list, filters)
       │
       ├──► app/api/ask/route.ts  (assembles context for AI prompt)
       │         │
       │         ▼
       │    Anthropic API → streaming response → client
       │
       └──► lib/scoring.ts
                └── calculatePriorityScore() → used in sort & display

data/sources.ts
  └── exports Source[] (bibliography)
       └──► referenced by policy.sources[] (IDs, not inline objects)
```

The key principle: **data flows in one direction**. Pages and API routes consume `lib/`, which consumes `data/`. Nothing in `data/` imports from `lib/` or `app/`.

---

## Module Structure

### `data/`

Static data only. No business logic.

- **`policies.ts`** — The canonical list of 18 policy entries. Each policy is a single TypeScript object conforming to the `Policy` interface. This is the file contributors edit to add or update policies.
- **`sources.ts`** — The bibliography. Each source has a unique string ID that is referenced from `policy.sources[]`. This separation keeps policy objects lean and makes it possible to query which policies share a source.

### `lib/`

Pure functions. No React, no Next.js imports.

- **`policies.ts`** — Query helpers: filter by domain, status, evidence strength; sort by priority score, impact, confidence, difficulty.
- **`scoring.ts`** — The priority score formula: `(expectedImpact × evidenceWeight × confidence/100) / implementationDifficulty`, normalised 0–100. Explicitly labelled "Experimental prioritisation model".
- **`ai/`** — Prompt construction and context assembly for the AI ask feature. Builds a context string from all policy data and sends it to the Anthropic API.

### `app/`

Next.js App Router pages and API routes.

- **`page.tsx`** — Homepage: policy list with filters and sort controls.
- **`layout.tsx`** — Root layout including the navigation bar.
- **`api/ask/route.ts`** — Streaming API route for the AI Q&A feature. Receives a question, assembles context from all policies, calls the Anthropic API, and streams the response back to the browser.

### `components/`

Reusable React server and client components. All are presentational — they receive props and render UI; they do not fetch data.

---

## How to Add a New Policy

1. **Open `data/policies.ts`.**

2. **Add a new object** to the `policies` array conforming to the `Policy` interface. Every field is required. Use existing entries as a template.

   Key fields to fill carefully:
   - `id` — kebab-case, unique, permanent (used in URLs and references)
   - `evidenceStrength` — one of `"very-low" | "low" | "medium" | "high"`
   - `expectedImpact` — integer 1–5
   - `implementationDifficulty` — integer 1–5
   - `confidence` — number 0–100, or `"unknown"`
   - `whatWouldChangeOurMind` — all three arrays must be non-empty
   - `sources` — array of source IDs referencing entries in `data/sources.ts`

3. **Add any new sources** to `data/sources.ts`. Use the same `id` string you referenced in the policy's `sources` array.

4. **Run the tests** to verify the new policy passes all validation checks:
   ```bash
   npm test
   ```

5. **Run the linter and TypeScript compiler:**
   ```bash
   npm run lint
   npx tsc --noEmit
   ```

6. **Open a pull request.** The CI pipeline will run lint, type-check, tests, and a production build automatically.

---

## How to Add Future Modules (A–J)

Each roadmap module (see `docs/ROADMAP.md`) should follow this pattern:

1. **New data** goes in `data/<module>.ts` with a well-typed interface exported alongside the data array.

2. **New business logic** goes in `lib/<module>.ts` — pure functions, no framework dependencies.

3. **New pages** go in `app/<module>/page.tsx`. Use the App Router's file-based routing.

4. **New API routes** (if the module requires server-side computation or external API calls) go in `app/api/<module>/route.ts`.

5. **New shared UI** goes in `components/<module-component>.tsx`.

6. **New tests** go in `__tests__/<module>.test.ts`. Run `npm test` to verify.

For modules that require persistent state (Module D: Expert Review, Module H: Public Consultation), consider a lightweight hosted database (e.g., Turso, PlanetScale, or Vercel KV) rather than embedding mutable data in the repo. The `lib/` layer should abstract the data source so pages remain decoupled from storage decisions.

For modules requiring heavy computation (Module B: Budget Calculator, Module E: Citation Network), consider:
- Running the computation at build time and persisting results as JSON in `data/`
- Or exposing a server action / API route that performs computation on demand
