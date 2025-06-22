"use client"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

interface ProjectFilterProps {
  categories: string[]
  onFilterChange: (category: string) => void
  activeFilter: string
}

const ProjectFilter = ({ categories, onFilterChange, activeFilter }: ProjectFilterProps) => {
  const { t } = useLanguage()

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      <Button
        variant="outline"
        size="sm"
        className={`rounded-full ${
          activeFilter === "all"
            ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
            : "text-cyan-300 border-cyan-500/30 bg-[#0f172a]/60 hover:bg-cyan-500/10 hover:text-cyan-400"
        }`}
        onClick={() => onFilterChange("all")}
      >
        {t("projects.all")}
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          className={`rounded-full ${
            activeFilter === category
              ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
              : "text-cyan-300 border-cyan-500/30 bg-[#0f172a]/60 hover:bg-cyan-500/10 hover:text-cyan-400"
          }`}
          onClick={() => onFilterChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

export default ProjectFilter
