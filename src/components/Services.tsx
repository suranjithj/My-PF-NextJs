'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Code, Smartphone, Database, Cloud, Palette, Search, type LucideIcon } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  active: boolean
}

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  smartphone: Smartphone,
  database: Database,
  cloud: Cloud,
  palette: Palette,
  search: Search,
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch services:', err)
        setLoading(false)
      })
  }, [])

  return (
    <section
      id="services"
      className="py-24 px-4"
      ref={ref}
      style={{ backgroundColor: '#020e24' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <hr className="flex-1 border-t-2" style={{ borderColor: '#2563eb' }} />
            <h2 className="text-5xl font-bold" style={{ color: '#f1f5f9' }}>Services</h2>
            <hr className="flex-1 border-t-2" style={{ borderColor: '#2563eb' }} />
          </div>

          {/* Section badge */}
          <div className="flex justify-center mb-4">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase border"
              style={{
                backgroundColor: 'rgba(37,99,235,0.1)',
                borderColor: 'rgba(37,99,235,0.25)',
                color: '#60a5fa',
              }}
            >
              What We Offer
            </span>
          </div>

          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#94a3b8' }}>
            Comprehensive solutions tailored to bring your ideas to life
          </p>
        </motion.div>

        {/* States */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div
              className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{ borderColor: 'rgba(37,99,235,0.2)', borderTopColor: '#2563eb' }}
            />
          </div>
        ) : services.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl border"
            style={{ borderColor: 'rgba(37,99,235,0.15)', backgroundColor: 'rgba(30,41,59,0.3)', color: '#475569' }}
          >
            <div className="text-4xl mb-3">🛠</div>
            <p>No services added yet.</p>
            <p className="text-sm mt-1" style={{ color: '#334155' }}>Add them from the admin dashboard.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Code

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'rgba(30,41,59,0.5)',
                    borderColor: 'rgba(37,99,235,0.15)',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(37,99,235,0.5)'
                    ;(e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(37,99,235,0.08)'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 30px rgba(37,99,235,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(37,99,235,0.15)'
                    ;(e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(30,41,59,0.5)'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
                  >
                    <IconComponent className="text-white" size={30} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#f1f5f9' }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 leading-relaxed" style={{ color: '#94a3b8' }}>
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span
                            className="mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: 'rgba(37,99,235,0.2)' }}
                          >
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          <span className="text-sm" style={{ color: '#64748b' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}