# Research Principles

These ten principles govern how policy entries are written, reviewed, and updated in Deutschland Policy Lab. They are not aspirational — they are operational constraints. A policy entry that violates any of these principles should be corrected or removed.

---

## 1. Separate Evidence from Opinion

Every claim in a policy entry must be attributed to a specific source. The `sources` field is not optional. Statements of fact (e.g., "Germany has approximately 1.2 million unfilled apprenticeship places") must be sourced. Statements of assessment (e.g., "the evidence for this intervention is medium-strength") must explain the reasoning behind the assessment.

The text of `problem`, `objective`, and `intervention` fields should describe observable conditions and proposed mechanisms — not advocate for an outcome. Save advocacy for the `tradeoffs` and `counterarguments` fields, where it is presented as a perspective to be weighed, not a conclusion to be accepted.

---

## 2. Explicitly Quantify Uncertainty

Expressing uncertainty is a research virtue, not a weakness. Every policy entry must include:

- A `confidence` score (0–100, or `"unknown"` if the evidence base is too thin to estimate)
- An `evidenceStrength` rating (`"very-low"` | `"low"` | `"medium"` | `"high"`) with a principled definition
- A `whatWouldChangeOurMind` section with specific, falsifiable conditions

Vague hedges ("some experts believe...", "it may be that...") are not a substitute for structured uncertainty quantification. Be precise about what is unknown and why.

---

## 3. Require Falsifiability

Every `intervention` field must describe a testable hypothesis. A good intervention statement has the form: "If [specific action] is implemented under [specified conditions], then [measurable outcome] will follow within [timeframe], because [causal mechanism]."

An intervention that cannot be falsified — because it makes no testable prediction, or because no evidence could distinguish success from failure — is not a policy hypothesis. It is a political preference.

The `whatWouldChangeOurMind.abandonRecommendation` array operationalises this: it specifies the conditions under which the entire recommendation should be withdrawn.

---

## 4. Show Counterarguments to Every Recommendation

No policy entry may be published without a non-empty `counterarguments` array. The counterarguments must be genuine — the strongest objections that a sceptical, expert critic would raise, not strawmen designed to be easily refuted.

A useful test: if someone who disagrees with the policy recommendation reads the counterarguments and thinks "yes, those are the real objections," the entry is doing its job. If they think "those aren't the real objections," the entry needs revision.

---

## 5. Use International Comparisons Carefully

The `internationalExamples` field is one of the most valuable parts of each policy entry, and one of the easiest to misuse. Before citing a foreign example:

- Specify the institutional, legal, and economic context of the comparison country
- Explain why the mechanism should transfer (or note that it may not)
- Report the actual outcome, including null or negative results
- Note how long implementation took — "Estonia did this in 2001" is more informative than "Estonia did this"

Germany is a federal state with a specific constitutional framework, a strong rule-of-law tradition, and a political culture shaped by particular historical experiences. Not every Scandinavian or Baltic model transfers without modification.

---

## 6. Track What Changed Our Minds and Why

When a policy entry is updated — especially when `confidence`, `evidenceStrength`, or `evidenceStrength` changes — the git commit message and PR description must explain what new evidence triggered the update.

The `lastReviewed` field must be updated whenever the entry is revised. This creates an auditable history of how the evidence base has evolved. Over time, this history is itself a form of evidence about which policy areas are well-studied and which remain contested.

---

## 7. Avoid Political Framing — Evaluate Policies, Not Parties

Policy entries must not associate proposals with specific political parties, either positively or negatively. The following framings are prohibited:

- "This is a centre-right proposal..."
- "Party X has opposed this because..."
- "This policy is consistent with [ideological tradition]..."

The correct framing is always: "This intervention has the following evidence base, the following predicted effects, and the following counterarguments." Let the reader draw political inferences.

This principle extends to language choices. Prefer neutral descriptive terms ("fiscal consolidation") over politically loaded ones ("austerity" or "responsible budgeting") unless quoting a source.

---

## 8. Prefer Primary Sources and Peer Review

Source quality hierarchy (highest to lowest):

1. Peer-reviewed meta-analyses and systematic reviews
2. Individual peer-reviewed studies with large samples and pre-registered hypotheses
3. Government evaluation reports with published methodology
4. Credible think-tank publications with transparent methodology and data
5. High-quality journalism and expert commentary

Sources at levels 4 and 5 are acceptable to support context and framing, but should not be the sole basis for claims about intervention effectiveness. When the best available evidence is level 4 or 5, the `evidenceStrength` should reflect this limitation.

Avoid citing sources that are not publicly accessible. If a source is behind a paywall, include enough detail in the source `summary` field that a reader can assess its credibility without accessing the full text.

---

## 9. Mark All Extrapolations and Projections Clearly

When a KPI `target` or an `estimatedCost` is based on projection modelling rather than observed outcomes, this must be stated. Phrases like "estimated", "projected", "modelled assuming X", and "based on analogues from Y" should appear in the relevant fields.

Do not present a model output as if it were an empirical observation. Model outputs are conditional on assumptions; empirical observations are conditional on measurement validity. These are different epistemic categories and should be treated as such.

---

## 10. Continuously Update as Evidence Accumulates

A policy entry that has not been reviewed in 24 months should be flagged for review. Evidence bases change. Studies are retracted, replicated, or superseded. Policy contexts shift. An entry that was accurate in 2023 may be misleading in 2026.

The `lastReviewed` field enables automated flagging. Contributors who maintain specific domain expertise are encouraged to take ownership of policy entries in their domain and commit to periodic review.

Updating a policy entry to reflect new evidence — even if it weakens a previous recommendation — is one of the highest-value contributions a researcher can make to this project.
