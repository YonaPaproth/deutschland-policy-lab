# Data Architecture — Deutschland Policy Lab

This document describes the full data architecture of DPL, covering three storage layers, the ingestion agent design, source priorities, and the relationship to the BASt reference architecture.

---

## Overview

DPL uses a **three-layer architecture**: raw immutable storage → structured Iceberg tables → semantic vector store. Data flows strictly downward; upper layers never write back to lower ones.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          DATA SOURCES                                   │
│  Destatis Genesis  │  OECD.Stat  │  Bundestag DIP  │  arXiv  │ EUR-Lex │
└──────────┬─────────┴──────┬──────┴────────┬─────────┴────┬────┴────┬───┘
           │                │               │              │         │
           ▼                ▼               ▼              ▼         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    LAYER 1 — RAW STORAGE (S3)                           │
│                                                                         │
│  s3://dpl-data/raw/destatis/YYYY/MM/   (JSON API responses)            │
│  s3://dpl-data/raw/oecd/YYYY/MM/       (SDMX/JSON)                     │
│  s3://dpl-data/raw/bundestag/YYYY/MM/  (JSON DIP API)                  │
│  s3://dpl-data/raw/arxiv/YYYY/MM/      (XML/PDF)                       │
│  s3://dpl-data/raw/eurlex/YYYY/MM/     (HTML/PDF)                      │
│                                                                         │
│  Immutable. Never deleted. Versioned via Iceberg snapshots.             │
└────────────────────────────┬────────────────────────────────────────────┘
                             │  Ingestion Agents (parse + deduplicate)
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│               LAYER 2 — STRUCTURED STORAGE (Apache Iceberg)             │
│                                                                         │
│  documents table     ← text documents (Bundestag, arXiv, EUR-Lex)      │
│  indicators table    ← time series (Destatis, OECD)                    │
│  policy_links table  ← document ↔ policy relevance scores              │
│                                                                         │
│  Query: DuckDB (local dev) / AWS Athena (production)                    │
└──────────┬─────────────────────────────────────────────────────────────┘
           │  Embedding agents (chunk + embed)
           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│               LAYER 3 — VECTOR STORE (Semantic Search)                  │
│                                                                         │
│  Text chunks embedded via OpenAI text-embedding-3-small or Cohere      │
│  Stored in: pgvector (PostgreSQL) — local dev                          │
│             Pinecone — production                                       │
│                                                                         │
│  Powers: /ask endpoint (RAG), Module I (Advanced RAG)                  │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER (Next.js)                         │
│                                                                         │
│  /ask          ← RAG: retrieve relevant chunks → Claude                 │
│  /policies     ← Static TypeScript data (current v0.1)                 │
│  /research     ← Indicator charts from Iceberg/DuckDB                  │
│  /api/v1       ← Module J: Open REST API for researchers               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Layer 1 — Raw Storage (S3)

Identical approach to BASt (Bundesanstalt für Straßenwesen) data lake pattern.

### S3 Paths

| Source | Path | Format |
|--------|------|--------|
| Destatis Genesis | `s3://dpl-data/raw/destatis/YYYY/MM/` | JSON (API response) |
| OECD.Stat | `s3://dpl-data/raw/oecd/YYYY/MM/` | JSON/SDMX |
| Bundestag DIP | `s3://dpl-data/raw/bundestag/YYYY/MM/` | JSON |
| arXiv | `s3://dpl-data/raw/arxiv/YYYY/MM/` | XML metadata + PDF |
| EUR-Lex | `s3://dpl-data/raw/eurlex/YYYY/MM/` | HTML/PDF |

### Rules

- **Never delete** raw files. They are the ground truth.
- Each ingestion run writes to `YYYY/MM/DD/` partition.
- Filenames include content hash: `12411-0001_2024-01-15_a3f2c891.json`
- Iceberg snapshots provide time-travel: you can reproduce any past state.
- Local dev: mirror to `data/raw/<source>/YYYY-MM-DD/` (gitignored).

---

## Layer 2 — Structured Storage (Apache Iceberg on S3)

Same as BASt structured layer. Iceberg tables stored as Parquet in S3, managed via PyIceberg or AWS Glue catalog.

### Schema

#### `documents` table

| Column | Type | Description |
|--------|------|-------------|
| `id` | STRING | UUID, stable across re-ingests |
| `source` | STRING | `"bundestag"`, `"arxiv"`, `"eurlex"` |
| `title` | STRING | Document title |
| `date` | DATE | Publication date |
| `domain` | STRING | Policy domain (e.g., `"housing"`) |
| `url` | STRING | Canonical URL |
| `text_hash` | STRING | SHA-256 of text content (dedup key) |
| `evidence_quality` | INT | 0–5 score (see Quality Scoring below) |
| `ingested_at` | TIMESTAMP | When this row was written |

#### `indicators` table

| Column | Type | Description |
|--------|------|-------------|
| `indicator_id` | STRING | Source table code (e.g., `"12411-0001"`) |
| `source` | STRING | `"destatis"` or `"oecd"` |
| `country` | STRING | ISO 3166-1 alpha-3 (e.g., `"DEU"`) |
| `year` | INT | Reference year |
| `value` | DOUBLE | Numeric value |
| `unit` | STRING | Unit of measurement |
| `ingested_at` | TIMESTAMP | When this row was written |

#### `policy_links` table

| Column | Type | Description |
|--------|------|-------------|
| `document_id` | STRING | FK → `documents.id` |
| `policy_id` | STRING | FK → DPL policy slug |
| `relevance_score` | DOUBLE | 0.0–1.0 cosine similarity |
| `linked_at` | TIMESTAMP | When this link was created |

### Query Engines

| Environment | Engine | Notes |
|-------------|--------|-------|
| Local dev | DuckDB | `pip install duckdb` — reads Parquet directly |
| Production | AWS Athena | Uses Glue catalog, charged per TB scanned |
| CI/testing | DuckDB in-memory | No S3 dependency |

```python
# Local DuckDB example
import duckdb
conn = duckdb.connect()
df = conn.execute("""
    SELECT year, value, unit
    FROM read_parquet('data/indicators/destatis/**/*.parquet')
    WHERE indicator_id = '12411-0001'
    ORDER BY year
""").df()
```

---

## Layer 3 — Vector Store (Semantic Search)

This layer is **new vs. BASt** — BASt has no semantic search requirement because its data is structured time series. DPL needs this because most source material is unstructured text.

### Design

```
documents.text
    │
    ▼ chunking (512 tokens, 64 token overlap)
    │
    ▼ embedding (OpenAI text-embedding-3-small or Cohere embed-multilingual-v3.0)
    │
    ▼ vector store (pgvector / Pinecone)
         │
         ▼ at query time: retrieve top-k chunks → assemble context → Claude
```

### Embedding Models

| Model | Dimensions | Multilingual | Cost |
|-------|-----------|--------------|------|
| `text-embedding-3-small` | 1536 | No (EN bias) | ~$0.02/1M tokens |
| `cohere-embed-multilingual-v3.0` | 1024 | Yes (DE+EN) | ~$0.10/1M tokens |

**Recommendation:** Use Cohere for German-language documents (Destatis, Bundestag), OpenAI for English (arXiv, OECD).

### Storage Options

| Option | Best for | Notes |
|--------|----------|-------|
| pgvector | Local dev, small scale | Free, PostgreSQL extension |
| Pinecone | Production | Managed, scales automatically |
| Turso + vector | Edge deployment | SQLite-based, Vercel-compatible |

### RAG Pipeline (Module I)

```
User question
    │
    ▼ embed question
    │
    ▼ vector search → top-5 relevant chunks
    │
    ▼ + relevant indicators from Iceberg
    │
    ▼ assemble context (~4k tokens)
    │
    ▼ Claude claude-3-5-sonnet → streaming response
```

Current v0.1 approach: dumps all 18 policies as context (~8k tokens). This works now but will break at 100+ policies. Module I replaces this.

---

## Ingestion Agent Architecture

Each data source is implemented as a Python class inheriting from `BaseFetcher`.

### Agent Lifecycle

```
Daily cron (GitHub Actions / AWS EventBridge)
    │
    ├── DestatisFetcher.run()
    │       fetch() → raw API response
    │       store_raw() → data/raw/destatis/YYYY-MM-DD/
    │       parse() → list[dict]
    │       extract_metadata() → evidence_quality score
    │       to_parquet() → data/indicators/destatis/YYYY-MM-DD/
    │
    ├── OECDFetcher.run()       (parallel)
    ├── BundestagFetcher.run()  (parallel)
    ├── ArxivFetcher.run()      (parallel)
    └── EurlexFetcher.run()     (parallel)
              │
              ▼ (after all fetchers complete)
    EmbeddingAgent.run()
              │
              ▼
    PolicyLinker.run()
```

### Agent Swarm

For parallel ingestion, agents are run as concurrent tasks:

```python
import asyncio

async def run_pipeline():
    fetchers = [DestatisFetcher(), OECDFetcher(), BundestagFetcher()]
    await asyncio.gather(*[f.run_async() for f in fetchers])
```

### Quality Scoring

Each document receives an `evidence_quality` score (0–5):

| Score | Source type | Rationale |
|-------|-------------|-----------|
| 5 | Destatis Genesis, Eurostat | Official government statistics. Primary data. |
| 4 | OECD.Stat, IMF | Authoritative international bodies |
| 3 | Bundestag DIP, EUR-Lex | Legislative documents — high reliability, potential political framing |
| 2 | arXiv preprints | Peer review pending; methodology visible |
| 1 | News, press releases | Secondary sources, potential bias |
| 0 | Unknown / unverifiable | Should not reach production |

---

## Source Priority (Phase 1)

| Priority | Source | API | Coverage |
|----------|--------|-----|----------|
| 1 | Destatis Genesis | REST (GAST access) | German statistics — population, GDP, housing, CPI |
| 2 | OECD.Stat | SDMX REST | International comparisons for Germany |
| 3 | Bundestag DIP | REST (API key) | German legislation, Drucksachen, debates |
| 4 | arXiv | OAI-PMH + REST | Academic papers (econ.GN, econ.PC) |
| 5 | EUR-Lex | REST + SPARQL | EU legislation affecting Germany |

---

## Comparison with BASt Architecture

| Dimension | BASt | DPL |
|-----------|------|-----|
| Primary data type | Structured (accident numbers, traffic counts) | Unstructured (text) + Structured (indicators) |
| Input format | CSV, Excel | PDF, HTML → text extraction; JSON APIs for indicators |
| Output format | Parquet (Iceberg) | Parquet (Iceberg) + vector embeddings |
| Query paradigm | Time series analytics (SQL) | Semantic search (RAG) + SQL for indicators |
| Extra storage layer | None | Vector store (pgvector / Pinecone) |
| Primary language | German | German + English (multilingual embeddings) |
| Deduplication | Row hash on numeric data | Content hash on document text |
| AI usage | None | Claude for /ask endpoint (RAG) |

Both architectures share: S3 raw layer, Iceberg structured layer, DuckDB for local queries, daily cron ingestion, content-hash deduplication.

---

## Module Descriptions (Roadmap A–J)

Each roadmap module maps to specific architectural components:

### Module A — German Länder Comparison Layer
- **Data:** `data/laender.ts` — policy ID → 16-state status map
- **Layer:** Static TypeScript (no ingestion pipeline needed)
- **New component:** `components/laender-map.tsx` (SVG choropleth)

### Module B — Budget Impact Calculator
- **Data:** Parametric cost models per policy (economist-authored)
- **Layer:** Client-side computation (no new API route)
- **New component:** `components/budget-calculator.tsx`

### Module C — Coalition Feasibility Scoring
- **Data:** `data/coalition.ts` — party position statements (updated post-Bundestagswahl)
- **Layer:** Static + scoring function in `lib/coalition.ts`
- **Non-partisan safeguard:** Displays factual statements only, no endorsements

### Module D — Expert Review System
- **Data:** `data/reviews/` — structured review files submitted via PR
- **Layer:** Static (GitHub-native workflow)
- **New lib:** `lib/reviews.ts` — aggregate reviewer consensus

### Module E — Citation Network Graph
- **Data:** Built from existing `data/sources.ts` + `data/policies.ts`
- **Layer:** Build-time graph computation → JSON in `data/`
- **New component:** `components/citation-graph.tsx` (D3 force layout)

### Module F — Policy Timeline Tracker
- **Data:** `data/timeline.ts` — historical policy attempts by domain
- **Layer:** Static (requires historian research input)
- **New component:** `components/timeline.tsx`

### Module G — German Localisation (i18n)
- **Data:** Translation strings in `messages/de.json`, `messages/en.json`
- **Layer:** `next-intl` middleware, no new data pipeline
- **Constraint:** Policy content must be translated by domain experts, not machine translation

### Module H — Public Consultation Integration
- **Data:** Structured responses in Vercel KV or PostgreSQL
- **Layer:** Requires persistent backend (first module to need a DB)
- **New API:** `app/api/consultation/route.ts`

### Module I — Advanced RAG (replaces full-context approach)
- **Data:** Vector embeddings from all documents in Layer 2
- **Layer:** Vector store (Layer 3) — this is the primary motivation for Layer 3
- **New lib:** `lib/ai/retrieval.ts` — top-k chunk retrieval before generation
- **Impact:** Enables scaling to 1000+ policies without hitting context limits

### Module J — API for Researchers
- **Data:** Exposes all Iceberg tables + policy data as JSON
- **Layer:** `app/api/v1/` route group with OpenAPI spec
- **Access:** Read-only, no API key, rate-limited via middleware

---

## Local Development Setup

```bash
# Install Python ingestion dependencies
pip install requests pandas pyarrow duckdb

# Fetch indicators (writes to data/indicators/)
python scripts/ingest/destatis_fetcher.py --fetch all
python scripts/ingest/oecd_fetcher.py --fetch all

# Query locally with DuckDB
python -c "
import duckdb
df = duckdb.query(\"SELECT * FROM read_parquet('data/indicators/**/*.parquet')\").df()
print(df.head(20))
"

# Run full pipeline
python scripts/ingest/run_pipeline.py
```

## File Structure (ingestion layer)

```
scripts/
└── ingest/
    ├── __init__.py
    ├── base_fetcher.py      ← ABC for all ingestion agents
    ├── destatis_fetcher.py  ← Destatis Genesis API (statistics)
    ├── oecd_fetcher.py      ← OECD SDMX API (international comparisons)
    ├── bundestag_fetcher.py ← Bundestag DIP API (legislation) [Phase 2]
    ├── arxiv_fetcher.py     ← arXiv OAI-PMH [Phase 2]
    └── run_pipeline.py      ← Master runner

data/
├── raw/                     ← Layer 1: immutable raw files (gitignored)
│   ├── destatis/YYYY-MM-DD/
│   ├── oecd/YYYY-MM-DD/
│   └── bundestag/YYYY-MM-DD/
└── indicators/              ← Layer 2: structured Parquet (gitignored)
    ├── destatis/YYYY-MM-DD/
    └── oecd/YYYY-MM-DD/
```

---

## Application Architecture (v0.1 — unchanged)

The Next.js application layer remains as described in the original architecture. The ingestion pipeline is a separate Python layer that eventually feeds the application via:

1. **Indicators:** DuckDB queries at build time → JSON files in `data/`
2. **Documents:** Vector store → retrieved at request time by `/ask` endpoint

```
data/policies.ts  (static, hand-curated)
    └──► lib/policies.ts → app pages (current approach, v0.1)

data/indicators/  (auto-ingested Parquet)
    └──► DuckDB at build time → JSON → charts (Module A-B era)

Vector store      (auto-embedded documents)
    └──► /api/ask/route.ts → RAG → Claude (Module I)
```

The separation is intentional: the application never directly calls external APIs. Ingestion is a background batch process; the app consumes its outputs.
