"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react"

interface FileNode {
  name: string
  type: "file" | "folder"
  content?: string
  children?: FileNode[]
  language?: string
}

interface CodeFolderViewerProps {
  files: FileNode[]
}

const CodeFolderViewer = ({ files }: CodeFolderViewerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }))
  }

  const renderFileTree = (nodes: FileNode[], basePath = "") => {
    return (
      <ul className="pl-4">
        {nodes.map((node, index) => {
          const path = `${basePath}/${node.name}`

          if (node.type === "folder") {
            const isExpanded = expandedFolders[path] || false

            return (
              <li key={index} className="py-1">
                <div
                  className="flex items-center cursor-pointer hover:text-cyan-400 transition-colors"
                  onClick={() => toggleFolder(path)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 mr-1 text-cyan-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-1 text-cyan-400" />
                  )}
                  <Folder className="h-4 w-4 mr-2 text-cyan-400" />
                  <span>{node.name}</span>
                </div>
                {isExpanded && node.children && renderFileTree(node.children, path)}
              </li>
            )
          } else {
            return (
              <li key={index} className="py-1">
                <div
                  className={`flex items-center cursor-pointer hover:text-cyan-400 transition-colors pl-5 ${
                    selectedFile && selectedFile.name === node.name ? "text-cyan-400" : ""
                  }`}
                  onClick={() => setSelectedFile(node)}
                >
                  <File className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{node.name}</span>
                </div>
              </li>
            )
          }
        })}
      </ul>
    )
  }

  const getLanguageClass = (language?: string) => {
    switch (language) {
      case "python":
        return "language-python"
      case "javascript":
      case "js":
        return "language-javascript"
      case "typescript":
      case "ts":
        return "language-typescript"
      case "html":
        return "language-html"
      case "css":
        return "language-css"
      case "java":
        return "language-java"
      case "scala":
        return "language-scala"
      case "sql":
        return "language-sql"
      default:
        return "language-plaintext"
    }
  }

  return (
    <div className="flex h-[500px] bg-[#0f172a] rounded-lg border border-cyan-500/20 overflow-hidden">
      <div className="w-1/3 border-r border-cyan-500/20 overflow-y-auto p-4">{renderFileTree(files)}</div>
      <div className="w-2/3 overflow-y-auto">
        {selectedFile ? (
          <div className="p-4">
            <div className="mb-2 text-cyan-400 font-medium">{selectedFile.name}</div>
            <pre className={`bg-[#0f172a] p-4 rounded-lg overflow-x-auto ${getLanguageClass(selectedFile.language)}`}>
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">Select a file to view its content</div>
        )}
      </div>
    </div>
  )
}

export default CodeFolderViewer
