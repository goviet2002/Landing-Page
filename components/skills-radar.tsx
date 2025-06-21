"use client"

import { useEffect, useRef } from "react"

const SkillsRadar = () => {
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

    // Skills data
    const skills = [
      { name: "Python", value: 0.85 },
      { name: "Data Analysis", value: 0.9 },
      { name: "SQL", value: 0.8 },
      { name: "Machine Learning", value: 0.75 },
      { name: "Visualization", value: 0.85 },
      { name: "Big Data", value: 0.7 },
      { name: "Web Development", value: 0.65 },
      { name: "Scala", value: 0.6 },
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

      // Calculate center and radius
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) * 0.8

      // Draw radar background
      drawRadarBackground(ctx, centerX, centerY, radius)

      // Draw data
      drawSkillsData(ctx, centerX, centerY, radius, skills, progress)

      // Continue animation
      if (currentStep < totalSteps) {
        currentStep++
        animationFrame = requestAnimationFrame(draw)
      }
    }

    // Draw radar background
    const drawRadarBackground = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
      const sides = skills.length

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

      // Draw circles
      for (let level = 1; level <= 5; level++) {
        const levelRadius = (radius * level) / 5

        ctx.beginPath()
        ctx.arc(centerX, centerY, levelRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 + level * 0.05})` // cyan with increasing opacity
        ctx.stroke()
      }

      // Draw lines
      for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 * i) / sides - Math.PI / 2

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
        ctx.strokeStyle = "rgba(6, 182, 212, 0.3)" // cyan with opacity
        ctx.stroke()

        // Draw labels
        const labelX = centerX + (radius + 20) * Math.cos(angle)
        const labelY = centerY + (radius + 20) * Math.sin(angle)

        ctx.fillStyle = "#94a3b8" // slate-400
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(skills[i].name, labelX, labelY)
      }
    }

    // Draw skills data
    const drawSkillsData = (
      ctx: CanvasRenderingContext2D,
      centerX: number,
      centerY: number,
      radius: number,
      skills: { name: string; value: number }[],
      progress: number,
    ) => {
      const sides = skills.length

      ctx.beginPath()

      for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 * i) / sides - Math.PI / 2
        const value = skills[i].value * progress

        const pointX = centerX + radius * value * Math.cos(angle)
        const pointY = centerY + radius * value * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(pointX, pointY)
        } else {
          ctx.lineTo(pointX, pointY)
        }
      }

      // Close the path
      const firstAngle = -Math.PI / 2
      const firstValue = skills[0].value * progress
      ctx.lineTo(
        centerX + radius * firstValue * Math.cos(firstAngle),
        centerY + radius * firstValue * Math.sin(firstAngle),
      )

      // Fill the shape
      ctx.fillStyle = "rgba(6, 182, 212, 0.2)" // cyan with opacity
      ctx.fill()

      // Stroke the shape
      ctx.strokeStyle = "rgba(6, 182, 212, 0.8)" // cyan with opacity
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw points
      for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 * i) / sides - Math.PI / 2
        const value = skills[i].value * progress

        const pointX = centerX + radius * value * Math.cos(angle)
        const pointY = centerY + radius * value * Math.sin(angle)

        ctx.beginPath()
        ctx.arc(pointX, pointY, 4, 0, Math.PI * 2)
        ctx.fillStyle = "#06b6d4" // cyan-500
        ctx.fill()

        // Draw value labels
        if (progress > 0.9) {
          const valueOpacity = (progress - 0.9) / 0.1
          const valueX = centerX + radius * value * 0.85 * Math.cos(angle)
          const valueY = centerY + radius * value * 0.85 * Math.sin(angle)

          ctx.fillStyle = `rgba(255, 255, 255, ${valueOpacity})`
          ctx.font = "bold 10px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(`${Math.round(skills[i].value * 100)}%`, valueX, valueY)
        }
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
    <div className="w-full h-[400px] overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

export default SkillsRadar
