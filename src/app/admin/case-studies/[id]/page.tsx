'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react'
import Link from 'next/link'

export default function CaseStudyFormPage() {
  const router = useRouter()
  const params = useParams()
  const isEdit = params?.id && params.id !== 'new'

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    industry: '',
    challenge: '',
    solution: '',
    result: '',
    tags: [''],
    active: true,
    order: 0,
  })

  useEffect(() => {
    if (isEdit) fetchCaseStudy()
  }, [isEdit])

  const fetchCaseStudy = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/case-studies/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({ ...data, tags: data.tags.length > 0 ? data.tags : [''] })
      }
    } catch (error) {
      console.error('Failed to fetch case study:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const url = isEdit ? `/api/admin/case-studies/${params.id}` : '/api/admin/case-studies'
      const method = isEdit ? 'PUT' : 'POST'
      const cleanedData = {
        ...formData,
        tags: formData.tags.filter(t => t.trim() !== ''),
      }
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      })
      if (res.ok) {
        router.push('/admin/case-studies')
      } else {
        const error = await res.json()
        alert(`Failed to save: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to save case study:', error)
      alert('Failed to save case study')
    } finally {
      setSubmitting(false)
    }
  }

  const addTag = () => setFormData({ ...formData, tags: [...formData.tags, ''] })
  const removeTag = (i: number) => setFormData({ ...formData, tags: formData.tags.filter((_, idx) => idx !== i) })
  const updateTag = (i: number, value: string) => {
    const tags = [...formData.tags]
    tags[i] = value
    setFormData({ ...formData, tags })
  }

  // Shared input styles
  const inputStyle = {
    backgroundColor: 'rgba(30,41,59,0.6)',
    borderColor: 'rgba(37,99,235,0.2)',
    color: '#f1f5f9',
  }
  const inputClass = "w-full px-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:border-blue-500/60 placeholder-slate-600"
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
          href="/admin/case-studies"
          className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:text-blue-400"
          style={{ color: '#475569' }}
        >
          <ArrowLeft size={16} />
          Back to Case Studies
        </Link>

        <h1 className="text-3xl font-bold mb-8" style={{ color: '#f1f5f9' }}>
          {isEdit ? 'Edit Case Study' : 'New Case Study'}
        </h1>

        <form onSubmit={handleSubmit}>
          <div
            className="p-8 rounded-2xl border space-y-6"
            style={{ backgroundColor: 'rgba(30,41,59,0.5)', borderColor: 'rgba(37,99,235,0.15)' }}
          >

            {/* Title + Client */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ color: '#cbd5e1' }}>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. E-Commerce Platform Rebuild"
                  className={inputClass}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label className={labelClass} style={{ color: '#cbd5e1' }}>Client *</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={e => setFormData({ ...formData, client: e.target.value })}
                  placeholder="e.g. RetailCo Ltd."
                  className={inputClass}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            {/* Industry + Order */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ color: '#cbd5e1' }}>Industry *</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={e => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g. Retail, Healthcare, Finance"
                  className={inputClass}
                  style={inputStyle}
                  required
                />
              </div>
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
            </div>

            {/* Challenge */}
            <div>
              <label className={labelClass} style={{ color: '#cbd5e1' }}>Challenge *</label>
              <textarea
                value={formData.challenge}
                onChange={e => setFormData({ ...formData, challenge: e.target.value })}
                rows={3}
                placeholder="What problem did the client face?"
                className={`${inputClass} resize-none`}
                style={inputStyle}
                required
              />
            </div>

            {/* Solution */}
            <div>
              <label className={labelClass} style={{ color: '#cbd5e1' }}>Solution *</label>
              <textarea
                value={formData.solution}
                onChange={e => setFormData({ ...formData, solution: e.target.value })}
                rows={3}
                placeholder="How did DevLynx solve it?"
                className={`${inputClass} resize-none`}
                style={inputStyle}
                required
              />
            </div>

            {/* Result */}
            <div>
              <label className={labelClass} style={{ color: '#cbd5e1' }}>Result *</label>
              <textarea
                value={formData.result}
                onChange={e => setFormData({ ...formData, result: e.target.value })}
                rows={3}
                placeholder="What was the outcome?"
                className={`${inputClass} resize-none`}
                style={inputStyle}
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className={labelClass} style={{ color: '#cbd5e1' }}>Tags</label>
              {formData.tags.map((tag, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={e => updateTag(i, e.target.value)}
                    placeholder="e.g. Next.js, React, PostgreSQL"
                    className={inputClass}
                    style={inputStyle}
                  />
                  {formData.tags.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTag(i)}
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
                onClick={addTag}
                className="mt-1 flex items-center gap-2 text-sm transition-colors hover:text-blue-400"
                style={{ color: '#2563eb' }}
              >
                <Plus size={16} />
                Add Tag
              </button>
            </div>

            {/* Active toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={e => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <label htmlFor="active" className="text-sm cursor-pointer" style={{ color: '#cbd5e1' }}>
                Active (visible on website)
              </label>
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
              {submitting ? 'Saving...' : isEdit ? 'Update Case Study' : 'Create Case Study'}
            </button>
            <Link
              href="/admin/case-studies"
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