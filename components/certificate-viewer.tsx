"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText } from "lucide-react"
import Image from "next/image"
import { SimplePDFViewer } from "./simple-pdf-viewer"

interface CertificateViewerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  pdfUrl: string
  type?: "pdf" | "image"
}

const CertificateViewer = ({ isOpen, onClose, title, pdfUrl, type = "pdf" }: CertificateViewerProps) => {
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
        <div className="mt-4 rounded-lg overflow-hidden">
          {type === "pdf" ? (
            <div className="h-[70vh] bg-white rounded-lg">
              <SimplePDFViewer file={pdfUrl} />
            </div>
          ) : (
            <div className="relative w-full min-h-[400px] max-h-[80vh] flex items-center justify-center">
              <Image
                src={pdfUrl || "/placeholder.svg"}
                alt={title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CertificateViewer
