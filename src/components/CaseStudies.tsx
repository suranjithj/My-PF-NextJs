"use client";

import { useEffect, useRef, useState } from "react";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  imageUrl?: string;
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/case-studies")
      .then((r) => r.json())
      .then((data) => {
        setCaseStudies(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-cs").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#020e24" }}
    >
      <div
        className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translateY(-50%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="fade-cs inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase mb-5 border"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "all 0.6s ease",
              backgroundColor: "rgba(37,99,235,0.1)",
              borderColor: "rgba(37,99,235,0.25)",
              color: "#60a5fa",
            }}
          >
            Case Studies
          </div>
          <h2
            className="fade-cs font-bold leading-tight mb-4"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "all 0.6s ease",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#f1f5f9",
            }}
          >
            Real Problems.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563eb, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Real Results.
            </span>
          </h2>
          <p
            className="fade-cs max-w-lg mx-auto"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "all 0.6s ease",
              color: "#64748b",
              lineHeight: "1.8",
            }}
          >
            See how we&apos;ve helped businesses transform their digital presence and solve real challenges.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div
              className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{ borderColor: "rgba(37,99,235,0.2)", borderTopColor: "#2563eb" }}
            />
          </div>
        )}

        {/* Empty state */}
        {!loading && caseStudies.length === 0 && (
          <div
            className="fade-cs text-center py-20 rounded-2xl border"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "all 0.6s ease",
              borderColor: "rgba(37,99,235,0.15)",
              backgroundColor: "rgba(30,41,59,0.3)",
            }}
          >
            <div className="text-4xl mb-4">📂</div>
            <p style={{ color: "#475569" }}>Case studies coming soon.</p>
          </div>
        )}

        {/* Case study cards */}
        {!loading && caseStudies.length > 0 && (
          <div className="space-y-6">
            {caseStudies.map((cs, i) => (
              <div
                key={cs.id}
                className="fade-cs rounded-2xl border overflow-hidden transition-all duration-300"
                style={{
                  opacity: 0,
                  transform: "translateY(24px)",
                  transition: `all 0.6s ease ${i * 0.1}s`,
                  backgroundColor: "rgba(30,41,59,0.5)",
                  borderColor: active === cs.id ? "rgba(37,99,235,0.5)" : "rgba(37,99,235,0.15)",
                }}
              >
                {/* Header row */}
                <button
                  className="w-full text-left p-7 flex items-start justify-between gap-6 transition-colors"
                  onClick={() => setActive(active === cs.id ? null : cs.id)}
                  style={{ backgroundColor: "transparent" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium border"
                        style={{ color: "#60a5fa", borderColor: "rgba(37,99,235,0.3)", backgroundColor: "rgba(37,99,235,0.08)" }}
                      >
                        {cs.industry}
                      </span>
                      <span className="text-xs" style={{ color: "#475569" }}>{cs.client}</span>
                    </div>
                    <h3 className="text-xl font-semibold" style={{ color: "#f1f5f9" }}>{cs.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {cs.tags?.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(37,99,235,0.1)", color: "#93c5fd" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className="shrink-0 mt-1 transition-transform duration-300"
                    style={{
                      color: "#60a5fa",
                      transform: active === cs.id ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {/* Expanded content */}
                {active === cs.id && (
                  <div className="px-7 pb-7 grid md:grid-cols-3 gap-6 border-t" style={{ borderColor: "rgba(37,99,235,0.1)" }}>
                    {[
                      { label: "Challenge", text: cs.challenge, icon: "⚡" },
                      { label: "Solution", text: cs.solution, icon: "🛠" },
                      { label: "Result", text: cs.result, icon: "✅" },
                    ].map((item) => (
                      <div key={item.label} className="pt-6">
                        <div className="text-xl mb-2">{item.icon}</div>
                        <h4 className="font-semibold text-sm mb-2" style={{ color: "#60a5fa" }}>{item.label}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}