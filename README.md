# Deutschland Policy Lab

**An open, non-partisan evidence platform for German policymaking.**

> "The goal is not to automate democracy. The goal is to make the empirical part of policymaking much better."

---

## What It Is

Deutschland Policy Lab is a structured, open-source database of evidence-based policy proposals for Germany. Each entry documents a specific problem, a proposed intervention, the strength of the evidence behind it, international comparisons, counterarguments, and — critically — the conditions under which the recommendation should be updated or abandoned.

The platform is built for:

- **Policymakers and their staff** who want a rapid, honest overview of the evidence landscape for a given domain
- **Researchers and analysts** who want to contribute to or critique the evidence base
- **Journalists** covering German economic and social policy
- **Citizens** who want to engage with policy ideas at a level beyond party slogans

The AI assistant can answer questions about the policy database in natural language. It has access to the full database of 18 policies (v0.1) and their sources.

---

## What It Is NOT

- **Not affiliated with any political party.** No party has endorsed, funded, or contributed to this project. Policy entries evaluate evidence, not parties.
- **Not an AI policy generator.** The AI assistant can only answer questions about policies that already exist in the database. It cannot generate new policy recommendations.
- **Not official government data.** This is an independent research project. Data is illustrative and may contain errors. Do not cite this project as a government or official source.
- **Not a finished product.** This is an early-stage, experimental platform. All data should be treated as preliminary.

---

## Project Status

**Experimental / early-stage.** All policy data is illustrative and based on publicly available research as of the last review date shown on each entry. The priority scoring model is explicitly labelled "Experimental prioritisation model — not a policy recommendation." Do not use this data for formal policy decisions without independent verification.

Current version: **v0.1** — 18 policies, 10 domains, AI Q&A, basic comparison.

See `docs/ROADMAP.md` for planned future modules.

---

## Tech Stack

- **Next.js 15** (App Router) — framework
- **TypeScript** (strict mode) — end-to-end type safety
- **Tailwind CSS 4** — styling
- **Anthropic Claude** (optional) — AI assistant
- **No database** — all policy data is version-controlled TypeScript

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/your-org/deutschland-policy-lab.git
cd deutschland-policy-lab
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app works fully in demo mode without an Anthropic API key. The AI assistant will be unavailable, but all policy data, filters, and comparisons are accessible.

### Enabling the AI Assistant

Copy the example environment file and add your Anthropic API key:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get a key at [console.anthropic.com](https://console.anthropic.com).

### Running Tests

```bash
npm test
```

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

---

## How to Add a Policy

1. Open `data/policies.ts` and add a new entry to the `policies` array, following the `Policy` interface.
2. Add any new sources to `data/sources.ts`.
3. Run `npm test` to verify the new entry passes all validation checks.
4. Open a pull request.

See `CONTRIBUTING.md` for detailed instructions, including how to propose a policy via a GitHub issue before writing code.

---

## Contributing

Contributions are welcome — especially:

- New evidence contributions to existing policies
- New policy proposals
- Corrections to factual errors
- German localisation (see `docs/I18N.md`)
- Implementation of roadmap modules (see `docs/ROADMAP.md`)

Read `CONTRIBUTING.md` before opening a pull request.

---

## Architecture

See `docs/ARCHITECTURE.md` for a full description of the module structure, data flow, and component diagram.

---

## Research Principles

This project is governed by ten research principles covering evidence standards, uncertainty quantification, falsifiability, and political neutrality. See `docs/RESEARCH_PRINCIPLES.md`.

---

## License

MIT License. See `LICENSE`.

Copyright 2026 Deutschland Policy Lab Contributors.
