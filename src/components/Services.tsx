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
    <section id="services" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-4">
              <hr className="flex-1 border-t-2 border-purple-500 dark:border-purple-500" />
              <h2 className="text-5xl font-bold mb-4 text-white">Services</h2>
              <hr className="flex-1 border-t-2 border-pink-500 dark:border-pink-500" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions tailored to bring your ideas to life
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-center text-gray-400">No services added yet. Add some from the dashboard!</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Code

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  {service.features.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-gray-400">
                          <span className="text-purple-400 mr-2">✓</span>
                          <span>{feature}</span>
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