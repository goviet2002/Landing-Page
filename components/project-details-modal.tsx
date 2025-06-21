"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Info, Github, Folder, FileText } from "lucide-react"

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
  } | null
}

const ProjectDetailsModal = ({ isOpen, onClose, project }: ProjectDetailsModalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#1e293b] border-cyan-500/30 text-white max-w-[130vh] max-h-[100vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-400">{project.title}</DialogTitle>
          {project.date && <DialogDescription className="text-gray-300">{project.date}</DialogDescription>}
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-4">
          <TabsList>
            <TabsTrigger value="info" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Info className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            {project.demoImages && project.demoImages.length > 0 && (
              <TabsTrigger
                value="images"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Screenshots
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
          </TabsContent>

          {project.demoImages && project.demoImages.length > 0 && (
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
              <RepoExplorer repoUrl={project.githubRepo} />
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function RepoFileViewer({ repoUrl, filePath = "README.md" }: { repoUrl: string, filePath?: string }) {
  const [content, setContent] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!repoUrl) return
    const repoPath = repoUrl.replace("https://github.com/", "")
    fetch(`https://api.github.com/repos/${repoPath}/contents/${filePath}`)
      .then(res => {
        if (!res.ok) throw new Error("File not found")
        return res.json()
      })
      .then(data => {
        if (data.content) {
          setContent(atob(data.content.replace(/\n/g, "")))
        } else {
          setError("No content found.")
        }
      })
      .catch(() => setError("Could not load file."))
      .finally(() => setLoading(false))
  }, [repoUrl, filePath])

  if (loading) return <div className="text-gray-400">Loading file...</div>
  if (error) return <div className="text-red-400">{error}</div>
  return (
    <pre className="bg-[#0f172a] border border-cyan-500/20 rounded-lg p-4 overflow-auto text-gray-200 text-sm">
      {content}
    </pre>
  )
}
const isImage = (name: string) => /\.(png|jpe?g|gif|svg)$/i.test(name)
const isPDF = (name: string) => /\.pdf$/i.test(name)
// Component to display the file tree
function RepoFileTree({ repoUrl }: { repoUrl: string }) {
  const [pathStack, setPathStack] = useState<string[]>([""])
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
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
      <ul className="w-64 bg-[#0f172a] border border-cyan-500/20 rounded-lg p-2 overflow-auto max-h-[400px]">
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
function RepoExplorer({ repoUrl }: { repoUrl: string }) {
  return <RepoFileTree repoUrl={repoUrl} />
}

function getImageMimeType(name: string) {
  if (name.endsWith(".png")) return "image/png"
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg"
  if (name.endsWith(".gif")) return "image/gif"
  if (name.endsWith(".svg")) return "image/svg+xml"
  return "image/*"
}

export default ProjectDetailsModal
