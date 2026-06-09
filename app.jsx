// Care Hub — landing page.

const { useState, useEffect } = React;
const {
  Menu, X, ArrowRight, ArrowDown, Activity, Users, FileText, Shield, Heart, Network,
  BookOpen, Quote, Building, Scale, Home, Mail, MapPin, TrendingUp, Hospital, Handshake, MapleLeaf, School
} = window.Icons;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "maple",
  "displayFont": "fraunces",
  "darkHero": false,
  "showStoryTimer": true
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  maple: { name: "Maple", c700: "#2c6e5b", c600: "#3b8a73", c500: "#4eaa90", c400: "#94d4be", c100: "#dcefe7", c900: "#1c4538" },
  teal:  { name: "Teal",  c700: "#0f766e", c600: "#0d9488", c500: "#14b8a6", c400: "#5eead4", c100: "#ccfbf1", c900: "#134e4a" },
  navy:  { name: "Navy",  c700: "#1e3a8a", c600: "#1d4ed8", c500: "#2563eb", c400: "#60a5fa", c100: "#dbeafe", c900: "#172554" },
  olive: { name: "Olive", c700: "#4d7c0f", c600: "#65a30d", c500: "#84cc16", c400: "#bef264", c100: "#ecfccb", c900: "#365314" }
};

const FONT_MAP = {
  fraunces: "'Fraunces', 'Georgia', serif",
  inter:    "'Inter Tight', 'Inter', system-ui, sans-serif",
  serif:    "'Source Serif 4', 'Georgia', serif"
};

// Logo brand colors — terracotta family. Decoupled from the site accent
// (Maple green) so the logo can carry its own identity.
const LOGO_COLORS = {
  deep:  "#b8543a", // top circle, deep terracotta — also used for "Hub" wordmark
  mid:   "#c98975", // bottom-left, dusty rose
  light: "#e3c2af"  // bottom-right, pale peach
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
    <a href="#top" className="flex items-center gap-3 group">
      {/* Three overlapping circles arranged in a triangle — community / coming together */}
      <svg viewBox="0 0 36 32" className="w-14 h-[50px]" aria-hidden="true">
        <g style={{ mixBlendMode: "multiply" }}>
          <circle cx="18" cy="10" r="9" fill={LOGO_COLORS.deep} />
          <circle cx="11" cy="21" r="9" fill={LOGO_COLORS.mid}   fillOpacity="0.92" />
          <circle cx="25" cy="21" r="9" fill={LOGO_COLORS.light} fillOpacity="0.92" />
        </g>
      </svg>
      <span className="flex flex-col" style={{ lineHeight: 1 }}>
        <span
          className="text-[26px] tracking-tight"
          style={{ color: "#1f1b16", fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600 }}
        >
          Care<span style={{ color: LOGO_COLORS.deep, fontStyle: "italic", fontWeight: 500 }}>Hub</span>
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em] mt-1.5"
          style={{ color: "#7a7060" }}
        >
          by Maple
        </span>
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
    { name: "Where Health Happens", href: "#where" },
    { name: "Evidence", href: "#evidence" },
    { name: "The Gap", href: "#gap" },
    { name: "What We Do", href: "#what-that-means" },
    { name: "How We Got Here", href: "#story" }
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md py-4 border-b" : "bg-transparent py-7"
      }`}
      style={scrolled ? { background: "rgba(251, 247, 237, 0.92)", borderColor: "#e8e1d2" } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Logo accent={accent} />

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href}
               className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#contact"
             className="text-white px-5 py-3 text-[15px] font-semibold transition-colors rounded-md"
             style={{ background: "#1f2d24" }}
             onMouseEnter={(e) => (e.currentTarget.style.background = accent.c700)}
             onMouseLeave={(e) => (e.currentTarget.style.background = "#1f2d24")}>
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
          <a href="#contact" className="text-white text-center py-3 font-semibold mt-2 rounded-md"
             style={{ background: "#1f2d24" }}
             onClick={() => setIsMenuOpen(false)}>
            Partner with us
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero({ accent, displayFont, darkHero }) {
  const bg = darkHero ? "#1d2a23" : "#fbf7ed";
  const fg = darkHero ? "#f5efe2" : "#221b14";
  const muted = darkHero ? "#a8ad9c" : "#5e554a";
  return (
    <header
      id="top"
      className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6 border-b"
      style={{ background: bg, color: fg, borderColor: darkHero ? "#2d3a32" : "#e8e1d2" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] mb-8 flex items-center gap-3"
             style={{ color: accent.c700 }}>
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: accent.c500 }} />
          <span>CareHub by Maple</span>
          <span style={{ color: muted, opacity: 0.6 }}>·</span>
          <span style={{ color: muted }}>California</span>
        </div>

        <h1
          className="font-bold tracking-tight leading-[1.02] mb-10"
          style={{ fontFamily: displayFont, fontSize: "clamp(2.75rem, 6.5vw, 5.75rem)" }}
        >
          Working together to support{" "}
          <span style={{ color: LOGO_COLORS.deep, fontStyle: "italic", fontWeight: 500 }}>
            healthy communities.
          </span>
        </h1>

        <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mb-12" style={{ color: muted }}>
          We are a Medi-Cal Community Care Hub empowering county agencies, schools, justice partners, community-based organizations, and MCPs to deliver on the promise of enhanced community care — with administrative, billing, and clinical support.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a href="#model"
             className="inline-flex items-center justify-center gap-2 text-white px-7 py-4 text-sm font-semibold transition-colors rounded-md"
             style={{ background: "#1f2d24" }}
             onMouseEnter={(e) => (e.currentTarget.style.background = accent.c700)}
             onMouseLeave={(e) => (e.currentTarget.style.background = "#1f2d24")}>
            Explore the Model <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#story"
             className="inline-flex items-center justify-center gap-2 border px-7 py-4 text-sm font-semibold transition-colors rounded-md"
             style={{
               borderColor: darkHero ? "#3d4a42" : "#d4cdb8",
               color: fg,
               background: "transparent"
             }}>
            How We Got Here <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        {/* footer rule */}
        <div className="mt-20 pt-6 border-t flex flex-wrap gap-x-12 gap-y-4 font-mono text-[11px] uppercase tracking-[0.22em]"
             style={{ borderColor: darkHero ? "#2d3a32" : "#e8e1d2", color: muted }}>
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
    <section id="landscape" className="py-24 px-6 border-b" style={{ background: "#fbf7ed", borderColor: "#e8e1d2" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight max-w-2xl">
            Health is more than medicine.
          </h2>
          <p className="text-slate-600 max-w-lg text-lg">
            The definition of "care" in California has fundamentally shifted — and the providers who deliver it have, too.
          </p>
        </div>

        <div className="grid md:grid-cols-12 border-t border-l bg-white" style={{ borderColor: "#e8e1d2" }}>
          <div className="md:col-span-4 p-8 md:p-12 border-r border-b flex flex-col" style={{ borderColor: "#e8e1d2" }}>
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
            <div key={b.title} className="md:col-span-4 p-8 md:p-12 border-r border-b" style={{ borderColor: "#e8e1d2" }}>
              <div className="w-10 h-10 rounded-md flex items-center justify-center mb-6" style={{ background: "#f0e8d6" }}>
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
    <section id="research" className="py-24 px-6 bg-white border-b" style={{ borderColor: "#e8e1d2" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: accent.c700 }}>
            Policy Framework
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3 tracking-tight">
            Grounded in evidence.
          </h2>
          <p className="text-slate-600 mt-6 text-lg">
            Our operational model is not theoretical. It is aligned with the latest state and federal frameworks for community care hubs and justice-involved initiatives.
          </p>
        </div>

        {/* Pull quote */}
        <blockquote className="mb-20 relative border-l-2 p-10 md:p-14"
                    style={{ borderColor: accent.c600, background: "#fbf7ed" }}>
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
               className="group block bg-white border transition-all hover:-translate-y-1 hover:shadow-lg rounded-md overflow-hidden"
               style={{ borderColor: "#e8e1d2" }}>
              <div className="aspect-[4/3] relative overflow-hidden border-b"
                   style={{ background: "repeating-linear-gradient(135deg, #f0e8d6 0 12px, #fbf7ed 12px 24px)", borderColor: "#e8e1d2" }}>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-32 h-44 bg-white shadow-md border p-4 flex flex-col rounded-sm" style={{ borderColor: "#e8e1d2" }}>
                    <div className="h-2 w-full mb-3" style={{ background: accent.c700 }} />
                    <div className="font-mono text-[7px] tracking-widest mb-3 uppercase" style={{ color: "#a8a092" }}>
                      Document {String(i + 1).padStart(2, "0")}
                    </div>
                    {Array.from({ length: 8 }).map((_, k) => (
                      <div key={k}
                           className="h-[3px] mb-1.5"
                           style={{
                             background: "#ece4d0",
                             width: `${[100, 100, 70, 90, 100, 65, 100, 80][k]}%`
                           }} />
                    ))}
                    <div className="mt-auto h-1.5 w-1/3" style={{ background: accent.c100 }} />
                  </div>
                </div>
                <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#a8a092" }}>
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
                      style={{ borderColor: "#d4cdb8" }}>
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
    <section className="py-24 px-6 text-white" style={{ background: "#1d2a23" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: accent.c400 }}>
            The Problem
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
              <li key={t} className="flex items-start gap-4 border-l pl-4 py-1" style={{ borderColor: "#2d3a32" }}>
                <span className="font-mono text-xs mt-1 select-none" style={{ color: "#d4a87a" }}>—</span>
                <p style={{ color: "#e0d9c9" }}>{t}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative p-10 md:p-12 border rounded-md" style={{ background: "#243530", borderColor: "#34423c" }}>
          <div className="absolute -top-3 left-10 font-mono text-[10px] uppercase tracking-[0.22em] px-2 py-1"
               style={{ background: "#243530", color: accent.c400 }}>
            The Solution
          </div>
          <h3 className="text-3xl font-bold mb-4 tracking-tight" style={{ color: accent.c400 }}>
            Care Hub
          </h3>
          <p className="text-lg font-medium mb-10 leading-snug" style={{ color: "#f5efe2" }}>
            We provide the support communities need so providers can do what they do best — care for people.
          </p>

          <div className="space-y-3">
            {[
              { t: "Embedded Clinician", d: "MD-in-the-loop for non-traditional workforce.", n: "01" },
              { t: "Centralized Billing", d: "Seamless claims processing with Managed Care Plans.", n: "02" },
              { t: "Data Integration", d: "Unified systems for tracking outcomes and reporting.", n: "03" },
              { t: "Contracting", d: "Single point of contract for plans, agencies, and CBOs.", n: "04" }
            ].map((item) => (
              <div key={item.t} className="flex items-start gap-4 p-4 border-l-2 rounded-sm"
                   style={{ background: "rgba(0,0,0,0.2)", borderColor: accent.c500 }}>
                <span className="font-mono text-[10px] tracking-widest mt-1" style={{ color: accent.c400 }}>{item.n}</span>
                <div>
                  <h4 className="font-bold text-white">{item.t}</h4>
                  <p className="text-sm" style={{ color: "#b8b09e" }}>{item.d}</p>
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
            Our Model
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
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: "#7a7060" }}>Payers</div>
              {[
                { icon: <Shield className="w-5 h-5" style={{ color: "#7a7060" }} />, t: "Medi-Cal Managed Care Plans" },
                { icon: <Building className="w-5 h-5" style={{ color: "#7a7060" }} />, t: "County Agencies" }
              ].map((p) => (
                <div key={p.t} className="p-6 border rounded-md flex items-center gap-4" style={{ background: "#fbf7ed", borderColor: "#e8e1d2" }}>
                  {p.icon}
                  <h3 className="font-bold text-slate-900 text-sm">{p.t}</h3>
                </div>
              ))}
            </div>

            {/* Center: Hub */}
            <div className="relative flex items-center">
              <div className="hidden md:block absolute top-1/2 -left-6 -right-6 h-px -z-10 transform -translate-y-1/2" style={{ background: "#e8e1d2" }} />
              <div className="hidden md:block absolute top-1/2 -left-6 -right-6 -z-10 transform -translate-y-1/2 flex justify-between">
                {Array.from({ length: 22 }).map((_, i) => (
                  <span key={i} className="inline-block w-1 h-1 rounded-full"
                        style={{ background: i % 2 === 0 ? "#d4cdb8" : "transparent" }} />
                ))}
              </div>
              <div className="w-full text-white p-8 py-12 text-center relative z-10 shadow-2xl rounded-md"
                   style={{ background: accent.c900 }}>
                <MapleLeaf className="w-12 h-12 mx-auto mb-4" style={{ color: accent.c400 }} />
                <h3 className="text-2xl font-bold mb-2 tracking-tight"
                    style={{ fontFamily: displayFont, fontWeight: 500 }}>
                  Care Hub
                </h3>
                <p className="text-sm" style={{ color: accent.c100, opacity: 0.85 }}>
                  Contracting · Billing · Clinical · Data
                </p>
                <div className="mt-6 pt-6 border-t font-mono text-[10px] uppercase tracking-[0.22em] flex justify-center gap-2"
                     style={{ borderColor: "rgba(255,255,255,0.15)", color: accent.c400 }}>
                  <span>For plans</span><span style={{ opacity: 0.5 }}>·</span><span>For counties</span><span style={{ opacity: 0.5 }}>·</span><span>For CBOs</span>
                </div>
              </div>
            </div>

            {/* Right: Providers */}
            <div className="space-y-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] mb-3 text-right" style={{ color: "#7a7060" }}>Providers</div>
              {[
                { icon: <Users className="w-5 h-5" style={{ color: "#7a7060" }} />, t: "Community-Based Organizations" },
                { icon: <Scale className="w-5 h-5" style={{ color: "#7a7060" }} />, t: "Justice Partners" }
              ].map((p) => (
                <div key={p.t} className="p-6 border rounded-md flex items-center gap-4 flex-row-reverse text-right" style={{ background: "#fbf7ed", borderColor: "#e8e1d2" }}>
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
      tone: "#b8525a",
      audience: "Hospitals",
      headline: "The discharge isn't the end.",
      body: "When a hub is in place, somebody meets a person at the door, drives them home, makes sure the meds are filled, and checks in next Tuesday."
    },
    {
      tone: "#3a8a8a",
      audience: "Clinics",
      headline: "The steady door for primary care.",
      body: "FQHCs, rural clinics, free clinics — the trusted places people come back to. CareHub helps clinics wrap care management and community supports around the visit, so the work doesn't end at the exam room."
    },
    {
      tone: "#c69b56",
      audience: "Schools",
      headline: "Care that meets kids where they spend their day.",
      body: "Half the kids who need a doctor only see one if you bring care to the cafeteria. We help schools connect families to Medi-Cal and the supports they already qualify for."
    },
    {
      tone: "#2c6e5b",
      audience: "Community-Based Organizations",
      headline: "You already know everyone's name.",
      body: "The rides, the meals, the calls, the follow-up — CareHub turns the work you already do into reimbursable enhanced care. Same work. Real pay."
    },
    {
      tone: "#3f5c8a",
      audience: "Counties",
      headline: "The front door of the safety net.",
      body: "Eligibility, public health, behavioral health — county teams hold a lot. We help you hand off to community partners with nobody falling through."
    },
    {
      tone: "#7b4a8a",
      audience: "Justice partners",
      headline: "The handoff has to be ready at the gate.",
      body: "Pretrial Services, Probation Departments, re-entry programs — the day someone gets out is the day care has to be in place. CareHub turns Justice-Involved (JI) services into reimbursable enhanced care so the handoff actually holds."
    },
    {
      tone: "#7b4a8a",
      audience: "Health plans",
      headline: "Mandates don't deliver care. Communities do.",
      body: "We translate enhanced-care benefits into actual care on the ground — and bring the documentation back in compliant 837 form."
    }
  ];

  return (
    <section id="roles" className="py-24 md:py-28 px-6 border-t" style={{ background: "#fbf7ed", borderColor: "#e8e1d2" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="md:col-span-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: accent.c700 }}>
              Together
            </span>
            <h2
              className="mt-4 text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.03]"
              style={{ fontFamily: displayFont }}
            >
              Together we can build <span style={{ color: LOGO_COLORS.deep, fontStyle: "italic", fontWeight: 500 }}>healthy communities</span> — and keep people <span style={{ color: LOGO_COLORS.deep, fontStyle: "italic", fontWeight: 500 }}>out</span> of the hospital and out of incarceration.
            </h2>
          </div>
          <div className="md:col-span-4 md:pt-4">
            <p className="text-lg leading-relaxed" style={{ color: "#3a2f24" }}>
              Nobody can pull this off alone. Hospitals, clinics, schools, community-based organizations, counties, justice partners, and health plans — everybody holds a piece. The work is to pull together.
            </p>
          </div>
        </div>

        {/* Community directory — soft cards, no hard stripes */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((r) => (
            <li
              key={r.audience}
              className="p-7 flex flex-col"
              style={{
                background: "#ffffff",
                border: "1px solid #e8e1d2",
                borderRadius: 6,
                boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 14px 30px -22px rgba(60,40,12,0.18)"
              }}
            >
              {/* warm colored mark — circle blob */}
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="inline-block"
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: r.tone
                  }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#a8a092" }}>
                  For
                </span>
              </div>

              <h3
                className="text-2xl tracking-tight mb-3"
                style={{ fontFamily: displayFont, fontWeight: 600, color: "#221b14" }}
              >
                {r.audience}
              </h3>

              <p
                className="text-[16px] leading-snug mb-4"
                style={{ fontFamily: displayFont, fontStyle: "italic", fontWeight: 400, color: "#3a2f24" }}
              >
                {r.headline}
              </p>

              <p className="text-[14px] leading-relaxed flex-1" style={{ color: "#5e554a" }}>
                {r.body}
              </p>

              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold transition-colors"
                style={{ color: "#221b14" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = r.tone)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#221b14")}
              >
                <span className="border-b pb-0.5" style={{ borderColor: "#d4cdb8" }}>Say hello</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </li>
          ))}
        </ul>

        {/* Closing line */}
        <div className="mt-14 max-w-3xl">
          <p
            className="text-xl md:text-2xl leading-[1.4]"
            style={{ fontFamily: displayFont, fontWeight: 400, color: "#221b14" }}
          >
            Not "stakeholders." <span style={{ color: LOGO_COLORS.deep, fontStyle: "italic" }}>Community partners</span> — doing the same work, just shared.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer({ accent, displayFont }) {
  return (
    <footer id="contact" className="text-white py-24 px-6" style={{ background: "#1d2a23" }}>
      <div className="max-w-5xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: accent.c400 }}>
          Contact
        </span>
        <h2 className="text-4xl md:text-6xl font-bold mt-3 mb-8 tracking-tight max-w-3xl"
            style={{ fontFamily: displayFont }}>
          Let's work together to build <span style={{ color: LOGO_COLORS.light, fontStyle: "italic", fontWeight: 500 }}>healthy communities</span>.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
          Whether you're a hospital, clinic, school, community-based organization, county agency, or Medi-Cal Managed Care Plan — CareHub provides the support communities need to deliver on the promise of enhanced care.
        </p>

        <div className="mb-16 max-w-sm">
          <div className="p-6 border rounded-md" style={{ borderColor: "#34423c", background: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
                 style={{ color: accent.c400 }}>
              <Mail className="w-4 h-4" /><span>Email</span>
            </div>
            <p className="text-white">partners@carehub.org</p>
          </div>
        </div>

        <a href="mailto:partners@carehub.org"
           className="inline-flex items-center gap-3 font-bold py-5 px-10 transition-all hover:-translate-y-0.5 rounded-md"
           style={{ background: accent.c600, color: "#fff" }}>
          Partner with us <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t"
           style={{ borderColor: "#34423c", color: "#8a8474" }}>
        <p className="text-xs leading-relaxed max-w-3xl mb-6">
          CareHub is a program of Maple Community Care Hub, a California nonprofit public benefit corporation.
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0 flex items-center gap-2.5">
            <svg viewBox="0 0 36 32" className="w-7 h-6" aria-hidden="true">
              <g style={{ mixBlendMode: "screen" }}>
                <circle cx="18" cy="10" r="9" fill={LOGO_COLORS.light} />
                <circle cx="11" cy="21" r="9" fill={LOGO_COLORS.mid} fillOpacity="0.85" />
                <circle cx="25" cy="21" r="9" fill="#fbf7ed" fillOpacity="0.35" />
              </g>
            </svg>
            <span><span className="font-bold" style={{ color: "#c4bdab" }}>CareHub</span> &nbsp;·&nbsp; carehub.org &copy; 2026</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
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
            { value: "maple", label: "Maple" },
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

  const { WhereHealthHappens, GroundedInEvidence, TheGap, GroundedInPolicy, WhatThatMeans } = window;

  return (
    <div className="min-h-screen text-slate-900" style={{ background: "#fbf7ed" }}>
      <Nav accent={accent} />
      <Hero accent={accent} displayFont={displayFont} darkHero={t.darkHero} />
      <WhereHealthHappens accent={accent} displayFont={displayFont} />
      <GroundedInEvidence accent={accent} displayFont={displayFont} />
      <TheGap accent={accent} displayFont={displayFont} />
      <GroundedInPolicy accent={accent} displayFont={displayFont} />
      <WhatThatMeans accent={accent} displayFont={displayFont} />
      <HowWeGotHere />
      <Roles accent={accent} displayFont={displayFont} />
      <Footer accent={accent} displayFont={displayFont} />
      <Tweaks t={t} setTweak={setTweak} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
