import Image from "next/image";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Packages", href: "#packages" },
    { label: "Contact", href: "#contact" },
  ],
  Services: [
    { label: "Web Development", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
    { label: "Software Solutions", href: "#services" },
    { label: "Technical Support", href: "#services" },
    { label: "Event & Budget Management", href: "#services" },
  ],
};

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/devlynxitsolutions/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/DevLynxIT/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:devlynxitsolutions@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#000d24", borderTop: "1px solid rgba(37,99,235,0.12)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#hero" className="inline-flex items-center gap-3 mb-5 group">
              <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                <Image src="/DevLynxLogo.png" alt="DevLynx" fill className="object-contain" />
              </div>
              <div>
                <span className="text-xl font-bold" style={{ color: "#f1f5f9" }}>
                  Dev<span style={{ color: "#2563eb" }}>Lynx</span>
                </span>
                <p className="text-xs" style={{ color: "#475569" }}>IT Solutions</p>
              </div>
            </a>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: "#64748b" }}>
              Building beautiful, functional, and scalable digital products for businesses and startups worldwide. Beyond Traditional IT Services.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 border"
                  style={{
                    color: "#60a5fa",
                    borderColor: "rgba(37,99,235,0.2)",
                    backgroundColor: "rgba(37,99,235,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(37,99,235,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(37,99,235,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(37,99,235,0.07)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(37,99,235,0.2)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-sm mb-5 tracking-wide" style={{ color: "#e2e8f0" }}>
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors text-gray-300 duration-200 hover:text-blue-400"
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#64748b")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div
          className="grid sm:grid-cols-3 gap-4 py-8 border-t border-b mb-8"
          style={{ borderColor: "rgba(37,99,235,0.1)" }}
        >
          {[
            { icon: "📧", label: "Email", value: "devlynxitsolutions@gmail.com", href: "mailto:devlynxitsolutions@gmail.com" },
            { icon: "📞", label: "Phone", value: "+94 71 252 5266", href: "tel:+94712525266" },
            { icon: "🌐", label: "Website", value: "devlynx-portfolio.vercel.app", href: "https://devlynx-portfolio.vercel.app" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center justify-center gap-3 group"
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-sm" style={{ color: "#475569" }}>{item.label}</p>
                <p className="text-sm transition-colors group-hover:text-blue-400" style={{ color: "#94a3b8" }}>
                  {item.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-center" style={{ color: "#334155" }}>
            © {new Date().getFullYear()} DevLynx IT Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}