export type Lang = "de" | "en"

export const translations = {
  de: {
    nav: {
      home: "Startseite",
      dashboard: "Deutschland 2036",
      policies: "Maßnahmen",
      compare: "Vergleich",
      ask: "KI-Recherche",
      research: "Forschung",
      methodology: "Methodik",
      about: "Über uns",
    },
    home: {
      hero: "Deutschland kann besser werden.",
      subtitle: "Eine öffentliche, evidenzbasierte Policy-Intelligence-Plattform für Deutschland.",
      quote:
        "Statt zu fragen, welche Partei eine Idee vorgeschlagen hat: Hat sie funktioniert? Wo? Zu welchen Kosten? Unter welchen Bedingungen?",
      principles: {
        title: "Sechs Leitprinzipien",
        subtitle: "Was gute Politik erreicht",
        items: [
          {
            title: "Wohlstand",
            description:
              "Breites Wirtschaftswachstum, das den Lebensstandard aller hebt – nicht nur der bereits Wohlhabenden.",
          },
          {
            title: "Leistungsfähigkeit",
            description:
              "Ein Staat, der Politik effektiv gestalten, umsetzen und evaluieren kann – kompetent, schnell und vertrauenswürdig.",
          },
          {
            title: "Steuerung",
            description:
              "Bürger und Gemeinschaften haben echten Einfluss auf die Entscheidungen, die ihr Leben prägen.",
          },
          {
            title: "Chancen",
            description:
              "Jeder kann sein Potenzial entfalten – unabhängig von Herkunft, Region oder Ausgangssituation.",
          },
          {
            title: "Sicherheit",
            description:
              "Schutz vor Wirtschaftskrisen, Kriminalität und geopolitischen Risiken – ohne Freiheit zu opfern.",
          },
          {
            title: "Resilienz",
            description:
              "Eine Wirtschaft und Gesellschaft, die Erschütterungen absorbiert und sich anpasst, ohne systemische Zusammenbrüche.",
          },
        ],
      },
      domains: {
        title: "Politikbereiche erkunden",
        subtitle: "Zehn Reformfelder",
      },
      dashboardTitle: "Deutschland 2036",
      dashboardSubtitle:
        "Illustrative Ziele für alle zehn Bereiche – wo Deutschland mit wirksamen Reformen in einem Jahrzehnt stehen könnte.",
      dashboardCta: "Ziele für 2036 anzeigen",
      dashboardLabel: "Langfristige Ziele",
      statsLabel: "Maßnahmen · 10 Bereiche · Evidenzbasiert",
      exploreBtn: "Maßnahmen erkunden",
      askBtn: "Frage stellen",
    },
    policies: {
      title: "Maßnahmen-Explorer",
      subtitle: "Evidenzbasierte Politikhypothesen für Deutschland",
      filterDomain: "Bereich",
      filterEvidence: "Evidenzstärke",
      filterStatus: "Status",
      filterTime: "Zeithorizont",
      sortBy: "Sortierung",
      sortPriority: "Priorität",
      sortImpact: "Wirkung",
      sortConfidence: "Konfidenz",
      sortEase: "Umsetzbarkeit",
      hypothesis: "Hypothese",
      disclaimer: "Dies ist eine Hypothese, keine Empfehlung.",
      allDomains: "Alle Bereiche",
      anyEvidence: "Beliebige Evidenzstärke",
      anyStatus: "Beliebiger Status",
      anyTime: "Beliebiger Zeithorizont",
      minImpact: "Min. Wirkung",
      resetFilters: "Filter zurücksetzen",
      clearFilters: "Filter löschen",
      showing: "Zeige",
      of: "von",
      policiesCount: "Maßnahmen",
      noMatch: "Keine Maßnahmen entsprechen den aktuellen Filtern.",
      timeShort: "Kurzfristig (< 2 Jahre)",
      timeMedium: "Mittelfristig (2–5 Jahre)",
      timeLong: "Langfristig (5+ Jahre)",
      browseBtn: "Maßnahmen durchsuchen",
    },
    evidence: {
      "very-low": "Sehr gering",
      low: "Gering",
      medium: "Mittel",
      high: "Hoch",
    },
    status: {
      idea: "Idee",
      researching: "In Recherche",
      "evidence-supported": "Evidenzgestützt",
      pilot: "Pilotprojekt",
      implemented: "Umgesetzt",
      evaluated: "Evaluiert",
    },
    domains: {
      "state-capacity": "Staatliche Kapazität",
      housing: "Wohnen & Bauen",
      labour: "Arbeit & Steuern",
      migration: "Migration & Integration",
      innovation: "Innovation & Technologie",
      energy: "Energie & Industrie",
      education: "Bildung & Qualifikation",
      "economic-growth": "Wachstum & Produktivität",
      pensions: "Renten & Demografie",
      defence: "Verteidigung & Resilienz",
    },
    domainDescriptions: {
      "state-capacity":
        "Digitalisierung und Verschlankung der öffentlichen Verwaltung zur Reduzierung des bürokratischen Aufwands.",
      housing:
        "Behebung von Angebotsdefiziten und Planungsverzögerungen auf Deutschlands städtischen Wohnungsmärkten.",
      labour:
        "Abbau steuerlicher und regulatorischer Hindernisse, die Arbeitsangebot und Produktivität bremsen.",
      migration:
        "Gewinnung und Integration von Fachkräften bei fairer Verwaltung von Asylverfahren.",
      innovation:
        "Aufbau eines Start-up- und Forschungsökosystems, das Ideen in wettbewerbsfähige Unternehmen verwandelt.",
      energy:
        "Beschleunigung der Energiewende bei wettbewerbsfähigen Industriestrompreisen.",
      education:
        "Verbesserung der Lernergebnisse und Schließung von Leistungslücken durch evidenzbasierte Pädagogik.",
      "economic-growth":
        "Strukturreformen zur Wiederherstellung von Deutschlands langfristigem Wachstumspotenzial.",
      pensions:
        "Sicherung der Rentennachhaltigkeit bei gleichzeitiger Erschließung des Arbeitspotenzials älterer Arbeitnehmer.",
      defence:
        "Erfüllung der NATO-Verpflichtungen und Wiederherstellung der Verteidigungsfähigkeit in einem veränderten Sicherheitsumfeld.",
    },
    detail: {
      problem: "Problem",
      objective: "Ziel",
      intervention: "Interventionshypothese",
      interventionNote: "Testbare Hypothese",
      evidence: "Evidenz",
      examples: "Internationale Beispiele",
      outcome: "Ergebnis",
      impact: "Erwartete Wirkung",
      cost: "Geschätzte Kosten",
      difficulty: "Umsetzungsschwierigkeit",
      ease: "Umsetzbarkeit",
      timeToImpact: "Zeithorizont",
      risks: "Risiken",
      tradeoffs: "Zielkonflikte",
      counterarguments: "Gegenargumente",
      kpis: "Erfolgsindikatoren",
      kpiMetric: "Indikator",
      kpiBaseline: "Ausgangswert",
      kpiTarget: "Ziel",
      kpiNote: "Alle KPI-Werte sind illustrativ – erfordern Evidenzprüfung",
      sources: "Quellen",
      sourceView: "Quelle anzeigen →",
      openQuestions: "Offene Forschungsfragen",
      whatWouldChangeMind: "Was würde unsere Meinung ändern?",
      increaseConfidence: "Würde Konfidenz erhöhen",
      decreaseConfidence: "Würde Konfidenz senken",
      abandon: "Würde Empfehlung aufgeben",
      confidence: "Konfidenz",
      priorityScore: "Prioritätsscore",
      priorityNote: "Experimentelles Priorisierungsmodell",
      affectedGroups: "Betroffene Gruppen",
      lastReviewed: "Zuletzt geprüft",
      illustrative: "Illustrativ – erfordert Evidenzprüfung",
      hypothesisWarning: "Dies ist eine Hypothese, keine Empfehlung.",
      hypothesisDetail:
        "Evidenzstärke ist {{strength}}. Behandeln Sie alle Analysen auf dieser Seite als explorativ. Nicht für Politikbriefe ohne Expertenbegutachtung verwenden.",
      compareThis: "Diese Maßnahme vergleichen",
      backToAll: "← Zurück zu allen Maßnahmen",
      estimatedCost: "Geschätzte Kosten",
    },
    compare: {
      title: "Maßnahmen vergleichen",
      subtitle: "Vergleich von {{count}} {{label}}",
      policyLabel: "Maßnahme",
      policiesLabel: "Maßnahmen",
      addPolicy: "Weitere Maßnahmen hinzufügen",
      noPolicies: "Keine Maßnahmen ausgewählt",
      noPoliciesDesc: "Fügen Sie Maßnahmen zum Vergleich aus dem Maßnahmen-Explorer hinzu.",
      browseBtn: "Maßnahmen durchsuchen",
      attribute: "Merkmal",
      domain: "Bereich",
      status: "Status",
      evidenceStrength: "Evidenzstärke",
      impact: "Erwartete Wirkung",
      difficulty: "Schwierigkeit",
      cost: "Kosten",
      time: "Zeithorizont",
      confidence: "Konfidenz",
      priorityScore: "Prioritätsscore",
      disclaimer:
        "Alle Scores sind illustrativ – experimentelles Priorisierungsmodell, keine Politikempfehlung.",
      unknown: "Unbekannt",
    },
    ask: {
      title: "KI-Politikrecherche",
      subtitle: "Stellen Sie Fragen zur deutschen Wirtschafts- und Sozialpolitik",
      placeholder: "Wie könnte Deutschland schneller Wohnungen bauen?",
      send: "Senden",
      demoMode: "Demo-Modus – KI nicht verbunden. ANTHROPIC_API_KEY hinzufügen, um zu aktivieren.",
      suggestions: [
        "Welche Maßnahmen haben die stärkste Evidenz?",
        "Was sind die größten Hindernisse für Wohnungsreformen?",
        "Wie schneidet Deutschland bei qualifizierter Migration ab?",
        "Was würde das Wirtschaftswachstum am meisten steigern?",
        "Welche Maßnahmen könnten schnell umgesetzt werden?",
      ],
      promptHint:
        "Fragen Sie alles zur deutschen Politik – Evidenz, Zielkonflikte, internationale Vergleiche.",
      disclaimer:
        "Antworten werden von KI generiert und können fehlerhaft sein. Immer mit Primärquellen verifizieren.",
      errorMsg: "Entschuldigung, bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      confidence: "Konfidenz",
    },
    about: {
      title: "Über Deutschland Policy Lab",
      what: "Was wir sind",
      whatText1:
        "Deutschland Policy Lab ist eine Open-Source-, überparteiliche Policy-Intelligence-Plattform. Sie sammelt, strukturiert und bewertet Evidenz zu den wichtigsten Reformherausforderungen Deutschlands – von Wohnungsbau und Staatsdigitalisierung bis hin zu qualifizierter Migration, Energie und Bildung.",
      whatText2:
        "Jedes Politikprofil stellt dieselben Fragen: Was ist das Problem? Welche Intervention wird vorgeschlagen? Was sagt die Evidenz? Was würde es kosten? Wer profitiert, wer trägt die Kosten? Was würde unsere Meinung ändern?",
      why: "Warum es das gibt",
      whyText1:
        "Die deutsche öffentliche Debatte investiert enorme Energie in Parteipositionen, Koalitionsarithmetik und Verfahrensfragen. Die empirische Frage \u2013 \u201EFunktioniert diese Politik wirklich?\u201C \u2013 ist oft zweitrangig oder fehlt ganz.",
      quote:
        "Das Ziel ist nicht, die Demokratie zu automatisieren. Das Ziel ist, den empirischen Teil der Politikgestaltung deutlich besser zu machen.",
      whyText2:
        "Bessere Evidenz allein führt nicht zu besserer Politik. Aber das Fehlen einer guten Evidenzinfrastruktur macht es sehr leicht, unbequeme Evidenz zu ignorieren. Dieses Projekt ist ein kleiner Versuch, diese Infrastruktur öffentlich aufzubauen.",
      notWhat: "Was wir nicht sind",
      notWhatItems: [
        "Nicht mit einer politischen Partei, Regierung oder Lobbygruppe verbunden",
        "Kein Ersatz für demokratische Deliberation – dieses Tool informiert die Debatte, löst sie nicht",
        "Keine autoritative Datenquelle – alle Zahlen sind illustrativ, sofern nicht explizit zitiert",
        "Nicht professionell peer-reviewed – dies ist ein Open-Source-Projekt in früher Entwicklung",
        "Keine Politikempfehlungsmaschine – Prioritätsscore sind experimentell",
      ],
      principles: "Überparteiliche Grundsätze",
      principlesIntro: "Alle Analysen folgen diesen Regeln:",
      principlesItems: [
        "Keine Politikfrage in Bezug auf Parteipositionen oder Wahlergebnisse formulieren",
        "FAKT, EVIDENZ, ANNAHME, VORSCHLAG und UNSICHERHEIT explizit trennen",
        "Stets die stärkste Version von Gegenargumenten präsentieren",
        "Die Grenzen jeder zitierten Quelle offenlegen",
        "Zeigen, was unsere Einschätzung ändern würde – nicht nur unterstützende Evidenz",
        "Alle Zahlen mit angemessener Unsicherheit kennzeichnen",
      ],
      contribute: "Wie man beitragen kann",
      contributeText: "Das Projekt ist Open Source. Beiträge sind möglich durch:",
      contributeItems: [
        "Hinzufügen neuer Politikprofile (nach der strukturierten Vorlage)",
        "Verbesserung von Evidenzzitaten in bestehenden Profilen",
        "Identifizierung übersehener Gegenargumente oder offener Fragen",
        "Melden von Sachfehlern oder veralteten Informationen",
        "Verbesserung von Code, Design oder Methodikdokumentation",
      ],
      contributeBtn: "Auf GitHub ansehen →",
      status: "Projektstatus",
      statusBadge: "Experimentell – Frühphase",
      statusNote: "Daten sind illustrativ. Nicht für den offiziellen Politikeinsatz geeignet.",
      statusDesc:
        "Dies ist ein Frühphasen-Forschungsprojekt. Die Politikdatenbank, Evidenzklassifikationen und Scoring-Modelle sind in Arbeit. Wir begrüßen kritisches Feedback.",
    },
    methodology: {
      title: "Evidenz-Framework",
      subtitle:
        "Wie wir Evidenz klassifizieren, Konfidenz bewerten, Maßnahmen priorisieren und entscheiden, was unsere Meinung ändern würde.",
      evidenceClassTitle: "1. Evidenzklassifikation",
      evidenceClassDesc:
        "Jede Behauptung in einem Politikprofil wird einem von fünf Typen zugeordnet. Dies erzwingt eine explizite Unterscheidung zwischen verifizierten Fakten und Arbeitshypothesen.",
      evidenceStrengthTitle: "2. Evidenzstärke",
      evidenceStrengthDesc:
        "Jede Maßnahme erhält eine Gesamtbewertung der Evidenzstärke basierend auf Qualität, Quantität und Generalisierbarkeit relevanter Studien.",
      confidenceTitle: "3. Konfidenzprozentsatz",
      confidenceDesc:
        "Der Konfidenzprozentsatz (0–100 %) ist ein synthetisches Urteil, das folgendes kombiniert:",
      confidenceItems: [
        "Qualität und Konsistenz der zugrunde liegenden Evidenzbasis",
        "Übertragbarkeit internationaler Beispiele auf den deutschen Kontext",
        "Grad des Expertenkonsenses über Mechanismus und Effektgröße",
        "Verbleibende Unsicherheit über Implementierung und Politik",
      ],
      confidenceNote:
        "Wichtig: Konfidenzprozentsätze sind illustrative Expertenurteile, keine probabilistischen Modellausgaben. Sie sollten als grobe ordinale Indikatoren gelesen werden, nicht als präzise Wahrscheinlichkeiten.",
      priorityTitle: "4. Prioritätsscore-Formel",
      priorityDesc:
        "Der Prioritätsscore ist ein experimentelles Ranking-Tool. Er kombiniert Wirkung, Evidenzqualität, Konfidenz und Umsetzungsschwierigkeit in eine einzige Zahl (0–100).",
      priorityFormula1:
        "raw = (expectedImpact × evidenceWeight × confidence) / implementationDifficulty",
      priorityFormula2: "score = round((raw / 5) × 100)",
      priorityNote: "Experimentelles Priorisierungsmodell — keine Politikempfehlung",
      whatTitle: '5. „Was würde unsere Meinung ändern?"',
      whatDesc:
        "Jedes Politikprofil enthält einen expliziten Abschnitt, welche Evidenz unsere Einschätzung aktualisieren würde.",
      whatItems: [
        {
          icon: "↑",
          color: "green",
          title: "Würde Konfidenz erhöhen",
          desc: "Evidenz, die uns zuversichtlicher machen würde, dass die Intervention wie hypothetisiert funktioniert.",
        },
        {
          icon: "↓",
          color: "yellow",
          title: "Würde Konfidenz senken",
          desc: "Befunde, die unsere Einschätzung schwächen würden, ohne die Richtung zwingend aufzugeben.",
        },
        {
          icon: "✕",
          color: "red",
          title: "Würde Empfehlung aufgeben",
          desc: "Evidenz, die so gegenteilig ist, dass die Intervention aufgegeben oder grundlegend neu gestaltet werden sollte.",
        },
      ],
      whatNote:
        "Diese Struktur spiegelt ein Poppersches Bekenntnis zur Falsifizierbarkeit wider: Gute Politikanalyse sollte im Voraus spezifizieren, was Gegenevidenz darstellen würde.",
      researchTitle: "Forschungsprinzipien",
      researchDesc:
        "Alle Analysen folgen einer Reihe überparteilicher Forschungsprinzipien: Evidenz von Meinung trennen, Unsicherheit offenlegen, Gegenargumente präsentieren, Parteirahmen vermeiden und Quellen zitieren.",
      researchLink: "Mehr über das Projekt →",
    },
    research: {
      title: "Forschungsbibliothek",
      subtitle:
        "Alle im Politikdatenbank zitierten Quellen, nach Typ gruppiert. {{count}} Quellen in {{cats}} Kategorien.",
      relatedPolicies: "Verwandte Maßnahmen:",
      sourceLink: "Quelle →",
      aboutTitle: "Über diese Bibliothek",
      aboutDesc:
        "Die Quellen wurden ausgewählt, um die stärkste verfügbare Evidenz für jeden Politikbereich zu repräsentieren. Aufnahme bedeutet keine Billigung aller Schlussfolgerungen. Weitere Informationen zur Evidenzklassifikation finden Sie auf der",
      aboutLink: "Methodikseite",
    },
    dashboard: {
      title: "Deutschland 2036",
      subtitle:
        "Illustrative nationale Ziele – Daten werden aktualisiert, sobald Evidenz vorliegt.",
      disclaimer: "⚠️ Alle Zahlen sind illustrativ und erfordern Evidenzprüfung und Expertenvalidierung. Nicht als offizielle Projektionen oder Politikzusagen zitieren.",
      warningTitle: "Nur illustrative Ziele",
      current: "Aktuell",
      target2030: "2030",
      target2036: "2036",
      confidenceNote: "Konfidenz: illustrativ – erfordert Evidenzprüfung",
      viewPolicies: "{{label}}-Maßnahmen anzeigen →",
      aboutTitle: "Über diese Ziele",
      aboutDesc:
        "Die Ziele wurden durch Überprüfung internationaler Benchmarks, bestehender deutscher Regierungsziele (sofern vorhanden) und Projektionen unabhängiger Forschungsinstitutionen erstellt.",
      aboutLink: "Mehr über die Methodik",
      status: {
        "on-track": "Auf Kurs",
        "off-track": "Nicht auf Kurs",
        unknown: "Unbekannt",
      },
      domainLabels: {
        "state-capacity": "Staatliche Kapazität",
        housing: "Wohnen",
        labour: "Arbeit",
        migration: "Migration",
        innovation: "Innovation",
        energy: "Energie",
        education: "Bildung",
        "economic-growth": "Wirtschaftswachstum",
        pensions: "Renten",
        defence: "Verteidigung",
      },
    },
    common: {
      learnMore: "Mehr erfahren",
      viewAll: "Alle anzeigen",
      back: "Zurück",
      loading: "Laden...",
      illustrative: "Illustrativ — erfordert Evidenzprüfung",
      experimentalScore: "Experimentelles Priorisierungsmodell",
      hypothesis: "Hypothese",
      noData: "Keine Daten verfügbar",
      short: "Kurzfristig",
      medium: "Mittelfristig",
      long: "Langfristig",
      low: "Niedrig",
      high: "Hoch",
      unknown: "Unbekannt",
      home: "Startseite",
      impact: "Wirkung",
    },
    footer: {
      text: "Deutschland Policy Lab — überparteilich, evidenzbasiert. Alle Daten illustrativ, sofern nicht zitiert.",
    },
  },
  en: {
    nav: {
      home: "Home",
      dashboard: "Germany 2036",
      policies: "Policies",
      compare: "Compare",
      ask: "AI Research",
      research: "Research",
      methodology: "Methodology",
      about: "About",
    },
    home: {
      hero: "Germany can work better.",
      subtitle: "A public, evidence-driven policy intelligence platform for Germany.",
      quote:
        "Instead of asking which party proposed an idea, ask: Did it work? Where? At what cost? Under what conditions?",
      principles: {
        title: "Six Core Principles",
        subtitle: "What good policy delivers",
        items: [
          {
            title: "Prosperity",
            description:
              "Broad-based economic growth that raises living standards for all, not just for those already well-off.",
          },
          {
            title: "Capability",
            description:
              "A state that can design, implement, and evaluate policy effectively — competent, fast, and trusted.",
          },
          {
            title: "Control",
            description:
              "Citizens and communities have meaningful say over the decisions that shape their lives.",
          },
          {
            title: "Opportunity",
            description:
              "Everyone can develop their potential regardless of background, region, or starting point.",
          },
          {
            title: "Security",
            description:
              "Protection from economic shocks, crime, and geopolitical risk — without trading away freedom.",
          },
          {
            title: "Resilience",
            description:
              "An economy and society that can absorb disruption and adapt to change without systemic breakdown.",
          },
        ],
      },
      domains: {
        title: "Explore Policy Domains",
        subtitle: "Ten areas of reform",
      },
      dashboardTitle: "Germany 2036",
      dashboardSubtitle:
        "Illustrative targets across all ten domains — where Germany could be in a decade with effective reform.",
      dashboardCta: "View 2036 targets",
      dashboardLabel: "Long-term targets",
      statsLabel: "policy interventions · 10 domains · Evidence-driven",
      exploreBtn: "Explore policies",
      askBtn: "Ask a question",
    },
    policies: {
      title: "Policy Explorer",
      subtitle: "Evidence-based policy hypotheses for Germany",
      filterDomain: "Domain",
      filterEvidence: "Evidence Strength",
      filterStatus: "Status",
      filterTime: "Time Horizon",
      sortBy: "Sort by",
      sortPriority: "Priority score",
      sortImpact: "Expected impact",
      sortConfidence: "Confidence",
      sortEase: "Ease of implementation",
      hypothesis: "Hypothesis",
      disclaimer: "This is a hypothesis, not a recommendation.",
      allDomains: "All domains",
      anyEvidence: "Any evidence strength",
      anyStatus: "Any status",
      anyTime: "Any time horizon",
      minImpact: "Min. impact",
      resetFilters: "Reset filters",
      clearFilters: "Clear filters",
      showing: "Showing",
      of: "of",
      policiesCount: "policies",
      noMatch: "No policies match your current filters.",
      timeShort: "Short (< 2 years)",
      timeMedium: "Medium (2–5 years)",
      timeLong: "Long (5+ years)",
      browseBtn: "Browse policies",
    },
    evidence: {
      "very-low": "Very Low",
      low: "Low",
      medium: "Medium",
      high: "High",
    },
    status: {
      idea: "Idea",
      researching: "Researching",
      "evidence-supported": "Evidence Supported",
      pilot: "Pilot",
      implemented: "Implemented",
      evaluated: "Evaluated",
    },
    domains: {
      "state-capacity": "State Capacity",
      housing: "Housing & Construction",
      labour: "Labour & Taxation",
      migration: "Migration & Integration",
      innovation: "Innovation & Technology",
      energy: "Energy & Industry",
      education: "Education & Skills",
      "economic-growth": "Economic Growth",
      pensions: "Pensions & Demographics",
      defence: "Defence & Resilience",
    },
    domainDescriptions: {
      "state-capacity":
        "Digitalising and streamlining public administration to reduce bureaucratic burden.",
      housing: "Addressing supply shortfalls and planning delays in Germany's urban housing markets.",
      labour: "Removing tax and regulatory barriers that suppress labour supply and productivity.",
      migration: "Attracting and integrating skilled workers while managing asylum processes fairly.",
      innovation:
        "Building a startup and research ecosystem that turns ideas into competitive companies.",
      energy:
        "Accelerating the energy transition while keeping industrial electricity costs competitive.",
      education:
        "Raising learning outcomes and closing achievement gaps through evidence-based teaching.",
      "economic-growth": "Structural reforms to revive Germany's long-run growth potential.",
      pensions:
        "Ensuring pension sustainability while unlocking the labour potential of older workers.",
      defence:
        "Meeting NATO commitments and rebuilding defence capability in a changed security environment.",
    },
    detail: {
      problem: "Problem",
      objective: "Objective",
      intervention: "Intervention Hypothesis",
      interventionNote: "Testable hypothesis",
      evidence: "Evidence",
      examples: "International Examples",
      outcome: "Outcome",
      impact: "Expected Impact",
      cost: "Estimated Cost",
      difficulty: "Implementation Difficulty",
      ease: "Ease of implementation",
      timeToImpact: "Time to Impact",
      risks: "Risks",
      tradeoffs: "Trade-offs",
      counterarguments: "Counterarguments",
      kpis: "Key Performance Indicators",
      kpiMetric: "Metric",
      kpiBaseline: "Baseline",
      kpiTarget: "Target",
      kpiNote: "All KPI values are illustrative — requires evidence review",
      sources: "Sources",
      sourceView: "View source →",
      openQuestions: "Open Research Questions",
      whatWouldChangeMind: "What Would Change Our Mind?",
      increaseConfidence: "Would increase confidence",
      decreaseConfidence: "Would decrease confidence",
      abandon: "Would abandon recommendation",
      confidence: "Confidence",
      priorityScore: "Priority Score",
      priorityNote: "Experimental prioritisation model",
      affectedGroups: "Affected Groups",
      lastReviewed: "Last reviewed",
      illustrative: "Illustrative — requires evidence review",
      hypothesisWarning: "This is a hypothesis, not a recommendation.",
      hypothesisDetail:
        "Evidence strength is {{strength}}. Treat all analysis on this page as exploratory. Do not use in policy briefs without expert review.",
      compareThis: "Compare this policy",
      backToAll: "← Back to all policies",
      estimatedCost: "Estimated cost",
    },
    compare: {
      title: "Policy Comparison",
      subtitle: "Comparing {{count}} {{label}}",
      policyLabel: "policy",
      policiesLabel: "policies",
      addPolicy: "+ Add more policies",
      noPolicies: "No policies selected",
      noPoliciesDesc: "Add policies to compare from the policy explorer.",
      browseBtn: "Browse policies",
      attribute: "Attribute",
      domain: "Domain",
      status: "Status",
      evidenceStrength: "Evidence Strength",
      impact: "Expected Impact",
      difficulty: "Difficulty",
      cost: "Estimated Cost",
      time: "Time to Impact",
      confidence: "Confidence",
      priorityScore: "Priority Score",
      disclaimer:
        "All scores are illustrative — experimental prioritisation model, not a policy recommendation.",
      unknown: "Unknown",
    },
    ask: {
      title: "Ask a policy question",
      subtitle: "Evidence-based answers drawn from the policy database and research library.",
      placeholder: "Ask a question about German policy...",
      send: "Ask",
      demoMode:
        "Demo mode — AI not connected. Set ANTHROPIC_API_KEY to enable.",
      suggestions: [
        "Which policies have the strongest evidence?",
        "What are the biggest barriers to housing reform?",
        "How does Germany compare on skilled migration?",
        "What would most increase economic growth?",
        "Which policies could be implemented quickly?",
      ],
      promptHint:
        "Ask anything about German policy — evidence, trade-offs, international comparisons.",
      disclaimer:
        "Responses are AI-generated and may be incorrect. Always verify with primary sources.",
      errorMsg: "Sorry, there was an error processing your question. Please try again.",
      confidence: "confidence",
    },
    about: {
      title: "About Deutschland Policy Lab",
      what: "What it is",
      whatText1:
        "Deutschland Policy Lab is an open-source, non-partisan policy intelligence platform. It collects, structures, and evaluates evidence on the most important reform challenges facing Germany — from housing and state digitalisation to skilled migration, energy, and education.",
      whatText2:
        "Every policy profile asks the same questions: What is the problem? What intervention is proposed? What does the evidence say? What would it cost? Who benefits, who bears the cost? What would change our mind?",
      why: "Why it exists",
      whyText1:
        "German public debate spends enormous energy on party positions, coalition arithmetic, and procedural questions. The empirical question — \"does this policy actually work?\" — is often secondary or absent.",
      quote:
        "The goal is not to automate democracy. The goal is to make the empirical part of policymaking much better.",
      whyText2:
        "Better evidence does not produce better policy on its own. But the absence of good evidence infrastructure makes it very easy to ignore evidence when it is inconvenient. This project is a small attempt to build that infrastructure in public.",
      notWhat: "What it is not",
      notWhatItems: [
        "Not affiliated with any political party, government, or lobby group",
        "Not a replacement for democratic deliberation — this tool informs debate, it does not resolve it",
        "Not a source of authoritative data — all figures are illustrative unless explicitly cited and should be verified against primary sources",
        "Not professionally peer-reviewed — this is an open-source project in early development",
        "Not a policy recommendation engine — priority scores are experimental and should not be used as decision criteria",
      ],
      principles: "Non-partisan principles",
      principlesIntro: "All analysis follows these rules:",
      principlesItems: [
        "Never frame a policy question in terms of party positions or electoral outcomes",
        "Explicitly separate FACT, EVIDENCE, ASSUMPTION, PROPOSAL, and UNCERTAINTY",
        "Always present the strongest version of counterarguments",
        "Disclose the limitations of every source cited",
        "Show what would change our assessment — not just evidence that supports it",
        "Label all numbers with appropriate uncertainty",
      ],
      contribute: "How to contribute",
      contributeText: "The project is open source. You can contribute by:",
      contributeItems: [
        "Adding new policy profiles (following the structured template)",
        "Improving evidence citations on existing profiles",
        "Identifying counterarguments or open questions we have missed",
        "Flagging factual errors or outdated information",
        "Improving the code, design, or methodology documentation",
      ],
      contributeBtn: "View on GitHub →",
      status: "Project status",
      statusBadge: "Experimental — Early Stage",
      statusNote: "Data is illustrative. Not suitable for official policy use.",
      statusDesc:
        "This is an early-stage research project. The policy database, evidence classifications, and scoring models are works in progress and should be treated accordingly. We welcome critical feedback.",
    },
    methodology: {
      title: "Evidence Framework",
      subtitle:
        "How we classify evidence, assess confidence, score policies, and decide what would change our minds.",
      evidenceClassTitle: "1. Evidence classification",
      evidenceClassDesc:
        "Every claim in a policy profile is assigned one of five types. This forces explicit distinction between verified facts and working hypotheses.",
      evidenceStrengthTitle: "2. Evidence strength",
      evidenceStrengthDesc:
        "Each policy is assigned an overall evidence strength rating based on the quality, quantity, and generalisability of relevant studies.",
      confidenceTitle: "3. Confidence percentage",
      confidenceDesc:
        "The confidence percentage (0–100%) is a synthetic judgment combining:",
      confidenceItems: [
        "Quality and consistency of the underlying evidence base",
        "Transferability of international examples to the German context",
        "Degree of expert consensus on mechanism and effect size",
        "Remaining uncertainty about implementation and politics",
      ],
      confidenceNote:
        "Important: Confidence percentages are illustrative expert judgments, not probabilistic model outputs. They should be read as rough ordinal indicators (\"high / medium / low\") rather than precise probabilities.",
      priorityTitle: "4. Priority score formula",
      priorityDesc:
        "The priority score is an experimental ranking tool. It combines impact, evidence quality, confidence, and implementation difficulty into a single number (0–100).",
      priorityFormula1:
        "raw = (expectedImpact × evidenceWeight × confidence) / implementationDifficulty",
      priorityFormula2: "score = round((raw / 5) × 100)",
      priorityNote: "Experimental prioritisation model — not a policy recommendation",
      whatTitle: '5. "What would change our mind?"',
      whatDesc:
        "Each policy profile includes an explicit section on what evidence would update our assessment.",
      whatItems: [
        {
          icon: "↑",
          color: "green",
          title: "Would increase confidence",
          desc: "Evidence that would make us more confident the intervention would work as hypothesised.",
        },
        {
          icon: "↓",
          color: "yellow",
          title: "Would decrease confidence",
          desc: "Findings that would weaken our assessment without necessarily abandoning the direction.",
        },
        {
          icon: "✕",
          color: "red",
          title: "Would abandon recommendation",
          desc: "Evidence or findings so contrary that the intervention should be dropped or fundamentally redesigned.",
        },
      ],
      whatNote:
        "This structure reflects a Popperian commitment to falsifiability: good policy analysis should specify in advance what would constitute counter-evidence, not just accumulate supporting evidence.",
      researchTitle: "Research Principles",
      researchDesc:
        "All analysis follows a set of non-partisan research principles: separate evidence from opinion, disclose uncertainty, present counterarguments, avoid party framing, and cite sources.",
      researchLink: "Read about the project →",
    },
    research: {
      title: "Research Library",
      subtitle:
        "All sources cited in the policy database, grouped by type. {{count}} sources across {{cats}} categories.",
      relatedPolicies: "Related policies:",
      sourceLink: "Source →",
      aboutTitle: "About this library",
      aboutDesc:
        "Sources were selected to represent the strongest available evidence on each policy domain. Inclusion does not imply endorsement of all conclusions. See the",
      aboutLink: "methodology page",
    },
    dashboard: {
      title: "Germany 2036",
      subtitle:
        "Illustrative national objectives — data will be updated as evidence becomes available.",
      disclaimer:
        "⚠️ All figures are illustrative targets. They require evidence review and expert validation before any policy use. Do not cite these numbers as official projections or policy commitments.",
      warningTitle: "Illustrative targets only",
      current: "Current",
      target2030: "2030",
      target2036: "2036",
      confidenceNote: "Confidence: illustrative — requires evidence review",
      viewPolicies: "View {{label}} policies →",
      aboutTitle: "About these targets",
      aboutDesc:
        "Targets were constructed by reviewing international benchmarks, existing German government targets (where available), and independent research institution projections.",
      aboutLink: "methodology page",
      status: {
        "on-track": "On Track",
        "off-track": "Off Track",
        unknown: "Unknown",
      },
      domainLabels: {
        "state-capacity": "State Capacity",
        housing: "Housing",
        labour: "Labour",
        migration: "Migration",
        innovation: "Innovation",
        energy: "Energy",
        education: "Education",
        "economic-growth": "Economic Growth",
        pensions: "Pensions",
        defence: "Defence",
      },
    },
    common: {
      learnMore: "Learn more",
      viewAll: "View all",
      back: "Back",
      loading: "Loading...",
      illustrative: "Illustrative — requires evidence review",
      experimentalScore: "Experimental prioritisation model",
      hypothesis: "Hypothesis",
      noData: "No data available",
      short: "Short-term",
      medium: "Medium-term",
      long: "Long-term",
      low: "Low",
      high: "High",
      unknown: "Unknown",
      home: "Home",
      impact: "Impact",
    },
    footer: {
      text: "Deutschland Policy Lab — non-partisan, evidence-driven. All data illustrative unless cited.",
    },
  },
}

export type Translations = typeof translations.de

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function t(lang: Lang, path: string): string {
  const keys = path.split(".")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let obj: any = translations[lang]
  for (const key of keys) {
    if (obj === undefined) return path
    obj = obj[key]
  }
  return typeof obj === "string" ? obj : path
}

export function getLang(langStr: string): Lang {
  return langStr === "en" ? "en" : "de"
}
