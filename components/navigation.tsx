"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface NavigationProps {
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

export default function Navigation({ onNext, onPrev, isFirst, isLast }: NavigationProps) {
  return (
    <div className="flex justify-between items-center py-4">
      <button
        onClick={onPrev}
        className={`flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors ${
          isFirst ? "invisible" : ""
        }`}
        aria-label="Previous module"
        disabled={isFirst}
      >
        <ChevronLeft className="h-5 w-5" />
        <span>Previous</span>
      </button>

      <button
        onClick={onNext}
        className={`flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors ${
          isLast ? "invisible" : ""
        }`}
        aria-label="Next module"
        disabled={isLast}
      >
        <span>Next</span>
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
