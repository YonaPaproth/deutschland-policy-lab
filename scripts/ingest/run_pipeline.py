#!/usr/bin/env python3
"""
DPL Master Ingestion Pipeline Runner

Runs all configured ingestion agents sequentially.
Failures in one agent do not stop others.

Usage:
    cd /path/to/deutschland-policy-lab
    python scripts/ingest/run_pipeline.py
"""

import sys
import time
from pathlib import Path

# Allow running from repo root or scripts/ingest/
sys.path.insert(0, str(Path(__file__).parent))

from destatis_fetcher import DestatisFetcher
from oecd_fetcher import OECDFetcher


def run_all():
    fetchers = [DestatisFetcher(), OECDFetcher()]
    results = {}
    start = time.time()

    print("=" * 60)
    print("DPL Ingestion Pipeline")
    print(f"Started: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    for fetcher in fetchers:
        source = fetcher.source_id
        print(f"\n{'─' * 40}")
        print(f"Running: {source}")
        print(f"{'─' * 40}")
        t0 = time.time()
        try:
            df = fetcher.run()
            elapsed = time.time() - t0
            results[source] = {
                "status": "ok",
                "rows": len(df) if df is not None and not df.empty else 0,
                "elapsed": elapsed,
            }
            print(f"\n✓ {source} complete ({elapsed:.1f}s, {results[source]['rows']} rows)")
        except Exception as e:
            elapsed = time.time() - t0
            results[source] = {"status": "error", "error": str(e), "elapsed": elapsed}
            print(f"\n✗ {source} FAILED: {e}")

    total = time.time() - start
    print(f"\n{'=' * 60}")
    print("Pipeline complete")
    print(f"Total time: {total:.1f}s")
    print()
    for source, r in results.items():
        status = "✓" if r["status"] == "ok" else "✗"
        detail = f"{r.get('rows', 0)} rows" if r["status"] == "ok" else r.get("error", "unknown")
        print(f"  {status} {source:15} {detail}")
    print()


if __name__ == "__main__":
    run_all()
