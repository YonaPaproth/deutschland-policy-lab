#!/usr/bin/env python3
"""
Destatis Genesis API Fetcher — DPL Data Ingestion Pipeline

Fetches key economic/social indicators from the German Federal Statistical Office
(Statistisches Bundesamt) via the Genesis REST API.

API docs: https://www-genesis.destatis.de/genesis/online/data
Anonymous access: username=GAST, password=GAST

Usage:
    python destatis_fetcher.py --dry-run              # show what would be fetched
    python destatis_fetcher.py --fetch all            # fetch all indicators
    python destatis_fetcher.py --fetch 12411-0001     # fetch specific table
"""

import argparse
import json
import sys
import time
from datetime import datetime
from pathlib import Path

import requests
import pandas as pd

# Try to import pyarrow for Parquet support
try:
    import pyarrow  # noqa: F401
    PARQUET_AVAILABLE = True
except ImportError:
    PARQUET_AVAILABLE = False

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

BASE_URL = "https://www-genesis.destatis.de/genesisWS/rest/2020"
# NOTE: As of 2025, Destatis migrated the Genesis UI to a React SPA.
# The REST API endpoint may require registration at:
#   https://www-genesis.destatis.de/genesis/online
# GAST (guest) access was historically available but may now need an account.
# See also: https://www-genesis.destatis.de/genesis/misc/GENESIS-Webservices_Einfuehrung.pdf
# Fallback: the fetcher generates realistic mock data when API is unavailable.

INDICATORS = {
    "12411-0001": {
        "name": "Bevölkerung (Population by year)",
        "description": "German population figures by year",
        "domain": "demographics",
    },
    "81000-0001": {
        "name": "Bruttoinlandsprodukt (GDP indicators)",
        "description": "German GDP and GNI indicators",
        "domain": "economy",
    },
    "13111-0001": {
        "name": "Baugenehmigungen (Housing construction permits)",
        "description": "Number of housing construction permits issued",
        "domain": "housing",
    },
    "62321-0001": {
        "name": "Verbraucherpreisindex (Consumer Price Index / Inflation)",
        "description": "CPI inflation index for Germany",
        "domain": "economy",
    },
}

DEFAULT_PARAMS = {
    "username": "GAST",
    "password": "GAST",
    "area": "all",
    "compress": "false",
    "transpose": "false",
    "contents": "",
    "startyear": "2015",
    "endyear": "2024",
    "timeslices": "",
    "regionalvariable": "",
    "regionalkey": "",
    "classifyingvariable1": "",
    "classifyingkey1": "",
    "classifyingvariable2": "",
    "classifyingkey2": "",
    "classifyingvariable3": "",
    "classifyingkey3": "",
    "job": "false",
    "stand": "",
    "language": "de",
    "format": "json",
}


# ---------------------------------------------------------------------------
# Fetcher class
# ---------------------------------------------------------------------------

class DestatisFetcher:
    """Ingestion agent for the Destatis Genesis API."""

    source_id = "destatis"

    def __init__(self, session: requests.Session | None = None):
        self.session = session or requests.Session()
        self.session.headers.update({"Accept": "application/json"})

    # ------------------------------------------------------------------
    # Fetch
    # ------------------------------------------------------------------

    def fetch_table(self, table_code: str) -> dict:
        """Fetch a single time series table from the Genesis API.

        Returns the raw API response as a dict.
        Raises requests.RequestException on network errors.
        """
        params = {**DEFAULT_PARAMS, "name": table_code}
        url = f"{BASE_URL}/data/timeseries"

        print(f"  → GET {url}?name={table_code} ...")
        resp = self.session.get(url, params=params, timeout=30)
        resp.raise_for_status()
        return resp.json()

    # ------------------------------------------------------------------
    # Parse
    # ------------------------------------------------------------------

    def parse(self, raw: dict, table_code: str) -> list[dict]:
        """Extract time series rows from a Genesis API response.

        Returns a list of record dicts:
            {date, indicator_id, indicator_name, value, unit, source}
        """
        records = []

        # Genesis API wraps data in raw["Object"]["Content"]["Structure"] or similar.
        # The exact path varies by table; we try multiple known paths.
        try:
            content = raw.get("Object", {})
            structure = content.get("Structure", {})
            data_section = structure.get("Data", [])

            # Some tables use "Timeseries" key
            if not data_section:
                data_section = content.get("Timeseries", [])

            if not data_section:
                # Try flat list under Content
                data_section = content.get("Content", [])

            # Fallback: look for any list in the response
            if not data_section:
                for v in raw.values():
                    if isinstance(v, list) and len(v) > 0:
                        data_section = v
                        break

            indicator_info = INDICATORS.get(table_code, {})
            indicator_name = indicator_info.get("name", table_code)

            for row in data_section:
                if not isinstance(row, dict):
                    continue

                # Genesis uses "Wert" for value and "Jahr" / "Zeit" for year/time
                year = row.get("Jahr") or row.get("Zeit") or row.get("year")
                value_raw = row.get("Wert") or row.get("value") or row.get("Value")
                unit = row.get("Einheit") or row.get("unit") or ""

                if year is None or value_raw is None:
                    continue

                try:
                    value = float(str(value_raw).replace(",", ".").replace(".", "", str(value_raw).count(".") - 1))
                except (ValueError, TypeError):
                    continue

                records.append({
                    "date": str(year),
                    "indicator_id": table_code,
                    "indicator_name": indicator_name,
                    "value": value,
                    "unit": unit,
                    "source": "destatis",
                })

        except Exception as e:
            print(f"    WARN: parse error for {table_code}: {e}")

        return records

    def _parse_genesis_response(self, raw: dict, table_code: str) -> list[dict]:
        """
        Alternative parser that handles the Genesis 'Content' plain-text format.
        Genesis often returns semi-structured data inside a 'Content' string field.
        """
        records = []
        indicator_info = INDICATORS.get(table_code, {})
        indicator_name = indicator_info.get("name", table_code)

        # Try to get the Content string (tab-separated table)
        content_str = None
        if "Object" in raw:
            content_str = raw["Object"].get("Content", "")
        if not content_str and "Content" in raw:
            content_str = raw["Content"]

        if not content_str:
            return records

        lines = content_str.strip().split("\n")
        unit = ""

        for line in lines:
            line = line.strip()
            if not line or line.startswith("#") or line.startswith('"'):
                # Try to find unit in header lines
                if "Einheit" in line or "unit" in line.lower():
                    parts = line.split(";")
                    if len(parts) > 1:
                        unit = parts[-1].strip().strip('"')
                continue

            parts = [p.strip().strip('"') for p in line.split(";")]
            if len(parts) < 2:
                parts = line.split("\t")
            if len(parts) < 2:
                continue

            # First column is usually the year/date
            year_str = parts[0]
            if not year_str.isdigit() or len(year_str) != 4:
                continue

            for val_str in parts[1:]:
                if val_str in ("", ".", "-", "/"):
                    continue
                try:
                    # German number format: 1.234.567,89 → 1234567.89
                    val_clean = val_str.replace(".", "").replace(",", ".")
                    value = float(val_clean)
                    records.append({
                        "date": year_str,
                        "indicator_id": table_code,
                        "indicator_name": indicator_name,
                        "value": value,
                        "unit": unit,
                        "source": "destatis",
                    })
                    break  # take first numeric value per year
                except ValueError:
                    continue

        return records

    # ------------------------------------------------------------------
    # Store
    # ------------------------------------------------------------------

    def store_raw(self, data: dict, table_code: str) -> Path:
        """Store raw API response as JSON."""
        today = datetime.now().strftime("%Y-%m-%d")
        filename = f"{table_code}_{today}.json"
        path = Path(f"data/raw/{self.source_id}/{today}/{filename}")
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
        print(f"    Saved raw → {path}")
        return path

    def save_parquet(self, records: list[dict], table_code: str) -> Path | None:
        """Save parsed records as Parquet."""
        if not records:
            return None

        today = datetime.now().strftime("%Y-%m-%d")
        out_dir = Path(f"data/indicators/{self.source_id}/{today}")
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / f"{table_code}.parquet"

        df = pd.DataFrame(records)

        if PARQUET_AVAILABLE:
            df.to_parquet(out_path, index=False)
            print(f"    Saved Parquet → {out_path} ({len(df)} rows)")
        else:
            # Fallback to CSV if pyarrow not installed
            csv_path = out_path.with_suffix(".csv")
            df.to_csv(csv_path, index=False)
            print(f"    Saved CSV (pyarrow not installed) → {csv_path} ({len(df)} rows)")
            return csv_path

        return out_path

    # ------------------------------------------------------------------
    # Run
    # ------------------------------------------------------------------

    def run(self, table_codes: list[str] | None = None) -> pd.DataFrame:
        """Fetch, parse, store raw, and save Parquet for each table.

        Returns a combined DataFrame of all fetched records.
        """
        if table_codes is None:
            table_codes = list(INDICATORS.keys())

        all_records: list[dict] = []

        for code in table_codes:
            info = INDICATORS.get(code, {})
            print(f"\n[{code}] {info.get('name', code)}")

            try:
                raw = self.fetch_table(code)
                self.store_raw(raw, code)

                # Try structured parser first, then content-string parser
                records = self.parse(raw, code)
                if not records:
                    records = self._parse_genesis_response(raw, code)

                if records:
                    print(f"    Parsed {len(records)} rows ({records[0]['date']}–{records[-1]['date']})")
                    self.save_parquet(records, code)
                    all_records.extend(records)
                else:
                    print(f"    WARN: no rows parsed — check raw file for response structure")
                    # Generate mock data so the pipeline doesn't break downstream
                    mock = self._generate_mock(code)
                    print(f"    Using mock data ({len(mock)} rows)")
                    self.save_parquet(mock, code)
                    all_records.extend(mock)

                time.sleep(1)  # be polite to the API

            except requests.exceptions.HTTPError as e:
                print(f"    ERROR HTTP {e.response.status_code}: {e}")
                mock = self._generate_mock(code)
                print(f"    Falling back to mock data ({len(mock)} rows)")
                self.save_parquet(mock, code)
                all_records.extend(mock)

            except requests.exceptions.RequestException as e:
                print(f"    ERROR network: {e}")
                mock = self._generate_mock(code)
                print(f"    Falling back to mock data ({len(mock)} rows)")
                self.save_parquet(mock, code)
                all_records.extend(mock)

        if all_records:
            df = pd.DataFrame(all_records)
            # Save combined file
            today = datetime.now().strftime("%Y-%m-%d")
            combined_path = Path(f"data/indicators/{self.source_id}/{today}/indicators.parquet")
            if PARQUET_AVAILABLE:
                df.to_parquet(combined_path, index=False)
            else:
                df.to_csv(combined_path.with_suffix(".csv"), index=False)
            print(f"\nCombined output: {combined_path} ({len(df)} total rows)")
            return df

        return pd.DataFrame()

    def _generate_mock(self, table_code: str) -> list[dict]:
        """Generate realistic mock data when API is unavailable."""
        import random
        random.seed(hash(table_code) % 2**32)

        info = INDICATORS.get(table_code, {})
        name = info.get("name", table_code)

        # Realistic base values per indicator
        base_values = {
            "12411-0001": (83_200_000, 50_000, "Anzahl"),       # Population ~83M
            "81000-0001": (3_900_000, 100_000, "Mio. EUR"),      # GDP ~3.9T EUR
            "13111-0001": (350_000, 20_000, "Anzahl"),            # Building permits
            "62321-0001": (105.0, 3.0, "Index (2015=100)"),       # CPI
        }

        base, variance, unit = base_values.get(table_code, (1000, 100, "Einheit unbekannt"))

        records = []
        value = base
        for year in range(2015, 2025):
            value += random.uniform(-variance, variance * 1.5)
            records.append({
                "date": str(year),
                "indicator_id": table_code,
                "indicator_name": f"[MOCK] {name}",
                "value": round(value, 2),
                "unit": unit,
                "source": "destatis_mock",
            })

        return records


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Destatis Genesis API fetcher for DPL",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    group = parser.add_mutually_exclusive_group()
    group.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be fetched without making API calls",
    )
    group.add_argument(
        "--fetch",
        metavar="TABLE_CODE|all",
        help="Fetch a specific table code (e.g. 12411-0001) or 'all'",
    )
    args = parser.parse_args()

    if args.dry_run:
        print("DRY RUN — Destatis Genesis API Fetcher")
        print(f"Base URL: {BASE_URL}")
        print(f"Auth: GAST/GAST (anonymous)")
        print(f"\nWould fetch {len(INDICATORS)} indicator tables:\n")
        for code, info in INDICATORS.items():
            print(f"  [{code}] {info['name']}")
            print(f"           domain: {info['domain']}")
            print(f"           range:  2015–2024")
            print()
        print("Output:")
        today = datetime.now().strftime("%Y-%m-%d")
        for code in INDICATORS:
            print(f"  data/raw/destatis/{today}/{code}_{today}.json")
            print(f"  data/indicators/destatis/{today}/{code}.parquet")
        print(f"  data/indicators/destatis/{today}/indicators.parquet  (combined)")
        return

    fetcher = DestatisFetcher()

    if args.fetch == "all" or args.fetch is None:
        print("Destatis Genesis API Fetcher — DPL")
        print(f"Fetching all {len(INDICATORS)} indicators\n")
        df = fetcher.run()
    elif args.fetch in INDICATORS:
        print(f"Destatis Genesis API Fetcher — DPL")
        print(f"Fetching table: {args.fetch}\n")
        df = fetcher.run([args.fetch])
    else:
        print(f"ERROR: Unknown table code '{args.fetch}'")
        print(f"Available codes: {', '.join(INDICATORS.keys())}")
        sys.exit(1)

    if not df.empty:
        print("\n--- Summary ---")
        print(f"Total rows: {len(df)}")
        print(f"Indicators: {df['indicator_id'].nunique()}")
        print(f"Year range: {df['date'].min()} – {df['date'].max()}")
        print(f"\nSample (first 5 rows):")
        print(df.head(5).to_string(index=False))
        mock_count = (df['source'] == 'destatis_mock').sum()
        if mock_count > 0:
            print(f"\nNOTE: {mock_count} rows are MOCK DATA (API unavailable for those tables)")


if __name__ == "__main__":
    main()
