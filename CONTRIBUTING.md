# Contributing to Deutschland Policy Lab

Thank you for considering a contribution. This project exists to make evidence-based policymaking more accessible in Germany, and that depends on contributors who bring domain expertise, research rigour, and a commitment to political neutrality.

Read this document before opening an issue or pull request.

---

## Non-Partisan Principle

**This is the most important constraint on contributions.**

Deutschland Policy Lab evaluates policies on the basis of evidence — not party affiliation, ideological tradition, or political interest. All contributions must adhere to this standard:

- Do not advocate for or against a political party in any contribution (issue, PR, comment, or code)
- Do not frame policies as "left-wing" or "right-wing", "progressive" or "conservative"
- Do not add policies whose primary purpose is to make a partisan political argument
- Do not add sources that are partisan political publications (party websites, partisan think-tanks with undisclosed affiliations)

If you have a professional or personal interest in a policy area, disclose it in your issue or PR description. This is not disqualifying — it is good epistemic practice.

---

## Ways to Contribute

### 1. Propose a New Policy (via Issue)

Use the [Policy Proposal](.github/ISSUE_TEMPLATE/policy-proposal.md) issue template. Fill in all fields — especially the counterarguments and `whatWouldChangeOurMind` sections. Proposals that are incomplete or that lack a serious engagement with counterarguments will be closed with a request to revise.

Before proposing a policy, check that:
- It is not already in `data/policies.ts`
- It is specific enough to be falsifiable (a testable intervention hypothesis exists)
- There is at least some published evidence to cite (even if the evidence is weak)

### 2. Contribute Evidence to an Existing Policy (via Issue)

Use the [Evidence Contribution](.github/ISSUE_TEMPLATE/evidence-contribution.md) issue template. Specify the policy ID, the type of evidence (supports / weakens / updates), and the specific changes you think should be made to the policy entry.

Evidence contributions are especially valuable when:
- A new study has been published that changes the evidence base
- An existing claim is inaccurate or outdated
- An important counterargument is missing
- An open question has been answered

### 3. Add a Policy to the Codebase (Pull Request)

Once a policy proposal has been discussed and approved in an issue, you can implement it as a PR. Follow these steps:

#### Step 1: Add the policy to `data/policies.ts`

Add a new object to the `policies` array. Every field in the `Policy` interface is required. Use an existing entry as a template.

Key constraints:
- `id` must be kebab-case, unique, and permanent (it will be used in URLs)
- `evidenceStrength` must be one of `"very-low" | "low" | "medium" | "high"`
- `expectedImpact` must be an integer 1–5
- `implementationDifficulty` must be an integer 1–5
- `confidence` must be a number 0–100, or `"unknown"`
- `whatWouldChangeOurMind` must have non-empty `increaseConfidence`, `decreaseConfidence`, and `abandonRecommendation` arrays
- `counterarguments` must be non-empty and must represent the strongest genuine objections
- `sources` must reference IDs defined in `data/sources.ts`

#### Step 2: Add sources to `data/sources.ts`

For each source referenced in your policy's `sources` array, add a corresponding entry to `data/sources.ts` using the same `id` string. All fields in the `Source` interface are required.

Only cite publicly accessible sources where possible. If a source is paywalled, include enough information in `summary` that a reader can assess its credibility.

#### Step 3: Run the tests

```bash
npm test
```

All tests must pass. The test suite in `__tests__/policies.test.ts` validates:
- Exactly 18 policies exist (update this number in the test if you are adding the 19th)
- All required fields are present
- No duplicate IDs
- All IDs are kebab-case
- Confidence values are valid
- Impact values are 1–5
- Evidence strength values are valid enum members
- `whatWouldChangeOurMind` has all three arrays

#### Step 4: Type-check and lint

```bash
npx tsc --noEmit
npm run lint
```

#### Step 5: Open a pull request

Reference the original proposal issue in the PR description. The CI pipeline will run lint, type-check, tests, and a production build. All checks must pass before a PR can be merged.

---

## Code Contributions

For changes to the UI, scoring model, or AI integration:

1. Open a `[FEATURE]` issue first to discuss the change before investing time in an implementation
2. Keep changes focused — one concern per PR
3. Do not introduce new dependencies without discussion (keep the dependency footprint small)
4. Maintain strict TypeScript — no `any` types, no type assertions without explanation
5. Follow the existing code style (the ESLint config enforces most of this)

---

## Fixing Factual Errors

If you find a factual error in a policy entry (wrong statistic, misattributed source, outdated data), open a pull request directly with the correction and a brief explanation. Link the correct source. Small factual fixes do not require a prior issue.

---

## Review Process

All contributions are reviewed by project maintainers. Reviews focus on:
- Factual accuracy and source quality
- Adherence to the non-partisan principle
- Completeness of the evidence base presented (including counterarguments)
- Code quality (for technical contributions)

Reviews are not always fast. If your contribution has not received a response in 14 days, ping the issue with a brief comment.

---

## Questions

Open a GitHub Discussion (not an issue) for general questions about the project, its scope, or its research principles. See `docs/RESEARCH_PRINCIPLES.md` for the epistemic standards that govern all content contributions.
