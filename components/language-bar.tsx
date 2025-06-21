interface LanguageBarProps {
  language: string
  level: string
  percentage: number
}

const LanguageBar = ({ language, level, percentage }: LanguageBarProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-white">{language}</span>
        <span className="text-gray-400">{level}</span>
      </div>
      <div className="h-2 w-full bg-[#0f172a] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default LanguageBar
