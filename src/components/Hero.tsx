"use client";

import { useEffect, useRef, useState } from "react";

const phrases = [
  "Web Applications",
  "E-Commerce Websites",
  "Custom Software",
  "POS Systems",
  "Dashboards & Analytics",
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter effect
  useEffect(() => {
    const current = phrases[currentIndex];
    const speed = isDeleting ? 60 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1));
        if (displayText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(current.slice(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  // Particle network canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37,99,235,${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37,99,235,${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#001436" }}
    >
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-10">
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }} />

      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 65%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, #001436, transparent)" }} />

      <div className="relative z-10 w-full px-6 lg:px-16 py-32">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-md font-medium mb-10 border"
            style={{ backgroundColor: "rgba(37,99,235,0.1)", borderColor: "rgba(37,99,235,0.3)", color: "#93c5fd" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#2563eb" }} />
            Beyond Traditional IT Services
          </div>

          <h1
            className="font-bold leading-tight mb-5 w-full"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            We Are{" "}
            <span style={{ background: "linear-gradient(135deg, #2563eb, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              DevLynx
            </span>
          </h1>

          <h2
            className="font-semibold mb-8 w-full"
            style={{ fontSize: "clamp(1.6rem, 4vw, 3.2rem)", color: "#cbd5e1", letterSpacing: "-0.01em", minHeight: "1.4em" }}
          >
            We Build{" "}
            <span style={{ color: "#60a5fa" }}>
              {displayText}
              <span className="animate-pulse" style={{ color: "#2563eb" }}>|</span>
            </span>
          </h2>

          <p
            className="mb-12 leading-relaxed max-w-3xl"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", color: "#f1f5f9" }}
          >
            DevLynx is a creative development studio that transforms your ideas into{" "}
            <span style={{ fontWeight: "600" }}>scalable, high-performance digital products</span>.
            We combine design, technology, and strategy, so you get a partner, not just a vendor.
          </p>

          <div className="flex flex-wrap justify-center gap-12 mb-14">
            {[
              { value: "100%", label: "Client Satisfaction" },
              { value: "Modern", label: "Tech Stack" },
              { value: "SEO", label: "Friendly" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold" style={{ color: "#2563eb" }}>{stat.value}</div>
                <div className="text-md mt-0.5" style={{ color: "#e2e8f0" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "#2563eb", boxShadow: "0 0 28px rgba(37,99,235,0.45)" }}
            >
              Start Your Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border"
              style={{ color: "#e2e8f0", borderColor: "rgba(203,213,225,0.25)", backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs tracking-widest" style={{ color: "#475569" }}>SCROLL</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}