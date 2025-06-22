"use client"

import { useEffect, useRef } from "react"

const DataBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create data points
    type DataPoint = {
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      connected: number[]
    }

    const dataPoints: DataPoint[] = []
    const numPoints = 100

    for (let i = 0; i < numPoints; i++) {
      dataPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connected: [],
      })
    }

    // Connect nearby points
    for (let i = 0; i < numPoints; i++) {
      for (let j = i + 1; j < numPoints; j++) {
        const dx = dataPoints[i].x - dataPoints[j].x
        const dy = dataPoints[i].y - dataPoints[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          dataPoints[i].connected.push(j)
        }
      }
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      const gridSize = 30
      ctx.strokeStyle = "rgba(6, 182, 212, 0.05)" // cyan-500 with opacity
      ctx.lineWidth = 0.5

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Update and draw points
      for (let i = 0; i < numPoints; i++) {
        const point = dataPoints[i]

        // Update position
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Draw point
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(6, 182, 212, 0.5)" // cyan-500 with opacity
        ctx.fill()

        // Draw connections
        for (const connectedIndex of point.connected) {
          const connectedPoint = dataPoints[connectedIndex]
          const dx = point.x - connectedPoint.x
          const dy = point.y - connectedPoint.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(connectedPoint.x, connectedPoint.y)
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 - distance / 750})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-20" />
}

export default DataBackground
