import type { ReactNode } from "react"

interface SkillCategoryProps {
  title: string
  icon: ReactNode
  skills: string[]
  gradient?: string
}

const SkillCategory = ({ title, icon, skills, gradient = "from-cyan-500 to-blue-500" }: SkillCategoryProps) => {
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-md p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/5 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} text-white`}>{icon}</div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
      </div>

      <ul className="space-y-2 text-gray-300">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center group">
            <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2 group-hover:bg-cyan-300 transition-colors"></div>
            <span className="group-hover:text-cyan-300 transition-colors">{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkillCategory
