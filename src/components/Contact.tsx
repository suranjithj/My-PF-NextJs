'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Social } from './Social'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        const data = await response.json()
        setStatus('error')
        setErrorMessage(data.error || 'Failed to send message')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again.')
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors"
  const inputStyle = {
    backgroundColor: 'rgba(30,41,59,0.6)',
    border: '1px solid rgba(37,99,235,0.2)',
  }

  return (
    <section id="contact" className="py-24 px-4" ref={ref} style={{ backgroundColor: '#001436' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <hr className="flex-1 border-t-2" style={{ borderColor: '#2563eb' }} />
            <h2 className="text-5xl font-bold" style={{ color: '#f1f5f9' }}>Get In Touch</h2>
            <hr className="flex-1 border-t-2" style={{ borderColor: '#2563eb' }} />
          </div>
          <div className="flex justify-center mb-4">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase border"
              style={{
                backgroundColor: 'rgba(37,99,235,0.1)',
                borderColor: 'rgba(37,99,235,0.25)',
                color: '#60a5fa',
              }}
            >
              Contact Us
            </span>
          </div>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#94a3b8' }}>
            Have a project in mind? Let&apos;s work together to create something amazing!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {[
              { icon: <Mail size={22} />, label: 'Email', value: 'devlynxitsolutions@gmail.com' },
              { icon: <Phone size={22} />, label: 'Phone', value: '+94 71 252 5266' },
              { icon: <MapPin size={22} />, label: 'Location', value: 'Colombo, Sri Lanka' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(37,99,235,0.15)', color: '#60a5fa' }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-0.5" style={{ color: '#f1f5f9' }}>{item.label}</h3>
                  <p style={{ color: '#64748b' }}>{item.value}</p>
                </div>
              </div>
            ))}

            {/* Connect card */}
            <div
              className="p-8 rounded-2xl border"
              style={{
                background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(29,78,216,0.08))',
                borderColor: 'rgba(37,99,235,0.25)',
              }}
            >
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#f1f5f9' }}>Let&apos;s Connect!</h3>
              <p className="leading-relaxed mb-0" style={{ color: '#94a3b8' }}>
                We&apos;re always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <Social />
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                { id: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?" },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block mb-2 text-sm font-medium" style={{ color: '#cbd5e1' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                    required={field.id !== 'subject'}
                    placeholder={field.placeholder}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(37,99,235,0.6)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)')}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium" style={{ color: '#cbd5e1' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your message..."
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(37,99,235,0.6)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)')}
                />
              </div>

              {status === 'success' && (
                <div className="px-4 py-3 rounded-lg border text-sm" style={{ backgroundColor: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.4)', color: '#86efac' }}>
                  Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="px-4 py-3 rounded-lg border text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.4)', color: '#fca5a5' }}>
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#2563eb', boxShadow: '0 0 24px rgba(37,99,235,0.35)' }}
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}