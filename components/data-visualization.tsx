"use client"

import { useEffect, useRef } from "react"

const DataVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Data points for visualization
    const dataPoints = [
      { label: "Python", value: 85 },
      { label: "SQL", value: 80 },
      { label: "Data Analysis", value: 90 },
      { label: "Machine Learning", value: 75 },
      { label: "Visualization", value: 85 },
    ]

    // Colors
    const colors = [
      "#06b6d4", // cyan-500
      "#0891b2", // cyan-600
      "#0e7490", // cyan-700
      "#155e75", // cyan-800
      "#164e63", // cyan-900
    ]

    // Animation variables
    let animationFrame: number
    let currentStep = 0
    const totalSteps = 60

    // Draw function
    const draw = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate progress
      const progress = Math.min(currentStep / totalSteps, 1)

      // Draw background
      ctx.fillStyle = "rgba(15, 23, 42, 0.3)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      const gridSize = 20
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)" // cyan-500 with opacity
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

      // Draw title
      ctx.fillStyle = "#06b6d4" // cyan-500
      ctx.font = "bold 16px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("Skills Distribution", canvas.width / 2, 30)

      // Draw bar chart
      const barWidth = (canvas.width - 80) / dataPoints.length
      const maxBarHeight = canvas.height - 100

      dataPoints.forEach((point, index) => {
        const x = 40 + index * barWidth
        const barHeight = (point.value / 100) * maxBarHeight * progress

        // Draw bar
        const gradient = ctx.createLinearGradient(x, canvas.height - 50 - barHeight, x, canvas.height - 50)
        gradient.addColorStop(0, colors[index % colors.length])
        gradient.addColorStop(1, "rgba(6, 182, 212, 0.3)") // cyan-500 with opacity

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - 50 - barHeight, barWidth - 10, barHeight)

        // Add data points and connecting lines
        if (index > 0) {
          const prevX = 40 + (index - 1) * barWidth + (barWidth - 10) / 2
          const prevY = canvas.height - 50 - (dataPoints[index - 1].value / 100) * maxBarHeight * progress
          const currX = x + (barWidth - 10) / 2
          const currY = canvas.height - 50 - barHeight

          ctx.beginPath()
          ctx.moveTo(prevX, prevY)
          ctx.lineTo(currX, currY)
          ctx.strokeStyle = "rgba(6, 182, 212, 0.6)" // cyan-500 with opacity
          ctx.lineWidth = 2
          ctx.stroke()

          ctx.beginPath()
          ctx.arc(prevX, prevY, 4, 0, Math.PI * 2)
          ctx.fillStyle = "#06b6d4" // cyan-500
          ctx.fill()
        }

        if (index === dataPoints.length - 1) {
          ctx.beginPath()
          ctx.arc(x + (barWidth - 10) / 2, canvas.height - 50 - barHeight, 4, 0, Math.PI * 2)
          ctx.fillStyle = "#06b6d4" // cyan-500
          ctx.fill()
        }

        // Draw label
        ctx.fillStyle = "#94a3b8" // slate-400
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(point.label, x + (barWidth - 10) / 2, canvas.height - 30)

        // Draw value
        if (progress > 0.7) {
          const valueOpacity = (progress - 0.7) / 0.3
          ctx.fillStyle = `rgba(6, 182, 212, ${valueOpacity})` // cyan-500 with opacity
          ctx.font = "bold 12px sans-serif"
          ctx.fillText(
            `${Math.round(point.value * progress)}%`,
            x + (barWidth - 10) / 2,
            canvas.height - 55 - barHeight,
          )
        }

        // Add data points
        ctx.beginPath()
        ctx.arc(x + (barWidth - 10) / 2, canvas.height - 50 - barHeight, 4, 0, Math.PI * 2)
        ctx.fillStyle = "#06b6d4" // cyan-500
        ctx.fill()
      })

      // Continue animation
      if (currentStep < totalSteps) {
        currentStep++
        animationFrame = requestAnimationFrame(draw)
      }
    }

    // Start animation
    animationFrame = requestAnimationFrame(draw)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="w-full h-[300px] overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

export default DataVisualization
