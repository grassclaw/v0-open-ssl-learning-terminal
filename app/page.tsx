"use client"

import { useState, useEffect } from "react"
import ContentBlock from "@/components/content-block"
import Quiz from "@/components/quiz"
import Terminal from "@/components/terminal"
import Diagram from "@/components/diagram"
import ProgressBar from "@/components/progress-bar"
import Navigation from "@/components/navigation"
import TableOfContents from "@/components/table-of-contents"
import CompletionButton from "@/components/completion-button"
import CongratsPage from "@/components/congrats-page"
import { modules } from "@/lib/module-data"

export default function CSRLearningModule() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, boolean>>({})
  const [completedTerminals, setCompletedTerminals] = useState<Record<string, boolean>>({})
  const [isModuleCompleted, setIsModuleCompleted] = useState(false)
  const [showTableOfContents, setShowTableOfContents] = useState(false)
  const [showCongratsPage, setShowCongratsPage] = useState(false) // New state to control congrats page visibility

  const currentModule = modules[currentModuleIndex]

  // Move all hook calls to the top, before any conditional returns
  useEffect(() => {
    // Check if all required quizzes and terminals are completed
    const allQuizzesCompleted = modules
      .filter((module) => module.hasQuiz)
      .every((module) => completedQuizzes[module.id])

    const allTerminalsCompleted = modules
      .filter((module) => module.hasTerminal)
      .every((module) => completedTerminals[module.id])

    setIsModuleCompleted(allQuizzesCompleted && allTerminalsCompleted)
  }, [completedQuizzes, completedTerminals])

  const goToNextModule = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1)
    }
  }

  const goToPrevModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1)
    }
  }

  const goToModule = (index: number) => {
    if (index >= 0 && index < modules.length) {
      setCurrentModuleIndex(index)
      // If we're navigating to a specific module, ensure we're not showing the congrats page
      setShowCongratsPage(false)
    }
  }

  const handleQuizComplete = (moduleId: string) => {
    setCompletedQuizzes((prev) => ({
      ...prev,
      [moduleId]: true,
    }))
  }

  const handleTerminalComplete = (moduleId: string) => {
    setCompletedTerminals((prev) => ({
      ...prev,
      [moduleId]: true,
    }))
  }

  const handleCompleteModule = () => {
    // Instead of setting isModuleCompleted, we now show the congrats page
    setShowCongratsPage(true)
  }

  const handleRestart = () => {
    setCurrentModuleIndex(0)
    setCompletedQuizzes({})
    setCompletedTerminals({})
    setIsModuleCompleted(false)
    setShowCongratsPage(false)
  }

  const toggleTableOfContents = () => {
    setShowTableOfContents(!showTableOfContents)
  }

  // Render different content based on module completion status
  // but don't use early return with hooks
  return (
    <>
      {showCongratsPage ? (
        <CongratsPage onRestart={handleRestart} />
      ) : (
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Certificate Signing Request (CSR) with OpenSSL</h1>
            <button
              onClick={toggleTableOfContents}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Table of Contents"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>

          <ProgressBar totalModules={modules.length} currentModule={currentModuleIndex + 1} />

          {showTableOfContents && (
            <TableOfContents
              modules={modules}
              currentModuleIndex={currentModuleIndex}
              completedQuizzes={completedQuizzes}
              completedTerminals={completedTerminals}
              onSelectModule={goToModule}
              onClose={() => setShowTableOfContents(false)}
            />
          )}

          <div className="space-y-8 mt-6">
            <ContentBlock module={currentModule} />

            {currentModule.hasQuiz && (
              <Quiz
                moduleId={currentModule.id}
                onComplete={() => handleQuizComplete(currentModule.id)}
                isCompleted={completedQuizzes[currentModule.id] || false}
              />
            )}

            {currentModule.hasTerminal && (
              <Terminal
                moduleId={currentModule.id}
                onComplete={() => handleTerminalComplete(currentModule.id)}
                isCompleted={completedTerminals[currentModule.id] || false}
              />
            )}

            {currentModule.hasDiagram && <Diagram diagramType={currentModule.id} />}

            <Navigation
              onNext={goToNextModule}
              onPrev={goToPrevModule}
              isFirst={currentModuleIndex === 0}
              isLast={currentModuleIndex === modules.length - 1}
            />

            {currentModuleIndex === modules.length - 1 && (
              <CompletionButton isEnabled={isModuleCompleted} onComplete={handleCompleteModule} />
            )}
          </div>
        </main>
      )}
    </>
  )
}
