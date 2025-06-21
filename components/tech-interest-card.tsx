import type { ReactNode } from "react"

interface TechInterestCardProps {
  title: string
  description: string
  icon: ReactNode
  gradient?: string
}

const TechInterestCard = ({
  title,
  description,
  icon,
  gradient = "from-cyan-500 to-blue-500",
}: TechInterestCardProps) => {
  return (
    <div className="bg-[#0f172a] rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all p-5 group hover:shadow-lg hover:shadow-cyan-500/5 h-full">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} text-white`}>{icon}</div>
        <div>
          <h4 className="font-medium text-white mb-2 group-hover:text-cyan-400 transition-colors">{title}</h4>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default TechInterestCard
