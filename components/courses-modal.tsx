"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Carousel from "@/components/carousel"
import { useLanguage } from "@/context/language-context"

interface Course {
  name: string
  grade?: string
  description?: string
  semester?: string
}

interface CoursesOnlyModalProps {
  isOpen: boolean
  onClose: () => void
  courses?: Course[]
}

const CoursesOnlyModal = ({ isOpen, onClose, courses }: CoursesOnlyModalProps) => {
  const { t } = useLanguage()
  if (!courses) return null

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="bg-[#1e293b] border-cyan-500/30 text-white max-w-[1100px] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-400">{t("timeline.courses")}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Carousel itemsPerView={3}>
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-[#0f172a] rounded-lg p-4 border border-cyan-500/10 flex flex-col h-full min-h-[180px] min-w-[340px] max-w-[400px] mx-auto"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold text-cyan-300 text-base">
                    {t(course.name)} {/* Use t() for course name */}
                  </div>
                  {course.semester && (
                    <div className="text-xs font-semibold text-cyan-300 ml-4 whitespace-nowrap">
                      {course.semester}
                    </div>
                  )}
                </div>
                {course.grade && (
                  <div className="text-xs text-cyan-400 font-medium mb-1">
                    {t("courses.grade")}: {course.grade}
                  </div>
                )}
                {course.description && (
                  <div className="text-sm text-gray-300">
                    {t(course.description)}
                  </div>
                )}
              </div>
            ))}
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CoursesOnlyModal