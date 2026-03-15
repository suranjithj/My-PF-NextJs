'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

interface CaseStudy {
  id: string
  title: string
  client: string
  industry: string
  challenge: string
  solution: string
  result: string
  tags: string[]
  active: boolean
  order: number
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    fetchCaseStudies()
  }, [])

  const fetchCaseStudies = async () => {
    try {
      const res = await fetch('/api/admin/case-studies')
      if (res.ok) {
        const data = await res.json()
        setCaseStudies(data)
      }
    } catch (error) {
      console.error('Failed to fetch case studies:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCaseStudy = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return
    try {
      const res = await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCaseStudies(caseStudies.filter(c => c.id !== id))
      } else {
        const error = await res.json()
        alert(`Failed to delete: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to delete case study:', error)
      alert('Failed to delete case study')
    }
  }

  const toggleActive = async (cs: CaseStudy) => {
    try {
      const res = await fetch(`/api/admin/case-studies/${cs.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...cs, active: !cs.active }),
      })
      if (res.ok) {
        const updated = await res.json()
        setCaseStudies(caseStudies.map(c => c.id === updated.id ? updated : c))
      } else {
        const error = await res.json()
        alert(`Failed to update: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to update case study:', error)
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#f1f5f9' }}>Case Studies</h1>
            <p className="text-sm mt-1" style={{ color: '#475569' }}>
              {caseStudies.length} case {caseStudies.length === 1 ? 'study' : 'studies'} total
            </p>
          </div>
          <Link
            href="/admin/case-studies/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: '#2563eb', boxShadow: '0 0 16px rgba(37,99,235,0.35)' }}
          >
            <Plus size={18} />
            Add Case Study
          </Link>
        </div>

        {/* Back link */}
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:text-blue-400"
          style={{ color: '#475569' }}
        >
          ← Back to Dashboard
        </Link>

        {/* Empty state */}
        {caseStudies.length === 0 && (
          <div
            className="text-center py-20 rounded-2xl border border-dashed"
            style={{ borderColor: 'rgba(37,99,235,0.2)', color: '#475569' }}
          >
            <div className="text-4xl mb-3">📂</div>
            <p className="text-lg mb-2">No case studies yet.</p>
            <p className="text-sm mb-6" style={{ color: '#334155' }}>Create your first one to showcase your work.</p>
            <Link
              href="/admin/case-studies/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white"
              style={{ backgroundColor: '#2563eb' }}
            >
              <Plus size={16} /> Add Case Study
            </Link>
          </div>
        )}

        {/* List */}
        <div className="space-y-4">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="rounded-2xl border overflow-hidden transition-all duration-200"
              style={{
                backgroundColor: 'rgba(30,41,59,0.5)',
                borderColor: 'rgba(37,99,235,0.15)',
              }}
            >
              {/* Row header */}
              <div className="flex items-center justify-between p-5 gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <button
                    onClick={() => setExpanded(expanded === cs.id ? null : cs.id)}
                    className="shrink-0 transition-colors"
                    style={{ color: '#475569' }}
                  >
                    {expanded === cs.id
                      ? <ChevronUp size={18} />
                      : <ChevronDown size={18} />
                    }
                  </button>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold truncate" style={{ color: '#f1f5f9' }}>{cs.title}</h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full border shrink-0"
                        style={cs.active
                          ? { color: '#86efac', borderColor: 'rgba(34,197,94,0.3)', backgroundColor: 'rgba(34,197,94,0.1)' }
                          : { color: '#94a3b8', borderColor: 'rgba(148,163,184,0.2)', backgroundColor: 'rgba(148,163,184,0.05)' }
                        }
                      >
                        {cs.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs" style={{ color: '#475569' }}>{cs.client}</span>
                      <span className="text-xs" style={{ color: '#334155' }}>•</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full border"
                        style={{ color: '#93c5fd', borderColor: 'rgba(37,99,235,0.25)', backgroundColor: 'rgba(37,99,235,0.08)' }}
                      >
                        {cs.industry}
                      </span>
                      <div className="flex gap-1 flex-wrap">
                        {cs.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{ color: '#64748b', backgroundColor: 'rgba(37,99,235,0.06)' }}>
                            {tag}
                          </span>
                        ))}
                        {cs.tags.length > 3 && (
                          <span className="text-xs" style={{ color: '#475569' }}>+{cs.tags.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(cs)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                    style={cs.active
                      ? { color: '#94a3b8', borderColor: 'rgba(148,163,184,0.2)', backgroundColor: 'rgba(148,163,184,0.05)' }
                      : { color: '#86efac', borderColor: 'rgba(34,197,94,0.3)', backgroundColor: 'rgba(34,197,94,0.08)' }
                    }
                  >
                    {cs.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <Link
                    href={`/admin/case-studies/${cs.id}`}
                    className="p-2 rounded-lg border transition-all"
                    style={{ color: '#60a5fa', borderColor: 'rgba(37,99,235,0.2)', backgroundColor: 'rgba(37,99,235,0.08)' }}
                    title="Edit"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => deleteCaseStudy(cs.id)}
                    className="p-2 rounded-lg border transition-all"
                    style={{ color: '#fca5a5', borderColor: 'rgba(239,68,68,0.2)', backgroundColor: 'rgba(239,68,68,0.08)' }}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === cs.id && (
                <div
                  className="px-5 pb-5 pt-0 grid md:grid-cols-3 gap-4 border-t"
                  style={{ borderColor: 'rgba(37,99,235,0.1)' }}
                >
                  {[
                    { label: 'Challenge', text: cs.challenge, icon: '⚡' },
                    { label: 'Solution', text: cs.solution, icon: '🛠' },
                    { label: 'Result', text: cs.result, icon: '✅' },
                  ].map(item => (
                    <div key={item.label} className="pt-4">
                      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#475569' }}>
                        {item.icon} {item.label}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}