#!/usr/bin/env python3
"""
Build DPL Knowledge Graph — Option C (Property Graph on Parquet/DuckDB)
Creates entities.parquet and relations.parquet from:
  - data/policies.ts (parsed for IDs, domains, international examples)
  - data/indicators/eurostat/ (housing indicators)
  - Static country/domain/source definitions

Usage:
  python3 scripts/graph/build_graph.py
  python3 scripts/graph/build_graph.py --query "SELECT * FROM entities WHERE type='Policy'"
"""

import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path

import pandas as pd

# ── Helpers ──────────────────────────────────────────────────────────────────

TODAY = date.today().isoformat()


def entity(id_: str, type_: str, label: str, label_de: str, properties: dict | None = None) -> dict:
    return {
        "id": id_,
        "type": type_,
        "label": label,
        "label_de": label_de,
        "properties": json.dumps(properties or {}, ensure_ascii=False),
        "created_at": TODAY,
    }


def relation(
    subject_id: str,
    predicate: str,
    object_id: str,
    weight: float = 1.0,
    source_id: str | None = None,
    valid_from: str | None = None,
    valid_to: str | None = None,
    properties: dict | None = None,
) -> dict:
    return {
        "subject_id": subject_id,
        "predicate": predicate,
        "object_id": object_id,
        "weight": weight,
        "source_id": source_id,
        "valid_from": valid_from,
        "valid_to": valid_to,
        "created_at": TODAY,
        # properties stored alongside (not in schema but handy for has_value)
        "properties": json.dumps(properties or {}, ensure_ascii=False),
    }


# ── Step 1: Define entities ───────────────────────────────────────────────────

entities: list[dict] = []

# Countries
countries = [
    ("AT", "Austria", "Österreich"),
    ("NL", "Netherlands", "Niederlande"),
    ("SE", "Sweden", "Schweden"),
    ("DK", "Denmark", "Dänemark"),
    ("FI", "Finland", "Finnland"),
    ("FR", "France", "Frankreich"),
    ("CH", "Switzerland", "Schweiz"),
    ("EE", "Estonia", "Estland"),
    ("SG", "Singapore", "Singapur"),
    ("CA", "Canada", "Kanada"),
    ("AU", "Australia", "Australien"),
    ("GB", "United Kingdom", "Vereinigtes Königreich"),
    ("DE", "Germany", "Deutschland"),
]
for code, label_en, label_de in countries:
    entities.append(entity(f"country:{code}", "Country", label_en, label_de, {"iso2": code}))

# Domains
domains = [
    ("state-capacity", "State Capacity & Digitalisation", "Staatliche Kapazität"),
    ("housing", "Housing & Construction", "Wohnen & Bauen"),
    ("labour", "Labour & Taxation", "Arbeit & Steuern"),
    ("migration", "Migration & Integration", "Migration & Integration"),
    ("innovation", "Innovation & Technology", "Innovation & Technologie"),
    ("energy", "Energy & Industry", "Energie & Industrie"),
    ("education", "Education & Skills", "Bildung & Qualifikation"),
    ("economic-growth", "Growth & Productivity", "Wachstum & Produktivität"),
    ("pensions", "Pensions & Demography", "Renten & Demografie"),
    ("defence", "Defence & Resilience", "Verteidigung & Resilienz"),
]
for slug, label_en, label_de in domains:
    entities.append(entity(f"domain:{slug}", "Domain", label_en, label_de))

# DataSources
sources = [
    ("eurostat-eu-silc", "Eurostat EU-SILC Survey", "Eurostat EU-SILC-Erhebung"),
    ("eurostat-hpi", "Eurostat House Price Index", "Eurostat Hauspreisindex"),
    ("oecd-stat", "OECD.Stat", "OECD.Stat"),
    ("destatis", "Destatis Genesis", "Destatis Genesis"),
    ("bbsr", "BBSR Wohnungsmarktbericht", "BBSR Wohnungsmarktbericht"),
    ("world-bank", "World Bank", "Weltbank"),
    ("iw-koeln", "IW Köln", "IW Köln"),
]
for slug, label_en, label_de in sources:
    entities.append(entity(f"source:{slug}", "DataSource", label_en, label_de))

# Indicators
indicators = [
    ("housing_cost_overburden", "Housing Cost Overburden Rate", "Wohnkostenüberlastungsquote", "%", "Share of population spending >40% of income on housing"),
    ("house_price_index", "House Price Index", "Hauspreisindex", "index (2015=100)", "Nominal house price index, 2015=100"),
    ("gdp_growth", "Real GDP Growth Rate", "Reales BIP-Wachstum", "% per year", "Annual real GDP growth rate"),
    ("labour_force_participation", "Labour Force Participation Rate", "Erwerbsquote", "%", "Share of working-age population in labour force"),
    ("skilled_visa_processing_time", "Skilled Worker Visa Processing Time", "Bearbeitungszeit Fachkräftevisa", "days", "Average days to process skilled worker visa application"),
    ("digital_services_coverage", "Digital Public Services Coverage", "Abdeckung digitaler Verwaltungsleistungen", "%", "Share of public services available digitally"),
    ("pisa_score", "PISA Composite Score", "PISA-Gesamtpunktzahl", "points", "Average of Reading, Math, Science PISA scores"),
    ("rd_investment_pct_gdp", "R&D Investment", "F&E-Investitionen", "% GDP", "Gross domestic expenditure on R&D as % of GDP"),
    ("renewable_electricity_pct", "Renewable Electricity Share", "Anteil erneuerbarer Energien", "%", "Share of electricity from renewable sources"),
    ("housing_units_completed", "New Housing Units Completed", "Fertiggestellte Wohnungen", "units/year", "Number of new residential units completed per year"),
]
for slug, label_en, label_de, unit, desc in indicators:
    entities.append(entity(
        f"indicator:{slug}", "Indicator", label_en, label_de,
        {"unit": unit, "description": desc}
    ))

# Policies — parse from data/policies.ts
POLICIES_TS = Path("data/policies.ts")
policy_id_pattern = re.compile(r'^\s+id:\s+"([^"]+)"')
policy_title_pattern = re.compile(r'^\s+title:\s+"([^"]+)"')

policy_entries: list[tuple[str, str]] = []
current_id: str | None = None
with open(POLICIES_TS, encoding="utf-8") as f:
    for line in f:
        m_id = policy_id_pattern.match(line)
        m_title = policy_title_pattern.match(line)
        if m_id and m_id.group(1) != "string":  # skip interface field
            current_id = m_id.group(1)
        elif m_title and current_id and m_title.group(1) != "string":
            policy_entries.append((current_id, m_title.group(1)))
            current_id = None

# German titles (short forms)
policy_de_titles = {
    "once-only-principle": "Once-Only-Datenprinzip",
    "digital-citizen-account": "Universelles digitales Bürgerkonto",
    "binding-admin-deadlines": "Gesetzliche Bearbeitungsfristen",
    "standard-case-automation": "Automatische Genehmigung von Standardfällen",
    "standardised-building-regs": "Bundesweiter Typengrundriss-Katalog",
    "digital-permitting": "Volldigitale Baugenehmigung",
    "transit-density": "Erhöhte Baudichte an ÖPNV-Knoten",
    "marginal-tax-reform": "Reform der Grenzsteuersätze",
    "post-retirement-employment": "Abschaffung von Rentnerbeschäftigungshemmnissen",
    "fast-track-skilled-migration": "30-Tage-Fachkräftevisa",
    "asylum-processing-speed": "Beschleunigtes Asylverfahren",
    "startup-equity": "Reform der Mitarbeiterbeteiligung",
    "research-commercialisation": "Abbau von IP-Barrieren an Hochschulen",
    "grid-acceleration": "Beschleunigter Netzausbau",
    "industrial-demand-flexibility": "Industrielle Lastflexibilisierung",
    "eu-grid-integration": "Grenzüberschreitende Stromkapazität",
    "evidence-based-teaching": "Evidenzbasierte Pädagogik",
    "extended-school-day": "Ganztagsschule mit Qualitätsprogramm",
}

for pid, title in policy_entries:
    label_de = policy_de_titles.get(pid, title)
    entities.append(entity(f"policy:{pid}", "Policy", title, label_de))

# ── Step 2: Define relations ──────────────────────────────────────────────────

relations: list[dict] = []

# Policy → Domain (addresses)
policy_domain_map = {
    "once-only-principle": "state-capacity",
    "digital-citizen-account": "state-capacity",
    "binding-admin-deadlines": "state-capacity",
    "standard-case-automation": "state-capacity",
    "standardised-building-regs": "housing",
    "digital-permitting": "housing",
    "transit-density": "housing",
    "marginal-tax-reform": "labour",
    "post-retirement-employment": "labour",
    "fast-track-skilled-migration": "migration",
    "asylum-processing-speed": "migration",
    "startup-equity": "innovation",
    "research-commercialisation": "innovation",
    "grid-acceleration": "energy",
    "industrial-demand-flexibility": "energy",
    "eu-grid-integration": "energy",
    "evidence-based-teaching": "education",
    "extended-school-day": "education",
}

for pid, domain in policy_domain_map.items():
    relations.append(relation(f"policy:{pid}", "addresses", f"domain:{domain}"))

# Policy → Country (implemented_in)
policy_country_map = {
    "once-only-principle": ["EE"],
    "digital-citizen-account": ["EE", "AT"],
    "binding-admin-deadlines": ["AT", "NL"],
    "standard-case-automation": ["EE", "NL"],
    "standardised-building-regs": ["AT", "SE"],
    "digital-permitting": ["EE", "SE"],
    "transit-density": ["NL", "DK"],
    "marginal-tax-reform": ["SE", "DK", "FI"],
    "post-retirement-employment": ["SE", "FI"],
    "fast-track-skilled-migration": ["CA", "AU", "GB"],
    "asylum-processing-speed": ["DK", "NL"],
    "startup-equity": ["GB", "SE"],
    "research-commercialisation": ["SE", "FI"],
    "grid-acceleration": ["SE", "DK"],
    "industrial-demand-flexibility": ["SE", "FI"],
    "eu-grid-integration": ["FR", "NL"],
    "evidence-based-teaching": ["FI", "SE"],
    "extended-school-day": ["FR", "FI"],
}

for pid, country_codes in policy_country_map.items():
    for code in country_codes:
        relations.append(relation(f"policy:{pid}", "implemented_in", f"country:{code}"))

# Domain → Indicator (measures)
domain_indicator_map = [
    ("housing", "housing_cost_overburden"),
    ("housing", "house_price_index"),
    ("housing", "housing_units_completed"),
    ("economic-growth", "gdp_growth"),
    ("labour", "labour_force_participation"),
    ("state-capacity", "digital_services_coverage"),
    ("migration", "skilled_visa_processing_time"),
    ("education", "pisa_score"),
    ("innovation", "rd_investment_pct_gdp"),
    ("energy", "renewable_electricity_pct"),
]
for domain, indicator in domain_indicator_map:
    relations.append(relation(f"domain:{domain}", "measures", f"indicator:{indicator}"))

# Indicator → DataSource (sourced_from)
indicator_source_map = {
    "housing_cost_overburden": "eurostat-eu-silc",
    "house_price_index": "eurostat-hpi",
    "gdp_growth": "oecd-stat",
    "labour_force_participation": "oecd-stat",
    "housing_units_completed": "destatis",
    "digital_services_coverage": "eurostat-eu-silc",
    "pisa_score": "oecd-stat",
    "rd_investment_pct_gdp": "oecd-stat",
    "renewable_electricity_pct": "eurostat-eu-silc",
}
for indicator, source in indicator_source_map.items():
    relations.append(relation(f"indicator:{indicator}", "sourced_from", f"source:{source}"))

# has_value — load from Eurostat housing Parquet files
eurostat_dir = Path("data/indicators/eurostat")
housing_parquets = list(eurostat_dir.glob("*/housing_indicators.parquet"))

# Country code → entity id mapping (only countries in our graph)
known_countries = {code for code, _, _ in countries}

has_value_count = 0
for parquet_path in housing_parquets:
    df = pd.read_parquet(parquet_path)
    # Get max value per indicator for normalisation
    max_by_indicator = df.groupby("indicator")["value"].max()

    for _, row in df.iterrows():
        indicator_slug = row["indicator"]
        country_code = row["country_code"]
        if country_code not in known_countries:
            continue
        value = float(row["value"])
        year = int(row["year"])
        unit_map = {ind[0]: ind[2] for ind in indicators}
        unit = unit_map.get(indicator_slug, "")
        max_val = float(max_by_indicator.get(indicator_slug, 1)) or 1.0
        weight = round(min(value / max_val, 1.0), 4)

        relations.append(relation(
            f"indicator:{indicator_slug}",
            "has_value",
            f"country:{country_code}",
            weight=weight,
            properties={"value": value, "year": year, "unit": unit},
        ))
        has_value_count += 1

# ── Step 3: Write Parquet files ───────────────────────────────────────────────

entities_df = pd.DataFrame(entities)
relations_df = pd.DataFrame(relations)

Path("data/graph").mkdir(parents=True, exist_ok=True)
entities_df.to_parquet("data/graph/entities.parquet", index=False)
relations_df.to_parquet("data/graph/relations.parquet", index=False)

# ── Step 3b: Write graph-data.json for Next.js ───────────────────────────────

graph_data = {
    "entities": entities_df.to_dict(orient="records"),
    "relations": relations_df.to_dict(orient="records"),
    "generated_at": TODAY,
}
Path("data/graph/graph-data.json").write_text(
    json.dumps(graph_data, ensure_ascii=False, indent=2), encoding="utf-8"
)

# ── Step 4: Print summary ─────────────────────────────────────────────────────

type_counts = entities_df["type"].value_counts()
pred_counts = relations_df["predicate"].value_counts()

print("=" * 60)
print("DPL Knowledge Graph — Build Summary")
print("=" * 60)
print(f"\nEntities: {len(entities_df)} total")
for t in ["Policy", "Country", "Domain", "Indicator", "DataSource"]:
    print(f"  - {t}: {type_counts.get(t, 0)}")

print(f"\nRelations: {len(relations_df)} total")
for pred in ["addresses", "implemented_in", "measures", "sourced_from", "has_value"]:
    print(f"  - {pred}: {pred_counts.get(pred, 0)}")

print(f"\nFiles written:")
ep = Path("data/graph/entities.parquet")
rp = Path("data/graph/relations.parquet")
jp = Path("data/graph/graph-data.json")
print(f"  data/graph/entities.parquet   {ep.stat().st_size / 1024:.1f} KB")
print(f"  data/graph/relations.parquet  {rp.stat().st_size / 1024:.1f} KB")
print(f"  data/graph/graph-data.json    {jp.stat().st_size / 1024:.1f} KB")
print()

# ── Step 5: --query flag ──────────────────────────────────────────────────────

parser = argparse.ArgumentParser(description="Build DPL Knowledge Graph")
parser.add_argument("--query", type=str, help="Ad-hoc DuckDB SQL query to run after build")
args = parser.parse_args()

if args.query:
    import duckdb
    con = duckdb.connect()
    con.execute("CREATE VIEW entities AS SELECT * FROM read_parquet('data/graph/entities.parquet')")
    con.execute("CREATE VIEW relations AS SELECT * FROM read_parquet('data/graph/relations.parquet')")
    result = con.execute(args.query).df()
    print(result.to_string())
