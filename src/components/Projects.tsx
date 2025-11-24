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
    <section id="projects" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-4">
            <hr className="flex-1 border-t-2 border-purple-500 dark:border-purple-500" />
            <h2 className="text-5xl font-bold mb-4 text-white">Featured Projects</h2>
            <hr className="flex-1 border-t-2 border-pink-500 dark:border-pink-500" />
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-400">No projects added yet. Add some from the dashboard!</div>
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

                      <p className="text-sm text-gray-300 mb-3">{project.description}</p>

                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                          >
                            <Github size={18} />
                            <span className="text-xs">Source</span>
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
                            <span className="text-xs">Live</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </ExpandableCard>
                </motion.div>
              ))}
            </div>

            {/* See All Projects Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
              >
                See All Projects
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}