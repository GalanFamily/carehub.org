// HowWeGotHere — scroll-pinned, 5-chapter narrative.
// Outer container is 6 * 100vh tall (1 anchor + 5 chapter steps).
// A sticky h-screen viewport pins inside, and chapter activity is
// driven by the outer container's scroll progress.

const { useRef, useEffect, useState } = React;

const CHAPTERS = [
  {
    year: "1965",
    tag: "Origins",
    title: "Care meant clinical care.",
    lede: "Medicaid is signed into law. The American definition of health is anchored to hospitals, prescriptions, and licensed providers.",
    stat: "≈100%",
    statLabel: "of reimbursable services delivered in clinical settings",
    body: "For half a century, social conditions like housing and food access sat outside the boundary of what insurance would pay for — even as evidence mounted that they shaped outcomes far more than any office visit.",
    bg: "#f5f1e8",      // warm cream
    fg: "#1a1a1a",
    accent: "#7a5b2e",  // ochre
    mute: "#6b5a3e"
  },
  {
    year: "2010s",
    tag: "The data shifts",
    title: "Half of health happens outside the clinic.",
    lede: "Decades of population-health research converge on a single, uncomfortable number.",
    stat: "50%",
    statLabel: "of health outcomes driven by Health-Related Social Needs (HRSNs)",
    body: "Housing instability, food insecurity, justice involvement, and community safety move from the margins of policy to its center. The question becomes: who pays for it — and who is allowed to deliver it?",
    bg: "#e8efe8",
    fg: "#0e1a14",
    accent: "#0f766e",
    mute: "#3f5a52"
  },
  {
    year: "2022",
    tag: "California rewrites the rules",
    title: "CalAIM redefines what Medi-Cal pays for.",
    lede: "Enhanced Care Management. Community Supports. Housing navigation. Recuperative care. Suddenly: reimbursable.",
    stat: "14",
    statLabel: "new community-based services Medi-Cal Managed Care Plans can now cover",
    body: "California becomes the first state to fold a broad menu of social services into the Medicaid benefit. Managed Care Plans are required to contract for them. The infrastructure to deliver them, however, does not yet exist.",
    bg: "#0f766e",
    fg: "#f4fbf9",
    accent: "#ffffff",
    mute: "#bce3dd"
  },
  {
    year: "2024",
    tag: "A new workforce",
    title: "Community-based orgs become providers.",
    lede: "The Justice-Involved Initiative removes traditional licensure barriers. Peer navigators, reentry coaches, and CBOs can deliver — and bill for — enhanced care.",
    stat: "200K+",
    statLabel: "Californians eligible for pre-release Medi-Cal services",
    body: "Trust, language, geography, and lived experience become payable competencies. The frontline of Medi-Cal is no longer just hospitals — it's the organizations communities already turn to.",
    bg: "#1f2937",
    fg: "#f8fafc",
    accent: "#5eead4",
    mute: "#94a3b8"
  },
  {
    year: "Today",
    tag: "The opportunity",
    title: "Policy has outpaced infrastructure.",
    lede: "Hospitals run readmissions working groups. CBOs hold the relationships. Counties hold the safety net. They don't yet hold each other.",
    stat: "25%",
    statLabel: "reduction in inpatient utilization when community partners are integrated into transitions of care (JGIM, 2025)",
    body: "Care Hub stitches the pieces together — contracting, billing, clinical, and data exchange — so the people who can deliver enhanced community care actually can.",
    bg: "#0b1220",
    fg: "#f8fafc",
    accent: "#5eead4",
    mute: "#94a3b8"
  }
];

function HowWeGotHere() {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0..(CHAPTERS.length)
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? (scrolled / total) * CHAPTERS.length : 0;
        setProgress(p);
        const idx = Math.min(CHAPTERS.length - 1, Math.floor(p));
        setActive(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Outer height: 1 intro screen + 1 screen per chapter to dwell on
  const stepsVh = CHAPTERS.length * 110; // 110vh per chapter for breathing room
  const ch = CHAPTERS[active];

  // local progress within the active chapter (0..1)
  const local = Math.min(1, Math.max(0, progress - active));

  return (
    <section
      id="story"
      ref={wrapRef}
      className="relative"
      style={{ height: `${stepsVh}vh`, background: ch.bg, transition: "background 700ms cubic-bezier(.4,0,.2,1)" }}
      data-screen-label="04 How We Got Here"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ color: ch.fg }}>
        {/* Hairline frame */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: ch.fg, opacity: 0.12 }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: ch.fg, opacity: 0.12 }} />
        </div>

        {/* Top eyebrow strip */}
        <div className="absolute top-0 left-0 right-0 px-6 md:px-12 py-5 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] font-mono"
             style={{ color: ch.mute }}>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: ch.accent }} />
            <span>How We Got Here</span>
          </div>
          <div className="hidden md:block">Chapter {String(active + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}</div>
        </div>

        {/* Main grid */}
        <div className="h-full w-full max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 items-center pt-14 pb-20">

          {/* Left rail: chapter list (desktop) */}
          <div className="hidden md:block md:col-span-3">
            <ol className="space-y-5">
              {CHAPTERS.map((c, i) => {
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <li key={c.year} className="flex items-start gap-3">
                    <div className="mt-2 flex-shrink-0 w-6 text-right">
                      <span
                        className="inline-block h-px transition-all duration-500"
                        style={{
                          width: isActive ? 24 : isDone ? 16 : 8,
                          background: ch.fg,
                          opacity: isActive ? 1 : isDone ? 0.55 : 0.25
                        }}
                      />
                    </div>
                    <div className="font-mono text-xs leading-snug transition-opacity"
                         style={{ opacity: isActive ? 1 : 0.45 }}>
                      <div className="font-bold tracking-wider">{c.year}</div>
                      <div className="uppercase tracking-[0.18em] mt-0.5" style={{ color: ch.mute }}>{c.tag}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Center: title + body */}
          <div className="md:col-span-5 relative">
            <div className="font-mono text-xs uppercase tracking-[0.22em] mb-6" style={{ color: ch.accent }}>
              <span className="inline-block border px-2 py-1" style={{ borderColor: ch.accent, color: ch.accent }}>
                {ch.year} · {ch.tag}
              </span>
            </div>
            <h2
              className="font-bold tracking-tight leading-[1.05] text-[clamp(2.25rem,5vw,4.25rem)] mb-6"
              style={{ fontFamily: "var(--display-font, 'Fraunces', 'Georgia', serif)" }}
            >
              {ch.title}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-6 max-w-xl" style={{ color: ch.fg, opacity: 0.9 }}>
              {ch.lede}
            </p>
            <p className="text-sm md:text-base leading-relaxed max-w-xl" style={{ color: ch.mute }}>
              {ch.body}
            </p>
          </div>

          {/* Right: BIG stat */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center">
            <div className="w-full md:max-w-xs">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2" style={{ color: ch.mute }}>
                The number
              </div>
              <div
                className="font-black leading-none tracking-tight tabular-nums"
                style={{
                  color: ch.accent,
                  fontSize: "clamp(5rem, 13vw, 11rem)",
                  letterSpacing: "-0.04em"
                }}
              >
                {ch.stat}
              </div>
              <div className="h-px my-4 w-full" style={{ background: ch.fg, opacity: 0.2 }} />
              <p className="text-sm leading-snug" style={{ color: ch.mute }}>
                {ch.statLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 md:px-12 pb-5">
            <div className="grid grid-cols-5 gap-1.5">
              {CHAPTERS.map((c, i) => {
                let fill = 0;
                if (i < active) fill = 1;
                else if (i === active) fill = local;
                return (
                  <div key={i} className="h-[3px] relative overflow-hidden"
                       style={{ background: `${ch.fg}22` }}>
                    <div className="absolute inset-y-0 left-0"
                         style={{
                           width: `${fill * 100}%`,
                           background: ch.accent,
                           transition: i === active ? "none" : "width 400ms ease"
                         }} />
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em]"
                 style={{ color: ch.mute }}>
              <span>Scroll to advance</span>
              <span>{ch.year}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.HowWeGotHere = HowWeGotHere;
