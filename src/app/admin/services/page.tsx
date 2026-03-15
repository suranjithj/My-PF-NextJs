'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Service {
  id: string
  title: string
  description: string
  features: string[]
  order: number
  active: boolean
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services')
      if (res.ok) {
        const data = await res.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setServices(services.filter(s => s.id !== id))
      } else {
        const error = await res.json()
        alert(`Failed to delete service: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to delete service:', error)
      alert('Failed to delete service')
    }
  }

  const toggleActive = async (service: Service) => {
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: service.title,
          description: service.description,
          features: service.features,
          order: service.order,
          active: !service.active,
        }),
      })
      if (res.ok) {
        const updated = await res.json()
        setServices(services.map(s => s.id === updated.id ? updated : s))
      } else {
        const error = await res.json()
        alert(`Failed to update service: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to update service:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#001436' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#2563eb' }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#001436' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#f1f5f9' }}>Services</h1>
            <p className="text-sm mt-1" style={{ color: '#475569' }}>
              {services.length} service{services.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <Link
            href="/admin/services/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: '#2563eb', boxShadow: '0 0 16px rgba(37,99,235,0.35)' }}
          >
            <Plus size={18} />
            Add Service
          </Link>
        </div>

        {/* Back link */}
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-blue-400"
          style={{ color: '#475569' }}
        >
          ← Back to Dashboard
        </Link>

        {/* Empty state */}
        {services.length === 0 && (
          <div
            className="text-center py-20 rounded-2xl border border-dashed"
            style={{ borderColor: 'rgba(37,99,235,0.2)', color: '#475569' }}
          >
            <div className="text-4xl mb-3">🛠</div>
            <p className="text-lg mb-2">No services yet.</p>
            <p className="text-sm mb-6" style={{ color: '#334155' }}>Add your first service to display it on the website.</p>
            <Link
              href="/admin/services/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white"
              style={{ backgroundColor: '#2563eb' }}
            >
              <Plus size={16} /> Add Service
            </Link>
          </div>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border p-6 flex flex-col transition-all duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(30,41,59,0.5)',
                borderColor: 'rgba(37,99,235,0.15)',
              }}
            >
              {/* Title + status */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg leading-tight" style={{ color: '#f1f5f9' }}>
                  {service.title}
                </h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full border shrink-0 ml-2"
                  style={service.active
                    ? { color: '#86efac', borderColor: 'rgba(34,197,94,0.3)', backgroundColor: 'rgba(34,197,94,0.1)' }
                    : { color: '#94a3b8', borderColor: 'rgba(148,163,184,0.2)', backgroundColor: 'rgba(148,163,184,0.05)' }
                  }
                >
                  {service.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: '#64748b' }}>
                {service.description}
              </p>

              {/* Features */}
              {service.features.length > 0 && (
                <div className="mb-4 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#475569' }}>
                    Features
                  </p>
                  <ul className="space-y-1">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: '#64748b' }}>
                        <span style={{ color: '#2563eb' }}>•</span>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-xs" style={{ color: '#2563eb' }}>
                        +{service.features.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-auto pt-4 border-t" style={{ borderColor: 'rgba(37,99,235,0.1)' }}>
                <button
                  onClick={() => toggleActive(service)}
                  className="flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-all"
                  style={service.active
                    ? { color: '#94a3b8', borderColor: 'rgba(148,163,184,0.2)', backgroundColor: 'rgba(148,163,184,0.05)' }
                    : { color: '#86efac', borderColor: 'rgba(34,197,94,0.3)', backgroundColor: 'rgba(34,197,94,0.08)' }
                  }
                >
                  {service.active ? 'Deactivate' : 'Activate'}
                </button>
                <Link
                  href={`/admin/services/${service.id}`}
                  className="p-2 rounded-lg border transition-all"
                  style={{ color: '#60a5fa', borderColor: 'rgba(37,99,235,0.2)', backgroundColor: 'rgba(37,99,235,0.08)' }}
                  title="Edit"
                >
                  <Edit size={16} />
                </Link>
                <button
                  onClick={() => deleteService(service.id)}
                  className="p-2 rounded-lg border transition-all"
                  style={{ color: '#fca5a5', borderColor: 'rgba(239,68,68,0.2)', backgroundColor: 'rgba(239,68,68,0.08)' }}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}