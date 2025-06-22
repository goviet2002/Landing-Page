"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  Database,
  BarChart3,
  BarChart2,
  FolderKanban,
  FileText,
  GraduationCap,
  Server,
  Globe,
  Briefcase,
} from "lucide-react"
import ProjectCard from "@/components/project-card"
import CertificateCard from "@/components/certificate-card"
import LanguageBar from "@/components/language-bar"
import Carousel from "@/components/carousel"
import SkillLevel from "@/components/skill-level"
import SkillCategory from "@/components/skill-category"
import TechInterestCard from "@/components/tech-interest-card"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/context/language-context"
import ProjectDetailsModal from "@/components/project-details-modal"
import CertificateViewer from "@/components/certificate-viewer"
import EducationDetailsModal from "@/components/education-details-modal"
import ScrollToTop from "@/components/scroll-to-top"
import AnimatedBackground from "@/components/animated-background"
import TypingEffect from "@/components/typing-effect"
import Timeline from "@/components/timeline"
import TestimonialCard from "@/components/testimonial-card"
import ProjectFilter from "@/components/project-filter"
import SimplePDFViewer from "@/components/simple-pdf-viewer"
import ContactForm from "@/components/contact-form" // 1. Import the new component

// Sample project data with code and demo images
const projectsData = [
    {
    title: "Football Team Analysis",
    description:
      "Personal project for data analysis of a football team for the current season based on data from Transfermarkt. Analysis with Pandas and Seaborn to examine performance metrics such as player statistics, transfer values, and team dynamics. Visualization of the results with Power BI.",
    tags: ["Python", "Pandas", "Seaborn", "PowerBI", "Data Analysis", "Data Visualization", "Data Wrangling"],
    image: "images/football-project/football-analysis.gif",
    githubRepo: "https://github.com/goviet2002/Football-Club-Analysis",
    date: "Jan 2023 - Feb 2024",
    category: "Data Analysis",
    reportPdf: "/documents/Club Analysis Report.pdf",
  },
  {
    title: "Banana Airlines Website",
    description:
      "Development of a website for an airline as part of the Database module at JGU Mainz. Features included search, booking, payment, and check-in for flights. Frontend implemented with HTML/CSS/JavaScript, backend with Flask, SQL, and database management with MariaDB/PostgreSQL.",
    tags: ["Flask", "SQL", "Data Modelling", "HTML/CSS/Javascript", "MariaDB", "PostgreSQL"],
    image: "/images/bananaairlines/bananaairlines.gif",
    githubRepo: "https://github.com/goviet2002/BananaAirlines",
    date: "Sept 2023 - Sept 2023",
    category: "Web",
    demoImages: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
  },
  {
    title: "Automated F1 ETL-Pipeline",
    description:
      "Automated ETL pipeline for Formula 1 data using Python for parallel extraction, dynamic schema detection, and transformation. Loads data into BigQuery with automated tables, bulk loading, weekly GitHub Actions orchestration, plus analytical SQL and ML for race prediction.",
    tags: ["Python", "ETL", "BeautifulSoup", "asyncio", "BigQuery", "SQL", "Github Actions (CI/CD)"],
    image: "images/F1/F1.gif", 
    githubRepo: "https://github.com/goviet2002/F1",
    date: "May 2025 - now",
    category: "Data Engineering",
    demoImages: ["/placeholder.svg?height=600&width=800"],
  },
  {
    title: "Big Data Food Recommendation System",
    description:
      "Development of a recommendation system in the Big Data module for analyzing about 1 GB of food reviews using Apache Spark and Scala. Implementation of algorithms such as collaborative filtering, TF-IDF, item profiles, min hashing, and locality-sensitive hashing (LSH).",
    tags: ["Big Data", "Scala", "Apache Spark", "Collaborative Filtering"],
    image: "images/bigdata/bigdata-result.gif",
    githubRepo: "https://github.com/goviet2002/Food-Recommendation-System",
    date: "Aug 2023 - Aug 2024",
    category: "Big Data",
    demoImages: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
  },
  {
    title: "Flappy Bird Game",
    description:
      "Development of a classic Flappy Bird game as part of the Introduction to Programming module. Used Simple I/O package provided by JGU Mainz to display basic graphical objects and simulate game mechanics.",
    tags: ["Python", "Game Development", "Programming", "basicio @JGU Mainz"],
    image: "/images/flappybird/flappybird.gif",
    githubRepo: "https://github.com/goviet2002/FlappyBird",
    date: "Sept 2022 - Sept 2022",
    category: "Game",
    demoImages: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
  },
  {
    title: "Software Enginnering",
    description:
      "Development of a website for data cleaning and visualization as part of an agile software engineering project. Served as a backend team member responsible for designing and implementing the database using Django. Collaborated closely within a team structured into three clusters: Documentation, Frontend, and Backend.",
    tags: ["Agile Methods", "Project Management", "Team Work", "Communication", "Django"],
    image: "images/se/se.gif",
    date: "Mar 2024 - April 2024",
    category: "Software Engineering",
    demoImages: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    disabled: true,
  },
]

// Sample timeline data with education details
const timelineData = [
  {
    year: "2022 - Present",
    title: "Johannes Gutenberg-Universität Mainz",
    degree: "Bachelor of Science, Informatik",
    description: "Studying Computer Science with a focus on Data Science at Johannes Gutenberg-Universität Mainz.",
    icon: <GraduationCap className="h-4 w-4" />,
    grade: "1.9 (vorläufig)",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-16NhnuezIdXNmdWhkxjULkB90w5CAq.png",
    period: "2022 - Present",
    details: {
      focus: ["Focus: Data Science", "Minor: Economics"],
      projects: [
        "Programming (Computer Games)",
        "Database (Web Development)",
        "Software Engineering (Agile Methods)",
        "Big Data (Recommendation System)",
      ],
      keySkills: ["Python", "SQL", "Data Analysis", "Machine Learning", "Big Data", "Web Development"],
    },
    hasDetailedView: true,
    courses: [
      {
        name: "Big Data",
        grade: "1.7",
        description: "Analysis of large datasets using Apache Spark and Scala",
      },
      {
        name: "Database Systems",
        grade: "1.3",
        description: "Design and implementation of relational databases",
      },
      {
        name: "Software Engineering",
        grade: "2.0",
        description: "Agile development methodologies and project management",
      },
      {
        name: "Data Structures and Algorithms",
        grade: "1.7",
        description: "Implementation and analysis of fundamental algorithms",
      },
    ],
  },
  {
    year: "2021",
    title: "Johannes Gutenberg-Universität Mainz",
    degree: "Feststellungsprüfung, College/University Preparatory",
    description: "Completed the university preparatory course at Johannes Gutenberg-Universität Mainz.",
    icon: <GraduationCap className="h-4 w-4" />,
    grade: "1.5",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-16NhnuezIdXNmdWhkxjULkB90w5CAq.png",
    period: "2021",
    details: {
      keySkills: ["Deutsch", "FSP Zeugnis"],
    },
    certificate: {
      name: "FSP Zeugnis",
      url: "/documents/fsp-zeugnis.pdf",
    },
    hasDetailedView: true,
    courses: [
      {
        name: "German Language",
        grade: "1.5",
        description: "Advanced German language studies",
      },
      {
        name: "Mathematics",
        grade: "1.3",
        description: "Advanced mathematics for university preparation",
      },
      {
        name: "Physics",
        grade: "1.7",
        description: "Physics fundamentals for technical studies",
      },
    ],
  },
]

// Sample certification data with logos
const certificationsData = [
  {
    title: "Data Engineer",
    issuer: "DataCamp",
    date: "März 2023 - März 2027",
    skills: ["SQL", "Data Management", "Python", "Extract, Transform, Load (ETL)", "Data Wrangling"],
    icon: "📊",
    color: "cyan",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/datacamp%20logo-hN26dhggWGJMHxiUUisP1CjC6pSSYs.png",
    certificate: {
      name: "Data Engineer Certificate",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Data%20Camp%20DA%20Association.jpg-1O3qlc3eXgx29O26QiQlYwrb91C4RN.jpeg",
      type: "image",
    },
  },
  {
    title: "Google Advanced Data Analytics",
    issuer: "Coursera",
    skills: ["Statistics", "Python", "Project Management", "Machine Learning", "Data Wrangling"],
    icon: "📈",
    color: "blue",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/google%20logo-pNnGvGo1gqkXqy39bTXEdT1A9Og6Q8.jpeg",
    certificate: {
      name: "Google Advanced Data Analytics Certificate",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google%20Advanced%20Data%20Analytics.jpg-nqZTW20fMxaYMzVJ2YBYI7JphTX4uL.jpeg",
      type: "image",
    },
  },
  {
    title: "Data Analyst Associate",
    issuer: "DataCamp",
    date: "März 2023 - März 2026",
    skills: ["Pandas", "Data Visualization", "Data Analysis", "Data Wrangling"],
    icon: "🔍",
    color: "cyan",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/datacamp%20logo-hN26dhggWGJMHxiUUisP1CjC6pSSYs.png",
    certificate: {
      name: "Data Analyst Associate Certificate",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Data%20Camp%20DA%20Association.jpg-1O3qlc3eXgx29O26QiQlYwrb91C4RN.jpeg",
      type: "image",
    },
  },
  {
    title: "Associate SQL",
    issuer: "DataCamp",
    date: "Nov 2023 - Nov 2025",
    skills: ["SQL"],
    icon: "🗃️",
    color: "cyan",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/datacamp%20logo-hN26dhggWGJMHxiUUisP1CjC6pSSYs.png",
    certificate: {
      name: "Associate SQL Certificate",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Data%20Camp%20DA%20Association.jpg-1O3qlc3eXgx29O26QiQlYwrb91C4RN.jpeg",
      type: "image",
    },
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon",
    skills: ["Amazon Web Services (AWS)"],
    icon: "☁️",
    color: "cyan",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aws%20logo-o8ks0r2tB7Nz9fkwSkxfBis4ZnXyvF.png",
    certificate: {
      name: "AWS Cloud Practitioner Certificate",
      url: "/placeholder.svg?height=800&width=600",
      type: "image",
    },
  },
  {
    title: "Google Business Intelligence",
    issuer: "Coursera",
    skills: ["Business Intelligence", "BI", "Data Management", "Extract, Transform, Load (ETL)"],
    icon: "💼",
    color: "blue",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/google%20logo-pNnGvGo1gqkXqy39bTXEdT1A9Og6Q8.jpeg",
    certificate: {
      name: "Google Business Intelligence Certificate",
      url: "/placeholder.svg?height=800&width=600",
      type: "image",
    },
  },
  {
    title: "Google Data Analytics",
    issuer: "Coursera",
    skills: ["SQL", "R", "Data Visualization", "Data Analysis", "Microsoft Excel", "Data Wrangling"],
    icon: "📊",
    color: "blue",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/google%20logo-pNnGvGo1gqkXqy39bTXEdT1A9Og6Q8.jpeg",
    certificate: {
      name: "Google Data Analytics Certificate",
      url: "/placeholder.svg?height=800&width=600",
      type: "image",
    },
  },
]

// Sample testimonial data
const testimonialData = [
  {
    quote:
      "Anh Viet is an exceptional student with a natural talent for data analysis. His ability to extract meaningful insights from complex datasets is impressive.",
    author: "Prof. Dr. Schmidt",
    role: "Data Science Professor, JGU Mainz",
  },
  {
    quote:
      "Working with Anh Viet on our group project was a great experience. His technical skills and collaborative approach made him a valuable team member.",
    author: "Lisa Müller",
    role: "Fellow Student, JGU Mainz",
  },
  {
    quote:
      "Anh Viet's dedication to learning and problem-solving sets him apart. He consistently delivers high-quality work and demonstrates a deep understanding of data science concepts.",
    author: "Dr. Michael Weber",
    role: "Course Instructor, Big Data Analytics",
  },
]

export default function Home() {
  const { language, setLanguage, t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<null | (typeof projectsData)[0]>(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [certificateTitle, setCertificateTitle] = useState("")
  const [certificateUrl, setCertificateUrl] = useState("")
  const [certificateType, setCertificateType] = useState<"pdf" | "image">("pdf")
  const [typingComplete, setTypingComplete] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false)
  const [selectedEducation, setSelectedEducation] = useState<any>(null)
  const [showPdfViewer, setShowPdfViewer] = useState(false)
  const [isCertificateViewerOpen, setIsCertificateViewerOpen] = useState(false)

  // Extract unique categories from projects
  // const projectCategories = Array.from(new Set(projectsData.map((project) => project.category)))
  const projectCategories = [
    "Data Analysis",
    "Data Engineering",
    "Web",
    "Big Data",
    "Game",
    "Software Engineering"
  ]
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projectsData)
    } else {
      setFilteredProjects(projectsData.filter((project) => project.category === activeFilter))
    }
    // Reset carousel page when filter changes
    if (typeof window !== "undefined") {
      // Force a re-render of the carousel
      const carouselElement = document.querySelector(".carousel-container")
      if (carouselElement) {
        carouselElement.classList.remove("carousel-container")
        void (carouselElement as HTMLElement).offsetWidth
        carouselElement.classList.add("carousel-container")
      }
    }
  }, [activeFilter])

  const handleProjectClick = (project: (typeof projectsData)[0]) => {
    setSelectedProject(project)
    setIsProjectModalOpen(true)
  }

  const handleViewCertificate = (title: string, url: string, type: "pdf" | "image" = "pdf") => {
    setCertificateTitle(title)
    setCertificateUrl(url)
    setCertificateType(type)
    setIsCertificateViewerOpen(true)
  }

  const handleViewDetailedInfo = (item: any) => {
    const educationData = {
      ...item,
      period: item.period || item.year,
    }
    setSelectedEducation(educationData)
    setIsEducationModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white relative overflow-hidden">
      <AnimatedBackground />
      <Navbar />

      {/* Language Switcher in top right corner */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher currentLanguage={language} onChange={setLanguage} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 px-4">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left side - Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative h-[500px] w-full max-w-md">
                <Image
                  src="/images/profile-transparent.png"
                  alt="Anh Viet Ngo"
                  fill
                  className="object-contain"
                  priority
                />
                {/* Glow effect behind the image */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-cyan-500/20 blur-3xl rounded-full"></div>
              </div>
            </div>

            {/* Right side - Info */}
            <div>
              <div className="inline-block px-3 py-1 mb-4 border border-cyan-500/30 rounded-full bg-cyan-500/10 text-cyan-400 text-sm">
                Data Science Student
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Anh Viet Ngo
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
                {language === "vi" ? (
                  t("hero.title")
                ) : (
                  <TypingEffect text={t("hero.title")} speed={50} onComplete={() => setTypingComplete(true)} />
                )}
              </h2>

              {(typingComplete || language === "vi" || language === "de") && (
                <>
                  <p className="text-gray-300 mb-6">{t("hero.description")}</p>

                  <div className="flex items-center text-gray-300 mb-6">
                    <MapPin className="h-5 w-5 mr-2 text-cyan-400" />
                    <span>Mainz, Germany</span>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                      <Link href="#projects" className="flex items-center gap-2">
                        {t("hero.viewProjects")}
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20">
                      <Download className="mr-2 h-4 w-4" />
                      {t("hero.downloadCV")}
                    </Button>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
                    >
                      <Link href="https://www.linkedin.com/in/anh-viet-ngo/" target="_blank">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
                    >
                      <Link href="https://github.com/" target="_blank">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
                    >
                      <Link href="mailto:anhviet2002.vna@gmail.com">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {t("about.title")}
              </span>
            </h2>
            <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-grow ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="h-full flex flex-col">
              <p className="text-gray-300 mb-6">{t("about.description")}</p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">{t("about.languages")}</h3>
                <div className="space-y-4">
                  <LanguageBar language="German" level={t("about.german")} percentage={90} />
                  <LanguageBar language="English" level={t("about.english")} percentage={90} />
                  <LanguageBar language="Vietnamese" level={t("about.vietnamese")} percentage={100} />
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">{t("about.certification")}</h3>
                <div className="bg-[#1e293b] p-4 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                  <h4 className="font-medium text-white">FSP/DSH Deutsch C1</h4>
                  <p className="text-gray-400 text-sm">Ergebnis: DSH-2 • Dez. 2021</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-400 text-sm">Schriftlich:</p>
                      <p className="text-cyan-400 font-medium">81%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Mündlich:</p>
                      <p className="text-cyan-400 font-medium">71%</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-cyan-500/30 text-cyan-300 bg-[#0f172a] hover:bg-[#172033] hover:text-cyan-200"
                      onClick={() => {
                        setCertificateUrl("/documents/fsp-zeugnis.pdf")
                        setShowPdfViewer(true)
                      }}
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      View Certificate
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1e293b] rounded-xl shadow-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all h-full">
              <h3 className="text-xl font-semibold mb-6 text-cyan-400">Technical Interests</h3>
              <div className="grid grid-cols-1 gap-4">
                <TechInterestCard
                  title="Data Analytics"
                  description="Analyzing data to extract meaningful insights and support decision-making processes."
                  icon={<BarChart2 className="h-5 w-5" />}
                  gradient="from-cyan-500 to-blue-500"
                />
                <TechInterestCard
                  title="Data Management"
                  description="Organizing, storing, and maintaining data to ensure its accessibility, reliability, and security."
                  icon={<FolderKanban className="h-5 w-5" />}
                  gradient="from-blue-500 to-indigo-500"
                />
                <TechInterestCard
                  title="Data Science"
                  description="Extracting insights from data using statistical methods and machine learning algorithms."
                  icon={<BarChart3 className="h-5 w-5" />}
                  gradient="from-teal-500 to-cyan-500"
                />
                <TechInterestCard
                  title="Data Engineering"
                  description="Building and maintaining data pipelines and infrastructure for efficient data processing."
                  icon={<Database className="h-5 w-5" />}
                  gradient="from-emerald-500 to-teal-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 px-4 relative bg-[#0f172a]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_right,rgba(6,182,212,0.15),transparent_70%)]"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                My Journey
              </span>
            </h2>
            <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-grow ml-4"></div>
          </div>

          <Timeline
            items={timelineData}
            onViewCertificate={handleViewCertificate}
            onViewDetailedInfo={handleViewDetailedInfo}
          />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {t("skills.title")}
              </span>
            </h2>
            <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-grow ml-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-full">
              <h3 className="text-xl font-semibold mb-6 text-cyan-400">{t("skills.programming")}</h3>
              <div className="space-y-6 bg-[#1e293b] rounded-xl shadow-md p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all h-full">
                <SkillLevel
                  skill="Python"
                  level="Expert"
                  description="Proficient in data analysis libraries (Pandas, NumPy) and ML frameworks (Scikit-learn)"
                />
                <SkillLevel
                  skill="SQL"
                  level="Advanced"
                  description="Database design, complex queries, and data manipulation"
                />
                <SkillLevel
                  skill="Data Analysis"
                  level="Expert"
                  description="Statistical analysis, data cleaning, and insight generation"
                />
                <SkillLevel
                  skill="Machine Learning"
                  level="Advanced"
                  description="Supervised and unsupervised learning, model evaluation"
                />
                <SkillLevel
                  skill="Data Visualization"
                  level="Advanced"
                  description="PowerBI, Seaborn, Matplotlib for creating insightful visualizations"
                />
                <SkillLevel
                  skill="Big Data"
                  level="Intermediate"
                  description="Apache Spark, Scala, distributed computing"
                />
              </div>
            </div>

            <div className="h-full">
              <h3 className="text-xl font-semibold mb-6 text-cyan-400">{t("skills.other")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <SkillCategory
                  title="Web Development"
                  icon={<Globe className="h-5 w-5" />}
                  skills={["HTML/CSS", "JavaScript", "Flask", "Django"]}
                  gradient="from-cyan-500 to-blue-500"
                />

                <SkillCategory
                  title="Databases"
                  icon={<Database className="h-5 w-5" />}
                  skills={["SQL", "NoSQL", "Database Design", "Data Management"]}
                  gradient="from-blue-500 to-indigo-500"
                />

                <SkillCategory
                  title="Tools & Platforms"
                  icon={<Server className="h-5 w-5" />}
                  skills={["Git", "AWS", "PowerBI", "Jupyter Notebooks"]}
                  gradient="from-teal-500 to-cyan-500"
                />

                <SkillCategory
                  title="Soft Skills"
                  icon={<Briefcase className="h-5 w-5" />}
                  skills={["Problem Solving", "Team Collaboration", "Project Management", "Communication"]}
                  gradient="from-emerald-500 to-teal-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative bg-[#0f172a]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.15),transparent_70%)]"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {t("projects.title")}
              </span>
            </h2>
            <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-grow ml-4"></div>
          </div>

          <ProjectFilter categories={projectCategories} onFilterChange={setActiveFilter} activeFilter={activeFilter} />

          <div className="carousel-container">
            <Carousel itemsPerView={2} className="mb-8" fullWidth={true}>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={`${activeFilter}-${index}`}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  date={project.date}
                  onClick={project.disabled ? undefined : () => handleProjectClick(project)}
                  disabled={project.disabled}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_70%)]"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Testimonials
              </span>
            </h2>
            <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-grow ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialData.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                // image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 relative bg-[#0f172a]">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {t("certifications.title")}
              </span>
            </h2>
            <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-grow ml-4"></div>
          </div>

          <Carousel itemsPerView={3} className="mb-8">
            {certificationsData.map((cert, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() =>
                  handleViewCertificate(
                    cert.certificate.name,
                    cert.certificate.url,
                    cert.certificate.type as "pdf" | "image",
                  )
                }
              >
                <CertificateCard
                  title={cert.title}
                  issuer={cert.issuer}
                  date={cert.date}
                  skills={cert.skills}
                  icon={cert.icon}
                  color={cert.color}
                  logo={cert.logo}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_70%)]"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {t("contact.title")}
              </span>
            </h2>
            <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-grow ml-4"></div>
          </div>

          <div className="bg-[#1e293b] rounded-xl shadow-xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{t("contact.info")}</h3>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <Mail className="h-5 w-5 mr-3 text-cyan-400" />
                    <a
                      href="mailto:anhviet2002.vna@gmail.com"
                      className="hover:text-cyan-400 transition-colors cursor-pointer"
                      onClick={e => {
                        e.preventDefault();
                        navigator.clipboard.writeText("anhviet2002.vna@gmail.com");
                        alert("Email copied!");                      
                    }}
                    >
                      anhviet2002.vna@gmail.com
                    </a>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 mr-3 text-cyan-400" />
                    <span>Mainz, Germany</span>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <Linkedin className="h-5 w-5 mr-3 text-cyan-400" />
                    <a
                      href="https://www.linkedin.com/in/anh-viet-ngo/"
                      target="_blank"
                      className="hover:text-cyan-400 transition-colors"
                      rel="noreferrer"
                    >
                      linkedin.com/in/anh-viet-ngo
                    </a>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-[#0f172a] rounded-lg border border-cyan-500/20">
                  <h4 className="text-lg font-medium mb-3 text-white">{t("contact.lookingFor")}</h4>
                  <p className="text-gray-300 mb-3">{t("contact.opportunities")}</p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                      Data Analytics
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                      Data Science
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                      Data Engineering
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                      Business Intelligence
                    </li>
                  </ul>
                  <p className="text-gray-300 mt-3">{t("contact.workinglocation")}</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{t("contact.sendMessage")}</h3>

                <ContactForm /> {/* 2. Replace the entire <form> block with this */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-[#0f172a] border-t border-cyan-500/20">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Anh Viet Ngo. {t("footer.rights")}
          </p>
        </div>
      </footer>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        project={selectedProject}
      />

      {/* Certificate Viewer */}
      <CertificateViewer
        isOpen={isCertificateViewerOpen}
        onClose={() => setIsCertificateViewerOpen(false)}
        title={certificateTitle}
        pdfUrl={certificateUrl}
        type={certificateType}
      />

      {/* Education Details Modal */}
      <EducationDetailsModal
        isOpen={isEducationModalOpen}
        onClose={() => setIsEducationModalOpen(false)}
        education={selectedEducation}
      />

      {/* PDF Viewer */}
      {showPdfViewer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#1e293b] border border-cyan-500/30 rounded-lg w-full max-w-4xl h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-cyan-500/30">
              <h3 className="text-xl font-bold text-cyan-400 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                FSP Zeugnis
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
                onClick={() => setShowPdfViewer(false)}
              >
                Close
              </Button>
            </div>
            <div className="h-[calc(90vh-60px)]">
              <SimplePDFViewer file={certificateUrl} />
            </div>
          </div>
        </div>
      )}

      <ScrollToTop />
    </main>
  )
}
