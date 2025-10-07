export interface QuizAnswer {
  id: string
  text: string
  correct?: boolean
}

export interface TerminalEntry {
  type: "input" | "output"
  content: string
}
