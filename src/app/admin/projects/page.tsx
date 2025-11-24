import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import DeleteProjectButton from "./delete-button"

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" }
  })

  return (
    <div className="py-20 min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 xs:px-3 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h1 className="text-lg xs:text-xl sm:text-2xl font-semibold leading-tight">Projects</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 truncate">
              Manage your projects — create, update or remove projects.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center px-3 py-2 rounded-md bg-purple-600 text-white text-sm"
            >
              New Project
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="flex flex-col sm:flex-row gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm"
              aria-labelledby={`proj-${p.id}-title`}
            >
              {p.image ? (
                <div className="shrink-0 w-full sm:w-28 h-20 sm:h-20 rounded overflow-hidden bg-slate-100 dark:bg-slate-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title} className="object-cover w-full h-full" />
                </div>
              ) : (
                <div className="shrink-0 w-full sm:w-28 h-20 sm:h-20 rounded flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-sm text-slate-600 dark:text-slate-300">
                  No image
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3 id={`proj-${p.id}-title`} className="text-sm sm:text-base font-medium truncate">
                    {p.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                    {p.category} • {(p.technologies ?? []).slice(0, 4).join(", ")}
                  </p>

                  {p.description && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-h-14 overflow-hidden">
                      {p.description}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex gap-2 items-center">
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="inline-flex items-center px-3 py-1 rounded-md border text-sm"
                      aria-label={`Edit ${p.title}`}
                    >
                      Edit
                    </Link>

                    <DeleteProjectButton id={p.id} />
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 sm:mt-0">
                    {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ""}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {projects.length === 0 && (
          <div className="mt-6 p-6 text-center text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-2xl">
            No projects yet. <Link href="/admin/projects/new" className="underline">Add your first project</Link>.
          </div>
        )}
      </div>
    </div>
  )
}
