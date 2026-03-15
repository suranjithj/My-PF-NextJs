"use client";

import { useEffect, useRef } from "react";

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Clean & Scalable Code",
    desc: "We write maintainable, well-structured code built to grow with your business.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Efficient Workflows",
    desc: "Streamlined development processes that deliver on time without sacrificing quality.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "User-Centered Design",
    desc: "Every interface we craft is built around real user needs and seamless experiences.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Long-Term Reliability",
    desc: "We build solutions designed for longevity, easy to maintain, extend, and evolve.",
  },
];

const techStack = ["Next.js", "React", "Laravel", "PHP", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-in").forEach((el, i) => {
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
      id="about"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#001436" }}
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section label */}
        <div
          className="fade-in inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase mb-10 border"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "all 0.6s ease",
            backgroundColor: "rgba(37,99,235,0.1)",
            borderColor: "rgba(37,99,235,0.25)",
            color: "#60a5fa",
          }}
        >
          About Us
        </div>

        {/* ── Row 1: About text (left) + Values grid (right) ── */}
        <div className="fade-in grid lg:grid-cols-2 gap-16 items-start mb-12"
          style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}
        >
          {/* Left: About text */}
          <div>
            <h2
              className="font-bold mb-6 leading-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#f1f5f9",
              }}
            >
              A Creative Studio{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #2563eb, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Built for Results
              </span>
            </h2>

            <div className="space-y-4">
              <p style={{ color: "#e2e8f0", lineHeight: "1.8", textAlign: "justify" }}>
                DevLynx is a creative development studio focused on building modern digital solutions for
                businesses, startups, and entrepreneurs around the world. We specialize in designing and
                developing high-quality web applications, business websites, and custom software systems.
              </p>
              <p style={{ color: "#e2e8f0", lineHeight: "1.8", textAlign: "justify" }}>
                Our goal is to help clients transform their ideas into{" "}
                <span style={{ fontWeight: "600" }}>reliable, scalable, and user-friendly</span> digital
                products combining design, technology, and strategy into every build.
              </p>
            </div>
          </div>

          {/* Right: Values grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "rgba(30,41,59,0.5)",
                  borderColor: "rgba(37,99,235,0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(37,99,235,0.5)";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(37,99,235,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(37,99,235,0.15)";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(30,41,59,0.5)";
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(37,99,235,0.15)", color: "#60a5fa" }}
                >
                  {v.icon}
                </div>
                <h4 className="font-semibold mb-2" style={{ color: "#e2e8f0" }}>{v.title}</h4>
                <p className="text-sm leading-relaxed text-justify" style={{ color: "#64748b" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Row 2: Mission & Vision ── */}
        <div
          className="fade-in grid sm:grid-cols-2 gap-6 mb-12"
          style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}
        >
          {[
            {
              title: "Our Mission",
              text: "Help businesses build reliable digital products using modern technologies while maintaining high standards of quality, performance, and usability.",
              icon: "🎯",
            },
            {
              title: "Our Vision",
              text: "Grow into a global creative development studio delivering innovative web solutions for clients worldwide.",
              icon: "🌍",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: "rgba(37,99,235,0.06)",
                borderColor: "rgba(37,99,235,0.2)",
              }}
            >
              <div className="mb-2"></div>
              <h4 className="font-semibold mb-2 text-2xl" style={{ color: "#f1f5f9" }}>{item.icon} {item.title}</h4>
              <p className="text-md leading-relaxed text-justify" style={{ color: "#64748b" }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* ── Row 3: Tech stack — centered, no bg ── */}
        <div
          className="fade-in flex flex-col items-center mb-12"
          style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}
        >
          <p className="text-md font-semibold tracking-widest uppercase mb-4" style={{ color: "#f1f5f9" }}>
            Technologies We Use
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full text-sm font-medium border transition-transform duration-200 hover:scale-105 cursor-default"
                style={{
                  color: "#93c5fd",
                  borderColor: "rgba(37,99,235,0.3)",
                  backgroundColor: "transparent",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Row 4: Founder badge — centered ── */}
        <div
          className="fade-in flex justify-center"
          style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}
        >
          <div
            className="inline-flex items-center gap-4 p-4 rounded-xl border transition-transform duration-300 hover:scale-103 cursor-default"
            style={{
              backgroundColor: "rgba(30,41,59,0.6)",
              borderColor: "rgba(37,99,235,0.2)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
              style={{ backgroundColor: "#2563eb", color: "#fff" }}
            >
              SJ
            </div>
            <div>
              <p className="font-semibold text-md" style={{ color: "#f1f5f9" }}>Suranjith Jayawardhana</p>
              <p className="text-sm" style={{ color: "#60a5fa" }}>Founder & CTO | DevLynx IT Solutions</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}