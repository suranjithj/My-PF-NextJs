"use client"

import React, { useState } from "react"

export default function HoverGlowCard({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative rounded-lg"
    >
      {/* overlay: semi-transparent radial gradient that follows the mouse */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          // gradient center follows mouse coordinates
          background: `radial-gradient(300px 200px at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.40), rgba(139,92,246,0.3) 20%, rgba(139,92,246,0.2) 40%, transparent 60%)`,
          filter: "blur(24px)",
          mixBlendMode: "screen",
          zIndex: 20,
        }}
      />

      {/* actual card content */}
      <div className="relative rounded-lg transition-transform duration-200 hover:-translate-y-0.5">
        {children}
      </div>
    </div>
  )
}
