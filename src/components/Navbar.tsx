'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import { Home, User, Code, Briefcase, Mail } from 'lucide-react'
import {
  Navbar as RNNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../components/ui/resizable-navbar"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'services', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', link: '#hero', icon: <Home size={18} />, id: 'hero' },
    { name: 'About', link: '#about', icon: <User size={18} />, id: 'about' },
    { name: 'Skills', link: '#skills', icon: <Code size={18} />, id: 'skills' },
    { name: 'Projects', link: '#projects', icon: <Briefcase size={18} />, id: 'projects' },
    { name: 'Services', link: '#services', icon: <Briefcase size={18} />, id: 'services' },
    { name: 'Contact', link: '#contact', icon: <Mail size={18} />, id: 'contact' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-100">
      <RNNavbar className="relative z-50">
        <NavBody className="relative overflow-hidden bg-gray-900/80 backdrop-blur-lg shadow-lg shadow-purple-500/20">

          <div className="relative z-10 flex items-center justify-between w-full">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Image
                    src="/DevLynxLogo.png"
                    alt="DevLynx logo"
                    width={50}
                    height={50}
                    priority
                    className="object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-35 transition-opacity"></div>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block" style={{ fontFamily: 'var(--font-montSerrat)' }}>
                DevLynx
              </span>
            </a>

            {/* Desktop Navigation */}
            <NavItems 
              items={navItems.map(item => ({
                ...item,
                className: `flex items-center gap-2 transition-all ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`
              }))} 
            />

            {/* CTA Button */}
            <div className="flex items-center gap-3">
              <a href="#contact">
                <NavbarButton 
                  variant="primary" 
                  className="hidden md:inline-flex bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Hire Me
                </NavbarButton>
              </a>
            </div>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="relative z-10">
          <MobileNavHeader className="bg-gray-900/95 backdrop-blur-lg">
            <a
              href="#hero"
              className="flex items-center space-x-2"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <Image
                    src="/DevLynxLogo.png"
                    alt="DevLynx logo"
                    width={50}
                    height={50}
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-white font-bold text-xl">DevLynx</span>
            </a>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((s) => !s)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="bg-gray-900/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="flex flex-col gap-2 py-4">
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                    activeSection === item.id
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-purple-400">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}

              <div className="px-4 pt-4">
                <a 
                  href="#contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  <NavbarButton 
                    variant="primary" 
                    className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    Hire Me
                  </NavbarButton>
                </a>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </RNNavbar>
    </header>
  )
}