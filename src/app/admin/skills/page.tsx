'use client'

import { useState, useEffect } from 'react'
import { Edit, Trash2, Loader2 } from 'lucide-react'

interface Skill {
  id: string
  name: string
  icon?: string
  order: number
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    order: 0,
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/admin/skills')
      if (res.ok) {
        const data = await res.json()
        setSkills(data)
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = editingId ? `/api/admin/skills/${editingId}` : '/api/admin/skills'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        await fetchSkills()
        resetForm()
      } else {
        const error = await res.json()
        alert(`Failed to save skill: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to save skill:', error)
      alert('Failed to save skill')
    } finally {
      setSaving(false)
    }
  }

  const editSkill = (skill: Skill) => {
    setEditingId(skill.id)
    setFormData({
      name: skill.name,
      icon: skill.icon || '',
      order: skill.order,
    })
  }

  const deleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    try {
      const res = await fetch(`/api/admin/skills/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setSkills(skills.filter(s => s.id !== id))
      } else {
        const error = await res.json()
        alert(`Failed to delete skill: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to delete skill:', error)
      alert('Failed to delete skill')
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({ name: '', icon: '', order: 0 })
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Skills</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingId ? 'Edit Skill' : 'Add New Skill'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., ⚛️, 🚀, 💻"
                    className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

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

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? 'Saving...' : editingId ? 'Update' : 'Add'} Skill
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Skills List */}
          <div className="lg:col-span-2">
            <div className="grid gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    {skill.icon && (
                      <div className="text-3xl">{skill.icon}</div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                      <p className="text-sm text-gray-500">Order: {skill.order}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editSkill(skill)}
                      className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deleteSkill(skill.id)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {skills.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-lg">No skills yet. Add your first one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}