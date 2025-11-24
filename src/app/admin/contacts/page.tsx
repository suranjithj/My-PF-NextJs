'use client'

import { useState, useEffect } from 'react'
import { Mail, Trash2, Loader2, CheckCircle, Circle } from 'lucide-react'

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
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      })

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
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({contacts.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unread ({contacts.filter(c => !c.read).length})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'read'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Read ({contacts.filter(c => c.read).length})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                contact.read ? 'border-gray-300' : 'border-purple-600'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    {contact.name}
                    {!contact.read && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        New
                      </span>
                    )}
                    {contact.replied && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Replied
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">{contact.email}</p>
                  {contact.subject && (
                    <p className="text-sm font-medium text-gray-700 mt-1">
                      Subject: {contact.subject}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(contact.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${contact.email}?subject=Re: ${contact.subject || 'Your message'}`}
                    className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                    title="Reply"
                  >
                    <Mail size={18} />
                  </a>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => markAsRead(contact.id, !contact.read)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    contact.read
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  {contact.read ? <Circle size={16} /> : <CheckCircle size={16} />}
                  {contact.read ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button
                  onClick={() => markAsReplied(contact.id, !contact.replied)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    contact.replied
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {contact.replied ? 'Mark as Not Replied' : 'Mark as Replied'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {filter === 'all' ? 'No contact messages yet.' : `No ${filter} messages.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}