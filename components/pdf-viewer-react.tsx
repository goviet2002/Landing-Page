"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"

interface PDFViewerProps {
  file: string
}

export function PDFViewer({ file }: PDFViewerProps) {
  const [scale, setScale] = useState(1.0)
  const [loading, setLoading] = useState(true)

  function zoomIn() {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2.0))
  }

  function zoomOut() {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.6))
  }

  useEffect(() => {
    // Reset state when file changes
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [file])

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2 bg-[#0f172a] border-b border-cyan-500/30">
        <div className="flex items-center">
          <span className="text-white mx-2">PDF Viewer</span>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={zoomOut}
            disabled={loading}
            className="text-cyan-400 hover:bg-cyan-500/10"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-white mx-2">{Math.round(scale * 100)}%</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={zoomIn}
            disabled={loading}
            className="text-cyan-400 hover:bg-cyan-500/10"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-auto bg-white flex justify-center items-center">
        {loading ? (
          <div className="text-gray-800">Loading PDF...</div>
        ) : (
          <iframe
            src={`${file}#toolbar=0&view=FitH&zoom=${scale * 100}`}
            className="w-full h-full"
            style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
          />
        )}
      </div>
    </div>
  )
}
