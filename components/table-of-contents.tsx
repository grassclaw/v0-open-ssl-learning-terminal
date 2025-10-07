"use client"

import { CheckCircle, XCircle, BookOpen } from "lucide-react"
import type { Module } from "@/lib/module-data"

interface TableOfContentsProps {
  modules: Module[]
  currentModuleIndex: number
  completedQuizzes: Record<string, boolean>
  completedTerminals: Record<string, boolean>
  onSelectModule: (index: number) => void
  onClose: () => void
}

export default function TableOfContents({
  modules,
  currentModuleIndex,
  completedQuizzes,
  completedTerminals,
  onSelectModule,
  onClose,
}: TableOfContentsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start overflow-y-auto pt-16 pb-16">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Table of Contents</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-end gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Content</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 rounded-full border border-gray-300"></div>
              <span>Not Started</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Completed</span>
            </div>
          </div>

          <ul className="space-y-4">
            {modules.map((module, index) => (
              <li key={module.id} className="border-b pb-3 last:border-b-0">
                <button
                  onClick={() => {
                    onSelectModule(index)
                    onClose()
                  }}
                  className={`w-full text-left p-2 rounded hover:bg-gray-100 ${
                    currentModuleIndex === index ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {module.moduleNumber}. {module.title}
                    </span>
                    {currentModuleIndex === index && <span className="text-blue-600 text-sm">Current</span>}
                  </div>
                </button>

                <div className="ml-6 mt-2 grid grid-cols-2 gap-2 text-sm">
                  {module.hasQuiz && (
                    <div className="flex items-center gap-2 text-gray-600">
                      {completedQuizzes[module.id] ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                      )}
                      <span>Quiz</span>
                    </div>
                  )}

                  {module.hasTerminal && (
                    <div className="flex items-center gap-2 text-gray-600">
                      {completedTerminals[module.id] ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                      )}
                      <span>Terminal Exercise</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
