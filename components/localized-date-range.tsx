import { useLanguage } from "@/context/language-context"

const monthMap: Record<string, Record<string, string>> = {
  en: {
    Jan: "Jan", Feb: "Feb", Mar: "Mar", Apr: "Apr", May: "May", Jun: "Jun",
    Jul: "Jul", Aug: "Aug", Sept: "Sept", Sep: "Sep", Oct: "Oct", Nov: "Nov", Dec: "Dec",
    now: "now"
  },
  de: {
    Jan: "Jan", Feb: "Feb", Mar: "Mär", Apr: "Apr", May: "Mai", Jun: "Jun",
    Jul: "Jul", Aug: "Aug", Sept: "Sept", Sep: "Sep", Oct: "Okt", Nov: "Nov", Dec: "Dez",
    now: "jetzt"
  },
  vi: {
    Jan: "Thg 1", Feb: "Thg 2", Mar: "Thg 3", Apr: "Thg 4", May: "Thg 5", Jun: "Thg 6",
    Jul: "Thg 7", Aug: "Thg 8", Sept: "Thg 9", Sep: "Thg 9", Oct: "Thg 10", Nov: "Thg 11", Dec: "Thg 12",
    now: "hiện tại"
  }
}

function localizeDateRange(date: string, language: string) {
  return date.replace(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Sep|Oct|Nov|Dec|now)\b/gi,
    (match) => monthMap[language][match] || match
  )
}

interface LocalizedDateRangeProps {
  date?: string
  className?: string
}

export function LocalizedDateRange({ date, className }: LocalizedDateRangeProps) {
  const { language } = useLanguage()
  if (!date) return null
  return <span className={className}>{localizeDateRange(date, language)}</span>
}