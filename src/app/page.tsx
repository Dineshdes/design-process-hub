'use client'
import { useState, useCallback, useEffect, useRef } from 'react'

// ─── localStorage hook ────────────────────────────────────────────────────────
function useLocalStorage<T>(key: string, initial: T): [T, (v: T | ((p: T) => T)) => void] {
  const [val, setVal] = useState<T>(() => {
    try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? initial } catch { return initial }
  })
  const set = useCallback((v: T | ((p: T) => T)) => {
    setVal(prev => {
      const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }, [key])
  return [val, set]
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: string
  name: string
  client: string
  websiteType: string
  createdAt: string
  activePhase: number
  status: string
  scopeDoc?: string
}

interface MoodItem {
  id: string
  type: 'link' | 'image' | 'note'
  url?: string
  label?: string
  imageUrl?: string
  text?: string
  color?: string
}

// ─── Tool logo map ─────────────────────────────────────────────────────────────
const TOOL_LOGOS: Record<string, string> = {
  'claude':            'https://claude.ai/favicon.ico',
  'claude / chatgpt':  'https://claude.ai/favicon.ico',
  'chatgpt':           'https://chat.openai.com/favicon.ico',
  'perplexity':        'https://www.perplexity.ai/favicon.ico',
  'perplexity ai':     'https://www.perplexity.ai/favicon.ico',
  'notion ai':         'https://www.notion.so/front-static/favicon.ico',
  'notion':            'https://www.notion.so/front-static/favicon.ico',
  'otter.ai':          'https://otter.ai/favicon.ico',
  'figma ai':          'https://static.figma.com/app/icon/1/favicon.ico',
  'figma dev mode':    'https://static.figma.com/app/icon/1/favicon.ico',
  'figma':             'https://static.figma.com/app/icon/1/favicon.ico',
  'whimsical ai':      'https://whimsical.com/favicon.ico',
  'whimsical':         'https://whimsical.com/favicon.ico',
  'relume':            'https://relume.io/favicon.ico',
  'uizard':            'https://uizard.io/favicon.ico',
  'midjourney':        'https://www.midjourney.com/favicon.ico',
  'galileo ai':        'https://www.usegalileo.ai/favicon.ico',
  'fontjoy':           'https://fontjoy.com/favicon.ico',
  'coolors ai':        'https://coolors.co/favicon.ico',
  'coolors':           'https://coolors.co/favicon.ico',
  'stark':             'https://www.getstark.co/favicon.ico',
  'loom':              'https://www.loom.com/favicon.ico',
  'maze ai':           'https://maze.co/favicon.ico',
  'maze':              'https://maze.co/favicon.ico',
  'attention insight': 'https://attentioninsight.com/favicon.ico',
  'linear':            'https://linear.app/favicon.ico',
  'zeroheight':        'https://zeroheight.com/favicon.ico',
}

function ToolLogo({ name, fallback }: { name: string; fallback: string }) {
  const src = TOOL_LOGOS[name.toLowerCase()]
  const [errored, setErrored] = useState(false)
  if (!src || errored) return <>{fallback}</>
  return (
    <img
      src={src}
      alt={name}
      width={22}
      height={22}
      style={{ objectFit: 'contain' }}
      onError={() => setErrored(true)}
    />
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STAGES = [
  {
    id: 1,
    code: '01',
    name: 'Discovery',
    full: 'Discovery & Brief',
    figmaUrl: '',
    icon: '◎',
    time: '1–2 DAYS',
    tag: 'FOUNDATION',
    description: 'Understand the business before you open Figma. A clear brief prevents 80% of revisions. This is your insurance policy.',
    output: 'Brand DNA Brief + Signed Scope',
    checklist: [
      'Business model clarity — how do they actually make money?',
      'Core industry problem they are solving',
      'Vision & mission statement clarity',
      'Identify USP — Unique Selling Proposition',
      'Target audience profiling (age, behavior, goals, pain points)',
      'Primary audience location & demographics',
      'Brand voice & tone definition',
      'Current marketing strategy & channels',
      'Competitors — top 3 with what they do wrong',
      'Specific use cases for the website',
      'Success metric — what does a win look like in 6 months?',
      'Budget & timeline expectations set',
    ],
    aiTools: [
      { icon: '✦', name: 'Claude / ChatGPT', use: 'Generate tailored discovery questions from industry + brief. Summarise a 1-page Brand DNA from raw notes.' },
      { icon: '⚡', name: 'Perplexity AI', use: 'Instant market research and competitor intelligence with citations in minutes.' },
      { icon: '📝', name: 'Notion AI', use: 'Auto-structure messy client notes into clean, shareable briefs.' },
      { icon: '🎙', name: 'Otter.ai', use: 'Transcribe every kickoff call. Never miss a requirement again.' },
    ],
    prompts: [
      {
        tool: 'Claude / ChatGPT',
        title: 'Generate Discovery Questions',
        prompt: `You are a senior UX/UI designer with 10 years of client experience running discovery for high-stakes web projects.

<context>
Before a single wireframe is drawn, deep discovery determines whether a project succeeds or fails. Generic questions produce generic briefs. Sharp, targeted questions uncover the business logic, hidden constraints, and real success metrics that drive every design decision.
</context>

<input>
INDUSTRY: [e.g. SaaS, healthcare, fintech, hospitality]
BUSINESS_DESCRIPTION: [One-line description of what the client does]
PROJECT_TYPE: [e.g. full website redesign, new brand launch, landing page campaign]
</input>

<instructions>
1. Generate exactly 15 sharp discovery questions tailored to this industry and project type.
2. Organise questions into 5 categories: Business Model, Audience, Competitive Position, Website Goal, Brand Voice.
3. Frame each question to surface information the client may not volunteer unless directly asked.
4. Include at least 2 questions that challenge assumptions or probe for internal conflicts.
5. Prioritise questions that will have the highest impact on design decisions.
</instructions>

<output_format>
## Discovery Questions — [INDUSTRY] Project

**Business Model (3 questions)**
1. ...
2. ...
3. ...

**Audience (3 questions)**
4. ...
5. ...
6. ...

**Competitive Position (3 questions)**
7. ...
8. ...
9. ...

**Website Goal (3 questions)**
10. ...
11. ...
12. ...

**Brand Voice (3 questions)**
13. ...
14. ...
15. ...

*Bold the single most important question in each section.*
</output_format>

<constraints>
- No generic questions (avoid: "What is your target market?", "What are your goals?")
- Each question must be answerable in under 2 minutes by the client
- Tone: direct and professional — this is for a senior designer, not a junior brief form
- Do not include questions answerable by a Google search
</constraints>`,
      },
      {
        tool: 'Claude / ChatGPT',
        title: 'Build Brand DNA from Raw Notes',
        prompt: `You are a brand strategist and senior creative director who transforms messy client discovery into clear creative direction.

<context>
Raw discovery notes are a liability — they contain gold buried in noise. A Brand DNA document distills everything into a single-page filter used to make every design decision throughout the project. It replaces opinion with principle.
</context>

<input>
CLIENT_NAME: [Business name]
PROJECT_GOAL: [Primary conversion or outcome the website must achieve]
RAW_NOTES: [Paste your complete discovery call notes here — unfiltered]
</input>

<instructions>
1. Read all raw notes and identify the signal from the noise.
2. Extract and synthesize across 8 Brand DNA dimensions listed in the output format.
3. Write each section in clear, actionable language — a junior designer should be able to make design decisions from this alone.
4. If the notes contain contradictions, flag them explicitly under Open Questions.
5. Keep the total document under 350 words.
</instructions>

<output_format>
# Brand DNA — [CLIENT_NAME]

**01 / Business in One Line**
[Single sentence]

**02 / The Problem They Solve**
[What exists without them]

**03 / Target Audience**
- Who they are: ...
- What they want: ...
- What frustrates them: ...

**04 / USP**
[What makes them irreplaceable]

**05 / Brand Personality**
[5 adjectives, ranked by priority]

**06 / Voice & Tone**
Do: ... / Don't: ...

**07 / Website Primary Goal**
[The one action that makes this project a success]

**08 / Success Metric at 6 Months**
[Specific, measurable]

---
Open Questions: [Any unresolved contradictions from the notes]
</output_format>

<constraints>
- Write for a designer, not a marketer — every line must have design utility
- If notes are missing critical info for a section, flag it as [NEEDS CLIENT INPUT] rather than guessing
- Maximum 350 words across all sections
- No marketing fluff or filler phrases
</constraints>`,
      },
      {
        tool: 'Perplexity AI',
        title: 'Competitor Intelligence Brief',
        prompt: `You are a market research analyst specialising in competitive intelligence for digital product and brand teams.

<context>
Competitive research is most valuable when it reveals design opportunities — not just what competitors look like, but where they are strategically weak. The output of this research directly informs differentiation strategy and content hierarchy decisions.
</context>

<input>
INDUSTRY: [e.g. legal tech, premium fitness, B2B SaaS]
TARGET_AUDIENCE: [Description of the primary audience]
MARKET: [Geographic or platform market — e.g. UK SMBs, US enterprise, Southeast Asia mobile]
KNOWN_COMPETITORS: [List any already identified, or leave blank to discover]
</input>

<instructions>
1. Identify the top 5 direct competitors for this industry and audience.
2. For each competitor, analyse: positioning, design language, messaging tone, conversion strategy, and trust signals.
3. Identify patterns that define the category norm — what everyone does.
4. Identify the white space — what no competitor is doing but the audience clearly wants.
5. Pull audience language from Reddit, review platforms, and forums — quote verbatim.
6. Recommend 3 specific design or content opportunities backed by evidence.
</instructions>

<output_format>
## Competitive Intelligence — [INDUSTRY]

### Top 5 Competitors
| Competitor | Positioning | Design Tone | CTA Strategy | Key Weakness |
|---|---|---|---|---|

### Category Norms
[What every competitor does — the "safe" zone]

### White Space Opportunities
1. ...
2. ...
3. ...

### Audience Voice (Direct Quotes)
- "[quote]" — [Source + URL]
- "[quote]" — [Source + URL]
- "[quote]" — [Source + URL]

### 3 Design Opportunities
**Opportunity 1:** ...
**Opportunity 2:** ...
**Opportunity 3:** ...
</output_format>

<constraints>
- Cite all sources with URLs — Reddit threads, G2, Trustpilot, review platforms
- Do not fabricate competitor information — if data is unavailable, state so
- Frame every insight as an actionable design or content opportunity
- Audience quotes must be verbatim, not paraphrased
</constraints>`,
      },
      {
        tool: 'Claude / ChatGPT',
        title: 'Scope & Timeline Generator',
        prompt: `You are a senior design project manager who has delivered 100+ web projects and knows precisely where scope creep originates and how to prevent it.

<context>
A clear scope document protects both the designer and the client. It eliminates "I thought that was included" conversations, sets revision boundaries from day one, and creates a shared contract of expectations that governs the entire engagement.
</context>

<input>
WEBSITE_TYPE: [e.g. SaaS marketing site, professional services, e-commerce, portfolio]
PAGES: [List all pages requested]
FEATURES: [e.g. contact form, blog, booking system, animations, multilingual]
CLIENT_ASSETS: [What the client provides: existing brand / logo only / full brand / nothing]
REVISION_ROUNDS: 2
PROCESS: Discovery → Research → UX Strategy → UI Design → Review → Handoff
</input>

<instructions>
1. Write a complete scope of work covering what is explicitly included and excluded.
2. Create a week-by-week timeline broken into the 6 process phases.
3. List every client deliverable required and the deadline for each phase.
4. Write the revision policy in clear, professional language suitable for a contract.
5. Flag any information gaps that could cause scope expansion later.
</instructions>

<output_format>
## Project Scope — [WEBSITE_TYPE]

### In Scope
- ...

### Out of Scope
- ...

### Timeline
| Week | Phase | Designer Deliverable | Client Action Required |
|---|---|---|---|

### Client Responsibilities & Deadlines
1. [Item] — needed by [Phase]

### Revision Policy
[Professional paragraph, max 80 words]

### Scope Flags
[Any unclear areas that could expand scope — flagged as risks]
</output_format>

<constraints>
- Timeline must be realistic — do not compress phases to please the client
- "Out of Scope" must be specific — name the exact things that are excluded
- Revision policy must cap at 2 rounds with explicit language about what constitutes a new round
- Tone: professional and collaborative, not defensive
</constraints>`,
      },
    ],
    tips: [
      'Record every call. AI transcription (Otter, Fireflies) + Claude summary = zero missed requirements.',
      'Ask "What makes a customer NOT choose you?" — it unlocks the real USP faster than any other question.',
      'Send the questionnaire 48h before the call. Pre-filled answers create a richer, faster conversation.',
      'Create a one-page Brand DNA doc after discovery — use it as a design decision filter throughout the project.',
    ],
  },
  {
    id: 2,
    code: '02',
    name: 'Research',
    full: 'Research & Insights',
    figmaUrl: '',
    icon: '◉',
    time: '1–3 DAYS',
    tag: 'INTELLIGENCE',
    description: 'Data beats opinions. Research reveals what the client doesn\'t know about their own audience — and that\'s your edge.',
    output: 'Research Report + Opportunity Map',
    checklist: [
      'Competitor UX audit — 3 direct + 2 adjacent industry sites',
      'Visual design audit — what styles dominate the space?',
      'Heuristic evaluation of client\'s existing site (if any)',
      'Reddit / forum research — real pain in their own words',
      'Google Trends — search intent & keyword landscape',
      'Review mining — G2, Trustpilot, App Store for competitors',
      'Benchmark conversion patterns in their vertical',
      'Identify design patterns that convert (above-fold, CTA placement)',
      'Color psychology research for their industry',
      'Typography trends in premium brands in their space',
    ],
    aiTools: [
      { icon: '✦', name: 'Claude', use: 'Synthesize competitor findings into a strategic opportunity map.' },
      { icon: '⚡', name: 'Perplexity', use: 'Deep market research with live citations — replace 3 hours of browsing.' },
      { icon: '🧪', name: 'Maze AI', use: 'AI-powered usability testing and heatmap insights at speed.' },
      { icon: '👁', name: 'Attention Insight', use: 'Predict where users look — before you build a single screen.' },
    ],
    prompts: [
      {
        tool: 'Claude',
        title: 'Synthesise Competitor Audit into Opportunity Map',
        prompt: `You are a senior UX strategist who translates raw design audits into actionable opportunity maps for creative teams.

<context>
Raw competitor observations have no strategic value until synthesised. An opportunity map converts "what I noticed" into "where we should win" — it becomes the strategic backbone of the design direction and the strongest slide in any client presentation.
</context>

<input>
CLIENT_INDUSTRY: [Industry and space]
CLIENT_AUDIENCE: [Who the client serves]
COMPETITORS_AUDITED: [List each competitor with a brief note on what they do]
RAW_OBSERVATIONS: [Paste your full audit notes — messy is fine]
</input>

<instructions>
1. Group observations into category norms (what everyone does) vs. category anomalies (what almost no one does).
2. Identify the white space — the audience need that all competitors are failing to address.
3. Extract the top 3 high-impact design opportunities with specific, implementable recommendations.
4. Identify messaging gaps — what the audience wants to hear that no competitor is saying.
5. Identify trust signal gaps — proof, credentials, or social evidence consistently absent.
6. Frame all outputs as client-ready strategic insights, not raw observations.
</instructions>

<output_format>
## Opportunity Map — [CLIENT_INDUSTRY]

### What Everyone Is Doing
- [Pattern 1]
- [Pattern 2]
- [Pattern 3]

### What Nobody Is Doing (White Space)
- [Gap 1]
- [Gap 2]

### Top 3 Design Opportunities
**01** [Opportunity title]: [Specific implementation recommendation]
**02** [Opportunity title]: [Specific implementation recommendation]
**03** [Opportunity title]: [Specific implementation recommendation]

### Messaging Gaps
- [What the audience wants to hear but no competitor is saying]

### Trust Signal Gaps
- [Proof elements consistently missing across all competitors]
</output_format>

<constraints>
- Every opportunity must include a specific design or content action, not just an observation
- Minimum 3 competitors must be referenced in the analysis
- Do not list more than 5 category norms — prioritise the most defining patterns
- Write for a client presentation — clear, confident, jargon-free
</constraints>`,
      },
      {
        tool: 'Perplexity',
        title: 'Deep Audience Research',
        prompt: `You are a consumer insights researcher specialising in digital behaviour for brand and UX teams.

<context>
Real audience language — pulled directly from forums, reviews, and communities — is the most valuable asset a designer can have. It shapes copy, informs visual hierarchy, and makes users feel seen rather than sold to. This research replaces assumption with evidence.
</context>

<input>
INDUSTRY: [The client's industry or problem space]
AUDIENCE_DESCRIPTION: [Who they are, what they do, what they're trying to solve]
RESEARCH_PLATFORMS: Reddit, Quora, G2, Trustpilot, App Store reviews, Google reviews, relevant forums
</input>

<instructions>
1. Search each listed platform for conversations about this industry and audience pain points.
2. Extract the top 5 unmet needs or frustrations using verbatim quotes where possible.
3. Document the exact words and phrases this audience uses — their vocabulary, not marketing language.
4. Identify what causes them to distrust a brand in this space.
5. Identify what causes them to leave a website without converting.
6. Identify the emotional trigger that moves them from browsing to taking action.
</instructions>

<output_format>
## Audience Intelligence — [INDUSTRY]

### Top 5 Frustrations (Verbatim Language)
1. "[Direct quote]" — [Source + URL]
2. "[Direct quote]" — [Source + URL]
3. "[Direct quote]" — [Source + URL]
4. "[Direct quote]" — [Source + URL]
5. "[Direct quote]" — [Source + URL]

### Their Vocabulary (Words to Use in Copy)
[List exact phrases this audience uses to describe their problem and ideal solution]

### Trust Breakers
- [What kills credibility instantly for this audience]

### Conversion Killers
- [What makes them leave without acting]

### The Decision Trigger
[The single emotional shift that moves this audience from browsing to buying]
</output_format>

<constraints>
- All quotes must be verbatim — do not paraphrase
- Include source URLs for every quote
- Do not inject marketing language — preserve the audience's raw voice
- If a platform yields no usable data, state so explicitly rather than fabricating
</constraints>`,
      },
      {
        tool: 'Claude',
        title: 'Heuristic Evaluation Report',
        prompt: `You are a senior UX consultant who conducts heuristic evaluations for conversion rate optimisation engagements.

<context>
A heuristic evaluation identifies usability and conversion failures before user testing — saving time and surfacing critical issues that prevent a website from performing. The output becomes the briefing document for the redesign and justifies every structural change to the client.
</context>

<input>
WEBSITE_URL_OR_DESCRIPTION: [Paste the URL or describe the current website in detail]
WEBSITE_TYPE: [e.g. service business, SaaS, e-commerce, portfolio]
PRIMARY_CONVERSION_GOAL: [e.g. book a call, sign up, purchase]
AUDIENCE: [Who uses this site]
</input>

<instructions>
1. Evaluate the website against Nielsen's 10 usability heuristics — identify every violation.
2. Evaluate above-the-fold effectiveness: does it answer who, what, and why within 5 seconds?
3. Evaluate CTA strategy: clarity, placement, visual hierarchy, and copy.
4. Evaluate trust architecture: social proof, credentials, risk-reducers, and their placement.
5. Evaluate mobile UX and responsive behaviour considerations.
6. Rate each issue: Critical (blocks conversion) / Major (creates friction) / Minor (reduces polish).
7. Rank the top 5 fixes by expected conversion impact.
</instructions>

<output_format>
## Heuristic Evaluation — [WEBSITE_TYPE]

### Heuristic Violations
| # | Heuristic Violated | Specific Problem | Severity | Fix |
|---|---|---|---|---|

### 5-Second Test Analysis
**Who:** [Communicated clearly? Yes/No — evidence]
**What:** [Communicated clearly? Yes/No — evidence]
**Why:** [Communicated clearly? Yes/No — evidence]
**Verdict:** Pass / Fail

### CTA Analysis
[Clarity, placement, copy — pass/fail with specific notes]

### Trust Architecture
[What's present vs. critically missing — with placement notes]

### Top 5 Highest-Impact Fixes
1. [Fix] — Expected impact: [why this matters most]
2. [Fix] — Expected impact: ...
3. ...
</output_format>

<constraints>
- Be specific — name the exact element and its location on the page
- Severity ratings must be consistent: Critical = conversion-blocking, Major = friction-adding, Minor = polish
- Top 5 fixes must be ranked by conversion impact, not ease of implementation
- Do not soften critique — this is an internal document for the designer
</constraints>`,
      },
      {
        tool: 'Claude',
        title: 'Research Presentation for Client',
        prompt: `You are a senior design strategist who writes client-facing research summaries that justify creative direction and build confidence in the design process.

<context>
Research findings only create value if the client understands and trusts them. A well-crafted research summary positions the designer as a strategic partner, elevates the quality of the upcoming design conversation, and pre-sells the creative direction before a single mockup is shown.
</context>

<input>
CLIENT_NAME: [Business name]
PROJECT_GOAL: [What the website must achieve]
AUDIENCE: [Who the site serves]
RESEARCH_FINDINGS: [Paste all research notes — competitor analysis, audience insights, heuristic findings]
</input>

<instructions>
1. Distil all research into 3 high-signal audience insights — what you now know that the client didn't.
2. Identify 2–3 specific competitor weaknesses that represent design opportunities.
3. Translate findings into 3 direct design implications — specific decisions this research justifies.
4. Write a single strategic direction statement that frames the entire design approach.
5. Use plain language — zero UX jargon. The client is not a designer.
</instructions>

<output_format>
## Research Summary — [CLIENT_NAME]

### What We Learned About Your Audience
1. [Insight — stated as a fact, with evidence]
2. [Insight — stated as a fact, with evidence]
3. [Insight — stated as a fact, with evidence]

### Where Your Competitors Are Weak
1. [Specific gap and why it matters]
2. [Specific gap and why it matters]

### What This Means for Your Design
1. [Design implication — "Because X, we will Y"]
2. [Design implication — "Because X, we will Y"]
3. [Design implication — "Because X, we will Y"]

### Our Recommended Direction
[1–2 sentence positioning statement that defines the entire design strategy]
</output_format>

<constraints>
- Maximum 500 words total
- No UX terminology — write for a business owner, not a designer
- Every insight must connect to a design decision — no orphaned observations
- The Recommended Direction must be specific enough to rule out design approaches, not just a vague statement
</constraints>`,
      },
    ],
    tips: [
      'The best research insight is something the client has never considered. Frame it as a competitive advantage.',
      'Reddit and Quora reveal raw customer voice. Copy their exact language into the copy brief.',
      'Review mining is a goldmine — competitors\' 3-star reviews reveal unmet needs your design can solve.',
      'Build a Research Wall in FigJam. Show clients the homework. It justifies your fee instantly.',
    ],
  },
  {
    id: 3,
    code: '03',
    name: 'UX Strategy',
    full: 'UX Strategy & Planning',
    figmaUrl: '',
    icon: '▣',
    time: '2–4 DAYS',
    tag: 'ARCHITECTURE',
    description: 'Structure the experience before you style it. Great UX is invisible — users just feel it works.',
    output: 'Sitemap + Wireframe Kit + User Flow Diagrams',
    checklist: [
      'Define primary user journey (hero path to conversion)',
      'Information architecture — site map draft',
      'User flow diagrams for key actions',
      'Wireframe key pages (home, service, CTA flow)',
      'Content hierarchy mapping — what users need first vs later',
      'Mobile-first priority list',
      'Micro-interaction points identified',
      'Form optimisation plan — fewer fields = more conversions',
      'Above-the-fold strategy for each key page',
      'Loading & performance UX strategy',
      'Accessibility baseline (WCAG AA minimum)',
    ],
    aiTools: [
      { icon: '✦', name: 'Figma AI', use: 'Auto-layout suggestions, component generation, instant design system.' },
      { icon: '🗺', name: 'Whimsical AI', use: 'AI-generated user flows and sitemaps from a text description.' },
      { icon: '⚡', name: 'Relume', use: 'Brief → full sitemap + wireframes in 20 minutes. Use every time.' },
      { icon: '🎨', name: 'Uizard', use: 'Sketch-to-wireframe AI conversion for quick lo-fi explorations.' },
    ],
    prompts: [
      {
        tool: 'Relume / Claude',
        title: 'Generate Full Site Structure from Brief',
        prompt: `You are a senior information architect with expertise in conversion-optimised website structures across SaaS, service businesses, and e-commerce.

<context>
The sitemap is the skeleton of the entire user experience. A poorly structured site forces users to work to find what they need — and they won't. The structure must be derived from user intent and business goals, not from internal company organisation.
</context>

<input>
BUSINESS_TYPE: [e.g. SaaS tool, professional services, e-commerce, coaching]
BUSINESS_NAME: [Name]
BUSINESS_DESCRIPTION: [One-line description]
PRIMARY_CONVERSION_GOAL: [e.g. book a discovery call, sign up free, purchase]
TARGET_AUDIENCE: [Who they are and what they need]
APPROXIMATE_PAGES: [Number or range]
MUST_HAVE_FEATURES: [e.g. blog, booking system, portfolio gallery, pricing page]
</input>

<instructions>
1. Generate the complete site map with all main pages and their key sub-sections.
2. Define the purpose of each page in one sentence — what job does it do for the user?
3. Design the navigation structure: primary nav, secondary nav, and footer nav.
4. Order pages to mirror the buyer's journey from awareness to decision.
5. Map the homepage section sequence from hero to footer, optimised for conversion.
6. Ensure the conversion goal is reachable within 2 clicks from any page.
</instructions>

<output_format>
## Site Map — [BUSINESS_NAME]

### Page Architecture
| Page | Purpose | Key Sections | Nav Level |
|---|---|---|---|

### Navigation Structure
**Primary Nav:** [Items in order — audience language, not internal terms]
**Secondary Nav (if applicable):** [Items]
**Footer Nav:** [Grouped sections]

### Buyer Journey Flow
[Awareness page] → [Interest page] → [Decision page] → [Conversion]

### Homepage Section Sequence
1. Hero — [Goal of this section]
2. [Section name] — [Goal]
...(max 8 sections total)
</output_format>

<constraints>
- Maximum 2 clicks to reach the conversion goal from any page
- No page without a defined purpose and conversion micro-goal
- Navigation items must use audience language, not internal company terms
- Homepage must not exceed 8 sections
</constraints>`,
      },
      {
        tool: 'Claude',
        title: 'Homepage Content Hierarchy',
        prompt: `You are a conversion strategist and UX copywriter who designs content hierarchies for high-performing marketing websites.

<context>
The homepage is the highest-stakes page on any website — most visitors arrive, evaluate, and decide within 8 seconds. Content hierarchy determines what is seen first, what builds belief, and what drives action. Every section must earn its position by advancing the conversion goal.
</context>

<input>
BUSINESS_NAME: [Name]
BUSINESS_DESCRIPTION: [What they do]
PRIMARY_CTA: [The single action the homepage must drive — e.g. Book a Free Call]
TARGET_AUDIENCE: [Who this homepage is speaking to]
USP: [The single most important differentiator]
BRAND_TONE: [e.g. premium and direct / warm and human / bold and technical]
</input>

<instructions>
1. Define the homepage section sequence using the AIDA framework as a foundation.
2. For each section, specify: name, purpose, key content elements, and conversion role.
3. Justify why each section appears at that specific position in the page.
4. Apply conversion best practices: above-fold hero, social proof placement, objection handling, final CTA.
5. Cap total sections at 8 — eliminate anything that doesn't advance the conversion goal.
</instructions>

<output_format>
## Homepage Content Hierarchy — [BUSINESS_NAME]

| # | Section | Purpose | Key Content Elements | Why Here |
|---|---|---|---|---|
| 1 | Hero | First impression | Headline, subhead, primary CTA, trust signal | Answer who/what/why immediately |
| 2 | ... | ... | ... | ... |

### Above-the-Fold Strategy
[Exact content visible before scroll — headline, subhead, CTA, visual]

### Primary CTA Placement Map
[Every location the CTA appears and the trigger that makes it appear there]

### Objection Handling Map
[Which section addresses which audience objection]
</output_format>

<constraints>
- Maximum 8 sections — ruthlessly eliminate anything that doesn't advance conversion
- Primary CTA must appear minimum 3 times: hero, mid-page, end
- Do not position heavy text blocks above social proof
- Each section must have a single, clear job — no multi-purpose sections
</constraints>`,
      },
      {
        tool: 'Claude',
        title: 'User Flow for Key Conversion Journey',
        prompt: `You are a senior UX designer specialising in conversion flow optimisation and user journey mapping.

<context>
A user flow is not a sitemap — it maps the emotional and cognitive journey a specific user takes toward a specific goal. Understanding the full flow, including decision points and drop-off risks, allows the designer to place the right content and signal at precisely the right moment.
</context>

<input>
WEBSITE_TYPE: [e.g. service business, SaaS, e-commerce]
PRIMARY_GOAL: [The user action that constitutes conversion — e.g. books a discovery call]
USER_ENTRY_POINT: [Where most users arrive — e.g. Google ad → homepage, organic search → blog post]
USER_TYPE: [Describe the specific user completing this flow]
</input>

<instructions>
1. Map every touchpoint from initial entry to completed conversion.
2. At each step, document: what the user sees, what they think/feel, and what they need to proceed.
3. Identify all decision points where users may continue, hesitate, or abandon.
4. For each decision point, specify the UX signal or content that keeps the user moving forward.
5. Identify the top 3 drop-off risks and propose a specific design counter-measure for each.
6. Map recovery flows for the most critical exit points.
</instructions>

<output_format>
## User Flow — [PRIMARY_GOAL]

### Flow Map

**Step 1:** [Entry point]
→ User sees: ...
→ User thinks: ...
→ User needs to proceed: ...

**Step 2:** [Page/action]
→ ...

[Continue until conversion]

**[CONVERSION COMPLETE]** ✓

### Decision Points
| Step | Risk | Drop-off Reason | Design Counter-Measure |
|---|---|---|---|

### Top 3 Drop-off Risks
1. **[Risk]:** [Why users leave here] → [Specific design fix]
2. **[Risk]:** [Why users leave here] → [Specific design fix]
3. **[Risk]:** [Why users leave here] → [Specific design fix]

### Recovery Flows
[What happens when a user tries to leave at each critical exit point]
</output_format>

<constraints>
- Map the emotional state at every major step — not just the functional action
- Drop-off counter-measures must be specific design decisions, not generic advice
- Include at least one mobile-specific consideration per major step
- Maximum 10 steps in the primary flow — if it takes more, the flow is too complex
</constraints>`,
      },
      {
        tool: 'Claude',
        title: 'Form Optimisation Plan',
        prompt: `You are a conversion rate optimisation specialist with deep expertise in form design and lead generation for web products.

<context>
Forms are the most friction-heavy element on any marketing website. Every unnecessary field reduces completion rates. Every piece of poor micro-copy increases abandonment. The goal is to capture exactly what is needed to qualify the lead — nothing more, nothing less.
</context>

<input>
FORM_TYPE: [e.g. contact form, discovery call booking, free trial sign-up, quote request]
BUSINESS_TYPE: [e.g. professional services, SaaS, e-commerce]
CURRENT_FIELDS: [List every field currently in the form]
FORM_GOAL: [What happens after submission — what does the business do with this data?]
AUDIENCE_FRICTION: [High / Medium / Low — how form-averse is this specific audience?]
</input>

<instructions>
1. Audit every current field: keep, remove, or make optional — justify each decision.
2. Redesign the field order using psychological progression (low-friction → high-commitment).
3. Write the CTA button copy in 3 variations using benefit-led language.
4. Specify trust signals to place adjacent to the form with exact placement rationale.
5. Write error state copy for the 3 most likely user mistakes.
6. Write the post-submission confirmation message.
</instructions>

<output_format>
## Form Optimisation Plan — [FORM_TYPE]

### Field Audit
| Field | Decision | Rationale |
|---|Keep / Remove / Optional|---|

### Optimised Field Order
1. [Field] — [Why first: lowest friction]
2. ...

### CTA Button Copy
1. "[Copy option 1]" — [Rationale]
2. "[Copy option 2]" — [Rationale]
3. "[Copy option 3]" — [Rationale]

### Trust Signals
| Signal | Placement | Why It Reduces Anxiety Here |
|---|---|---|

### Error State Copy
- [Field name]: "[Helpful, human error message]"

### Confirmation Message
**Headline:** [What they get / what happens next]
**Body:** [Next step + timeline + what to expect]
</output_format>

<constraints>
- Remove any field not directly required to qualify the lead or complete the transaction
- CTA copy must be benefit-led — never use "Submit" or "Send"
- Error messages must guide, not punish — no "Invalid input" or "Error"
- Trust signals must address the specific anxiety of this audience type
</constraints>`,
      },
    ],
    tips: [
      'Relume.io is the cheat code — brief to full sitemap + wireframe in 20 minutes. Use it every time.',
      'Never start at the homepage. Map the conversion goal first, then work backwards to entry points.',
      'If a page has more than 3 CTAs, it has zero CTAs. Focus ruthlessly on the primary action.',
      'Test your IA with the 5-second test — if users can\'t find what they need in 5s, restructure.',
    ],
  },
  {
    id: 4,
    code: '04',
    name: 'UI Design',
    full: 'UI Design & Uniqueness',
    figmaUrl: '',
    icon: '◈',
    time: '3–7 DAYS',
    tag: 'CRAFT',
    description: 'This is where good becomes great. Every pixel is a creative decision. Senior designers design with restraint — less noise, more signal.',
    output: 'High-Fidelity Designs + Design System File',
    checklist: [
      'Design system setup (colors, typography, spacing scale)',
      'Component library (buttons, cards, forms, navigation)',
      'High-fidelity mockups — desktop + mobile',
      'Micro-interactions & hover states designed',
      'Image art direction — authentic over stock',
      'Whitespace as a tool — don\'t fill every space',
      'Typography hierarchy — max 2 fonts, 3 weight levels',
      'Color contrast pass (accessibility check)',
      'Dark/light mode consideration',
      'Responsive breakpoints — 3 minimum',
      'Loading states & empty states designed',
      'Error states & success feedback designed',
    ],
    aiTools: [
      { icon: '✦', name: 'Figma AI', use: 'Component generation, copy rewriting, auto-layout corrections.' },
      { icon: '🖼', name: 'Midjourney', use: 'Custom art direction, mood boards and hero image generation.' },
      { icon: '⚡', name: 'Galileo AI', use: 'Prompt-to-UI generation — use as a starting point, not the finish.' },
      { icon: '🔤', name: 'Fontjoy', use: 'AI font pairing — find perfect type combinations in seconds.' },
      { icon: '🎨', name: 'Coolors AI', use: 'AI-generated brand color palettes from a starting seed color.' },
    ],
    prompts: [
      {
        tool: 'Midjourney',
        title: 'Mood Board & Visual Direction Prompts',
        prompt: `You are a senior art director and visual strategist creating mood board direction for a brand identity and web design project.

<context>
Before opening a design tool, visual direction must be aligned with brand strategy. Mood boards communicate tone, texture, and ambition faster than any brief. Precise Midjourney prompts generate reference imagery that aligns the team and client on the visual language — before a single pixel is placed.
</context>

<input>
INDUSTRY: [Client's industry]
BRAND_PERSONALITY: [5 adjectives from Brand DNA — e.g. premium, minimal, authoritative, warm, modern]
COLOR_DIRECTION: [Seed palette — e.g. deep navy, warm cream, electric blue]
REFERENCE_BRANDS: [3 brands whose visual language you admire — e.g. Linear, Stripe, Notion]
LAYOUT_STYLE: [e.g. editorial, asymmetric grid, Swiss minimalist, brutalist, warm editorial]
AUDIENCE_FEELING: [How the audience should feel — e.g. confident, safe, inspired, energised]
</input>

<instructions>
1. Generate 4 distinct Midjourney prompts — one for each mood board angle below.
2. Each prompt must be specific about style, lighting, texture, composition, and colour.
3. Include technical Midjourney parameters: --ar, --style, --v flags.
4. Translate reference brand names into visual descriptors — do not use brand names directly.
5. Add a brief creative rationale for each prompt explaining why it serves the brand.
</instructions>

<output_format>
## Midjourney Mood Board Prompts — [INDUSTRY] Brand

**Prompt 1 — Hero Atmosphere**
[Full Midjourney prompt] --ar 16:9 --style raw --v 6
Rationale: [Why this visual angle serves the brand]

**Prompt 2 — Typography & Editorial Feel**
[Full Midjourney prompt] --ar 4:5 --style raw --v 6
Rationale: ...

**Prompt 3 — Texture & Material Reference**
[Full Midjourney prompt] --ar 1:1 --style raw --v 6
Rationale: ...

**Prompt 4 — UI/Product Environment**
[Full Midjourney prompt] --ar 16:9 --style raw --v 6
Rationale: ...

### What to Look For in Results
- [Quality to select for]
- [Quality to select for]
- [Quality to reject]
</output_format>

<constraints>
- Prompts must avoid generic descriptors like "beautiful", "stunning", "amazing"
- Each prompt must describe a specific scene or composition, not just an aesthetic
- Reference brand names must be translated into visual attributes — not used directly in prompts
- All 4 prompts must feel cohesive — same visual family, different angles
</constraints>`,
      },
      {
        tool: 'Claude / ChatGPT',
        title: 'Design System Token Decisions',
        prompt: `You are a design systems specialist and senior visual designer who builds scalable token-based systems for web products.

<context>
Design tokens are the DNA of a design system. Every decision made now — color, type scale, spacing rhythm, border radius — will be inherited by every screen, every component, every interaction. Rushing this phase costs days of rework. Doing it right creates a foundation that scales without friction.
</context>

<input>
BUSINESS_TYPE: [e.g. SaaS tool, professional services, e-commerce, fintech]
BRAND_PERSONALITY: [5 adjectives from Brand DNA]
PRIMARY_COLOR_SEED: [A single color or description — e.g. "#0500FF", "electric blue", "warm forest green"]
SPACING_PREFERENCE: [4pt system / 8pt system / no preference]
AUDIENCE_CONTEXT: [Who uses this — e.g. enterprise executives, creative professionals, general consumers]
</input>

<instructions>
1. Define the complete color system: primary, secondary, accent, neutrals, semantic states (success, error, warning, info).
2. Recommend a Google Fonts type pairing with full type scale from H1 to caption.
3. Define the spacing scale based on the preferred base unit.
4. Recommend border radius values with brand personality rationale.
5. Define shadow/elevation values for layered UI elements.
6. Justify every token decision in terms of brand personality and audience context.
</instructions>

<output_format>
## Design System Tokens — [BUSINESS_TYPE]

### Color System
| Token | CSS Variable | Value | Usage | Personality Rationale |
|---|---|---|---|---|
| Primary | --color-primary | #... | CTAs, links, key UI | ... |
| ... | | | | |

### Type Scale (Google Fonts Pairing)
**Display font:** [Name] — [Why this serves the brand]
**Body font:** [Name] — [Why this pairs well]

| Level | Size (rem) | Weight | Line Height | Usage |
|---|---|---|---|---|
| H1 | ... | ... | ... | ... |

### Spacing Scale ([4pt/8pt] Base)
[Token name → value mapping — e.g. --space-1: 4px through --space-16: 64px]

### Border Radius
| Token | Value | Personality Signal |
|---|---|---|

### Shadow / Elevation
[3-level system: low, mid, high — with exact values]
</output_format>

<constraints>
- All colors must pass WCAG AA contrast against their primary background usage
- Type scale must be defined in rem, not px
- No more than 2 typefaces in the entire system
- Every token must follow CSS variable naming convention (--token-name)
- Spacing scale must follow the chosen base unit strictly — no arbitrary values
</constraints>`,
      },
      {
        tool: 'Claude / ChatGPT',
        title: 'Write Hero Section Copy',
        prompt: `You are a conversion copywriter and brand voice specialist who writes web copy for premium B2B and consumer brands.

<context>
The hero section is the most read — and most abandoned — part of any website. It has 5–8 seconds to communicate who this is for, what they get, and why they should stay. Every word choice carries strategic weight. Generic copy kills conversion; specific copy builds trust instantly.
</context>

<input>
BUSINESS_NAME: [Name]
BUSINESS_DESCRIPTION: [One-line description of what they do]
PRIMARY_AUDIENCE: [Specific person this headline speaks to]
USP: [The single differentiator — what they do that no one else does]
PRIMARY_PAIN_POINT: [The problem the audience is experiencing right now]
BRAND_TONE: [e.g. bold and direct / warm and professional / premium and confident]
PRIMARY_CTA: [The action the hero button drives — e.g. Book a Free Call / Start Free Trial]
</input>

<instructions>
1. Write 5 headline + subheadline pairs — each using a different messaging angle.
2. Use these 5 angles in order: Outcome-led, Problem-led, Challenger, Social Proof, Question.
3. For each pair, write the CTA button copy that fits the headline's energy.
4. Provide a brief rationale for each angle — when to use it and what it signals.
5. Flag which 2 variations are recommended for A/B testing and why.
</instructions>

<output_format>
## Hero Copy Variations — [BUSINESS_NAME]

**Variation 01 — Outcome-led**
Headline: [Max 8 words]
Subheadline: [Max 20 words]
CTA: [Button copy]
Rationale: ...

**Variation 02 — Problem-led**
Headline: ...
Subheadline: ...
CTA: ...
Rationale: ...

**Variation 03 — Challenger**
...

**Variation 04 — Social Proof**
...

**Variation 05 — Question**
...

---
### A/B Test Recommendation
**Test:** Variation [X] vs Variation [Y]
**Hypothesis:** [Why these two represent the most meaningful test]
</output_format>

<constraints>
- Headlines must be max 8 words — no exceptions
- Subheadlines must be max 20 words — prioritise clarity over cleverness
- Avoid all generic phrases: "transform", "next level", "world-class", "cutting-edge", "innovative solution"
- Every word must be earnable — if a competitor could say the same thing, rewrite it
- CTA copy must be benefit-led — never "Submit" or "Click Here"
</constraints>`,
      },
      {
        tool: 'Claude / ChatGPT',
        title: 'Micro-copy for All UI Elements',
        prompt: `You are a UX copywriter specialising in interface micro-copy for digital products and marketing websites.

<context>
Micro-copy is the connective tissue of a website's user experience. Every label, placeholder, error message, and confirmation speaks in the brand's voice and either builds trust or erodes it. Inconsistent micro-copy signals an unprofessional product; precise micro-copy feels effortless and human.
</context>

<input>
WEBSITE_TYPE: [e.g. service business, SaaS product, e-commerce, professional portfolio]
BRAND_TONE: [e.g. friendly-professional / bold-direct / warm-human / premium-minimal]
BRAND_VOICE_DONTS: [Words or phrases the brand explicitly avoids — from Brand DNA]
PRIMARY_CTA_GOAL: [What the main call to action achieves for the user]
INDUSTRY_CONTEXT: [Any terminology or sensitivities relevant to this audience]
</input>

<instructions>
1. Write micro-copy for all 10 UI element categories in the output format.
2. Ensure every piece of copy uses the same brand voice — it should all sound like one person wrote it.
3. Write 3 variations for both primary and secondary CTAs.
4. Make error messages helpful and human — guide the user, never punish them.
5. Write the 404 page as a brand moment, not a system error apology.
</instructions>

<output_format>
## UI Micro-copy — [WEBSITE_TYPE]

**Primary CTA (3 variations)**
1. "[Copy]" — [When to use this variation]
2. "[Copy]" — [When to use]
3. "[Copy]" — [When to use]

**Secondary CTA (3 variations)**
1. ...

**Form Field Placeholders**
- Name: "..."
- Email: "..."
- Phone: "..."
- Message: "..."
- Company: "..."

**Form Submit Button:** "..."

**Success Confirmation**
Headline: "..."
Body: "..."

**404 Page**
Headline: "..."
Subtext: "..."
CTA: "..."

**Empty State Message:** "..."
**Cookie Consent Banner:** "..."
**Footer Tagline:** "..."
</output_format>

<constraints>
- All copy must pass the brand voice test — remove anything that sounds generic or corporate
- Error messages must never include technical terminology or imply user blame
- CTA copy must use active verbs and describe what the user gets, not what they do
- 404 page must maintain brand tone — not default to "Oops, something went wrong"
- Maximum 12 words per CTA, 8 words per form placeholder
</constraints>`,
      },
    ],
    tips: [
      'Use a 4pt spacing system (4, 8, 12, 16, 24, 32, 48, 64) — it creates invisible harmony across screens.',
      'Add one unexpected element per page: a texture, bold number, or off-grid element. That\'s what makes it memorable.',
      'Steal like an artist — collect 20 reference screens before starting. Build a swipe file in Figma.',
      'The fastest way to make UI look expensive: increase padding, reduce font size, add whitespace.',
    ],
  },
  {
    id: 5,
    code: '05',
    name: 'Review',
    full: 'Review & Refine',
    figmaUrl: '',
    icon: '◐',
    time: '1–3 DAYS',
    tag: 'POLISH',
    description: 'Senior designers review with a ruthless eye. Great work survives critique — it gets stronger from it.',
    output: 'Approved Design Files + Handoff Annotations',
    checklist: [
      'Internal design review — fresh eyes after 24h',
      'Consistency audit across all screens',
      'Mobile responsiveness spot-check',
      'Copy review — does it speak the user\'s language?',
      'CTA clarity — is the primary action immediately obvious?',
      'Accessibility audit — color contrast, touch targets',
      'Prototype key user flows for client review',
      'Prepare presentation story — decisions with rationale',
      'Client feedback collection — structured, not open-ended',
      'Feedback triage — business need vs personal preference',
      'Maximum 2 revision rounds — scope-manage this upfront',
    ],
    aiTools: [
      { icon: '✦', name: 'Claude', use: 'Review copy for clarity, tone alignment and conversion optimisation.' },
      { icon: '♿', name: 'Stark', use: 'Accessibility checker directly inside Figma — contrast, WCAG, a11y.' },
      { icon: '🎥', name: 'Loom', use: 'Walk clients through designs async — clients arrive informed, not confused.' },
      { icon: '🧪', name: 'Maze', use: 'Quick usability test with real users before final delivery.' },
    ],
    prompts: [
      {
        tool: 'Claude',
        title: 'Full Copy Audit',
        prompt: `You are a conversion copywriter and brand editor conducting a comprehensive copy audit for a website pre-launch.

<context>
Copy audit is one of the highest-leverage activities before launch. Poor copy undermines even exceptional visual design — it breaks tone consistency, fails to convert, and signals to users that the brand isn't trustworthy. This audit identifies every line that needs to work harder.
</context>

<input>
ALL_WEBSITE_COPY: [Paste every piece of copy from every page — headline, subhead, body, CTAs, nav, footer, form labels, error states]
BRAND_VOICE: [e.g. bold, direct, premium / warm, human, approachable]
TARGET_AUDIENCE: [Description of primary user]
PRIMARY_CONVERSION_GOAL: [The one action the website must drive]
BRAND_DONTS: [Words or phrases the brand explicitly avoids]
</input>

<instructions>
1. Evaluate every piece of copy against the 5 dimensions in the output format.
2. Flag every line that fails any dimension — include the exact copy and the specific issue.
3. Write a suggested rewrite for every flagged item.
4. Identify the 3 highest-priority fixes that would most immediately improve conversion.
5. Rate overall copy quality: Strong / Needs Work / Significant Revision Required.
</instructions>

<output_format>
## Copy Audit — [PAGE/SITE NAME]

### Issues Found
| Location | Current Copy | Dimension Failed | Issue | Suggested Rewrite |
|---|---|---|---|---|

### Top 3 Conversion-Critical Fixes
1. **[Location]:** [Why conversion-critical and the specific fix]
2. ...
3. ...

### Overall Assessment
**Rating:** [Strong / Needs Work / Significant Revision Required]
**Primary Strength:** ...
**Primary Weakness:** ...
</output_format>

<constraints>
- Evaluate every piece of copy — do not skip sections
- The 5 dimensions: Clarity, Tone Consistency, Benefit Focus, CTA Effectiveness, Redundancy
- Suggested rewrites must match the brand voice exactly — not generic improvements
- Top 3 fixes must be ranked by conversion impact, not ease of change
- Be direct — this is a pre-launch audit, not a courtesy review
</constraints>`,
      },
      {
        tool: 'Claude',
        title: 'Client Presentation Script',
        prompt: `You are a senior creative director who presents design work to clients as a strategic consultant, not a service vendor.

<context>
How you present designs determines whether clients trust your decisions or start micromanaging them. A strategy-first presentation — where creative decisions are connected to business goals — positions the designer as a partner, not a supplier. This script ensures the work is defended with logic, not just aesthetics.
</context>

<input>
CLIENT_NAME: [Business name]
PAGES_DESIGNED: [List all pages included in this presentation]
KEY_DESIGN_DECISIONS: [List 3–5 major creative decisions and their strategic rationale]
BRAND_DIRECTION_SUMMARY: [2-sentence summary of the visual strategy]
CLIENT_PERSONALITY: [e.g. analytical, instinct-driven, risk-averse, collaborative]
POTENTIAL_OBJECTIONS: [Known concerns — e.g. "logo too small", "not enough color", "prefer different font"]
</input>

<instructions>
1. Write a complete 20-minute presentation script with timing markers at each section.
2. Open with strategic context — the business problem, what research revealed, the design response.
3. Walk through each page with the "why" before the "what" for every major decision.
4. Connect each design decision explicitly to the client's stated business goals.
5. Pre-empt each known objection with a ready response embedded naturally in the script.
6. Close with a structured feedback request — 3 specific questions, not "what do you think?"
</instructions>

<output_format>
## Presentation Script — [CLIENT_NAME]

**[0:00–2:00] Opening: The Strategic Frame**
[Script — 150–200 words]

**[2:00–5:00] What the Research Told Us**
[Script — key research insights that informed the design]

**[5:00–15:00] Design Walkthrough**

*Page: [Page name] — [5:00–7:00]*
[Script with design rationale — why before what]

*Page: [Page name] — [7:00–10:00]*
...

**[15:00–18:00] Pre-empting Objections**
If they say "[Objection 1]": "[Non-defensive response that redirects to goal]"
If they say "[Objection 2]": "..."

**[18:00–20:00] Structured Feedback Request**
[Script — end with 3 specific questions]
</output_format>

<constraints>
- Never use the phrase "I think" — state design decisions as strategic conclusions
- Objection responses must be non-defensive, evidence-based, and redirect to the business goal
- Structured feedback questions must be specific — avoid "What do you think overall?"
- Tone: senior, consultative, confident — presenting expert recommendations, not seeking approval
- Write for natural speech, not formal text
</constraints>`,
      },
      {
        tool: 'Claude',
        title: 'Feedback Triage Prompt',
        prompt: `You are a senior design consultant who manages client relationships and protects design integrity without alienating clients.

<context>
Unmanaged feedback is the #1 cause of scope creep and diluted design quality. Not all feedback deserves equal action — some is business-critical, some is personal preference, and some is a new request disguised as feedback. Triaging feedback before acting on it is what separates senior designers from juniors.
</context>

<input>
CLIENT_FEEDBACK: [Paste the complete client feedback verbatim — every comment, email, or note]
ORIGINAL_BRIEF_GOALS: [The core business objectives from the original brief]
REVISION_ROUND_NUMBER: [1st / 2nd / Final]
RELATIONSHIP_TONE: [Describe the client dynamic — e.g. collaborative, demanding, analytical, trusting]
</input>

<instructions>
1. Triage all feedback into the 5 categories defined in the output format.
2. For Category 4 (Push Back), write a professional, non-defensive response for each item.
3. For Category 5 (Out of Scope), write a change order flag with estimated impact.
4. Identify if any feedback contradicts the original brief — flag for explicit discussion.
5. Provide a recommended response strategy for this specific revision conversation.
</instructions>

<output_format>
## Feedback Triage — Round [X]

### Category 1 — Must Implement
(Tied directly to business goals or original brief)
- [Feedback item] → [Specific action]

### Category 2 — Should Implement
(Improves UX or conversion meaningfully)
- [Feedback item] → [Specific action]

### Category 3 — Discuss First
(Needs clarification before actioning)
- [Feedback item] → [Question to ask the client]

### Category 4 — Push Back
(Personal preference contradicting design best practice)
- [Feedback item]
  Response: "[Professional, non-defensive reply that redirects to the goal]"

### Category 5 — Out of Scope
(New requests not in original brief)
- [Feedback item]
  Change Order Flag: [Scope + timeline impact estimate]

### Response Strategy
[Recommended tone, sequence, and key talking points for this revision conversation]
</output_format>

<constraints>
- Every feedback item must be assigned a category — no omissions
- Push back responses must be evidence-based and redirect to the client's stated goal — never apologetic
- Out-of-scope flags must include a rough scope and timeline impact estimate
- Tone of responses: collaborative and confident
- If Round 2 feedback would require a 3rd round, flag this explicitly
</constraints>`,
      },
      {
        tool: 'Claude',
        title: 'Self-Review Checklist Audit',
        prompt: `You are a senior design director conducting a pre-client-presentation quality review of a completed website design.

<context>
The hour before a client presentation is the last chance to find problems before the client does. A disciplined self-review catches visual inconsistencies, UX failures, and copy issues that become expensive to fix after client approval. This review must be honest and specific — not reassuring.
</context>

<input>
SCREEN_DESCRIPTIONS: [Describe each key screen in detail, or paste all copy — include every major section]
DESIGN_SYSTEM_USED: [Colors, fonts, spacing approach]
PRIMARY_CONVERSION_GOAL: [What the design must drive]
TARGET_DEVICE_PRIORITY: [Mobile-first / Desktop-first / Equal]
ACCESSIBILITY_TARGET: [WCAG AA / AAA / not specified]
</input>

<instructions>
1. Evaluate the design against all 7 quality dimensions in the output format.
2. For each dimension, provide a pass/fail verdict with specific evidence from the screens.
3. Flag every specific instance where a standard is not met — name the exact screen and element.
4. Rate overall design readiness: Ready to Present / Needs Minor Fixes / Needs Significant Revision.
5. List all fixes in priority order — highest conversion/quality impact first.
</instructions>

<output_format>
## Pre-Presentation Quality Review

### Dimension 1 — Visual Hierarchy
**Verdict:** Pass / Fail
**Finding:** [Specific — which screens fail and how]
**Fix:** [Exact action required]

### Dimension 2 — Consistency
**Verdict:** Pass / Fail
**Finding:** [Spacing, color, or type inconsistencies — exact locations]
**Fix:** ...

### Dimension 3 — CTA Visibility
**Verdict:** Pass / Fail
**Finding:** [Every screen where the CTA is unclear or visually weak]

### Dimension 4 — Information Density
**Verdict:** Pass / Fail
**Finding:** [Sections with too much competing for attention]

### Dimension 5 — Mobile Readability (375px)
**Verdict:** Pass / Fail
**Finding:** [Specific text, spacing, or touch target issues]

### Dimension 6 — Trust Signals
**Verdict:** Pass / Fail
**Finding:** [Missing social proof or risk-reducers before key CTAs]

### Dimension 7 — Narrative Scroll
**Verdict:** Pass / Fail
**Finding:** [Does the page tell a logical story as you scroll?]

---
### Overall Readiness: [Ready to Present / Needs Minor Fixes / Needs Significant Revision]

### Priority Fix List
1. [Fix] — Impact: High / Medium / Low
2. ...
</output_format>

<constraints>
- Be specific — "looks inconsistent" is not acceptable; name the exact element and location
- Do not soften findings — the purpose is to find problems before the client does, not validate the work
- Every failing dimension must have a specific, actionable fix
- Mobile review must reference 375px width specifically
- If not ready to present, state this explicitly — do not hedge
</constraints>`,
      },
    ],
    tips: [
      'Present designs as a story, not a gallery. "Why we made this decision" is worth more than showing screens.',
      'Send a Loom walkthrough before the review call — clients arrive with context, not questions.',
      'Separate business feedback from personal taste: "That\'s interesting — let\'s test it against the goal."',
      'Build a parking lot for client ideas outside scope. It validates them without derailing the project.',
    ],
  },
  {
    id: 6,
    code: '06',
    name: 'Handoff',
    full: 'Handoff & Launch',
    figmaUrl: '',
    icon: '▷',
    time: '1–2 DAYS',
    tag: 'DELIVERY',
    description: 'The handoff is a product too. Sloppy handoff = developer frustration = broken designs. Own this phase fully.',
    output: 'Handoff Package + Style Guide + Launch Checklist',
    checklist: [
      'Design tokens exported (colors, typography, spacing)',
      'Component specs annotated in Figma Dev Mode',
      'Asset exports organised (SVG, WebP, PNG @ 2x)',
      'Interaction specs documented',
      'Responsive breakpoint guide',
      'Copy document — all text in one place for dev',
      'Animation specs (duration, easing curves)',
      'Dev QA checklist created',
      'Post-launch analytics setup guidance',
      'Design → Dev handoff walkthrough call',
      'Post-launch review scheduled — 30 days out',
    ],
    aiTools: [
      { icon: '✦', name: 'Figma Dev Mode', use: 'Auto-generate CSS, component specs and asset exports for developers.' },
      { icon: '📚', name: 'Zeroheight', use: 'Turn Figma components into a living style guide developers actually use.' },
      { icon: '⚡', name: 'Claude', use: 'Write developer handoff documentation and annotated notes from designs.' },
      { icon: '📋', name: 'Linear', use: 'Create structured dev tickets from your handoff notes automatically.' },
    ],
    prompts: [
      {
        tool: 'Claude',
        title: 'Developer Handoff Documentation',
        prompt: `You are a senior design engineer who writes handoff documentation that developers can implement without a single clarification call.

<context>
Poor handoff documentation is the number one cause of designs being built incorrectly. Developers should be able to open the handoff doc and build with zero ambiguity. This documentation becomes the single source of truth and the QA reference for the entire development phase.
</context>

<input>
PROJECT_NAME: [Name]
PAGES: [Complete list of all pages]
DESIGN_SYSTEM: [Colors (hex), fonts (name + weights), spacing scale, border radius values]
KEY_INTERACTIONS: [All interactive elements — e.g. sticky nav, scroll animations, hover states, mobile hamburger menu]
SPECIAL_COMPONENTS: [e.g. accordion, modal, slider, multi-step form, infinite scroll]
BREAKPOINTS: [All breakpoints — e.g. 375px / 768px / 1280px / 1440px]
FONT_LOADING: [Google Fonts / self-hosted / system font stack]
IMAGE_FORMAT: [e.g. WebP with PNG fallback / SVG / JPEG]
ANIMATION_NOTES: [Timing, easing, or performance constraints]
</input>

<instructions>
1. Write a complete handoff document structured in the 7 sections below.
2. Design system section must include a full tokens table in CSS variable format.
3. Component inventory must include default, hover, active, focus, and disabled states for all interactive elements.
4. Interaction specs must include: trigger, duration, easing, and performance constraints.
5. Responsive behaviour must describe layout changes at each breakpoint.
6. Include a developer QA checklist — minimum 10 items for sign-off.
</instructions>

<output_format>
## Handoff Documentation — [PROJECT_NAME]

### 01 / Project Overview
[1 paragraph: project context, design tool used, Figma link]

### 02 / Design System Tokens
| Token | CSS Variable | Value | Usage |
|---|---|---|---|

### 03 / Component Inventory
| Component | States | Notes | Figma Frame |
|---|---|---|---|

### 04 / Interaction Specifications
| Element | Trigger | Property | Duration | Easing | Mobile Behaviour |
|---|---|---|---|---|---|

### 05 / Responsive Behaviour
| Breakpoint | Layout Change | Component Behaviour |
|---|---|---|

### 06 / Assets & Export Guide
[File format, naming convention, folder structure, @2x/WebP requirements]

### 07 / Developer QA Checklist
- [ ] [Item 1]
- [ ] [Item 2]
- [ ] ... (minimum 10 items)
</output_format>

<constraints>
- All color values in hex — no RGB or HSL in the handoff
- All type sizes in rem; px acceptable for borders and shadows only
- Easing functions must be specific — use cubic-bezier() or named values, never just "ease"
- QA checklist must cover: visual accuracy, interactions, responsive, and accessibility
- Figma frame references must be named — not just "see Figma"
</constraints>`,
      },
      {
        tool: 'Claude',
        title: 'Generate Dev Tickets from Design',
        prompt: `You are a senior product designer who writes development tickets clear enough that a developer in a different timezone can build from them without a call.

<context>
Vague tickets produce vague implementations. A ticket is not a summary of the design — it is a precise technical specification written in the developer's language. Each ticket must define what to build, how it should behave, and how to know when it's done.
</context>

<input>
PROJECT_NAME: [Name]
HANDOFF_NOTES: [Paste your complete handoff notes — every screen, component, interaction, and edge case]
TECH_STACK: [e.g. Next.js + Tailwind / React + CSS Modules / Webflow / WordPress + ACF]
TICKET_TOOL: [e.g. Linear, Jira, GitHub Issues, Notion]
PRIORITY_CONTEXT: [Any launch constraints or dependencies the developer needs to know]
</input>

<instructions>
1. Convert all handoff notes into structured development tickets.
2. Group tickets by: Global elements → Homepage → Inner pages → Forms → Mobile-specific → Animations.
3. For each ticket, write a complete spec: type, priority, complexity, description, acceptance criteria, design reference, and edge cases.
4. Flag dependencies between tickets explicitly.
5. Estimate relative complexity for each ticket: S / M / L / XL.
</instructions>

<output_format>
## Development Tickets — [PROJECT_NAME]

### Group 1 — Global Elements

---
**[TICKET-001] [Ticket Title]**
Type: Feature / Bug / Enhancement
Priority: High / Medium / Low
Complexity: S / M / L / XL
Dependencies: [TICKET-XXX] or None

**Description:**
[Clear statement of what needs to be built]

**Acceptance Criteria:**
- [ ] [Specific, independently testable criterion]
- [ ] [Specific, independently testable criterion]
- [ ] [Specific, independently testable criterion]

**Design Reference:** [Figma frame name]
**Edge Cases:** [Browser-specific, content-length, error state considerations]

---
[Repeat for each ticket, grouped by section]
</output_format>

<constraints>
- Every acceptance criterion must be independently testable — no subjective criteria ("looks good")
- Edge cases are mandatory — include at minimum: empty state, long content, mobile breakpoint
- Ticket titles must be action-oriented: "Build [Component]", "Implement [Interaction]", "Add [Feature]"
- Complexity estimates must account for responsive behaviour — a component that changes significantly at mobile is never "S"
- Do not create tickets for content population — only for build/code work
</constraints>`,
      },
      {
        tool: 'Claude',
        title: 'Interaction Specification Writer',
        prompt: `You are a senior interaction designer who writes interaction specifications precise enough to eliminate developer interpretation.

<context>
Interaction specifications are the bridge between design intent and implementation reality. Without them, developers make timing, easing, and behaviour decisions that rarely match the designer's vision. A complete spec eliminates the "that's not quite what I meant" feedback loop after development.
</context>

<input>
PROJECT_NAME: [Name]
INTERACTIVE_ELEMENTS: [List every interactive element — e.g. primary navigation, CTA buttons, hamburger menu, accordion, contact form, hover cards, scroll-triggered animations]
DESIGN_SYSTEM_MOTION: [Any motion principles — e.g. "fast and snappy", "smooth and premium", "subtle and functional"]
PERFORMANCE_CONSTRAINT: [e.g. no animation over 300ms on mobile, GPU-composited only, prefers-reduced-motion must be respected]
BRAND_MOTION_REFERENCE: [A site whose motion feel matches the target — e.g. Linear.app, Stripe, Apple]
</input>

<instructions>
1. Write a complete interaction specification for every listed element.
2. For each element, define all states: default, hover, active/pressed, focus, disabled, loading (if applicable).
3. Specify exact transition properties: CSS property, duration in milliseconds, easing function (cubic-bezier or named).
4. Define mobile touch behaviour separately from hover where different.
5. Include a prefers-reduced-motion alternative for every animated element.
6. Note GPU-composited property requirements for performance.
</instructions>

<output_format>
## Interaction Specifications — [PROJECT_NAME]

---
### [Element Name]
**Default State:** [Visual description]
**Hover State:** [What changes] | Duration: [X]ms | Easing: [function]
**Active/Pressed State:** [What changes] | Duration: [X]ms | Easing: [function]
**Focus State:** [Keyboard navigation appearance — outline style, ring]
**Disabled State:** [Visual change + cursor: not-allowed]
**Loading State (if applicable):** [Skeleton/spinner/pulse behaviour]

**Transition CSS:**
transition: [property] [duration]ms [easing-function];

**Mobile/Touch Behaviour:** [Tap state, swipe, long-press differences]
**Reduced Motion Alternative:** [What this element does when prefers-reduced-motion: reduce is active]
**GPU Compositing:** [Yes — use transform/opacity only / No]

---
[Repeat for each element]
</output_format>

<constraints>
- Every duration must be in milliseconds — never use "fast" or "slow"
- Easing must be specific: named values (ease-out, ease-in-out) or cubic-bezier() — never just "ease"
- Focus states are mandatory for all interactive elements — accessibility is non-negotiable
- Reduced motion alternatives must be specified for every animated element
- Do not spec interactions for decorative elements — only functional, user-facing interactions
</constraints>`,
      },
      {
        tool: 'Claude',
        title: 'Post-Launch Review Framework',
        prompt: `You are a senior digital strategist who builds post-launch review frameworks that turn website data into actionable design decisions.

<context>
The 30 days after launch are when real performance data arrives. A structured review framework transforms raw analytics into insights that justify design decisions, identify quick wins, and — critically — open the conversation for an ongoing retainer engagement. This review is both a quality tool and a client relationship asset.
</context>

<input>
WEBSITE_TYPE: [e.g. service business, SaaS, e-commerce]
PRIMARY_CONVERSION_GOAL: [The metric that defines success]
ANALYTICS_TOOLS: [e.g. GA4, Hotjar, Clarity, Mixpanel, Search Console]
LAUNCH_BASELINE: [Any pre-launch metrics if available — traffic, conversion rate, bounce rate]
CLIENT_BUSINESS_CONTEXT: [Seasonal factors, marketing campaigns, or external variables to account for]
</input>

<instructions>
1. Create a 30-day post-launch review framework divided into 4 weekly phases.
2. For each phase, define: what to monitor, what good looks like, and what triggers intervention.
3. Specify the exact metrics to pull from each analytics tool listed.
4. Write a Week 4 client report template structured for a non-technical reader.
5. Frame the Week 4 report to naturally position an ongoing retainer conversation.
</instructions>

<output_format>
## 30-Day Post-Launch Review — [WEBSITE_TYPE]

### Week 1 — Technical Health
**Monitor:**
- [Metric] via [Tool] — Good: [...] | Intervention Trigger: [...]
**Actions if issues found:** ...

### Week 2 — User Behaviour
**Monitor:**
- [Metric] via [Tool] — Good: [...] | Intervention Trigger: [...]

### Week 3 — Conversion Analysis
**Monitor:**
- [Metric] via [Tool] — Good: [...] | Intervention Trigger: [...]

### Week 4 — Performance Review & Client Report

**Metrics to Pull:**
| Metric | Tool | Launch Baseline | Current | Status |
|---|---|---|---|---|

**Client Report Template:**
---
# [Website Name] — 30-Day Performance Review

**What We Launched**
[1–2 sentences]

**What the Data Shows**
- [Win 1]
- [Win 2]
- [Opportunity — framed positively]

**Recommended Next Steps**
1. [Quick win — actionable within 2 weeks]
2. [Medium-term optimisation]
3. [Strategic opportunity — frames retainer naturally]
---
</output_format>

<constraints>
- Every metric must be tied to a specific tool and extraction method
- "Good" benchmarks must be industry-realistic — not aspirational
- Week 4 report must be written for a non-technical client — zero analytics jargon
- Recommended next steps must be specific and actionable — not "improve conversion rate"
- The report must position ongoing work naturally — not as an explicit pitch
</constraints>`,
      },
    ],
    tips: [
      'Figma Dev Mode auto-generates CSS and saves 2–3 hours of back-and-forth per project. Use it every time.',
      'Create a Known Issues doc — minor things you\'re tracking. Shows professionalism, not weakness.',
      'Schedule a 30-day post-launch check — it\'s a upsell opportunity and a quality signal to clients.',
      'Record a Loom tour of the handoff file. Developers reference it for weeks after delivery.',
    ],
  },
]

// ─── Client Presentation Scripts ─────────────────────────────────────────────

const STAGE_PRESENTATIONS: Record<string, Array<{ issue: string; tackle: string; say: string }>> = {
  '01': [
    {
      issue: 'Client wants to skip discovery and go straight to design',
      tackle: 'Mike Monteiro\'s core teaching: your job is not to do what the client asks — it\'s to solve the right problem. Show the cost of skipping: every hour of unclear brief costs three hours of revision. Make discovery feel like risk protection, not process overhead.',
      say: '"I completely understand the urgency. But the fastest path to a great outcome is making sure we\'re solving the right problem first. Skipping this means we build on assumptions — and assumptions are the single biggest driver of expensive revisions. An hour now saves days later."',
    },
    {
      issue: 'Two stakeholders give conflicting directions on the call',
      tackle: 'Don\'t arbitrate — anchor to the user. IDEO\'s core principle: the user\'s goal is the only neutral ground. Document both views, name the tension explicitly, and commit to bringing a recommendation based on what the evidence supports, not politics.',
      say: '"I\'m hearing two valid perspectives and I don\'t want to paper over them. I\'m noting both down. The question I\'ll take away is: which direction gives your user the clearest path to [goal]? I\'ll map both against that and come back with a recommendation. Who is the final decision-maker if the views stay different?"',
    },
    {
      issue: 'Client gives vague brief ("just make it modern and professional")',
      tackle: 'Vague brief = vague design. Paul Boag\'s approach: get the client to describe a specific customer experience in their own words. Concrete customer scenarios unlock concrete design decisions. Never proceed with adjectives as your brief.',
      say: '"\'Modern and professional\' means something different to everyone. Help me make it concrete — describe your best customer. When they land on your site, what\'s the single thing they need to feel or do in the first five seconds for this to be a success?"',
    },
    {
      issue: 'Client says "we don\'t really have competitors"',
      tackle: 'Every user has somewhere else to go. Reframe competitors as user alternatives, not direct market rivals. The insight isn\'t about benchmarking — it\'s about understanding what mental models your users already carry.',
      say: '"It\'s not about who you compete with commercially — it\'s about where your users go if they don\'t choose you. That\'s the comparison that shapes their expectations when they land on your site. Who gets their attention instead?"',
    },
    {
      issue: 'Client can\'t define what success looks like',
      tackle: 'Abstract goals produce abstract designs. AJ&Smart\'s approach: force a concrete metric with a concrete time horizon. "More leads" is not a brief. "30% more qualified enquiries in 90 days" is a brief you can design toward.',
      say: '"Let\'s make it measurable. Six months after launch — what number would need to move for you to call this project a success? Pick one: enquiries, revenue, sign-ups, retention. One number. Everything we build will point toward it."',
    },
    {
      issue: 'Client doesn\'t believe the brief needs to be signed off in writing',
      tackle: 'Paul Boag principle: everything agreed verbally will be misremembered differently by both sides. The brief isn\'t bureaucracy — it\'s the document that protects the client from scope creep and protects you from redesigning work built on the wrong foundation.',
      say: '"I\'d like to get today\'s agreements in writing before we move forward — not as a formality, but because both of us will reference it when things get complex. It\'s the document we both look at if questions come up later. Give me 24 hours to send it over for your sign-off."',
    },
  ],
  '02': [
    {
      issue: 'Client dismisses research with "we\'re completely different from our competitors"',
      tackle: 'Competitors don\'t train your brand — they train your users\' expectations. NN/g research: users transfer behaviour patterns from every site they\'ve visited. You\'re not benchmarking the client against competitors; you\'re mapping what the user already knows.',
      say: '"The research isn\'t comparing your brand to theirs — it\'s showing us what mental models your users already carry. They\'ve been trained by these sites before they ever reach yours. Understanding that is how we meet them where they are."',
    },
    {
      issue: 'Client says "I don\'t think our users actually care about that"',
      tackle: 'Paul Boag\'s anchor technique: connect the finding to something the client themselves said. Research that contradicts gut feel is always more persuasive when it echoes something the client already voiced. If you can\'t connect it, acknowledge the tension and offer to test.',
      say: '"This is actually something you mentioned in discovery — [specific point]. The research is validating it, not introducing something new. If you\'re still uncertain, the cleanest way to resolve it is to test the assumption in the design. We build both, we measure, we know."',
    },
    {
      issue: 'Client wants to act immediately on research without UX planning',
      tackle: 'Channel the energy. Don\'t slow them down — channel it into the next phase. Jumping from research to execution without structure creates expensive rework. The research is input to strategy, not a to-do list.',
      say: '"I love that energy — this is exactly what good research does. The next step is translating this into the site structure, so the solution we build is designed around this insight rather than bolted on to it. Let\'s take two days to map the flow before we start building screens."',
    },
    {
      issue: 'Competitor research feels too generic — client isn\'t engaged',
      tackle: 'Data without story loses the room. Dscout\'s approach: transform findings into narrative. Replace "47% of users do X" with "here\'s Sarah — she\'s your ideal customer. Watch what happens when she tries to do [task] on [competitor site]." Emotion changes priorities faster than statistics.',
      say: '"Let me reframe this. Instead of the chart — let me show you what this looks like from a real user\'s perspective. [Walk through the scenario.] That\'s the problem every one of these competitors has created for their users. That\'s the gap we\'re walking into."',
    },
    {
      issue: 'Client fixates on one competitor\'s feature they want to copy',
      tackle: 'Features are answers to problems. The question is whether the same problem exists for their users. AJ&Smart\'s approach: extract the principle, not the execution. Copying the feature copies the answer without understanding the question.',
      say: '"Let\'s ask what problem that feature is solving. If that same problem exists for your audience, it\'s absolutely relevant — but we\'d design our version around your users, not theirs. What draws you to it — is it the function, or the feeling it creates?"',
    },
    {
      issue: 'Client questions your research methodology ("you only spoke to 8 people")',
      tackle: 'Separate qualitative insight from statistical validation. Qualitative research finds the \'why\' — the behaviour patterns, the mental models, the friction points. Metrics validate the \'how much\'. Both matter; they do different jobs. Never apologise for good qualitative research.',
      say: '"Qualitative research isn\'t designed to count — it\'s designed to understand. Eight users in depth tells us why people behave the way they do. Once we\'ve designed the solution around that insight, the metrics tell us whether we got it right. These two things work together, not against each other."',
    },
  ],
  '03': [
    {
      issue: 'Client says wireframes look unfinished and wants to see the "real design"',
      tackle: 'Balsamiq and Viget\'s core wireframe principle: introduce the medium before you show the work. Clients who don\'t understand wireframes reject them on aesthetics, not structure. A 30-second framing before you open the file changes everything.',
      say: '"Before I open this — wireframes are blueprints, not interiors. We\'re agreeing on how the rooms connect and how people move through them before we decorate. If we skip this and go straight to visual design, we risk spending weeks on screens we then have to restructure. This step is what protects that investment."',
    },
    {
      issue: 'Client immediately gives visual feedback on wireframes ("make this button bigger")',
      tackle: 'Mike Monteiro principle: don\'t say yes immediately. The reasoning behind a decision is the most important part of the presentation. If you change things based on preference without explaining the principle, you teach the client that everything is negotiable.',
      say: '"Good question — let me explain why it\'s this size. [Explain the hierarchy logic.] If after understanding that you still feel it should change, I\'ll explore it. But I want to make sure we\'re changing for the right reason, not just preference."',
    },
    {
      issue: 'Client wants to add pages or features mid-sitemap review',
      tackle: 'Paul Boag\'s scope discipline: anchor to the brief they signed off. New additions aren\'t bad ideas — they\'re phase 2 ideas. Protecting scope protects the client from a bloated product they can\'t maintain and a launch date that keeps moving.',
      say: '"I\'m writing that down — it\'s a good idea. It\'s also outside what we agreed in the brief, which means it carries timeline and cost implications. Let\'s note it as Phase 2 and evaluate it properly after launch. For now, let\'s protect the Phase 1 scope so we actually get there."',
    },
    {
      issue: 'Stakeholders disagree on the user flow logic',
      tackle: 'Google Ventures\' design sprint approach: frame every flow decision around the user\'s goal, not internal workflow preferences. User-centric framing is the only neutral ground when stakeholder opinions conflict.',
      say: '"Let me run both through the same filter: the user is trying to [goal]. Which of these paths gets them there in fewer decisions with less confusion? That\'s the one we build. Internal workflow is secondary — we can accommodate that in the back end."',
    },
    {
      issue: 'A new stakeholder joins who wasn\'t in discovery or research',
      tackle: 'Never sacrifice the existing client\'s time for a late-arrival brief. Give a sharp 90-second context summary and move on. Signal that the process is deliberate and sequential — it builds confidence in the work.',
      say: '"Welcome — let me get you orientated in 60 seconds. We\'ve completed discovery and research. The brief is signed off and the research is done. Today we\'re approving the site structure before visual design begins. I\'ll send you the full brief after this call."',
    },
    {
      issue: 'Client insists on keeping their existing navigation structure despite evidence it fails users',
      tackle: 'Never argue familiarity vs. best practice on abstract terms. Show the user cost of the current flow live. Walk through it step by step. Drop-off data is more persuasive than any design principle.',
      say: '"Let me show you exactly what a user experiences right now. [Walk through current flow.] This is where they drop off — this specific step. The new structure removes this decision point entirely. We\'re not changing it for aesthetic reasons — we\'re changing it because the data shows it\'s costing you [outcome]."',
    },
  ],
  '04': [
    {
      issue: '"I don\'t like it" — vague gut-reaction rejection with no specifics',
      tackle: 'Toptal and Secret Stache principle: separate emotion from specifics with a targeted probe. Vague rejection is almost always discomfort with one specific element. Your job is to find it — not defend against the overall feeling.',
      say: '"I want to get to the right place. Can we find the specific source of that feeling — is it the colour, the type, the layout, or the tone? Sometimes one thing pulls the whole perception off. Point me to the element that feels most wrong and we can work from there."',
    },
    {
      issue: 'Client wants to copy a design element from a well-known brand',
      tackle: 'Extract the principle, not the execution. Copying the execution tells users "we\'re like them." Extracting the principle — the trust it builds, the clarity it creates — lets you deliver the feeling in a way that\'s distinctly theirs.',
      say: '"What I\'m hearing is that you like what that element communicates — the [trust / clarity / energy]. Let\'s bring that quality into this design in a way that\'s distinctly yours. If we copy the execution, we tell users we\'re derivative. If we own the principle, we tell them we\'re better."',
    },
    {
      issue: 'Client wants to change the colour palette at this stage',
      tackle: 'Karen Haller\'s colour psychology approach: anchor the palette to emotional function, not aesthetic preference. Show what the current palette communicates for the user, then show what the proposed alternative communicates. The client\'s choice becomes strategic, not decorative.',
      say: '"The palette we built communicates [trust / energy / authority] — here\'s the psychology behind each choice. If we shift to [alternative], here\'s what that signals instead. Both are valid — the question is which emotional impression we want to make on your user in the first three seconds."',
    },
    {
      issue: 'Multiple stakeholders give conflicting visual feedback',
      tackle: 'Don\'t resolve the conflict in the meeting. Mike Monteiro: your job is to design for the user, not to manage internal politics. Take the conflict away, map both views against user research, and return with a recommendation that\'s data-backed.',
      say: '"I\'m hearing genuinely different directions and I don\'t want to rush a decision on this. Let me take both away, map them against the user research from Phase 2, and come back with a recommendation. Who is the decision-maker if the views stay split?"',
    },
    {
      issue: 'Client loses confidence mid-review and wants to revisit the brief',
      tackle: 'This is a trust signal, not a design problem. Paul Boag\'s anchor technique: trace every visual decision back to an agreed point in the process. The design is evidence of a chain of decisions they made — not a surprise.',
      say: '"Let me walk you back through the chain. [Open the brief.] In discovery, we agreed [X]. In research, we found [Y]. This screen is a direct translation of both of those decisions. We\'re not making aesthetic choices — every element here is strategy made visible."',
    },
    {
      issue: 'Client presents the design to internal stakeholders who weren\'t in the process',
      tackle: 'New eyes without context will always question everything. Prepare the client for this. Give them the language to defend the work — or offer to be in that call yourself.',
      say: '"When you share this internally, the feedback you\'ll get from people who haven\'t been in the process will be very different. They\'ll react to aesthetics without the strategic context. Do you want me to join that call so I can walk them through the thinking? Or I can give you a one-page brief you can share before they see the screens."',
    },
  ],
  '05': [
    {
      issue: 'Client finds new issues in every revision round with no end in sight',
      tackle: 'Mike Monteiro / Mule Design: revision rounds must have limits and they must be contractual. At the start of every review call, name the round number. After the agreed limit, every change is a scope item. This isn\'t punitive — it creates focus and protects the quality of the work.',
      say: '"Before we go through the screens — we\'re in revision round [number]. After today, any changes outside what we agree in this session are scope additions, not revisions. I want to make sure we use this time to close the remaining gaps completely."',
    },
    {
      issue: '"While you\'re at it…" — new features added mid-review',
      tackle: 'Never say yes in the moment. Filestage principle: new scope added silently leads to scope creep that erodes margin and trust. Document it, name it as scope, and process it separately. This protects both sides.',
      say: '"I\'m noting that down — it\'s a good idea. It\'s also new scope, not a revision, so I\'ll assess what it takes and we\'ll discuss it separately. It won\'t hold up today\'s approval — let\'s close what\'s in front of us first."',
    },
    {
      issue: 'Client says revisions don\'t reflect what they asked for',
      tackle: 'Reference your written notes from the previous session immediately. If feedback was verbal-only, this is the moment to introduce written confirmation going forward. Never be defensive — trace the translation gap together.',
      say: '"Let me pull up exactly what I was working from. [Reference notes.] This is the feedback I acted on. If there\'s a gap between this and what you meant, I want to understand where the translation broke down — because that\'s the thing I need to fix, not the design."',
    },
    {
      issue: 'Client wants to reopen an already approved decision',
      tackle: 'Paul Boag principle: reopening approvals without a new business reason erodes the whole project structure. Acknowledge the concern, ask what changed, and route it through a clear decision: is this driven by new information, or new preference?',
      say: '"We agreed on this in [session]. I can absolutely reopen it — but I want to make sure we\'re doing it for the right reason. Has something changed in the business that makes this direction wrong? Or is this a new perspective on the same brief? The answer determines whether it\'s a revision or a scope change."',
    },
    {
      issue: 'Client gives vague directional feedback ("it needs more energy / more punch")',
      tackle: 'Vague feedback needs a reference anchor before you can act on it. Ask for a visual reference — one image tells you more than ten minutes of adjectives.',
      say: '"\'Energy\' means something different to every designer. Can you point me to a site, an ad, even a film or photo that has the feeling you\'re describing? One visual reference will cut through any amount of description. I\'d rather get it right the first time than interpret and iterate."',
    },
    {
      issue: 'Client hesitates to give final sign-off but can\'t say why',
      tackle: 'Hesitation at sign-off is almost always one specific unresolved concern. Find it. Simplestate principle: create a deadline and a decision point. Open-ended "almost there" loops are the most expensive part of a design project.',
      say: '"I want you to feel completely confident before we move to handoff. What\'s the one thing — if it were resolved — that would make you comfortable signing off today? Let\'s identify it and close it in this call."',
    },
  ],
  '06': [
    {
      issue: 'Developer says a design element can\'t be built as-is',
      tackle: 'Don\'t take sides. Your job is to preserve the user experience within the technical constraint — not to win a design argument or abandon the work. Ask what the element is doing for the user, then find a technically equivalent solution.',
      say: '"Let\'s step back from the element itself and ask what job it\'s doing for the user. If we can achieve that same outcome with a different implementation, that\'s the right call. I\'ll work directly with you to find the equivalent. The user experience is what we\'re protecting, not the specific execution."',
    },
    {
      issue: 'Client wants to keep tweaking after handoff begins',
      tackle: 'At handoff, every change shifts from a Figma edit (minutes) to a developer rebuild (days). Frame this as a cost of time, not a refusal. Mike Monteiro principle: closing the design phase is an act of professional responsibility — it lets the build happen properly.',
      say: '"Anything changed after handoff gets rebuilt in code, not adjusted in Figma. That shifts the cost from hours to days and moves the launch date. If there are changes to make, right now is the last moment to make them cleanly. After handoff, they go to Phase 2."',
    },
    {
      issue: 'Client panics before launch and wants to delay',
      tackle: 'Pre-launch panic is almost always about the unknown, not the product. IDEO approach: replace anxiety with evidence. A visible launch checklist turns "what if we\'ve missed something" into "here is exactly what\'s done and what remains."',
      say: '"Let\'s go through the launch checklist together — right now. [Open the checklist.] I want you to see exactly what\'s complete and what\'s remaining. In my experience, the anxiety usually comes from not being able to see the full picture. Once you can see it, it changes completely."',
    },
    {
      issue: 'Client asks for design changes after formal sign-off',
      tackle: 'Never absorb post-sign-off changes silently. Doing it once sets a precedent that erodes every boundary you\'ve set. Acknowledge it warmly, document it, and process it as a change request. This protects both the client\'s budget and your time.',
      say: '"I can absolutely look at that. Because we\'ve passed formal sign-off, I\'ll put together a quick change request first — so we\'re both clear on the scope and the timeline impact before I proceed. That way there are no surprises for either of us."',
    },
    {
      issue: 'Client is nervous the launch won\'t land well with their audience',
      tackle: 'Debbie Millman\'s principle: remind them of the journey. Nervousness before a launch is a sign they care — but the antidote is evidence, not reassurance. Walk them back through the chain from brief to research to design to testing.',
      say: '"I want you to feel confident about this — and you should be. Let me show you the chain. We started with [problem]. Research confirmed [insight]. The design solves it in [specific way]. Every decision in this product is backed by what we learned about your user. This isn\'t a guess — it\'s evidence."',
    },
    {
      issue: 'Client delays giving final launch approval with no clear reason',
      tackle: 'Open-ended approvals create open-ended projects. Give the delay a concrete deadline with a real consequence tied to the launch date. Paul Boag principle: a business reason for the deadline makes it a shared problem, not a designer demand.',
      say: '"I need your sign-off by [date] to keep the launch timeline on track. After that point, any delay shifts the go-live date by [X days]. Is there something specific holding you back that I can help resolve before then? I\'d rather solve the underlying concern now than miss the window."',
    },
  ],
}

// ─── Smart Questionnaire Data ────────────────────────────────────────────────

const PROJECT_STATUSES = [
  { id: 'not-started',  label: 'Not Started',  color: '#6B7280' },
  { id: 'in-progress',  label: 'In Progress',  color: '#2563EB' },
  { id: 'in-review',    label: 'In Review',    color: '#D97706' },
  { id: 'on-hold',      label: 'On Hold',      color: '#DC2626' },
  { id: 'completed',    label: 'Completed',    color: '#16A34A' },
]

const PROJECT_TYPES = [
  { id: 'branding',          label: 'Branding',                 desc: 'Logo, identity, brand system' },
  { id: 'graphic',           label: 'Graphic Works',            desc: 'Print, social, marketing collateral' },
  { id: 'product',           label: 'Product Design',           desc: 'UI/UX for digital products & apps' },
  { id: 'website',           label: 'Website Design',           desc: 'New website design from scratch' },
  { id: 'animation',         label: 'Animation',                desc: 'Motion graphics, explainer, transitions' },
  { id: 'revamp',            label: 'Revamp',                   desc: 'Redesign of existing website or brand' },
  { id: 'full-website',      label: 'Full Detailed Website',    desc: 'End-to-end multi-page web project' },
]

const WEBSITE_TYPES = [
  { id: 'ecommerce',  label: 'E-Commerce',        desc: 'Online store & product sales' },
  { id: 'saas',       label: 'SaaS / App',         desc: 'Software product or platform' },
  { id: 'service',    label: 'Service Business',   desc: 'Agency, consultant, freelancer' },
  { id: 'portfolio',  label: 'Portfolio',           desc: 'Creative, designer, developer' },
  { id: 'corporate',  label: 'Corporate / Brand',  desc: 'Company presence & positioning' },
  { id: 'nonprofit',  label: 'Nonprofit / NGO',    desc: 'Mission-driven organisation' },
  { id: 'local',      label: 'Local Business',     desc: 'Restaurant, clinic, salon, retail' },
  { id: 'marketplace',label: 'Marketplace',        desc: 'Multi-vendor or platform' },
]

const BUSINESS_CATEGORIES = [
  { id: 'tech',           label: 'Technology & Software' },
  { id: 'healthcare',     label: 'Healthcare & Medical' },
  { id: 'finance',        label: 'Finance & Fintech' },
  { id: 'legal',          label: 'Legal & Professional Services' },
  { id: 'education',      label: 'Education & Training' },
  { id: 'retail',         label: 'Retail & Consumer Goods' },
  { id: 'food',           label: 'Food, Beverage & Hospitality' },
  { id: 'realestate',     label: 'Real Estate & Property' },
  { id: 'creative',       label: 'Creative & Media' },
  { id: 'fitness',        label: 'Health, Fitness & Wellness' },
  { id: 'manufacturing',  label: 'Manufacturing & Industrial' },
  { id: 'travel',         label: 'Travel & Tourism' },
  { id: 'nonprofit-cat',  label: 'Nonprofit & Social Impact' },
  { id: 'other',          label: 'Other' },
]

const TARGET_AUDIENCES = [
  { id: 'b2b-enterprise', label: 'B2B Enterprise',      desc: '500+ employees, long sales cycle' },
  { id: 'b2b-smb',        label: 'B2B SMB / Startup',   desc: 'Small-to-mid businesses' },
  { id: 'b2c-mass',       label: 'B2C Mass Market',     desc: 'General consumers, broad reach' },
  { id: 'b2c-premium',    label: 'B2C Premium',         desc: 'High-value consumer segment' },
  { id: 'developer',      label: 'Developer / Technical',desc: 'Engineers, CTOs, technical buyers' },
  { id: 'mixed',          label: 'Mixed Audiences',     desc: 'Multiple distinct segments' },
]

const PRIMARY_GOALS = [
  { id: 'lead-gen',     label: 'Lead Generation',      desc: 'Capture qualified enquiries' },
  { id: 'direct-sales', label: 'Direct Sales',          desc: 'Self-serve purchase or checkout' },
  { id: 'demo-booking', label: 'Demo / Booking',        desc: 'Schedule calls or appointments' },
  { id: 'saas-signup',  label: 'Free Trial / Sign-up',  desc: 'Activate product users' },
  { id: 'brand',        label: 'Brand Awareness',       desc: 'Build credibility & recognition' },
  { id: 'content',      label: 'Content / Community',   desc: 'Educate, inform, build audience' },
]

const BUSINESS_STAGES = [
  { id: 'prelaunch',   label: 'Pre-Launch',   desc: 'Building from scratch' },
  { id: 'startup',     label: 'Early Stage',  desc: 'Live, finding product-market fit' },
  { id: 'growth',      label: 'Growth Stage', desc: 'Scaling what works' },
  { id: 'established', label: 'Established',  desc: 'Rebrand or major redesign' },
]

interface QSection { section: string; icon: string; description: string; questions: string[] }
interface IntakeParams { websiteType: string; businessCategory: string; targetAudience: string; primaryGoal: string[]; businessStage: string }

function generateQuestionnaire(p: IntakeParams): QSection[] {
  const { websiteType, businessCategory, targetAudience, primaryGoal, businessStage } = p
  const sections: QSection[] = []
  const isEnterprise = targetAudience === 'b2b-enterprise'
  const isB2B = targetAudience === 'b2b-enterprise' || targetAudience === 'b2b-smb'
  const isPremium = targetAudience === 'b2c-premium'
  const isDev = targetAudience === 'developer'

  // ── Website-type specific sections ─────────────────────────────────────────

  if (websiteType === 'ecommerce') {
    sections.push({
      section: 'Business & Product Model',
      icon: '01',
      description: 'Understand the commercial structure before designing the purchase experience.',
      questions: [
        'What is your primary product category and realistic inventory size at launch vs. 12 months out?',
        'Is stock your own, dropshipped, made-to-order, or a hybrid — and how does this affect the delivery promise shown to customers?',
        `What is your average order value${isB2B ? ' and minimum order quantity for B2B buyers' : ''} — and how does this influence the trust investment needed before a customer converts?`,
        'What does your current post-purchase experience look like — order confirmation, fulfilment updates, returns flow, and repeat-purchase trigger?',
      ],
    })
    sections.push({
      section: 'Catalogue & Product Discovery',
      icon: '02',
      description: 'How customers find and evaluate products determines the entire navigation and filtering architecture.',
      questions: [
        'How will customers primarily discover products — search, category browse, curated collections, or AI recommendations?',
        'Do any products require size guides, comparison tables, or configuration tools (customise before add-to-cart)?',
        'What product imagery exists — professional photography, lifestyle shots, UGC — or does this need to be created?',
        'Are there products requiring special UX treatment — pre-orders, subscriptions, bundles, limited drops, or age-gated items?',
      ],
    })
    sections.push({
      section: 'Checkout & Conversion',
      icon: '03',
      description: 'Every checkout friction point is a revenue leak. These answers directly shape the conversion flow.',
      questions: [
        `What payment methods are non-negotiable at launch: Stripe, PayPal, Apple Pay, BNPL (Klarna/Afterpay)${isB2B ? ', B2B invoice or net terms' : ''}?`,
        'Do you have checkout abandonment data — what do you know about where customers currently drop off in the funnel?',
        `What is your stance on guest checkout vs. account creation — and what does your ${isPremium ? 'premium' : 'target'} customer expect from the experience?`,
        'What trust signals does your audience require before purchasing: verified reviews, certifications, money-back guarantee, or secure payment badge?',
      ],
    })
    sections.push({
      section: 'Pricing, Promotions & Returns',
      icon: '04',
      description: 'Pricing communication and returns policy are primary conversion and retention levers.',
      questions: [
        'Do you run regular promotions, flash sales, or seasonal discounts — and how aggressive should pricing urgency feel in the design?',
        `Do you offer ${isB2B ? 'trade, wholesale, or tiered B2B pricing alongside retail?' : 'loyalty rewards, referral credits, or tiered discount schemes?'}`,
        'What is your returns and refund policy — how prominently should it appear in the pre-purchase journey to reduce anxiety?',
        `How do you position on price relative to competitors — ${isPremium ? 'premium and exclusive' : 'competitive or value'} — and how should this be communicated visually without stating it outright?`,
      ],
    })
    sections.push({
      section: 'Brand, Voice & Visual Direction',
      icon: '05',
      description: 'The brand layer transforms a functional store into a destination customers remember and return to.',
      questions: [
        'Who are your top 3 direct competitors and what design pattern do they use that you want to definitively beat or avoid?',
        'What one thing about your brand would your best customers defend to a friend who suggests a competitor?',
        `How do you want the store to feel — ${isPremium ? 'luxury editorial, exclusive, minimal' : 'energetic, warm, functional, direct, or playful'}?`,
        'What brands outside your category do you reference as visual inspiration — and specifically what quality about them?',
      ],
    })
    sections.push({
      section: 'Technical Platform & Integrations',
      icon: '06',
      description: 'Platform constraints define design possibilities. These answers shape the technical scope.',
      questions: [
        'What platform are you building on or migrating to (Shopify, WooCommerce, Magento, custom) — and are there legacy tech constraints?',
        'What marketing tools must connect: email (Klaviyo?), analytics (GA4?), loyalty apps, review platforms (Yotpo, Trustpilot?)?',
        'Do you need a blog, lookbook, or editorial section to support SEO and brand storytelling alongside the product catalogue?',
        'What are your accessibility and performance requirements — specific WCAG compliance levels or Core Web Vitals benchmarks?',
      ],
    })
  }

  else if (websiteType === 'saas') {
    sections.push({
      section: 'Product & Core Value',
      icon: '01',
      description: 'The website must communicate the product\'s value before the product can demonstrate it.',
      questions: [
        'What is the single most painful problem your product eliminates — not what it does technically, but what frustration it ends permanently?',
        `Who experiences the pain most acutely${isEnterprise ? ', and who signs the enterprise purchase order' : ''} — is the user and the buyer the same person?`,
        'What does the journey from first sign-up to "aha moment" look like — and how long does it take the average user?',
        'What feature do power users never stop talking about — and what feature do churned users say they never understood?',
      ],
    })
    sections.push({
      section: 'Pricing Architecture',
      icon: '02',
      description: 'Pricing page design directly determines revenue mix and CAC. Every structural decision here has financial consequences.',
      questions: [
        `How many pricing tiers at launch, and what is the primary differentiator — seats, features, usage limits, or ${isEnterprise ? 'enterprise SLA and support tier' : 'support level'}?`,
        'Do you offer monthly/annual billing — what annual discount do you offer and how do you want the toggle designed to maximise annual conversions?',
        `Is there an ${isEnterprise ? 'enterprise' : 'custom'} tier requiring a sales conversation — and what specifically triggers a prospect to go that route vs. self-serve?`,
        'What is the most common reason a qualified prospect does not upgrade from free to a paid plan?',
      ],
    })
    sections.push({
      section: 'Acquisition & Conversion Funnel',
      icon: '03',
      description: 'The website is the top of the funnel. These answers define what happens at every stage.',
      questions: [
        `What is your primary acquisition channel — ${isDev ? 'developer communities, GitHub, HackerNews,' : 'organic SEO, paid ads, Product Hunt,'} outbound, or partner programmes?`,
        'What does your current sign-up or demo request funnel look like — and where is the primary measured drop-off?',
        `Do you offer a free trial — how long, what features are included, and what happens at the end: hard paywall, ${primaryGoal.includes('demo-booking') ? 'booked demo, ' : ''}or soft upgrade nudge?`,
        'What specific objections stop a qualified prospect from signing up on their first visit to the site?',
      ],
    })
    sections.push({
      section: 'Social Proof & Credibility',
      icon: '04',
      description: 'In SaaS, trust signals are the difference between a trial started and a tab closed.',
      questions: [
        `How many ${isEnterprise ? 'enterprise accounts' : 'active customers'} do you have — and which logos or names carry the most weight for your ICP?`,
        'What specific, quantifiable outcomes have your best customers achieved — not "improved efficiency" but "cut X by 60%" or "saved $Y per month"?',
        'Do you have G2/Capterra reviews, press coverage, analyst recognition, or awards that should be surfaced as credibility signals?',
        'Who are your direct competitors and how do prospects compare you on third-party review sites or during the pricing conversation?',
      ],
    })
    sections.push({
      section: 'Product Experience & Documentation',
      icon: '05',
      description: 'The marketing site sets expectations the product must meet. Misalignment here drives early churn.',
      questions: [
        'What does in-product onboarding look like — and should the marketing site set journey expectations before the user even signs up?',
        'Do you have a documentation site, knowledge base, or help centre that needs to connect to the marketing site?',
        `Is there a community, forum${isDev ? ', or open-source component' : ''} that should be positioned as a product differentiator on the site?`,
        'Do you need a public roadmap, changelog, or status page — and how does transparency factor into your brand positioning?',
      ],
    })
    sections.push({
      section: 'Integrations & Technical Credibility',
      icon: '06',
      description: 'Technical buyers evaluate integrations and security compliance before they evaluate features.',
      questions: [
        `What integrations are table stakes for your ICP ${isEnterprise ? '(Salesforce, HubSpot, SSO/SAML, Workday)' : '(Slack, Zapier, HubSpot, Stripe, Google Workspace)'}?`,
        `${isDev ? 'Do developers need API documentation, code examples, SDKs, and a sandbox environment accessible from the site?' : 'Do technical stakeholders need to review API documentation or integration guides before signing off?'}`,
        'What security certifications or compliance frameworks do prospects specifically ask about — SOC 2, GDPR, HIPAA, ISO 27001?',
        `What infrastructure claims build credibility for your audience — ${isEnterprise ? '99.99% uptime SLA, EU data residency, dedicated instances' : '99.9% uptime SLA, built on AWS, automatic backups'}?`,
      ],
    })
  }

  else if (websiteType === 'service') {
    sections.push({
      section: 'Services & Engagement Model',
      icon: '01',
      description: 'Clarity on services and pricing model determines the entire information architecture.',
      questions: [
        'How many distinct services do you offer — and does each require its own conversion path, or do all roads lead to the same CTA?',
        'Do you sell fixed-scope packages with stated pricing, or custom proposals — and which do clients prefer and why?',
        `What is the average deal size and typical sales cycle from first contact to signed engagement${isEnterprise ? ' — including procurement and legal review time' : ''}?`,
        'Are there services you want to retire or deprioritise on the new site that the existing site currently promotes?',
      ],
    })
    sections.push({
      section: 'Client Acquisition Journey',
      icon: '02',
      description: 'The website must mirror and accelerate the actual sales journey — not describe an idealised one.',
      questions: [
        'Walk through your current client acquisition process from first contact to signed contract — every step, tool, and touchpoint.',
        'Where in the funnel do you lose the most qualified prospects — and what reason do they give, or not give, when they disappear?',
        `What does a first engagement look like — ${primaryGoal.includes('demo-booking') ? 'booked discovery call, ' : ''}paid audit, free consultation, or straight to proposal?`,
        'How many touches typically happen between a prospect first finding you and converting to a paying client?',
      ],
    })
    sections.push({
      section: 'Portfolio & Proof of Work',
      icon: '03',
      description: 'In service businesses, proof of past outcomes is the primary conversion mechanism.',
      questions: [
        'How many case studies can you show publicly — and can you include client names, company size, and specific measurable outcomes?',
        'What industries dominate your current portfolio — is that intentional positioning or accidental, and should the new site reflect or redirect it?',
        'What do your best testimonials say, and who are they from — does the job title and company name add real credibility for your target client?',
        'Do you have before/after comparisons, documented ROI metrics, or outcome numbers that no competitor in your space can credibly claim?',
      ],
    })
    sections.push({
      section: 'Pricing Strategy & Risk Reduction',
      icon: '04',
      description: 'Pricing display decisions are a positioning signal as much as a conversion tool.',
      questions: [
        `Do you display pricing publicly or gate it behind a conversation — what is the strategic trade-off for your ${isEnterprise ? 'enterprise' : 'target'} client type?`,
        'What is your most common pricing objection and how do you currently handle it in the sales conversation?',
        'Do you offer any risk reducers — money-back guarantee, paid pilot, free audit, or a fixed-price starter package?',
        'What competitor pricing strategies undermine your positioning — and how do you want the site to counter or reframe this?',
      ],
    })
    sections.push({
      section: 'Process & Differentiation',
      icon: '05',
      description: 'Process is often the truest differentiator. If communicated correctly, it prequalifies and converts.',
      questions: [
        'How do you describe your process to a new client — what makes the experience of working with you distinct from every other option?',
        'What do clients most consistently say about working with you — and is any of that currently visible on your site?',
        'Do you use proprietary methodologies, frameworks, or named tools that add intellectual credibility and can be stated publicly?',
        'What is your most notable client result you can share with specifics — and what made it achievable beyond your team\'s skill?',
      ],
    })
    sections.push({
      section: 'Lead Qualification & Intake',
      icon: '06',
      description: 'The intake mechanism should filter as effectively as it attracts.',
      questions: [
        'What information do you need from a prospect before agreeing to a discovery call — budget range, project type, timeline, decision authority?',
        'What type of client are you actively trying to avoid — by budget, industry, project type, or mindset?',
        'Should the website explicitly self-select clients — making it clear who you are and are not the right fit for?',
        `What does a qualified lead look like in specific terms — ${isEnterprise ? 'company revenue, procurement process, ' : 'budget range, '}and decision-making authority?`,
      ],
    })
  }

  else if (websiteType === 'portfolio') {
    sections.push({
      section: 'Positioning & Niche',
      icon: '01',
      description: 'A portfolio without a point of view is a gallery. The point of view is what gets you hired.',
      questions: [
        'What is your primary discipline — do you want to be known for one specific thing, or intentionally showcase range?',
        'What type of projects do you most want to be hired for — and how does this differ from your existing body of work?',
        'What is the profile of your ideal client — industry, company size, budget range, and decision-maker role?',
        'How do you want a prospect to feel within 10 seconds of landing — and what does your current site fail to communicate?',
      ],
    })
    sections.push({
      section: 'Work & Case Studies',
      icon: '02',
      description: 'How work is presented — not just what is shown — determines whether prospects reach out.',
      questions: [
        'For your top 3 projects: what was the specific problem, what was your unique contribution, and what measurable outcome resulted?',
        'Do you have full rights to show all featured work publicly — are there NDAs, usage restrictions, or client approvals needed?',
        'What context does each project lack that only a written case study narrative would provide?',
        'Should projects show process and thinking, or finished output only — and what does your target client actually care more about?',
      ],
    })
    sections.push({
      section: 'Identity & Point of View',
      icon: '03',
      description: 'The strongest portfolios have a visible creative philosophy. What is yours?',
      questions: [
        'How do you want to be positioned relative to other practitioners in your specific market — what makes you the better choice?',
        'What do your best clients consistently say about working with you beyond the quality of the output?',
        'Do you have a defined design philosophy or creative point of view — should it be stated explicitly or implied through the work?',
        'What single project best represents the work you most want more of — and what specifically makes it the ideal project for you?',
      ],
    })
    sections.push({
      section: 'Contact & Conversion',
      icon: '04',
      description: 'The contact mechanism signals your positioning as much as it captures leads.',
      questions: [
        `What is the primary conversion action — email enquiry, ${primaryGoal.includes('demo-booking') ? 'calendar booking, ' : ''}or a vetted application form with qualifying questions?`,
        'Are you selective about who you work with — should the contact mechanism actively filter and qualify, or be entirely frictionless?',
        'What information do you need from a prospect before agreeing to a first conversation?',
        'What is your current primary source of quality leads — and how should the portfolio actively reinforce or expand it?',
      ],
    })
  }

  else if (websiteType === 'corporate') {
    sections.push({
      section: 'Company & Strategic Positioning',
      icon: '01',
      description: 'Corporate sites serve multiple audiences simultaneously. Priority must be set before design begins.',
      questions: [
        'What is the company\'s single most important strategic message for the next 3 years?',
        'Who are the primary stakeholder audiences — customers, investors, media, talent, partners — ranked by priority?',
        'How does leadership describe the competitive position — disruptor, established leader, category specialist, or ecosystem platform?',
        'What is the most credible, specific proof of market leadership the company can publicly claim?',
      ],
    })
    sections.push({
      section: 'Brand Architecture',
      icon: '02',
      description: 'Brand hierarchy decisions made here cascade directly into navigation, design, and messaging.',
      questions: [
        'Does the company have sub-brands, product lines, or divisions needing separate identity treatment or navigation paths?',
        'How important is consistency between the website and other brand touchpoints — investor decks, sales collateral, social media?',
        'Is the brand undergoing a repositioning — what is the old market perception vs. the new intended positioning?',
        'Who owns brand and content approval — how many stakeholders are involved in sign-off and what is the process?',
      ],
    })
    sections.push({
      section: 'Multi-Audience Messaging',
      icon: '03',
      description: 'Multiple audiences require navigation architecture that serves each without creating friction for the others.',
      questions: [
        'For each stakeholder audience, what is the primary action they must take and the primary information they need to trust the company?',
        'What is the messaging hierarchy — which audience takes priority when their needs directly conflict on the same page?',
        'What does an ideal talent candidate look like — and what would make them choose this company over a well-funded competitor?',
        'What story are you trying to get covered in media — and who is the spokesperson or proof point that makes it credible?',
      ],
    })
    sections.push({
      section: 'Content & Editorial Operations',
      icon: '04',
      description: 'Corporate sites fail when content operations are not planned into the design from day one.',
      questions: [
        'What content types need to live on this site — press releases, thought leadership, annual reports, events, investor relations?',
        'Who owns content creation and publishing — internal communications team, external agency, or a hybrid model?',
        'How frequently will the site be updated and who has publishing access — and does this requirement define the CMS choice?',
        'What existing content is performing well for SEO or PR that must be preserved through the redesign?',
      ],
    })
  }

  else if (websiteType === 'nonprofit') {
    sections.push({
      section: 'Mission & Impact Communication',
      icon: '01',
      description: 'Nonprofit websites fail when they speak to staff, not to the visitor. These questions address that directly.',
      questions: [
        'What is the organisation\'s mission in one sentence — not the tagline, but the specific change you are creating in the world?',
        'Who are the two primary audiences this site must serve simultaneously — beneficiaries and donors — and where do their needs conflict?',
        'What is the most compelling, specific proof of impact you can show — named numbers, stories, named before/after outcomes?',
        'What misconceptions do people have about your organisation or cause that the website must actively and credibly address?',
      ],
    })
    sections.push({
      section: 'Fundraising & Donation Experience',
      icon: '02',
      description: 'The donation flow is the primary conversion. Every extra click or friction point costs real revenue.',
      questions: [
        'What is the primary fundraising mechanism — one-time donations, recurring monthly giving, specific campaigns, or major donor cultivation?',
        'What is the average donation value and the profile of your most valuable recurring donor?',
        'What donation platform or payment processor are you using (Stripe, Donorbox, Give Lively) — and what are its customisation limitations?',
        'What currently prevents people from completing a donation on your existing site — friction, lack of trust, or emotional clarity?',
      ],
    })
    sections.push({
      section: 'Programs & Community',
      icon: '03',
      description: 'Program pages often go years without updates. These questions prevent that from happening again.',
      questions: [
        'What programs need dedicated sections and what depth of information does each require — overview or full programme detail?',
        'Do you need volunteer registration, event sign-up, or community member portals?',
        'Is there a membership structure or tiered giving programme that needs to be reflected in the navigation architecture?',
        'Who are your corporate sponsors or institutional partners — how prominently should they feature without appearing transactional?',
      ],
    })
    sections.push({
      section: 'Trust, Governance & Transparency',
      icon: '04',
      description: 'For mission-driven organisations, transparency is the primary trust signal — not brand.',
      questions: [
        'What financial transparency information do you publish — annual reports, Form 990, impact reports, charity ratings (Charity Navigator)?',
        'Do you have endorsements from recognised public figures, media coverage, or sector awards that build donor credibility?',
        'What regulatory registrations — charity number, jurisdiction, registration body — must be visible for legal compliance and donor trust?',
        'What is your rating on Charity Navigator or equivalent — and does this currently affect donor confidence or conversion rates?',
      ],
    })
  }

  else if (websiteType === 'local') {
    sections.push({
      section: 'Business & Location',
      icon: '01',
      description: 'Local businesses live or die on findability and first impression. These questions establish both.',
      questions: [
        'Do you have a single location or multiple — if multiple, does each need its own page and dedicated local SEO treatment?',
        'What are your core services or products, and which generates the highest margin or drives the most volume?',
        'What is your peak trading period and quiet season — and how should the website accommodate promotional or seasonal changes?',
        'Are there geographic boundaries, service radius limits, or delivery zones that customers need to clearly understand?',
      ],
    })
    sections.push({
      section: 'Booking, Operations & Contact',
      icon: '02',
      description: 'For local businesses, the path from landing to booked appointment must be completely frictionless.',
      questions: [
        'What is the primary action — reservation, click-to-call, walk-in, delivery order, or enquiry form — and in what priority order?',
        'What booking or reservation system are you using (OpenTable, Fresha, Calendly, custom) — and does it embed without technical friction?',
        'What hours do you operate and are there seasonal, holiday, or event-based variations that need dynamic display?',
        'What operational information causes the most repeated customer enquiries — parking, payment methods, accessibility, wait times?',
      ],
    })
    sections.push({
      section: 'Local Reputation & Reviews',
      icon: '03',
      description: 'For local businesses, review signals outperform any copywriting on the page.',
      questions: [
        'What is your current Google review rating and total volume — and should this be surfaced prominently as a primary trust signal?',
        'What do your best reviews say consistently — is there a theme that defines your local reputation and can be designed around?',
        'What do your negative reviews highlight — is there a recurring UX or communication problem the website could prevent upstream?',
        'Are you listed on relevant local directories, delivery platforms, or industry-specific platforms that should be linked or featured?',
      ],
    })
    sections.push({
      section: 'Menu, Services & Pricing',
      icon: '04',
      description: 'The most visited pages for local businesses are menus and pricing. Design them for decision, not decoration.',
      questions: [
        'Do you display pricing publicly or prefer enquiry-based — and what is the trade-off for your specific local market?',
        `${businessCategory === 'food' ? 'Does your menu change seasonally — who updates it, how often, and is allergen information a legal requirement in your jurisdiction?' : 'How are services structured — fixed packages, hourly rates, or custom quotes — and which format converts better in your local market?'}`,
        'What special offers, loyalty schemes, or local partnerships drive repeat visits that should be actively promoted?',
        'What do first-time customers most need to know before their first visit that they cannot currently find on your site?',
      ],
    })
  }

  else if (websiteType === 'marketplace') {
    sections.push({
      section: 'Marketplace Model & Liquidity',
      icon: '01',
      description: 'Marketplace design must serve two sides. These questions identify which side to prioritise.',
      questions: [
        'What is your marketplace model — B2B, B2C, or P2P — and which side of the marketplace is currently harder to acquire?',
        'What is the take rate or commission structure — and does this need to be communicated transparently to sellers or suppliers at sign-up?',
        'How do you solve the cold-start problem — what is the minimum viable supply needed before the platform delivers value to buyers?',
        'What is the primary trust failure that prevents a first transaction from happening on your current or competitor platforms?',
      ],
    })
    sections.push({
      section: 'Buyer & Seller Experience',
      icon: '02',
      description: 'Two-sided UX requires two distinct but architecturally connected journeys.',
      questions: [
        'What are the top 3 jobs a buyer comes to the platform to accomplish, ranked by frequency?',
        'What does a seller or supplier need to see on the platform before they commit to listing — what are their primary hesitations?',
        'How do you handle disputes, refunds, and quality control — and how much of that process needs to be visible to build trust?',
        'What search, filtering, and comparison capabilities are table stakes for your specific category of marketplace?',
      ],
    })
    sections.push({
      section: 'Trust, Safety & Verification',
      icon: '03',
      description: 'Marketplace trust is built through visible signals, not promises. Design these deliberately.',
      questions: [
        'What verification or vetting process do sellers or providers go through — and how is this communicated to buyers on each listing?',
        'What review and rating system will you use — and how do you prevent gaming or fake reviews at the early liquidity stage?',
        'What are the primary trust signals your category of marketplace relies on — insurance, background checks, escrow, money-back guarantee?',
        'What is your dispute resolution process — and how does this need to be reflected in the design of transaction flows?',
      ],
    })
    sections.push({
      section: 'Growth & Monetisation Architecture',
      icon: '04',
      description: 'Monetisation models shape the UX architecture. Define this before design begins.',
      questions: [
        'What is the primary monetisation model at launch — transaction fee, subscription, freemium listing, or premium placement?',
        'Are there premium placements, featured listings, or advertising formats that need to be built into the design system from the start?',
        'What is the retention mechanism — how do you bring buyers and sellers back without a recurring marketing push?',
        'What network effects are you designing for — and how does the website communicate the growing value of the network to new users?',
      ],
    })
  }

  // ── Brand & Voice (added for most types) ─────────────────────────────────
  if (!['portfolio', 'nonprofit', 'local'].includes(websiteType)) {
    sections.push({
      section: 'Brand Voice & Visual Identity',
      icon: String(sections.length + 1).padStart(2, '0'),
      description: 'Brand decisions made here filter every design choice made for the rest of the project.',
      questions: [
        `Who are your top 3 direct competitors and what does their website do that you want to definitively beat${websiteType === 'saas' ? ' or clearly position against' : ''}?`,
        `What one thing about your brand would your best ${websiteType === 'ecommerce' ? 'customers' : websiteType === 'saas' ? 'users' : 'clients'} defend to someone recommending a competitor?`,
        `How do you want the website to feel — choose up to 3: editorial, bold, warm, minimal, clinical, authoritative, playful, luxury, direct${isEnterprise ? ', or enterprise-grade' : ''}?`,
        'What brands outside your category do you reference as visual or experience inspiration — and specifically what quality do you want to borrow?',
      ],
    })
  }

  // ── Industry-specific compliance / context sections ───────────────────────
  if (businessCategory === 'healthcare') {
    sections.push({
      section: 'Healthcare Compliance & Trust',
      icon: String(sections.length + 1).padStart(2, '0'),
      description: 'Healthcare content carries regulatory and ethical obligations that affect every page design decision.',
      questions: [
        'Does any content require medical disclaimers, regulatory pre-approval, or legal review before it can be published?',
        'Is patient data involved — appointment booking, telehealth portals, or records access — that triggers HIPAA, GDPR, or equivalent compliance?',
        'What certifications, accreditations, or regulatory body memberships must be visible for patient or practitioner trust?',
        'Are there specific services that cannot be advertised in certain ways per medical advertising standards in your jurisdiction?',
      ],
    })
  }

  if (businessCategory === 'finance') {
    sections.push({
      section: 'Financial Regulatory & Compliance',
      icon: String(sections.length + 1).padStart(2, '0'),
      description: 'Financial services websites carry explicit regulatory obligations that shape every content and design decision.',
      questions: [
        'What regulatory disclaimers are required for your jurisdiction — FCA, SEC, ASIC, MAS — and exactly where must they appear on each page?',
        'Do you offer regulated financial advice or products that require specific presentation standards and mandatory risk warnings?',
        'Do you need to structurally separate regulated from unregulated products or services in the navigation and information architecture?',
        'How do you handle data privacy and security disclosure for financial data — PSD2, open banking, GDPR, or jurisdiction-equivalent?',
      ],
    })
  }

  if (businessCategory === 'legal') {
    sections.push({
      section: 'Legal Advertising & Professional Compliance',
      icon: String(sections.length + 1).padStart(2, '0'),
      description: 'Legal websites must balance marketing effectiveness with bar association and advertising obligations.',
      questions: [
        'What attorney advertising restrictions apply in your jurisdiction — and which bar associations govern your practice area?',
        'How do you handle the attorney-client relationship distinction online — general legal information vs. specific legal advice?',
        'Do different practice areas require separate landing pages for SEO performance and dedicated conversion paths?',
        'What qualifies as a viable case lead for your practice — and how should the intake form filter by case type and jurisdiction?',
      ],
    })
  }

  if (businessCategory === 'education') {
    sections.push({
      section: 'Education Platform & Enrolment',
      icon: String(sections.length + 1).padStart(2, '0'),
      description: 'Education sites must simultaneously serve learner motivation and institutional enrolment goals.',
      questions: [
        'Who is the primary decision-maker — the learner themselves, a parent, or an employer or institution funding the training?',
        'What accreditations or industry certifications do your courses lead to — and how prominently does this drive enrolment decisions?',
        'Do you need student portals, LMS integration (Canvas, Moodle, Teachable), or a searchable and filterable course catalogue?',
        'What is the application or enrolment process — and how complex is the intake form relative to your target student\'s patience level?',
      ],
    })
  }

  if (businessCategory === 'realestate') {
    sections.push({
      section: 'Real Estate Platform & Property Search',
      icon: String(sections.length + 1).padStart(2, '0'),
      description: 'Property search UX is the make-or-break feature for real estate websites.',
      questions: [
        'Do you need MLS or IDX property search integration — and is the focus residential, commercial, luxury, or investment properties?',
        'How do buyer and seller journeys differ on your site — should they be separated in navigation or served from shared pages?',
        'Should agents have individual profile pages — and how does individual agent branding balance against the brokerage brand?',
        'What is the primary lead capture mechanism — property enquiry, free valuation request, or agent consultation booking?',
      ],
    })
  }

  if (businessCategory === 'food') {
    sections.push({
      section: 'Food & Hospitality Operations',
      icon: String(sections.length + 1).padStart(2, '0'),
      description: 'Food and hospitality websites bridge the digital experience with the physical operation.',
      questions: [
        'Is allergen information display a legal requirement in your jurisdiction — and how granular must the disclosure be per menu item?',
        'What reservation, ordering, or delivery integration do you use — and has any past integration caused measurable customer friction?',
        'How is the menu structured — fixed, rotating, seasonal — and who has access to update it post-launch without a developer?',
        'Do you sell gift cards, host private events, or take venue buyout bookings that need separate UX treatment?',
      ],
    })
  }

  // ── Business stage section ────────────────────────────────────────────────
  const stageMap: Record<string, { section: string; description: string; questions: string[] }> = {
    prelaunch: {
      section: 'Pre-Launch Strategy',
      description: 'A pre-launch site has different jobs than a live site. Define what success looks like before day one.',
      questions: [
        'What does the pre-launch phase specifically need to achieve — waitlist building, investor credibility, press pickup, or early adopter community?',
        'Do you have a confirmed launch date — and what content will be production-ready vs. aspirational at go-live?',
        'Should the site present as "coming soon" with anticipation-building, or act fully operational from day one?',
        'Who are your first 100 customers or users — and how should the site speak directly to them vs. the eventual broader audience?',
      ],
    },
    startup: {
      section: 'Early-Stage Priorities',
      description: 'Early-stage sites must do more with less. These questions define what the site must achieve that a sales call currently does.',
      questions: [
        'What is working in your current acquisition that the website must explicitly support — not accidentally disrupt or replace?',
        'What assumptions about your customer are you still actively testing — should the site avoid commitments you might reverse in 3 months?',
        'What is the biggest credibility gap for a prospect who has never heard of you — what do they need to see to trust you enough to engage?',
        'What does the website need to accomplish that currently requires a founder or a sales call to achieve?',
      ],
    },
    growth: {
      section: 'Growth-Stage Optimisation',
      description: 'Growth-stage redesigns must protect what already works while expanding what does not.',
      questions: [
        'What customer segment is growing fastest — and does the current site serve them optimally, or is it still built for who you used to be?',
        'What content is performing best — by SEO, conversion, or referral — and must be preserved or improved in the redesign?',
        'Are there international markets to serve — and does the site need multiple languages, currencies, or regional compliance?',
        'Which internal teams use the website as a sales or marketing tool — and what do they need that the current site fails to deliver?',
      ],
    },
    established: {
      section: 'Rebrand & Redesign Scope',
      description: 'Established brand redesigns carry the highest risk of losing existing value. These questions protect against that.',
      questions: [
        'What is the primary trigger for this redesign — underperformance, new positioning, competitive pressure, or leadership change?',
        'What existing content, SEO authority, or URL structure must be preserved through the migration — what is the 301 redirect plan?',
        'What do your best existing customers or users love about the current site that must absolutely survive the redesign?',
        'How will the rebrand be communicated to existing customers — and does the website play a role in that transition?',
      ],
    },
  }

  if (businessStage && stageMap[businessStage]) {
    const s = stageMap[businessStage]
    sections.push({
      section: s.section,
      icon: String(sections.length + 1).padStart(2, '0'),
      description: s.description,
      questions: s.questions,
    })
  }

  // Re-number all icons
  return sections.map((s, i) => ({ ...s, icon: String(i + 1).padStart(2, '0') }))
}

const SPEED = [
  {
    num: '01',
    category: 'Comprehension',
    title: 'Quicker Understanding',
    desc: 'Absorb a brief, client context, and market position in under 20 minutes — before a single question is asked.',
    steps: [
      'Paste the brief + any client notes into Claude',
      'Ask it to extract: goals, audience, constraints, success metrics, and red flags',
      'Run a Perplexity search on the client\'s industry for live competitive context',
      'Record your own 2-minute voice note summarising what you heard — Otter transcribes it',
    ],
    prompt: `You are a senior brand strategist and UX director reviewing a new client brief.

<context>
Fast, accurate brief comprehension prevents misaligned design. The goal is to extract the real brief beneath the stated brief — identifying what the client actually needs, not just what they said.
</context>

<input>
BRIEF: [paste full brief or meeting notes here]
</input>

<instructions>
1. Summarise the project in one sentence (what + for whom + why it matters)
2. List 5 key design constraints (budget signals, timeline, technical, brand, audience)
3. Identify 3 unstated assumptions the client is making
4. Flag 2 potential misalignments between stated goals and likely user needs
5. Write 5 sharp discovery questions to validate your assumptions on the next call
</instructions>

<output_format>
## One-Line Brief
[sentence]

## Key Constraints
1. [constraint]
...

## Unstated Assumptions
1. [assumption]
...

## Risk Flags
1. [flag]
...

## Discovery Questions for Next Call
1. [question]
...
</output_format>

<constraints>
- Be direct and specific — no generic observations
- Flag anything that suggests scope creep risk
- Questions must be answerable in under 30 seconds each
</constraints>`,
    tools: ['Claude', 'Perplexity AI', 'Otter.ai'],
  },
  {
    num: '02',
    category: 'Ideation',
    title: 'First AI Iteration Prompt',
    desc: 'Get a strong first creative direction — visual language, tone, and structure — before opening Figma.',
    steps: [
      'Run the prompt below with brief + audience details',
      'Generate 3 mood board directions in Midjourney using the keywords Claude returns',
      'Use Figma AI to generate a first component set from the chosen direction',
      'Pick one direction only — don\'t show all three to the client',
    ],
    prompt: `You are a creative director with deep expertise in brand identity and digital UI design.

<context>
The first creative direction sets the entire project trajectory. Getting it right fast — before any pixels are placed — prevents wasted design cycles and keeps the client aligned from day one.
</context>

<input>
BRAND_NAME: [name]
INDUSTRY: [industry]
TARGET_AUDIENCE: [audience profile]
TONE_KEYWORDS: [3–5 words the client used to describe their brand]
COMPETITOR_URLS: [2–3 competitor sites]
PRIMARY_GOAL: [what the website must make visitors do]
</input>

<instructions>
1. Propose 3 distinct visual directions — each with a different strategic rationale
2. For each direction give: a name, a 2-sentence rationale, 5 Midjourney prompt keywords, typography direction (serif/sans + weight feel), and primary colour mood
3. Recommend one direction with a clear reason tied to the business goal
4. List 3 things to deliberately avoid based on competitor analysis
</instructions>

<output_format>
## Direction 01: [Name]
**Rationale:** [2 sentences]
**Midjourney keywords:** [5 terms]
**Typography:** [description]
**Colour mood:** [description]

[repeat for 02, 03]

## Recommended Direction: [Name]
**Reason:** [1–2 sentences tied to business goal]

## Avoid
1. [thing]
...
</output_format>

<constraints>
- Each direction must be genuinely distinct — not variations of the same idea
- Midjourney keywords must be visual and specific, not abstract brand words
- Recommendation must be defensible, not just safe
</constraints>`,
    tools: ['Claude', 'Midjourney', 'Figma AI'],
  },
  {
    num: '03',
    category: 'Prototyping',
    title: 'Quicker AI Prototype',
    desc: 'Go from a text brief to a structured, clickable prototype in under 60 minutes using AI-first tooling.',
    steps: [
      'Paste brief into Relume — get full sitemap + wireframe skeleton in under 5 minutes',
      'Export Relume wireframes directly to Figma',
      'Use Galileo AI or Figma AI to generate UI from the wireframe structure',
      'Run the prompt below to generate the homepage copy scaffold in Claude',
      'Connect frames with Figma prototype links — present same day',
    ],
    prompt: `You are a senior UX architect and conversion-focused copywriter.

<context>
A working prototype needs structure and copy simultaneously — blank lorem ipsum wireframes fail to convey the real experience. This prompt generates the content scaffold that makes a fast prototype feel real.
</context>

<input>
WEBSITE_TYPE: [e.g. SaaS, service business, e-commerce]
BRAND_NAME: [name]
PRIMARY_AUDIENCE: [who they are + their top pain]
USP: [what makes this different in one sentence]
PRIMARY_CTA: [the single action we want visitors to take]
PAGES_NEEDED: [list of pages in sitemap]
</input>

<instructions>
1. For each page: write a H1, H2 subheadline, and 1-paragraph body copy
2. Write 3 CTA button label variations for the primary conversion action
3. Generate a 5-item navigation structure
4. Write a sticky header value proposition (under 8 words)
5. List the 5 sections the homepage needs, in order, with a one-line purpose for each
</instructions>

<output_format>
## Navigation
[items]

## Sticky Header Value Prop
[8 words max]

## Homepage Sections
1. [Section name] — [purpose]
...

## Page Copy
### [Page Name]
**H1:** [heading]
**H2:** [subheadline]
**Body:** [paragraph]
**CTA Options:** [3 variants]

[repeat per page]
</output_format>

<constraints>
- H1s must be outcome-focused, not feature-focused
- CTAs must be specific actions, not "Learn More" or "Get Started"
- Copy must read naturally, not like AI output — revise before use
</constraints>`,
    tools: ['Relume', 'Figma AI', 'Galileo AI', 'Claude'],
  },
  {
    num: '04',
    category: 'Documentation',
    title: 'Clear MoM Structure',
    desc: 'Every call ends with a written record of decisions made, actions assigned, and open questions closed — preventing scope creep from the first meeting.',
    steps: [
      'Record every call via Otter.ai — never rely on memory',
      'Paste transcript into Claude immediately after the call',
      'Run the prompt below — get a structured MoM in 90 seconds',
      'Send to client within 30 minutes while context is fresh',
      'Store in Notion with a linked decision log',
    ],
    prompt: `You are a senior project manager and design lead writing minutes for a client call.

<context>
Poorly documented calls cause scope creep, misaligned revisions, and payment disputes. A clean MoM sent within 30 minutes of a call creates a paper trail, demonstrates professionalism, and locks in decisions before they get revised by memory.
</context>

<input>
TRANSCRIPT: [paste Otter.ai transcript or raw meeting notes here]
PROJECT_NAME: [name]
CALL_DATE: [date]
ATTENDEES: [names and roles]
</input>

<instructions>
1. Extract every decision made — phrase as "It was decided that…"
2. List every action item with owner and deadline
3. List all open questions that still need an answer, with a proposed resolution date
4. Note any scope changes discussed — even informally
5. Write a 3-sentence call summary for the top of the document
6. Flag any risk items in a separate section
</instructions>

<output_format>
# Minutes of Meeting — [Project Name]
**Date:** [date] | **Attendees:** [names]

## Summary
[3 sentences]

## Decisions Made
- It was decided that [decision] — Owner: [name]
...

## Action Items
| Action | Owner | Due |
|--------|-------|-----|
| [action] | [name] | [date] |

## Open Questions
- [question] — Resolution by: [date]
...

## Scope Notes
- [any scope additions, removals, or changes discussed]

## Risk Flags
- [anything that could cause problems later]
</output_format>

<constraints>
- Every decision must have an owner
- Every action item must have a deadline
- Scope notes must be flagged even if informally discussed — protect yourself
- Send within 30 minutes of the call ending
</constraints>`,
    tools: ['Claude', 'Otter.ai', 'Notion AI'],
  },
  {
    num: '05',
    category: 'Closing',
    title: 'Decision Clarity on the Call',
    desc: 'Never leave a call without a committed decision. Structure the conversation so the client chooses — you don\'t chase.',
    steps: [
      'Present options, not open questions — "Option A or Option B?" not "What do you think?"',
      'Anchor every decision to the brief — "This aligns with your goal of [X]"',
      'Use the 3-option rule: always present 3 choices (clients rarely pick extremes)',
      'Verbalise the decision before ending — "So we\'re going with Option B, correct?"',
      'Follow up with MoM within 30 minutes confirming the decision in writing',
    ],
    prompt: `You are an expert design consultant who coaches creative leads on client communication and closing calls decisively.

<context>
Indecision on calls costs time, creates revision loops, and signals a lack of creative leadership. The goal is to structure every presentation so a decision is inevitable — not optional.
</context>

<input>
CALL_PURPOSE: [e.g. design direction review, copy approval, final sign-off]
OPTIONS_ON_TABLE: [describe the 2–3 options you're presenting]
CLIENT_GOAL: [their stated primary business goal]
STICKING_POINT: [what the client is hesitating on, if known]
</input>

<instructions>
1. Write a 3-sentence opening that frames the decision as strategic, not aesthetic
2. Write a comparison summary for each option: what it prioritises, what it trades off, and which client goal it best serves
3. Write a recommended choice with a 2-sentence rationale using the client's own language
4. Write 3 closing phrases to use when confirming the decision verbally
5. Write responses for the 2 most likely objections or requests to "see more options"
6. Write a 1-sentence email subject line for the follow-up MoM
</instructions>

<output_format>
## Opening Frame
[3 sentences]

## Option Comparison
### [Option A Name]
**Prioritises:** [what]
**Trades off:** [what]
**Best for:** [which goal]

[repeat per option]

## Recommended Choice
[option] — [2-sentence rationale using client's language]

## Closing Phrases
1. "[phrase]"
2. "[phrase]"
3. "[phrase]"

## Objection Responses
**"Can we see more options?"**
[response]

**"I need to think about it"**
[response]

## Follow-up Email Subject
[subject line]
</output_format>

<constraints>
- Rationale must reference the client's own stated goals — not your design preferences
- Closing phrases must be confident, not apologetic
- Objection responses must re-anchor to the brief, not offer more work
</constraints>`,
    tools: ['Claude', 'Loom', 'Notion AI'],
  },
]

// ─── Subcomponents ─────────────────────────────────────────────────────────────

function CheckRow({ text, idx }: { text: string; idx: number }) {
  const [done, setDone] = useState(false)
  return (
    <div className={`check-row ${done ? 'done' : ''}`} onClick={() => setDone(!done)}>
      <span className="check-num">{String(idx + 1).padStart(2, '0')}</span>
      <div className={`check-box ${done ? 'ticked' : ''}`}>{done ? '✓' : ''}</div>
      <span className="check-text">{text}</span>
    </div>
  )
}

function PromptCard({ prompt, idx }: { prompt: { tool: string; title: string; prompt: string }; idx: number }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(prompt.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{ borderBottom: '1px solid var(--rule)', cursor: 'pointer' }}
      onClick={() => setExpanded(!expanded)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', color: 'var(--dim)', minWidth: '20px', flexShrink: 0 }}>
          {String(idx + 1).padStart(2, '0')}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{
              width: 28, height: 28, background: '#fff',
              border: '1.5px solid var(--rule)',
              borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, overflow: 'hidden',
            }}>
              <ToolLogo name={prompt.tool} fallback="✦" />
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', padding: '4px 10px',
              background: 'var(--blue-dim)', border: '1.5px solid var(--blue)',
              fontFamily: 'var(--mono)', fontSize: '0.82rem', fontWeight: 700,
              letterSpacing: '0.1em', color: 'var(--blue)', textTransform: 'uppercase',
            }}>
              {prompt.tool}
            </div>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{prompt.title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button className="btn-ghost" onClick={handleCopy} style={{ padding: '5px 12px', fontSize: '0.85rem' }}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <span style={{ color: 'var(--dim)', fontSize: '1.2rem', transition: 'transform 0.2s', display: 'inline-block', transform: expanded ? 'rotate(180deg)' : 'none' }}>
            ↓
          </span>
        </div>
      </div>

      {expanded && (
        <div style={{ padding: '0 0 20px 36px' }}>
          <pre style={{
            background: 'var(--surface)', border: '1px solid var(--rule)', padding: '20px',
            fontFamily: 'var(--mono)', fontSize: '0.92rem', lineHeight: 1.8,
            color: 'var(--text)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0,
          }}>
            {prompt.prompt}
          </pre>
          <div style={{ marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className="btn-blue" onClick={handleCopy} style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
              {copied ? '✓ Copied to clipboard' : 'Copy prompt'}
            </button>
            <span style={{ fontSize: '0.92rem', color: 'var(--mid)' }}>
              Replace <span style={{ fontFamily: 'var(--mono)', color: 'var(--blue)' }}>[BRACKETS]</span> with your project details
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false)
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%',
          transform: 'translateX(-50%)', background: 'var(--text)', color: 'var(--bg)',
          padding: '12px 16px', fontSize: '0.88rem', lineHeight: 1.65,
          width: '320px', zIndex: 200, pointerEvents: 'none',
          fontFamily: 'var(--font)', fontWeight: 400, letterSpacing: '0',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        }}>
          {text}
          <div style={{
            position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
            borderTop: '6px solid var(--text)',
          }} />
        </div>
      )}
    </div>
  )
}

function StageContent({ stage }: { stage: typeof STAGES[0] }) {
  const [tab, setTab] = useState<'checklist' | 'ai' | 'tips' | 'present'>('checklist')
  const presentation = STAGE_PRESENTATIONS[stage.code] ?? []

  return (
    <div className="anim" style={{ padding: '0 0 48px' }}>
      <div style={{ padding: '40px 0 32px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span className="label">{stage.code}</span>
              <span className="label" style={{ color: 'var(--dim)' }}>·</span>
              <span className="label">{stage.tag}</span>
              <span className="label" style={{ color: 'var(--blue)', marginLeft: '8px', background: 'var(--blue-dim)', padding: '2px 8px' }}>
                {stage.time}
              </span>
              <Tooltip text={stage.description}>
                <span style={{
                  width: '20px', height: '20px', borderRadius: '50%', border: '1.5px solid var(--rule)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 700,
                  color: 'var(--mid)', cursor: 'help', marginLeft: '4px',
                  transition: 'all 0.15s', userSelect: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)'; e.currentTarget.style.background = 'var(--blue-dim)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.color = 'var(--mid)'; e.currentTarget.style.background = 'transparent' }}>
                  i
                </span>
              </Tooltip>
            </div>
            <h1 style={{
              fontFamily: 'var(--font)', fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
              color: 'var(--text)', textTransform: 'uppercase', marginBottom: '16px',
            }}>
              {stage.full}
            </h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
            <div>
              <div className="label" style={{ marginBottom: '8px' }}>Key Output</div>
              <div className="output-badge">{stage.output}</div>
            </div>
            {stage.figmaUrl ? (
              <a
                href={stage.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px',
                  background: '#1E1E1E', color: '#fff',
                  fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  textDecoration: 'none', transition: 'opacity 0.15s',
                }}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.8')}
                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
              >
                <svg width="14" height="14" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#1ABCFE"/>
                  <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83"/>
                  <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#FF7262"/>
                  <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#F24E1E"/>
                  <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#A259FF"/>
                </svg>
                View Figma Template
              </a>
            ) : (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px',
                border: '1.5px dashed var(--rule)',
                fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--dim)',
              }}>
                <svg width="14" height="14" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.3 }}>
                  <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="currentColor"/>
                  <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="currentColor"/>
                  <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="currentColor"/>
                  <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="currentColor"/>
                  <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="currentColor"/>
                </svg>
                Figma Template — Coming Soon
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ctab-strip" style={{ marginTop: '24px' }}>
        <button className={`ctab ${tab === 'checklist' ? 'active' : ''}`} onClick={() => setTab('checklist')}>
          Checklist <span className="count">{stage.checklist.length}</span>
        </button>
        <button className={`ctab ${tab === 'ai' ? 'active' : ''}`} onClick={() => setTab('ai')}>
          AI Tools & Prompts <span className="count">{stage.aiTools.length + stage.prompts.length}</span>
        </button>
        <button className={`ctab ${tab === 'tips' ? 'active' : ''}`} onClick={() => setTab('tips')}>
          Pro Tips <span className="count">{stage.tips.length}</span>
        </button>
        <button className={`ctab ${tab === 'present' ? 'active' : ''}`} onClick={() => setTab('present')}>
          Present to Client <span className="count">{presentation.length}</span>
        </button>
      </div>

      {tab === 'checklist' && (
        <div style={{ maxWidth: '720px' }}>
          <div className="label" style={{ marginBottom: '16px' }}>Click items to mark complete</div>
          {stage.checklist.map((item, i) => <CheckRow key={i} text={item} idx={i} />)}
        </div>
      )}

      {tab === 'ai' && (
        <div style={{ maxWidth: '860px' }}>
          <div className="label" style={{ marginBottom: '16px' }}>Recommended for this phase</div>
          {stage.aiTools.map((tool, i) => (
            <div key={i} className="tool-card">
              <div className="tool-icon"><ToolLogo name={tool.name} fallback={tool.icon} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="tool-name">{tool.name}</div>
                  <Tooltip text={tool.use}>
                    <span style={{
                      width: '18px', height: '18px', borderRadius: '50%', border: '1.5px solid var(--rule)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 700,
                      color: 'var(--mid)', cursor: 'help', flexShrink: 0, transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)'; e.currentTarget.style.background = 'var(--blue-dim)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.color = 'var(--mid)'; e.currentTarget.style.background = 'transparent' }}>
                      i
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--rule)', marginTop: '8px', paddingTop: '28px' }}>
            <div className="label" style={{ marginBottom: '4px' }}>Ready-to-use prompts — click to expand, copy to use</div>
            <div style={{ fontSize: '1.12rem', color: 'var(--mid)', marginBottom: '20px' }}>
              Replace all <span style={{ fontFamily: 'var(--mono)', color: 'var(--blue)', background: 'var(--blue-dim)', padding: '1px 5px' }}>[BRACKETS]</span> with your project details before sending.
            </div>
            {stage.prompts.map((p, i) => <PromptCard key={i} prompt={p} idx={i} />)}
          </div>
        </div>
      )}

      {tab === 'tips' && (
        <div style={{ maxWidth: '720px' }}>
          <div className="label" style={{ marginBottom: '16px' }}>Senior designer wisdom</div>
          {stage.tips.map((tip, i) => (
            <div key={i} className="tip-row">
              <span className="tip-idx">{String(i + 1).padStart(2, '0')}</span>
              <p className="tip-text">{tip}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'present' && (
        <div style={{ maxWidth: '760px' }}>
          <div className="label" style={{ marginBottom: '4px' }}>Handle it live — {stage.full}</div>
          <p style={{ fontSize: '0.88rem', color: 'var(--mid)', marginBottom: '28px', lineHeight: 1.65 }}>
            Real issues that come up when presenting this phase. One issue per card — how to tackle it and exactly what to say.
          </p>
          {presentation.map((item, i) => (
            <div key={i} style={{ paddingBottom: '28px', marginBottom: '28px', borderBottom: '1px solid var(--rule)' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--dim)', minWidth: '24px', paddingTop: '2px', flexShrink: 0 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.4 }}>{item.issue}</div>
              </div>
              <div style={{ paddingLeft: '38px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '10px 14px', background: 'var(--surface)', borderLeft: '3px solid var(--rule)' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>How to tackle</span>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.65 }}>{item.tackle}</p>
                </div>
                <div style={{ padding: '10px 14px', background: 'var(--blue-dim)', borderLeft: '3px solid var(--blue)' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--blue)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>What to say</span>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.75, fontStyle: 'italic' }}>{item.say}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface EditableQSection {
  section: string; icon: string; description: string
  questions: { id: string; text: string }[]
}

function QuestionnaireView({ projectId, projectName }: { projectId: string; projectName: string }) {
  const [step, setStep] = useState<'intake' | 'generated'>('intake')
  const [params, setParams] = useState<IntakeParams>({
    websiteType: '', businessCategory: '', targetAudience: '', primaryGoal: [], businessStage: '',
  })
  const [editableSections, setEditableSections] = useState<EditableQSection[]>([])
  const [editMode, setEditMode] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [shareToken, setShareToken] = useState<string | null>(null)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [loadingResponses, setLoadingResponses] = useState(false)
  const [responsesLoaded, setResponsesLoaded] = useState(false)

  useEffect(() => {
    if (step !== 'generated') return
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    const els = document.querySelectorAll('.q-section[id]')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [step, editableSections])

  const isReady = !!(params.websiteType && params.businessCategory && params.targetAudience && params.primaryGoal.length > 0 && params.businessStage)

  const handleGenerate = () => {
    const generated = generateQuestionnaire(params)
    const ts = Date.now()
    setEditableSections(generated.map((sec, si) => ({
      ...sec,
      questions: sec.questions.map((q, qi) => ({ id: `q-${ts}-${si}-${qi}`, text: q })),
    })))
    setAnswers({})
    setShareToken(null)
    setResponsesLoaded(false)
    setStep('generated')
  }

  // ── Edit mode helpers ──────────────────────────────────────────────────────
  const updateQuestion = (si: number, qi: number, text: string) =>
    setEditableSections(prev => prev.map((s, i) => i !== si ? s : {
      ...s, questions: s.questions.map((q, j) => j !== qi ? q : { ...q, text }),
    }))

  const deleteQuestion = (si: number, qi: number) =>
    setEditableSections(prev => prev.map((s, i) => i !== si ? s : {
      ...s, questions: s.questions.filter((_, j) => j !== qi),
    }))

  const addQuestion = (si: number) =>
    setEditableSections(prev => prev.map((s, i) => i !== si ? s : {
      ...s, questions: [...s.questions, { id: `q-custom-${Date.now()}`, text: '' }],
    }))

  // ── Share ──────────────────────────────────────────────────────────────────
  const handleShare = async () => {
    setSharing(true)
    const res = await fetch('/api/questionnaires', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, projectName, sections: editableSections }),
    })
    const data = await res.json()
    setShareToken(data.token)
    setSharing(false)
  }

  const shareUrl = shareToken ? `${window.location.origin}/q/${shareToken}` : ''

  const copyShareLink = () => {
    if (!shareUrl) return
    navigator.clipboard.writeText(shareUrl)
    setShareLinkCopied(true)
    setTimeout(() => setShareLinkCopied(false), 2000)
  }

  const loadClientResponses = async () => {
    if (!shareToken) return
    setLoadingResponses(true)
    const res = await fetch(`/api/questionnaires/${shareToken}`)
    const data = await res.json()
    if (data.answers && Object.keys(data.answers).length > 0) {
      setAnswers(data.answers)
      setResponsesLoaded(true)
    }
    setLoadingResponses(false)
  }

  const handleCopy = useCallback(() => {
    const typeLabel  = WEBSITE_TYPES.find(t => t.id === params.websiteType)?.label || ''
    const catLabel   = BUSINESS_CATEGORIES.find(c => c.id === params.businessCategory)?.label || ''
    const audLabel   = TARGET_AUDIENCES.find(a => a.id === params.targetAudience)?.label || ''
    const goalLabel  = params.primaryGoal.map(id => PRIMARY_GOALS.find(g => g.id === id)?.label || '').filter(Boolean).join(' + ')
    const stageLabel = BUSINESS_STAGES.find(s => s.id === params.businessStage)?.label || ''
    const header = `PROJECT QUESTIONNAIRE\n${typeLabel} · ${catLabel} · ${audLabel} · ${goalLabel} · ${stageLabel}\n${'─'.repeat(60)}\n\n`
    const body = editableSections.map(sec =>
      `${sec.icon}. ${sec.section.toUpperCase()}\n${sec.description}\n${'─'.repeat(40)}\n` +
      sec.questions.map((q, i) => `${i + 1}. ${q.text}\n   → ${answers[q.id] || ''}`).join('\n\n')
    ).join('\n\n\n')
    navigator.clipboard.writeText(header + body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [answers, editableSections, params])

  const selBtn = (id: string, active: boolean, onClick: () => void, label: string, desc?: string) => (
    <button key={id} onClick={onClick} style={{
      padding: desc ? '14px 16px' : '10px 16px',
      border: `1.5px solid ${active ? 'var(--blue)' : 'var(--rule)'}`,
      background: active ? 'var(--blue-dim)' : 'transparent',
      cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
    }}>
      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: active ? 'var(--blue)' : 'var(--text)', letterSpacing: '-0.01em' }}>{label}</div>
      {desc && <div style={{ fontSize: '0.78rem', color: active ? 'var(--blue)' : 'var(--mid)', marginTop: '3px' }}>{desc}</div>}
    </button>
  )

  // ── Step 1: Intake ──────────────────────────────────────────────────────────
  if (step === 'intake') {
    return (
      <div style={{ padding: '40px 0' }}>
        <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: '32px', marginBottom: '40px' }}>
          <div className="label" style={{ marginBottom: '12px' }}>Smart Client Questionnaire</div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Configure Your Project
          </h1>
          <p style={{ fontSize: '1.08rem', color: 'var(--mid)', maxWidth: '560px', lineHeight: 1.7 }}>
            Configure 5 parameters to generate a tailored, project-specific questionnaire.
          </p>
        </div>

        {/* 01 Website Type */}
        <div style={{ marginBottom: '40px' }}>
          <div className="label" style={{ marginBottom: '4px' }}>01 — Website Type</div>
          <p style={{ fontSize: '0.88rem', color: 'var(--mid)', marginBottom: '16px' }}>What kind of website is this project?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {WEBSITE_TYPES.map(t => selBtn(t.id, params.websiteType === t.id, () => setParams(p => ({ ...p, websiteType: t.id })), t.label, t.desc))}
          </div>
        </div>

        {/* 02 Business Category */}
        <div style={{ marginBottom: '40px' }}>
          <div className="label" style={{ marginBottom: '4px' }}>02 — Business Category</div>
          <p style={{ fontSize: '0.88rem', color: 'var(--mid)', marginBottom: '16px' }}>What industry or sector is the client in?</p>
          <select
            value={params.businessCategory}
            onChange={e => setParams(p => ({ ...p, businessCategory: e.target.value }))}
            style={{
              width: '100%', maxWidth: '480px', padding: '12px 16px',
              border: `1.5px solid ${params.businessCategory ? 'var(--blue)' : 'var(--rule)'}`,
              background: params.businessCategory ? 'var(--blue-dim)' : 'transparent',
              fontFamily: 'var(--font)', fontSize: '0.92rem',
              color: params.businessCategory ? 'var(--blue)' : 'var(--mid)',
              outline: 'none', cursor: 'pointer', appearance: 'none',
            }}
          >
            <option value="">Select business category…</option>
            {BUSINESS_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>

        {/* 03 Target Audience */}
        <div style={{ marginBottom: '40px' }}>
          <div className="label" style={{ marginBottom: '4px' }}>03 — Target Audience</div>
          <p style={{ fontSize: '0.88rem', color: 'var(--mid)', marginBottom: '16px' }}>Who is the primary audience this website must serve?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {TARGET_AUDIENCES.map(a => selBtn(a.id, params.targetAudience === a.id, () => setParams(p => ({ ...p, targetAudience: a.id })), a.label, a.desc))}
          </div>
        </div>

        {/* 04 Primary Goal */}
        <div style={{ marginBottom: '40px' }}>
          <div className="label" style={{ marginBottom: '4px' }}>04 — Primary Conversion Goal</div>
          <p style={{ fontSize: '0.88rem', color: 'var(--mid)', marginBottom: '16px' }}>What is the single most important action this website must make visitors take?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {PRIMARY_GOALS.map(g => selBtn(g.id, params.primaryGoal.includes(g.id), () => setParams(p => ({
              ...p,
              primaryGoal: p.primaryGoal.includes(g.id)
                ? p.primaryGoal.filter(id => id !== g.id)
                : [...p.primaryGoal, g.id],
            })), g.label, g.desc))}
          </div>
        </div>

        {/* 05 Business Stage */}
        <div style={{ marginBottom: '48px' }}>
          <div className="label" style={{ marginBottom: '4px' }}>05 — Business Stage</div>
          <p style={{ fontSize: '0.88rem', color: 'var(--mid)', marginBottom: '16px' }}>Where is this business in its lifecycle?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {BUSINESS_STAGES.map(s => selBtn(s.id, params.businessStage === s.id, () => setParams(p => ({ ...p, businessStage: s.id })), s.label, s.desc))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            className="btn-blue"
            onClick={handleGenerate}
            disabled={!isReady}
            style={{ opacity: isReady ? 1 : 0.35, cursor: isReady ? 'pointer' : 'not-allowed' }}
          >
            Generate Questionnaire →
          </button>
          {!isReady && (
            <span style={{ fontSize: '0.88rem', color: 'var(--mid)' }}>Complete all 5 fields to generate</span>
          )}
        </div>
      </div>
    )
  }

  // ── Step 2: Generated questionnaire ────────────────────────────────────────
  const typeLabel  = WEBSITE_TYPES.find(t => t.id === params.websiteType)?.label || ''
  const catLabel   = BUSINESS_CATEGORIES.find(c => c.id === params.businessCategory)?.label || ''
  const audLabel   = TARGET_AUDIENCES.find(a => a.id === params.targetAudience)?.label || ''
  const goalLabel  = params.primaryGoal.map(id => PRIMARY_GOALS.find(g => g.id === id)?.label || '').filter(Boolean).join(' + ')
  const stageLabel = BUSINESS_STAGES.find(s => s.id === params.businessStage)?.label || ''
  const totalQ = editableSections.reduce((n, s) => n + s.questions.length, 0)

  return (
    <div style={{ padding: '40px 0' }}>

      {/* ── Header ── */}
      <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: '28px', marginBottom: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="label" style={{ marginBottom: '12px' }}>{editableSections.length} Categories · {totalQ} Questions</div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '14px' }}>
              {typeLabel} / {catLabel}
            </h1>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[audLabel, goalLabel, stageLabel].map(tag => tag && (
                <span key={tag} style={{ padding: '3px 10px', background: 'var(--blue-dim)', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--blue)', textTransform: 'uppercase' }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0, flexWrap: 'wrap' }}>
            <button className="btn-ghost" onClick={() => setStep('intake')} style={{ fontSize: '0.78rem' }}>← Reconfigure</button>
            <button className={`btn-ghost ${editMode ? 'active' : ''}`} onClick={() => setEditMode(m => !m)}
              style={{ fontSize: '0.78rem', background: editMode ? 'var(--text)' : undefined, color: editMode ? 'var(--bg)' : undefined, borderColor: editMode ? 'var(--text)' : undefined }}>
              {editMode ? '✓ Done Editing' : '✎ Edit Questions'}
            </button>
            <button className="btn-ghost" onClick={handleCopy} style={{ fontSize: '0.78rem' }}>{copied ? '✓ Copied' : 'Copy All'}</button>
            <button className="btn-blue" onClick={handleShare} disabled={sharing}
              style={{ fontSize: '0.78rem', opacity: sharing ? 0.6 : 1 }}>
              {sharing ? 'Saving…' : shareToken ? '↑ Reshare' : '↑ Share with Client'}
            </button>
          </div>
        </div>

        {/* ── Share banner ── */}
        {shareToken && (
          <div style={{ marginTop: '20px', padding: '14px 18px', background: 'var(--blue-dim)', border: '1px solid var(--blue)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>Client Link</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--text)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{shareUrl}</span>
            <button className="btn-blue" onClick={copyShareLink} style={{ fontSize: '0.72rem', flexShrink: 0 }}>{shareLinkCopied ? '✓ Copied' : 'Copy Link'}</button>
            <button className="btn-ghost" onClick={loadClientResponses} disabled={loadingResponses} style={{ fontSize: '0.72rem', flexShrink: 0 }}>
              {loadingResponses ? 'Checking…' : responsesLoaded ? '✓ Responses Loaded' : '↓ Load Client Responses'}
            </button>
          </div>
        )}
      </div>

      {/* ── Sticky category nav ── */}
      <div style={{ position: 'sticky', top: '56px', zIndex: 10, background: 'var(--bg)', borderBottom: '1px solid var(--rule)', padding: '10px 0', display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
        {editableSections.map(sec => {
          const id = sec.section.toLowerCase().replace(/\s+/g, '-')
          const isActive = activeSection === id
          return (
            <button key={sec.section} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              style={{ padding: '4px 12px', border: `1.5px solid ${isActive ? 'var(--blue)' : 'var(--rule)'}`, background: isActive ? 'var(--blue-dim)' : 'transparent', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 700, color: isActive ? 'var(--blue)' : 'var(--mid)', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
              {sec.icon} {sec.section}
            </button>
          )
        })}
      </div>

      {/* ── Sections ── */}
      {editableSections.map((sec, si) => {
        const id = sec.section.toLowerCase().replace(/\s+/g, '-')
        return (
          <div key={sec.section} id={id} className="q-section">
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ minWidth: '52px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--blue)', display: 'block', lineHeight: 1 }}>{sec.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                  <div className="label">{sec.section}</div>
                  <Tooltip text={sec.description}>
                    <span style={{
                      width: '18px', height: '18px', borderRadius: '50%', border: '1.5px solid var(--rule)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--mono)', fontSize: '0.6rem', fontWeight: 700,
                      color: 'var(--mid)', cursor: 'help', flexShrink: 0, transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)'; e.currentTarget.style.background = 'var(--blue-dim)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.color = 'var(--mid)'; e.currentTarget.style.background = 'transparent' }}>
                      i
                    </span>
                  </Tooltip>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: editMode ? '14px' : '20px' }}>
                  {sec.questions.map((q, qi) => (
                    <div key={q.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        {editMode ? (
                          /* ── Edit mode: question text is editable ── */
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '12px', background: 'var(--surface)', border: '1px solid var(--rule)' }}>
                            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--dim)', paddingTop: '10px', minWidth: '24px' }}>{String(qi + 1).padStart(2, '0')}</span>
                            <input
                              value={q.text}
                              onChange={e => updateQuestion(si, qi, e.target.value)}
                              placeholder="Enter question…"
                              style={{ flex: 1, padding: '8px 10px', border: '1px solid var(--rule)', background: 'var(--bg)', fontFamily: 'var(--font)', fontSize: '0.92rem', color: 'var(--text)', outline: 'none', transition: 'border-color 0.15s' }}
                              onFocus={e => (e.target.style.borderColor = 'var(--blue)')}
                              onBlur={e => (e.target.style.borderColor = 'var(--rule)')}
                            />
                            <button onClick={() => deleteQuestion(si, qi)}
                              style={{ padding: '8px 10px', background: 'none', border: '1px solid var(--rule)', cursor: 'pointer', color: 'var(--dim)', fontSize: '0.9rem', flexShrink: 0, lineHeight: 1 }}
                              onMouseOver={e => (e.currentTarget.style.color = '#DC2626')}
                              onMouseOut={e => (e.currentTarget.style.color = 'var(--dim)')}>×</button>
                          </div>
                        ) : (
                          /* ── Answer mode: question is label, answer is textarea ── */
                          <>
                            <label className="q-label">{String(qi + 1).padStart(2, '0')} — {q.text}</label>
                            <textarea
                              className="q-input"
                              rows={2}
                              placeholder="Type client answer here…"
                              value={answers[q.id] || ''}
                              onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add question button in edit mode */}
                  {editMode && (
                    <button onClick={() => addQuestion(si)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', border: '1.5px dashed var(--rule)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--mid)', letterSpacing: '0.06em', transition: 'all 0.15s', textTransform: 'uppercase' }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)' }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.color = 'var(--mid)' }}>
                      + Add Question
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <div style={{ paddingTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button className="btn-blue" onClick={handleCopy}>{copied ? '✓ Copied' : 'Copy Full Questionnaire'}</button>
        <button className="btn-ghost" onClick={() => setStep('intake')}>← Reconfigure</button>
        <button className="btn-ghost" onClick={() => setAnswers({})}>Clear Answers</button>
      </div>
    </div>
  )
}

function SpeedCard({ item }: { item: typeof SPEED[0] }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(item.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div style={{ borderBottom: '1px solid var(--rule)' }}>
      {/* ── Card header ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', borderBottom: expanded ? '1px solid var(--rule)' : 'none' }}>
        {/* Left: number + category */}
        <div style={{
          borderRight: '1px solid var(--rule)', padding: '32px 24px',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '8px',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--blue)', lineHeight: 1 }}>
            {item.num}
          </div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.12em', color: 'var(--mid)', textTransform: 'uppercase',
            writingMode: 'vertical-rl', transform: 'rotate(180deg)', marginTop: '4px',
          }}>
            {item.category}
          </div>
        </div>

        {/* Right: content */}
        <div style={{ padding: '32px 32px 32px 32px' }}>
          <div style={{ marginBottom: '10px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '8px' }}>
              {item.title}
            </h2>
            <p style={{ fontSize: '1.08rem', color: 'var(--mid)', lineHeight: 1.65, maxWidth: '640px' }}>{item.desc}</p>
          </div>

          {/* Steps */}
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            {item.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '7px 0', borderTop: i === 0 ? '1px solid var(--rule)' : 'none' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--blue)', fontWeight: 700, minWidth: '18px', paddingTop: '2px', flexShrink: 0 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '1.02rem', color: 'var(--text)', lineHeight: 1.55 }}>{step}</span>
              </div>
            ))}
          </div>

          {/* Tools + prompt toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {item.tools.map(t => (
                <div key={t} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '5px 10px', background: 'var(--blue-dim)', border: '1px solid var(--blue)',
                }}>
                  <div style={{
                    width: 18, height: 18, background: '#fff', border: '1px solid var(--rule)',
                    borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0,
                  }}>
                    <ToolLogo name={t} fallback="✦" />
                  </div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--blue)', textTransform: 'uppercase' }}>{t}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', border: '1px solid var(--rule)', background: expanded ? 'var(--blue-dim)' : 'transparent',
                cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase', color: expanded ? 'var(--blue)' : 'var(--mid)',
                transition: 'all 0.15s',
              }}
            >
              AI Prompt <span style={{ display: 'inline-block', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>↓</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Expanded prompt ── */}
      {expanded && (
        <div style={{ background: 'var(--surface)', padding: '24px 32px 24px calc(80px + 32px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span className="label">Ready-to-use AI prompt — replace [BRACKETS] with your project details</span>
            <button className="btn-ghost" onClick={handleCopy} style={{ padding: '5px 14px', fontSize: '0.82rem' }}>
              {copied ? '✓ Copied' : 'Copy prompt'}
            </button>
          </div>
          <pre style={{
            fontFamily: 'var(--mono)', fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--text)',
            whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0,
          }}>
            {item.prompt}
          </pre>
        </div>
      )}
    </div>
  )
}

function SpeedView() {
  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: '32px', marginBottom: '0' }}>
        <div className="label" style={{ marginBottom: '12px' }}>Speed Hacks</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Faster. Cleaner. Decided.
        </h1>
        <p style={{ fontSize: '1.08rem', color: 'var(--mid)', maxWidth: '480px', lineHeight: 1.7 }}>
          Five high-leverage moves that compress time without compressing quality — from first brief read to final sign-off.
        </p>
      </div>
      <div>
        {SPEED.map(item => <SpeedCard key={item.num} item={item} />)}
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

interface ProjectWithDesigners extends Project {
  designers: Designer[]
}

interface Designer {
  id: string
  name: string
  role: string
  color: string
}

function Avatar({ d, size = 28 }: { d: Designer; size?: number }) {
  return (
    <div title={`${d.name}${d.role ? ' · ' + d.role : ''}`} style={{
      width: size, height: size, borderRadius: '50%',
      background: d.color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--mono)', fontSize: size * 0.38 + 'px', fontWeight: 700,
      flexShrink: 0, border: '2px solid var(--bg)',
    }}>
      {d.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()}
    </div>
  )
}

function DesignerPicker({ projectId, assigned, allDesigners, onToggle, onAddDesigner }: {
  projectId: string
  assigned: Designer[]
  allDesigners: Designer[]
  onToggle: (d: Designer, add: boolean) => void
  onAddDesigner: (name: string, role: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const assignedIds = assigned.map(d => d.id)

  return (
    <div ref={ref} style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: 28, height: 28, borderRadius: '50%', border: '1.5px dashed var(--rule)',
          background: 'transparent', cursor: 'pointer', color: 'var(--dim)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
        }}
        title="Tag designer"
      >+</button>
      {open && (
        <div style={{
          position: 'absolute', bottom: '36px', left: 0, zIndex: 50,
          background: 'var(--bg)', border: '1.5px solid var(--rule)',
          minWidth: '220px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }}>
          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--rule)' }}>
            <span className="label" style={{ fontSize: '0.7rem' }}>Tag Designer</span>
          </div>
          <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
            {allDesigners.length === 0 && (
              <div style={{ padding: '12px', fontSize: '0.85rem', color: 'var(--dim)' }}>No designers yet</div>
            )}
            {allDesigners.map(d => {
              const isOn = assignedIds.includes(d.id)
              return (
                <div
                  key={d.id}
                  onClick={() => onToggle(d, !isOn)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '8px 12px', cursor: 'pointer',
                    background: isOn ? 'var(--blue-dim)' : 'transparent',
                    transition: 'background 0.1s',
                  }}
                  onMouseOver={e => { if (!isOn) e.currentTarget.style.background = 'var(--surface)' }}
                  onMouseOut={e => { if (!isOn) e.currentTarget.style.background = 'transparent' }}
                >
                  <Avatar d={d} size={24} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: isOn ? 'var(--blue)' : 'var(--text)' }}>{d.name}</div>
                    {d.role && <div style={{ fontSize: '0.75rem', color: 'var(--mid)' }}>{d.role}</div>}
                  </div>
                  {isOn && <span style={{ fontSize: '0.8rem', color: 'var(--blue)' }}>✓</span>}
                </div>
              )
            })}
          </div>
          <div style={{ padding: '10px 12px', borderTop: '1px solid var(--rule)' }}>
            <div className="label" style={{ fontSize: '0.68rem', marginBottom: '8px' }}>Add New Designer</div>
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Name"
              style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--rule)', background: 'var(--bg)', fontFamily: 'var(--font)', fontSize: '0.85rem', color: 'var(--text)', outline: 'none', marginBottom: '6px' }}
            />
            <input
              value={newRole}
              onChange={e => setNewRole(e.target.value)}
              placeholder="Role (optional)"
              style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--rule)', background: 'var(--bg)', fontFamily: 'var(--font)', fontSize: '0.85rem', color: 'var(--text)', outline: 'none', marginBottom: '8px' }}
            />
            <button
              onClick={() => { if (newName.trim()) { onAddDesigner(newName.trim(), newRole.trim()); setNewName(''); setNewRole('') } }}
              className="btn-blue"
              style={{ width: '100%', fontSize: '0.78rem', padding: '6px', opacity: newName.trim() ? 1 : 0.4 }}
            >Add Designer</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Dashboard({ onEnter }: { onEnter: (p: ProjectWithDesigners) => void }) {
  const [projects, setProjects] = useState<ProjectWithDesigners[]>([])
  const [allDesigners, setAllDesigners] = useState<Designer[]>([])
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({ name: '', client: '', websiteType: '', status: 'in-progress' })
  const [scopeFile, setScopeFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'projects' | 'designers'>('projects')
  const [designerForm, setDesignerForm] = useState({ name: '', role: '' })
  const [addingDesigner, setAddingDesigner] = useState(false)

  const load = useCallback(async () => {
    const [pRes, dRes] = await Promise.all([fetch('/api/projects'), fetch('/api/designers')])
    const [p, d] = await Promise.all([pRes.json(), dRes.json()])
    setProjects(p)
    setAllDesigners(d)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const create = async () => {
    if (!form.name || !form.client || !form.websiteType) return
    setUploading(true)
    let scopeDoc: string | undefined
    if (scopeFile) {
      const fd = new FormData()
      fd.append('file', scopeFile)
      const upRes = await fetch('/api/upload', { method: 'POST', body: fd })
      const upData = await upRes.json()
      scopeDoc = upData.filename
    }
    const res = await fetch('/api/projects', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, scopeDoc }),
    })
    const p = await res.json()
    const full = { ...p, designers: [] }
    setProjects(prev => [...prev, full])
    setForm({ name: '', client: '', websiteType: '', status: 'in-progress' })
    setScopeFile(null)
    setUploading(false)
    setCreating(false)
    onEnter(full)
  }

  const updateStatus = async (projectId: string, status: string) => {
    await fetch(`/api/projects/${projectId}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status } : p))
  }

  const del = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('Delete this project?')) return
    await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  const toggleDesigner = async (projectId: string, d: Designer, add: boolean) => {
    await fetch(`/api/projects/${projectId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ designerId: d.id, action: add ? 'add' : 'remove' }),
    })
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p
      return {
        ...p,
        designers: add ? [...p.designers, d] : p.designers.filter(x => x.id !== d.id),
      }
    }))
  }

  const addDesigner = async (name: string, role: string) => {
    const res = await fetch('/api/designers', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role }),
    })
    const d = await res.json()
    setAllDesigners(prev => [...prev, d])
    return d
  }

  const deleteDesigner = async (id: string) => {
    if (!confirm('Remove this designer?')) return
    await fetch(`/api/designers/${id}`, { method: 'DELETE' })
    setAllDesigners(prev => prev.filter(d => d.id !== id))
    setProjects(prev => prev.map(p => ({ ...p, designers: p.designers.filter(d => d.id !== id) })))
  }

  const addDesignerToTeam = async () => {
    if (!designerForm.name.trim()) return
    await addDesigner(designerForm.name.trim(), designerForm.role.trim())
    setDesignerForm({ name: '', role: '' })
    setAddingDesigner(false)
  }

  const typeLabel = (id: string) =>
    PROJECT_TYPES.find(t => t.id === id)?.label ?? WEBSITE_TYPES.find(t => t.id === id)?.label ?? id

  const closeCreateModal = () => { setCreating(false); setForm({ name: '', client: '', websiteType: '', status: 'in-progress' }); setScopeFile(null) }
  const closeDesignerModal = () => { setAddingDesigner(false); setDesignerForm({ name: '', role: '' }) }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1px solid var(--rule)', background: 'var(--surface)', fontFamily: 'var(--font)', fontSize: '0.9rem', color: 'var(--text)', outline: 'none', transition: 'border-color 0.15s', boxSizing: 'border-box' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Top Nav — matches project view exactly ── */}
      <nav id="nav">
        <div style={{ padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>DF</div>
            <span style={{ fontWeight: 700, fontSize: '1.08rem', letterSpacing: '-0.01em' }}>DESIGNFLOW</span>
            <span style={{ width: '1px', height: '14px', background: 'var(--rule)' }} />
            <span className="label">Creative Process Hub</span>
          </div>
          {/* Tab switcher in nav right — matches vsw style */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="vsw">
              <button className={`vsw-btn ${tab === 'projects' ? 'active' : ''}`} onClick={() => setTab('projects')}>
                Projects{!loading && projects.length > 0 ? ` (${projects.length})` : ''}
              </button>
              <button className={`vsw-btn ${tab === 'designers' ? 'active' : ''}`} onClick={() => setTab('designers')}>
                Team{!loading && allDesigners.length > 0 ? ` (${allDesigners.length})` : ''}
              </button>
            </div>
            {tab === 'projects' && (
              <button className="btn-blue" onClick={() => setCreating(true)} style={{ fontSize: '0.78rem' }}>+ New Project</button>
            )}
            {tab === 'designers' && (
              <button className="btn-blue" onClick={() => setAddingDesigner(true)} style={{ fontSize: '0.78rem' }}>+ Add Designer</button>
            )}
          </div>
        </div>
      </nav>

      {/* ── Page body — same padding as project view ── */}
      <div style={{ padding: '0 48px' }}>

        {/* ── Page header ── */}
        <div style={{ paddingTop: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--rule)', marginBottom: '40px' }}>
          <div className="label" style={{ marginBottom: '10px' }}>Dashboard</div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1 }}>
            {tab === 'projects' ? 'Your Projects' : 'Your Team'}
          </h1>
        </div>

        {/* ── Projects summary strip ── */}
        {tab === 'projects' && !loading && projects.length > 0 && (
          <div style={{ display: 'flex', gap: '32px', marginBottom: '40px' }}>
            {[
              { label: 'Total', value: projects.length, color: 'var(--text)' },
              { label: 'In Progress', value: projects.filter(p => !p.status || p.status === 'in-progress').length, color: '#2563EB' },
              { label: 'In Review', value: projects.filter(p => p.status === 'in-review').length, color: '#D97706' },
              { label: 'Completed', value: projects.filter(p => p.status === 'completed').length, color: '#16A34A' },
              { label: 'On Hold', value: projects.filter(p => p.status === 'on-hold').length, color: '#DC2626' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: '7px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--mono)', color: s.color, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.value}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--mid)', fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '96px 0', gap: '10px' }}>
            <div style={{ width: '6px', height: '6px', background: 'var(--blue)', borderRadius: '50%', opacity: 0.6 }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.16em', color: 'var(--mid)', textTransform: 'uppercase' }}>Loading</span>
          </div>
        )}

        {/* ── Projects empty state ── */}
        {tab === 'projects' && !loading && projects.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '96px 0', gap: '18px' }}>
            <div style={{ width: '52px', height: '52px', border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--dim)' }}><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '5px' }}>No projects yet</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--mid)', lineHeight: 1.6 }}>Create your first project to begin tracking<br />your design process and team.</p>
            </div>
            <button className="btn-blue" onClick={() => setCreating(true)} style={{ marginTop: '4px', fontSize: '0.75rem' }}>+ Create Project</button>
          </div>
        )}

        {/* ── Projects grid ── */}
        {tab === 'projects' && !loading && projects.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingBottom: '64px' }}>
            {projects.map(p => {
              const st = PROJECT_STATUSES.find(s => s.id === (p.status || 'in-progress')) ?? PROJECT_STATUSES[1]
              const pct = Math.round(((p.activePhase - 1) / Math.max(STAGES.length - 1, 1)) * 100)
              const stageName = STAGES.find(s => s.id === p.activePhase)?.name || ''
              return (
                <div key={p.id} onClick={() => onEnter(p)}
                  style={{ background: 'var(--bg)', border: '1px solid var(--rule)', borderTop: `3px solid ${st.color}`, padding: '32px', cursor: 'pointer', position: 'relative', display: 'flex', flexDirection: 'column', gap: 0, transition: 'box-shadow 0.18s, transform 0.18s', minHeight: '320px' }}
                  onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}>

                  {/* Top row: status + delete */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }} onClick={e => e.stopPropagation()}>
                    <div style={{ position: 'relative' }}>
                      <select value={p.status || 'in-progress'} onChange={e => updateStatus(p.id, e.target.value)}
                        style={{ padding: '4px 24px 4px 9px', fontSize: '0.72rem', fontFamily: 'var(--mono)', fontWeight: 700, letterSpacing: '0.06em', color: st.color, background: `${st.color}14`, border: `1px solid ${st.color}50`, outline: 'none', cursor: 'pointer', appearance: 'none' }}>
                        {PROJECT_STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                      <span style={{ position: 'absolute', right: '7px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: st.color, fontSize: '0.5rem' }}>▾</span>
                    </div>
                    <button onClick={e => del(p.id, e)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dim)', fontSize: '1rem', padding: '4px 6px', lineHeight: 1 }}
                      onMouseOver={e => (e.currentTarget.style.color = '#DC2626')}
                      onMouseOut={e => (e.currentTarget.style.color = 'var(--dim)')}>×</button>
                  </div>

                  {/* Project name + client */}
                  <div style={{ marginBottom: '28px', flex: 1 }}>
                    <div style={{ fontSize: '1.45rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1.25, marginBottom: '8px' }}>{p.name}</div>
                    <div style={{ fontSize: '0.92rem', color: 'var(--mid)', fontWeight: 500 }}>{p.client}</div>
                  </div>

                  {/* Phase name */}
                  {stageName && (
                    <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Current phase</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{stageName}</span>
                    </div>
                  )}

                  {/* Progress bar */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {STAGES.map(s => (
                          <div key={s.id} style={{ width: '24px', height: '3px', background: s.id <= p.activePhase ? 'var(--blue)' : 'var(--rule)', transition: 'background 0.3s' }} />
                        ))}
                      </div>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 700, color: pct > 0 ? 'var(--blue)' : 'var(--dim)' }}>{pct}%</span>
                    </div>
                  </div>

                  {/* Type tag + scope doc */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <span style={{ padding: '3px 10px', background: 'var(--surface)', fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--mid)', textTransform: 'uppercase' }}>
                      {typeLabel(p.websiteType)}
                    </span>
                    {p.scopeDoc && (
                      <a href={`/uploads/${p.scopeDoc}`} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ padding: '3px 10px', fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--blue)', textDecoration: 'none', background: 'var(--blue-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        ↓ Scope Doc
                      </a>
                    )}
                  </div>

                  {/* Designers + date */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '18px', borderTop: '1px solid var(--rule)' }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {p.designers.map((d, i) => (
                        <div key={d.id} style={{ marginLeft: i > 0 ? '-6px' : 0 }}>
                          <Avatar d={d} size={28} />
                        </div>
                      ))}
                      <div style={{ marginLeft: p.designers.length > 0 ? '6px' : 0 }}>
                        <DesignerPicker
                          projectId={p.id}
                          assigned={p.designers}
                          allDesigners={allDesigners}
                          onToggle={(d, add) => toggleDesigner(p.id, d, add)}
                          onAddDesigner={async (name, role) => {
                            const d = await addDesigner(name, role)
                            toggleDesigner(p.id, d, true)
                          }}
                        />
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--dim)', letterSpacing: '0.04em' }}>{p.createdAt}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── Team tab ── */}
        {tab === 'designers' && !loading && (
          <div>
            {allDesigners.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '96px 0', gap: '18px' }}>
                <div style={{ width: '52px', height: '52px', border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--dim)' }}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '5px' }}>No team members yet</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--mid)', lineHeight: 1.6 }}>Add your designers to assign them to projects<br />and track who's working on what.</p>
                </div>
                <button className="btn-blue" onClick={() => setAddingDesigner(true)} style={{ marginTop: '4px', fontSize: '0.75rem' }}>+ Add Designer</button>
              </div>
            )}

            {allDesigners.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {allDesigners.map(d => {
                  const theirProjects = projects.filter(p => p.designers.some(x => x.id === d.id))
                  return (
                    <div key={d.id} style={{ background: 'var(--bg)', border: '1px solid var(--rule)', padding: '24px 22px', position: 'relative', transition: 'box-shadow 0.18s' }}
                      onMouseOver={e => (e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.07)')}
                      onMouseOut={e => (e.currentTarget.style.boxShadow = 'none')}>
                      <button onClick={() => deleteDesigner(d.id)}
                        style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dim)', fontSize: '0.82rem', padding: '4px 5px', lineHeight: 1 }}
                        onMouseOver={e => (e.currentTarget.style.color = '#DC2626')}
                        onMouseOut={e => (e.currentTarget.style.color = 'var(--dim)')}>×</button>

                      <div style={{ marginBottom: '14px' }}>
                        <Avatar d={d} size={42} />
                      </div>
                      <div style={{ fontSize: '0.98rem', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text)', marginBottom: '3px' }}>{d.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--mid)', fontWeight: 500, marginBottom: '16px' }}>{d.role || <span style={{ color: 'var(--dim)' }}>No role set</span>}</div>

                      <div style={{ paddingTop: '14px', borderTop: '1px solid var(--rule)' }}>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '8px' }}>
                          {theirProjects.length > 0 ? `${theirProjects.length} Project${theirProjects.length > 1 ? 's' : ''}` : 'Unassigned'}
                        </div>
                        {theirProjects.map(p => (
                          <div key={p.id} style={{ fontSize: '0.75rem', color: 'var(--mid)', padding: '2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.5 }}>· {p.name}</div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Create Project Modal ── */}
      {creating && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,15,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(6px)' }}
          onClick={e => { if (e.target === e.currentTarget) closeCreateModal() }}>
          <div style={{ background: 'var(--bg)', width: '100%', maxWidth: '580px', boxShadow: '0 32px 80px rgba(0,0,0,0.18)', animation: 'slide-in 0.2s ease' }}>

            {/* Modal header */}
            <div style={{ padding: '26px 32px 22px', borderBottom: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.64rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '6px' }}>New Project</div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--text)' }}>Create Project</h2>
              </div>
              <button onClick={closeCreateModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid)', fontSize: '1.15rem', padding: '4px 6px', lineHeight: 1, marginTop: '-2px' }}>×</button>
            </div>

            {/* Modal body */}
            <div style={{ padding: '24px 32px 30px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '7px' }}>Project Name *</div>
                  <input autoFocus value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Smiles AU Redesign"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--blue)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--rule)')} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '7px' }}>Client Name *</div>
                  <input value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
                    placeholder="e.g. Smiles Australia"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--blue)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--rule)')} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '7px' }}>Project Type *</div>
                  <select value={form.websiteType} onChange={e => setForm(f => ({ ...f, websiteType: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'pointer', color: form.websiteType ? 'var(--text)' : 'var(--mid)' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--blue)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--rule)')}>
                    <option value="">Select type…</option>
                    {PROJECT_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '7px' }}>Status</div>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--blue)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--rule)')}>
                    {PROJECT_STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Scope document */}
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '7px' }}>
                  Scope Document <span style={{ color: 'var(--dim)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— optional</span>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', border: `1px dashed ${scopeFile ? 'var(--blue)' : 'var(--rule)'}`, cursor: 'pointer', background: scopeFile ? 'var(--blue-dim)' : 'var(--surface)', transition: 'all 0.15s' }}>
                  <input type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }} onChange={e => setScopeFile(e.target.files?.[0] ?? null)} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: scopeFile ? 'var(--blue)' : 'var(--dim)' }}>↑</span>
                  <span style={{ fontSize: '0.83rem', color: scopeFile ? 'var(--blue)' : 'var(--mid)', fontWeight: scopeFile ? 600 : 400, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {scopeFile ? scopeFile.name : 'Click to attach a PDF, DOC, or DOCX…'}
                  </span>
                  {scopeFile && (
                    <button onClick={e => { e.preventDefault(); e.stopPropagation(); setScopeFile(null) }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid)', fontSize: '0.85rem', padding: '0 4px', flexShrink: 0 }}>×</button>
                  )}
                </label>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
                <button className="btn-blue" onClick={create}
                  disabled={!form.name || !form.client || !form.websiteType || uploading}
                  style={{ opacity: (form.name && form.client && form.websiteType && !uploading) ? 1 : 0.3, fontSize: '0.75rem' }}>
                  {uploading ? 'Creating…' : 'Create Project →'}
                </button>
                <button className="btn-ghost" onClick={closeCreateModal} style={{ fontSize: '0.75rem' }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Designer Modal ── */}
      {addingDesigner && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,15,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(6px)' }}
          onClick={e => { if (e.target === e.currentTarget) closeDesignerModal() }}>
          <div style={{ background: 'var(--bg)', width: '100%', maxWidth: '400px', boxShadow: '0 32px 80px rgba(0,0,0,0.18)', animation: 'slide-in 0.2s ease' }}>

            <div style={{ padding: '26px 32px 22px', borderBottom: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.64rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '6px' }}>Team</div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--text)' }}>Add Designer</h2>
              </div>
              <button onClick={closeDesignerModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid)', fontSize: '1.15rem', padding: '4px 6px', lineHeight: 1 }}>×</button>
            </div>

            <div style={{ padding: '24px 32px 30px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '7px' }}>Full Name *</div>
                <input autoFocus value={designerForm.name} onChange={e => setDesignerForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Priya Sharma"
                  onKeyDown={e => e.key === 'Enter' && addDesignerToTeam()}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--blue)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--rule)')} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '7px' }}>Designation / Role</div>
                <input value={designerForm.role} onChange={e => setDesignerForm(f => ({ ...f, role: e.target.value }))}
                  placeholder="e.g. Senior UI Designer"
                  onKeyDown={e => e.key === 'Enter' && addDesignerToTeam()}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--blue)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--rule)')} />
              </div>
              <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
                <button className="btn-blue" onClick={addDesignerToTeam}
                  disabled={!designerForm.name.trim()}
                  style={{ opacity: designerForm.name.trim() ? 1 : 0.3, fontSize: '0.75rem' }}>Add to Team →</button>
                <button className="btn-ghost" onClick={closeDesignerModal} style={{ fontSize: '0.75rem' }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── MoodboardView ─────────────────────────────────────────────────────────────

function MoodboardView({ projectId }: { projectId: string }) {
  const [items, setItems] = useLocalStorage<MoodItem[]>(`dph_mood_${projectId}`, [])
  const [adding, setAdding] = useState<'link' | 'image' | 'note' | null>(null)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkLabel, setLinkLabel] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [noteText, setNoteText] = useState('')
  const [noteColor, setNoteColor] = useState('#FFF9C4')

  const NOTE_COLORS = [
    { hex: '#FFF9C4', name: 'Yellow' },
    { hex: '#BBDEFB', name: 'Blue' },
    { hex: '#F8BBD9', name: 'Pink' },
    { hex: '#C8E6C9', name: 'Green' },
    { hex: '#E1BEE7', name: 'Purple' },
  ]

  const add = () => {
    if (adding === 'link' && linkUrl) {
      setItems(prev => [...prev, { id: Date.now().toString(), type: 'link', url: linkUrl, label: linkLabel || linkUrl }])
      setLinkUrl(''); setLinkLabel('')
    } else if (adding === 'image' && imageUrl) {
      setItems(prev => [...prev, { id: Date.now().toString(), type: 'image', imageUrl }])
      setImageUrl('')
    } else if (adding === 'note' && noteText) {
      setItems(prev => [...prev, { id: Date.now().toString(), type: 'note', text: noteText, color: noteColor }])
      setNoteText('')
    }
    setAdding(null)
  }

  const del = (id: string) => setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: '28px', marginBottom: '32px' }}>
        <div className="label" style={{ marginBottom: '8px' }}>Moodboard & References</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '20px' }}>
          Project Board
        </h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className={adding === 'link' ? 'btn-blue' : 'btn-ghost'} onClick={() => setAdding(adding === 'link' ? null : 'link')} style={{ fontSize: '0.82rem' }}>+ Add Link</button>
          <button className={adding === 'image' ? 'btn-blue' : 'btn-ghost'} onClick={() => setAdding(adding === 'image' ? null : 'image')} style={{ fontSize: '0.82rem' }}>+ Add Image</button>
          <button className={adding === 'note' ? 'btn-blue' : 'btn-ghost'} onClick={() => setAdding(adding === 'note' ? null : 'note')} style={{ fontSize: '0.82rem' }}>+ Add Note</button>
        </div>
      </div>

      {adding && (
        <div style={{ marginBottom: '32px', padding: '24px', border: '1.5px solid var(--blue)', background: 'var(--blue-dim)' }}>
          {adding === 'link' && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: 2, minWidth: '200px' }}>
                <div className="label" style={{ marginBottom: '6px', fontSize: '0.7rem' }}>URL</div>
                <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://..." onKeyDown={e => e.key === 'Enter' && add()} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid var(--rule)', background: 'var(--bg)', fontFamily: 'var(--font)', fontSize: '0.92rem', color: 'var(--text)', outline: 'none' }} />
              </div>
              <div style={{ flex: 1, minWidth: '160px' }}>
                <div className="label" style={{ marginBottom: '6px', fontSize: '0.7rem' }}>Label (optional)</div>
                <input value={linkLabel} onChange={e => setLinkLabel(e.target.value)} placeholder="e.g. Competitor A" onKeyDown={e => e.key === 'Enter' && add()} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid var(--rule)', background: 'var(--bg)', fontFamily: 'var(--font)', fontSize: '0.92rem', color: 'var(--text)', outline: 'none' }} />
              </div>
              <button className="btn-blue" onClick={add} style={{ fontSize: '0.82rem' }}>Add</button>
              <button className="btn-ghost" onClick={() => setAdding(null)} style={{ fontSize: '0.82rem' }}>Cancel</button>
            </div>
          )}
          {adding === 'image' && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <div className="label" style={{ marginBottom: '6px', fontSize: '0.7rem' }}>Image URL</div>
                <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." onKeyDown={e => e.key === 'Enter' && add()} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid var(--rule)', background: 'var(--bg)', fontFamily: 'var(--font)', fontSize: '0.92rem', color: 'var(--text)', outline: 'none' }} />
              </div>
              <button className="btn-blue" onClick={add} style={{ fontSize: '0.82rem' }}>Add</button>
              <button className="btn-ghost" onClick={() => setAdding(null)} style={{ fontSize: '0.82rem' }}>Cancel</button>
            </div>
          )}
          {adding === 'note' && (
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                {NOTE_COLORS.map(c => (
                  <button key={c.hex} onClick={() => setNoteColor(c.hex)} style={{ width: '28px', height: '28px', background: c.hex, border: noteColor === c.hex ? '2.5px solid var(--text)' : '2px solid transparent', cursor: 'pointer', transition: 'border 0.1s' }} title={c.name} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Write your note…" rows={3} style={{ flex: 1, padding: '9px 12px', border: '1.5px solid var(--rule)', background: 'var(--bg)', fontFamily: 'var(--font)', fontSize: '0.92rem', color: 'var(--text)', outline: 'none', resize: 'none' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button className="btn-blue" onClick={add} style={{ fontSize: '0.82rem' }}>Add</button>
                  <button className="btn-ghost" onClick={() => setAdding(null)} style={{ fontSize: '0.82rem' }}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {items.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--dim)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '2.5rem', marginBottom: '16px' }}>◈</div>
          <div className="label">Board is empty</div>
          <p style={{ marginTop: '8px', fontSize: '0.95rem', color: 'var(--mid)' }}>Add links, images and notes to build your moodboard</p>
        </div>
      )}

      <div style={{ columns: '3', columnGap: '16px' }}>
        {items.map(item => (
          <div key={item.id} style={{ breakInside: 'avoid', marginBottom: '16px', position: 'relative' }}>
            <button onClick={() => del(item.id)} style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 1, background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', width: '22px', height: '22px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px' }}>×</button>

            {item.type === 'link' && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '18px', border: '1px solid var(--rule)', background: 'var(--bg)', textDecoration: 'none', transition: 'background 0.15s' }} onMouseOver={e => (e.currentTarget.style.background = 'var(--surface)')} onMouseOut={e => (e.currentTarget.style.background = 'var(--bg)')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <img src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=16`} width={16} height={16} alt="" onError={e => { e.currentTarget.style.display = 'none' }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--blue)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Link</span>
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text)', marginBottom: '6px', lineHeight: 1.4 }}>{item.label}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--mid)', wordBreak: 'break-all' }}>{item.url}</div>
              </a>
            )}

            {item.type === 'image' && (
              <div style={{ border: '1px solid var(--rule)', overflow: 'hidden', background: 'var(--surface)' }}>
                <img src={item.imageUrl} alt="" style={{ width: '100%', display: 'block' }} onError={e => { e.currentTarget.style.display = 'none' }} />
              </div>
            )}

            {item.type === 'note' && (
              <div style={{ padding: '20px', background: item.color, minHeight: '100px' }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{item.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectWithDesigners | null>(null)
  const [activeStage, setActiveStage] = useState(1)
  const [view, setView] = useState<'flow' | 'questionnaire' | 'speed' | 'moodboard'>('flow')

  const enterProject = (p: ProjectWithDesigners) => {
    setActiveProject(p)
    setActiveStage(p.activePhase)
    setView('flow')
  }

  const updatePhase = async (phase: number) => {
    setActiveStage(phase)
    if (activeProject) {
      await fetch(`/api/projects/${activeProject.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activePhase: phase }),
      })
      setActiveProject(prev => prev ? { ...prev, activePhase: phase } : null)
    }
  }

  if (!activeProject) {
    return <Dashboard onEnter={enterProject} />
  }

  const stage = STAGES.find(s => s.id === activeStage)!

  return (
    <div style={{ minHeight: '100vh' }}>
      <nav id="nav">
        <div style={{ padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>DF</div>
            <button onClick={() => setActiveProject(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--mid)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: 0 }}>← Projects</button>
            <span style={{ width: '1px', height: '14px', background: 'var(--rule)' }} />
            <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.01em', color: 'var(--text)' }}>{activeProject.name}</span>
            <span style={{ fontSize: '0.88rem', color: 'var(--mid)' }}>{activeProject.client}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
            <div className="vsw">
              <button className={`vsw-btn ${view === 'flow' ? 'active' : ''}`} onClick={() => setView('flow')}>Process</button>
              <button className={`vsw-btn ${view === 'questionnaire' ? 'active' : ''}`} onClick={() => setView('questionnaire')}>Questionnaire</button>
              <button className={`vsw-btn ${view === 'speed' ? 'active' : ''}`} onClick={() => setView('speed')}>Speed Hacks</button>
              <button className={`vsw-btn ${view === 'moodboard' ? 'active' : ''}`} onClick={() => setView('moodboard')}>Moodboard</button>
            </div>
          </div>
        </div>
      </nav>

      <div style={{ padding: '0 48px' }}>
        {view === 'flow' && (
          <>
            <div className="phase-strip">
              {STAGES.map(s => (
                <button key={s.id} className={`phase-tab ${s.id === activeStage ? 'active' : ''}`} onClick={() => updatePhase(s.id)}>
                  <span className="pt-num">{s.code}</span>
                  <span className="pt-name">{s.name}</span>
                </button>
              ))}
            </div>
            <StageContent key={activeStage} stage={stage} />
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid var(--rule)' }}>
              <button className="btn-ghost" disabled={activeStage === 1} onClick={() => updatePhase(Math.max(1, activeStage - 1))}>← Prev Phase</button>
              <button className={activeStage === STAGES.length ? 'btn-ghost' : 'btn-blue'} disabled={activeStage === STAGES.length} onClick={() => updatePhase(Math.min(STAGES.length, activeStage + 1))}>Next Phase →</button>
            </div>
          </>
        )}
        {view === 'questionnaire' && <QuestionnaireView projectId={activeProject.id} projectName={activeProject.name} />}
        {view === 'speed' && <SpeedView />}
        {view === 'moodboard' && <MoodboardView projectId={activeProject.id} />}
      </div>

      <footer style={{ borderTop: '1px solid var(--rule)', padding: '24px 48px', marginTop: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="label">DesignFlow — Built for Creative Leads</span>
          <span className="label">DesignFlow — Creative Process Hub</span>
        </div>
      </footer>
    </div>
  )
}
