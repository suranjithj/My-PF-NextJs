"use client";

import { useEffect, useRef, useState } from "react";

const packages = [
  {
    name: "Dev Starter",
    tag: "Package 1",
    subtitle: "Front-End",
    price: "Contact us for Quote",
    support: "3-Months Maintenance Support",
    highlight: false,
    color: "#3b82f6",
    features: [
      "Modern and responsive website design",
      "Mobile, tablet, and desktop friendly",
      "Up to 5 pages or Single page with 5 sections",
      "Contact form with email integration (Optional)",
      "Basic SEO setup",
      "Social media links integration",
      "Fast loading and optimized performance",
      "Google Maps location integration (Optional)",
    ],
  },
  {
    name: "Dev Plus",
    tag: "Package 2",
    subtitle: "Front-End + Admin Panel",
    price: "Contact us for Quote",
    support: "6-Months Maintenance Support",
    highlight: true,
    color: "#2563eb",
    features: [
      "Everything included in Dev Starter",
      "Custom admin panel",
      "Easy content management",
      "Add / Update / Delete products or services",
      "Image management",
      "Secure login system for admin",
      "Database integration",
    ],
  },
  {
    name: "Dev Premium",
    tag: "Package 3",
    subtitle: "Front-End + Admin Panel + Analytics + POS",
    price: "Contact us for Quote",
    support: "1 Year Maintenance Support",
    highlight: false,
    color: "#1d4ed8",
    features: [
      "Everything included in Dev Plus",
      "Advanced admin dashboard",
      "Business analytics dashboard",
      "POS system for store management",
      "Product and inventory management",
      "Customer management system (Optional)",
      "Sales reports and performance insights",
      "Priority technical support",
    ],
  },
];

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-pkg").forEach((el, i) => {
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
      id="packages"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#001436" }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="fade-pkg inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase mb-5 border"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "all 0.6s ease",
              backgroundColor: "rgba(37,99,235,0.1)",
              borderColor: "rgba(37,99,235,0.25)",
              color: "#60a5fa",
            }}
          >
            Packages
          </div>
          <h2
            className="fade-pkg font-bold leading-tight mb-4"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "all 0.6s ease",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#f1f5f9",
            }}
          >
            Transparent{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563eb, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Pricing Plans
            </span>
          </h2>
          <p
            className="fade-pkg max-w-lg mx-auto"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "all 0.6s ease",
              color: "#64748b",
              lineHeight: "1.8",
            }}
          >
            Choose the package that fits your needs. All packages include clean code, responsive design, and dedicated support.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              className="fade-pkg relative rounded-2xl border flex flex-col transition-all duration-300"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
                backgroundColor: pkg.highlight
                  ? "rgba(37,99,235,0.12)"
                  : "rgba(30,41,59,0.5)",
                borderColor: pkg.highlight
                  ? "rgba(37,99,235,0.6)"
                  : hovered === i
                  ? "rgba(37,99,235,0.4)"
                  : "rgba(37,99,235,0.15)",
                boxShadow: pkg.highlight
                  ? "0 0 40px rgba(37,99,235,0.2)"
                  : "none",
                marginTop: pkg.highlight ? "-8px" : "0",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Popular badge */}
              {pkg.highlight && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: "#2563eb" }}
                >
                  Most Popular
                </div>
              )}

              <div className="p-8 flex-1">
                {/* Tag + name */}
                <div className="mb-6">
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#475569" }}>
                    {pkg.tag}
                  </span>
                  <h3 className="text-3xl font-bold mt-1 mb-1" style={{ color: "#f1f5f9" }}>{pkg.name}</h3>
                  <p className="text-sm" style={{ color: "#60a5fa" }}>{pkg.subtitle}</p>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-2xl font-black" style={{ color: "#f1f5f9" }}>{pkg.price}</span>
                </div>
                <p className="text-xs mb-8" style={{ color: "#475569" }}>
                  Customization available
                </p>

                {/* Support badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium mb-8 border"
                  style={{
                    color: "#93c5fd",
                    borderColor: "rgba(37,99,235,0.3)",
                    backgroundColor: "rgba(37,99,235,0.08)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  {pkg.support}
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(37,99,235,0.2)" }}
                      >
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-8 pt-0">
                <a
                  href="#contact"
                  className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={
                    pkg.highlight
                      ? { backgroundColor: "#2563eb", color: "#fff", boxShadow: "0 0 20px rgba(37,99,235,0.4)" }
                      : {
                          backgroundColor: "rgba(37,99,235,0.1)",
                          color: "#60a5fa",
                          border: "1px solid rgba(37,99,235,0.3)",
                        }
                  }
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          className="fade-pkg text-center text-xs mt-8"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "all 0.6s ease 0.5s",
            color: "#475569",
          }}
        >
          Domain registration and annual hosting fees are not included. Customization available for your business needs. · Contact:{" "}
          <a href="mailto:devlynxitsolutions@gmail.com" style={{ color: "#60a5fa" }}>
            devlynxitsolutions@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}