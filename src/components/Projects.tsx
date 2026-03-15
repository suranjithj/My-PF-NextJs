"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Github, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ExpandableCard } from "./ui/expandable-card"

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export default function Projects() {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true })
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects?featured=true")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err)
        setLoading(false)
      })
  }, [])

  return (
    <section id="projects" className="py-24 px-4" ref={ref} style={{ backgroundColor: "#001436" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <hr className="flex-1 border-t-2" style={{ borderColor: "#2563eb" }} />
            <h2 className="text-5xl font-bold" style={{ color: "#f1f5f9" }}>Featured Projects</h2>
            <hr className="flex-1 border-t-2" style={{ borderColor: "#2563eb" }} />
          </div>
          <div className="flex justify-center">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase border"
              style={{
                backgroundColor: "rgba(37,99,235,0.1)",
                borderColor: "rgba(37,99,235,0.25)",
                color: "#60a5fa",
              }}
            >
              Our Work
            </span>
          </div>
        </motion.div>

        {/* States */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div
              className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{ borderColor: "rgba(37,99,235,0.2)", borderTopColor: "#2563eb" }}
            />
          </div>
        ) : projects.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl border"
            style={{ borderColor: "rgba(37,99,235,0.15)", backgroundColor: "rgba(30,41,59,0.3)", color: "#475569" }}
          >
            <div className="text-4xl mb-3">📁</div>
            <p>No projects to show yet.</p>
            <p className="text-sm mt-1" style={{ color: "#334155" }}>Coming soon!</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group"
                >
                  <ExpandableCard
                    title={project.title}
                    src={project.image ?? "/images/placeholder.png"}
                    description=""
                  >
                    <div className="p-4">
                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies?.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs border"
                            style={{
                              backgroundColor: "rgba(37,99,235,0.15)",
                              color: "#93c5fd",
                              borderColor: "rgba(37,99,235,0.25)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-justify mb-3" style={{ color: "#94a3b8" }}>
                        {project.description}
                      </p>

                      {/* Links */}
                      <div className="flex items-center gap-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm transition-colors"
                            style={{ color: "#64748b" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#64748b")}
                          >
                            <Github size={16} />
                            <span>Source</span>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm transition-colors"
                            style={{ color: "#64748b" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#64748b")}
                          >
                            <ExternalLink size={16} />
                            <span>Live</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </ExpandableCard>
                </motion.div>
              ))}
            </div>

            {/* See All Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold transition-all hover:scale-105"
                style={{ backgroundColor: "#2563eb", boxShadow: "0 0 24px rgba(37,99,235,0.35)" }}
              >
                See All Projects
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}