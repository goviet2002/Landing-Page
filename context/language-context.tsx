"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Language } from "@/components/language-switcher"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Hero section
    "hero.title": "Transforming Data into Insights",
    "hero.description":
      "I'm a motivated Computer Science student at Johannes Gutenberg-Universität Mainz, specializing in Data Science with a minor in Economics. With a strong GPA of 1.9, I'm passionate about extracting meaningful insights from data and developing innovative solutions.",
    "hero.viewProjects": "View Projects",
    "hero.downloadCV": "Download CV",

    // About section
    "about.title": "About Me",
    "about.description":
      "My technical toolkit includes Python, SQL, Pandas, and visualization tools like PowerBI and Seaborn. I've worked on projects ranging from sports analytics to recommendation systems using big data technologies.",
    "about.languages": "Languages",
    "about.german": "Business fluent",
    "about.english": "Business fluent",
    "about.vietnamese": "Native",
    "about.certification": "German Language Certification",

    // Education section
    "education.title": "Education",
    "education.bsc": "Bachelor of Science, Informatik",
    "education.focus": "Focus",
    "education.dataScience": "Focus: Data Science",
    "education.economics": "Minor: Economics",
    "education.projects": "Projects",
    "education.programming": "Programming (Computer Games)",
    "education.database": "Database (Web Development)",
    "education.software": "Software Engineering (Agile Methods)",
    "education.bigData": "Big Data (Recommendation System)",
    "education.keySkills": "Key Skills",
    "education.prep": "College/University Preparatory",

    // Skills section
    "skills.title": "Technical Skills",
    "skills.programming": "Programming & Data Skills",
    "skills.other": "Other Technical Skills",

    // Projects section
    "projects.title": "Projects",

    // Certifications section
    "certifications.title": "Certifications",

    // Contact section
    "contact.title": "Get In Touch",
    "contact.info": "Contact Information",
    "contact.lookingFor": "Career Interests",
    "contact.opportunities": "I'm currently seeking intern, trainee, or full-time opportunities in:",
    "contact.workinglocation": "Open to both remote and on-site roles throughout Germany.",
    "contact.sendMessage": "Send a Message",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",

    // Footer
    "footer.rights": "All rights reserved.",
  },
  de: {
    // Hero section
    "hero.title": "Daten in Erkenntnisse umwandeln",
    "hero.description":
      "Ich bin ein motivierter Informatikstudent an der Johannes Gutenberg-Universität Mainz, spezialisiert auf Data Science mit Nebenfach Wirtschaftswissenschaften. Mit einem starken Notendurchschnitt von 1,9 bin ich leidenschaftlich daran interessiert, aussagekräftige Erkenntnisse aus Daten zu gewinnen und innovative Lösungen zu entwickeln.",
    "hero.viewProjects": "Projekte ansehen",
    "hero.downloadCV": "Lebenslauf herunterladen",

    // About section
    "about.title": "Über mich",
    "about.description":
      "Mein technisches Toolkit umfasst Python, SQL, Pandas und Visualisierungstools wie PowerBI und Seaborn. Ich habe an Projekten gearbeitet, die von Sportanalysen bis hin zu Empfehlungssystemen mit Big-Data-Technologien reichen.",
    "about.languages": "Sprachen",
    "about.german": "Verhandlungssicher",
    "about.english": "Verhandlungssicher",
    "about.vietnamese": "Muttersprache",
    "about.certification": "Deutsche Sprachzertifizierung",

    // Education section
    "education.title": "Ausbildung",
    "education.bsc": "Bachelor of Science, Informatik",
    "education.focus": "Schwerpunkt",
    "education.dataScience": "Schwerpunkt: Data Science",
    "education.economics": "Nebenfach: Wirtschaftswissenschaften",
    "education.projects": "Projekte",
    "education.programming": "Programmierung (Computerspiele)",
    "education.database": "Datenbank (Webentwicklung)",
    "education.software": "Software Engineering (Agile Methode)",
    "education.bigData": "Big Data (Recommendation System)",
    "education.keySkills": "Schlüsselkompetenzen",
    "education.prep": "Studienkolleg",

    // Skills section
    "skills.title": "Technische Fähigkeiten",
    "skills.programming": "Programmierung & Datenfähigkeiten",
    "skills.other": "Andere technische Fähigkeiten",

    // Projects section
    "projects.title": "Projekte",

    // Certifications section
    "certifications.title": "Zertifizierungen",

    // Contact section
    "contact.title": "Kontakt",
    "contact.info": "Kontaktinformationen",
    "contact.lookingFor": "Ich suche nach",
    "contact.opportunities": "Ich suche derzeit nach Möglichkeiten in:",
    "contact.sendMessage": "Nachricht senden",
    "contact.name": "Name",
    "contact.email": "E-Mail",
    "contact.message": "Nachricht",
    "contact.send": "Nachricht senden",

    // Footer
    "footer.rights": "Alle Rechte vorbehalten.",
  },
  vi: {
    // Hero section
    "hero.title": "Chuyển đổi dữ liệu thành thông tin hữu ích",
    "hero.description":
      "Tôi là một sinh viên Khoa học Máy tính đầy nhiệt huyết tại Đại học Johannes Gutenberg-Universität Mainz, chuyên ngành Khoa học Dữ liệu với chuyên ngành phụ là Kinh tế học. Với điểm GPA cao 1.9, tôi đam mê trích xuất thông tin có ý nghĩa từ dữ liệu và phát triển các giải pháp sáng tạo.",
    "hero.viewProjects": "Xem dự án",
    "hero.downloadCV": "Tải CV",

    // About section
    "about.title": "Về tôi",
    "about.description":
      "Bộ công cụ kỹ thuật của tôi bao gồm Python, SQL, Pandas và các công cụ trực quan hóa như PowerBI và Seaborn. Tôi đã làm việc trên các dự án từ phân tích thể thao đến hệ thống đề xuất sử dụng công nghệ dữ liệu lớn.",
    "about.languages": "Ngôn ngữ",
    "about.german": "Thành thạo",
    "about.english": "Thành thạo",
    "about.vietnamese": "Tiếng mẹ đẻ",
    "about.certification": "Chứng chỉ tiếng Đức",

    // Education section
    "education.title": "Học vấn",
    "education.bsc": "Cử nhân Khoa học, Khoa học Máy tính",
    "education.focus": "Trọng tâm",
    "education.dataScience": "Chuyên ngành: Khoa học Dữ liệu",
    "education.economics": "Phụ: Kinh tế học",
    "education.projects": "Dự án",
    "education.programming": "Lập trình (Trò chơi máy tính)",
    "education.database": "Cơ sở dữ liệu (Phát triển web)",
    "education.software": "Kỹ thuật phần mềm (Phương pháp Agile)",
    "education.bigData": "Dữ liệu lớn (Hệ thống đề xuất)",
    "education.keySkills": "Kỹ năng chính",
    "education.prep": "Khóa dự bị đại học",

    // Skills section
    "skills.title": "Kỹ năng kỹ thuật",
    "skills.programming": "Lập trình & Kỹ năng dữ liệu",
    "skills.other": "Kỹ năng kỹ thuật khác",

    // Projects section
    "projects.title": "Dự án",

    // Certifications section
    "certifications.title": "Chứng chỉ",

    // Contact section
    "contact.title": "Liên hệ",
    "contact.info": "Thông tin liên hệ",
    "contact.lookingFor": "Đang tìm kiếm",
    "contact.opportunities": "Tôi hiện đang tìm kiếm cơ hội trong:",
    "contact.sendMessage": "Gửi tin nhắn",
    "contact.name": "Tên",
    "contact.email": "Email",
    "contact.message": "Tin nhắn",
    "contact.send": "Gửi tin nhắn",

    // Footer
    "footer.rights": "Tất cả các quyền được bảo lưu.",
  },
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
