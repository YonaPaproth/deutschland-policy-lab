export interface PolicyTranslation {
  title?: string
  shortDescription?: string
  problem?: string
  objective?: string
  intervention?: string
}

export interface Policy {
  id: string
  title: string
  shortDescription: string
  domain: "state-capacity" | "housing" | "labour" | "migration" | "innovation" | "energy" | "education" | "economic-growth" | "pensions" | "defence"
  problem: string
  objective: string
  intervention: string
  status: "idea" | "researching" | "evidence-supported" | "pilot" | "implemented" | "evaluated"
  evidenceStrength: "very-low" | "low" | "medium" | "high"
  expectedImpact: 1 | 2 | 3 | 4 | 5
  implementationDifficulty: 1 | 2 | 3 | 4 | 5
  estimatedCost: "low" | "medium" | "high" | "unknown"
  timeToImpact: "short" | "medium" | "long"
  confidence: number | "unknown"
  affectedGroups: string[]
  internationalExamples: Array<{ country: string; description: string; outcome: string }>
  risks: string[]
  tradeoffs: string[]
  kpis: Array<{ metric: string; baseline?: string; target?: string }>
  sources: string[]
  counterarguments: string[]
  openQuestions: string[]
  whatWouldChangeOurMind: {
    increaseConfidence: string[]
    decreaseConfidence: string[]
    abandonRecommendation: string[]
  }
  lastReviewed: string
  translations?: {
    de?: PolicyTranslation
  }
}

const policies: Policy[] = [
  // ─── STATE CAPACITY ──────────────────────────────────────────────────────────

  {
    id: "once-only-principle",
    title: "Once-Only Data Principle for Government Services",
    shortDescription:
      "Citizens and businesses provide data to government once; agencies reuse it internally instead of requiring re-submission.",
    domain: "state-capacity",
    problem:
      "German citizens and businesses must repeatedly provide identical information — address, income, marital status, tax ID — to different public authorities for each transaction. This imposes significant compliance costs (estimated €15 bn annually for businesses alone), degrades user experience, and reflects a fragmented IT architecture where data silos persist across federal, state, and municipal layers.",
    objective:
      "Eliminate redundant data collection by mandating that any data already held by a public authority be drawn from authoritative registers rather than re-requested from the citizen. Reduce administrative compliance burden by at least 40 % for standard transactions within five years.",
    intervention:
      "Establish a legal basis (amendment to the Onlinezugangsgesetz) requiring agencies to retrieve data from authoritative source registers rather than citizens. Build a thin data-sharing layer (not a central data lake) using standardised APIs between existing registries. Pilot with the most common 20 transaction types covering ~60 % of citizen-government interactions.",
    status: "researching",
    evidenceStrength: "high",
    expectedImpact: 4,
    implementationDifficulty: 4,
    estimatedCost: "high",
    timeToImpact: "long",
    confidence: 0.7,
    affectedGroups: ["all citizens", "SMEs", "public administration staff", "IT service providers"],
    internationalExamples: [
      {
        country: "Estonia",
        description:
          "X-Road data exchange layer connects 900+ databases; agencies are legally prohibited from requesting data already held by another authority. Implemented progressively from 2001.",
        outcome:
          "Estonian citizens spend on average 5 minutes per year on government interactions that require ~30 minutes in Germany. X-Road saves an estimated 820 working years annually across the public and private sector.",
      },
      {
        country: "Denmark",
        description:
          "The Danish Basic Data Programme (Grunddata) established authoritative registers for persons, addresses, and businesses that all agencies must query rather than collect independently.",
        outcome:
          "Estimated DKK 1 bn+ in annual savings; address and identity data quality improved measurably. The programme took 8 years from mandate to full implementation.",
      },
      {
        country: "Austria",
        description:
          "Austria's Bürgerserviceportal and the underlying register network implement once-only for most citizen interactions, underpinned by a constitutional register framework.",
        outcome:
          "Austria consistently ranks in the EU eGovernment top 5; once-only coverage reaches ~75 % of eligible interactions.",
      },
    ],
    risks: [
      "Data security: a thin sharing layer still creates attack surfaces; a breach exposing cross-linked personal data would be politically damaging and could set back the programme.",
      "Constitutional GDPR tensions: data minimisation principles may conflict with proactive data sharing; legal design must be carefully scoped.",
      "Federal coordination: Länder control key registers (civil status, residence registration); without their cooperation the federal layer cannot function.",
      "Legacy IT: many authoritative registers run on systems that cannot expose modern APIs without significant redevelopment.",
      "Scope creep: pressure to build a central data lake rather than a federated exchange layer would increase both cost and risk.",
    ],
    tradeoffs: [
      "Privacy vs. convenience: citizens who prefer not to have their data shared between agencies lose that option.",
      "Short-term investment vs. long-term savings: upfront infrastructure cost of €2–4 bn against lifetime savings of €10–15 bn.",
      "Federal uniformity vs. Länder autonomy: a national data architecture necessarily constrains what Länder can do independently.",
    ],
    kpis: [
      {
        metric: "Share of citizen-government transactions requiring no re-submission of already-held data",
        baseline: "~12 %",
        target: "75 % within 5 years",
      },
      { metric: "Average time spent by citizen per standard government transaction", baseline: "47 minutes", target: "15 minutes" },
      { metric: "Annual compliance cost to businesses for government data provision (€ bn)", baseline: "€15 bn", target: "€9 bn" },
      { metric: "Number of authoritative registers connected to the data exchange layer", baseline: "0", target: "30 within 3 years" },
    ],
    sources: ["bertelsmann-2024-verwaltungsdigitalisierung", "mckinsey-2023-germany-productivity", "svr-2023-jahresgutachten"],
    counterarguments: [
      "Germany's federal structure makes a unified data architecture functionally impossible without constitutional reform; Estonia is a unitary state.",
      "The compliance cost estimates overstate the case — most citizens interact with government rarely enough that the time savings are marginal.",
      "Proactive data sharing between agencies normalises surveillance and erodes the default of data minimisation that German privacy culture values.",
    ],
    openQuestions: [
      "What is the minimum viable set of registers (perhaps 5–8) that would cover the highest-volume transactions and justify initial infrastructure investment?",
      "How should the legal framework handle cases where a citizen disputes the accuracy of data held by a source register?",
      "Can the data exchange layer be designed to allow citizens to see and audit which agencies have accessed their data?",
      "What governance model (federal agency vs. shared IT service vs. regulated private operator) is most likely to maintain the infrastructure long-term?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "A successful German pilot across 3–5 Länder demonstrating that federated API connections can be built within existing legal constraints.",
        "Constitutional or legal analysis confirming GDPR compliance of the federated model without requiring individual consent for each data retrieval.",
        "Länder signing a Verwaltungsabkommen committing to expose their registers via standardised APIs within a defined timeframe.",
      ],
      decreaseConfidence: [
        "Evidence from Estonia or Denmark that once-only systems have significant security vulnerabilities that materialised into breaches at scale.",
        "Legal opinion that the German constitutional framework (Art. 91c GG) is insufficient to compel Länder to share data without individual Länder legislation.",
        "Cost estimates for German implementation significantly exceeding €4 bn due to legacy system complexity.",
      ],
      abandonRecommendation: [
        "A Federal Constitutional Court ruling that proactive inter-agency data sharing without explicit citizen consent violates the right to informational self-determination (Volkszählungsurteil doctrine).",
        "Evidence that administrative burden reduction does not materialise because agencies find other ways to request data even when legally prohibited from doing so.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  {
    id: "digital-citizen-account",
    title: "Universal Digital Citizen Account",
    shortDescription:
      "A single authenticated digital identity and account through which every citizen can access all federal, state, and municipal services.",
    domain: "state-capacity",
    problem:
      "Germany has dozens of competing digital identity and portal solutions — BundID, ELSTER, Mein Unternehmenskonto, various Länder portals — that are not interoperable. Citizens must maintain separate credentials for each. The Onlinezugangsgesetz mandated a unified portal by 2022; this deadline was missed. Uptake of existing digital services remains low partly because onboarding (eID activation, Postident) is cumbersome.",
    objective:
      "Consolidate all citizen-facing government services behind a single authenticated account, making it the default channel for government-citizen interaction while retaining analogue fallbacks. Achieve 60 % of eligible transactions completed digitally by 2028.",
    intervention:
      "Mandate BundID as the single federal identity, require all Länder portals to federate with it via OpenID Connect, and simplify eID onboarding (enable smartphone NFC activation). Provide automatic account creation upon first eID issuance (opt-out, not opt-in).",
    status: "pilot",
    evidenceStrength: "medium",
    expectedImpact: 4,
    implementationDifficulty: 3,
    estimatedCost: "medium",
    timeToImpact: "medium",
    confidence: 0.65,
    affectedGroups: ["all citizens", "residents without German citizenship", "public administration staff", "digital service providers"],
    internationalExamples: [
      {
        country: "Estonia",
        description:
          "eID issued to all residents; single login used for voting, banking, healthcare, and government. 99 % of services available online.",
        outcome:
          "Digital service usage above 90 % for most government interactions. Identity infrastructure underpins private-sector services too, creating a platform effect.",
      },
      {
        country: "Denmark",
        description:
          "MitID replaced NemID as the single digital identity in 2022. Used by 5.9 million Danes (virtually the entire adult population) for both public and private sector services.",
        outcome:
          "Denmark ranks 1st in the EU eGovernment benchmark. Over 90 % of Danes use MitID at least monthly.",
      },
      {
        country: "United Kingdom",
        description:
          "GOV.UK One Login launched 2022, consolidating previously fragmented HMRC, DWP, and DVLA credentials into a single account. Rollout ongoing.",
        outcome:
          "Early data shows significantly improved completion rates for services migrated to One Login versus legacy credential systems.",
      },
    ],
    risks: [
      "A single authentication point creates a high-value target for cyberattacks; a breach would undermine trust in digital government broadly.",
      "Exclusion risk: citizens without smartphones, internet access, or technical literacy may be disadvantaged if the analogue pathway degrades.",
      "Länder may resist mandated federation, preferring to maintain independent portals for political or legacy-IT reasons.",
      "The eID card penetration rate (~50 %) and activation rate (~30 %) must both increase substantially for the system to reach critical mass.",
    ],
    tradeoffs: [
      "Centralisation vs. resilience: a single point of identity is efficient but creates single-point-of-failure risk.",
      "Simplicity for users vs. complexity for IT: standardising across 16 Länder and thousands of municipalities requires coordination at enormous scale.",
      "Speed of rollout vs. quality: pressure to meet political deadlines may lead to under-tested services that damage trust.",
    ],
    kpis: [
      { metric: "Share of eligible federal services accessible via BundID", baseline: "~40 %", target: "100 % within 2 years" },
      { metric: "Active BundID users (millions)", baseline: "2.1 m", target: "30 m within 4 years" },
      { metric: "eID activation rate among cardholders", baseline: "~30 %", target: "70 % within 3 years" },
      { metric: "EU eGovernment Benchmark ranking (Germany)", baseline: "18th of 27", target: "Top 10 within 5 years" },
    ],
    sources: ["bertelsmann-2024-verwaltungsdigitalisierung", "mckinsey-2023-germany-productivity"],
    counterarguments: [
      "A single digital identity concentrates surveillance power in the state in ways that are structurally different from fragmented systems, even if individual services are equally private.",
      "The private sector (banking apps, ELSTER) already provides adequate digital interaction for most common needs; the marginal value of a unified account is overstated.",
      "Germany's experience with the OZG rollout suggests that top-down digital mandates do not work; bottom-up service improvement delivers better outcomes.",
    ],
    openQuestions: [
      "How should the account handle non-German EU citizens who have eIDs from other member states under the eIDAS regulation?",
      "What is the right fallback mechanism for citizens who cannot or choose not to use digital services, without creating a two-tier quality of service?",
      "Should private-sector services (banks, insurance, utilities) be permitted to use BundID authentication, creating platform-like network effects?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "Denmark or Estonia data showing that a mandatory digital-first approach did not systematically disadvantage digitally excluded populations when analogue fallbacks were preserved.",
        "A successful BundID pilot across 2+ Länder demonstrating interoperability without requiring new legislation.",
      ],
      decreaseConfidence: [
        "Evidence that the UK GOV.UK One Login rollout encountered fundamental architectural problems not present in Estonia/Denmark's greenfield implementations.",
        "Survey data showing that German citizens have strong preferences for maintaining separate credentials for different government domains for privacy reasons.",
      ],
      abandonRecommendation: [
        "A major security incident in a comparable single-identity system (e.g., Denmark MitID) that caused widespread harm and from which recovery took years.",
        "Legal opinion that a mandatory unified identity system conflicts with EU data protection law in ways that cannot be resolved by design choices.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  {
    id: "binding-admin-deadlines",
    title: "Legally Binding Administrative Decision Deadlines",
    shortDescription:
      "Set statutory deadlines for all administrative decisions; silence after the deadline constitutes approval for low-risk cases and triggers escalation rights for complex ones.",
    domain: "state-capacity",
    problem:
      "German administrative procedures routinely exceed legal processing time recommendations. Planning approvals average 14.5 months for housing construction, environmental impact assessments for infrastructure projects routinely take 5–10 years, and business permits can require multiple years. Uncertainty about timing imposes high costs on investors and developers, often exceeding the cost of the decision itself. The current VwVfG framework contains soft deadlines with no meaningful enforcement.",
    objective:
      "Reduce average administrative decision times by 50 % for standard applications within three years. Eliminate open-ended proceedings by requiring either a decision or a formally justified extension within statutory periods.",
    intervention:
      "Amend the Verwaltungsverfahrensgesetz to introduce hard deadlines (e.g., 3 months for standard permits, 12 months for complex environmental approvals) with automatic approval (Genehmigungsfiktion) for low-risk standard cases where no objection has been registered, and mandatory escalation to a higher authority or administrative court for complex cases exceeding the deadline.",
    status: "researching",
    evidenceStrength: "medium",
    expectedImpact: 4,
    implementationDifficulty: 5,
    estimatedCost: "medium",
    timeToImpact: "medium",
    confidence: 0.55,
    affectedGroups: [
      "businesses seeking permits",
      "housing developers",
      "infrastructure investors",
      "public authorities",
      "third parties with objection rights",
    ],
    internationalExamples: [
      {
        country: "Netherlands",
        description:
          "The Lex Silencio Positivo introduces automatic approval for many permit categories if no decision is made within the statutory period. Applied to ~1,200 permit types.",
        outcome: "Average permitting time reduced by ~25 % for categories covered by LSP. Some concerns about quality of implicit approvals in complex cases.",
      },
      {
        country: "Portugal",
        description:
          "SIMPLEX programme introduced binding deadlines and deferral-to-approval across business licensing. Administrative silence became approval by default for most categories.",
        outcome: "Portugal rose from 113th to 39th in World Bank Doing Business rankings over 10 years. Business registration time fell from 78 days to 3 days.",
      },
      {
        country: "South Korea",
        description:
          "Administrative Procedures Act specifies processing times for each permit category; delays trigger automatic notifications to applicants and supervisory review.",
        outcome: "Permit processing times are among the shortest in the OECD for covered categories; compliance rate with statutory deadlines exceeds 85 %.",
      },
    ],
    risks: [
      "Automatic approval of complex cases (e.g., environmental permits near sensitive habitats) could lead to harmful outcomes that are difficult to reverse.",
      "Underfunded authorities cannot meet new deadlines without additional staff; unfunded mandates may cause rushed, poor-quality decisions.",
      "Third-party objection rights (Nachbarschaftsrecht, NGO standing) may be undermined if procedural shortcuts are used to meet deadlines.",
      "EU law in some domains (EIA Directive, Habitats Directive) may not permit automatic approval of projects requiring environmental assessment.",
    ],
    tradeoffs: [
      "Speed vs. thoroughness: tighter deadlines may reduce the quality of decisions, particularly for novel or complex cases.",
      "Developer certainty vs. third-party participation: faster processes may compress time available for public consultation and objection.",
      "Federal uniformity vs. contextual flexibility: a single deadline framework may not fit the diversity of permit types and local contexts.",
    ],
    kpis: [
      {
        metric: "Average time from permit application to decision for residential construction",
        baseline: "14.5 months",
        target: "6 months",
      },
      { metric: "Share of permit applications decided within statutory deadline", baseline: "~45 %", target: "90 %" },
      { metric: "Number of infrastructure projects stuck in planning >5 years", baseline: "~320", target: "<50" },
    ],
    sources: ["svr-2023-jahresgutachten", "world-bank-2023-business-regs", "diw-2023-wohnungsmarkt"],
    counterarguments: [
      "The length of German administrative procedures reflects genuine complexity and the need to balance competing legal interests; compressing timelines increases legal challenge risk and may produce more court reversals.",
      "Automatic approval (Genehmigungsfiktion) has been tried in Germany (§ 42a VwVfG) and is rarely applied by Länder because of constitutional concerns about implicit state acts.",
      "Deadlines alone do not address the root cause — insufficient staffing and expertise in planning authorities — and may just shift the problem to judicial review.",
    ],
    openQuestions: [
      "For which specific permit categories is Genehmigungsfiktion constitutionally and legally viable under current EU and domestic law?",
      "What is the minimum staffing investment in planning authorities required to make binding deadlines achievable?",
      "How should the regime handle third-party objections filed near the end of a statutory deadline?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "A Federal Constitutional Court opinion confirming the constitutionality of Genehmigungsfiktion for a defined class of permit types.",
        "Empirical evidence from Netherlands LSP showing that automatic approval did not lead to a significant increase in harmful or legally invalid decisions.",
        "A Länder pilot demonstrating that binding deadlines can be met without proportionate staffing increases, suggesting process efficiency gains are the primary driver.",
      ],
      decreaseConfidence: [
        "Evidence from Portugal or South Korea that nominal deadline compliance was achieved by degrading decision quality, leading to more court reversals.",
        "Legal opinion that EU environmental law (EIA Directive) precludes automatic approval for any project requiring screening, covering a larger share of permits than assumed.",
      ],
      abandonRecommendation: [
        "Multiple cases where automatic approval under a pilot programme resulted in significant environmental or third-party harm that was politically and legally costly to reverse.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  {
    id: "standard-case-automation",
    title: "Automatic Approval for Objectively Standard Cases",
    shortDescription:
      "Cases meeting fully objective, pre-defined criteria — where no discretion is required — are processed and approved automatically without human review.",
    domain: "state-capacity",
    problem:
      "A significant share of administrative decisions involve no genuine discretion: the applicant either meets all objective criteria or does not. Yet these cases consume the same queue, staff time, and citizen waiting time as genuinely complex decisions. This creates unnecessary delays for applicants with clear-cut cases and wastes scarce public administrative capacity.",
    objective:
      "Identify the set of administrative decisions where objective criteria cover 100 % of the decision logic and automate these end-to-end, freeing human administrators for complex cases requiring judgment and reducing average processing time for standard cases to near-zero.",
    intervention:
      "Legislate a mandated expansion of 'vollautomatisierte Verwaltungsakte' (partially enabled by § 35a VwVfG since 2017). Expand the list of eligible decisions beyond the current narrow scope, require agencies to publish an automation roadmap, and create a central IT service to provide automation infrastructure to smaller authorities.",
    status: "pilot",
    evidenceStrength: "medium",
    expectedImpact: 3,
    implementationDifficulty: 3,
    estimatedCost: "medium",
    timeToImpact: "short",
    confidence: 0.72,
    affectedGroups: ["citizens with standard administrative needs", "public administration staff", "businesses", "IT service providers"],
    internationalExamples: [
      {
        country: "Estonia",
        description:
          "Tax returns are pre-filled and auto-accepted if no amendment is made. Vehicle registration, benefit calculations, and school enrollment are fully automated for standard cases.",
        outcome:
          "Tax filing takes on average 3–5 minutes. Administrative cost per transaction for automated services is estimated at <5 % of manual equivalents.",
      },
      {
        country: "Denmark",
        description:
          "SKAT auto-processes the large majority of income tax cases. Child benefit calculations are fully automated based on register data.",
        outcome:
          "SKAT processes 4.5 million returns with minimal human review; error rates comparable to manual processing. Citizen satisfaction highest among government services.",
      },
      {
        country: "Austria",
        description:
          "FinanzOnline auto-processes standard tax assessments. Social insurance (ÖGK) uses automated eligibility calculations for standard benefit cases.",
        outcome:
          "Processing time for auto-assessed returns under 24 hours vs. several weeks for manual cases. Citizen appeals rate for auto-decisions not significantly different from manual.",
      },
    ],
    risks: [
      "Automated systems can embed and scale errors; a systematic error in eligibility criteria affects all cases simultaneously rather than being caught through individual review.",
      "§ 35a VwVfG already provides for automated decisions but agencies can opt out; without stronger mandate, adoption will remain patchy.",
      "Cybersecurity: automated approval systems are attractive targets for fraud if authentication and input validation are insufficient.",
      "Citizens who fall outside standard parameters may be incorrectly denied if the human escalation pathway is not well designed.",
    ],
    tradeoffs: [
      "Efficiency vs. individual justice: automation removes the opportunity for administrative discretion that may benefit edge cases.",
      "Standardisation vs. contextual judgment: the pressure to automate may cause agencies to simplify criteria artificially, excluding legitimate cases.",
    ],
    kpis: [
      { metric: "Share of eligible administrative decisions processed fully automatically", baseline: "~8 %", target: "40 % within 3 years" },
      { metric: "Average processing time for auto-eligible cases", baseline: "6 weeks", target: "<24 hours" },
      { metric: "Error rate in automated decisions vs. manual benchmark", baseline: "unknown", target: "Within 10 % of manual error rate" },
      { metric: "Number of decision types formally classified as automatable under § 35a VwVfG", baseline: "~15", target: "80" },
    ],
    sources: ["bertelsmann-2024-verwaltungsdigitalisierung", "mckinsey-2023-germany-productivity", "svr-2023-jahresgutachten"],
    counterarguments: [
      "The share of truly discretion-free decisions is smaller than proponents claim; most administrative decisions involve implicit judgment that is difficult to codify without producing unjust outcomes.",
      "§ 35a VwVfG has existed since 2017 with very low uptake — this reveals structural barriers (liability concerns, union resistance, IT procurement rules) that a policy mandate cannot easily overcome.",
    ],
    openQuestions: [
      "What is the empirically derived share of decisions across each major agency that are genuinely objective and meet the § 35a criteria?",
      "How should escalation to human review be triggered — by the citizen, by an algorithm flagging uncertainty, or both?",
      "What audit and oversight mechanism is required to detect and correct systematic errors in automated decisions?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "An audit of existing automated decisions under § 35a finding error rates within acceptable range and no systematic bias against protected groups.",
        "A mapping exercise demonstrating that >30 % of all administrative decisions across federal agencies meet the objective-criteria threshold.",
      ],
      decreaseConfidence: [
        "Evidence that automated decisions in comparable systems systematically disadvantage lower-income or less digitally literate applicants.",
      ],
      abandonRecommendation: [
        "A major systemic error in an automated decision system causing significant harm at scale (e.g., mass wrongful denials of social benefits) that takes years to identify and remedy.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  // ─── HOUSING ─────────────────────────────────────────────────────────────────

  {
    id: "standardised-building-regs",
    title: "Federal Standard Building Type Catalogue",
    shortDescription:
      "A national catalogue of pre-approved building types that, once type-approved federally, can be constructed without repeating structural and fire safety review at the local level.",
    domain: "housing",
    problem:
      "Germany has 16 different Landesbauordnungen with material differences in requirements for ceiling height, fire protection, staircase design, thermal insulation, and accessibility. A developer building across states must obtain separate structural and fire safety approvals in each, even for identical buildings. This creates enormous redundancy and raises construction costs by an estimated 15–25 % relative to a unified type approval regime.",
    objective:
      "Enable developers to obtain federal type approval for a building design recognised in all Länder, with local permitting reduced to site-specific matters. Target a 30 % reduction in average permitting time and 10–15 % reduction in per-unit construction cost for type-approved buildings.",
    intervention:
      "Federal framework legislation (using Art. 72 GG concurrent legislative competence or a Staatsvertrag) establishing a 'Bundesgebäudetyp' category. Federal type approval covers structural integrity, fire safety, thermal performance, and accessibility. Länder retain site-specific permitting. Create a public catalogue of approved types, including affordable multi-family designs usable royalty-free.",
    status: "researching",
    evidenceStrength: "medium",
    expectedImpact: 4,
    implementationDifficulty: 5,
    estimatedCost: "low",
    timeToImpact: "medium",
    confidence: 0.6,
    affectedGroups: ["housing developers", "construction companies", "local planning authorities", "future tenants and homeowners", "architects"],
    internationalExamples: [
      {
        country: "Finland",
        description:
          "Finland's National Building Code is uniform nationally. Type approval (Tyyppihyväksyntä) allows pre-certified building components and designs to bypass element-level review.",
        outcome:
          "Finland has among the lowest construction costs per square metre in northern Europe. Housing supply has been more responsive to demand than Germany or the UK.",
      },
      {
        country: "Japan",
        description:
          "Japan's Building Standards Law provides for national type approval (型式承認); over 200 pre-approved residential building types are available. Housing manufacturers build at industrial scale using approved types.",
        outcome:
          "Japan's housing construction is faster and cheaper per unit than all G7 peers. Pre-approved types account for a significant share of new single-family construction.",
      },
      {
        country: "Netherlands",
        description:
          "The Netherlands' Wabo unified permit system reduced the number of separate permits required from 5+ to 1, with more standardised requirements under Woningwet.",
        outcome:
          "Permitting time fell by approximately 30 % after Wabo introduction. The Netherlands ranks significantly above Germany on World Bank construction permit indicators.",
      },
    ],
    risks: [
      "Local context matters: standardised types may not be appropriate for all soil conditions, heritage contexts, or climate zones.",
      "Länder constitutional autonomy in building regulation is well-established; federal override would face significant political and potentially legal resistance.",
      "A public catalogue of free designs may undermine the business model of architects and reduce design quality.",
      "Type approval could lock in today's standards, making it harder to update requirements as energy efficiency or accessibility norms evolve.",
    ],
    tradeoffs: [
      "Standardisation vs. local fit: types designed to national standards may be inappropriate in specific local contexts.",
      "Speed and cost vs. architectural quality: type-approved buildings optimise for efficiency but may reduce neighbourhood diversity.",
      "Federal authority vs. Länder sovereignty: the mechanism for achieving harmonisation is politically contentious.",
    ],
    kpis: [
      {
        metric: "Average time from full planning application to building permit using type-approved design",
        baseline: "14.5 months",
        target: "5 months",
      },
      { metric: "Construction cost per sqm for type-approved multi-family buildings vs. bespoke", baseline: "n/a", target: "15 % lower" },
      { metric: "Number of federal type approvals in catalogue", baseline: "0", target: "50 within 3 years" },
      { metric: "Share of new residential units built using type-approved designs", baseline: "0 %", target: "20 % within 5 years" },
    ],
    sources: ["diw-2023-wohnungsmarkt", "world-bank-2023-business-regs"],
    counterarguments: [
      "The diversity of German building codes reflects genuine local differences in risk, climate, and heritage — a single national standard would be inappropriately uniform.",
      "The construction cost problem is driven by labour costs, material costs, and land prices — not building regulations — so this reform addresses the wrong bottleneck.",
      "Länder will not agree to a Staatsvertrag on building standards; the political economy makes this one of the hardest housing reforms.",
    ],
    openQuestions: [
      "Is Art. 72 GG sufficient as a legal basis for federal building type approval, or is a Grundgesetz amendment required?",
      "How should the type catalogue be updated as energy efficiency standards (GEG) evolve — can existing approvals be grandfathered?",
      "What is the minimum set of Länder needed in a Staatsvertrag for the benefits to be commercially meaningful for developers?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "A Staatsvertrag signed by at least 6 major Länder representing >60 % of the new housing market.",
        "A legal opinion confirming that federal type approval covering structural and fire safety is compatible with the existing distribution of legislative competence.",
      ],
      decreaseConfidence: [
        "Evidence from Japan or Finland that type approval primarily benefits large industrial builders and entrenches oligopolistic market structures without meaningful cost reductions for end buyers.",
        "Cost analysis showing that the main drivers of high German construction costs are labour and materials, with regulatory complexity accounting for <5 % of variance.",
      ],
      abandonRecommendation: [
        "A Federal Constitutional Court ruling that federal building type approval impermissibly encroaches on Länder building code competence.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  {
    id: "digital-permitting",
    title: "Fully Digital Building Permitting with Binding Timelines",
    shortDescription:
      "End-to-end digital submission, review, and decision for all building permits, with statutory decision deadlines and a real-time status-tracking portal.",
    domain: "housing",
    problem:
      "The majority of German building permit applications are still submitted on paper or as PDFs by email, requiring manual data entry by planning officials. Inter-departmental consultations are conducted via physical post or informal email chains with no tracking. Applicants have no visibility into where their application stands. Average processing times of 14.5 months are partly attributable to workflow inefficiencies rather than substantive review complexity.",
    objective:
      "Reduce average building permit processing time by 40 % through digitisation of workflow, automatic routing to relevant departments, and binding statutory deadlines. Provide applicants real-time status visibility.",
    intervention:
      "Mandate a national digital building permit platform (interoperable with existing solutions in Hamburg, Bavaria, and NRW). Require all permit submissions to be electronic from a fixed date. Auto-route applications to relevant statutory consultees with tracked response deadlines. Publish decision times by municipality to create accountability pressure.",
    status: "pilot",
    evidenceStrength: "medium",
    expectedImpact: 3,
    implementationDifficulty: 3,
    estimatedCost: "medium",
    timeToImpact: "short",
    confidence: 0.68,
    affectedGroups: ["property developers", "self-builders", "architects", "municipal planning staff", "statutory consultees"],
    internationalExamples: [
      {
        country: "Estonia",
        description:
          "ehitisregister.ris.ee provides a fully digital, nationally unified building permit system. All permits, inspections, and final acceptances are conducted electronically.",
        outcome: "Average permitting time 2–4 months. All permits publicly searchable; status visible to applicants in real time.",
      },
      {
        country: "Singapore",
        description:
          "CORENET X provides a national digital permitting platform with BIM-based automated compliance checking. Applicants receive automated pre-validation before submission.",
        outcome:
          "Automated plan checking identifies ~40 % of common non-compliance issues before human review, reducing back-and-forth iterations. Singapore ranks 1st globally on construction permit efficiency.",
      },
      {
        country: "United Kingdom",
        description:
          "England's Planning Portal is a national digital submission platform used by ~90 % of local planning authorities. PlanX (open source) is being deployed for automated pre-application checks.",
        outcome:
          "Digital submission reduced average application processing time by ~15 % and administrative error rates by ~20 % in participating authorities.",
      },
    ],
    risks: [
      "Municipalities lack the IT capacity and procurement expertise to integrate with a national platform; integration costs may be underestimated.",
      "Digitisation of a broken process does not fix the underlying workflow problems; a digital queue is still a queue.",
      "Mandatory electronic submission may disadvantage applicants without digital skills or access, particularly in rural areas.",
    ],
    tradeoffs: [
      "National standardisation vs. local flexibility: municipalities with well-functioning local systems may incur costs switching to a national platform.",
      "Automation of compliance checks vs. professional judgment: algorithmic pre-checking may miss context-specific issues.",
    ],
    kpis: [
      { metric: "Share of building permit applications submitted digitally", baseline: "~30 %", target: "100 % within 2 years" },
      { metric: "Average building permit processing time", baseline: "14.5 months", target: "8 months" },
      { metric: "Share of municipalities publishing decision-time statistics publicly", baseline: "<5 %", target: "100 %" },
    ],
    sources: ["diw-2023-wohnungsmarkt", "bertelsmann-2024-verwaltungsdigitalisierung", "world-bank-2023-business-regs"],
    counterarguments: [
      "Digitisation is a secondary problem; the primary constraint is planning authority staffing levels, which no digital tool resolves.",
      "Multiple German Länder already have digital permitting platforms; a national mandate would disrupt working solutions and impose transition costs for uncertain gains.",
    ],
    openQuestions: [
      "Should Germany build a new national platform or federate existing Länder solutions through a common API standard?",
      "How should automated BIM-based compliance checking be introduced given the professional liability framework for building designers?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "An evaluation of Hamburg's or Bavaria's existing digital platforms showing significant processing time reduction attributable to workflow digitisation rather than other factors.",
      ],
      decreaseConfidence: [
        "Analysis showing that processing time variation across German municipalities is primarily explained by staffing ratios, not workflow technology.",
      ],
      abandonRecommendation: [
        "Evidence from UK Planning Portal that digital submission at scale did not reduce processing times and imposed significant costs on smaller authorities.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  {
    id: "transit-density",
    title: "Higher-Density Development Rights Around Transit Nodes",
    shortDescription:
      "Grant automatic upzoning (higher permitted density and reduced parking minimums) within defined radii of rail, S-Bahn, and U-Bahn stations.",
    domain: "housing",
    problem:
      "German urban areas are characterised by large single-family zones within walking distance of high-capacity transit stations. Zoning in these areas typically restricts density to 1–2 storeys and requires minimum parking provision, making higher-density residential development legally impossible without individual re-zoning processes that take years. This misaligns land use with infrastructure investment and suppresses housing supply in locations where residents would be least car-dependent.",
    objective:
      "Unlock residential density in the highest-accessibility locations without requiring case-by-case re-zoning. Target an additional 400,000 housing units enabled in existing transit-accessible urban areas over 10 years.",
    intervention:
      "Federal amendment to the Baugesetzbuch (BauGB) creating a 'Transitzone' category: within 500 m of a rail station with at least 4 trains per hour, residential development up to 4–6 storeys is permitted as of right, with parking minimum reductions of 50–75 %. Municipalities retain design guidelines (Gestaltungssatzung) but cannot refuse density-conforming applications on grounds of neighbourhood character.",
    status: "researching",
    evidenceStrength: "high",
    expectedImpact: 5,
    implementationDifficulty: 5,
    estimatedCost: "low",
    timeToImpact: "long",
    confidence: 0.65,
    affectedGroups: ["existing homeowners near stations", "future tenants", "developers", "municipalities", "transit operators"],
    internationalExamples: [
      {
        country: "New Zealand",
        description:
          "The National Policy Statement on Urban Development (2020) and the Medium Density Residential Standards (2021) required cities to permit 3-storey as-of-right development across most urban areas, with higher density near frequent transit.",
        outcome:
          "Auckland consented more housing in the two years after reform than in the previous decade. A causal study estimated a 4 % rent reduction attributable to the reform.",
      },
      {
        country: "Japan",
        description:
          "Japan's use-zone system is set nationally with local discretion within national bands. Station-area commercial zones effectively allow high-density residential development by right.",
        outcome:
          "Tokyo adds more housing annually than the entire UK despite being a larger, denser city. Housing costs relative to income are lower in Tokyo than in London or Munich.",
      },
      {
        country: "United States (California)",
        description:
          "SB 9/SB 10 (2021) upzoned areas near transit statewide, curtailing local governments' ability to block density near transit.",
        outcome:
          "Early research finds significant increases in permit applications in upzoned areas. Full housing supply effects will take 5–10 years to materialise.",
      },
    ],
    risks: [
      "Existing homeowners near stations face negative amenity effects without direct compensation.",
      "Infrastructure capacity (schools, water, sewage) in transit-adjacent areas may not support rapid densification without complementary investment.",
      "Transit operators may face overcrowding if densification outpaces service capacity expansion.",
      "Political resistance from existing homeowners is intense and well-organised.",
    ],
    tradeoffs: [
      "Supply increase vs. neighbourhood amenity: denser development benefits future residents and renters but imposes costs on current owners.",
      "Federal mandate vs. municipal autonomy: overriding local zoning decisions conflicts with the German tradition of kommunale Selbstverwaltung.",
      "Speed of permitting vs. infrastructure readiness: upzoning faster than infrastructure can be upgraded creates livability problems.",
    ],
    kpis: [
      {
        metric: "Number of additional housing units enabled in transit zones (planning consents issued)",
        baseline: "0 (new regime)",
        target: "100,000 within 5 years",
      },
      { metric: "Average rent growth in major metropolitan areas (vs. trend)", baseline: "~4 % per year nominal", target: "Below 2 % per year nominal" },
      { metric: "Share of new housing units within 500 m of frequent transit", baseline: "~35 %", target: "55 %" },
    ],
    sources: ["diw-2023-wohnungsmarkt", "oecd-2023-germany-econ-survey", "world-bank-2023-business-regs"],
    counterarguments: [
      "Germany's transit networks are already overcrowded; densification without transit capacity investment worsens service quality.",
      "The international evidence (NZ, California) is too recent to evaluate long-run supply effects; the political economy in Germany may be more hostile.",
      "Municipal self-government (kommunale Planungshoheit) may be constitutionally protected against a federal as-of-right zoning override.",
    ],
    openQuestions: [
      "Is a BauGB amendment sufficient for an as-of-right override, or does it require a Grundgesetz amendment?",
      "How should the transit frequency threshold be defined to avoid perverse incentives (municipalities reducing service frequency to escape upzoning)?",
      "What complementary infrastructure investment programme is needed to prevent densification from degrading school and utility provision?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "A legal opinion confirming that a BauGB amendment creating as-of-right transit-zone density is compatible with Art. 28(2) GG.",
        "Five-year evaluation of New Zealand's Medium Density Residential Standards showing statistically significant rent reduction and no significant infrastructure failure.",
      ],
      decreaseConfidence: [
        "Analysis of Tokyo's housing market showing that low costs are attributable primarily to cultural homeownership patterns rather than zoning liberalisation.",
      ],
      abandonRecommendation: [
        "A Federal Constitutional Court ruling that federal as-of-right zoning overrides violate the constitutional guarantee of kommunale Selbstverwaltung.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  // ─── LABOUR ──────────────────────────────────────────────────────────────────

  {
    id: "marginal-tax-reform",
    title: "Reform of Effective Marginal Tax Rates at Low and Middle Income Thresholds",
    shortDescription:
      "Redesign the interaction between income tax, social contributions, and benefit withdrawal rates to eliminate effective marginal tax rate spikes that deter low and middle earners from increasing hours.",
    domain: "labour",
    problem:
      "Germany's combination of income tax progression, social contribution thresholds (mini-job, midi-job), and means-tested benefit withdrawal (Bürgergeld, Wohngeld, Kinderzuschlag) creates effective marginal tax rates of 70–100 % for certain income brackets. For a single parent moving from 20 to 30 hours of work, the combination of taxes, contributions, and benefit withdrawal can mean retaining only 5–10 cents of each additional euro earned. This is a major supply-side drag particularly affecting women, single parents, and low-skilled workers.",
    objective:
      "Reduce effective marginal tax rates in the €520–€2,000 monthly income range to no more than 65 % for any household type. Increase aggregate labour supply by 1–3 % (approximately 400,000–1,200,000 FTE equivalent hours) within five years.",
    intervention:
      "Phased reform of the mini-job cliff (abolishing the €520 threshold in favour of a smooth contribution phase-in already partially implemented by the midi-job reform), coordinated with reform of benefit withdrawal rates to cap combined EMTRs. Revenue-neutral package financed by broadening the income tax base and modest top-rate adjustments.",
    status: "evidence-supported",
    evidenceStrength: "high",
    expectedImpact: 5,
    implementationDifficulty: 4,
    estimatedCost: "medium",
    timeToImpact: "medium",
    confidence: 0.75,
    affectedGroups: [
      "mini-job workers (predominantly women)",
      "single parents",
      "Bürgergeld recipients returning to work",
      "low-skilled workers",
      "social insurance systems",
    ],
    internationalExamples: [
      {
        country: "United Kingdom",
        description:
          "Universal Credit consolidated six means-tested benefits into a single withdrawal taper of 55p per pound of earnings (post 2021 reform from 63p), with a work allowance before withdrawal begins.",
        outcome:
          "The 2021 taper rate reduction was estimated to take 200,000 people off welfare and into increased hours. Labour supply response was larger than Treasury forecast.",
      },
      {
        country: "Denmark",
        description:
          "Denmark uses a smooth interaction between income tax, labour market contributions, and benefits with no cliff-edges comparable to Germany's mini-job threshold.",
        outcome:
          "Denmark achieves a female labour force participation rate of 76 % vs. Germany's 73 %, with a much higher share in full-time equivalents. The absence of institutional part-time traps is partly credited.",
      },
      {
        country: "Sweden",
        description:
          "Sweden's jobbskatteavdrag (earned income tax credit) creates a significant financial incentive for moving from unemployment or part-time to full-time employment, particularly for lower-income workers.",
        outcome:
          "Sweden's employment rate is consistently 4–6 percentage points above Germany's. The earned income credit is estimated to account for 1–2 percentage points of this gap.",
      },
    ],
    risks: [
      "Revenue cost: a reduction in effective marginal rates for lower incomes requires either higher rates elsewhere or reduced public spending.",
      "Mini-job abolition would disrupt the employment models of many service-sector businesses that rely on flexible, low-commitment labour.",
      "Reform complexity: the interaction between federal tax law, social contribution law, and Länder-administered benefits makes coordinated reform administratively very challenging.",
      "Labour supply response may be concentrated in hours rather than new workers, meaning GDP gains are real but employment rate statistics are less affected.",
    ],
    tradeoffs: [
      "Labour supply vs. social protection: reducing benefit withdrawal rates costs more in benefits paid to workers who would have returned to work anyway.",
      "Tax simplification vs. targeted support: a smooth marginal rate schedule treats all workers equally, which may be less protective of specific vulnerabilities.",
      "Work incentives vs. work-family balance: higher effective wages for working longer hours may reduce time available for care, with costs borne unequally by women.",
    ],
    kpis: [
      {
        metric: "Maximum effective marginal tax rate in the €520–€2,000 monthly income range",
        baseline: "~95 % for some household types",
        target: "<65 % for all household types",
      },
      { metric: "Female full-time equivalent employment rate", baseline: "55 %", target: "60 %" },
      { metric: "Share of mini-job workers expressing desire to increase hours (blocked by tax/benefit design)", baseline: "~40 %", target: "<15 %" },
      { metric: "Net fiscal cost of reform after labour supply response (€ bn/year)", baseline: "n/a", target: "Revenue-neutral within 5 years" },
    ],
    sources: ["iza-2024-marginal-tax", "oecd-2023-germany-econ-survey", "imf-2024-germany-article-iv", "diw-2024-rentenreform"],
    counterarguments: [
      "Mini-jobs serve an important social function for students, retirees, and carers who genuinely want flexible, low-commitment work; eliminating the cliff penalises them.",
      "The effective marginal tax rate problem is well-documented but the labour supply response to its reform is uncertain — the IZA evidence is based on bunching estimates, which may not translate to actual hours increases.",
      "The social insurance system is financed partly by the current contribution structure; smoothing contributions increases long-run fiscal risk.",
    ],
    openQuestions: [
      "What is the correct unit of measurement — individual or household — for assessing effective marginal tax rates given joint taxation (Ehegattensplitting)?",
      "Is Ehegattensplitting reform a necessary complement to mini-job reform, or does mini-job reform have meaningful labour supply effects independently?",
      "How large is the fiscal cost before behavioural response, and over what time horizon do labour supply gains offset it?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "A randomised controlled trial or natural experiment in Germany showing that removal of a contribution threshold leads to statistically significant hour increases within 12 months.",
        "UK Universal Credit evaluation demonstrating that the 2021 taper reform increased earnings (not just hours) for low-income households at scale.",
      ],
      decreaseConfidence: [
        "Analysis showing that the mini-job threshold increase in 2022 (from €450 to €520) produced no measurable change in hours or employment among affected workers.",
        "Fiscal modelling showing that the net revenue cost of EMTR reform exceeds €10 bn annually with a labour supply response too small to offset it within 10 years.",
      ],
      abandonRecommendation: [
        "Evidence that the majority of mini-job workers have strong revealed preferences for the current arrangement rather than facing a constrained choice.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  {
    id: "post-retirement-employment",
    title: "Remove Tax and Contribution Disincentives for Employment After Pension Age",
    shortDescription:
      "Allow retirees to work and earn without losing pension entitlements or incurring disproportionate social contribution burdens, increasing labour supply from a willing cohort.",
    domain: "labour",
    problem:
      "German retirees who wish to continue working face a combination of pension ceilings (Hinzuverdienstgrenzen), full social contribution liability on earnings, and marginal income tax rates that result in effective marginal rates of 70–90 % on post-retirement earnings. This creates a strong disincentive for retirees — who are experienced, motivated workers — to remain in or return to employment. With Germany's workforce shrinking by an estimated 400,000 annually due to demographic change, foregoing this labour supply is costly.",
    objective:
      "Remove the structural disincentives to post-retirement employment so that retirees who wish to work face effective marginal rates comparable to other workers in the same income range. Target an increase of 100,000–200,000 FTE equivalents from retirees within five years.",
    intervention:
      "Abolish remaining Hinzuverdienstgrenzen (partially done in 2023; complete the reform). Exempt post-retirement employment income from employee-side pension contribution liability (since no further pension entitlement accrues). Allow voluntary continued employer-side contributions to build supplementary pension entitlement as an incentive rather than a burden.",
    status: "evidence-supported",
    evidenceStrength: "medium",
    expectedImpact: 3,
    implementationDifficulty: 2,
    estimatedCost: "low",
    timeToImpact: "short",
    confidence: 0.7,
    affectedGroups: [
      "retirees of working age (60–75)",
      "employers in skilled trades and healthcare",
      "pension insurance system",
      "healthcare and long-term care systems",
    ],
    internationalExamples: [
      {
        country: "Sweden",
        description:
          "Sweden's NDC pension system allows fully flexible partial or full retirement with no ceiling on concurrent earnings. The pension is actuarially adjusted but not penalised for work.",
        outcome: "Sweden has a labour force participation rate for 60–64 year olds of ~75 % vs. ~60 % in Germany. The gap is partly attributed to Sweden's neutral incentive structure.",
      },
      {
        country: "Japan",
        description:
          "Japan reformed its partial pension system to remove earnings ceilings for those above full pension age. Significant employer-side campaigns to retain experienced workers.",
        outcome: "Japan's 65–69 age group employment rate is 50 % vs. 18 % in Germany. Post-retirement employment is normalised across white and blue collar occupations.",
      },
      {
        country: "United Kingdom",
        description:
          "UK state pension claimants face no earnings limit. National Insurance contributions cease at state pension age. Income tax applies normally but no pension-specific penalty.",
        outcome:
          "UK's 65–74 employment rate has risen from 8 % in 2000 to 14 % in 2023. Fiscal assessment shows the NI exemption is more than offset by income tax receipts from increased employment.",
      },
    ],
    risks: [
      "If post-retirement employment becomes a dominant part of the low-skilled labour market, it may suppress wages for young workers competing in the same segments.",
      "Removing contribution liability for retirees creates a category of worker with lower non-wage costs, potentially distorting employer hiring choices away from younger workers.",
      "The fiscal impact on the pension insurance system of eliminating mandatory contributions from retirees needs careful actuarial modelling.",
    ],
    tradeoffs: [
      "Labour supply from older workers vs. youth employment opportunities: crowding-out effects exist but are likely modest given different skill profiles.",
      "Individual freedom to work vs. protecting pension system finances: reduced contribution income must be offset elsewhere.",
    ],
    kpis: [
      { metric: "Employment rate for 65–70 age group", baseline: "~12 %", target: "20 % within 5 years" },
      {
        metric: "Share of retirees reporting they would work more if financial incentives were better (survey)",
        baseline: "~35 %",
        target: "measurement benchmark",
      },
      {
        metric: "Net fiscal impact of reform (contribution revenue lost minus income tax gained plus reduced social care pressure)",
        baseline: "unknown",
        target: "Positive within 10 years",
      },
    ],
    sources: ["diw-2024-rentenreform", "iza-2024-marginal-tax", "bundesbank-2024-fachkraeftemangel", "imf-2024-germany-article-iv"],
    counterarguments: [
      "The 2023 Hinzuverdienstgrenze abolition was a significant step; the remaining disincentives are smaller and the additional labour supply response may be limited.",
      "Retirees who wish to work already do so; the constraint is more about health, caring responsibilities, and employer attitudes than tax design.",
      "Extending working life through financial incentives benefits higher-skilled retirees and may pressure lower-skilled retirees who lack comfortable retirement alternatives.",
    ],
    openQuestions: [
      "What is the net actuarial impact on the statutory pension system of exempting retirees from employee-side contributions?",
      "Is there evidence of crowding-out of younger workers in the specific occupations where retiree retention is most common?",
      "What complementary measures (workplace adaptation, flexible hours, health support) are needed to translate changed incentives into actual employment?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "A difference-in-differences study of the 2023 Hinzuverdienstgrenze reform showing a statistically significant increase in post-retirement employment hours within 12 months.",
        "UK or Swedish data demonstrating that post-retirement employment growth did not depress wages or employment rates for workers aged 25–40 in the same sectors.",
      ],
      decreaseConfidence: [
        "Survey evidence showing that the dominant reason German retirees do not work is health, caring responsibilities, or employer attitudes — factors not changed by financial reform.",
      ],
      abandonRecommendation: [
        "Evidence that post-retirement employment predominantly displaces young workers in vulnerable labour market segments, with no net increase in aggregate employment.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  // ─── MIGRATION ────────────────────────────────────────────────────────────────

  {
    id: "fast-track-skilled-migration",
    title: "30-Day Fast-Track Processing for In-Demand Skilled Occupations",
    shortDescription:
      "Create a dedicated, fully-resourced fast-track visa and recognition pathway for workers in shortage occupations with pre-verified qualifications, with a statutory 30-day decision guarantee.",
    domain: "migration",
    problem:
      "Germany's skilled migration system still produces average processing times of 4–7 months from visa application to work start, compared to 2–3 weeks for Canada's Express Entry and 3–4 weeks for the UK Skilled Worker visa. Germany also requires domestic qualification recognition before a visa can be issued for many professions, creating a sequencing problem: applicants cannot get recognition without being in Germany, and cannot get a visa without recognition.",
    objective:
      "Reduce time from complete application to work commencement to 30 days for defined shortage occupations. Increase net skilled migration by 40,000–80,000 per year above current trajectory.",
    intervention:
      "Create a Mangelberuf Fast-Track unit within BAMF with dedicated staff and an SLA guarantee. Accept pre-verification from approved assessment centres in source countries. Allow provisional employment to begin within 30 days with post-entry recognition running in parallel. Establish bilateral pre-verification agreements with top 10 source countries.",
    status: "researching",
    evidenceStrength: "medium",
    expectedImpact: 5,
    implementationDifficulty: 3,
    estimatedCost: "medium",
    timeToImpact: "short",
    confidence: 0.72,
    affectedGroups: [
      "skilled foreign workers",
      "German employers in shortage sectors",
      "BAMF staff",
      "foreign qualification recognition authorities",
      "existing migrant communities",
    ],
    internationalExamples: [
      {
        country: "Canada",
        description:
          "Express Entry uses a Comprehensive Ranking System to invite high-scoring candidates from a pool. From invitation to permanent residence takes ~6 months; work permit can be issued within weeks of a job offer.",
        outcome:
          "Canada admits ~400,000 permanent residents per year, maintaining workforce growth despite low birth rates. Employer satisfaction with skilled immigration is among the highest in the OECD.",
      },
      {
        country: "Australia",
        description:
          "Skilled Nominated and Employer Sponsored streams use occupation lists with dedicated processing teams. Employer-sponsored visas average 2–3 months end-to-end.",
        outcome:
          "Australia has managed to maintain skill-mix in immigration while running large absolute volumes. Healthcare and construction shortages have been partially addressed through targeted migration.",
      },
      {
        country: "United Kingdom",
        description:
          "Skilled Worker visa uses a salary threshold and occupation list. UKVI processes 80 % of straightforward applications within 3 weeks.",
        outcome:
          "UK net migration reached record levels partly through Skilled Worker visa expansion. Healthcare shortage occupation cases processed within 2–3 weeks for most applicants.",
      },
    ],
    risks: [
      "A 30-day guarantee with inadequate staffing is not credible; political announcements without operational resourcing would damage trust further.",
      "Bilateral pre-verification agreements create fraud risk if source country assessment centres have inadequate quality standards.",
      "Fast-tracking creates a two-tier system; applicants from non-agreement countries face unchanged delays, creating inequity and diplomatic friction.",
      "Rapid inflows in specific occupations may suppress wages in those sectors.",
    ],
    tradeoffs: [
      "Speed vs. verification rigour: faster processing requires accepting greater ex-ante risk of credential fraud, managed by post-entry audit.",
      "Shortage occupation focus vs. generalist system: a narrow fast-track optimises for current shortages but may not be adaptive to future skill needs.",
    ],
    kpis: [
      {
        metric: "Median processing time (application to work commencement) for shortage occupation applicants",
        baseline: "~5 months",
        target: "30 days",
      },
      { metric: "Net skilled migration in shortage occupations per year", baseline: "~60,000", target: "120,000" },
      { metric: "Share of shortage occupation applications processed within SLA guarantee", baseline: "n/a", target: "90 %" },
      { metric: "Employer satisfaction with skilled migration processing (survey)", baseline: "~35 % satisfied", target: "70 % satisfied" },
    ],
    sources: ["ifo-2024-fachkraeftezuwanderung", "bundesbank-2024-fachkraeftemangel"],
    counterarguments: [
      "Processing time is not the binding constraint for most skilled migrants; qualification recognition and language requirements are harder barriers that a fast-track unit cannot resolve.",
      "Germany's housing shortage means that even if migrants arrive faster, integration fails because they cannot afford accommodation, leading to high dropout and return rates.",
      "Bilateral agreements with source countries create diplomatic complexity and may be reciprocally conditioned on other concessions.",
    ],
    openQuestions: [
      "Which specific occupations should be in the initial Mangelberuf Fast-Track list, and what governance process ensures the list remains current?",
      "What is the minimum staffing for a BAMF Fast-Track unit to guarantee a 30-day SLA at projected volume, and what is the cost?",
      "How should the system handle applicants whose qualifications are conditionally recognised — can they work under supervision while full recognition is pending?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "A pilot fast-track unit for IT professionals showing that 30-day processing increases application volume by >30 % without a measurable increase in credential fraud.",
        "UK Skilled Worker data showing that the 3-week SLA is consistently met and has increased applications from shortage occupation candidates.",
      ],
      decreaseConfidence: [
        "Survey of foreign skilled workers showing that processing time ranks below language requirements, housing, and social integration as barriers to choosing Germany.",
        "BAMF operational assessment showing that a credible 30-day SLA would require >2,000 additional FTE and cannot be hired and trained within 2 years.",
      ],
      abandonRecommendation: [
        "Evidence that faster visa processing leads to higher dropout rates because integration barriers — not entry barriers — are the binding constraint.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  {
    id: "asylum-processing-speed",
    title: "Digitalised, Centralised Asylum Processing with Binding Decision Timelines",
    shortDescription:
      "Redesign the asylum procedure around digital-first case management, centralised initial processing, and statutory decision timelines, reducing average processing time from 9 months to under 3 months.",
    domain: "migration",
    problem:
      "Germany's asylum processing system is geographically fragmented, paper-intensive, and chronically slow. Average time from initial application to first-instance decision is approximately 9 months; appeals can extend proceedings to 3–5 years. During this period, applicants are housed at public expense and face restricted labour market access. The pending backlog reached 350,000+ cases in 2024. The system is inefficient for applicants with strong claims (who wait unnecessarily) and for the state (which bears prolonged accommodation and administration costs).",
    objective:
      "Reduce time to first-instance BAMF decision to a median of 90 days. Reduce the pending backlog by 60 % within two years. Enable faster labour market integration for those likely to receive protection.",
    intervention:
      "Centralise initial registration and biometric screening at 10–12 AnkER-Zentrum facilities with consistent digital case management. Mandate electronic case files from day one. Use algorithmic pre-screening to route cases by complexity. Introduce binding 90-day deadline for simple cases and 6-month deadline for complex cases with judicial oversight of extensions.",
    status: "pilot",
    evidenceStrength: "medium",
    expectedImpact: 3,
    implementationDifficulty: 4,
    estimatedCost: "medium",
    timeToImpact: "short",
    confidence: 0.6,
    affectedGroups: [
      "asylum seekers",
      "BAMF staff",
      "administrative courts",
      "NGOs providing legal support",
      "Länder accommodation systems",
      "municipalities",
    ],
    internationalExamples: [
      {
        country: "Netherlands",
        description:
          "The Netherlands' IND uses a case complexity classification system to stream straightforward cases through a 5-day 'general procedure' track. Complex cases go to an extended procedure.",
        outcome:
          "The 5-day track resolves a significant share of straightforward cases quickly, though the system has faced criticism when accelerated procedures missed nuanced protection needs.",
      },
      {
        country: "Denmark",
        description:
          "Denmark's fast-track asylum system targets 3-month decisions for applications from safe countries of origin, with near-simultaneous appeal processing.",
        outcome:
          "Denmark processes applications among the fastest in the EU. Processing speed itself is not disputed; acceptance rates reflect stricter criteria.",
      },
      {
        country: "United Kingdom",
        description:
          "The UK's Streamlined Asylum Processing (SAP, 2023) attempts to clear the backlog through a simplified evidence-gathering process for certain nationalities with high grant rates.",
        outcome:
          "SAP cleared significant backlog but was criticised for quality concerns; several decisions were challenged on inadequacy of individual assessment. Lessons on the quality-speed balance are directly relevant.",
      },
    ],
    risks: [
      "Faster processing without adequate decision quality risks wrongful rejections overturned on appeal, costing more in total system time than a slower but higher-quality first decision.",
      "Algorithmic routing of complex cases may encode biases related to nationality.",
      "Centralised AnkER facilities create large concentrations of vulnerable people in institutional settings, raising safeguarding and integration concerns.",
      "Shorter processing time reduces time for gathering supporting evidence; applicants with strong cases that are harder to document quickly may be disadvantaged.",
    ],
    tradeoffs: [
      "Processing speed vs. decision quality: a faster system that produces more errors is not superior to a slower system with higher quality.",
      "Centralisation efficiency vs. geographic distribution for integration: centralised processing delays integration into local communities.",
    ],
    kpis: [
      { metric: "Median time from registration to first-instance BAMF decision", baseline: "~9 months", target: "90 days" },
      { metric: "BAMF pending case backlog", baseline: "~350,000", target: "<140,000 within 2 years" },
      { metric: "Administrative court reversal rate of BAMF decisions", baseline: "~30 %", target: "<25 % (quality preservation)" },
      { metric: "Share with recognised protection who have legal work access within 6 months", baseline: "~40 %", target: "80 %" },
    ],
    sources: ["ifo-2024-fachkraeftezuwanderung", "bundesbank-2024-fachkraeftemangel"],
    counterarguments: [
      "The asylum backlog is a staffing and resourcing problem, not a process design problem; BAMF has been chronically understaffed relative to case volume.",
      "Speed targets create perverse incentives for decision-makers to reject uncertain cases rather than invest time gathering evidence.",
      "The AnkER model has been operating in some Länder since 2018 with mixed results; there is limited evidence that centralisation alone improves processing times at scale.",
    ],
    openQuestions: [
      "What is the minimum BAMF staffing level to achieve 90-day medians at current or projected application volumes?",
      "How should the algorithmic routing tool be audited for bias, and who is responsible for its governance?",
      "At what point in the procedure should labour market access be granted to reduce the cost of processing delays?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "An operational study of AnkER-Zentren showing that centrally-processed cases have shorter total system times (including appeals) than decentrally-processed cases without worse decision quality.",
      ],
      decreaseConfidence: [
        "UK SAP evaluation showing that processing speed increases led to a statistically significant rise in wrongful rejections that were corrected on appeal, increasing total system costs.",
      ],
      abandonRecommendation: [
        "Evidence that a 90-day binding deadline systematically disadvantages applicants from countries where documentation is difficult to obtain quickly, violating EU asylum procedure minimum standards.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  // ─── INNOVATION ───────────────────────────────────────────────────────────────

  {
    id: "startup-equity",
    title: "Reform Employee Equity Taxation to Match UK/US Models",
    shortDescription:
      "Allow employees to defer tax on startup equity (VSOP, stock options) until cash realisation at sale, eliminating the dry-income problem that makes equity compensation ineffective in Germany.",
    domain: "innovation",
    problem:
      "In Germany, employee stock options and virtual participation rights (VSOPs) are taxed as income at exercise (often before liquidity), not at sale. This creates a 'dry income' problem: employees owe income tax at up to 45 % on paper gains before receiving any cash. For startup employees this often means a tax bill in the tens of thousands on illiquid shares in a company that may later be worth nothing. The result is that equity compensation is nearly useless as a talent-retention tool, forcing startups to compete on cash salary with large corporates.",
    objective:
      "Make employee equity compensation as economically attractive in Germany as it is in the UK (EMI options) or US (ISOs/NSOs), enabling startups to recruit and retain talent at competitive total compensation without requiring cash they do not have.",
    intervention:
      "Amend the Einkommensteuergesetz to allow deferral of income tax on qualifying startup equity (shares and options from companies <10 years old, <€50 m revenue) until a liquidity event (sale, IPO, or after 15 years whichever comes first). Cap the deferred liability at actual cash proceeds. Apply capital gains rates to gains accrued after a 3-year holding period.",
    status: "pilot",
    evidenceStrength: "medium",
    expectedImpact: 3,
    implementationDifficulty: 2,
    estimatedCost: "low",
    timeToImpact: "short",
    confidence: 0.68,
    affectedGroups: ["startup employees", "startup founders", "early-stage investors", "talent recruiters", "established tech companies competing for talent"],
    internationalExamples: [
      {
        country: "United Kingdom",
        description:
          "Enterprise Management Incentives (EMI) allow options in qualifying companies (≤250 employees, ≤£30 m assets) to be granted and exercised without income tax; only capital gains tax applies on sale.",
        outcome:
          "EMI is cited by UK startups as one of the most effective talent retention tools available. A 2021 survey found 78 % of UK startups use EMI vs. ~8 % of German startups using any equity scheme.",
      },
      {
        country: "United States",
        description:
          "Incentive Stock Options (ISOs) defer regular income tax until sale (with AMT considerations). 83(b) elections allow early exercise at low value to start capital gains holding periods.",
        outcome:
          "US startup equity is the global benchmark; Silicon Valley's compensation culture is built on the foundation of tax-advantaged equity. US startups attract globally mobile talent partly on equity upside.",
      },
      {
        country: "France",
        description:
          "France reformed its BSPCE (startup warrant) regime in 2023 to allow deferral until liquidity and reduce the effective rate to 17.2 % for long-term holds.",
        outcome:
          "France's startup ecosystem (Station F, French Tech) has grown significantly. Anecdotal evidence from founders suggests equity packages are now more competitive, though formal evaluation is pending.",
      },
    ],
    risks: [
      "Tax deferral creates a loss of revenue certainty for the state; if many high-value exits happen simultaneously the fiscal impact is concentrated.",
      "The reform benefits primarily high-skilled workers in the startup sector — a distributional concern if perceived as a tax break for the well-off.",
      "Defining 'qualifying companies' creates an administrative category that firms will seek to enter; the boundary must be robust to gaming.",
    ],
    tradeoffs: [
      "Revenue timing vs. ecosystem benefit: deferred tax is still tax, but collected years later; the time-value cost to the state must be weighed against ecosystem development benefits.",
      "Startup focus vs. equity market generally: limiting the reform to startups creates a distortion between startup employees and employees of listed companies.",
    ],
    kpis: [
      {
        metric: "Share of German startups (Series A+) offering equity compensation as meaningful part of package",
        baseline: "~8 %",
        target: "40 % within 3 years",
      },
      { metric: "Germany's rank in Startup Genome Global Ecosystem Report (talent subcategory)", baseline: "~15th", target: "Top 10" },
      {
        metric: "Number of startup employee equity plans registered under new qualifying regime per year",
        baseline: "n/a",
        target: "5,000 within 2 years",
      },
    ],
    sources: ["startup-genome-2024-germany", "mckinsey-2023-germany-productivity", "acatech-2023-innovationsindikator"],
    counterarguments: [
      "Germany already partially reformed equity taxation in 2021 (§ 19a EStG) allowing deferral for employees of young companies; the reform did not produce the expected uptake, suggesting other barriers are dominant.",
      "The dry-income problem affects a small number of highly-compensated workers in a narrow sector; its macroeconomic significance is overstated.",
      "Making equity more attractive increases the risk that startup employees take excessive personal financial risk in illiquid, high-failure-rate assets.",
    ],
    openQuestions: [
      "Why did the 2021 § 19a EStG reform produce lower than expected uptake, and are those barriers structural (legal design) or informational (awareness, complexity)?",
      "Should the qualifying company definition be aligned with EU State Aid GBER thresholds to avoid notification requirements?",
      "What is the revenue cost of full deferral until sale vs. the partial deferral in § 19a EStG, accounting for time-value of money?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "An evaluation of France's 2023 BSPCE reform showing measurable increase in equity plan adoption and talent retention within 2 years.",
        "A detailed analysis of the 2021 § 19a EStG reform identifying specific legal design flaws (rather than awareness barriers) as the reason for low uptake.",
      ],
      decreaseConfidence: [
        "Survey of startup founders and employees showing that equity compensation is not a significant factor in employment decisions, with cash salary and work culture being dominant.",
        "Evidence that § 19a uptake has grown significantly with time and awareness, suggesting the 2021 reform is working and needs time rather than replacement.",
      ],
      abandonRecommendation: [
        "Analysis showing that the talent density gap between Germany and UK/US startup ecosystems is explained primarily by network effects, university research strength, and market size rather than equity tax treatment.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  {
    id: "research-commercialisation",
    title: "Reduce IP Barriers Between Universities and Spin-Outs",
    shortDescription:
      "Reform the IP ownership and licensing framework governing university research to make it easier and faster to form spin-outs with commercially viable IP arrangements.",
    domain: "innovation",
    problem:
      "German universities retain IP rights over research outputs under the Arbeitnehmererfindungsgesetz, but the process for licensing this IP to spin-outs is slow, expensive, and often commercially unattractive. Many universities require spin-outs to pay market-rate licensing fees that are financially unworkable for pre-revenue companies. The Professorenmodell creates conflicts of interest and inconsistency. By contrast, the UK model and the US Bayh-Dole model — where universities own IP but license it on founder-friendly terms — produce far more spin-outs per research euro.",
    objective:
      "Double the number of university spin-outs formed per year within five years. Reduce time from research result to formal spin-out company formation to under 6 months for standard cases.",
    intervention:
      "Reform the Arbeitnehmererfindungsgesetz to standardise a 'founder-friendly licensing' default: spin-outs led by researchers get an exclusive licence in their research field, paid through a small equity stake rather than upfront fees. Create a national standard spin-out agreement template to reduce legal costs. Mandate universities to establish or join a regional technology transfer office with qualified commercial staff.",
    status: "researching",
    evidenceStrength: "medium",
    expectedImpact: 3,
    implementationDifficulty: 3,
    estimatedCost: "low",
    timeToImpact: "medium",
    confidence: 0.58,
    affectedGroups: ["university researchers", "academic entrepreneurs", "technology transfer offices", "early-stage investors", "universities"],
    internationalExamples: [
      {
        country: "United Kingdom",
        description:
          "UK universities (led by Oxford, Cambridge, Imperial) have developed spin-out models where the university takes equity (typically 20–30 %) in exchange for an exclusive licence. The NCUB and Entrepreneurs in Residence programmes support founders through the process.",
        outcome:
          "Oxford and Cambridge each generate ~25 spin-outs per year with significant valuations. The UK produced ~1,000 university spin-outs in 2022 vs. ~150 in Germany despite a comparable research base.",
      },
      {
        country: "United States",
        description:
          "The Bayh-Dole Act (1980) allows universities to own patents from federally-funded research and license them to industry. Most major US universities have mature technology transfer offices with equity-for-licence deal structures.",
        outcome:
          "US universities generate >1,000 spin-outs per year. MIT's Technology Licensing Office has supported companies with total market cap exceeding $2 trillion cumulatively.",
      },
      {
        country: "Netherlands",
        description:
          "Dutch universities (TU Delft, Wageningen, Utrecht) operate university-owned venture funds that co-invest in spin-outs. Pre-agreed term sheet templates reduce legal friction.",
        outcome:
          "The Netherlands has among the highest spin-out rates per research euro in the EU. TU Delft alone generates 20+ spin-outs annually with a 5-year survival rate above 70 %.",
      },
    ],
    risks: [
      "Poorly designed equity-for-licence deals can leave universities with large, illiquid minority stakes that create governance complexity without financial return.",
      "Standardised templates may not fit all spin-out contexts; forcing non-standard research into standard agreements can create IP disputes later.",
      "Technology transfer office quality varies enormously; mandating their existence without ensuring quality may create compliance checkbox exercises.",
    ],
    tradeoffs: [
      "University revenue (licensing fees) vs. spin-out viability: founder-friendly terms cost universities short-term revenue for long-term equity upside that may never materialise.",
      "Standardisation vs. flexibility: a national template improves speed but may disadvantage unusual or high-value IP situations.",
    ],
    kpis: [
      { metric: "Number of university spin-outs formed per year in Germany", baseline: "~150", target: "300 within 5 years" },
      {
        metric: "Median time from research result disclosure to spin-out company formation",
        baseline: "~18 months",
        target: "6 months",
      },
      { metric: "Share of universities with a qualified technology transfer office (≥3 commercial staff)", baseline: "~40 %", target: "90 %" },
    ],
    sources: ["acatech-2023-innovationsindikator", "startup-genome-2024-germany", "oecd-2023-germany-econ-survey"],
    counterarguments: [
      "IP regime is not the binding constraint on German spin-out formation; the dominant barriers are cultural (risk aversion, academic career incentives), capital (lack of deep seed funding), and market access.",
      "UK universities' equity-heavy models have recently attracted criticism for taking too large a stake in spin-outs, deterring external investors; Germany should learn from this rather than replicate it.",
      "The Professorenmodell in some German states gives researchers maximum flexibility; centralising IP at the university level may reduce the incentive to commercialise.",
    ],
    openQuestions: [
      "Is the Arbeitnehmererfindungsgesetz the right legislative vehicle, or should reform focus on guidelines and incentives without mandatory legal change?",
      "How should conflicts of interest between a professor's university role and their spin-out role be managed under a founder-friendly IP regime?",
      "What is the minimum size/quality of technology transfer office needed to provide meaningful support, and how should it be funded?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "A natural experiment comparing German universities that have adopted UK-style equity-for-licence models with those that have not, showing higher spin-out rates and survival rates.",
      ],
      decreaseConfidence: [
        "Survey evidence showing that the primary reason German researchers do not spin out is academic career incentives rather than IP or capital barriers.",
      ],
      abandonRecommendation: [
        "Evidence from the UK that recent reforms restricting large university equity stakes were necessary because the model was deterring external VC investment, and the net ecosystem effect was negative.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  // ─── ENERGY ──────────────────────────────────────────────────────────────────

  {
    id: "grid-acceleration",
    title: "Planning Acceleration for High-Voltage Transmission Grid",
    shortDescription:
      "Streamline and time-limit planning and permitting for new high-voltage transmission lines to eliminate the 10–15 year lag between renewable capacity construction and grid connectivity.",
    domain: "energy",
    problem:
      "Germany's onshore wind and solar capacity is growing rapidly, but grid infrastructure lags by 10–15 years due to slow planning and permitting. The Bundesnetzagentur identifies ~14,000 km of new or upgraded transmission lines as needed by 2037; current progress is severely behind schedule. North-south corridors (SuedLink, SuedOstLink) face neighbourhood opposition and fragmented approval processes across multiple Länder. Without grid investment, surplus renewable energy is curtailed (wasted) and industrial electricity prices remain high due to congestion.",
    objective:
      "Reduce time from project initiation to construction start for high-voltage transmission projects to 4 years for standard corridors and 6 years for contested corridors. Eliminate curtailment attributable to grid bottlenecks by 2035.",
    intervention:
      "Legislate a Bundesfachplanung priority category for designated grid projects, with: (i) a single federal approval authority (Bundesnetzagentur) as lead agency, (ii) parallel rather than sequential consultation of statutory bodies, (iii) hard deadlines for each procedural step, (iv) judicial challenge limited to post-construction compensation (not injunction) for nationally designated priority projects.",
    status: "pilot",
    evidenceStrength: "high",
    expectedImpact: 5,
    implementationDifficulty: 4,
    estimatedCost: "high",
    timeToImpact: "long",
    confidence: 0.72,
    affectedGroups: [
      "renewable energy producers",
      "grid operators (TenneT, 50Hertz, Amprion, TransnetBW)",
      "industrial electricity consumers",
      "communities on transmission corridors",
      "European electricity market",
    ],
    internationalExamples: [
      {
        country: "Denmark",
        description:
          "Grid planning is managed nationally by Energinet with streamlined parliamentary consent for major projects. The Danish Energy Agency acts as one-stop-shop for all approvals.",
        outcome:
          "Denmark has built transmission infrastructure significantly faster than Germany per km, despite similar levels of opposition. Integration of North Sea wind is proceeding on schedule.",
      },
      {
        country: "United Kingdom",
        description:
          "The Nationally Significant Infrastructure Projects (NSIP) regime gives the Planning Inspectorate exclusive authority over major grid projects, with a 1-year statutory decision deadline. Legal challenge limited to judicial review on procedural grounds.",
        outcome:
          "UK major grid projects average 2–3 years from application to approval under NSIP, compared to 10+ years for comparable German projects.",
      },
      {
        country: "France",
        description:
          "RTE operates under a framework where projects declared d'utilité publique benefit from accelerated expropriation and simplified judicial challenge, with compensation settled separately from construction consent.",
        outcome:
          "France has built its planned interconnections with Spain and the UK broadly on schedule. RTE's grid expansion is among the fastest in comparable EU countries.",
      },
    ],
    risks: [
      "Limiting post-approval judicial challenge is constitutionally sensitive (Art. 19 GG: Rechtswegsgarantie); the legal design must preserve meaningful judicial review without allowing injunctive delay.",
      "Communities on transmission corridors face real amenity impacts; insufficient compensation and participation can generate durable political opposition that slows future projects.",
      "Faster permitting without faster grid operator financial approval and procurement processes may shift the bottleneck without resolving it.",
    ],
    tradeoffs: [
      "Speed vs. community participation: compressed timelines reduce time available for meaningful local consultation.",
      "Legal certainty vs. legal protection: limiting injunctive challenge protects project certainty but reduces individual legal protection.",
      "Cost vs. acceptance: underground cabling is 5–10x more expensive but faces less opposition.",
    ],
    kpis: [
      {
        metric: "Average time from Bundesfachplanung initiation to construction start for designated projects",
        baseline: "~10 years",
        target: "4 years for standard corridors",
      },
      { metric: "Renewable energy curtailment attributable to grid constraints (TWh/year)", baseline: "~7 TWh", target: "<1 TWh by 2035" },
      { metric: "Share of Netzentwicklungsplan 2037 projects with active construction or completed approval", baseline: "~25 %", target: "70 % within 5 years" },
    ],
    sources: ["european-commission-2024-energy-union", "bmwk-2024-industriestrategie", "svr-2023-jahresgutachten"],
    counterarguments: [
      "The main bottleneck in German grid expansion is not permitting but financing: regulated returns under the ARegV are too low to attract private capital at the required scale.",
      "Limiting judicial challenge to post-construction compensation would require a constitutional amendment (Art. 14 and 19 GG) that is politically unrealistic.",
      "Community opposition reflects genuine distributional concerns about who bears costs and who benefits from the energy transition, which faster permitting cannot resolve.",
    ],
    openQuestions: [
      "Is the constitutionally permissible limit for post-approval judicial challenge compatible with EU law on access to justice in environmental matters?",
      "How should compensation for communities hosting transmission infrastructure be structured to secure acceptance without creating perverse incentives for opposition?",
      "What is the interaction between faster permitting and the Netzentwicklungsplan approval cycle?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "UK NSIP evaluation showing that the 1-year statutory decision deadline has been consistently met for electricity transmission projects with no increase in judicial challenge success rates.",
        "A constitutional law opinion confirming that a German equivalent to NSIP is compatible with Art. 14 and Art. 19 GG through appropriate compensation design.",
      ],
      decreaseConfidence: [
        "Financial modelling showing that TSO financing constraints (regulated return rates) rather than permitting speed are the binding constraint on grid construction pace.",
        "Community opposition research showing that faster permitting does not reduce actual construction delays because opposition groups find other procedural pathways.",
      ],
      abandonRecommendation: [
        "A Federal Constitutional Court ruling that post-construction-only judicial review for grid projects violates the Rechtswegsgarantie under Art. 19(4) GG.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  {
    id: "industrial-demand-flexibility",
    title: "Incentivise Large Industrial Consumers to Shift Load to Cheap or Surplus Periods",
    shortDescription:
      "Create price signals and contract mechanisms that enable energy-intensive industries to shift significant electricity consumption to periods of high renewable supply and low grid stress, reducing average costs and improving system balance.",
    domain: "energy",
    problem:
      "Germany's electricity grid faces increasing imbalance between renewable generation (concentrated in windy/sunny periods) and industrial demand (concentrated in weekday business hours). Large industrial consumers often lack the metering, contractual structures, and process flexibility to shift consumption. As a result, surplus renewable electricity is curtailed at negative prices, while industries pay higher average prices than they would in a fully flexible system. The potential for demand flexibility in German industry is estimated at 10–15 GW.",
    objective:
      "Activate 8 GW of voluntary industrial demand flexibility by 2030, reducing average industrial electricity costs by 10–15 % and renewable curtailment by 50 %.",
    intervention:
      "Introduce a regulated Demand Response Obligation for network-connected consumers above 5 MW, requiring them to publish flexibility availability and participate in balancing markets. Create a 'Flexibilitätsprämie' paid through the grid fee system to consumers who commit to interruptible load contracts. Reform network fees to be dynamic (reflecting real-time grid cost) rather than flat.",
    status: "researching",
    evidenceStrength: "medium",
    expectedImpact: 3,
    implementationDifficulty: 3,
    estimatedCost: "medium",
    timeToImpact: "medium",
    confidence: 0.65,
    affectedGroups: [
      "energy-intensive industries",
      "grid operators",
      "balancing energy market participants",
      "renewable generators",
      "industrial workers (shift patterns)",
    ],
    internationalExamples: [
      {
        country: "France",
        description:
          "France's NEBEF mechanism allows demand response to participate in the balancing mechanism market. EDF's industrial tariff options include significant load-shifting incentives.",
        outcome:
          "France has 3+ GW of industrial demand response registered in the balancing market. Cost savings for participants estimated at 8–12 % of electricity bill.",
      },
      {
        country: "United States (PJM region)",
        description:
          "PJM's Emergency Load Response Program and Economic Load Response Program allow industrial consumers to bid curtailment into capacity and energy markets. Participation is voluntary and market-priced.",
        outcome:
          "PJM has activated over 8 GW of demand response capacity. The programme has demonstrably reduced peak prices and avoided investment in peaker plants.",
      },
      {
        country: "Finland",
        description:
          "Fingrid's demand response programme engages large industrial consumers (paper, chemical) in frequency regulation. Consumers with controllable processes receive payments for availability and activation.",
        outcome:
          "Finland has one of the highest industrial demand response penetration rates in the EU. The programme has reduced Finland's need for spinning reserve capacity.",
      },
    ],
    risks: [
      "Many industrial processes have genuine technical constraints on flexibility (e.g., continuous casting in steel, chemical processes with minimum temperature requirements); overestimating available flexibility will underdeliver.",
      "Shifting industrial processes to off-peak periods may require shift pattern changes, creating industrial relations challenges.",
      "Dynamic network fees create complexity and forecasting uncertainty for industrial consumers planning investment.",
      "If the Flexibilitätsprämie is too high, it becomes an implicit subsidy that distorts EU competition rules.",
    ],
    tradeoffs: [
      "System efficiency vs. process optimisation: demanding maximum flexibility from industrial consumers may conflict with core production optimisation.",
      "Short-term cost savings vs. long-term capex: flexibility in process timing may require investment in buffer storage or process redesign.",
    ],
    kpis: [
      { metric: "Activated industrial demand flexibility capacity (GW)", baseline: "~1 GW", target: "8 GW by 2030" },
      { metric: "Annual renewable energy curtailment (TWh)", baseline: "~7 TWh", target: "<3.5 TWh" },
      {
        metric: "Average industrial electricity price for participating consumers vs. non-participating (% difference)",
        baseline: "n/a",
        target: "10–15 % lower for participants",
      },
    ],
    sources: ["bmwk-2024-industriestrategie", "european-commission-2024-energy-union"],
    counterarguments: [
      "Industrial electricity costs in Germany are driven primarily by energy taxes, grid fees, and wholesale prices — not by inflexibility. Demand response addresses a secondary problem.",
      "The technical potential for industrial flexibility has been claimed for decades but activation has consistently underperformed forecasts due to operational constraints.",
      "A Flexibilitätsprämie funded through grid fees redistributes costs from flexible to inflexible consumers, which may be regressive if smaller consumers have less flexibility.",
    ],
    openQuestions: [
      "What is the empirically derived technically available flexibility across German industrial sectors, disaggregated by process type?",
      "How should the Flexibilitätsprämie be calibrated to incentivise participation without creating a State Aid notification requirement?",
      "How do dynamic network fees interact with long-term industrial power purchase agreements (PPAs)?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "A pilot programme with 10–15 large industrial consumers demonstrating that stated flexibility potential translates into actual controllable load at scale and at reasonable response time.",
        "Finnish demand response evaluation showing that participation did not negatively affect industrial productivity or require significant capital investment.",
      ],
      decreaseConfidence: [
        "A study of German industry energy management showing that technically available flexibility is <3 GW due to process constraints, well below the 10–15 GW estimates used in policy assessments.",
      ],
      abandonRecommendation: [
        "Evidence that industrial demand response programmes in comparable markets have consistently underperformed forecasts by >50 % due to operational constraints.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  {
    id: "eu-grid-integration",
    title: "Cross-Border Electricity Capacity Expansion with Neighbouring EU States",
    shortDescription:
      "Prioritise and fast-track expansion of cross-border interconnection capacity between Germany and France, Poland, Austria, and the Netherlands to improve European market integration and reduce German industrial electricity costs.",
    domain: "energy",
    problem:
      "Germany's electricity grid is inadequately interconnected with neighbours, limiting the ability to export surplus renewable electricity and import when German generation is insufficient. The economic value of renewable generation is significantly reduced by curtailment caused by insufficient cross-border capacity. Meanwhile, French nuclear and Norwegian hydro cannot fully substitute for German gas generation during low-renewable periods because interconnector capacity is the binding constraint.",
    objective:
      "Increase cross-border interconnection capacity between Germany and its neighbours by 15 GW by 2035, enabling full participation in the single European electricity market and reducing annual curtailment costs by €2–4 bn.",
    intervention:
      "Designate cross-border interconnector projects as Nationally Significant Infrastructure under the TEN-E Regulation and apply the accelerated permitting regime (as per grid-acceleration) to border-crossing projects. Negotiate bilateral grid development agreements with France, Poland, Czech Republic, Austria, and the Netherlands with binding capacity expansion timelines. Co-fund projects through the Connecting Europe Facility.",
    status: "researching",
    evidenceStrength: "medium",
    expectedImpact: 4,
    implementationDifficulty: 4,
    estimatedCost: "high",
    timeToImpact: "long",
    confidence: 0.62,
    affectedGroups: [
      "TSOs in Germany and neighbouring countries",
      "renewable energy generators",
      "industrial electricity consumers",
      "European energy trading market",
      "EU institutions",
    ],
    internationalExamples: [
      {
        country: "Nordic countries",
        description:
          "The Nordic electricity market (Nord Pool) integrates Norway, Sweden, Denmark, and Finland with strong interconnection, allowing Norwegian hydro to balance Danish and Swedish wind. Cross-border capacity has been expanded systematically over 30 years.",
        outcome:
          "The Nordic market achieves among the lowest average electricity prices in Europe while maintaining very high renewable shares. Interconnection investment paid back through reduced system balancing costs.",
      },
      {
        country: "United Kingdom",
        description:
          "UK has built multiple HVDC interconnectors to France (IFA2), Belgium (Nemo), Norway (NSL), and Denmark (Viking Link). Each project involved bilateral regulatory approval and an Ofgem investment framework.",
        outcome:
          "The Viking Link (UK-Denmark) reduced UK balancing costs by an estimated £400 m/year according to National Grid ESO.",
      },
      {
        country: "Spain / France",
        description:
          "The HVDC interconnection (Santa Llogaia – Baixas) through the Pyrenees doubled France-Spain capacity under the TEN-E framework.",
        outcome:
          "Doubled interconnection capacity enabled better integration of Spanish solar and reduced price spreads between Iberian and Central European markets.",
      },
    ],
    risks: [
      "Cross-border projects require consent from two regulatory regimes; disagreements between TSOs or regulators can stall projects for years.",
      "Poland and Czech Republic have expressed concerns about loop flows of German wind electricity transiting their grids; expanding capacity may worsen rather than resolve these issues without accompanying market design reforms.",
      "Large upfront infrastructure costs (€2–5 bn per interconnector) must be financed through regulated returns or public funds; EU State Aid rules constrain public co-financing.",
    ],
    tradeoffs: [
      "European integration vs. national energy security: deeper interconnection reduces cost but increases interdependence on neighbours' policy decisions.",
      "Interconnector capacity vs. domestic grid: investment resources are finite; cross-border capacity competes with domestic transmission investment.",
    ],
    kpis: [
      {
        metric: "Germany's cross-border interconnection capacity (GW, all borders combined)",
        baseline: "~25 GW",
        target: "40 GW by 2035",
      },
      { metric: "Annual cost of cross-border congestion (€ bn)", baseline: "~€3 bn", target: "<€1 bn" },
      { metric: "Share of German renewable curtailment attributable to cross-border constraints", baseline: "~40 %", target: "<10 %" },
    ],
    sources: ["european-commission-2024-energy-union", "bmwk-2024-industriestrategie", "imf-2024-germany-article-iv"],
    counterarguments: [
      "Cross-border interconnection is already a priority under the TEN-E Regulation with €5.8 bn in Connecting Europe Facility funding; the bottleneck is bilateral negotiation complexity and permitting in neighbouring countries.",
      "Expanding cross-border capacity may not reduce German industrial electricity costs significantly if the dominant drivers are taxes, levies, and domestic wholesale prices.",
      "Loop flow problems need market design solutions (phase-shifting transformers, flow-based market coupling) rather than more raw capacity.",
    ],
    openQuestions: [
      "Which specific bilateral interconnectors offer the highest cost-benefit ratio, accounting for current and projected generation mixes on both sides?",
      "How should the costs of cross-border capacity be allocated between countries when the benefits are asymmetric?",
      "Is enhanced phase-shifting transformer deployment a more cost-effective near-term intervention than new capacity?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "A quantitative interconnector cost-benefit study showing net present value of specific bilateral projects is strongly positive under a range of energy transition scenarios.",
        "Evidence that the Viking Link has delivered its projected £400 m/year balancing cost savings within the first two years of operation.",
      ],
      decreaseConfidence: [
        "Analysis showing that the primary cause of German renewable curtailment is the internal north-south transmission bottleneck rather than cross-border capacity, meaning domestic grid investment should take priority.",
      ],
      abandonRecommendation: [
        "A fundamental revision of EU electricity market design (e.g., shift to nodal pricing) that makes current interconnector planning frameworks obsolete.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  // ─── EDUCATION ────────────────────────────────────────────────────────────────

  {
    id: "evidence-based-teaching",
    title: "Fund and Mandate Evidence-Based Pedagogy in Teacher Training",
    shortDescription:
      "Reform initial teacher education and continuing professional development to systematically incorporate pedagogical approaches with strong experimental evidence of effectiveness.",
    domain: "education",
    problem:
      "German teacher training programmes vary enormously by Länder and institution, with limited integration of the evidence base from education research (structured literacy, explicit instruction, retrieval practice, spaced repetition, formative assessment). Many programmes emphasise constructivist and discovery-based approaches that have weaker causal evidence than direct instruction methods for foundational skills. Germany's PISA scores have deteriorated over the past decade and achievement gaps by socioeconomic background are among the widest in the OECD.",
    objective:
      "Raise average student learning outcomes by 0.2 standard deviations within 10 years (approximately equivalent to an additional year of learning), with disproportionate gains for children from lower socioeconomic backgrounds.",
    intervention:
      "Federal framework agreement (Kultusministerkonferenz resolution) mandating that all initial teacher education programmes include minimum hours of evidence-based pedagogical methods with documented effectiveness. Create a national education evidence clearing house (analogous to the UK EEF or the What Works Clearinghouse). Fund a national programme of randomised trials in German schools to build a Germany-specific evidence base.",
    status: "researching",
    evidenceStrength: "high",
    expectedImpact: 4,
    implementationDifficulty: 4,
    estimatedCost: "medium",
    timeToImpact: "long",
    confidence: 0.6,
    affectedGroups: [
      "pupils (especially those from disadvantaged backgrounds)",
      "teachers",
      "teacher training institutions",
      "Länder education ministries",
      "school principals",
    ],
    internationalExamples: [
      {
        country: "United Kingdom",
        description:
          "The Education Endowment Foundation (EEF) was established in 2011 with £125 m in government funding to conduct randomised trials of educational interventions and publish a Teaching and Learning Toolkit ranking approaches by evidence strength and cost-effectiveness.",
        outcome:
          "EEF has evaluated >1,500 schools across 200+ trials. The Toolkit is used by ~70 % of English schools. Pupil Premium spending guided by EEF evidence is estimated to have improved outcomes for disadvantaged pupils by 2–4 months of additional learning.",
      },
      {
        country: "Australia",
        description:
          "AITSL publishes evidence standards for teaching practices. Several states (NSW, VIC) have mandated structured literacy programmes supported by evidence, reversing the previous whole-language approach.",
        outcome:
          "NSW's adoption of evidence-based literacy instruction has been associated with measurable improvements in NAPLAN reading scores for early primary years.",
      },
      {
        country: "United States",
        description:
          "The What Works Clearinghouse reviews evidence on educational programmes using strict causal standards. The Reading First programme (2001–2008) mandated evidence-based reading instruction with federal funding conditional on compliance.",
        outcome:
          "Mixed evidence: Reading First evaluations showed modest positive effects in early grades. The broader lesson is that federal mandates are more effective when accompanied by teacher training and support rather than compliance-only requirements.",
      },
    ],
    risks: [
      "Länder guard their Kulturhoheit jealously; a federal mandate on teacher training content may be constitutionally and politically unachievable.",
      "Evidence-based approaches become outdated as new research accumulates; a mandated curriculum can institutionalise yesterday's best practice.",
      "Teachers may resist prescriptive instruction models that constrain professional judgment.",
      "The evidence base from English-speaking countries may not translate directly to Germany's language, culture, and school structure.",
    ],
    tradeoffs: [
      "Standardisation vs. teacher autonomy: a mandated pedagogical framework constrains the professional discretion that attracts high-quality teachers.",
      "Short-term investment vs. long-term payoff: teacher training reform takes a full teacher generation cycle (30+ years) to fully work through the system.",
    ],
    kpis: [
      { metric: "Germany's mean PISA reading score", baseline: "480 (2022)", target: "510 within 10 years" },
      {
        metric: "PISA score gap between top and bottom socioeconomic quartile (Germany)",
        baseline: "~95 points",
        target: "<75 points within 10 years",
      },
      {
        metric: "Share of teacher education programme hours covering evidence-based methods",
        baseline: "~10 % (estimated)",
        target: "35 % within 5 years",
      },
      {
        metric: "Number of German schools using Evidence Clearing House rated interventions",
        baseline: "n/a (clearing house does not exist)",
        target: "5,000 within 3 years of clearing house launch",
      },
    ],
    sources: ["bertelsmann-2024-bildungsmonitor", "oecd-2023-germany-econ-survey"],
    counterarguments: [
      "The evidence for specific pedagogical approaches being clearly superior is weaker than proponents claim; context effects explain more variance than method choice.",
      "Germany's education problem is primarily a resource allocation and socioeconomic integration problem — disadvantaged children need earlier intervention (childcare, nutrition, language support) not better teaching methods.",
      "Mandating pedagogical approaches through teacher training reform ignores that existing teachers (the large majority) would need retraining at enormous cost and face strong professional resistance.",
    ],
    openQuestions: [
      "What is the minimum viable intervention at the teacher training level — a curriculum mandate, an incentivised clearing house, or a voluntary network?",
      "How should the national evidence clearing house be governed to maintain scientific independence while being practically useful to teachers and schools?",
      "Is the KMK the right mechanism for coordination, or should this be pursued through a federal-Länder agreement with financial incentives?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "A German randomised trial showing that schools adopting an EEF-style evidence-based literacy approach produce measurably better reading outcomes in grades 1–3 within 3 years.",
        "A KMK working group producing a consensus statement and voluntary curriculum framework for evidence-based methods, demonstrating political will for coordination.",
      ],
      decreaseConfidence: [
        "Meta-analysis showing that the variance in German student outcomes explained by pedagogical method is small (<5 %) relative to variance explained by teacher experience, class size, and socioeconomic composition.",
        "Evidence from NSW or Reading First that mandated evidence-based approaches produced only modest or short-lived gains that did not persist to later grades.",
      ],
      abandonRecommendation: [
        "Constitutional opinion that federal involvement in teacher training content (Lehrerausbildung) is impermissible under the Kulturhoheit of the Länder, leaving no viable lever for a coordinated national approach.",
      ],
    },
    lastReviewed: "2025-09-01",
  },

  {
    id: "extended-school-day",
    title: "Ganztagsschule with High-Quality Structured Programming",
    shortDescription:
      "Expand and improve Germany's full-day school programme to provide structured educational enrichment — not just supervised time — to all pupils, with particular benefit for children from disadvantaged backgrounds and for parents' labour force participation.",
    domain: "education",
    problem:
      "Germany's Ganztagsschule coverage has expanded to ~50 % of pupils but quality is highly uneven: many programmes consist of supervised homework time rather than structured educational enrichment. Evidence from Germany's IGLU and PISA studies shows that children attending high-quality Ganztagsschule have better learning outcomes and lower achievement gaps. The 2021 Rechtsanspruch legislation entitles all primary school children to Ganztagsbetreuung by 2026, but staffing model, curriculum, and quality standards are undefined at federal level.",
    objective:
      "Ensure that by 2028, all children entitled to Ganztagsbetreuung can access a programme meeting minimum quality standards (structured curriculum, qualified staff, educational enrichment in addition to homework support). Reduce the socioeconomic achievement gap by at least 10 percentage points within 10 years.",
    intervention:
      "Define federal minimum quality standards for Ganztagsprogramme as a condition for federal co-financing. Fund training for Erzieherinnen in evidence-based enrichment activities. Incentivise schools to integrate afternoon programmes with core curriculum (coordinated lesson design). Publish school-level quality data annually to create accountability.",
    status: "pilot",
    evidenceStrength: "medium",
    expectedImpact: 4,
    implementationDifficulty: 4,
    estimatedCost: "high",
    timeToImpact: "long",
    confidence: 0.62,
    affectedGroups: [
      "primary school pupils",
      "parents (especially mothers in part-time work)",
      "Erzieherinnen and teaching staff",
      "Länder education authorities",
      "municipalities responsible for Kita/school integration",
    ],
    internationalExamples: [
      {
        country: "France",
        description:
          "France's école du socle and périscolaire programmes integrate core school hours with structured afternoon activities including sport, arts, and language. The rythmes scolaires reform (2013) extended structured school time.",
        outcome:
          "France achieves a higher female labour force participation rate than Germany and lower socioeconomic achievement gaps partly attributed to longer structured school days.",
      },
      {
        country: "Sweden",
        description:
          "Swedish fritidshem (after-school centres) are an integrated part of the school system, staffed by qualified Fritidspedagoger following a national curriculum framework and subject to quality inspection.",
        outcome:
          "Sweden has significantly higher female labour market participation than Germany and lower socioeconomic variance in PISA scores. The fritidshem model is credited with supporting both equity and parental employment.",
      },
      {
        country: "United States (Massachusetts charter schools)",
        description:
          "No-excuses and extended-day charter schools (KIPP, Match, Uncommon Schools) extend the school day to 7–8 hours with highly structured programming. Random-offer lotteries provide causal identification.",
        outcome:
          "Lottery-based causal studies show 0.2–0.4 standard deviation improvements in maths and reading for disadvantaged pupils attending extended-day schools. Effects are concentrated in schools with structured, evidence-based programming.",
      },
    ],
    risks: [
      "The staffing requirement to implement high-quality Ganztagsschule for all entitled pupils is enormous; Germany already has a severe Erzieherin shortage (estimated 125,000 unfilled positions).",
      "Federal quality standards may be technically non-binding on Länder given Kulturhoheit; the conditional co-financing mechanism may be the only viable lever.",
      "Poorly implemented programmes will absorb funding without delivering educational benefit, and may be politically difficult to shut down once established.",
    ],
    tradeoffs: [
      "Investment scale vs. quality: rapid expansion to meet the 2026 Rechtsanspruch deadline may force quality compromises.",
      "Standardisation vs. local innovation: national quality standards constrain local experiments that might discover superior models.",
      "School integration vs. municipal childcare: integrating Ganztagsschule into the school system may conflict with existing Kita and Hort infrastructure managed by municipalities.",
    ],
    kpis: [
      {
        metric: "Share of entitled primary school pupils with access to Ganztagsprogramm meeting minimum quality standards",
        baseline: "~20 % (quality-adjusted estimate)",
        target: "80 % by 2028",
      },
      { metric: "IGLU reading score gap between top and bottom socioeconomic quartile", baseline: "~75 points", target: "<60 points within 10 years" },
      {
        metric: "Female full-time equivalent labour force participation rate (mothers of primary school children)",
        baseline: "~48 %",
        target: "58 % within 5 years",
      },
    ],
    sources: ["bertelsmann-2024-bildungsmonitor", "oecd-2023-germany-econ-survey"],
    counterarguments: [
      "The constraint on Ganztagsschule quality is Erzieherin staffing, not money or policy ambition; quality standards without a credible staffing pipeline are aspirational targets without operational bite.",
      "Evidence for the educational impact of extended school days is weaker for Germany specifically than the Massachusetts charter school literature suggests.",
      "The Rechtsanspruch creates a legal right to Betreuung, not to high-quality educational programming; reframing the policy as an educational intervention creates legal and political complexity beyond the existing commitment.",
    ],
    openQuestions: [
      "What is the minimum quality standard that is achievable given the current and projected Erzieherin workforce, and is that standard educationally meaningful?",
      "How should the afternoon programme be pedagogically integrated with the morning school curriculum without overburdening teachers?",
      "Is there a German randomised trial or natural experiment that provides causal evidence on high-quality Ganztagsschule effects on disadvantaged pupils?",
    ],
    whatWouldChangeOurMind: {
      increaseConfidence: [
        "A German causal study (using variation in programme rollout timing or quality) showing that high-quality Ganztagsschule reduces the socioeconomic achievement gap by a statistically significant amount.",
        "A staffing plan from Länder education ministries credibly demonstrating that the Erzieherin gap can be closed within 5 years through training pipeline expansion and immigration.",
      ],
      decreaseConfidence: [
        "An evaluation of existing Ganztagsschule programmes in Baden-Württemberg or NRW showing negligible learning outcome effects compared to half-day schools, controlling for pupil composition.",
        "Labour market data showing that mothers' working hours are constrained primarily by attitudes and partner employment patterns rather than childcare availability.",
      ],
      abandonRecommendation: [
        "Evidence that the Erzieherin shortage will not be resolved within 10 years under any realistic policy scenario, meaning quality expansion is structurally impossible and resources should be redirected to other interventions.",
      ],
    },
    lastReviewed: "2025-09-01",
  },
]

export default policies
