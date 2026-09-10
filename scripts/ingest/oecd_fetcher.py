#!/usr/bin/env python3
"""
OECD SDMX REST API Fetcher — DPL Data Ingestion Pipeline

Fetches German economic indicators from the OECD Stats (SDMX) API.
No API key required — public access.

API docs: https://sdmx.oecd.org/public/rest/

Usage:
    python oecd_fetcher.py --dry-run
    python oecd_fetcher.py --fetch all
    python oecd_fetcher.py --fetch GDP
"""

import argparse
import json
import sys
import time
from datetime import datetime
from pathlib import Path

import requests
import pandas as pd

try:
    import pyarrow  # noqa: F401
    PARQUET_AVAILABLE = True
except ImportError:
    PARQUET_AVAILABLE = False

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

BASE_URL = "https://sdmx.oecd.org/public/rest/data"

# OECD SDMX dataset paths for German indicators
DATASETS = {
    "GDP": {
        "path": "OECD.ECO.MPD,DSD_KEI@DF_KEI,4.0/DEU.GDP.A",
        "name": "German GDP (OECD Key Economic Indicators)",
        "domain": "economy",
        "unit": "USD million",
    },
    "UNEMPLOYMENT": {
        "path": "OECD.ELS.SAE,DSD_LFS@DF_LFS_INDIC,1.0/DEU.UNE_RATE.Y15T74.T.",
        "name": "German Unemployment Rate (OECD Labour Force Statistics)",
        "domain": "labour",
        "unit": "% of labour force",
    },
}

OECD_PARAMS = {
    "startPeriod": "2015",
    "endPeriod": "2024",
    "format": "jsondata",
    "dimensionAtObservation": "AllDimensions",
}


# ---------------------------------------------------------------------------
# Fetcher class
# ---------------------------------------------------------------------------

class OECDFetcher:
    """Ingestion agent for the OECD SDMX REST API."""

    source_id = "oecd"

    def __init__(self, session: requests.Session | None = None):
        self.session = session or requests.Session()
        self.session.headers.update({
            "Accept": "application/vnd.sdmx.data+json;version=1.0",
        })

    # ------------------------------------------------------------------
    # Fetch
    # ------------------------------------------------------------------

    def fetch_dataset(self, dataset_key: str) -> dict:
        """Fetch a single OECD dataset via SDMX REST API."""
        ds = DATASETS[dataset_key]
        url = f"{BASE_URL}/{ds['path']}"

        print(f"  → GET {url}")
        resp = self.session.get(url, params=OECD_PARAMS, timeout=60)
        resp.raise_for_status()
        return resp.json()

    # ------------------------------------------------------------------
    # Parse
    # ------------------------------------------------------------------

    def parse(self, raw: dict, dataset_key: str) -> list[dict]:
        """Parse SDMX JSON response into normalised records.

        SDMX JSON structure:
            data.dataSets[0].observations → { "dim_idx:dim_idx:...": [value, ...] }
            data.structure.dimensions.observation → list of dimension descriptors
        """
        records = []
        ds_info = DATASETS[dataset_key]

        try:
            data_sets = raw.get("data", {}).get("dataSets", [])
            if not data_sets:
                return records

            observations = data_sets[0].get("observations", {})
            structure = raw.get("data", {}).get("structure", {})
            dimensions = structure.get("dimensions", {}).get("observation", [])

            # Find the TIME_PERIOD dimension index
            time_dim_idx = None
            time_values = []
            for i, dim in enumerate(dimensions):
                if dim.get("id") in ("TIME_PERIOD", "TIME", "YEAR"):
                    time_dim_idx = i
                    time_values = [v.get("id", "") for v in dim.get("values", [])]
                    break

            for obs_key, obs_val in observations.items():
                if not obs_val or obs_val[0] is None:
                    continue

                indices = [int(x) for x in obs_key.split(":")]
                year = None
                if time_dim_idx is not None and time_dim_idx < len(indices):
                    t_idx = indices[time_dim_idx]
                    if t_idx < len(time_values):
                        year = time_values[t_idx]
                        # Strip sub-annual suffix (e.g. "2020-Q1" → "2020")
                        year = year.split("-")[0]

                if year is None:
                    continue

                try:
                    value = float(obs_val[0])
                except (TypeError, ValueError):
                    continue

                records.append({
                    "date": year,
                    "indicator_id": dataset_key,
                    "indicator_name": ds_info["name"],
                    "value": value,
                    "unit": ds_info.get("unit", ""),
                    "source": "oecd",
                })

        except Exception as e:
            print(f"    WARN: parse error for {dataset_key}: {e}")

        # Deduplicate by year (take first occurrence)
        seen_years: set[str] = set()
        deduped = []
        for r in sorted(records, key=lambda x: x["date"]):
            if r["date"] not in seen_years:
                seen_years.add(r["date"])
                deduped.append(r)

        return deduped

    # ------------------------------------------------------------------
    # Store
    # ------------------------------------------------------------------

    def store_raw(self, data: dict, dataset_key: str) -> Path:
        """Store raw SDMX JSON response."""
        today = datetime.now().strftime("%Y-%m-%d")
        filename = f"oecd_{dataset_key.lower()}_{today}.json"
        path = Path(f"data/raw/{self.source_id}/{today}/{filename}")
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
        print(f"    Saved raw → {path}")
        return path

    def save_parquet(self, records: list[dict], dataset_key: str) -> Path | None:
        """Save parsed records as Parquet."""
        if not records:
            return None

        today = datetime.now().strftime("%Y-%m-%d")
        out_dir = Path(f"data/indicators/{self.source_id}/{today}")
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / f"{dataset_key.lower()}.parquet"

        df = pd.DataFrame(records)

        if PARQUET_AVAILABLE:
            df.to_parquet(out_path, index=False)
            print(f"    Saved Parquet → {out_path} ({len(df)} rows)")
        else:
            csv_path = out_path.with_suffix(".csv")
            df.to_csv(csv_path, index=False)
            print(f"    Saved CSV → {csv_path} ({len(df)} rows)")
            return csv_path

        return out_path

    # ------------------------------------------------------------------
    # Mock data
    # ------------------------------------------------------------------

    def _generate_mock(self, dataset_key: str) -> list[dict]:
        """Realistic mock data when API is unavailable."""
        import random
        random.seed(hash(dataset_key) % 2**32)

        ds_info = DATASETS[dataset_key]

        mock_bases = {
            "GDP": (3_850_000, 50_000),        # USD million
            "UNEMPLOYMENT": (5.5, 0.5),         # %
        }

        base, variance = mock_bases.get(dataset_key, (100, 5))
        records = []
        value = base
        for year in range(2015, 2025):
            value += random.uniform(-variance, variance)
            records.append({
                "date": str(year),
                "indicator_id": dataset_key,
                "indicator_name": f"[MOCK] {ds_info['name']}",
                "value": round(value, 3),
                "unit": ds_info.get("unit", ""),
                "source": "oecd_mock",
            })
        return records

    # ------------------------------------------------------------------
    # Run
    # ------------------------------------------------------------------

    def run(self, dataset_keys: list[str] | None = None) -> pd.DataFrame:
        """Fetch all (or selected) OECD datasets."""
        if dataset_keys is None:
            dataset_keys = list(DATASETS.keys())

        all_records: list[dict] = []

        for key in dataset_keys:
            ds_info = DATASETS[key]
            print(f"\n[OECD:{key}] {ds_info['name']}")

            try:
                raw = self.fetch_dataset(key)
                self.store_raw(raw, key)
                records = self.parse(raw, key)

                if records:
                    print(f"    Parsed {len(records)} rows ({records[0]['date']}–{records[-1]['date']})")
                    self.save_parquet(records, key)
                    all_records.extend(records)
                else:
                    print(f"    WARN: no rows parsed — using mock data")
                    mock = self._generate_mock(key)
                    self.save_parquet(mock, key)
                    all_records.extend(mock)

                time.sleep(1)

            except requests.exceptions.HTTPError as e:
                print(f"    ERROR HTTP {e.response.status_code}: {e}")
                mock = self._generate_mock(key)
                print(f"    Falling back to mock data ({len(mock)} rows)")
                self.save_parquet(mock, key)
                all_records.extend(mock)

            except requests.exceptions.RequestException as e:
                print(f"    ERROR network: {e}")
                mock = self._generate_mock(key)
                print(f"    Falling back to mock data ({len(mock)} rows)")
                self.save_parquet(mock, key)
                all_records.extend(mock)

        if all_records:
            df = pd.DataFrame(all_records)
            today = datetime.now().strftime("%Y-%m-%d")
            combined_path = Path(f"data/indicators/{self.source_id}/{today}/indicators.parquet")
            if PARQUET_AVAILABLE:
                df.to_parquet(combined_path, index=False)
            else:
                df.to_csv(combined_path.with_suffix(".csv"), index=False)
            print(f"\nCombined output: {combined_path} ({len(df)} total rows)")
            return df

        return pd.DataFrame()


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="OECD SDMX API fetcher for DPL",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--dry-run", action="store_true")
    group.add_argument("--fetch", metavar="DATASET_KEY|all")
    args = parser.parse_args()

    if args.dry_run:
        print("DRY RUN — OECD SDMX API Fetcher")
        print(f"Base URL: {BASE_URL}")
        print(f"\nWould fetch {len(DATASETS)} datasets:\n")
        for key, ds in DATASETS.items():
            print(f"  [{key}] {ds['name']}")
            print(f"         path:   {ds['path']}")
            print(f"         domain: {ds['domain']}")
            print()
        return

    fetcher = OECDFetcher()

    if args.fetch == "all" or args.fetch is None:
        print("OECD SDMX API Fetcher — DPL")
        df = fetcher.run()
    elif args.fetch.upper() in DATASETS:
        df = fetcher.run([args.fetch.upper()])
    else:
        print(f"ERROR: Unknown dataset '{args.fetch}'. Available: {', '.join(DATASETS.keys())}")
        sys.exit(1)

    if not df.empty:
        print("\n--- Summary ---")
        print(f"Total rows: {len(df)}")
        mock_count = df["source"].str.contains("mock").sum()
        if mock_count:
            print(f"NOTE: {mock_count} rows are MOCK DATA")


if __name__ == "__main__":
    main()
