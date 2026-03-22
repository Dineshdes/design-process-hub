// ── Single source of truth for all blog posts ──────────────────────────────
// Used by: /app/blog/page.tsx · /app/blog/[slug]/page.tsx · /components/ui/blog-callout.tsx

export type BlogSection = {
  type: "h2" | "h3" | "p" | "ul" | "blockquote" | "divider";
  text?: string;
  items?: string[];
};

export type BlogPost = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorBio: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  body: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-net-zero-targets-fail",
    tag: "Net-Zero Strategy",
    title: "Why 90% of corporate net-zero targets will fail — and how to be in the 10%",
    excerpt:
      "Most decarbonisation commitments are built on assumptions, not data. Here's what separates the organisations that actually reach net-zero from those that don't.",
    author: "Mia Thornton",
    authorRole: "Head of Climate Strategy",
    authorBio: "Mia leads climate strategy at Verdant, helping Fortune 500 companies build science-aligned decarbonisation roadmaps. Previously at McKinsey Sustainability.",
    date: "18 Mar 2024",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1600&q=85",
    featured: true,
    body: [
      { type: "p", text: "In 2021, a wave of corporate net-zero pledges swept through boardrooms worldwide. By 2023, the Science Based Targets initiative had validated commitments from over 7,000 companies. The numbers looked impressive — until researchers started asking a harder question: are any of these actually on track?" },
      { type: "p", text: "The answer, from almost every independent analysis, is no. A 2023 New Climate Institute study found that the net-zero targets of 24 of the world's largest companies would deliver, on average, a 40% absolute emissions reduction by 2050 — not the 100% implied by the term 'net-zero'. The credibility gap is enormous." },
      { type: "h2", text: "The three failure modes" },
      { type: "p", text: "After working with hundreds of companies on their decarbonisation strategies, we've identified three patterns that reliably predict failure. Understanding them is the first step to avoiding them." },
      { type: "h3", text: "1. Targets built on offsets, not reductions" },
      { type: "p", text: "The most common failure mode is treating carbon offsets as a substitute for emissions reductions rather than a bridge. A company announces net-zero by 2040, but when you read the small print, 70% of that commitment is delivered through carbon credits — reforestation projects, cookstove programmes, renewable energy certificates — rather than actual cuts to their own emissions." },
      { type: "p", text: "The problem isn't offsets per se. High-quality offsets from verified projects have a legitimate role in a net-zero strategy, particularly for residual emissions that are genuinely hard to abate. The problem is when offsets become the strategy, not the supplement." },
      { type: "h3", text: "2. Scope 3 blind spots" },
      { type: "p", text: "For most companies, Scope 3 emissions — those generated upstream in the supply chain and downstream by customers using their products — represent between 70% and 90% of total climate impact. Yet the majority of corporate net-zero commitments focus almost entirely on Scope 1 and 2." },
      { type: "blockquote", text: "You cannot reach net-zero while ignoring the 80% of your emissions you don't directly control. The supply chain is where the decarbonisation battle will be won or lost." },
      { type: "p", text: "This isn't just a measurement problem. It's a strategy problem. If a consumer goods company reduces its own factory emissions to zero but continues to source from carbon-intensive suppliers, and its products continue to generate emissions in use and disposal, it has not reached net-zero in any meaningful sense." },
      { type: "h3", text: "3. Milestones without mechanisms" },
      { type: "p", text: "The third failure mode is pledging a destination without mapping the route. 'Net-zero by 2040' is a press release, not a plan. A real net-zero strategy requires specific milestones — what emissions will be reduced by when, through which interventions, at what cost — and accountability mechanisms that survive leadership changes and quarterly earnings pressure." },
      { type: "h2", text: "What the 10% do differently" },
      { type: "p", text: "The organisations that actually reach their climate targets share a set of practices that, individually, seem obvious — but collectively represent a fundamentally different approach to decarbonisation." },
      { type: "ul", items: [
        "They measure everything, including Scope 3, before they set targets. You cannot manage what you cannot see.",
        "They build decarbonisation into capital allocation decisions, not just sustainability reports.",
        "They engage suppliers as partners in the transition, providing data tools and technical support.",
        "They set interim targets — 2025, 2030 — with as much rigour as the headline 2050 commitment.",
        "They have independent assurance on their emissions data, not just self-reported numbers.",
      ]},
      { type: "h2", text: "The role of technology" },
      { type: "p", text: "One variable that consistently separates the leaders from the laggards is the quality of their emissions data infrastructure. Companies that rely on annual spreadsheet exercises to calculate their carbon footprint are working with information that is too old, too aggregated, and too uncertain to drive real decision-making." },
      { type: "p", text: "The organisations we see making genuine progress have invested in live data pipelines that connect energy meters, ERP systems, supplier data portals, and logistics platforms to a single carbon accounting layer. They know their emissions in near-real-time. They can model the impact of a procurement decision before they make it. They can report to any framework with a click, not a quarter." },
      { type: "divider" },
      { type: "p", text: "The gap between corporate net-zero ambition and corporate net-zero action is not a communications problem. It is a strategy and infrastructure problem. The good news is that both are solvable — and the organisations doing the work right now are building durable competitive advantages that will matter enormously in a carbon-constrained world." },
    ],
  },
  {
    slug: "voluntary-carbon-market-2024",
    tag: "Carbon Markets",
    title: "The voluntary carbon market in 2024: what's actually working",
    excerpt:
      "After a turbulent 2023, the voluntary carbon market is stabilising. We look at which methodologies are holding up under scrutiny.",
    author: "James Okafor",
    authorRole: "Carbon Markets Lead",
    authorBio: "James covers carbon markets and nature finance at Verdant. Former analyst at Ecosystem Marketplace and Climate Policy Initiative.",
    date: "12 Mar 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=85",
    body: [
      { type: "p", text: "The voluntary carbon market had a bruising 2023. A series of high-profile investigative reports questioned the integrity of some of the market's most traded methodologies — particularly REDD+ forest protection projects. Prices collapsed, issuances fell, and buyers retreated. Many observers wondered whether the market would survive at all." },
      { type: "p", text: "Now, in mid-2024, a clearer picture is emerging. The market has not died — it has bifurcated. The projects and methodologies that have held up under scrutiny are trading at a premium. The ones that haven't are effectively frozen." },
      { type: "h2", text: "What's holding up" },
      { type: "p", text: "Across the categories of carbon credits, three types have demonstrated resilience: cookstove and clean energy projects with robust MRV; engineered carbon removal including direct air capture and enhanced weathering; and high-integrity forest credits with satellite monitoring and independent verification." },
      { type: "blockquote", text: "The crisis of 2023 was not a crisis of carbon markets. It was a crisis of low-quality carbon markets. The distinction matters enormously." },
      { type: "h2", text: "The role of new standards" },
      { type: "p", text: "The Integrity Council for the Voluntary Carbon Market's Core Carbon Principles, launched in 2023 and now being applied to approved methodologies, have provided a much-needed quality floor. Projects that meet the CCPs are signalling a level of rigour that the market had previously lacked." },
      { type: "p", text: "Similarly, the Science Based Targets initiative's updated guidance on the role of carbon credits in corporate net-zero strategies — published in early 2024 — has clarified that credits can count toward beyond-value-chain mitigation claims, but not toward a company's own emissions reduction targets. This distinction is reshaping demand." },
      { type: "h2", text: "What buyers should do now" },
      { type: "ul", items: [
        "Focus on CCP-approved methodologies and projects with independent satellite or IoT-based monitoring.",
        "Separate your internal reduction targets from your offset strategy — credits are not reductions.",
        "Consider long-term offtake agreements with removal projects to lock in supply and prices.",
        "Disclose your credit portfolio publicly, including vintage, project type, and registry.",
        "Engage with suppliers on their own carbon strategies — Scope 3 reductions beat offsets every time.",
      ]},
    ],
  },
  {
    slug: "csrd-90-day-checklist",
    tag: "Reporting",
    title: "CSRD is here. Here's your 90-day readiness checklist",
    excerpt:
      "The EU Corporate Sustainability Reporting Directive now applies to 50,000 companies. Whether you're in scope or not, this checklist will prepare you.",
    author: "Sophie Laurent",
    authorRole: "Regulatory Affairs",
    authorBio: "Sophie leads regulatory affairs at Verdant, specialising in EU sustainability disclosure and ESRS implementation. Former policy adviser at the European Commission.",
    date: "5 Mar 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=85",
    body: [
      { type: "p", text: "The Corporate Sustainability Reporting Directive is the most significant expansion of sustainability disclosure requirements in a generation. From fiscal year 2024, large EU public-interest entities are required to report under the European Sustainability Reporting Standards — a comprehensive framework covering everything from climate strategy to workforce conditions to supply chain due diligence." },
      { type: "p", text: "By 2026, the requirements will extend to all large companies and listed SMEs operating in the EU. That means most multinationals, regardless of where they are headquartered, will need to comply." },
      { type: "h2", text: "Your 90-day readiness checklist" },
      { type: "h3", text: "Days 1–30: Understand your obligations" },
      { type: "ul", items: [
        "Determine your in-scope date based on company size, listing status, and fiscal year.",
        "Identify which ESRS standards apply to you — E1 (climate) is mandatory; others depend on materiality.",
        "Conduct a double materiality assessment to determine which sustainability topics are material from both impact and financial perspectives.",
        "Map your existing data collection processes against ESRS disclosure requirements.",
      ]},
      { type: "h3", text: "Days 31–60: Build your data infrastructure" },
      { type: "ul", items: [
        "Establish data ownership: assign responsible parties for each disclosure area.",
        "Connect your existing data sources — energy, HR, procurement, logistics — to a central reporting layer.",
        "Begin Scope 1, 2, and 3 emissions measurement if not already in place.",
        "Identify data gaps and create a plan to fill them, including supplier engagement.",
      ]},
      { type: "h3", text: "Days 61–90: Prepare your report" },
      { type: "ul", items: [
        "Draft disclosures using the ESRS templates, with clear links to source data.",
        "Engage your external auditor early — limited assurance is required from year one.",
        "Review for consistency with your financial reporting — CSRD requires integration.",
        "Brief your board: CSRD disclosures must be approved at board level.",
      ]},
      { type: "blockquote", text: "CSRD is not a compliance exercise. It is the most detailed picture of your business's relationship with the world that you will ever have to produce. Done well, it is a strategic asset." },
    ],
  },
  {
    slug: "ai-emissions-accounting",
    tag: "Technology",
    title: "How AI is rewriting the rules of emissions accounting",
    excerpt:
      "From satellite imagery to smart meter APIs, the data sources available to sustainability teams have multiplied. The bottleneck is now intelligence, not collection.",
    author: "Arjun Mehta",
    authorRole: "CTO",
    authorBio: "Arjun is CTO at Verdant, where he leads the engineering and AI teams. Previously an ML researcher at DeepMind working on climate and energy applications.",
    date: "28 Feb 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1600&q=85",
    body: [
      { type: "p", text: "For most of the past decade, the primary challenge in corporate carbon accounting was data collection. Getting energy invoices out of facilities teams, extracting procurement data from ERP systems, gathering travel records from expense platforms — the unglamorous work of building a carbon footprint consumed the majority of sustainability team bandwidth." },
      { type: "p", text: "That problem has not gone away, but it has changed character. The proliferation of smart meters, IoT sensors, supplier portals, satellite monitoring, and real-time logistics platforms means that data is, for the first time, genuinely available at scale. The new bottleneck is intelligence — the capacity to make sense of vast, heterogeneous datasets and turn them into actionable carbon accounting." },
      { type: "h2", text: "What AI actually does in emissions accounting" },
      { type: "p", text: "The application of machine learning to carbon accounting is not one thing. It is several distinct capabilities, each solving a different part of the problem." },
      { type: "h3", text: "Classification at scale" },
      { type: "p", text: "The most immediate application is automated GHG Protocol classification. A mid-sized company might have tens of thousands of line items in its procurement data, each of which needs to be mapped to a Scope 3 category and an emission factor. Doing this manually is prohibitively expensive. A well-trained classification model can do it in seconds, with accuracy that exceeds manual processing on any dataset of meaningful scale." },
      { type: "h3", text: "Anomaly detection" },
      { type: "p", text: "The second application is anomaly detection — identifying data points that are inconsistent with expected patterns. A facility that suddenly shows energy consumption three standard deviations above its baseline is either experiencing a genuine operational change or a data quality problem. AI can flag these anomalies in real-time, long before they show up in a year-end report." },
      { type: "blockquote", text: "The best carbon accounting system in the world is useless if the data flowing into it is wrong. AI changes the economics of data quality assurance entirely." },
      { type: "h3", text: "Emission factor selection" },
      { type: "p", text: "Perhaps the most technically complex application is intelligent emission factor selection. There are dozens of emission factor databases — IPCC, DEFRA, EPA, ecoinvent, various national registries — and for any given activity, the right factor depends on geography, fuel mix, supplier, vintage, and methodology. AI models trained on these databases can select the optimal factor for each data point automatically, and update selections as underlying databases are refreshed." },
      { type: "h2", text: "The limits of AI" },
      { type: "p", text: "AI in carbon accounting is not a substitute for quality source data or for expert judgment. A model trained on poor-quality procurement data will produce poor-quality emissions estimates. And the strategic decisions — which reduction pathways to prioritise, how to engage suppliers, how to disclose to different stakeholders — still require human expertise." },
      { type: "p", text: "What AI changes is the leverage available to sustainability teams. The same analyst who previously spent 60% of their time on data wrangling can now spend that time on the higher-order questions that actually drive decarbonisation." },
    ],
  },
  {
    slug: "green-bonds-transition-finance",
    tag: "Finance",
    title: "Green bonds, sustainability-linked loans, and transition finance explained",
    excerpt:
      "Three instruments, three purposes. A plain-English guide to the green finance products your treasury team should know.",
    author: "Priya Nair",
    authorRole: "Head of Finance Solutions",
    authorBio: "Priya leads finance solutions at Verdant, helping companies integrate sustainability into treasury and capital markets strategy. Former MD at Goldman Sachs Sustainable Finance.",
    date: "20 Feb 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=85",
    body: [
      { type: "p", text: "The green finance market has grown from a niche to a $1 trillion-plus annual issuance market in less than a decade. But for many treasury and finance teams, the landscape remains confusing. Green bonds, sustainability-linked loans, transition bonds, blue bonds, social bonds — the proliferation of labels obscures more than it illuminates." },
      { type: "p", text: "Here is a plain-English guide to the three instruments that matter most for the majority of corporate borrowers." },
      { type: "h2", text: "Green bonds: use-of-proceeds instruments" },
      { type: "p", text: "A green bond is a debt instrument where the proceeds are earmarked for specific green projects — renewable energy installations, energy-efficient buildings, clean transportation, sustainable water management. The defining feature is the use-of-proceeds requirement: the money raised must be spent on qualifying projects, and the issuer must report on how it has been deployed." },
      { type: "p", text: "Green bonds work best for companies with a clear pipeline of capital projects with strong environmental credentials. A utility building solar farms, a property developer retrofitting existing stock, a manufacturer installing on-site renewable generation — these are natural green bond issuers." },
      { type: "blockquote", text: "A green bond is only as credible as the projects it finances. The label is a promise; the reporting is the proof." },
      { type: "h2", text: "Sustainability-linked loans: performance instruments" },
      { type: "p", text: "Sustainability-linked loans (SLLs) and their bond equivalents (SLBs) work differently. There is no use-of-proceeds requirement. Instead, the cost of the loan is tied to the borrower's performance against pre-agreed sustainability performance targets (SPTs) — typically emissions intensity reductions, renewable energy percentages, or safety records." },
      { type: "p", text: "If the borrower meets its targets, it pays a lower interest margin. If it misses them, the margin increases. This structure is more flexible than green bonds — any company with measurable sustainability commitments can issue one — but it is also more vulnerable to accusations of greenwashing if the targets are not ambitious." },
      { type: "h2", text: "Transition finance: the emerging category" },
      { type: "p", text: "Transition finance is not a specific instrument but a framework for financing the decarbonisation of high-emitting sectors — steel, cement, chemicals, shipping, aviation — that cannot make the transition overnight but are taking credible steps in the right direction." },
      { type: "ul", items: [
        "Green bonds require green projects now; transition finance finances the journey to green.",
        "The key criteria: credible transition plan, science-aligned milestones, independent verification.",
        "Sectors eligible: heavy industry, fossil fuel companies transitioning to clean energy, long-haul transport.",
        "Risk: transition finance can be misused to delay genuine decarbonisation. Scrutinise the underlying plan.",
      ]},
    ],
  },
  {
    slug: "scope-3-category-1",
    tag: "Supply Chain",
    title: "Scope 3 Category 1: why purchased goods dominate your footprint",
    excerpt:
      "For most manufacturers, more than 70% of total emissions sit in Scope 3 Category 1. Here's how to measure it without drowning in supplier surveys.",
    author: "Mia Thornton",
    authorRole: "Head of Climate Strategy",
    authorBio: "Mia leads climate strategy at Verdant, helping Fortune 500 companies build science-aligned decarbonisation roadmaps. Previously at McKinsey Sustainability.",
    date: "14 Feb 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=85",
    body: [
      { type: "p", text: "If you are a manufacturer, a retailer, or a consumer goods company, there is a very good chance that the largest single source of your greenhouse gas emissions is something you have almost no direct control over: the goods and services you purchase from suppliers." },
      { type: "p", text: "Scope 3 Category 1 — purchased goods and services — is the emissions category that brings most sustainability teams to despair. It is enormous, complex, and methodologically contested. But it is also, increasingly, unavoidable." },
      { type: "h2", text: "Why Category 1 is so large" },
      { type: "p", text: "For a typical consumer goods manufacturer, the breakdown of emissions looks roughly like this: Scope 1 (direct combustion) accounts for 3–5% of total emissions; Scope 2 (purchased energy) accounts for 5–10%; and Scope 3 accounts for 85–92%. Of that Scope 3 total, Category 1 typically represents more than half." },
      { type: "p", text: "The reason is straightforward: every tonne of steel, every kilogram of packaging material, every electronic component you purchase carries with it the embodied emissions of its production. For companies with complex, multi-tier supply chains, the cumulative effect is enormous." },
      { type: "blockquote", text: "Scope 3 Category 1 is not a sustainability problem. It is a supply chain strategy problem. Treat it as one." },
      { type: "h2", text: "The measurement hierarchy" },
      { type: "p", text: "The GHG Protocol provides a hierarchy of approaches for calculating Category 1 emissions, from least to most accurate:" },
      { type: "ul", items: [
        "Spend-based: multiply supplier spend by an industry-average emission factor. Quick but imprecise.",
        "Average-data: use average emission intensity data for the specific goods purchased. Better, but still not supplier-specific.",
        "Supplier-specific: use actual emissions data provided by your suppliers. Most accurate, highest engagement cost.",
        "Hybrid: combine approaches depending on supplier tier, spend concentration, and data availability.",
      ]},
      { type: "h2", text: "A practical approach" },
      { type: "p", text: "Rather than attempting to collect primary data from every supplier at once — a recipe for survey fatigue and non-response — we recommend a risk-ranked approach. Identify the 20% of suppliers that represent 80% of your Category 1 footprint by spend and sector. Focus your primary data collection on these suppliers. Use spend-based estimates for the long tail." },
      { type: "p", text: "For the priority suppliers, the conversation is no longer about filling in a survey. It is about sharing live production data via API or secure portal, validating it against third-party benchmarks, and collaborating on reduction pathways that benefit both parties." },
    ],
  },
  {
    slug: "cop29-finance-commitments",
    tag: "Policy",
    title: "COP29 outcomes: what the finance commitments mean for your business",
    excerpt:
      "The headline pledges from COP29 are in. We unpack what the $300B climate finance goal and the new carbon market rules mean in practice.",
    author: "James Okafor",
    authorRole: "Carbon Markets Lead",
    authorBio: "James covers carbon markets and nature finance at Verdant. Former analyst at Ecosystem Marketplace and Climate Policy Initiative.",
    date: "8 Feb 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=85",
    body: [
      { type: "p", text: "COP29 in Baku produced two outcomes of genuine significance for corporate sustainability teams: a new collective quantified goal on climate finance, and the finalisation of Article 6 carbon market rules that have been under negotiation since the Paris Agreement was signed in 2015." },
      { type: "h2", text: "The $300B finance goal" },
      { type: "p", text: "Developed countries committed to mobilising $300 billion per year in climate finance for developing nations by 2035, up from the previous $100 billion annual target. The goal includes both public and private finance, and is intended to help developing countries both reduce emissions and adapt to climate impacts." },
      { type: "p", text: "For corporate sustainability teams, the significance is indirect but real. Greater public finance flows to emerging markets will accelerate the deployment of renewable energy and clean infrastructure, changing the emission factor profile of global supply chains. Companies with significant Scope 3 exposure in emerging markets should track these developments carefully." },
      { type: "h2", text: "Article 6: carbon markets finally have rules" },
      { type: "p", text: "The finalisation of Article 6 rules — specifically Article 6.4, which establishes a UN-supervised international carbon market — is the more technically significant outcome for carbon market participants. After nine years of negotiation, the framework for internationally transferred mitigation outcomes (ITMOs) is now operational." },
      { type: "blockquote", text: "Article 6 does not create a carbon market — it legitimises the ones that already exist and sets the rules for new ones to emerge at scale." },
      { type: "ul", items: [
        "Countries can now authorise carbon credits for use in other countries' NDCs under agreed rules.",
        "Corresponding adjustments prevent double-counting: a credit used by a buyer is deducted from the host country's NDC.",
        "The UN mechanism sets minimum integrity standards that align with, but exceed, existing voluntary market standards.",
        "Companies using Article 6 credits for net-zero claims will have stronger basis for those claims.",
      ]},
    ],
  },
  {
    slug: "sbti-targets-what-you-need-to-know",
    tag: "Net-Zero Strategy",
    title: "SBTi targets: what you actually need to know before you commit",
    excerpt:
      "Science-based targets are becoming standard practice, but the validation process catches many organisations off-guard. A step-by-step guide to getting it right.",
    author: "Sophie Laurent",
    authorRole: "Regulatory Affairs",
    authorBio: "Sophie leads regulatory affairs at Verdant, specialising in EU sustainability disclosure and ESRS implementation. Former policy adviser at the European Commission.",
    date: "2 Feb 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=85",
    body: [
      { type: "p", text: "The Science Based Targets initiative has become the de facto standard for corporate climate target-setting. Over 7,000 companies have committed or had targets validated, and investors, customers, and regulators increasingly expect SBTi alignment as a baseline requirement." },
      { type: "p", text: "But the path from commitment to validated target is harder than most companies expect. Here is what you need to know before you submit." },
      { type: "h2", text: "The commitment vs. the target" },
      { type: "p", text: "When a company announces it has 'committed to science-based targets', it means it has signed a letter of intent to submit targets within 24 months. The commitment itself is not validated. The targets — the specific percentage reductions by specific dates — are what SBTi actually validates." },
      { type: "h2", text: "Near-term vs. long-term targets" },
      { type: "p", text: "SBTi requires two sets of targets: near-term (to 2030 or five to ten years out) and long-term (to 2050). The near-term targets must cover Scope 1, 2, and, for most sectors, Scope 3. The long-term target requires a commitment to reach net-zero across all scopes." },
      { type: "blockquote", text: "SBTi's value is not the badge. It is the rigour it forces on your target-setting process — the conversations with your supply chain, the financial modelling of reduction pathways, the board-level commitment to actual change." },
      { type: "ul", items: [
        "Scope 1+2 near-term: 4.2% absolute reduction per year for 1.5°C alignment.",
        "Scope 3: 42% reduction by 2030 from a 2020 or earlier base year (for companies with >40% Scope 3).",
        "Forest, land, and agriculture (FLAG) companies have separate sector-specific methods.",
        "Financial institutions have the Finance Sector Science-Based Targets Guidance.",
        "Allow 12–18 months from first baseline calculation to validated target.",
      ]},
    ],
  },
  {
    slug: "nature-based-solutions",
    tag: "Carbon Markets",
    title: "Nature-based solutions: the hype, the hope, and the hard numbers",
    excerpt:
      "Forests, wetlands, and soils can absorb billions of tonnes of CO₂ — but only if we measure, monitor, and protect them properly. A field report from the frontier.",
    author: "Arjun Mehta",
    authorRole: "CTO",
    authorBio: "Arjun is CTO at Verdant, where he leads the engineering and AI teams. Previously an ML researcher at DeepMind working on climate and energy applications.",
    date: "25 Jan 2024",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=85",
    body: [
      { type: "p", text: "Nature-based solutions occupy a strange position in the climate conversation. On one hand, the science is unambiguous: healthy forests, wetlands, grasslands, and soils are among the most powerful carbon sinks available to us. On the other hand, the voluntary carbon market's experience with nature-based credits has been, to put it charitably, mixed." },
      { type: "p", text: "Understanding the gap between potential and performance requires going deeper than the headlines — into the measurement methodologies, the monitoring technologies, and the structural incentives that shape the market." },
      { type: "h2", text: "The potential is real" },
      { type: "p", text: "According to the IPCC, natural climate solutions — protecting and restoring forests, wetlands, and soils — could deliver up to 11 gigatonnes of CO₂-equivalent mitigation per year by 2030 while also delivering significant biodiversity and water security benefits. That represents roughly 30% of the mitigation needed to limit warming to 1.5°C." },
      { type: "p", text: "The potential is concentrated in three biomes: tropical forests (especially the Amazon, Congo Basin, and Southeast Asian rainforests), peatlands (which store roughly twice the carbon of all the world's forests combined, in just 3% of land area), and coastal ecosystems including mangroves and seagrasses." },
      { type: "h2", text: "Where the credits went wrong" },
      { type: "p", text: "The 2023 controversy over REDD+ credits — which protect forests from deforestation — centred on a methodological problem: the baseline. To calculate how much carbon a forest protection project is preserving, you need to estimate how much deforestation would have occurred in its absence. Get that wrong, and you get the carbon accounting wrong too." },
      { type: "blockquote", text: "The problem with many forest credits was not that the forests weren't there. It was that the deforestation that was supposedly being prevented wasn't going to happen anyway." },
      { type: "h2", text: "The technology that changes the equation" },
      { type: "p", text: "What has changed, and is changing the integrity picture rapidly, is the availability of satellite monitoring at resolution and frequency that was not possible five years ago. Planet Labs, Maxar, and ESA's Sentinel programme now provide near-daily imagery at sub-10-metre resolution for most of the world's forests." },
      { type: "ul", items: [
        "Forest cover change can be detected within days, not years.",
        "Carbon density can be estimated from LiDAR and radar imagery with increasing precision.",
        "Leakage — deforestation shifting to adjacent unprotected areas — can be monitored at regional scale.",
        "Community monitoring via mobile apps provides ground-truth for satellite data.",
      ]},
      { type: "p", text: "For buyers of nature-based credits, the practical implication is to prioritise projects that can demonstrate continuous satellite monitoring, provide transparent access to near-real-time deforestation data, and carry independent third-party verification that is updated annually, not just at project inception." },
    ],
  },
];

export const CATEGORIES = [
  "All",
  "Net-Zero Strategy",
  "Carbon Markets",
  "Reporting",
  "Technology",
  "Finance",
  "Supply Chain",
  "Policy",
];
