"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileText, ChevronDown, ChevronRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/context/language-context"
import { LocalizedDateRange } from "@/components/localized-date-range"

interface TimelineItem {
  year?: string
  period?: string
  title: string
  description: string | React.ReactElement
  icon?: React.ReactNode
  institution?: string
  degree?: string
  grade?: string
  details?: {
    focus?: string[]
    projects?: string[]
    thesis?: string[]
    keySkills?: string[]
    bullets?: string[]
  }
  certificate?: { name: string; url: string } | null
  thesisPdf?: {
    buttonLabelKey?: string
    modalTitle?: string
    url: string
    type?: string
  }
  extraCertificates?: Array<{
    name: string
    url: string
  }>
  logo?: string
  logoFit?: "cover" | "contain"
  hasDetailedView?: boolean
  showCourses?: boolean
  courses?: Array<{
    name: string
    grade?: string
    description?: string
    semester?: string
  }>
}

interface TimelineProps {
  items: TimelineItem[]
  onViewCertificate: (title: string, url: string) => void
  onViewDetailedInfo: (item: TimelineItem) => void
  onViewCourses?: (courses: any[]) => void
}

const Timeline = ({ items, onViewCertificate, onViewDetailedInfo, onViewCourses }: TimelineProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const { t } = useLanguage()

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-500"></div>

      {/* Timeline items */}
      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`relative pl-12 ${expandedIndex === index ? "pb-6" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Circle on the timeline */}
            <div
              className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              {item.icon || index + 1}
            </div>

            {/* Content */}
            <div className="bg-[#1e293b] rounded-lg p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-start gap-3">
                  {item.logo && (
                    <div className="w-16 h-10 sm:w-12 sm:h-12 bg-white rounded-lg border border-cyan-500/30 overflow-hidden relative flex items-center justify-center">
                      <Image
                        src={item.logo || "/placeholder.svg"}
                        alt={item.institution || item.title}
                        fill
                        className={
                          item.logoFit === "contain"
                            ? "object-contain p-1"
                            : "object-cover"
                        }
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-white">{t(item.title)}</h3>
                    {item.degree && <p className="text-cyan-400">{item.degree}</p>}
                    {/* Show year/period below title on mobile */}
                    <div className="text-cyan-400 text-sm sm:hidden">
                      <LocalizedDateRange date={item.period || item.year} />
                    </div>
                  </div>
                </div>
                {/* Show year/period on the right for larger screens */}
                <div className="text-cyan-400 text-sm hidden sm:block whitespace-nowrap ml-auto text-right">
                  <LocalizedDateRange date={item.period || item.year} />
                </div>
                {expandedIndex === index ? (
                  <ChevronDown className="h-4 w-4 ml-2 text-cyan-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 ml-2 text-cyan-400" />
                )}
              </div>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedIndex === index ? "auto" : 0,
                  opacity: expandedIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  {item.grade && (
                    <div className="inline-block px-2 py-1 bg-cyan-500/10 rounded text-cyan-400 text-sm mb-3">
                      {t("timeline.grade")}: {item.grade}
                    </div>
                  )}

                  <p className="text-gray-300 mb-4">
                    {typeof item.description === "string" ? t(item.description) : item.description}
                  </p>

                  {item.details && (
                    <div className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.details.focus && item.details.focus.length > 0 && (
                          <div>
                            <h4 className="text-white font-medium mb-2">{t("timeline.focus")}</h4>
                            <ul className="space-y-1 text-gray-300">
                              {item.details.focus.map((focus, idx) => (
                                <li key={idx} className="flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2"></div>
                                  {t(focus)}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.details.projects && item.details.projects.length > 0 && (
                          <div>
                            <h4 className="text-white font-medium mb-2">{t("timeline.projects")}</h4>
                            <ul className="space-y-1 text-gray-300">
                              {item.details.projects.map((project, idx) => (
                                <li key={idx} className="flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2"></div>
                                  {t(project)}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {item.details.thesis && item.details.thesis.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-white font-medium mb-2">{t("timeline.bachelor.thesis.title")}</h4>
                          <ul className="space-y-1 text-gray-300">
                            {item.details.thesis.map((th, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="w-1.5 flex-shrink-0 mt-2 h-1.5 rounded-full bg-cyan-400 mr-2"></div>
                                <span>{t(th)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.details.bullets && item.details.bullets.length > 0 && (
                        <div className="mt-4">
                          <ul className="space-y-2">
                            {item.details.bullets.map((k, i) => (
                              <li
                                key={i}
                                className="relative rounded-md bg-[#0f172a]/60 border border-cyan-500/15 pl-4 py-2 pr-3 text-sm text-gray-300
                                           before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1
                                           before:bg-gradient-to-b before:from-cyan-400 before:to-blue-500
                                           hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-200 transition-colors"
                              >
                                {t(k)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.details.keySkills && item.details.keySkills.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-white font-medium mb-2">{t("timeline.keySkills")}</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.details.keySkills.map((skill, idx) => (
                              <Badge key={idx} className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}                   
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.certificate && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-cyan-500/30 text-cyan-300 bg-[#0f172a] hover:bg-[#172033] hover:text-cyan-200"
                        onClick={e => {
                          e.stopPropagation()
                          onViewCertificate(item.certificate!.name, item.certificate!.url)
                        }}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        {t(item.certificate.name)}
                      </Button>
                    )}

                    {item.showCourses && item.courses && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-cyan-500/30 text-cyan-300 bg-[#0f172a] hover:bg-[#172033] hover:text-cyan-200"
                        onClick={e => {
                          e.stopPropagation()
                          onViewCourses?.(item.courses!)
                        }}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {t("timeline.viewCourses")}
                      </Button>
                    )}

                    {item.thesisPdf && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-cyan-500/30 text-cyan-300 bg-[#0f172a] hover:bg-[#172033] hover:text-cyan-200"
                        onClick={e => {
                          e.stopPropagation()
                          onViewCertificate(
                            item.thesisPdf!.modalTitle || (item.thesisPdf!.buttonLabelKey ? t(item.thesisPdf!.buttonLabelKey) : "Thesis"),
                            item.thesisPdf!.url
                          )
                        }}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        {item.thesisPdf.buttonLabelKey
                          ? t(item.thesisPdf.buttonLabelKey)
                          : item.thesisPdf.modalTitle || "Thesis"}
                      </Button>
                    )}

                    {item.extraCertificates && item.extraCertificates.map((cert, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="text-xs border-cyan-500/30 text-cyan-300 bg-[#0f172a] hover:bg-[#172033] hover:text-cyan-200"
                        onClick={e => {
                          e.stopPropagation()
                          onViewCertificate(cert.name, cert.url)
                        }}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        {t(cert.name)}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
