#!/usr/bin/env python3
"""
Eurostat Housing Indicators Fetcher — DPL Data Ingestion Pipeline

Fetches key housing indicators for Germany and comparator countries
from the Eurostat REST API (no API key needed).

Usage:
  python scripts/ingest/eurostat_housing_fetcher.py --dry-run
  python scripts/ingest/eurostat_housing_fetcher.py --fetch all
  python scripts/ingest/eurostat_housing_fetcher.py --fetch housing_cost_overburden
"""

import sys
import json
import argparse
import requests
import pandas as pd
from pathlib import Path
from datetime import datetime

# Countries: Germany + comparators for benchmarking
GEO_CODES = ["DE", "AT", "NL", "SE", "DK", "FR", "FI", "CH"]
GEO_LABELS = {
    "DE": "Germany", "AT": "Austria", "NL": "Netherlands",
    "SE": "Sweden", "DK": "Denmark", "FR": "France",
    "FI": "Finland", "CH": "Switzerland"
}

BASE_URL = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data"

# Indicators to fetch
INDICATORS = {
    "housing_cost_overburden": {
        "dataset": "ilc_lvho07a",
        "description": "Housing cost overburden rate (% households spending >40% income on housing)",
        "params": {"unit": "PC", "rskpovth": "TOTAL", "age": "TOTAL", "sex": "T"},
        "source": "Eurostat (EU-SILC)",
    },
    "house_price_index": {
        "dataset": "prc_hpi_a",
        "description": "House price index (2015=100)",
        "params": {"unit": "INX_A_AVG", "purchase": "TOTAL"},
        "source": "Eurostat",
    },
    "population_in_overcrowded": {
        "dataset": "ilc_lvho05a",
        "description": "Population living in overcrowded dwellings (%)",
        "params": {"hhtyp": "TOTAL", "age": "TOTAL", "sex": "T"},
        "source": "Eurostat (EU-SILC)",
    },
    "housing_deprivation": {
        "dataset": "ilc_mdho06b",
        "description": "Severe housing deprivation rate (%)",
        "params": {"hhtyp": "TOTAL", "age": "TOTAL", "sex": "T"},
        "source": "Eurostat (EU-SILC)",
    },
}


def fetch_eurostat(dataset: str, geo_codes: list[str], params: dict) -> dict:
    """Fetch data from Eurostat API."""
    url = f"{BASE_URL}/{dataset}"
    query = {
        "format": "JSON",
        "lang": "EN",
        **{f"geo": g for g in geo_codes},  # overridden below
        **params,
    }
    # Build proper geo params
    geo_param = "&".join(f"geo={g}" for g in geo_codes)
    other_params = "&".join(f"{k}={v}" for k, v in {**{"format": "JSON", "lang": "EN"}, **params}.items())
    full_url = f"{url}?{other_params}&{geo_param}"

    resp = requests.get(full_url, timeout=30)
    resp.raise_for_status()
    return resp.json()


def parse_eurostat_response(data: dict, indicator_name: str, source: str) -> pd.DataFrame:
    """Parse Eurostat JSON-stat response into clean DataFrame."""
    dims = data["dimension"]
    vals = data.get("value", {})

    if not vals:
        return pd.DataFrame()

    # Get dimension labels and sizes
    geo_labels = dims["geo"]["category"]["label"]
    time_labels = dims["time"]["category"]["label"]
    geo_index = dims["geo"]["category"]["index"]
    time_index = dims["time"]["category"]["index"]

    # Calculate stride for geo and time in flat value array
    # Dims order from 'id' field
    dim_ids = data["id"]
    dim_sizes = [len(dims[d]["category"]["index"]) for d in dim_ids]

    # Build index map
    def flat_index(indices: list[int], sizes: list[int]) -> int:
        idx = 0
        stride = 1
        for i, s in zip(reversed(indices), reversed(sizes)):
            idx += i * stride
            stride *= s
        return idx

    geo_pos = dim_ids.index("geo")
    time_pos = dim_ids.index("time")

    rows = []
    for geo_code, geo_i in geo_index.items():
        for time_val, time_i in time_index.items():
            indices = [0] * len(dim_ids)
            indices[geo_pos] = geo_i
            indices[time_pos] = time_i
            idx = flat_index(indices, dim_sizes)
            value = vals.get(str(idx))
            if value is not None:
                rows.append({
                    "indicator": indicator_name,
                    "country": geo_labels.get(geo_code, geo_code),
                    "country_code": geo_code,
                    "year": int(time_val),
                    "value": float(value),
                    "source": source,
                    "fetched_at": datetime.now().isoformat(),
                })

    return pd.DataFrame(rows)


def run_fetch(indicator_key: str, dry_run: bool = False) -> pd.DataFrame:
    """Fetch and parse one indicator."""
    cfg = INDICATORS[indicator_key]
    print(f"  [{indicator_key}] {cfg['description']}")

    if dry_run:
        print(f"    → Would fetch {cfg['dataset']} for {GEO_CODES}")
        return pd.DataFrame()

    try:
        raw = fetch_eurostat(cfg["dataset"], GEO_CODES, cfg["params"])
        df = parse_eurostat_response(raw, indicator_key, cfg["source"])
        if df.empty:
            print(f"    → No data returned")
        else:
            years = f"{df['year'].min()}–{df['year'].max()}"
            countries = df['country_code'].nunique()
            print(f"    → {len(df)} rows, {countries} countries, {years}")
        return df
    except Exception as e:
        print(f"    → ERROR: {e}")
        return pd.DataFrame()


def save_parquet(df: pd.DataFrame, name: str) -> Path:
    """Save DataFrame as Parquet."""
    today = datetime.now().strftime("%Y-%m-%d")
    out_dir = Path(f"data/indicators/eurostat/{today}")
    out_dir.mkdir(parents=True, exist_ok=True)
    path = out_dir / f"{name}.parquet"
    df.to_parquet(path, index=False)
    return path


def save_raw(data: dict, name: str) -> Path:
    """Save raw JSON response."""
    today = datetime.now().strftime("%Y-%m-%d")
    raw_dir = Path(f"data/raw/eurostat/{today}")
    raw_dir.mkdir(parents=True, exist_ok=True)
    path = raw_dir / f"{name}.json"
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
    return path


def main():
    parser = argparse.ArgumentParser(description="Fetch Eurostat housing indicators")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be fetched")
    parser.add_argument("--fetch", default="all",
                        help="all | housing_cost_overburden | house_price_index | ...")
    args = parser.parse_args()

    targets = list(INDICATORS.keys()) if args.fetch == "all" else [args.fetch]
    invalid = [t for t in targets if t not in INDICATORS]
    if invalid:
        print(f"Unknown indicators: {invalid}")
        print(f"Available: {list(INDICATORS.keys())}")
        sys.exit(1)

    print(f"DPL Eurostat Housing Fetcher")
    print(f"Mode: {'DRY RUN' if args.dry_run else 'LIVE'}")
    print(f"Indicators: {targets}")
    print(f"Countries: {GEO_CODES}")
    print()

    all_dfs = []
    for key in targets:
        df = run_fetch(key, dry_run=args.dry_run)
        if not df.empty:
            all_dfs.append(df)

    if args.dry_run or not all_dfs:
        print("\nDry run complete. No files written.")
        return

    # Save individual files
    combined = pd.concat(all_dfs, ignore_index=True)
    combined_path = save_parquet(combined, "housing_indicators")
    print(f"\nSaved: {combined_path}")
    print(f"Total rows: {len(combined)}")
    print(f"\nSummary by indicator:")
    for ind, grp in combined.groupby("indicator"):
        print(f"  {ind}: {len(grp)} rows, years {grp['year'].min()}–{grp['year'].max()}")

    print(f"\nSummary by country (housing cost overburden, latest year):")
    hco = combined[combined["indicator"] == "housing_cost_overburden"]
    if not hco.empty:
        latest = hco.loc[hco.groupby("country_code")["year"].idxmax()]
        latest = latest.sort_values("value", ascending=False)
        for _, row in latest.iterrows():
            flag = " ← Germany" if row["country_code"] == "DE" else ""
            print(f"  {row['country_code']} {row['country']}: {row['value']:.1f}% ({int(row['year'])}){flag}")


if __name__ == "__main__":
    main()
