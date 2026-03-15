'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import { Home, Info, Briefcase, FolderOpen, Package, Mail } from 'lucide-react'
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
      const sections = ['hero', 'about', 'services', 'projects', 'packages', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home',     link: '#hero',     icon: <Home size={18} />,       id: 'hero' },
    { name: 'About',    link: '#about',    icon: <Info size={18} />,       id: 'about' },
    { name: 'Services', link: '#services', icon: <Briefcase size={18} />,  id: 'services' },
    { name: 'Projects', link: '#projects', icon: <FolderOpen size={18} />, id: 'projects' },
    { name: 'Packages', link: '#packages', icon: <Package size={18} />,    id: 'packages' },
    { name: 'Contact',  link: '#contact',  icon: <Mail size={18} />,       id: 'contact' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-100">
      <RNNavbar className="relative z-50">

        {/* ── Desktop nav ── */}
        <NavBody className="relative overflow-hidden backdrop-blur-lg bg-[#001436]/85 border-b border-blue-600/15 shadow-[0_4px_24px_rgba(37,99,235,0.12)]">
          <div className="relative z-10 flex items-center justify-between w-full">

            {/* Logo */}
            <a href="#hero" className="flex items-center space-x-2 group">
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
                <div className="absolute inset-0 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity bg-linear-to-r from-blue-600 to-blue-800" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl leading-none text-slate-100" style={{ fontFamily: 'var(--font-montSerrat)' }}>
                  Dev<span className="text-blue-500">Lynx</span>
                </span>
                <p className="text-xs leading-none mt-0.5 text-slate-500">IT Solutions</p>
              </div>
            </a>

            {/* Desktop nav items */}
            <NavItems
              items={navItems.map(item => ({
                ...item,
                className: `flex items-center gap-2 transition-all text-sm font-medium px-3 py-1.5 rounded-lg ${
                  activeSection === item.id
                    ? 'text-blue-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`,
              }))}
            />

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a href="#contact">
                <NavbarButton
                  variant="primary"
                  className="hidden md:inline-flex text-white font-semibold bg-blue-600 hover:bg-blue-700 shadow-[0_0_16px_rgba(37,99,235,0.35)]"
                >
                  Hire Us
                </NavbarButton>
              </a>
            </div>
          </div>
        </NavBody>

        {/* ── Mobile nav ── */}
        <MobileNav className="relative z-10">
          <MobileNavHeader className="bg-[#001436]/97 backdrop-blur-lg border-b border-blue-600/15">
            <a href="#hero" className="flex items-center space-x-2">
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
              <div>
                <span className="font-bold text-xl text-slate-100">
                  Dev<span className="text-blue-500">Lynx</span>
                </span>
                <p className="text-xs text-slate-500">IT Solutions</p>
              </div>
            </a>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((s) => !s)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="bg-[#001436]/97 backdrop-blur-lg border-t border-blue-600/10"
          >
            <div className="flex flex-col w-full gap-1.5 py-4">
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl flex items-center gap-3 transition-all border ${
                    activeSection === item.id
                      ? 'text-blue-400 bg-blue-600/12 border-blue-600/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-blue-600/8'
                  }`}
                >
                  <span className="text-blue-500">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}

              <div className="px-4 pt-4">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block">
                  <NavbarButton
                    variant="primary"
                    className="w-full text-white font-semibold bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                  >
                    Hire Us
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