// Care Hub — landing page.

const { useState, useEffect } = React;
const {
  Menu, X, ArrowRight, ArrowDown, Activity, Users, FileText, Shield, Heart, Network,
  BookOpen, Quote, Building, Scale, Home, Mail, MapPin, TrendingUp, Hospital, Handshake
} = window.Icons;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "teal",
  "displayFont": "fraunces",
  "darkHero": false,
  "showStoryTimer": true
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  teal:  { name: "Teal",  c700: "#0f766e", c600: "#0d9488", c500: "#14b8a6", c400: "#5eead4", c100: "#ccfbf1", c900: "#134e4a" },
  navy:  { name: "Navy",  c700: "#1e3a8a", c600: "#1d4ed8", c500: "#2563eb", c400: "#60a5fa", c100: "#dbeafe", c900: "#172554" },
  olive: { name: "Olive", c700: "#4d7c0f", c600: "#65a30d", c500: "#84cc16", c400: "#bef264", c100: "#ecfccb", c900: "#365314" }
};

const FONT_MAP = {
  fraunces: "'Fraunces', 'Georgia', serif",
  inter:    "'Inter Tight', 'Inter', system-ui, sans-serif",
  serif:    "'Source Serif 4', 'Georgia', serif"
};

const RESOURCES = [
  {
    pill: "CHCF Report · Oct 2024",
    title: "Exploring Emerging Medi-Cal Community Care Hubs",
    blurb: "Analysis of operational models bridging the gap between social services and managed care.",
    href: "https://www.chcf.org/publication/exploring-emerging-medi-cal-community-care-hubs/"
  },
  {
    pill: "HHS / ASPE · Nov 2023",
    title: "Community Care Hubs: A Promising Model",
    blurb: "Federal strategic approach to health and social care coordination and health equity.",
    href: "https://aspe.hhs.gov/sites/default/files/documents/c0b5b441b4dbc7c2cd7c4f9c7c2c1234/community-care-hubs-issue-brief.pdf"
  },
  {
    pill: "DHCS Policy Guide",
    title: "CalAIM Justice-Involved Initiative Operations",
    blurb: "Operational guide for planning pre-release services for justice-involved populations.",
    href: "https://www.dhcs.ca.gov/CalAIM/Justice-Involved-Initiative/"
  },
  {
    pill: "JGIM · 2025",
    title: "Community-Based Care Management and Medicaid Outcomes",
    blurb: "Peer-reviewed evidence that integrating community partners into care management reduces hospitalizations and improves engagement.",
    href: "https://link.springer.com/article/10.1007/s11606-025-09839-2"
  }
];

function Logo({ accent }) {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <div className="w-8 h-8 flex items-center justify-center" style={{ background: "#0f172a" }}>
        <Network className="w-5 h-5" style={{ color: accent.c400 }} />
      </div>
      <span className="text-[19px] font-bold tracking-tight text-slate-900">
        Care Hub
        <span className="text-slate-400 font-normal">.org</span>
      </span>
    </a>
  );
}

function Nav({ accent }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Your Role", href: "#roles" },
    { name: "Policy Framework", href: "#research" },
    { name: "How We Got Here", href: "#story" },
    { name: "The Model", href: "#model" }
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-slate-200 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Logo accent={accent} />

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href}
               className="text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#contact"
             className="text-white px-4 py-2 text-[13px] font-semibold transition-colors"
             style={{ background: "#0f172a" }}
             onMouseEnter={(e) => (e.currentTarget.style.background = accent.c700)}
             onMouseLeave={(e) => (e.currentTarget.style.background = "#0f172a")}>
            Partner with us →
          </a>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href}
               className="text-lg font-medium text-slate-900"
               onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </a>
          ))}
          <a href="#contact" className="bg-slate-900 text-white text-center py-3 font-semibold mt-2"
             onClick={() => setIsMenuOpen(false)}>
            Partner with us
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero({ accent, displayFont, darkHero }) {
  const bg = darkHero ? "#0b1220" : "#ffffff";
  const fg = darkHero ? "#f8fafc" : "#0f172a";
  const muted = darkHero ? "#94a3b8" : "#475569";
  return (
    <header
      id="top"
      className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6 border-b"
      style={{ background: bg, color: fg, borderColor: darkHero ? "#1e293b" : "#e2e8f0" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] mb-8 flex items-center gap-3"
             style={{ color: accent.c700 }}>
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: accent.c500 }} />
          <span>Maple Community Care Hub</span>
          <span style={{ color: muted, opacity: 0.6 }}>·</span>
          <span style={{ color: muted }}>California, est. 2025</span>
        </div>

        <h1
          className="font-bold tracking-tight leading-[1.02] mb-10"
          style={{ fontFamily: displayFont, fontSize: "clamp(2.75rem, 6.5vw, 5.75rem)" }}
        >
          The infrastructure for{" "}
          <span style={{ color: accent.c700, fontStyle: "italic", fontWeight: 500 }}>
            enhanced community care.
          </span>
        </h1>

        <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mb-12" style={{ color: muted }}>
          We empower county agencies, justice partners, and community-based organizations to deliver enhanced community care — without the administrative weight.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a href="#model"
             className="inline-flex items-center justify-center gap-2 text-white px-7 py-4 text-sm font-semibold transition-colors"
             style={{ background: "#0f172a" }}
             onMouseEnter={(e) => (e.currentTarget.style.background = accent.c700)}
             onMouseLeave={(e) => (e.currentTarget.style.background = "#0f172a")}>
            Explore the Model <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#story"
             className="inline-flex items-center justify-center gap-2 border px-7 py-4 text-sm font-semibold transition-colors"
             style={{
               borderColor: darkHero ? "#334155" : "#cbd5e1",
               color: fg,
               background: "transparent"
             }}>
            How We Got Here <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        {/* footer rule */}
        <div className="mt-20 pt-6 border-t flex flex-wrap gap-x-12 gap-y-4 font-mono text-[11px] uppercase tracking-[0.22em]"
             style={{ borderColor: darkHero ? "#1e293b" : "#e2e8f0", color: muted }}>
          <span><span style={{ color: accent.c700 }}>01</span> &nbsp; Transitions of Care</span>
          <span><span style={{ color: accent.c700 }}>02</span> &nbsp; Community Supports</span>
          <span><span style={{ color: accent.c700 }}>03</span> &nbsp; Justice-Involved Initiative</span>
          <span><span style={{ color: accent.c700 }}>04</span> &nbsp; Data Exchange Framework</span>
        </div>
      </div>
    </header>
  );
}

function Landscape({ accent }) {
  return (
    <section id="landscape" className="py-24 px-6 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight max-w-2xl">
            Health is more than medicine.
          </h2>
          <p className="text-slate-600 max-w-lg text-lg">
            The definition of "care" in California has fundamentally shifted — and the providers who deliver it have, too.
          </p>
        </div>

        <div className="grid md:grid-cols-12 border-t border-l border-slate-200 bg-white">
          <div className="md:col-span-4 p-8 md:p-12 border-r border-b border-slate-200 flex flex-col">
            <span className="block font-black leading-none mb-2 tabular-nums"
                  style={{ color: accent.c700, fontSize: "clamp(4rem, 9vw, 7rem)", letterSpacing: "-0.04em" }}>
              50%
            </span>
            <p className="text-lg font-medium text-slate-900 mt-2">
              Of health outcomes are driven by Health-Related Social Needs (HRSNs).
            </p>
            <p className="mt-4 text-slate-500 text-[11px] uppercase tracking-[0.18em] font-mono">
              Source: CDC, 2024
            </p>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed">
              Housing, food security, and community safety are critical drivers of health. California's enhanced community care benefit explicitly redefines what counts as care.
            </p>
          </div>

          {[
            {
              icon: <Heart className="w-5 h-5 text-slate-700" />,
              title: "A new definition of care",
              body: "Services once viewed as 'social needs' — housing navigation, justice reintegration, food access — are now reimbursable by Medi-Cal as enhanced community care."
            },
            {
              icon: <Users className="w-5 h-5 text-slate-700" />,
              title: "A new definition of providers",
              body: "To support populations with complex needs, California has removed traditional licensure barriers. Community-based organizations are now the frontline of enhanced care."
            }
          ].map((b) => (
            <div key={b.title} className="md:col-span-4 p-8 md:p-12 border-r border-b border-slate-200">
              <div className="w-10 h-10 bg-slate-100 flex items-center justify-center mb-6">
                {b.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">{b.title}</h3>
              <p className="text-slate-600 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Research({ accent, displayFont }) {
  return (
    <section id="research" className="py-24 px-6 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: accent.c700 }}>
            ◆ Policy Framework
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3 tracking-tight">
            Grounded in evidence.
          </h2>
          <p className="text-slate-600 mt-6 text-lg">
            Our operational model is not theoretical. It is aligned with the latest state and federal frameworks for community care hubs and justice-involved initiatives.
          </p>
        </div>

        {/* Pull quote */}
        <blockquote className="mb-20 relative bg-slate-50 border-l-2 p-10 md:p-14"
                    style={{ borderColor: accent.c600 }}>
          <span className="absolute top-6 left-6 font-bold leading-none select-none"
                style={{ color: accent.c700, opacity: 0.08, fontSize: "9rem", fontFamily: displayFont }}>
            "
          </span>
          <p className="relative text-2xl md:text-[28px] leading-[1.35] text-slate-900 mb-6 max-w-4xl"
             style={{ fontFamily: displayFont, fontWeight: 400 }}>
            Emerging Medi-Cal Community Care Hubs can serve as a bridge between the health care system and CBOs, providing the administrative infrastructure that CBOs often lack.
          </p>
          <footer className="flex items-center gap-3">
            <div className="h-px w-8 bg-slate-400" />
            <cite className="not-italic font-mono text-[11px] font-bold text-slate-600 uppercase tracking-[0.22em]">
              California Health Care Foundation · Oct 2024
            </cite>
          </footer>
        </blockquote>

        {/* Resource cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESOURCES.map((r, i) => (
            <a key={r.title} href={r.href} target="_blank" rel="noreferrer"
               className="group block bg-white border border-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="aspect-[4/3] relative overflow-hidden border-b border-slate-200"
                   style={{ background: "repeating-linear-gradient(135deg, #f1f5f9 0 12px, #f8fafc 12px 24px)" }}>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-32 h-44 bg-white shadow-lg border border-slate-200 p-4 flex flex-col">
                    <div className="h-2 w-full mb-3" style={{ background: accent.c700 }} />
                    <div className="font-mono text-[7px] tracking-widest text-slate-400 mb-3 uppercase">
                      Document {String(i + 1).padStart(2, "0")}
                    </div>
                    {Array.from({ length: 8 }).map((_, k) => (
                      <div key={k}
                           className="h-[3px] mb-1.5"
                           style={{
                             background: "#e2e8f0",
                             width: `${[100, 100, 70, 90, 100, 65, 100, 80][k]}%`
                           }} />
                    ))}
                    <div className="mt-auto h-1.5 w-1/3" style={{ background: accent.c100 }} />
                  </div>
                </div>
                <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                  ↗ External
                </div>
              </div>
              <div className="p-6">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] block mb-3"
                      style={{ color: accent.c700 }}>
                  {r.pill}
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 tracking-tight"
                    style={{ fontFamily: displayFont, fontWeight: 500 }}>
                  {r.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{r.blurb}</p>
                <span className="inline-flex items-center text-[13px] font-semibold text-slate-900 border-b pb-0.5 group-hover:gap-2 transition-all"
                      style={{ borderColor: "#cbd5e1" }}>
                  Read summary <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gap({ accent }) {
  return (
    <section className="py-24 px-6 text-white" style={{ background: "#0b1220" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: accent.c400 }}>
            ◆ The Problem
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6 tracking-tight">
            The infrastructure gap.
          </h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Policy has shifted to fund social care. Operations have not caught up. Community providers are experts in trust and service delivery, but they often lack the administrative, billing, and clinical infrastructure required to interface with Medi-Cal Managed Care Plans.
          </p>

          <ul className="space-y-3">
            {[
              "Administrative burden diverts focus from care.",
              "Complex billing requirements create barriers to entry.",
              "Lack of clinical infrastructure limits scope of practice.",
              "Data exchange with managed care plans is a non-starter for most CBOs."
            ].map((t) => (
              <li key={t} className="flex items-start gap-4 border-l border-slate-800 pl-4 py-1">
                <span className="font-mono text-xs text-red-400 mt-1 select-none">✕</span>
                <p className="text-slate-300">{t}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative p-10 md:p-12 border" style={{ background: "#0f172a", borderColor: "#1e293b" }}>
          <div className="absolute -top-3 left-10 font-mono text-[10px] uppercase tracking-[0.22em] px-2 py-1"
               style={{ background: "#0f172a", color: accent.c400 }}>
            ◆ The Solution
          </div>
          <h3 className="text-3xl font-bold mb-4 tracking-tight" style={{ color: accent.c400 }}>
            Care Hub
          </h3>
          <p className="text-white text-lg font-medium mb-10 leading-snug">
            We provide the missing infrastructure so providers can do what they do best — care for the community.
          </p>

          <div className="space-y-3">
            {[
              { t: "Embedded Clinician", d: "MD-in-the-loop for non-traditional workforce.", n: "01" },
              { t: "Centralized Billing", d: "Seamless claims processing with Managed Care Plans.", n: "02" },
              { t: "Data Integration", d: "Unified systems for tracking outcomes and reporting.", n: "03" },
              { t: "Contracting", d: "Single point of contract for plans, agencies, and CBOs.", n: "04" }
            ].map((item) => (
              <div key={item.t} className="flex items-start gap-4 p-4 border-l-2"
                   style={{ background: "rgba(0,0,0,0.25)", borderColor: accent.c500 }}>
                <span className="font-mono text-[10px] tracking-widest mt-1" style={{ color: accent.c400 }}>{item.n}</span>
                <div>
                  <h4 className="font-bold text-white">{item.t}</h4>
                  <p className="text-sm text-slate-400">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Model({ accent, displayFont }) {
  return (
    <section id="model" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: accent.c700 }}>
            ◆ Our Model
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3 tracking-tight">
            Medi-Cal funded community.
          </h2>
          <p className="text-slate-600 mt-6 text-lg leading-relaxed">
            We increase access to funding for healthy communities — empowering each community's unique ecosystem and making it easy for everyone who enhances care to be reimbursed.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-10 items-stretch">
            {/* Left: Payers */}
            <div className="space-y-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-3">◇ Payers</div>
              {[
                { icon: <Shield className="w-5 h-5 text-slate-500" />, t: "Medi-Cal Managed Care Plans" },
                { icon: <Building className="w-5 h-5 text-slate-500" />, t: "County Agencies" }
              ].map((p) => (
                <div key={p.t} className="p-6 bg-slate-50 border border-slate-200 flex items-center gap-4">
                  {p.icon}
                  <h3 className="font-bold text-slate-900 text-sm">{p.t}</h3>
                </div>
              ))}
            </div>

            {/* Center: Hub */}
            <div className="relative flex items-center">
              <div className="hidden md:block absolute top-1/2 -left-6 -right-6 h-px bg-slate-200 -z-10 transform -translate-y-1/2" />
              <div className="hidden md:block absolute top-1/2 -left-6 -right-6 -z-10 transform -translate-y-1/2 flex justify-between">
                {Array.from({ length: 22 }).map((_, i) => (
                  <span key={i} className="inline-block w-1 h-1 rounded-full"
                        style={{ background: i % 2 === 0 ? "#cbd5e1" : "transparent" }} />
                ))}
              </div>
              <div className="w-full text-white p-8 py-12 text-center relative z-10 shadow-2xl"
                   style={{ background: accent.c900 }}>
                <Network className="w-12 h-12 mx-auto mb-4" style={{ color: accent.c400 }} />
                <h3 className="text-2xl font-bold mb-2 tracking-tight"
                    style={{ fontFamily: displayFont, fontWeight: 500 }}>
                  Care Hub
                </h3>
                <p className="text-sm" style={{ color: accent.c100, opacity: 0.85 }}>
                  Contracting · Billing · Clinical · Data
                </p>
                <div className="mt-6 pt-6 border-t font-mono text-[10px] uppercase tracking-[0.22em] flex justify-center gap-3"
                     style={{ borderColor: "rgba(255,255,255,0.15)", color: accent.c400 }}>
                  <span>NPI ✓</span><span>·</span><span>837P ✓</span><span>·</span><span>HIPAA ✓</span>
                </div>
              </div>
            </div>

            {/* Right: Providers */}
            <div className="space-y-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-3 text-right">Providers ◇</div>
              {[
                { icon: <Users className="w-5 h-5 text-slate-500" />, t: "Community-Based Organizations" },
                { icon: <Scale className="w-5 h-5 text-slate-500" />, t: "Justice Partners" }
              ].map((p) => (
                <div key={p.t} className="p-6 bg-slate-50 border border-slate-200 flex items-center gap-4 flex-row-reverse text-right">
                  {p.icon}
                  <h3 className="font-bold text-slate-900 text-sm">{p.t}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Roles({ accent, displayFont }) {
  const roles = [
    {
      n: "01",
      audience: "Hospitals",
      tagline: "Transitions of care · Readmissions",
      icon: <Hospital className="w-5 h-5" />,
      headline: "From readmissions working group to readmissions reduction network.",
      stat: "25%",
      statLabel: "lower inpatient utilization with integrated community partners (JGIM, 2025)",
      body: "Hospitals invest enormous effort in reducing readmissions. The missing piece isn't another internal committee — it's a network of community-based care managers who hold members through the transition.",
      cta: "For Hospitals"
    },
    {
      n: "02",
      audience: "CBOs & Providers",
      tagline: "The critical touchpoints",
      icon: <Users className="w-5 h-5" />,
      headline: "You are the people who keep members engaged and stable in the community.",
      stat: null,
      statLabel: null,
      body: "Every check-in, ride, meal, and follow-up call is a clinical event. We handle contracting, billing, and compliance so you can focus on the relationship — the part no one else can do.",
      cta: "For CBOs"
    },
    {
      n: "03",
      audience: "County Agencies",
      tagline: "The safety-net starting line",
      icon: <Building className="w-5 h-5" />,
      headline: "Stop talking about ECM. Start delivering enhanced community care.",
      stat: null,
      statLabel: null,
      body: "Counties are the starting place for benefits and care in the safety net. We bring together the providers, plans, and partners already in motion — and move from program acronyms to coordinated care.",
      cta: "For Counties"
    },
    {
      n: "04",
      audience: "Health Plans",
      tagline: "Streamlined compliance",
      icon: <Shield className="w-5 h-5" />,
      headline: "One contract. Many partners. Real outcomes.",
      stat: null,
      statLabel: null,
      body: "Administrative and clinical compliance is the bottleneck between mandate and delivery. We streamline both — so the dollars plans are required to spend on enhanced community care actually move into the community.",
      cta: "For Health Plans"
    }
  ];

  return (
    <section id="roles" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: accent.c700 }}>
              ◆ A shared responsibility
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mt-4 tracking-tight leading-[1.03]"
                style={{ fontFamily: displayFont }}>
              We all have a role in <span style={{ color: accent.c700, fontStyle: "italic", fontWeight: 500 }}>community care</span>.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              Because we are all involved. Care Hub is about healthy communities — the kind that take hospitals, CBOs, counties, and plans pulling on the same rope.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200 bg-white">
          {roles.map((r) => (
            <div key={r.n} className="relative p-8 md:p-9 border-r border-b border-slate-200 flex flex-col">
              {/* top stripe */}
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accent.c700 }} />

              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 flex items-center justify-center text-slate-700">
                    {r.icon}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
                    For
                  </div>
                </div>
                <span className="font-mono text-[11px] tracking-[0.22em] text-slate-400">{r.n}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                {r.audience}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-6"
                 style={{ color: accent.c700 }}>
                {r.tagline}
              </p>

              <p className="text-[17px] leading-snug text-slate-900 mb-6"
                 style={{ fontFamily: displayFont, fontWeight: 500 }}>
                {r.headline}
              </p>

              {r.stat && (
                <div className="mb-6 pb-5 border-b border-slate-200">
                  <div className="font-black leading-none tabular-nums"
                       style={{ color: accent.c700, fontSize: "3.5rem", letterSpacing: "-0.04em" }}>
                    {r.stat}
                  </div>
                  <p className="mt-2 text-xs text-slate-500 leading-snug">{r.statLabel}</p>
                </div>
              )}

              <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                {r.body}
              </p>

              <a href="#contact"
                 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 mt-auto group/cta">
                <span className="border-b pb-0.5" style={{ borderColor: "#cbd5e1" }}>{r.cta}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
              </a>
            </div>
          ))}
        </div>

        {/* Footnote sources */}
        <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 flex flex-wrap gap-x-6 gap-y-2">
          <span>Sources ↗</span>
          <a href="https://link.springer.com/article/10.1007/s11606-025-09839-2" target="_blank" rel="noreferrer" className="hover:text-slate-700">JGIM 2025</a>
          <a href="https://www.nature.com/articles/s41746-025-02195-9" target="_blank" rel="noreferrer" className="hover:text-slate-700">npj Digital Medicine 2025</a>
          <a href="https://pubmed.ncbi.nlm.nih.gov/42018601/" target="_blank" rel="noreferrer" className="hover:text-slate-700">PubMed 42018601</a>
        </div>
      </div>
    </section>
  );
}

function Footer({ accent, displayFont }) {
  return (
    <footer id="contact" className="text-white py-24 px-6" style={{ background: "#0b1220" }}>
      <div className="max-w-5xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: accent.c400 }}>
          ◆ Contact
        </span>
        <h2 className="text-4xl md:text-6xl font-bold mt-3 mb-8 tracking-tight max-w-3xl"
            style={{ fontFamily: displayFont }}>
          Empower your care ecosystem.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
          Whether you're a hospital, county agency, managed care plan, or community-based organization, Care Hub provides the infrastructure you need to deliver enhanced community care.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <Mail className="w-4 h-4" />, label: "Email", value: "partners@carehub.org" },
            { icon: <MapPin className="w-4 h-4" />, label: "Located", value: "Santa Clara County, CA" },
            { icon: <TrendingUp className="w-4 h-4" />, label: "Status", value: "Accepting partners — 2026 cohort" }
          ].map((c) => (
            <div key={c.label} className="p-6 border" style={{ borderColor: "#1e293b", background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
                   style={{ color: accent.c400 }}>
                {c.icon}<span>{c.label}</span>
              </div>
              <p className="text-white">{c.value}</p>
            </div>
          ))}
        </div>

        <a href="mailto:partners@carehub.org"
           className="inline-flex items-center gap-3 font-bold py-5 px-10 transition-all hover:-translate-y-0.5"
           style={{ background: accent.c600, color: "#fff" }}>
          Partner with us <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm"
           style={{ borderColor: "#1e293b" }}>
        <div className="mb-4 md:mb-0 flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center" style={{ background: "#0f172a" }}>
            <Network className="w-3 h-3" style={{ color: accent.c400 }} />
          </div>
          <span><span className="font-bold text-slate-300">Maple Community Care Hub</span> &nbsp;·&nbsp; carehub.org &copy; 2026</span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}

// ---------- TWEAKS ----------

function Tweaks({ t, setTweak }) {
  const { TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSelect } = window;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Brand">
        <TweakRadio
          label="Accent"
          value={t.accent}
          onChange={(v) => setTweak("accent", v)}
          options={[
            { value: "teal", label: "Teal" },
            { value: "navy", label: "Navy" },
            { value: "olive", label: "Olive" }
          ]}
        />
        <TweakSelect
          label="Display font"
          value={t.displayFont}
          onChange={(v) => setTweak("displayFont", v)}
          options={[
            { value: "fraunces", label: "Fraunces (Serif)" },
            { value: "serif", label: "Source Serif 4" },
            { value: "inter", label: "Inter Tight (Sans)" }
          ]}
        />
      </TweakSection>
      <TweakSection title="Hero">
        <TweakToggle
          label="Dark hero"
          value={t.darkHero}
          onChange={(v) => setTweak("darkHero", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ---------- APP ----------

function App() {
  const { useTweaks } = window;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const accent = ACCENT_MAP[t.accent] || ACCENT_MAP.teal;
  const displayFont = FONT_MAP[t.displayFont] || FONT_MAP.fraunces;

  // expose to story
  useEffect(() => {
    document.documentElement.style.setProperty("--display-font", displayFont);
    document.documentElement.style.setProperty("--accent-700", accent.c700);
    document.documentElement.style.setProperty("--accent-400", accent.c400);
  }, [displayFont, accent]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-teal-200/60 selection:text-teal-900">
      <Nav accent={accent} />
      <Hero accent={accent} displayFont={displayFont} darkHero={t.darkHero} />
      <Landscape accent={accent} />
      <Research accent={accent} displayFont={displayFont} />
      <HowWeGotHere />
      <Gap accent={accent} />
      <Model accent={accent} displayFont={displayFont} />
      <Roles accent={accent} displayFont={displayFont} />
      <Footer accent={accent} displayFont={displayFont} />
      <Tweaks t={t} setTweak={setTweak} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
