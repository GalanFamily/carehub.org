// community.jsx — Editorial sections for the redesigned landing page:
//   1. WhereHealthHappens   — "Where does health happen?" + JourneyConstellation
//   2. GroundedInEvidence    — HRSN, transportation/housing/food, NEJM/JAMA/Health Affairs
//   3. TheGap               — "Communities and health plans don't speak the same language" (was Policy)
//   4. GroundedInPolicy      — What a Community Care Hub IS, w/ CHCF / HHS / CalAIM references
//   5. WhatThatMeans         — Four concrete actions Care Hub does, w/ real CTAs

const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

// ─────────────────────────────────────────────────────────────────────────────
//  Shared atoms
// ─────────────────────────────────────────────────────────────────────────────

// A warm hand-shaped paper card. Slight rotation for vintage polaroid feel.
function PaperCard({ children, tilt = 0, className = "", style = {} }) {
  return (
    <div
      className={`bg-white border ${className}`}
      style={{
        borderColor: "#e8e1d2",
        boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 18px 30px -22px rgba(60,40,12,0.18)",
        transform: `rotate(${tilt}deg)`,
        borderRadius: 4,
        ...style
      }}
    >
      {children}
    </div>
  );
}

// A small monogram "plate" — stylized stand-in for a journal/org wordmark.
function Mark({ label, color, large = false }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: large ? "6px 11px" : "4px 8px",
        background: color,
        color: "#fff",
        fontFamily: "var(--display-font, 'Fraunces', 'Georgia', serif)",
        fontWeight: 700,
        fontSize: large ? 13 : 11,
        letterSpacing: "0.04em",
        borderRadius: 3,
        lineHeight: 1
      }}
    >
      {label}
    </span>
  );
}

// Small mono-cap label used everywhere
function Eyebrow({ children, color = "#7a7060" }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color }}>
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  1. Where Does Health Happen?
// ─────────────────────────────────────────────────────────────────────────────

const PLACES = [
  { name: "Schools",              note: "Where kids spend half their waking hours.",                  tone: "#d97757", shape: "triangle" },
  { name: "Food pantries",        note: "Where the line for groceries is also the line for care.",   tone: "#a06a3c", shape: "square" },
  { name: "CBOs",                 note: "The people who pick up the phone first.",                    tone: "#2c6e5b", shape: "circle" },
  { name: "County agencies",      note: "Where benefits live before they reach a wallet.",            tone: "#3f5c8a", shape: "square" },
  { name: "Justice partners",     note: "Meeting people the day they get out — not six weeks later.", tone: "#7b4a8a", shape: "halfcircle" },
  { name: "Residential homes",    note: "Group homes, recuperative beds, the in-between places.",     tone: "#8a6a4a", shape: "house" },
  { name: "Living rooms",         note: "Where most of life — and most of recovery — happens.",       tone: "#b8525a", shape: "heart" },
  { name: "Churches",             note: "Where trust gathers on Sunday morning.",                     tone: "#c69b56", shape: "arch" }
];

function PlaceGlyph({ shape, tone }) {
  // A small abstract mark for each kind of place. Pure CSS shapes only.
  const common = { width: 28, height: 28, background: tone };
  if (shape === "triangle") {
    return <div style={{ width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderBottom: `24px solid ${tone}` }} />;
  }
  if (shape === "arch") {
    return <div style={{ ...common, borderRadius: "14px 14px 0 0" }} />;
  }
  if (shape === "square") {
    return <div style={common} />;
  }
  if (shape === "circle") {
    return <div style={{ ...common, borderRadius: "50%" }} />;
  }
  if (shape === "halfcircle") {
    return <div style={{ width: 28, height: 14, background: tone, borderRadius: "14px 14px 0 0" }} />;
  }
  if (shape === "house") {
    return (
      <div style={{ position: "relative", width: 28, height: 28 }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 18, background: tone }} />
        <div style={{ position: "absolute", left: -2, right: -2, top: 0, height: 12, background: tone, clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
      </div>
    );
  }
  if (shape === "heart") {
    // Subtle, abstract heart-ish shape using two circles + square
    return (
      <div style={{ position: "relative", width: 28, height: 28 }}>
        <div style={{ position: "absolute", left: 0, top: 4, width: 16, height: 16, background: tone, borderRadius: "50%" }} />
        <div style={{ position: "absolute", right: 0, top: 4, width: 16, height: 16, background: tone, borderRadius: "50%" }} />
        <div style={{ position: "absolute", left: 4, top: 12, width: 20, height: 14, background: tone, transform: "rotate(45deg)", transformOrigin: "center" }} />
      </div>
    );
  }
  return <div style={common} />;
}

// A constellation showing one person's journey across community settings.
// SVG with simple circles + dashed path + animated dot — no hand-drawn imagery.
function JourneyConstellation({ accent, displayFont }) {
  const W = 1000, H = 500;
  const nodes = [
    { n: "01", label: "Jail",                tone: "#7b4a8a", x: 90,  y: 160 },
    { n: "02", label: "ED",                  tone: "#b8525a", x: 260, y: 360 },
    { n: "03", label: "Hospital",            tone: "#b8525a", x: 380, y: 270 },
    { n: "04", label: "Residential program", tone: "#8a6a4a", x: 510, y: 160 },
    { n: "05", label: "County agency",       tone: "#3f5c8a", x: 690, y: 380 },
    { n: "06", label: "Justice partner",     tone: "#7b4a8a", x: 890, y: 230 },
    { n: "07", label: "CBO",                 tone: "#2c6e5b", x: 600, y: 80  },
    { n: "08", label: "Food pantry",         tone: "#a06a3c", x: 180, y: 80  }
  ];

  // Sporadic bouncing — heavy ED↔Hospital, occasional excursions to the others.
  const [JAIL, ED, HOSP, RES, COUNTY, JUSTICE, CBO, FOOD] = nodes;
  const sequence = [
    ED, HOSP, ED, HOSP, ED, HOSP, ED,
    JAIL, ED, HOSP, ED, HOSP, ED, HOSP,
    CBO, HOSP, ED, HOSP, ED, HOSP,
    RES, ED, HOSP, ED, HOSP, ED,
    COUNTY, HOSP, ED, HOSP, ED, HOSP,
    JUSTICE, ED, HOSP, ED, HOSP, ED,
    FOOD, ED, HOSP, ED, HOSP, ED, HOSP, ED
  ];
  const motionPath = sequence.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="relative">
      <div className="-mx-6 md:mx-0 overflow-x-auto md:overflow-visible">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto mx-auto block"
          style={{ minWidth: 760, width: "100%", maxWidth: 1100, maxHeight: 560 }}
          aria-hidden="true"
        >
        {/* moving dot — sporadic bouncing, mostly ED↔Hospital */}
        <circle r="10" fill={accent.c700}>
          <animateMotion dur="22s" repeatCount="indefinite" path={motionPath} />
        </circle>
        <circle r="20" fill={accent.c500} fillOpacity="0.25">
          <animateMotion dur="22s" repeatCount="indefinite" path={motionPath} />
        </circle>

        {/* nodes */}
        {nodes.map((p) => (
          <g key={p.n} transform={`translate(${p.x} ${p.y})`}>
            <circle r="38" fill="#fbf7ed" stroke={p.tone} strokeWidth="2.25" />
            <circle r="9" fill={p.tone} />
            <text
              textAnchor="middle"
              y="-50"
              fontSize="15"
              fontFamily="JetBrains Mono, monospace"
              fill="#7a7060"
              letterSpacing="2"
            >
              {p.n}
            </text>
            <text
              textAnchor="middle"
              y="68"
              fontSize="22"
              fontFamily={displayFont}
              fontWeight="600"
              fill="#221b14"
            >
              {p.label}
            </text>
          </g>
        ))}
        </svg>
      </div>

      {/* legend / explanation */}
      <div className="mt-6 grid md:grid-cols-3 gap-6 md:gap-10 max-w-4xl">
        <div>
          <Eyebrow color={accent.c700}>Without a hub</Eyebrow>
          <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "#3a2f24" }}>
            One person, eight disconnected touchpoints. Each touchpoint starts over.
          </p>
        </div>
        <div>
          <Eyebrow color={accent.c700}>With a hub</Eyebrow>
          <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "#3a2f24" }}>
            The same eight, coordinated. One care team holds the through-line — meeting the person at every door.
          </p>
        </div>
        <div>
          <Eyebrow color={accent.c700}>The result</Eyebrow>
          <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "#3a2f24" }}>
            Fewer ED visits. Fewer readmissions. Fewer returns to incarceration. A life held in the community.
          </p>
        </div>
      </div>
    </div>
  );
}

function WhereHealthHappens({ accent, displayFont }) {
  return (
    <section
      id="where"
      className="relative px-6 py-24 md:py-32 border-b overflow-hidden"
      style={{ background: "#fbf7ed", borderColor: "#e8e1d2" }}
    >
      {/* faint paper grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 600px at 80% -10%, rgba(217,119,87,0.07), transparent 60%), radial-gradient(900px 500px at -10% 110%, rgba(44,110,91,0.06), transparent 60%)"
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Editorial opener */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <Eyebrow color={accent.c700}>A perspective shift</Eyebrow>
          <h2
            className="mt-4 tracking-tight leading-[1.0] font-bold"
            style={{ fontFamily: displayFont, fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
          >
            Where does
            <br />
            <span style={{ color: accent.c700, fontStyle: "italic", fontWeight: 500 }}>health</span> happen?
          </h2>

          <p
            className="mt-10 text-2xl md:text-3xl leading-[1.35] max-w-2xl"
            style={{ fontFamily: displayFont, fontWeight: 400, color: "#3a2f24" }}
          >
            Not just in the doctor's office. Not only at the hospital.
            Mostly — and most consequentially — in the community a person already calls home.
          </p>
        </div>

        {/* Body prose, two columns of editorial copy */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 mb-20 md:mb-24">
          <div className="md:col-span-7 md:col-start-2">
            <p className="text-lg md:text-xl leading-[1.7]" style={{ color: "#3a2f24" }}>
              Health depends on <em>who</em> you are, <em>where</em> you are, and where you actually
              spend your time. Schools, churches, CBOs, justice partners, county agencies, residential
              facilities, food pantries — these are the deep networks of community. They touch people
              not during a crisis but{" "}
              <span style={{ background: "linear-gradient(180deg, transparent 60%, " + accent.c100 + " 60%)" }}>
                every month, every week, every day.
              </span>
            </p>
            <p className="mt-6 text-lg md:text-xl leading-[1.7]" style={{ color: "#5e554a" }}>
              The work isn't to invent a new front door. It's to find the door each person already
              walks through — their place, their people — and to make them a real partner in the
              hub of care.
            </p>
          </div>
        </div>

        {/* The constellation — one person bouncing through community settings */}
        <div className="mb-20 md:mb-24">
          <div className="flex items-baseline justify-between mb-6 pb-4 border-b" style={{ borderColor: "#e8e1d2" }}>
            <Eyebrow>One person · One month</Eyebrow>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#a8a092" }}>
              The bouncing path
            </span>
          </div>
          <JourneyConstellation accent={accent} displayFont={displayFont} />
        </div>

        {/* What we've learned — operational insight from the first JI hub */}
        <div className="mb-20 md:mb-24 grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-4">
            <Eyebrow color={accent.c700}>What we've learned</Eyebrow>
            <h3
              className="mt-3 text-3xl md:text-4xl leading-[1.15]"
              style={{ fontFamily: displayFont, fontWeight: 600, color: "#221b14" }}
            >
              From the first hub for{" "}
              <span style={{ color: accent.c700, fontStyle: "italic", fontWeight: 500 }}>
                Justice-Involved
              </span>{" "}
              in the state.
            </h3>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p
              className="text-xl md:text-2xl leading-[1.45]"
              style={{ fontFamily: displayFont, fontWeight: 400, color: "#3a2f24" }}
            >
              Post-incarceration and post-hospitalization, the environment is so unstable
              that it's difficult to establish regular patterns — "show up at this clinic
              every Tuesday" doesn't survive contact with reality.
            </p>
            <p className="mt-5 text-lg leading-[1.7]" style={{ color: "#5e554a" }}>
              It's about finding the places they already go. The location for their
              monthly long-acting injections (LAI). Regular visits with justice partners.
              Residential or sober-living programs. Meet them there, and the care plan
              starts to hold.
            </p>
          </div>
        </div>

        {/* The places — loose, organic flow, NOT a hard grid */}
        <div className="relative">
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b" style={{ borderColor: "#e8e1d2" }}>
            <Eyebrow>The community, in places</Eyebrow>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#a8a092" }}>
              Eight kinds of door
            </span>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {PLACES.map((p, i) => (
              <li key={p.name} className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-1">
                  <PlaceGlyph shape={p.shape} tone={p.tone} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-1" style={{ color: "#a8a092" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="text-xl tracking-tight mb-1"
                    style={{ fontFamily: displayFont, fontWeight: 600, color: "#221b14" }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: "#5e554a" }}>
                    {p.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing line */}
        <div className="mt-20 md:mt-24 max-w-3xl">
          <p
            className="text-2xl md:text-3xl leading-[1.35]"
            style={{ fontFamily: displayFont, fontWeight: 400, color: "#221b14" }}
          >
            The job of a community care hub is to{" "}
            <span style={{ color: accent.c700, fontStyle: "italic" }}>stitch these doors together</span>
            {" "}— to support the people who already show up.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  2. Grounded in Evidence  (HRSN drivers + NEJM/JAMA/Health Affairs)
// ─────────────────────────────────────────────────────────────────────────────

const DRIVERS = [
  {
    name: "Transportation",
    pct: "5.8M",
    pctLabel: "Americans delayed medical care in a single year due to lack of transportation — with rates several times higher among Medicaid recipients",
    body:
      "A missed dialysis ride becomes an admission. A skipped specialist visit becomes a six-figure crisis. Rides are clinical infrastructure.",
    citation: {
      journal: "Am J Public Health",
      mark: "AJPH",
      markColor: "#1c5530",
      piece: "Wolfe et al. · Transportation Barriers to Health Care in the United States: Findings From the National Health Interview Survey, 1997–2017",
      year: "2020",
      href: "https://pubmed.ncbi.nlm.nih.gov/32298170/"
    }
  },
  {
    name: "Housing",
    pct: "29%",
    pctLabel: "reduction in hospitalizations among chronically ill homeless adults provided housing + case management vs. usual care",
    body:
      "Recuperative beds, housing navigation, and tenancy supports are now reimbursable in California — and they meaningfully reduce avoidable utilization.",
    citation: {
      journal: "JAMA",
      mark: "JAMA",
      markColor: "#7a1a2f",
      piece: "Sadowski et al. · Effect of a Housing and Case Management Program on ED Visits and Hospitalizations Among Chronically Ill Homeless Adults",
      year: "2009",
      href: "https://pubmed.ncbi.nlm.nih.gov/19417194/"
    }
  },
  {
    name: "Food",
    pct: "50%",
    pctLabel: "fewer inpatient admissions among dually-eligible patients receiving medically-tailored meals over six months",
    body:
      "Discharge plans don't keep people out of the hospital. Groceries, transport, and a phone call on day three do.",
    citation: {
      journal: "Health Affairs",
      mark: "HA",
      markColor: "#1f3a8a",
      piece: "Berkowitz et al. · Meal Delivery Programs Reduce the Use of Costly Health Care in Dually Eligible Medicare and Medicaid Beneficiaries",
      year: "2018",
      href: "https://www.healthaffairs.org/doi/10.1377/hlthaff.2017.0999"
    }
  },
  {
    name: "Community",
    pct: "Weekly",
    pctLabel: "touchpoints a community partner can sustain — vs. once or twice a year with a PCP",
    body:
      "The single thing hospitals and primary care can't do: show up every week. Weekly check-ins, monthly home visits, the steady contact that keeps people stable long before they're sick enough to be admitted.",
    citation: {
      journal: "JAMA Internal Medicine",
      mark: "JAMA IM",
      markColor: "#7a1a2f",
      piece: "Kangovi et al. · Effect of Community Health Worker Support on Clinical Outcomes of Low-Income Patients Across Primary Care Facilities",
      year: "2018",
      href: "https://pubmed.ncbi.nlm.nih.gov/30422224/"
    }
  }
];

function GroundedInEvidence({ accent, displayFont }) {
  return (
    <section
      id="evidence"
      className="px-6 py-24 md:py-28 border-b"
      style={{ background: "#ffffff", borderColor: "#e8e1d2" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-7">
            <Eyebrow color={accent.c700}>Grounded in Evidence</Eyebrow>
            <h2
              className="mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]"
              style={{ fontFamily: displayFont }}
            >
              What actually keeps people <span style={{ color: accent.c700, fontStyle: "italic", fontWeight: 500 }}>out</span> of the hospital?
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-4">
            <p className="text-lg leading-relaxed" style={{ color: "#5e554a" }}>
              Decades of peer-reviewed research point to the same handful of drivers behind avoidable
              hospitalizations and ED visits. They're not new clinical breakthroughs. They're the
              ordinary social conditions of a life.
            </p>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "#a8a092" }}>
              Known as → Health-Related Social Needs (HRSNs)
            </div>
          </div>
        </div>

        {/* Four drivers as editorial cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#e8e1d2" }}>
          {DRIVERS.map((d, i) => (
            <article
              key={d.name}
              className="p-8 md:p-9 flex flex-col"
              style={{ background: "#fbf7ed" }}
            >
              <div className="flex items-baseline justify-between mb-6">
                <Eyebrow color={accent.c700}>{`Driver ${String(i + 1).padStart(2, "0")}`}</Eyebrow>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#a8a092" }}>
                  HRSN
                </span>
              </div>

              <h3
                className="tracking-tight mb-5 leading-[1.05]"
                style={{ fontFamily: displayFont, fontWeight: 600, fontSize: "clamp(1.5rem, 2.1vw, 1.75rem)" }}
              >
                {d.name}
              </h3>

              <div className="mb-6 pb-6 border-b" style={{ borderColor: "#e0d6c2" }}>
                <div
                  className="font-bold tabular-nums leading-none"
                  style={{
                    color: accent.c700,
                    fontSize: "clamp(2rem, 3vw, 2.5rem)",
                    letterSpacing: "-0.03em",
                    fontFamily: displayFont
                  }}
                >
                  {d.pct}
                </div>
                <p className="mt-3 text-[13px] leading-snug" style={{ color: "#5e554a" }}>
                  {d.pctLabel}
                </p>
              </div>

              <p className="text-[14px] leading-relaxed flex-1" style={{ color: "#3a2f24" }}>
                {d.body}
              </p>

              {/* citation, journal-card style — clickable, with journal mark */}
              <a
                href={d.citation.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 pt-5 border-t block group"
                style={{ borderColor: "#e0d6c2" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Mark label={d.citation.mark} color={d.citation.markColor} />
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: accent.c900, fontFamily: displayFont }}
                  >
                    {d.citation.journal}
                  </span>
                  <span className="font-mono text-[10px]" style={{ color: "#a8a092" }}>
                    · {d.citation.year}
                  </span>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: accent.c700 }}>
                    Read ↗
                  </span>
                </div>
                <p
                  className="text-[13px] italic leading-snug group-hover:underline"
                  style={{ color: "#5e554a", fontFamily: displayFont, textDecorationColor: accent.c500 }}
                >
                  {d.citation.piece}
                </p>
              </a>
            </article>
          ))}
        </div>

        {/* Closing thesis */}
        <div className="mt-20 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2 md:pt-3">
            <Eyebrow color={accent.c700}>The thesis</Eyebrow>
          </div>
          <div className="md:col-span-10">
            <p
              className="text-2xl md:text-[2rem] leading-[1.35] tracking-tight"
              style={{ fontFamily: displayFont, fontWeight: 400, color: "#221b14" }}
            >
              Care coordination across <span style={{ color: accent.c700 }}>traditional clinical settings</span>{" "}
              and the <span style={{ color: accent.c700 }}>deep networks of community</span> is what
              will make the difference. This is how we build the future of the safety net —
              and the care infrastructure for us all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  3. The Gap  (translation + 837 + medical necessity)
// ─────────────────────────────────────────────────────────────────────────────

// A side-by-side translation row: community language ⇄ plan language
const TRANSLATIONS = [
  { community: "We drove her to dialysis Tuesday and waited two hours.",
    plan:      "T2003 · Non-emergency transport, ambulatory · 1 unit" },
  { community: "He's been couch surfing — we set up a recuperative bed.",
    plan:      "H0044 · Housing transition, recuperative care · 14 days" },
  { community: "Dropped off three days of meals and checked in by phone.",
    plan:      "S5170 · Home-delivered meals · MTM-eligible" },
  { community: "Met him at the gate, drove to the clinic, got the meds.",
    plan:      "G9012 · Pre-release / re-entry coordination · CalAIM JI" }
];

function TheGap({ accent, displayFont }) {
  return (
    <section
      id="gap"
      className="px-6 py-24 md:py-28 border-b"
      style={{ background: "#fbf7ed", borderColor: "#e8e1d2" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-7">
            <Eyebrow color={accent.c700}>The Gap</Eyebrow>
            <h2
              className="mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]"
              style={{ fontFamily: displayFont }}
            >
              Communities and health plans don't{" "}
              <span style={{ color: accent.c700, fontStyle: "italic", fontWeight: 500 }}>speak the same language</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-4">
            <p className="text-lg leading-relaxed" style={{ color: "#5e554a" }}>
              The policy framework is here. CalAIM, the Justice-Involved Initiative, and federal
              guidance on community care hubs already make this work payable. What's missing is the
              translation layer.
            </p>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: "#3a2f24" }}>
              <strong style={{ color: "#221b14" }}>That's what we do.</strong>{" "}
              We turn community care into compliant 837 files, medical-necessity documentation,
              and the audit trail Managed Care Plans require — without making CBOs become billing shops.
            </p>
          </div>
        </div>

        {/* The translator — two columns, paired rows with a connecting glyph */}
        <PaperCard className="overflow-hidden" style={{ borderRadius: 6 }}>
          {/* Header strip */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 md:px-10 py-5 border-b"
               style={{ borderColor: "#e8e1d2", background: "#faf5e8" }}>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ background: accent.c500 }} />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "#5e554a" }}>
                What the community says
              </span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] hidden md:block" style={{ color: "#a8a092" }}>
              translates to
            </div>
            <div className="flex items-center gap-3 justify-end">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "#5e554a" }}>
                What the plan needs
              </span>
              <span className="w-2 h-2 rounded-full" style={{ background: accent.c900 }} />
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y" style={{ borderColor: "#e8e1d2" }}>
            {TRANSLATIONS.map((t, i) => (
              <div key={i}
                   className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 md:px-10 py-6"
                   style={{ borderColor: "#eee5d0" }}>
                {/* Community quote */}
                <div
                  className="text-[17px] leading-snug"
                  style={{ color: "#3a2f24", fontFamily: displayFont, fontStyle: "italic", fontWeight: 400 }}
                >
                  "{t.community}"
                </div>

                {/* Connector */}
                <div className="hidden md:flex items-center" aria-hidden="true">
                  <div className="h-px w-6" style={{ background: accent.c500 }} />
                  <span style={{ color: accent.c700 }}>›</span>
                  <div className="h-px w-6" style={{ background: accent.c900, opacity: 0.4 }} />
                </div>

                {/* 837 row */}
                <div className="font-mono text-[12px] tracking-tight leading-snug px-4 py-3 border"
                     style={{
                       background: "#1d2a23",
                       color: "#dcefe7",
                       borderColor: "#1d2a23",
                       borderRadius: 4
                     }}>
                  <div className="text-[10px] uppercase tracking-[0.22em] mb-1" style={{ color: accent.c400 }}>
                    837P · Row {String(i + 1).padStart(2, "0")}
                  </div>
                  {t.plan}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="px-6 md:px-10 py-5 border-t flex flex-wrap items-center justify-between gap-3"
               style={{ borderColor: "#e8e1d2", background: "#faf5e8" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#7a7060" }}>
              Sample illustrative codes · CalAIM Community Supports + JI Initiative
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: accent.c700 }}>
              We carry the compliance load →
            </div>
          </div>
        </PaperCard>

        {/* Three policy pillars under the translator */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-14">
          {[
            {
              n: "01",
              t: "Existing policy framework",
              b: "CalAIM ECM & Community Supports, the Justice-Involved Initiative, federal Community Care Hub guidance from HHS/ASPE — we operate inside the rules that are already written."
            },
            {
              n: "02",
              t: "Medical-necessity documentation",
              b: "Every encounter is captured in the language of medical necessity, with the clinical context Managed Care Plans need to pay and audit cleanly."
            },
            {
              n: "03",
              t: "Compliant submission",
              b: "We generate the 837 files, encounter data, and ongoing reporting. Community partners stay focused on the relationship, not the EDI spec."
            }
          ].map((p) => (
            <div key={p.n} className="p-7" style={{ background: "#fff", border: "1px solid #e8e1d2", borderRadius: 4 }}>
              <div className="flex items-baseline justify-between mb-5">
                <Eyebrow color={accent.c700}>Pillar {p.n}</Eyebrow>
                <span className="font-mono text-[10px] tracking-[0.22em]" style={{ color: "#a8a092" }}>
                  {p.n}/03
                </span>
              </div>
              <h4 className="text-xl tracking-tight mb-3" style={{ fontFamily: displayFont, fontWeight: 600 }}>
                {p.t}
              </h4>
              <p className="text-[14px] leading-relaxed" style={{ color: "#5e554a" }}>
                {p.b}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  4. Grounded in Policy  (what a Community Care Hub IS, w/ article references)
// ─────────────────────────────────────────────────────────────────────────────

const POLICY_ARTICLES = [
  {
    org: "CHCF",
    orgFull: "California Health Care Foundation",
    mark: "CHCF",
    markColor: "#c0392b",
    date: "Oct 2024",
    title: "Exploring Emerging Medi-Cal Community Care Hubs",
    blurb: "California's analysis of the operational models bridging social services and managed care.",
    href: "https://www.chcf.org/publication/exploring-emerging-medi-cal-community-care-hubs/"
  },
  {
    org: "HHS · ASPE",
    orgFull: "U.S. Department of Health & Human Services",
    mark: "HHS",
    markColor: "#003a70",
    date: "Nov 2023",
    title: "Community Care Hubs: A Promising Model",
    blurb: "The federal strategic approach to health and social care coordination for health equity.",
    href: "https://aspe.hhs.gov/sites/default/files/documents/c0b5b441b4dbc7c2cd7c4f9c7c2c1234/community-care-hubs-issue-brief.pdf"
  },
  {
    org: "DHCS · CalAIM",
    orgFull: "California Department of Health Care Services",
    mark: "DHCS",
    markColor: "#a86420",
    date: "Ongoing",
    title: "Justice-Involved Initiative Operations",
    blurb: "California's operational framework for pre-release Medi-Cal services and reentry care.",
    href: "https://www.dhcs.ca.gov/CalAIM/Justice-Involved-Initiative/"
  }
];

function GroundedInPolicy({ accent, displayFont }) {
  return (
    <section
      id="policy"
      className="px-6 py-24 md:py-28 border-b"
      style={{ background: "#ffffff", borderColor: "#e8e1d2" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-7">
            <Eyebrow color={accent.c700}>Grounded in Policy</Eyebrow>
            <h2
              className="mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]"
              style={{ fontFamily: displayFont }}
            >
              So <span style={{ color: accent.c700, fontStyle: "italic", fontWeight: 500 }}>what is</span> a community care hub?
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-4">
            <p className="text-lg leading-relaxed" style={{ color: "#5e554a" }}>
              The federal government calls it "a promising model." California is funding it through
              CalAIM. CHCF mapped the emerging ones. Here's the version of the answer we operate by.
            </p>
          </div>
        </div>

        {/* Big editorial definition */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-16">
          <div className="md:col-span-2">
            <Eyebrow color={accent.c700}>Definition</Eyebrow>
          </div>
          <div className="md:col-span-10">
            <p
              className="text-[1.6rem] md:text-[2.1rem] leading-[1.35] tracking-tight"
              style={{ fontFamily: displayFont, fontWeight: 400, color: "#221b14" }}
            >
              A <span style={{ color: accent.c700 }}>community care hub</span> is the connective tissue
              between Medi-Cal Managed Care Plans and the trusted local organizations who already
              deliver care — schools, CBOs, counties, justice partners, residential providers.
              The hub carries the administrative, billing, clinical, and data infrastructure those
              partners shouldn't have to carry themselves, so the dollars that policy made available
              actually reach the people doing the work.
            </p>
          </div>
        </div>

        {/* Pull quote with attribution to CHCF */}
        <blockquote
          className="mb-16 relative border-l-2 p-10 md:p-14"
          style={{ borderColor: accent.c600, background: "#fbf7ed" }}
        >
          <span
            className="absolute top-6 left-6 font-bold leading-none select-none"
            style={{ color: accent.c700, opacity: 0.08, fontSize: "9rem", fontFamily: displayFont }}
          >
            "
          </span>
          <p
            className="relative text-2xl md:text-[28px] leading-[1.35] text-slate-900 mb-6 max-w-4xl"
            style={{ fontFamily: displayFont, fontWeight: 400 }}
          >
            Emerging Medi-Cal Community Care Hubs can serve as a bridge between the health care
            system and CBOs, providing the administrative infrastructure that CBOs often lack.
          </p>
          <footer className="flex items-center gap-3">
            <div className="h-px w-8 bg-slate-400" />
            <cite className="not-italic font-mono text-[11px] font-bold text-slate-600 uppercase tracking-[0.22em]">
              California Health Care Foundation · Oct 2024
            </cite>
          </footer>
        </blockquote>

        {/* Article references */}
        <div className="flex items-baseline justify-between mb-6 pb-4 border-b" style={{ borderColor: "#e8e1d2" }}>
          <Eyebrow>The policy reading list</Eyebrow>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#a8a092" }}>
            Three references
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {POLICY_ARTICLES.map((a) => (
            <a
              key={a.title}
              href={a.href}
              target="_blank"
              rel="noreferrer"
              className="group block p-6 md:p-7 border transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderColor: "#e8e1d2", background: "#fbf7ed", borderRadius: 4 }}
            >
              {/* Org mark + date */}
              <div className="flex items-center justify-between mb-5">
                <Mark label={a.mark} color={a.markColor} large />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#a8a092" }}>
                  {a.date}
                </span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3" style={{ color: "#7a7060" }}>
                {a.orgFull}
              </div>
              <h3
                className="text-xl leading-snug tracking-tight mb-3"
                style={{ fontFamily: displayFont, fontWeight: 600, color: "#221b14" }}
              >
                {a.title}
              </h3>
              <p className="text-[14px] leading-relaxed mb-5" style={{ color: "#5e554a" }}>
                {a.blurb}
              </p>
              <span
                className="inline-flex items-center text-[12px] font-semibold border-b pb-0.5"
                style={{ color: "#221b14", borderColor: "#d4cdb8" }}
              >
                Read source ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  5. What That Means  (concrete actions Care Hub does — w/ real CTAs)
// ─────────────────────────────────────────────────────────────────────────────

const ACTIONS = [
  {
    n: "01",
    label: "For people",
    title: "Get on Medi-Cal.",
    body: "Eligible Californians often go uncovered because no one walked them through enrollment. Make a referral and we'll meet the person where they are — at the food pantry, the shelter, the school pickup line.",
    ctaLabel: "Make a referral",
    ctaHref: "/referral",
    accentTone: "#d97757"
  },
  {
    n: "02",
    label: "For members",
    title: "Stay on Medi-Cal.",
    body: "Half of Medi-Cal churn is paperwork, not eligibility. Sign up for automatic renewal support and we'll handle the redetermination loop before coverage lapses.",
    ctaLabel: "Sign up for renewals",
    ctaHref: "/renewals",
    accentTone: "#a06a3c"
  },
  {
    n: "03",
    label: "For care teams",
    title: "Refer for ECM.",
    body: "Have a high-need Medi-Cal member who would benefit from Enhanced Care Management? Submit a referral and we'll connect them to a community-based care manager who stays with them across settings.",
    ctaLabel: "Submit an ECM referral",
    ctaHref: "/ecm-referral",
    accentTone: "#3a8a8a"
  },
  {
    n: "04",
    label: "For transitions",
    title: "Warm hand-offs.",
    body: "The upgraded ADT feed for transitions of care. Receive — and send — automatic updates to community partners during hospitalizations, ED visits, and incarcerations, so nobody loses track of a member during the moments that matter most.",
    ctaLabel: "See how it works",
    ctaHref: "/handoffs",
    accentTone: "#b8525a"
  },
  {
    n: "05",
    label: "For CBOs",
    title: "Join as a Community Partner.",
    body: "Get reimbursed by Medi-Cal Managed Care Plans for the ECM, Community Supports, and CYBHI services you already deliver. We handle the contracts, billing, and compliance — you focus on the relationship.",
    ctaLabel: "Become a partner",
    ctaHref: "/partner",
    accentTone: "#2c6e5b"
  },
  {
    n: "06",
    label: "For existing hubs",
    title: "Get help with audit, claims, and docs.",
    body: "Already operating as a community care hub or enhanced-care provider? We provide audit-readiness reviews, claims submission, and medical-necessity documentation support — without disrupting the work you're doing.",
    ctaLabel: "Talk to our team",
    ctaHref: "/operations",
    accentTone: "#3f5c8a"
  }
];

function WhatThatMeans({ accent, displayFont }) {
  return (
    <section
      id="what-that-means"
      className="px-6 py-24 md:py-28 border-b"
      style={{ background: "#fbf7ed", borderColor: "#e8e1d2" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-7">
            <Eyebrow color={accent.c700}>What that means in practice</Eyebrow>
            <p
              className="mt-5 text-2xl md:text-[2rem] leading-[1.25] tracking-tight"
              style={{ fontFamily: displayFont, fontWeight: 400, color: "#3a2f24" }}
            >
              We are a <span style={{ color: accent.c700, fontStyle: "italic", fontWeight: 500 }}>Community Care Hub</span>.
            </p>
            <h2
              className="mt-3 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]"
              style={{ fontFamily: displayFont }}
            >
              We provide the support communities need to deliver on the{" "}
              <span style={{ color: accent.c700, fontStyle: "italic", fontWeight: 500 }}>promise of enhanced care</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-4">
            <p className="text-lg leading-relaxed" style={{ color: "#5e554a" }}>
              That includes Enhanced Care Management (ECM), Community Supports (CS), and the
              Children &amp; Youth Behavioral Health Initiative (CYBHI). Six things happen
              concretely:
            </p>
          </div>
        </div>

        {/* Six action cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "#e8e1d2" }}>
          {ACTIONS.map((a) => (
            <article
              key={a.n}
              className="p-8 md:p-10 flex flex-col relative"
              style={{ background: "#ffffff" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: a.accentTone }} />

              <div className="flex items-baseline justify-between mb-6">
                <Eyebrow color={a.accentTone}>{a.label}</Eyebrow>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#a8a092" }}>
                  {a.n} / 06
                </span>
              </div>

              <h3
                className="text-3xl md:text-[2.25rem] leading-[1.05] tracking-tight mb-6"
                style={{ fontFamily: displayFont, fontWeight: 600, color: "#221b14" }}
              >
                {a.title}
              </h3>

              <p className="text-[15px] leading-relaxed mb-8 flex-1" style={{ color: "#3a2f24" }}>
                {a.body}
              </p>

              <a
                href={a.ctaHref}
                className="inline-flex items-center justify-between gap-3 px-5 py-3 text-sm font-semibold transition-colors"
                style={{
                  background: "#1f2d24",
                  color: "#fff",
                  borderRadius: 4,
                  alignSelf: "flex-start"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = a.accentTone)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1f2d24")}
              >
                <span>{a.ctaLabel}</span>
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>

        {/* Footer note about the live pages */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#a8a092" }}>
          <span>ECM · Enhanced Care Management</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>CS · Community Supports</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>CYBHI · Children &amp; Youth Behavioral Health Initiative</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Export
// ─────────────────────────────────────────────────────────────────────────────

Object.assign(window, {
  WhereHealthHappens,
  GroundedInEvidence,
  TheGap,
  GroundedInPolicy,
  WhatThatMeans
});
