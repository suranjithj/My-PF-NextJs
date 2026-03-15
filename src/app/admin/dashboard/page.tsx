import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import SignOutButton from "../dashboard/signout-button"

const navLinks = [
  { label: "Overview",        href: "/admin/dashboard" },
  { label: "Projects",        href: "/admin/projects" },
  { label: "Services",        href: "/admin/services" },
  { label: "Case Studies",    href: "/admin/case-studies" },
  { label: "Contacts",        href: "/admin/contacts" },
  { label: "Settings",        href: "/admin/settings" },
]

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return redirect("/admin/login")

  const user = session.user

  const [projectsCount, servicesCount, contactsCount] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.contact.count(),
  ])

  const stats = [
    {
      label: "Projects",
      value: projectsCount,
      href: "/admin/projects",
      action: "Manage",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        </svg>
      ),
    },
    {
      label: "Services",
      value: servicesCount,
      href: "/admin/services",
      action: "Manage",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
    },
    {
      label: "Contacts",
      value: contactsCount,
      href: "/admin/contacts",
      action: "View",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      label: "Case Studies",
      value: "—",
      href: "/admin/case-studies",
      action: "Manage",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      ),
    },
  ]

  const quickActions = [
    { label: "New Project",    href: "/admin/projects/new",     primary: true },
    { label: "New Service",    href: "/admin/services/new",     primary: false },
    { label: "New Case Study", href: "/admin/case-studies/new", primary: false },
    { label: "View Contacts",  href: "/admin/contacts",         primary: false },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#001436" }}>

      {/* ── Header ── */}
      <header
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{
          backgroundColor: "rgba(0,20,54,0.95)",
          borderColor: "rgba(37,99,235,0.15)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        {/* Logo + title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image src="/DevLynxLogo.png" alt="DevLynx" fill className="object-contain" />
            </div>
            <span className="font-bold text-lg" style={{ color: "#f1f5f9" }}>
              Dev<span style={{ color: "#2563eb" }}>Lynx</span>
            </span>
          </div>
          <div
            className="hidden sm:block w-px h-6"
            style={{ backgroundColor: "rgba(37,99,235,0.2)" }}
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>Admin Dashboard</p>
            <p className="text-xs" style={{ color: "#dfe8f1" }}>
              Welcome back, {user?.name ?? user?.email}
            </p>
          </div>
        </div>

        {/* Right: user info + actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-medium" style={{ color: "#cbd5e1" }}>{user?.name ?? "—"}</span>
            <span className="text-xs" style={{ color: "#dfe8f1" }}>{user?.email}</span>
          </div>

          <Link
            href="/"
            className="px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "rgba(37,99,235,0.1)",
              borderColor: "rgba(37,99,235,0.3)",
              color: "#60a5fa",
            }}
          >
            View Site
          </Link>

          <SignOutButton />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Nav tabs ── */}
        <nav className="mb-8 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 whitespace-nowrap hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-600/40"
                style={{
                  backgroundColor: "rgba(37,99,235,0.08)",
                  borderColor: "rgba(37,99,235,0.2)",
                  color: "#94a3b8",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* ── Stats cards ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/40 hover:bg-blue-600/8"
              style={{
                backgroundColor: "rgba(30,41,59,0.5)",
                borderColor: "rgba(37,99,235,0.15)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(37,99,235,0.15)", color: "#60a5fa" }}
              >
                {stat.icon}
              </div>
              <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "#dfe8f1" }}>
                {stat.label}
              </p>
              <p className="text-3xl font-bold mb-3" style={{ color: "#f1f5f9" }}>
                {stat.value}
              </p>
              <Link
                href={stat.href}
                className="text-xs font-medium transition-colors hover:underline"
                style={{ color: "#2563eb" }}
              >
                {stat.action} →
              </Link>
            </div>
          ))}
        </section>

        {/* ── Bottom grid: Quick actions + Recent activity ── */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Quick actions */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: "rgba(30,41,59,0.5)",
              borderColor: "rgba(37,99,235,0.15)",
            }}
          >
            <h3 className="font-semibold mb-4" style={{ color: "#f1f5f9" }}>Quick Actions</h3>
            <div className="flex flex-col gap-2">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02] border"
                  style={
                    action.primary
                      ? {
                          backgroundColor: "#2563eb",
                          borderColor: "#2563eb",
                          color: "#fff",
                          boxShadow: "0 0 16px rgba(37,99,235,0.3)",
                        }
                      : {
                          backgroundColor: "rgba(37,99,235,0.08)",
                          borderColor: "rgba(37,99,235,0.2)",
                          color: "#94a3b8",
                        }
                  }
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div
            className="md:col-span-3 p-6 rounded-2xl border"
            style={{
              backgroundColor: "rgba(30,41,59,0.5)",
              borderColor: "rgba(37,99,235,0.15)",
            }}
          >
            <h3 className="font-semibold mb-4" style={{ color: "#f1f5f9" }}>Recent Activity</h3>
            <div
              className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed"
              style={{ borderColor: "rgba(37,99,235,0.15)" }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#334155"
                strokeWidth="1.5"
                className="mb-3"
              >
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <p className="text-sm" style={{ color: "#dfe8f1" }}>No recent activity yet.</p>
              <p className="text-xs mt-1" style={{ color: "#f1dfe8" }}>
                Activity logs will appear here once you start managing content.
              </p>
            </div>
          </div>

        </section>
      </div>
    </div>
  )
}