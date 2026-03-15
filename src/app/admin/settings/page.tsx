// src/app/admin/settings/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { Loader2, Save, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Settings {
  siteName: string
  siteDescription: string
  email: string
  phone: string
  location: string
  githubUrl: string
  linkedinUrl: string
  whatsappUrl: string
  facebookUrl: string
}

interface SettingItem {
  key: string
  value: string
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState<Settings>({
    siteName: '',
    siteDescription: '',
    email: '',
    phone: '',
    location: '',
    githubUrl: '',
    linkedinUrl: '',
    whatsappUrl: '',
    facebookUrl: '',
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      const data: SettingItem[] = await res.json()
      const obj: Record<string, string> = {}
      data.forEach(s => { obj[s.key] = s.value })
      setSettings({
        siteName:        obj.siteName        || '',
        siteDescription: obj.siteDescription || '',
        email:           obj.email           || '',
        phone:           obj.phone           || '',
        location:        obj.location        || '',
        githubUrl:       obj.githubUrl       || '',
        linkedinUrl:     obj.linkedinUrl     || '',
        whatsappUrl:     obj.whatsappUrl     || '',
        facebookUrl:     obj.facebookUrl     || '',
      })
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    backgroundColor: 'rgba(30,41,59,0.6)',
    borderColor: 'rgba(37,99,235,0.2)',
    color: '#f1f5f9',
  }
  const inputClass = "w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors focus:border-blue-500/60 placeholder-slate-600"
  const labelClass = "block text-sm font-medium mb-2"
  const cardStyle = {
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderColor: 'rgba(37,99,235,0.15)',
  }

  interface FormField {
    key: string
    label: string
    type: string
    placeholder: string
    colSpan?: boolean
  }

  const sections = [
    {
      title: 'General Information',
      icon: '🏢',
      fields: [
        { key: 'siteName',        label: 'Site Name',        type: 'text',     placeholder: 'DevLynx IT Solutions' },
        { key: 'siteDescription', label: 'Site Description', type: 'textarea', placeholder: 'Beyond Traditional IT Services...' },
      ],
    },
    {
      title: 'Contact Information',
      icon: '📬',
      fields: [
        { key: 'email',    label: 'Email',    type: 'email', placeholder: 'hello@devlynx.com' },
        { key: 'phone',    label: 'Phone',    type: 'text',  placeholder: '+94 71 252 5266' },
        { key: 'location', label: 'Location', type: 'text',  placeholder: 'Colombo, Sri Lanka', colSpan: true },
      ],
    },
    {
      title: 'Social Media Links',
      icon: '🔗',
      fields: [
        { key: 'linkedinUrl', label: 'LinkedIn URL',  type: 'url', placeholder: 'https://linkedin.com/company/devlynxitsolutions/' },
        { key: 'facebookUrl', label: 'Facebook URL',  type: 'url', placeholder: 'https://facebook.com/DevLynxIT/' },
        { key: 'whatsappUrl', label: 'WhatsApp URL',  type: 'url', placeholder: 'https://wa.me/94712525266' },
        { key: 'githubUrl',   label: 'GitHub URL',    type: 'url', placeholder: 'https://github.com/devlynx' },
      ],
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#001436' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#2563eb' }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#001436' }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-3">
          <h1 className="text-3xl font-bold" style={{ color: '#f1f5f9' }}>Site Settings</h1>
          <p className="text-sm mt-1" style={{ color: '#475569' }}>Manage your site information and social links</p>
        </div>

        {/* Back link */}
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-blue-400"
          style={{ color: '#475569' }}
        >
          ← Back to Dashboard
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          {sections.map(section => (
            <div
              key={section.title}
              className="p-6 rounded-2xl border"
              style={cardStyle}
            >
              <h2 className="text-lg font-semibold mb-5 flex items-center gap-2" style={{ color: '#f1f5f9' }}>
                <span>{section.icon}</span>
                {section.title}
              </h2>

              <div className={section.title === 'Contact Information' ? 'grid md:grid-cols-2 gap-4' : 'space-y-4'}>
                {section.fields.map(field => (
                  <div key={field.key} className={(field as FormField).colSpan ? 'md:col-span-2' : ''}>
                    <label className={labelClass} style={{ color: '#cbd5e1' }}>{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={settings[field.key as keyof Settings]}
                        onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                        rows={3}
                        placeholder={field.placeholder}
                        className={`${inputClass} resize-none`}
                        style={inputStyle}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={settings[field.key as keyof Settings]}
                        onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className={inputClass}
                        style={inputStyle}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Save button */}
          <div className="flex items-center justify-between pt-2">
            {saved && (
              <div className="flex items-center gap-2 text-sm" style={{ color: '#86efac' }}>
                <CheckCircle size={16} />
                Settings saved successfully!
              </div>
            )}
            <div className="ml-auto">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#2563eb', boxShadow: '0 0 16px rgba(37,99,235,0.3)' }}
              >
                {saving
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                  : <><Save size={16} /> Save Settings</>
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}