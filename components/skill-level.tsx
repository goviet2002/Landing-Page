import { Badge } from "@/components/ui/badge"

interface SkillLevelProps {
  skill: string
  level: string
  description?: string
}

const SkillLevel = ({ skill, level, description }: SkillLevelProps) => {
  const getLevelColor = () => {
    switch (level) {
      case "Beginner":
        return "bg-blue-500/10 text-blue-300 border-blue-500/30"
      case "Intermediate":
      case "Mittelstufe":
      case "Trung bình":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
      case "Advanced":
      case "Fortgeschritten":
      case "Nâng cao":
        return "bg-teal-500/10 text-teal-300 border-teal-500/30"
      case "Expert":
      case "Experte":
      case "Chuyên gia":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
      default:
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
    }
  }

  const getLevelWidth = () => {
    switch (level) {
      case "Beginner":
        return "w-1/4"
      case "Intermediate":
      case "Mittelstufe":
      case "Trung bình":
        return "w-2/4"
      case "Advanced":
      case "Fortgeschritten":
      case "Nâng cao":
        return "w-3/4"
        case "Expert":
      case "Experte":
      case "Chuyên gia":
        return "w-full"
      default:
        return "w-2/4"
    }
  }

  return (
    <div className="mb-6 group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">{skill}</span>
        <Badge className={`${getLevelColor()} transition-colors`}>{level}</Badge>
      </div>
      <div className="h-2 w-full bg-[#0f172a] rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full ${getLevelWidth()}`} />
      </div>
      {description && <p className="text-gray-400 text-sm mt-2">{description}</p>}
    </div>
  )
}

export default SkillLevel
