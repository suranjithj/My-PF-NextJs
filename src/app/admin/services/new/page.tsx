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
    if (isEdit) fetchService()
  }, [isEdit])

  const fetchService = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/services/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({ ...data, features: data.features.length > 0 ? data.features : [''] })
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
        features: formData.features.filter(f => f.trim() !== ''),
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

  const addFeature = () => setFormData({ ...formData, features: [...formData.features, ''] })
  const removeFeature = (i: number) => setFormData({ ...formData, features: formData.features.filter((_, idx) => idx !== i) })
  const updateFeature = (i: number, value: string) => {
    const features = [...formData.features]
    features[i] = value
    setFormData({ ...formData, features })
  }

  const inputStyle = {
    backgroundColor: 'rgba(30,41,59,0.6)',
    borderColor: 'rgba(37,99,235,0.2)',
    color: '#f1f5f9',
  }
  const inputClass = "w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors focus:border-blue-500/60 placeholder-slate-600"
  const labelClass = "block text-sm font-medium mb-2"

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#001436' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#2563eb' }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#001436' }}>
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:text-blue-400"
          style={{ color: '#475569' }}
        >
          <ArrowLeft size={16} />
          Back to Services
        </Link>

        <h1 className="text-3xl font-bold mb-8" style={{ color: '#f1f5f9' }}>
          {isEdit ? 'Edit Service' : 'New Service'}
        </h1>

        <form onSubmit={handleSubmit}>
          <div
            className="p-8 rounded-2xl border space-y-6"
            style={{ backgroundColor: 'rgba(30,41,59,0.5)', borderColor: 'rgba(37,99,235,0.15)' }}
          >
            {/* Title */}
            <div>
              <label className={labelClass} style={{ color: '#cbd5e1' }}>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Web Development"
                className={inputClass}
                style={inputStyle}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClass} style={{ color: '#cbd5e1' }}>Description *</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Describe this service..."
                className={`${inputClass} resize-none`}
                style={inputStyle}
                required
              />
            </div>

            {/* Features */}
            <div>
              <label className={labelClass} style={{ color: '#cbd5e1' }}>Features</label>
              {formData.features.map((feature, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={e => updateFeature(i, e.target.value)}
                    placeholder="e.g. Responsive design"
                    className={inputClass}
                    style={inputStyle}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="p-2 rounded-lg border transition-all shrink-0"
                      style={{ color: '#fca5a5', borderColor: 'rgba(239,68,68,0.2)', backgroundColor: 'rgba(239,68,68,0.08)' }}
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="mt-1 flex items-center gap-2 text-sm transition-colors hover:text-blue-400"
                style={{ color: '#2563eb' }}
              >
                <Plus size={16} />
                Add Feature
              </button>
            </div>

            {/* Order + Active */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ color: '#cbd5e1' }}>Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={e => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <span className="text-sm" style={{ color: '#cbd5e1' }}>Active</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#2563eb', boxShadow: '0 0 16px rgba(37,99,235,0.3)' }}
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? 'Saving...' : isEdit ? 'Update Service' : 'Create Service'}
            </button>
            <Link
              href="/admin/services"
              className="px-6 py-3 rounded-lg border text-sm font-medium text-center transition-all"
              style={{ borderColor: 'rgba(37,99,235,0.2)', color: '#94a3b8', backgroundColor: 'rgba(37,99,235,0.05)' }}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}