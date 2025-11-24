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
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      })

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
          active: !service.active 
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
      alert('Failed to update service')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
          <Link
            href="/admin/services/new"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Service
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{service.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      service.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {service.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">Features:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-purple-600 mr-1">•</span>
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-purple-600 text-xs">+{service.features.length - 3} more</li>
                  )}
                </ul>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive(service)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    service.active
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      : 'bg-green-100 hover:bg-green-200 text-green-700'
                  }`}
                >
                  {service.active ? 'Deactivate' : 'Activate'}
                </button>
                <Link
                  href={`/admin/services/${service.id}`}
                  className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => deleteService(service.id)}
                  className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services yet. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  )
}