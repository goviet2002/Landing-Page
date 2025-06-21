"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

const TypingEffect = ({ text, speed = 100, className = "", onComplete }: TypingEffectProps) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete && onComplete()
    }
  }, [currentIndex, text, speed, isComplete, onComplete])

  useEffect(() => {
    setDisplayText("")
    setCurrentIndex(0)
    setIsComplete(false)
  }, [text])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default TypingEffect
