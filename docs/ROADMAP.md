# Roadmap

This document tracks the current state of Deutschland Policy Lab and the planned modules that would extend it into a comprehensive evidence platform for German policymakers and researchers.

> **Status of all items below v1.0:** Speculative. Modules are listed in rough priority order but may be reordered, merged, or dropped based on contributor interest, data availability, and political feasibility of the underlying policy areas.

---

## v0.1 — Current (MVP)

**Status:** Released

- 18 evidence-based policy entries across 10 domains
- Priority scoring model (experimental)
- Domain, evidence, and impact filters
- AI-assisted Q&A (ask questions about the policy database)
- Policy comparison view
- Full falsifiability framework (whatWouldChangeOurMind) for every policy
- Mobile-responsive UI
- MIT licensed, open source

---

## Module A — German Länder Comparison Layer

**What it adds:** A visualisation layer showing which German federal states (Länder) have implemented, piloted, or rejected each policy. Clicking a policy shows a 16-state map with traffic-light indicators.

**Why it matters:** Many policies in this database are formally a Länder competence. Showing variation within Germany is more informative than citing Estonia or Denmark, because it eliminates the "Germany is different" objection.

**Data requirements:** Manual curation of Länder implementation status, with sources. Likely 20–40 hours of research per policy domain.

**Technical approach:** New `data/laender.ts` file mapping policy IDs to Länder status objects. SVG map component in `components/`. No new API routes required.

---

## Module B — Budget Impact Calculator

**What it adds:** An interactive tool that lets users adjust parameters (e.g., "what if only 50 % of businesses adopt the once-only principle in year 1?") and see how the projected fiscal impact changes. Outputs a range, not a point estimate.

**Why it matters:** Policy debates often hinge on cost-benefit claims. Making the assumptions explicit and interactive forces intellectual honesty and lets critics probe the model.

**Data requirements:** Parametric cost models for each policy. Requires economist input.

**Technical approach:** Computation runs client-side (no API required). Results displayed as confidence intervals, not point estimates. All model assumptions shown and documented.

---

## Module C — Coalition Feasibility Scoring

**What it adds:** A structured assessment of how likely each policy is to survive coalition negotiations, based on publicly stated positions of Bundestag parties.

**Why it matters:** A policy with strong evidence but zero political feasibility needs a different intervention strategy than one that is technically complex but politically unopposed.

**Data requirements:** Party programme analysis (requires regular updating after each Bundestagswahl). This is the module most at risk of introducing political bias — the framing must be scrupulously neutral (reporting stated positions, not endorsing them).

**Technical approach:** New `data/coalition.ts` with party-position data and a feasibility scoring function. The scoring must be fully transparent and auditable.

**Non-partisan safeguard:** This module displays party positions as factual statements ("Party X has stated in its 2025 Wahlprogramm that...") and never characterises positions as good or bad.

---

## Module D — Expert Review System (GitHub-based)

**What it adds:** A structured review workflow where domain experts can formally review a policy entry, submit a scored assessment, and have their review displayed alongside the policy.

**Why it matters:** The current data is curated by a small team. Expert review adds credibility, surfaces blind spots, and distributes the epistemic labour.

**Technical approach:** Reviews submitted via GitHub pull requests using a standardised template. Merged reviews stored in `data/reviews/`. A `lib/reviews.ts` module aggregates reviewer consensus. No external authentication system required — GitHub identity serves as the review credential.

---

## Module E — Citation Network Graph

**What it adds:** An interactive graph visualisation showing which sources are cited by which policies, which policies share sources, and which sources are most cited across the database.

**Why it matters:** Reveals when multiple policies rest on a single underlying study (concentration risk) and helps identify the most policy-relevant parts of the evidence base.

**Technical approach:** Build the graph at build time from `data/sources.ts` and `data/policies.ts`. Render using a lightweight graph library (e.g., D3 force layout). No new data collection required.

---

## Module F — Policy Timeline Tracker

**What it adds:** For each policy domain, a timeline showing what Germany has tried historically, when it was tried, what the outcome was, and why it succeeded or failed.

**Why it matters:** Germany has a long institutional memory, but it is not well-organised for policymakers. Knowing that a very similar housing reform was tried in the 1990s and why it stalled is essential context for designing interventions today.

**Data requirements:** Historical policy research. High labour intensity. May require partnerships with academic historians of German economic policy.

**Technical approach:** New `data/timeline.ts`. A `components/timeline.tsx` visualisation component.

---

## Module G — German Localisation (i18n)

**What it adds:** Full German-language version of the application — UI, policy entries, documentation, and AI responses.

**Why it matters:** The primary audience for this tool is German-speaking policymakers, researchers, civil servants, and journalists. An English-only tool limits accessibility.

**Technical approach:** See `docs/I18N.md` for the implementation plan. Uses `next-intl` or `next-i18next`. Translation of policy content requires subject-matter expertise in German policy terminology — machine translation is insufficient.

---

## Module H — Public Consultation Integration

**What it adds:** A structured mechanism for collecting structured public input on policy proposals — not free-text comments, but responses to specific questions derived from the policy's open questions and counterarguments.

**Why it matters:** Evidence-based policymaking benefits from local knowledge that academic research does not capture. Structured consultation avoids the noise of open comment threads.

**Technical approach:** Requires a lightweight backend for storing responses (Vercel KV or similar). Strict moderation to prevent political campaigning. Responses displayed as aggregated data, not individual comments.

---

## Module I — Advanced RAG for AI (replace full-context approach)

**What it adds:** Replace the current approach (entire policy database sent as context with every query) with a retrieval-augmented generation (RAG) system that retrieves only the most relevant policy entries and sources for each question.

**Why it matters:** The current approach works for 18 policies but will hit context limits and latency thresholds as the database grows. RAG also allows the AI to cite specific sources rather than synthesising uncited claims.

**Technical approach:** Embed all policy content offline using the Anthropic Embeddings API. Store embeddings in a vector store (Pinecone, pgvector, or Turso with vector extension). At query time, retrieve top-k relevant chunks, construct a focused context, and call the generation API.

---

## Module J — API for Researchers

**What it adds:** A versioned, documented REST (or GraphQL) API exposing all policy data, scores, and source metadata. Returns JSON. No API key required for read access.

**Why it matters:** Researchers, journalists, and third-party tools should be able to build on this data without scraping the UI. An open API is a public good.

**Technical approach:** New `app/api/v1/` route group. OpenAPI spec generated from TypeScript types. Rate limiting via Vercel middleware. No authentication for read endpoints.

---

## Contributing to the Roadmap

If you want to work on a module, open a GitHub issue with the `[FEATURE]` template (see `.github/ISSUE_TEMPLATE/feature-request.md`) and reference the module letter. Discuss design decisions before writing code for any module larger than Module A or E.
