export interface Source {
  id: string
  title: string
  authors: string[]
  year: number
  institution: string
  url: string
  summary: string
  relevantPolicies: string[]
  type: "academic" | "government" | "ngo" | "think-tank" | "international-org"
}

const sources: Source[] = [
  {
    id: "svr-2023-jahresgutachten",
    title: "Jahresgutachten 2023/24: Wachstumsschwäche überwinden – in die Zukunft investieren",
    authors: ["Monika Schnitzer", "Ulrike Malmendier", "Martin Werding", "Veronika Grimm", "Achim Truger"],
    year: 2023,
    institution: "Sachverständigenrat zur Begutachtung der gesamtwirtschaftlichen Entwicklung",
    url: "https://www.sachverstaendigenrat-wirtschaft.de/jahresgutachten-2023.html",
    summary:
      "The Council of Economic Experts diagnoses Germany's structural growth weakness, attributing it to high energy costs, insufficient public investment, a shrinking labour force, and sluggish digitalisation of public administration. Recommends reducing bureaucratic burden on firms and households, accelerating grid and transport infrastructure planning, and reforming the debt brake to allow productive investment.",
    relevantPolicies: [
      "once-only-principle",
      "binding-admin-deadlines",
      "marginal-tax-reform",
      "grid-acceleration",
      "standard-case-automation",
    ],
    type: "government",
  },
  {
    id: "bundesbank-2024-fachkraeftemangel",
    title: "Fachkräftemangel in Deutschland: Ursachen, Auswirkungen und Lösungsansätze",
    authors: ["Deutsche Bundesbank Research Staff"],
    year: 2024,
    institution: "Deutsche Bundesbank",
    url: "https://www.bundesbank.de/resource/blob/fachkraeftemangel-2024.pdf",
    summary:
      "Bundesbank analysis of Germany's structural labour shortage estimates a gap of 300,000–500,000 workers in skilled trades and technical professions by 2030. Models show that faster skilled-migration processing combined with reducing disincentives for part-time workers to increase hours could offset a significant share of the projected shortfall. Highlights barriers in recognition of foreign qualifications as a key bottleneck.",
    relevantPolicies: [
      "fast-track-skilled-migration",
      "post-retirement-employment",
      "marginal-tax-reform",
      "asylum-processing-speed",
    ],
    type: "government",
  },
  {
    id: "oecd-2023-germany-econ-survey",
    title: "OECD Economic Surveys: Germany 2023",
    authors: ["OECD Economics Department"],
    year: 2023,
    institution: "OECD",
    url: "https://www.oecd.org/economy/surveys/germany-2023-oecd-economic-survey.pdf",
    summary:
      "Comprehensive OECD survey identifying Germany's main structural challenges: low productivity growth, high implicit marginal tax rates in the lower income range ('Niedriglohnfalle'), housing shortages in urban centres, and under-investment in education and R&D. Recommends tax-wedge reduction, zoning liberalisation around transit hubs, and strengthening technology transfer from universities to the private sector.",
    relevantPolicies: [
      "marginal-tax-reform",
      "transit-density",
      "research-commercialisation",
      "evidence-based-teaching",
      "startup-equity",
    ],
    type: "international-org",
  },
  {
    id: "imf-2024-germany-article-iv",
    title: "Germany: 2024 Article IV Consultation Staff Report",
    authors: ["IMF European Department"],
    year: 2024,
    institution: "International Monetary Fund",
    url: "https://www.imf.org/en/Publications/CR/Issues/2024/germany-article-iv",
    summary:
      "IMF Article IV consultation warns of Germany's declining competitiveness and fiscal space constraints. Notes that Germany's effective marginal tax rates on second earners and low-income workers are among the highest in the OECD, suppressing labour supply. Recommends energy transition acceleration, pension system reforms to extend working life, and immigration reforms to sustain labour force size.",
    relevantPolicies: [
      "marginal-tax-reform",
      "post-retirement-employment",
      "fast-track-skilled-migration",
      "grid-acceleration",
      "eu-grid-integration",
    ],
    type: "international-org",
  },
  {
    id: "mckinsey-2023-germany-productivity",
    title: "Germany's Productivity Imperative: Closing the Gap in the Digital Age",
    authors: ["Sven Smit", "Jan Mischke", "Christopher Dohrmann"],
    year: 2023,
    institution: "McKinsey Global Institute",
    url: "https://www.mckinsey.com/mgi/germany-productivity-imperative-2023",
    summary:
      "McKinsey estimates Germany could add 1.2–1.8 percentage points to annual GDP growth by closing its digital and productivity gaps relative to the US and leading EU peers. Digitalisation of public administration alone is estimated to save businesses €15bn annually in compliance costs. Startup ecosystem improvements — particularly equity compensation reform — are identified as high-ROI levers for innovation capacity.",
    relevantPolicies: [
      "digital-citizen-account",
      "once-only-principle",
      "startup-equity",
      "research-commercialisation",
      "standard-case-automation",
    ],
    type: "think-tank",
  },
  {
    id: "bertelsmann-2024-verwaltungsdigitalisierung",
    title: "Verwaltungsdigitalisierung in Deutschland: Status quo und Reformbedarf",
    authors: ["Anette Hackmann", "Tobias Plates"],
    year: 2024,
    institution: "Bertelsmann Stiftung",
    url: "https://www.bertelsmann-stiftung.de/verwaltungsdigitalisierung-2024",
    summary:
      "Benchmarks German public administration digitalisation against EU peers using the EU eGovernment Benchmark. Germany ranks 18th of 27 EU member states. Only 34% of public services are available end-to-end digitally. Key barriers identified: federal fragmentation, lack of interoperable identity infrastructure, and insufficient data-sharing between agencies. Estonia and Denmark are recommended as primary reference models.",
    relevantPolicies: [
      "digital-citizen-account",
      "once-only-principle",
      "standard-case-automation",
      "binding-admin-deadlines",
      "digital-permitting",
    ],
    type: "ngo",
  },
  {
    id: "diw-2023-wohnungsmarkt",
    title: "Wohnungsmarkt Deutschland 2023: Preisdynamik, Angebotsengpässe und Politikoptionen",
    authors: ["Claus Michelsen", "Konstantin Kholodilin", "Marius Lübbers"],
    year: 2023,
    institution: "DIW Berlin",
    url: "https://www.diw.de/documents/publikationen/wohnungsmarkt-2023.pdf",
    summary:
      "DIW finds Germany faces a structural housing undersupply of approximately 700,000 units, concentrated in major metropolitan areas. Local zoning restrictions and lengthy permitting processes — averaging 14.5 months — are the primary supply-side bottlenecks. Modelling shows transit-oriented upzoning and standardised type approvals could each reduce average permitting time by 30–40% and increase new construction by 15–25%.",
    relevantPolicies: ["transit-density", "standardised-building-regs", "digital-permitting"],
    type: "think-tank",
  },
  {
    id: "iza-2024-marginal-tax",
    title: "Implicit Marginal Tax Rates and Labour Supply in Germany: Evidence from the Mini- and Midi-Job Thresholds",
    authors: ["Andreas Peichl", "Nico Pestel", "Holger Stichnoth"],
    year: 2024,
    institution: "IZA – Institute of Labor Economics",
    url: "https://www.iza.org/publications/dp/marginal-tax-germany-2024",
    summary:
      "Quasi-experimental study exploiting kinks in Germany's mini-job and midi-job earnings thresholds shows that workers — particularly women — bunch at these thresholds rather than increasing hours. Estimated efficiency loss is 0.3–0.7% of GDP annually. Reforms that smooth marginal rates at these thresholds could increase aggregate labour supply by 1–3% among affected groups, with the effect concentrated in the 20–45 age bracket.",
    relevantPolicies: ["marginal-tax-reform", "post-retirement-employment"],
    type: "academic",
  },
  {
    id: "world-bank-2023-business-regs",
    title: "Business Ready 2023: Germany Country Profile",
    authors: ["World Bank Group"],
    year: 2023,
    institution: "World Bank",
    url: "https://www.worldbank.org/en/businessready/economy/Germany",
    summary:
      "World Bank's Business Ready report ranks Germany 22nd globally on ease of doing business, with particular weaknesses in dealing with construction permits (ranked 51st) and cross-border regulation compliance. The report identifies complex building regulations and multi-layer approval processes as major barriers to housing and commercial construction. Recommends adoption of a standardised national building code and digital-first permitting.",
    relevantPolicies: ["standardised-building-regs", "digital-permitting", "binding-admin-deadlines"],
    type: "international-org",
  },
  {
    id: "ifo-2024-fachkraeftezuwanderung",
    title: "Fachkräftezuwanderung: Potenziale des Chancen-Aufenthaltsgesetzes und Handlungsbedarfe",
    authors: ["Panu Poutvaara", "Florian Neumeier", "Simon Wiederhold"],
    year: 2024,
    institution: "ifo Institut",
    url: "https://www.ifo.de/publikationen/fachkraeftezuwanderung-2024",
    summary:
      "ifo evaluates Germany's skilled immigration framework post-Chancen-Aufenthaltsgesetz and finds average visa processing times of 4–7 months remain far above competitor nations (Canada: 2–3 weeks for Express Entry). Modelling suggests that reducing processing to 30 days for pre-approved occupational categories could increase net skilled immigration by 40,000–80,000 annually. Recommends pre-verification agreements with source countries and dedicated fast-track units.",
    relevantPolicies: ["fast-track-skilled-migration", "asylum-processing-speed"],
    type: "think-tank",
  },
  {
    id: "european-commission-2024-energy-union",
    title: "State of the Energy Union 2024",
    authors: ["European Commission DG Energy"],
    year: 2024,
    institution: "European Commission",
    url: "https://energy.ec.europa.eu/state-energy-union-2024",
    summary:
      "Annual Energy Union progress report documents that cross-border interconnection capacity in the EU remains insufficient to fully exploit renewable generation surpluses. Germany's grid is identified as a particular bottleneck: internal north-south congestion and inadequate interconnections to France, Poland, and Austria limit the economic value of wind generation. Report recommends fast-track permitting for interconnectors under the TEN-E Regulation and expanded intraday cross-border trading.",
    relevantPolicies: ["grid-acceleration", "eu-grid-integration", "industrial-demand-flexibility"],
    type: "international-org",
  },
  {
    id: "bmwk-2024-industriestrategie",
    title: "Industriestrategie 2030 – Aktualisierung: Wettbewerbsfähigkeit, Dekarbonisierung und Digitalisierung",
    authors: ["Bundesministerium für Wirtschaft und Klimaschutz"],
    year: 2024,
    institution: "BMWK",
    url: "https://www.bmwk.de/industriestrategie-2030-aktualisierung",
    summary:
      "Updated BMWK industrial strategy assesses the competitiveness of German manufacturing in the context of energy transition and global competition. Identifies high and volatile electricity costs as a primary threat to energy-intensive industries. Proposes demand-flexibility incentives, accelerated grid investment, and EU-level energy market integration as complementary levers to reduce industrial electricity costs by 20–30% by 2030.",
    relevantPolicies: ["industrial-demand-flexibility", "grid-acceleration", "eu-grid-integration"],
    type: "government",
  },
  {
    id: "bertelsmann-2024-bildungsmonitor",
    title: "Bildungsmonitor 2024: Bildungsqualität und Reformbedarf im internationalen Vergleich",
    authors: ["Christian Böllert", "Dirk Dohmen", "Nina Massag"],
    year: 2024,
    institution: "Bertelsmann Stiftung",
    url: "https://www.bertelsmann-stiftung.de/bildungsmonitor-2024",
    summary:
      "Annual education monitor finds Germany's PISA-adjusted learning outcomes have deteriorated over the past decade, with growing achievement gaps by socioeconomic background. Teacher training remains largely disconnected from evidence-based pedagogical research. Full-day schooling (Ganztagsschule) coverage is 50% but quality varies enormously, with many programmes offering only supervised homework rather than structured educational enrichment.",
    relevantPolicies: ["evidence-based-teaching", "extended-school-day"],
    type: "ngo",
  },
  {
    id: "diw-2024-rentenreform",
    title: "Rentenreform und Erwerbstätigkeit im Alter: Internationale Evidenz und Handlungsoptionen",
    authors: ["Johannes Geyer", "Peter Haan", "Anna Hammerschmid"],
    year: 2024,
    institution: "DIW Berlin",
    url: "https://www.diw.de/publikationen/rentenreform-erwerbstaetigkeit-2024",
    summary:
      "DIW analysis of pension system design and post-retirement employment across OECD countries finds that Germany's hinzuverdienstgrenzen (earnings ceilings post-retirement) and the full social contribution liability on post-retirement employment create effective marginal tax rates of 70–90% for retirees who wish to work. Reforms modelled after Sweden's and Japan's systems — which allow earnings accumulation without penalty — are estimated to increase labour supply by 100,000–200,000 FTE equivalents.",
    relevantPolicies: ["post-retirement-employment", "marginal-tax-reform"],
    type: "think-tank",
  },
  {
    id: "startup-genome-2024-germany",
    title: "Global Startup Ecosystem Report 2024: Germany Deep Dive",
    authors: ["Startup Genome"],
    year: 2024,
    institution: "Startup Genome",
    url: "https://startupgenome.com/reports/global-startup-ecosystem-report-2024/germany",
    summary:
      "Benchmarks Berlin, Munich, and Hamburg against London, Stockholm, and Paris. Germany ranks below peer ecosystems on talent density, exit activity, and founder experience. Employee stock option taxation is identified as a critical disadvantage: in Germany, VSOP/phantom stock is taxed at exercise (often before liquidity), whereas the UK and US allow deferral to sale. This creates cash-flow problems for employees and reduces the attractiveness of equity compensation as a recruiting tool for early-stage startups.",
    relevantPolicies: ["startup-equity", "research-commercialisation"],
    type: "think-tank",
  },
  {
    id: "acatech-2023-innovationsindikator",
    title: "Innovationsindikator 2023: Deutschland im internationalen Wettbewerb",
    authors: ["acatech", "BDI", "Joachim Henkel", "Marion Weissenberger-Eibl"],
    year: 2023,
    institution: "acatech – Deutsche Akademie der Technikwissenschaften",
    url: "https://www.acatech.de/innovationsindikator-2023",
    summary:
      "Annual innovation indicator places Germany 9th among 35 countries, down from 6th in 2018. Weaknesses concentrated in venture capital density, startup formation rates, and university-industry knowledge transfer. Germany's Professorenmodell — in which university professors retain IP rights developed during their employment — is identified as a specific barrier to spin-out formation relative to UK and US models where universities hold IP and license it to spin-outs with favourable terms.",
    relevantPolicies: ["research-commercialisation", "startup-equity"],
    type: "ngo",
  },
]

export default sources
