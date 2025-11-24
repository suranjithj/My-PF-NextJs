'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react'
import Link from 'next/link'

export default function ServiceFormPage() {
  const router = useRouter()
  const params = useParams()
  const isEdit = params?.id && params.id !== 'new'

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: [''],
    order: 0,
    active: true,
  })

  useEffect(() => {
    if (isEdit) {
      fetchService()
    }
  }, [isEdit])

  const fetchService = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/services/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData(data)
      }
    } catch (error) {
      console.error('Failed to fetch service:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = isEdit ? `/api/admin/services/${params.id}` : '/api/admin/services'
      const method = isEdit ? 'PUT' : 'POST'

      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== '')
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      })

      if (res.ok) {
        router.push('/admin/services')
      } else {
        const error = await res.json()
        alert(`Failed to save service: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to save service:', error)
      alert('Failed to save service')
    } finally {
      setSubmitting(false)
    }
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] })
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
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
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/services"
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Services
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {isEdit ? 'Edit Service' : 'Create Service'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Feature description"
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="mt-2 flex items-center gap-2 text-purple-600 hover:text-purple-700"
            >
              <Plus size={20} />
              Add Feature
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-purple-600"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {submitting ? 'Saving...' : isEdit ? 'Update Service' : 'Create Service'}
            </button>
            <Link
              href="/admin/services"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}