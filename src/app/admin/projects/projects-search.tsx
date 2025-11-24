"use client"

import React from "react"
import Link from "next/link"

export type Project = {
  id: string
  title: string
  description?: string | null
  image?: string | null
  category?: string | null
  technologies?: string[] | null
  createdAt: string
}

type Props = {
  initial: Project[]
}

export default function ProjectsSearch({ initial }: Props) {
  const [query, setQuery] = React.useState<string>("")
  const [items, setItems] = React.useState<Project[]>(initial)

  React.useEffect(() => {
    if (!query) {
      setItems(initial)
      return
    }
    const q = query.toLowerCase()
    setItems(
      initial.filter((p) => {
        const title = p.title?.toLowerCase() ?? ""
        const category = p.category?.toLowerCase() ?? ""
        const techs = (p.technologies ?? []).join(", ").toLowerCase()
        return title.includes(q) || category.includes(q) || techs.includes(q)
      })
    )
  }, [query, initial])

  return (
    <div>
      <div className="mb-4 flex gap-3 items-center">
        <label htmlFor="project-search" className="sr-only">Search projects</label>
        <input
          id="project-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects by title, category or tech"
          className="flex-1 min-w-0 px-3 py-2 rounded-md border bg-white dark:bg-slate-800 text-sm"
        />
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center px-3 py-2 rounded-md bg-purple-600 text-white text-sm"
          aria-label="Create new project"
        >
          New
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 xs:gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
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

                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 sm:mt-0">
                  {new Date(p.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </article>
        ))}

        {items.length === 0 && (
          <div className="col-span-full p-6 text-center text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-2xl">
            No projects found. <Link href="/admin/projects/new" className="underline">Add your first project</Link>.
          </div>
        )}
      </div>
    </div>
  )
}
