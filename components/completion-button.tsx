"use client"

interface CompletionButtonProps {
  isEnabled: boolean
  onComplete: () => void
}

export default function CompletionButton({ isEnabled, onComplete }: CompletionButtonProps) {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onComplete}
        disabled={!isEnabled}
        className={`px-6 py-3 rounded-lg font-medium text-white ${
          isEnabled ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {isEnabled ? "Complete Module" : "Complete All Exercises to Finish"}
      </button>
    </div>
  )
}
