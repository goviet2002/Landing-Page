"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Info, FileText, ImageIcon, Github, BarChart3, Folder, MonitorPlay, Maximize2, Minimize2 } from "lucide-react"
import clsx from "clsx"

interface ProjectDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    tags: string[]
    image: string
    date?: string
    code?: string
    demoImages?: string[]
    githubRepo?: string
    reportPdf?: string
  } | null
}

const ProjectDetailsModal = ({ isOpen, onClose, project }: ProjectDetailsModalProps) => {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("info") // 1. Track active tab
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedRepoFile, setSelectedRepoFile] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!project) return null

  const isFootballTeamAnalysis = project?.title === "Football Team Analysis"
  const isBananaAirlines = project?.title === "Banana Airlines Website"
  const isFlappyBird = project?.title === "Flappy Bird Game"

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={clsx(
          "bg-[#1e293b] border-cyan-500/30 text-white max-h-[100vh] overflow-y-auto transition-all duration-300",
          // Wide for Banana Airlines Live Demo
          activeTab === "images" && isBananaAirlines
            ? "max-w-[1300px]"
          // Wide for Repository when a file is selected
          : activeTab === "repo" && selectedRepoFile
            ? "max-w-[1300px]"
          // Compact only for Repository tab with nothing selected
          : activeTab === "repo"
            ? "max-w-[400px]"
          // Default for all other tabs
            : "max-w-[1000px]"
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-400">{project.title}</DialogTitle>
          {project.date && <DialogDescription className="text-gray-300">{project.date}</DialogDescription>}
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="info" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              {isFootballTeamAnalysis ? (
                <>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analysis
                </>
              ) : (
                <>
                  <Info className="h-4 w-4 mr-2" />
                  Overview
                </>
              )}
            </TabsTrigger>
            {isFootballTeamAnalysis && project.reportPdf && (
              <TabsTrigger
                value="report"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
              >
                <FileText className="h-4 w-4 mr-2" />
                Report
              </TabsTrigger>
            )}
            {/* Change Screenshots to Live Demo */}
            {isBananaAirlines && project.demoImages && project.demoImages.length > 0 && (
              <TabsTrigger
                value="images"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
              >
                <MonitorPlay className="h-4 w-4 mr-2" /> {/* Use MonitorPlay icon */}
                Live Demo
              </TabsTrigger>
            )}
            {project.githubRepo && (
              <TabsTrigger value="repo">
                <Github className="h-4 w-4 mr-2" />
                Repository
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="info" className="mt-4">
            {isFootballTeamAnalysis ? (
              <div className="mb-4">
                <iframe
                  src="/football-analysis.html"
                  width="100%"
                  height="100%"
                  style={{ minHeight: "70vh", border: "none", borderRadius: "8px" }}
                  title="Football Analysis"
                />
              </div>
            ) : isBananaAirlines ? (
              <div className="w-full h-[70vh] rounded-lg overflow-hidden border border-cyan-500/20 bg-[#0f172a]">
                <iframe
                  src="/bananaairlines.html"
                  width="100%"
                  height="100%"
                  style={{ minHeight: "70vh", border: "none", borderRadius: "8px", background: "#fff" }}
                  title="Banana Airlines"
                />
              </div>
            ) : isFlappyBird ? (
              <div className="w-full h-[70vh] rounded-lg overflow-hidden border border-cyan-500/20 bg-[#0f172a]">
                <iframe
                  src="/flappybird.html"
                  width="100%"
                  height="100%"
                  style={{ minHeight: "70vh", border: "none", borderRadius: "8px", background: "#fff" }}
                  title="Flappy Bird"
                />
              </div>
            ) : (
              <>
                <div className="relative h-64 w-full overflow-hidden rounded-lg mb-4">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-cyan-500/10 text-cyan-300 border-cyan-500/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* Only show Report tab for Football Team Analysis */}
          {isFootballTeamAnalysis && project.reportPdf && (
            <TabsContent value="report" className="mt-4">
              <div className="w-full h-[70vh] rounded-lg overflow-hidden border border-cyan-500/20 bg-[#0f172a]">
                <iframe
                  src={project.reportPdf}
                  width="100%"
                  height="100%"
                  style={{ minHeight: "70vh", border: "none" }}
                  title="Club Analysis Report"
                />
              </div>
            </TabsContent>
          )}

          {/* Only show Live Demo for Banana Airlines */}
          {isBananaAirlines && (
            <TabsContent value="images" className="mt-4">
              <div className="w-full h-[70vh] rounded-lg overflow-hidden border border-cyan-500/20 bg-[#0f172a]">
                <iframe
                  src="https://bananaairlines.onrender.com/"
                  width="100%"
                  height="100%"
                  style={{ minHeight: "70vh", border: "none" }}
                  title="Banana Airlines Live"
                />
              </div>
            </TabsContent>
          )}

          {/* For other projects, keep showing screenshots if any */}
          {!isBananaAirlines && project.demoImages && project.demoImages.length > 0 && (
            <TabsContent value="images" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.demoImages.map((img, index) => (
                  <div key={index} className="relative h-64 w-full overflow-hidden rounded-lg">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${project.title} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          )}

          {project.githubRepo && (
            <TabsContent value="repo">
              <RepoExplorer
                repoUrl={project.githubRepo}
                selectedFile={selectedRepoFile}
                setSelectedFile={setSelectedRepoFile}
              />
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

const isImage = (name: string) => /\.(png|jpe?g|gif|svg)$/i.test(name)
const isPDF = (name: string) => /\.pdf$/i.test(name)

// Component to display the file tree
function RepoFileTree({ repoUrl, selectedFile, setSelectedFile }: { repoUrl: string, selectedFile: string | null, setSelectedFile: (f: string | null) => void }) {
  const [pathStack, setPathStack] = useState<string[]>([""])
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<string>("")

  const currentPath = pathStack[pathStack.length - 1]

  useEffect(() => {
    if (!repoUrl) return
    setLoading(true)
    setError(null)
    const repoPath = repoUrl.replace("https://github.com/", "")
    fetch(`https://api.github.com/repos/${repoPath}/contents/${currentPath}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found")
        return res.json()
      })
      .then(data => setItems(Array.isArray(data) ? data : []))
      .catch(() => setError("Could not load folder."))
      .finally(() => setLoading(false))
  }, [repoUrl, currentPath])

  // Fetch file content when a file is selected
  useEffect(() => {
    if (!selectedFile) return
    setFileContent("")
    const repoPath = repoUrl.replace("https://github.com/", "")
    fetch(`https://api.github.com/repos/${repoPath}/contents/${selectedFile}`)
      .then(res => {
        if (!res.ok) throw new Error("File not found")
        return res.json()
      })
      .then(data => {
        if (data.content) {
          setFileContent(atob(data.content.replace(/\n/g, "")))
        } else {
          setFileContent("No content found.")
        }
      })
      .catch(() => setFileContent("Could not load file."))
  }, [selectedFile, repoUrl])

  if (loading) return <div className="text-gray-400">Loading...</div>
  if (error) return <div className="text-red-400">{error}</div>

  return (
    <div className="flex gap-4">
      <ul
        className="bg-[#0f172a] border border-cyan-500/20 rounded-lg p-2 overflow-auto max-h-[400px]"
        style={{ width: "360px" }} // <-- Increased width for repo file tree only
      >
        {pathStack.length > 1 && (
          <li className="flex items-center gap-2 py-1">
            <Folder className="w-4 h-4 text-gray-400" />
            <button
              className="text-cyan-400 hover:underline"
              onClick={() => {
                setSelectedFile(null)
                setFileContent("")
                setPathStack(stack => stack.slice(0, -1))
              }}
            >
              ..
            </button>
          </li>
        )}
        {items.map(item => (
          <li key={item.path} className="flex items-center gap-2 py-1">
            {item.type === "dir" ? (
              <>
                <Folder className="w-4 h-4 text-yellow-400" />
                <button
                  className="text-cyan-400 hover:underline"
                  onClick={() => {
                    setSelectedFile(null)
                    setFileContent("")
                    setPathStack(stack => [...stack, item.path])
                  }}
                >
                  {item.name}
                </button>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 text-gray-400" />
                <button
                  className="text-gray-200 hover:underline"
                  onClick={() => setSelectedFile(item.path)}
                >
                  {item.name}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="flex-1">
        {selectedFile && (
          <>
            {isImage(selectedFile) && fileContent && fileContent !== "No content found." ? (
              <img
                src={`data:${getImageMimeType(selectedFile)};base64,${fileContent}`}
                alt={selectedFile}
                className="max-w-full max-h-[400px] rounded border"
              />
            ) : isPDF(selectedFile) && fileContent && fileContent !== "No content found." ? (
              <iframe
                src={`data:application/pdf;base64,${fileContent}`}
                title={selectedFile}
                className="w-full h-[400px] border rounded"
              />
            ) : (
              <pre className="bg-[#0f172a] border border-cyan-500/20 rounded-lg p-4 overflow-auto text-gray-200 text-sm max-h-[400px]">
                {fileContent || "Loading file..."}
              </pre>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Use this in your modal:
function RepoExplorer({ repoUrl, selectedFile, setSelectedFile }: { repoUrl: string, selectedFile: string | null, setSelectedFile: (f: string | null) => void }) {
  return <RepoFileTree repoUrl={repoUrl} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
}

function getImageMimeType(name: string) {
  if (name.endsWith(".png")) return "image/png"
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg"
  if (name.endsWith(".gif")) return "image/gif"
  if (name.endsWith(".svg")) return "image/svg+xml"
  return "image/*"
}

export default ProjectDetailsModal
