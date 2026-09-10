/**
 * Housing indicators — pre-fetched from Eurostat, embedded at build time.
 * Run scripts/ingest/eurostat_housing_fetcher.py to refresh.
 * Source: Eurostat (EU-SILC), housing cost overburden rate ilc_lvho07a
 */

export interface HousingBenchmark {
  country: string
  countryCode: string
  value: number
  year: number
  indicator: string
  source: string
}

// Pre-embedded data — fetched 2026-09-10 from Eurostat
// Refresh with: python3 scripts/ingest/eurostat_housing_fetcher.py --fetch housing_cost_overburden
export const HOUSING_COST_OVERBURDEN_2025: HousingBenchmark[] = [
  { country: "Finland",     countryCode: "FI", value: 4.7,  year: 2025, indicator: "housing_cost_overburden", source: "Eurostat EU-SILC 2025" },
  { country: "Austria",     countryCode: "AT", value: 6.1,  year: 2025, indicator: "housing_cost_overburden", source: "Eurostat EU-SILC 2025" },
  { country: "France",      countryCode: "FR", value: 6.4,  year: 2025, indicator: "housing_cost_overburden", source: "Eurostat EU-SILC 2025" },
  { country: "Netherlands", countryCode: "NL", value: 6.5,  year: 2025, indicator: "housing_cost_overburden", source: "Eurostat EU-SILC 2025" },
  { country: "Sweden",      countryCode: "SE", value: 10.8, year: 2025, indicator: "housing_cost_overburden", source: "Eurostat EU-SILC 2025" },
  { country: "Germany",     countryCode: "DE", value: 11.2, year: 2025, indicator: "housing_cost_overburden", source: "Eurostat EU-SILC 2025" },
  { country: "Switzerland", countryCode: "CH", value: 15.3, year: 2024, indicator: "housing_cost_overburden", source: "Eurostat EU-SILC 2024" },
  { country: "Denmark",     countryCode: "DK", value: 23.4, year: 2025, indicator: "housing_cost_overburden", source: "Eurostat EU-SILC 2025" },
]

export const GERMANY_HOUSING: HousingBenchmark =
  HOUSING_COST_OVERBURDEN_2025.find(d => d.countryCode === "DE")!

export const HOUSING_BEST_PERFORMER: HousingBenchmark =
  HOUSING_COST_OVERBURDEN_2025.reduce((a, b) => a.value < b.value ? a : b)
