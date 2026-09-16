// HowWeGotHere — simple horizontal timeline, no scroll-pinning.
// Four California policy milestones leading to community care hubs.

const STEPS = [
  {
    year: "2016",
    pill: "Optional · opt-in",
    title: "Whole Person Care",
    body:
      "California's first attempt to braid clinical and social care for high-need Medi-Cal members. Counties could opt in. Twenty-five did."
  },
  {
    year: "2021",
    pill: "Statewide mandate",
    title: "CalAIM",
    body:
      "What was optional becomes mandatory. Enhanced Care Management and 14 Community Supports become reimbursable benefits across every California county."
  },
  {
    year: "2025",
    pill: "Behavioral health",
    title: "BH-CONNECT",
    body:
      "Behavioral health, CYBHI, and the justice-involved population fold into managed care. The boundary between social, behavioral, and clinical care keeps dissolving."
  },
  {
    year: "Today",
    pill: "Infrastructure",
    title: "Community Care Hubs",
    body:
      "The policy exists. The reimbursement exists. The missing piece is the connective tissue between Medi-Cal Managed Care Plans and the CBOs already doing the work."
  }
];

function HowWeGotHere() {
  // Read theme tokens (set by App via CSS vars) so we stay in sync with Tweaks.
  const displayFont = "var(--display-font, 'Fraunces', 'Georgia', serif)";
  const accent700   = "var(--accent-700, #2c6e5b)";
  const accent400   = "var(--accent-400, #94d4be)";

  return (
    <section
      id="story"
      className="px-6 py-24 md:py-28 border-b"
      style={{ background: "#ffffff", borderColor: "#e8e1d2" }}
      data-screen-label="How We Got Here"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: accent700 }}>
              How we got here
            </span>
            <h2
              className="mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]"
              style={{ fontFamily: displayFont }}
            >
              A short <span style={{ color: accent700, fontStyle: "italic", fontWeight: 500 }}>policy timeline</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-4">
            <p className="text-lg leading-relaxed" style={{ color: "#5e554a" }}>
              Community care hubs aren't a new idea — they're the natural next step in a decade of
              California policy. Four moments tell the story.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* horizontal connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-[34px] left-0 right-0 h-px"
            style={{
              background:
                "repeating-linear-gradient(to right, #d4cdb8 0 6px, transparent 6px 14px)"
            }}
          />

          <ol className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
            {STEPS.map((s, i) => {
              const isLast = i === STEPS.length - 1;
              return (
                <li key={s.year} className="relative">
                  {/* node */}
                  <div className="flex items-center md:block">
                    <div
                      className="relative z-10 flex items-center justify-center"
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: "50%",
                        background: isLast ? accent700 : "#fbf7ed",
                        border: `1.5px solid ${isLast ? accent700 : "#d4cdb8"}`,
                        boxShadow: isLast ? `0 0 0 6px ${accent400}55` : "none"
                      }}
                    >
                      <span
                        className="font-bold tracking-tight"
                        style={{
                          fontFamily: displayFont,
                          fontSize: s.year === "Today" ? 16 : 18,
                          color: isLast ? "#fbf7ed" : "#221b14"
                        }}
                      >
                        {s.year}
                      </span>
                    </div>
                  </div>

                  {/* card */}
                  <div className="mt-6 md:pr-6">
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.22em]"
                      style={{ color: accent700 }}
                    >
                      Step {String(i + 1).padStart(2, "0")} · {s.pill}
                    </span>
                    <h3
                      className="mt-2 text-2xl tracking-tight leading-snug"
                      style={{ fontFamily: displayFont, fontWeight: 600, color: "#221b14" }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="mt-3 text-[15px] leading-relaxed"
                      style={{ color: "#5e554a" }}
                    >
                      {s.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Closing note */}
        <div className="mt-16 pt-6 border-t flex flex-wrap items-center justify-between gap-3"
             style={{ borderColor: "#e8e1d2" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#a8a092" }}>
            California Medicaid · 2016 → today
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: accent700 }}>
            Care Hub · The infrastructure layer
          </span>
        </div>
      </div>
    </section>
  );
}

window.HowWeGotHere = HowWeGotHere;
