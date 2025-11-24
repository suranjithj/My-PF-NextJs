'use client'

import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, MessageCircle, Facebook, ArrowUp } from 'lucide-react'

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
  ]

  const services = [
    { name: 'Web Development', href: '#services' },
    { name: 'UI/UX Design', href: '#services' },
    { name: 'Mobile Apps', href: '#services' },
    { name: 'Consulting', href: '#services' },
  ]

  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} />, href: 'https://github.com/suranjithj' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/suranjithj/' },
    { name: 'MessageCircle', icon: <MessageCircle size={20} />, href: 'https://wa.me/94712525266' },
    { name: 'Facebook', icon: <Facebook size={20} />, href: 'https://www.facebook.com/share/1Bm1mcPMCF/' },
    { name: 'Email', icon: <Mail size={20} />, href: 'mailto:suranjith99.official@gmail.com' },
  ]

  return (
    <footer className="relative bg-gray-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
                D
              </div>
              <span className="text-white font-bold text-xl">DevLynx</span>
            </div>
            <p className="text-gray-400 text-sm">
              Building beautiful, functional, and scalable web applications that make a difference.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-purple-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className='lg:ml-15'>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3 text-gray-400">
                <Mail size={18} className="text-purple-400 mt-0.5 shrink-0" />
                <a href="mailto:suranjith99.official@gmail.com" className="hover:text-purple-400 transition-colors">
                  suranjith99.official@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <svg className="w-[18px] h-[18px] text-purple-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <svg className="w-[18px] h-[18px] text-purple-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+94 71 252 5266</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm flex items-center">
              © {currentYear} DevLynx Solutions. All rights reserved.{' '}
            </p>

            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
    </footer>
  )
}