"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import { Github, ExternalLink, ArrowLeft, Filter } from "lucide-react"
import Link from "next/link"
import { ExpandableCard } from "@/src/components/ui/expandable-card"

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err)
        setLoading(false)
      })
  }, [])

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(
      new Set(projects.map((p) => p.category).filter(Boolean))
    )
  }, [projects])

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") {
      return projects
    }
    return projects.filter((p) => p.category === selectedCategory)
  }, [selectedCategory, projects])

  return (
    <div className="min-h-screen bg-linear-to-b pt-16 from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="mx-4 md:mx-8 lg:mx-36">
        {/* Header */}
        <header className="py-8 px-4 border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                All Projects
              </h1>
              <p className="text-gray-300 text-lg">
                Explore my complete portfolio of projects
              </p>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Filter size={20} className="text-purple-400" />
                  <h2 className="text-xl font-semibold">Filter by Category</h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === "all"
                        ? "bg-linear-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    All ({projects.length})
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-linear-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      {category} (
                      {projects.filter((p) => p.category === category).length})
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Projects Grid */}
            {loading ? (
              <div className="text-center text-gray-400 py-20">
                Loading projects...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center text-gray-400 py-20">
                No projects found in this category.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group"
                  >
                    <ExpandableCard
                      title={project.title}
                      src={project.image || "/images/placeholder.png"}
                      description=""
                      badge={project.featured ? "Featured" : undefined}
                      category={project.category}
                    >
                      {/* Expanded content */}
                      <div className="p-4">
                        {/* Category Badge (if not in props) */}
                        {project.category && (
                          <div className="mb-3">
                            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/30 text-purple-200">
                              {project.category}
                            </span>
                          </div>
                        )}

                        {/* Description */}
                        <p className="text-sm text-gray-300 mb-4">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies?.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                            >
                              <Github size={18} />
                              <span className="text-sm">Code</span>
                            </a>
                          )}

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                            >
                              <ExternalLink size={18} />
                              <span className="text-sm">Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </ExpandableCard>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}