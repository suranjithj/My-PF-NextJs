"use client";

import { useEffect, useRef } from "react";

const reasons = [
  {
    number: "01",
    title: "Modern Technology Stack",
    desc: "We build with Next.js, React, Laravel, and the latest tools, ensuring your product is fast, secure, and future-ready.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Design + Dev Under One Roof",
    desc: "No handoffs, no miscommunication. Our team handles UI/UX design and development together for seamless execution.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Clean Architecture",
    desc: "We follow best practices in code structure and system design so your product is easy to maintain, extend, and scale.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Performance Optimized",
    desc: "Every application we deliver is optimized for speed, SEO, and smooth performance across all devices.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Transparent Communication",
    desc: "We keep you in the loop at every stage. No surprises, just clear progress updates and open collaboration.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Ongoing Support",
    desc: "Our relationship doesn't end at launch. We provide maintenance, updates, and technical support to keep you running.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-in-why").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 100);
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
      id="why-us"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#020e24" }}
    >
      {/* Glow accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="fade-in-why inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase mb-5 border"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "all 0.6s ease",
              backgroundColor: "rgba(37,99,235,0.1)",
              borderColor: "rgba(37,99,235,0.25)",
              color: "#60a5fa",
            }}
          >
            Why Choose Us
          </div>
          <h2
            className="fade-in-why font-bold leading-tight mb-4"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "all 0.6s ease",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#f1f5f9",
            }}
          >
            Why Businesses Choose{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563eb, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DevLynx
            </span>
          </h2>
          <p
            className="fade-in-why max-w-xl mx-auto"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "all 0.6s ease",
              color: "#64748b",
              lineHeight: "1.8",
            }}
          >
            We don&apos;t just write code, we build partnerships. Here&apos;s what sets us apart from the rest.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.number}
              className="fade-in-why relative p-7 rounded-2xl border group cursor-default transition-all duration-300 hover:-translate-y-1"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `all 0.6s ease ${i * 0.08}s`,
                backgroundColor: "rgba(30,41,59,0.4)",
                borderColor: "rgba(37,99,235,0.15)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(37,99,235,0.45)";
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(37,99,235,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(37,99,235,0.15)";
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(30,41,59,0.4)";
              }}
            >
              {/* Number watermark */}
              <span
                className="absolute top-5 right-6 text-5xl font-black select-none pointer-events-none"
                style={{ color: "rgba(37,99,235,0.08)", lineHeight: 1 }}
              >
                {r.number}
              </span>

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(37,99,235,0.15)", color: "#60a5fa" }}
              >
                {r.icon}
              </div>
              <h3 className="font-semibold mb-3" style={{ color: "#e2e8f0", fontSize: "1.05rem" }}>
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}