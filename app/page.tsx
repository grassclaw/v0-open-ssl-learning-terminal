"use client"

import { useState, useEffect } from "react"
import Terminal from "@/components/terminal"
import ProgressBar from "@/components/progress-bar"
import Navigation from "@/components/navigation"
import CompletionButton from "@/components/completion-button"
import CongratsPage from "@/components/congrats-page"
import LearningDashboard from "@/components/learning-dashboard"
import { terminalModules } from "@/lib/terminal-data"

export default function CSRLearningModule() {
  const [currentView, setCurrentView] = useState<"dashboard" | "learning">("dashboard")
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  const moduleIds = Object.keys(terminalModules)
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [completedTerminals, setCompletedTerminals] = useState<Record<string, boolean>>({})
  const [isModuleCompleted, setIsModuleCompleted] = useState(false)
  const [showCongratsPage, setShowCongratsPage] = useState(false)

  const currentModuleId = moduleIds[currentModuleIndex]

  useEffect(() => {
    const allTerminalsCompleted = moduleIds.every((id) => completedTerminals[id])
    setIsModuleCompleted(allTerminalsCompleted)
  }, [completedTerminals, moduleIds])

  const handleSelectPath = (pathId: string) => {
    setSelectedPath(pathId)
    setCurrentView("learning")
  }

  const goToNextModule = () => {
    if (currentModuleIndex < moduleIds.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1)
    }
  }

  const goToPrevModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1)
    }
  }

  const handleTerminalComplete = (moduleId: string) => {
    setCompletedTerminals((prev) => ({
      ...prev,
      [moduleId]: true,
    }))
  }

  const handleCompleteModule = () => {
    setShowCongratsPage(true)
  }

  const handleRestart = () => {
    setCurrentModuleIndex(0)
    setCompletedTerminals({})
    setIsModuleCompleted(false)
    setShowCongratsPage(false)
    setCurrentView("dashboard")
    setSelectedPath(null)
  }

  if (currentView === "dashboard") {
    return <LearningDashboard onSelectPath={handleSelectPath} />
  }

  return (
    <>
      {showCongratsPage ? (
        <CongratsPage onRestart={handleRestart} />
      ) : (
        <main className="min-h-screen flex flex-col p-4 gap-4">
          <div className="flex-shrink-0">
            <button
              onClick={() => setCurrentView("dashboard")}
              className="text-sm text-gray-600 hover:text-gray-900 mb-2 flex items-center gap-1"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold mb-1">OpenSSL Learning Module</h1>
            <p className="text-lg font-semibold text-gray-800 mb-1">Certificate Signing Request (CSR) with OpenSSL</p>
            <p className="text-sm text-gray-600">
              Interactive terminal-based learning for Certificate Signing Requests
            </p>
          </div>

          <ProgressBar totalModules={moduleIds.length} currentModule={currentModuleIndex + 1} />

          <div className="flex-1 min-h-0">
            <Terminal
              moduleId={currentModuleId}
              onComplete={() => handleTerminalComplete(currentModuleId)}
              isCompleted={completedTerminals[currentModuleId] || false}
            />
          </div>

          <div className="flex-shrink-0 space-y-3">
            <Navigation
              onNext={goToNextModule}
              onPrev={goToPrevModule}
              isFirst={currentModuleIndex === 0}
              isLast={currentModuleIndex === moduleIds.length - 1}
            />

            {currentModuleIndex === moduleIds.length - 1 && (
              <CompletionButton isEnabled={isModuleCompleted} onComplete={handleCompleteModule} />
            )}
          </div>
        </main>
      )}
    </>
  )
}
