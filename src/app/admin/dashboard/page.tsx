import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import HoverGlowCard from "@/src/components/ui/HoverGlowCard"
import Link from "next/link"
import SignOutButton from "../dashboard/signout-button"

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/admin/login")
  }

  const user = session.user

  const [usersCount, projectsCount, skillsCount, servicesCount, contactsCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.skill.count(),
      prisma.service.count(),
      prisma.contact.count()
    ])

  const stats = {
    users: usersCount,
    projects: projectsCount,
    skills: skillsCount,
    services: servicesCount,
    contacts: contactsCount
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-semibold leading-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-sm xs:text-sm text-slate-600 dark:text-slate-300 truncate">
            Welcome back, <span className="font-medium">{user?.name ?? user?.email}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden xs:flex xs:flex-col text-right text-sm text-slate-600 dark:text-slate-300">
            <span className="font-medium truncate max-w-40">{user?.name ?? "—"}</span>
            <span className="text-xs truncate max-w-40">{user?.email}</span>
            <span className="text-xs italic mt-1">Role: {user?.role ?? "user"}</span>
          </div>

          <div className="flex xs:hidden items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-300 text-sm font-medium text-slate-800 dark:text-slate-900 shadow">
            {user?.name ? user.name.split(" ").map((s) => s[0]).slice(0,2).join("") : "U"}
          </div>

          <Link
            href="/"
            className="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            Go to Home
          </Link>
          
          <SignOutButton />
        </div>
      </header>

      <div className="mx-auto px-4 xs:px-3 sm:px-6 lg:px-8 mt-8">
        <nav
          className="mb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          aria-label="Admin quick navigation"
        >
          <div className="overflow-x-auto no-scrollbar">
            <ul className="grid grid-flow-col auto-cols-fr gap-3 whitespace-nowrap px-1 sm:px-0">
              <li>
                <Link
                  href="/admin"
                  className="block w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 shadow-sm text-sm text-center 
                            transition-colors duration-400 ease-in-out hover:bg-slate-600 dark:hover:bg-slate-700"
                  aria-current="page"
                >
                  Overview
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/projects"
                  className="block w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 shadow-sm text-sm text-center
                            transition-colors duration-400 ease-in-out hover:bg-slate-600 dark:hover:bg-slate-700"
                >
                  Manage Projects
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/skills"
                  className="block w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 shadow-sm text-sm text-center
                            transition-colors duration-400 ease-in-out hover:bg-slate-600 dark:hover:bg-slate-700"
                >
                  Manage Skills
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/services"
                  className="block w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 shadow-sm text-sm text-center
                            transition-colors duration-400 ease-in-out hover:bg-slate-600 dark:hover:bg-slate-700"
                >
                  Manage Services
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/settings"
                  className="block w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 shadow-sm text-sm text-center
                            transition-colors duration-400 ease-in-out hover:bg-slate-600 dark:hover:bg-slate-700"
                >
                  Settings
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/contacts"
                  className="block w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 shadow-sm text-sm text-center
                            transition-colors duration-400 ease-in-out hover:bg-slate-600 dark:hover:bg-slate-700"
                >
                  Contacts
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/users"
                  className="block w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 shadow-sm text-sm text-center
                            transition-colors duration-400 ease-in-out hover:bg-slate-600 dark:hover:bg-slate-700"
                >
                  Users
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <HoverGlowCard>
            <article className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Total users</div>
                  <div className="mt-1 text-xl sm:text-2xl font-semibold">{stats.users}</div>
                  <div className="text-sm text-slate-500 mt-2">All time</div>
                </div>
              </div>
            </article>
          </HoverGlowCard>

          <HoverGlowCard>
            <article className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Projects</div>
                <div className="mt-1 text-xl sm:text-2xl font-semibold">{stats.projects}</div>
                <div className="text-sm text-slate-500 mt-2">
                  <Link href="/admin/projects" className="underline">Manage</Link>
                </div>
              </div>
            </article>
          </HoverGlowCard>

          <HoverGlowCard>
            <article className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Skills</div>
                <div className="mt-1 text-xl sm:text-2xl font-semibold">{stats.skills}</div>
                <div className="text-sm text-slate-500 mt-2">
                  <Link href="/admin/skills" className="underline">Manage</Link>
                </div>
              </div>
            </article>
          </HoverGlowCard>

          <HoverGlowCard>
            <article className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Services</div>
                <div className="mt-1 text-xl sm:text-2xl font-semibold">{stats.services}</div>
                <div className="text-sm text-slate-500 mt-2">
                  <Link href="/admin/services" className="underline">Manage</Link>
                </div>
              </div>
            </article>
          </HoverGlowCard>

          <HoverGlowCard>
            <article className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Contacts</div>
                <div className="mt-1 text-xl sm:text-2xl font-semibold">{stats.contacts}</div>
                <div className="text-sm text-slate-500 mt-2">
                  <Link href="/admin/contacts" className="underline">View</Link>
                </div>
              </div>
            </article>
          </HoverGlowCard>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <h3 className="font-medium text-base">Quick actions</h3>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/admin/projects/new"
                className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-purple-600 text-white text-sm"
                aria-label="Create project"
              >
                Create project
              </Link>

              <Link
                href="/admin/skills"
                className="inline-flex items-center justify-center px-3 py-2 rounded-md border text-sm"
                aria-label="Add skill"
              >
                Add skill
              </Link>

              <Link
                href="/admin/services/new"
                className="inline-flex items-center justify-center px-3 py-2 rounded-md border text-sm"
                aria-label="Add service"
              >
                Add service
              </Link>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm md:col-span-3">
            <h3 className="font-medium text-base">Recent activity</h3>
            <div className="mt-3 text-sm text-slate-500">
              <p>No recent activity to show. Replace with real feed or activity logs.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}