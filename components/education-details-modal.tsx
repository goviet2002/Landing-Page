"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, GraduationCap, Calendar, Award } from "lucide-react"
import Image from "next/image"

interface EducationDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  education: {
    title: string
    institution?: string
    degree?: string
    period: string
    grade?: string
    description?: string
    courses?: Array<{
      name: string
      grade?: string
      description?: string
    }>
    logo?: string
    certificate?: {
      name: string
      url: string
    }
  } | null
}

const EducationDetailsModal = ({ isOpen, onClose, education }: EducationDetailsModalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!education) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#1e293b] border-cyan-500/30 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-400">{education.title}</DialogTitle>
          {education.degree && (
            <div className="flex items-center text-gray-300 mt-1">
              <GraduationCap className="h-4 w-4 mr-2 text-cyan-400" />
              {education.degree}
            </div>
          )}
          <div className="flex items-center text-gray-300 mt-1">
            <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
            {education.period}
          </div>
          {education.grade && (
            <div className="flex items-center text-gray-300 mt-1">
              <Award className="h-4 w-4 mr-2 text-cyan-400" />
              Grade: {education.grade}
            </div>
          )}
        </DialogHeader>

        <Tabs defaultValue="courses" className="mt-4">
          <TabsList className="bg-[#0f172a] border border-cyan-500/20">
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              <FileText className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            {education.certificate && (
              <TabsTrigger
                value="certificate"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
              >
                <Award className="h-4 w-4 mr-2" />
                Certificate
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="courses" className="mt-4">
            {education.courses && education.courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {education.courses.map((course, index) => (
                  <div key={index} className="bg-[#0f172a] p-4 rounded-lg border border-cyan-500/20">
                    <h3 className="font-medium text-white">{course.name}</h3>
                    {course.grade && <p className="text-cyan-400 text-sm mt-1">Grade: {course.grade}</p>}
                    {course.description && <p className="text-gray-300 text-sm mt-2">{course.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-300">No course information available.</p>
            )}
          </TabsContent>

          <TabsContent value="overview" className="mt-4">
            <div className="bg-[#0f172a] p-6 rounded-lg border border-cyan-500/20">
              {education.description && <p className="text-gray-300 mb-4">{education.description}</p>}

              {education.logo && (
                <div className="flex justify-center my-6">
                  <div className="w-32 h-32 bg-white rounded-lg overflow-hidden">
                    <Image
                      src={education.logo || "/placeholder.svg"}
                      alt={education.title}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          {education.certificate && (
            <TabsContent value="certificate" className="mt-4">
              <div className="bg-white rounded-lg overflow-hidden h-[70vh]">
                {education.certificate.url.endsWith(".pdf") ? (
                  <iframe
                    src={`${education.certificate.url}#toolbar=0&navpanes=0`}
                    className="w-full h-full"
                    title={education.certificate.name}
                  />
                ) : (
                  <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(education.certificate.url)}&embedded=true`}
                    className="w-full h-full"
                    title={education.certificate.name}
                  />
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default EducationDetailsModal
