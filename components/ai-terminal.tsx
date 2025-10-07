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

const simulateCommand = (command: string): string => {
  const cmd = command.trim().toLowerCase()

  if (cmd.includes("openssl version")) {
    return "OpenSSL 3.0.2 15 Mar 2022 (Library: OpenSSL 3.0.2 15 Mar 2022)"
  }

  if (cmd.includes("openssl genrsa")) {
    const keySize = cmd.match(/\d{4}/) ? cmd.match(/\d{4}/)?.[0] : "2048"
    return `Generating RSA private key, ${keySize} bit long modulus (2 primes)
.......+++++
......................+++++
e is 65537 (0x010001)`
  }

  if (cmd.includes("openssl req") && cmd.includes("-new")) {
    return `You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
-----
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:California
Locality Name (eg, city) []:San Francisco
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Example Corp
Organizational Unit Name (eg, section) []:IT Department
Common Name (e.g. server FQDN or YOUR name) []:example.com
Email Address []:admin@example.com`
  }

  if (cmd.includes("ls") || cmd.includes("dir")) {
    return `private.key  certificate.csr  certificate.crt`
  }

  if (cmd.includes("cat") || cmd.includes("type")) {
    return `-----BEGIN CERTIFICATE REQUEST-----
MIICvDCCAaQCAQAwdzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWEx
FjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xFTATBgNVBAoMDEV4YW1wbGUgQ29ycDEU
MBIGA1UECwwLSVQgRGVwYXJ0bWVudDEOMAwGA1UEAwwFZXhhbXBsZTCCASIwDQYJ
...
-----END CERTIFICATE REQUEST-----`
  }

  if (cmd.includes("help") || cmd === "?") {
    return `Available OpenSSL commands:
  openssl version          - Display OpenSSL version
  openssl genrsa          - Generate RSA private key
  openssl req             - Create certificate request
  openssl x509            - Certificate display and signing
  
Type 'help <command>' for more information on a specific command.`
  }

  return `Command executed: ${command}`
}

export function AITerminal({ onBack }: AITerminalProps) {
  const [input, setInput] = useState("")
  const [commandOptions, setCommandOptions] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [commandOutputs, setCommandOutputs] = useState<Array<{ command: string; output: string }>>([])
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ai-chat" }),
  })

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [messages, commandOutputs, status])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "c" && status === "in_progress") {
        e.preventDefault()
        stop()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [status, stop])

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

    const trimmedInput = input.trim()
    if (
      trimmedInput.startsWith("openssl") ||
      ["ls", "dir", "cat", "help"].some((cmd) => trimmedInput.startsWith(cmd))
    ) {
      const output = simulateCommand(trimmedInput)
      setCommandOutputs((prev) => [...prev, { command: trimmedInput, output }])
      // Send both command and output to AI for context
      sendMessage({ text: `I executed: ${trimmedInput}\n\nOutput:\n${output}` })
    } else {
      sendMessage({ text: trimmedInput })
    }

    setInput("")
    setShowDropdown(false)
  }

  const handleCommandSelect = (command: string) => {
    const output = simulateCommand(command)
    setCommandOutputs((prev) => [...prev, { command, output }])
    sendMessage({ text: `I executed: ${command}\n\nOutput:\n${output}` })
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
          {status === "in_progress" && <div className="text-sm text-gray-400">Press Ctrl+C to stop generation</div>}
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

                  {commandOutputs.map((item, index) => (
                    <div key={`cmd-${index}`} className="space-y-1">
                      <div>
                        <span className="text-blue-400">user@terminal:~$ </span>
                        <span className="text-white">{item.command}</span>
                      </div>
                      <div className="text-gray-300 whitespace-pre-wrap ml-4">{item.output}</div>
                    </div>
                  ))}

                  {status === "in_progress" && (
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">user@terminal:~$</span>
                      <span className="text-yellow-400 animate-pulse">▊</span>
                    </div>
                  )}
                </div>

                {/* Input area */}
                <div className="mt-4 flex-shrink-0">
                  {showDropdown && commandOptions.length > 0 && status !== "in_progress" ? (
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

                  {status !== "in_progress" && (
                    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                      <span className="text-blue-400">user@terminal:~$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder={showDropdown ? "Or type your response..." : "Type your message..."}
                        className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-gray-600"
                        autoFocus
                      />
                    </form>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
