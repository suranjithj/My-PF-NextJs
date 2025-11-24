"use client"

import React, { useEffect, useRef } from "react"

type Star = {
  x: number
  y: number
  z: number
  size: number
  speed: number
  hue?: number
}

export default function ParallaxStars({
  starCount = 300,
  color = "255,255,255",
  maxDepth = 8,
  autoMoveSpeed = 0.5,
}: {
  starCount?: number
  color?: string
  maxDepth?: number
  autoMoveSpeed?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const starsRef = useRef<Star[]>([])
  const rafRef = useRef<number | null>(null)
  const scrollRef = useRef(0)
  const timeRef = useRef(0)

  const initStars = (w: number, h: number) => {
    const arr: Star[] = []
    for (let i = 0; i < starCount; i++) {
      arr.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * maxDepth + 0.2,
        size: Math.random() * 1.8 + 0.2,
        speed: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 360,
      })
    }
    starsRef.current = arr
  }

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      dpr = Math.max(1, window.devicePixelRatio || 1)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStars(w, h)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("scroll", () => {
      scrollRef.current = window.scrollY || window.pageYOffset || 0
    })

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight

      // gradient background
      const g = ctx.createLinearGradient(0, 0, 0, h)
      g.addColorStop(0, "rgba(6,6,23,1)")
      g.addColorStop(1, "rgba(18,3,40,1)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      const scrollOffset = scrollRef.current / Math.max(h, 1)

      for (const s of starsRef.current) {
        // parallax offset based on depth
        const depthFactor = 1 / s.z
        
        // Automatic upward movement based on time
        const autoMoveY = (timeRef.current * autoMoveSpeed * depthFactor) % h
        
        const px = s.x - scrollOffset * 120 * depthFactor
        const py = s.y - autoMoveY - scrollOffset * 60 * depthFactor

        // twinkle effect
        const twinkle = Math.sin((performance.now() * 0.002 + s.z * 10) % (Math.PI * 2))
        const radius = Math.max(0.2, s.size + twinkle * 0.6)

        ctx.beginPath()
        ctx.fillStyle = `rgba(${color}, ${0.9 * depthFactor})`
        ctx.shadowColor = `rgba(${color}, ${0.9 * depthFactor})`
        ctx.shadowBlur = 6 * depthFactor
        ctx.arc(px, py, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = () => {
      draw()
      
      // Increment time for automatic movement
      timeRef.current += 1

      // animate stars
      for (const s of starsRef.current) {
        // Move stars upward continuously
        s.y -= s.speed * (0.3 + (s.z / maxDepth))
        
        // slight horizontal drift
        s.x += (s.speed * 0.2) * (0.1 + (s.z / maxDepth))
        
        // wrap around when going off screen
        if (s.y < -20) {
          s.y = window.innerHeight + 20
          s.x = Math.random() * window.innerWidth
        }
        if (s.x > window.innerWidth + 20) s.x = -20
        if (s.x < -20) s.x = window.innerWidth + 20
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", () => {})
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [starCount, color, maxDepth, autoMoveSpeed])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden
    />
  )
}