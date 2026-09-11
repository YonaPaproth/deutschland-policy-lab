#!/usr/bin/env python3
"""Example graph queries showing what Option C (Parquet/DuckDB) enables."""

import duckdb

con = duckdb.connect()
con.execute("CREATE VIEW e AS SELECT * FROM read_parquet('data/graph/entities.parquet')")
con.execute("CREATE VIEW r AS SELECT * FROM read_parquet('data/graph/relations.parquet')")

examples = [
    (
        "All policies addressing housing domain",
        "SELECT e.label FROM e JOIN r ON e.id = r.subject_id "
        "WHERE r.predicate='addresses' AND r.object_id='domain:housing'"
    ),
    (
        "Countries implementing digital state capacity policies",
        "SELECT DISTINCT e.label as country FROM e "
        "JOIN r ON e.id = r.object_id "
        "WHERE r.predicate='implemented_in' AND r.subject_id LIKE 'policy:digital%'"
    ),
    (
        "Housing indicators and their data sources",
        "SELECT e1.label as indicator, e2.label as source "
        "FROM e e1 "
        "JOIN r ON e1.id = r.subject_id "
        "JOIN e e2 ON e2.id = r.object_id "
        "WHERE r.predicate='sourced_from' AND e1.id LIKE '%housing%'"
    ),
    (
        "Germany housing cost overburden vs comparators (most recent year)",
        "SELECT e.label as country, "
        "  CAST(json_extract_string(r.properties, '$.value') AS DOUBLE) as value, "
        "  json_extract_string(r.properties, '$.year') as year, "
        "  json_extract_string(r.properties, '$.unit') as unit "
        "FROM r "
        "JOIN e ON e.id = r.object_id "
        "WHERE r.predicate='has_value' "
        "  AND r.subject_id='indicator:housing_cost_overburden' "
        "  AND CAST(json_extract_string(r.properties, '$.year') AS INT) = "
        "    (SELECT MAX(CAST(json_extract_string(properties, '$.year') AS INT)) FROM r "
        "     WHERE predicate='has_value' AND subject_id='indicator:housing_cost_overburden') "
        "ORDER BY value"
    ),
    (
        "Policy → domain → indicators chain (housing policies and their KPIs)",
        "SELECT DISTINCT p.label as policy, ind.label as indicator "
        "FROM e p "
        "JOIN r r1 ON p.id = r1.subject_id AND r1.predicate='addresses' "
        "JOIN e d ON d.id = r1.object_id "
        "JOIN r r2 ON d.id = r2.subject_id AND r2.predicate='measures' "
        "JOIN e ind ON ind.id = r2.object_id "
        "WHERE p.type='Policy' AND d.id='domain:housing'"
    ),
    (
        "Which countries are referenced most across all policies?",
        "SELECT e.label as country, COUNT(*) as policy_count "
        "FROM e "
        "JOIN r ON e.id = r.object_id "
        "WHERE r.predicate='implemented_in' AND e.type='Country' "
        "GROUP BY e.label ORDER BY policy_count DESC"
    ),
    (
        "Entity type distribution",
        "SELECT type, COUNT(*) as count FROM e GROUP BY type ORDER BY count DESC"
    ),
    (
        "Relation predicate distribution",
        "SELECT predicate, COUNT(*) as count FROM r GROUP BY predicate ORDER BY count DESC"
    ),
]

for title, query in examples:
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")
    try:
        result = con.execute(query).df()
        print(result.to_string(index=False))
    except Exception as exc:
        print(f"Error: {exc}")

print()
