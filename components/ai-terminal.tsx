"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Sparkles, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AITerminalProps {
  onBack: () => void
}

export function AITerminal({ onBack }: AITerminalProps) {
  const [input, setInput] = useState("")
  const [commandOptions, setCommandOptions] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ai-chat" }),
  })

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [messages])

  // Parse AI responses for command options
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === "assistant") {
      const text = lastMessage.parts.find((p) => p.type === "text")?.text || ""
      const commandMatch = text.match(/COMMANDS:\s*\[(.*?)\]/i)
      if (commandMatch) {
        const commands = commandMatch[1]
          .split(",")
          .map((cmd) => cmd.trim())
          .filter((cmd) => cmd.length > 0)
        setCommandOptions(commands)
        setShowDropdown(true)
      } else {
        setCommandOptions([])
        setShowDropdown(false)
      }
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === "in_progress") return

    sendMessage({ text: input })
    setInput("")
    setShowDropdown(false)
  }

  const handleCommandSelect = (command: string) => {
    sendMessage({ text: command })
    setShowDropdown(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="h-6 w-px bg-gray-700" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <h1 className="text-xl font-bold text-white">AI Learning Assistant</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="flex-1 min-h-0 p-4">
        <div className="max-w-7xl mx-auto h-full">
          <Card className="border-gray-800 h-full flex flex-col space-y-0">
            <CardHeader className="bg-gray-900 text-white border-gray-700 flex flex-row items-center justify-between border-b py-1 px-2 flex-shrink-0">
              <CardTitle className="text-sm font-mono flex items-center">
                <div className="flex space-x-2 mr-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                AI Terminal - OpenSSL Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="!p-0 bg-black flex-1 min-h-0">
              <div
                className="bg-black text-green-400 font-mono text-sm px-3 pt-0 pb-4 h-full overflow-y-auto flex flex-col"
                ref={terminalRef}
              >
                {/* Welcome message */}
                {messages.length === 0 && (
                  <div className="pt-4 space-y-2">
                    <div className="text-purple-400">╔═══════════════════════════════════════════════════════╗</div>
                    <div className="text-purple-400">║ 🤖 AI-Powered OpenSSL Learning Assistant ║</div>
                    <div className="text-purple-400">╚═══════════════════════════════════════════════════════╝</div>
                    <div className="mt-4">
                      <div className="text-cyan-400">Welcome! I'm your AI instructor for OpenSSL.</div>
                      <div className="mt-2">Ask me anything like:</div>
                      <div className="ml-4 mt-1 text-gray-400">
                        • "Walk me through creating a CSR"
                        <br />• "How do I generate SSL certificates?"
                        <br />• "Teach me about private key management"
                      </div>
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div className="flex-1 pt-4 space-y-3">
                  {messages.map((message, index) => (
                    <div key={index}>
                      {message.role === "user" ? (
                        <div>
                          <span className="text-blue-400">user@terminal:~$ </span>
                          <span className="text-white">{message.parts.find((p) => p.type === "text")?.text}</span>
                        </div>
                      ) : (
                        <div className="text-green-400 whitespace-pre-wrap">
                          {message.parts
                            .find((p) => p.type === "text")
                            ?.text.replace(/COMMANDS:\s*\[.*?\]/gi, "")
                            .trim()}
                        </div>
                      )}
                    </div>
                  ))}
                  {status === "in_progress" && <div className="text-yellow-400">AI is thinking...</div>}
                </div>

                {/* Input area */}
                <div className="mt-4 flex-shrink-0">
                  {showDropdown && commandOptions.length > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">user@terminal:~$</span>
                      <Select onValueChange={handleCommandSelect}>
                        <SelectTrigger className="flex-1 bg-black border-gray-700 text-green-400 font-mono">
                          <SelectValue placeholder="Select a command or type your own..." />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          {commandOptions.map((cmd, idx) => (
                            <SelectItem
                              key={idx}
                              value={cmd}
                              className="text-green-400 font-mono focus:bg-gray-800 focus:text-green-300"
                            >
                              {cmd}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : null}

                  <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                    <span className="text-blue-400">user@terminal:~$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      disabled={status === "in_progress"}
                      placeholder={showDropdown ? "Or type your response..." : "Type your message..."}
                      className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-gray-600"
                      autoFocus
                    />
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
