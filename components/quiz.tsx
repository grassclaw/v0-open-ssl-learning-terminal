"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import { quizQuestions } from "@/lib/quiz-data"

interface QuizProps {
  moduleId: string
  onComplete: () => void
  isCompleted: boolean
}

export default function Quiz({ moduleId, onComplete, isCompleted }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, boolean>>({})
  const [allQuestionsCorrect, setAllQuestionsCorrect] = useState(false)
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false)

  // Reset selected answers when module changes
  useEffect(() => {
    setSelectedAnswers({})
    setCorrectAnswers({})
    setAllQuestionsCorrect(false)
    setAllQuestionsAnswered(false)
  }, [moduleId])

  // Get questions for current module
  const questions = quizQuestions[moduleId] || []

  if (questions.length === 0) {
    return null
  }

  // Check if all questions are answered correctly
  useEffect(() => {
    if (questions.length > 0) {
      setAllQuestionsCorrect(questions.every((q) => correctAnswers[q.id] === true))
      setAllQuestionsAnswered(questions.every((q) => selectedAnswers[q.id] !== undefined))
    } else {
      setAllQuestionsCorrect(false)
      setAllQuestionsAnswered(false)
    }
  }, [correctAnswers, questions, selectedAnswers])

  useEffect(() => {
    if (!isCompleted && allQuestionsCorrect && allQuestionsAnswered) {
      onComplete()
    }
  }, [allQuestionsCorrect, allQuestionsAnswered, isCompleted, onComplete])

  const handleAnswerSelect = (questionId: string, value: string) => {
    // Update the selected answer for this specific question
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))

    // Check if answer is correct for this question
    const question = questions.find((q) => q.id === questionId)
    const isAnswerCorrect = question?.answers.find((a) => a.id === value)?.correct || false

    // Update the correctness state for this question
    setCorrectAnswers((prev) => ({
      ...prev,
      [questionId]: isAnswerCorrect,
    }))
  }

  const isAnswerCorrect = (questionId: string, answerId: string) => {
    return (
      selectedAnswers[questionId] === answerId &&
      questions.find((q) => q.id === questionId)?.answers.find((a) => a.id === answerId)?.correct === true
    )
  }

  const isAnswerIncorrect = (questionId: string, answerId: string) => {
    return (
      selectedAnswers[questionId] === answerId &&
      questions.find((q) => q.id === questionId)?.answers.find((a) => a.id === answerId)?.correct !== true
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Knowledge Check</CardTitle>
        {isCompleted && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-1" />
            <span className="text-sm">Completed</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {questions.map((question) => (
          <div key={question.id} className="space-y-4 mb-6">
            <p className="font-medium">{question.question}</p>

            <RadioGroup
              value={selectedAnswers[question.id] || ""}
              onValueChange={(value) => handleAnswerSelect(question.id, value)}
            >
              <div className="space-y-2">
                {question.answers.map((answer) => (
                  <div key={answer.id} className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 border rounded-md p-2 w-full">
                      <RadioGroupItem value={answer.id} id={`${question.id}-answer-${answer.id}`} />
                      <Label
                        htmlFor={`${question.id}-answer-${answer.id}`}
                        className={`flex-grow ${isAnswerCorrect(question.id, answer.id) ? "text-green-600" : ""} ${
                          isAnswerIncorrect(question.id, answer.id) ? "text-red-600" : ""
                        }`}
                      >
                        {answer.text}
                      </Label>
                      {isAnswerCorrect(question.id, answer.id) && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {selectedAnswers[question.id] && !correctAnswers[question.id] && (
              <p className="text-red-600 text-sm">Try again!</p>
            )}

            {correctAnswers[question.id] && <p className="text-green-600 text-sm">{question.explanation}</p>}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
