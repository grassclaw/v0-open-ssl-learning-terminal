interface ProgressBarProps {
  totalModules: number
  currentModule: number
}

export default function ProgressBar({ totalModules, currentModule }: ProgressBarProps) {
  const percentage = (currentModule / totalModules) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Progress</span>
        <span>
          {currentModule} of {totalModules}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}
