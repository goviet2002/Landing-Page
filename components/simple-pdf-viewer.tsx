"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"

interface SimplePDFViewerProps {
  file: string
}

export function SimplePDFViewer({ file }: SimplePDFViewerProps) {
  const [loading, setLoading] = useState(true)
  const [zoom, setZoom] = useState(100)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [file])

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2 bg-[#0f172a] border-b border-cyan-500/30">
        <div className="flex-1"></div>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={zoomOut} className="text-cyan-400 hover:bg-cyan-500/10">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-white mx-2">{zoom}%</span>
          <Button variant="ghost" size="sm" onClick={zoomIn} className="text-cyan-400 hover:bg-cyan-500/10">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-auto bg-white">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-800">Loading PDF...</div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <iframe src={`${file}#zoom=${zoom}`} className="w-full h-full border-0" title="PDF Viewer" />
          </div>
        )}
      </div>
    </div>
  )
}

export default SimplePDFViewer
