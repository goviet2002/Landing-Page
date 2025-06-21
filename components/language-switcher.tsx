"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export type Language = "en" | "de" | "vi"

interface LanguageSwitcherProps {
  onChange: (language: Language) => void
  currentLanguage: Language
}

const LanguageSwitcher = ({ onChange, currentLanguage }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "vi", label: "Tiếng Việt" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-[#1e293b]/80 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <Globe className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-[#1e293b] border border-cyan-500/30 overflow-hidden z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`w-full text-left px-4 py-2 text-sm ${
                  currentLanguage === lang.code
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
                }`}
                onClick={() => {
                  onChange(lang.code as Language)
                  setIsOpen(false)
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
