"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText } from "lucide-react"

interface PDFViewerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  pdfUrl: string
}

const PDFViewer = ({ isOpen, onClose, title, pdfUrl }: PDFViewerProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#1e293b] border-cyan-500/30 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-bold text-cyan-400">
            <FileText className="h-6 w-6 mr-2" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 bg-white rounded-lg overflow-hidden h-[70vh]">
          <iframe src={pdfUrl} className="w-full h-full" title={title} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PDFViewer
