"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  link?: string
  date?: string
  code?: string
  demoImages?: string[]
  onClick?: () => void
}

const ProjectCard = ({ title, description, tags, image, link, date, onClick }: ProjectCardProps) => {
  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-lg bg-[#1e293b] border-cyan-500/20 hover:border-cyan-500/40 w-full flex-shrink-0 h-[420px] group cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-blue-900/30 z-10 group-hover:opacity-70 transition-opacity"></div>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">{title}</CardTitle>
        {date && (
          <div className="flex items-center text-sm text-gray-400 mt-1">
            <Calendar className="h-4 w-4 mr-1 text-cyan-400" />
            {date}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow overflow-hidden">
        <CardDescription className="text-gray-300 mb-4 line-clamp-3">{description}</CardDescription>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      {link && (
        <CardFooter className="p-4 pt-0">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            View Project <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </CardFooter>
      )}
    </Card>
  )
}

export default ProjectCard
