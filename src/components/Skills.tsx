'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { LinearProgress } from '@mui/material'

interface Skill {
  id: string
  name: string
  icon?: string
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        setSkills(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch skills:', err)
        setLoading(false)
      })
  }, [])

  return (
    <section id="skills" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-4">
              <hr className="flex-1 border-t-2 border-purple-500 dark:border-purple-500" />
              <h2 className="text-5xl font-bold mb-4 text-white">Skills & Expertise</h2>
              <hr className="flex-1 border-t-2 border-pink-500 dark:border-pink-500" />
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">Loading skills...</div>
        ) : (
          <div className="space-y-12">
              <motion.div
                key={ 'skills-section' }
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {skills
                    .map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5  + (index * 0.05) }}
                        className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-semibold">{skill.name}</span>
                        </div>
                        <LinearProgress
                          variant="determinate"
                          value={skill.id ? parseInt(skill.id, 10) : 0}
                          className="h-2 rounded-full"
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#a855f7',
                              borderRadius: '9999px',
                            },
                          }}
                        />
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            
          </div>
        )}
      </div>
    </section>
  )
}