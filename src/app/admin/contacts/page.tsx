// src/app/admin/contacts/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { Mail, Trash2, Loader2, CheckCircle, Circle } from 'lucide-react'
import Link from 'next/link'

interface Contact {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  read: boolean
  replied: boolean
  createdAt: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts')
      const data = await res.json()
      setContacts(data)
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string, read: boolean) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read }),
      })
      if (res.ok) {
        const updated = await res.json()
        setContacts(contacts.map(c => c.id === updated.id ? updated : c))
      }
    } catch (error) {
      console.error('Failed to update contact:', error)
    }
  }

  const markAsReplied = async (id: string, replied: boolean) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replied }),
      })
      if (res.ok) {
        const updated = await res.json()
        setContacts(contacts.map(c => c.id === updated.id ? updated : c))
      }
    } catch (error) {
      console.error('Failed to update contact:', error)
    }
  }

  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setContacts(contacts.filter(c => c.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete contact:', error)
    }
  }

  const filteredContacts = contacts.filter(c => {
    if (filter === 'unread') return !c.read
    if (filter === 'read') return c.read
    return true
  })

  const unreadCount = contacts.filter(c => !c.read).length
  const readCount = contacts.filter(c => c.read).length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#001436' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#2563eb' }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#001436' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#f1f5f9' }}>Contact Messages</h1>
            <p className="text-sm mt-1" style={{ color: '#475569' }}>
              {contacts.length} message{contacts.length !== 1 ? 's' : ''} total
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs border"
                  style={{ color: '#60a5fa', borderColor: 'rgba(37,99,235,0.3)', backgroundColor: 'rgba(37,99,235,0.1)' }}>
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            {([
              { key: 'all',    label: `All (${contacts.length})` },
              { key: 'unread', label: `Unread (${unreadCount})` },
              { key: 'read',   label: `Read (${readCount})` },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                style={filter === tab.key
                  ? { backgroundColor: '#2563eb', borderColor: '#2563eb', color: '#fff' }
                  : { backgroundColor: 'rgba(37,99,235,0.08)', borderColor: 'rgba(37,99,235,0.2)', color: '#94a3b8' }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
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
        {filteredContacts.length === 0 && (
          <div
            className="text-center py-20 rounded-2xl border border-dashed"
            style={{ borderColor: 'rgba(37,99,235,0.2)', color: '#475569' }}
          >
            <div className="text-4xl mb-3">📭</div>
            <p className="text-lg">
              {filter === 'all' ? 'No contact messages yet.' : `No ${filter} messages.`}
            </p>
          </div>
        )}

        {/* Messages list */}
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="rounded-2xl border-l-4 overflow-hidden transition-all duration-200"
              style={{
                backgroundColor: 'rgba(30,41,59,0.5)',
                borderLeftColor: contact.read ? 'rgba(37,99,235,0.2)' : '#2563eb',
                border: '1px solid rgba(37,99,235,0.15)',
                borderLeft: `4px solid ${contact.read ? 'rgba(37,99,235,0.2)' : '#2563eb'}`,
              }}
            >
              <div className="p-6">
                {/* Top row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-lg font-semibold" style={{ color: '#f1f5f9' }}>
                        {contact.name}
                      </h3>
                      {!contact.read && (
                        <span
                          className="px-2 py-0.5 rounded-full text-xs border"
                          style={{ color: '#60a5fa', borderColor: 'rgba(37,99,235,0.3)', backgroundColor: 'rgba(37,99,235,0.1)' }}
                        >
                          New
                        </span>
                      )}
                      {contact.replied && (
                        <span
                          className="px-2 py-0.5 rounded-full text-xs border"
                          style={{ color: '#86efac', borderColor: 'rgba(34,197,94,0.3)', backgroundColor: 'rgba(34,197,94,0.1)' }}
                        >
                          Replied
                        </span>
                      )}
                    </div>
                    <p className="text-sm" style={{ color: '#60a5fa' }}>{contact.email}</p>
                    {contact.subject && (
                      <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
                        <span style={{ color: '#475569' }}>Subject: </span>{contact.subject}
                      </p>
                    )}
                    <p className="text-xs mt-1" style={{ color: '#334155' }}>
                      {new Date(contact.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={`mailto:${contact.email}?subject=Re: ${contact.subject || 'Your message'}`}
                      className="p-2 rounded-lg border transition-all hover:scale-105"
                      style={{ color: '#60a5fa', borderColor: 'rgba(37,99,235,0.2)', backgroundColor: 'rgba(37,99,235,0.08)' }}
                      title="Reply via email"
                    >
                      <Mail size={16} />
                    </a>
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="p-2 rounded-lg border transition-all hover:scale-105"
                      style={{ color: '#fca5a5', borderColor: 'rgba(239,68,68,0.2)', backgroundColor: 'rgba(239,68,68,0.08)' }}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Message body */}
                <div
                  className="rounded-xl p-4 mb-4 text-sm leading-relaxed whitespace-pre-wrap"
                  style={{
                    backgroundColor: 'rgba(15,23,42,0.5)',
                    color: '#94a3b8',
                    border: '1px solid rgba(37,99,235,0.1)',
                  }}
                >
                  {contact.message}
                </div>

                {/* Status buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => markAsRead(contact.id, !contact.read)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                    style={contact.read
                      ? { color: '#94a3b8', borderColor: 'rgba(148,163,184,0.2)', backgroundColor: 'rgba(148,163,184,0.05)' }
                      : { color: '#60a5fa', borderColor: 'rgba(37,99,235,0.3)', backgroundColor: 'rgba(37,99,235,0.08)' }
                    }
                  >
                    {contact.read ? <Circle size={14} /> : <CheckCircle size={14} />}
                    {contact.read ? 'Mark as Unread' : 'Mark as Read'}
                  </button>

                  <button
                    onClick={() => markAsReplied(contact.id, !contact.replied)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                    style={contact.replied
                      ? { color: '#94a3b8', borderColor: 'rgba(148,163,184,0.2)', backgroundColor: 'rgba(148,163,184,0.05)' }
                      : { color: '#86efac', borderColor: 'rgba(34,197,94,0.3)', backgroundColor: 'rgba(34,197,94,0.08)' }
                    }
                  >
                    {contact.replied ? 'Mark as Not Replied' : 'Mark as Replied'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}