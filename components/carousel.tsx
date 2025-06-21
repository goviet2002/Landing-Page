"use client"

import { useState, useEffect, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  children: ReactNode[]
  itemsPerView: number
  className?: string
  fullWidth?: boolean
  onFilterChange?: () => void
}

const Carousel = ({ children, itemsPerView, className = "", fullWidth = false, onFilterChange }: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(Math.ceil(children.length / itemsPerView))
  const [isAnimating, setIsAnimating] = useState(false)

  // Reset to first page when children change (e.g., when filter changes)
  useEffect(() => {
    setCurrentPage(0)
    setTotalPages(Math.ceil(children.length / itemsPerView))
  }, [children, itemsPerView])

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const goToPage = (page: number) => {
    if (isAnimating || page === currentPage) return
    setIsAnimating(true)
    setCurrentPage(page)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500) // Match this with the CSS transition duration
    return () => clearTimeout(timer)
  }, [currentPage])

  // Get current items to display
  const renderItems = () => {
    // Create groups of items based on itemsPerView
    const itemGroups = []
    for (let i = 0; i < children.length; i += itemsPerView) {
      itemGroups.push(children.slice(i, i + itemsPerView))
    }

    return (
      <div className="overflow-hidden">
        <div
          className="transition-transform duration-500 ease-in-out flex"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {itemGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex-shrink-0 w-full">
              <div
                className={
                  fullWidth ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "grid grid-cols-1 md:grid-cols-3 gap-6"
                }
              >
                {group.map((item, itemIndex) => (
                  <div key={itemIndex} className="w-full">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {renderItems()}

      <div className="flex justify-center mt-8 gap-4">
        <Button
          onClick={prev}
          variant="outline"
          size="icon"
          className="rounded-full bg-[#1e293b] border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
          aria-label="Previous slide"
          disabled={isAnimating || totalPages <= 1}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentPage ? "bg-cyan-400 w-4" : "bg-cyan-800/50"
              }`}
              aria-label={`Go to page ${i + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>

        <Button
          onClick={next}
          variant="outline"
          size="icon"
          className="rounded-full bg-[#1e293b] border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
          aria-label="Next slide"
          disabled={isAnimating || totalPages <= 1}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

export default Carousel
