"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"
import { terminalModules } from "@/lib/terminal-data"
import InteractiveCSR from "@/components/interactive-csr"
import { Input } from "@/components/ui/input"

interface TerminalProps {
  moduleId: string
  onComplete: () => void
  isCompleted: boolean
}

export default function Terminal({ moduleId, onComplete, isCompleted }: TerminalProps) {
  const module = terminalModules[moduleId]

  const [history, setHistory] = useState<Array<{ type: "input" | "output"; content: string }>>([
    { type: "output", content: module?.introduction || "Welcome to the terminal..." },
  ])

  const [executedCommands, setExecutedCommands] = useState<Set<string>>(new Set())
  const [successfulCommands, setSuccessfulCommands] = useState<Set<string>>(new Set())
  const [commandState, setCommandState] = useState<Record<string, boolean>>({})
  const [selectedCommand, setSelectedCommand] = useState<string>("")
  const [inputValue, setInputValue] = useState<string>("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const selectRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isInteractiveMode, setIsInteractiveMode] = useState(false)
  const [interactiveCommand, setInteractiveCommand] = useState<string>("")

  const availableCommands = module?.commands || []

  useEffect(() => {
    setHistory([{ type: "output", content: module?.introduction || "Welcome to the terminal..." }])
    setExecutedCommands(new Set())
    setSuccessfulCommands(new Set())
    setCommandState({})
    setSelectedCommand("")
    setInputValue("")
    setShowSuccessMessage(false)
  }, [moduleId, module])

  const handleInteractiveCSRComplete = (values: Record<string, string>) => {
    const formattedValues = [
      `Country Name (2 letter code) [US]:${values.country || ""}`,
      `State or Province Name (full name) [California]:${values.state || ""}`,
      `Locality Name (eg, city) [San Francisco]:${values.locality || ""}`,
      `Organization Name (eg, company) [Example Inc]:${values.organization || ""}`,
      `Organizational Unit Name (eg, section) [IT Department]:${values.organizationalUnit || ""}`,
      `Common Name (e.g. server FQDN or YOUR name) [example.com]:${values.commonName || ""}`,
      `Email Address [admin@example.com]:${values.email || ""}`,
      ``,
      `Please enter the following 'extra' attributes`,
      `to be sent with your certificate request`,
      `A challenge password []:${values.password || ""}`,
      `An optional company name []:${values.companyName || ""}`,
      ``,
      `Generating certificate request...`,
      `Certificate request self-signature ok`,
      `CSR created successfully and saved to request.csr.`,
    ].join("\n")

    setHistory((prev) => [...prev, { type: "output", content: formattedValues }])
    setIsInteractiveMode(false)
    setExecutedCommands((prev) => new Set(prev).add(interactiveCommand))
    setSuccessfulCommands((prev) => new Set(prev).add(interactiveCommand))
    setCommandState((prev) => ({
      ...prev,
      csrExists: true,
      csrValues: values,
    }))

    const allPrerequisitesMet = checkAllPrerequisites()
    if (allPrerequisitesMet) {
      completeExercise()
    }
  }

  const handleInteractiveCancel = () => {
    setIsInteractiveMode(false)
    setHistory((prev) => [...prev, { type: "output", content: "CSR generation cancelled." }])
  }

  const executeCommand = (command: string) => {
    if (command.toLowerCase() === "help") {
      const helpCommand = availableCommands.find((cmd) => cmd.value === "help")
      if (helpCommand) {
        setHistory((prev) => [
          ...prev,
          { type: "input", content: command },
          { type: "output", content: helpCommand.response },
        ])
      } else {
        setHistory((prev) => [
          ...prev,
          { type: "input", content: command },
          { type: "output", content: "No help available for this step." },
        ])
      }
      setInputValue("")
      setSelectedCommand("")
      return
    }

    const commandObj = availableCommands.find((cmd) => cmd.value === command)

    if (!commandObj) {
      const similarCommand = availableCommands.find(
        (cmd) => cmd.value !== "help" && command.toLowerCase().includes(cmd.value.toLowerCase().split(" ")[0]),
      )

      if (similarCommand) {
        setHistory((prev) => [
          ...prev,
          { type: "input", content: command },
          {
            type: "output",
            content: `⚠️  Command not recognized. Did you mean: ${similarCommand.value}?\n\n💡 TIP: Type 'help' for available commands.`,
          },
        ])
      } else {
        setHistory((prev) => [
          ...prev,
          { type: "input", content: command },
          {
            type: "output",
            content: `❌ Command not found: ${command}\n\n💡 TIP: Type 'help' to see available commands.`,
          },
        ])
      }
      setInputValue("")
      setSelectedCommand("")
      return
    }

    setHistory((prev) => [...prev, { type: "input", content: command }])

    if (commandObj.interactive) {
      setIsInteractiveMode(true)
      setInteractiveCommand(command)
      setInputValue("")
      setSelectedCommand("")
      return
    }

    let response = commandObj.response
    let isCommandSuccessful = true

    if (command === "openssl req -text -noout -in request.csr" && commandState.csrValues) {
      const values = commandState.csrValues as Record<string, string>
      const country = values.country || "US"
      const state = values.state || "California"
      const locality = values.locality || "San Francisco"
      const organization = values.organization || "Example Inc"
      const orgUnit = values.organizationalUnit || "IT Department"
      const commonName = values.commonName || "example.com"
      const email = values.email || "admin@example.com"

      response = `Certificate Request:
    Data:
        Version: 0 (0x0)
        Subject: C=${country}, ST=${state}, L=${locality}, O=${organization}, OU=${orgUnit}, CN=${commonName}/emailAddress=${email}
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:b4:31:98:0a:c4:bc:62:c1:88:aa:dc:b0:c8:bb:
                    33:35:19:d5:0c:64:b9:3d:41:b2:96:fc:f3:30:b1:
                    ...
                Exponent: 65537 (0x10001)
        Attributes:
            a0:00
    Signature Algorithm: sha256WithRSAEncryption
         84:a8:9a:11:a7:d8:bd:0b:26:7e:52:24:a9:a1:9a:51:23:14:
         ...`
    }

    if (commandObj.conditionalResponses) {
      for (const condition of commandObj.conditionalResponses) {
        const conditionMet = condition.requires
          ? condition.requires.every((req) => commandState[req] || successfulCommands.has(req))
          : condition.requiresNot
            ? condition.requiresNot.every((req) => !commandState[req] && !successfulCommands.has(req))
            : false

        if (conditionMet) {
          response = condition.response
          if (
            response.includes("No such file or directory") ||
            response.includes("Error:") ||
            response.includes("command not found") ||
            response.includes("❌")
          ) {
            isCommandSuccessful = false
          }
          break
        }
      }
    }

    setHistory((prev) => [...prev, { type: "output", content: response }])
    setExecutedCommands((prev) => new Set(prev).add(command))

    if (isCommandSuccessful) {
      setSuccessfulCommands((prev) => new Set(prev).add(command))

      if (commandObj.setsState) {
        setCommandState((prev) => ({
          ...prev,
          ...commandObj.setsState,
        }))
      }
    }

    if (commandObj.completesStep && isCommandSuccessful) {
      const allPrerequisitesMet = checkAllPrerequisites()
      if (allPrerequisitesMet) {
        completeExercise()
      }
    }

    setInputValue("")
    setSelectedCommand("")

    setTimeout(() => {
      if (inputValue && inputRef.current) {
        inputRef.current.focus()
      } else if (selectRef.current) {
        selectRef.current.focus()
      }
    }, 100)
  }

  const handleCommandSelect = (command: string) => {
    executeCommand(command)
  }

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      executeCommand(inputValue.trim())
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const checkAllPrerequisites = () => {
    switch (moduleId) {
      case "install-openssl":
        return commandState.opensslInstalled === true && successfulCommands.has("openssl version")

      case "create-private-key":
        return (
          successfulCommands.has("openssl genrsa -out private_key.pem 2048") &&
          successfulCommands.has("chmod 600 private_key.pem")
        )

      case "create-csr":
        return (
          successfulCommands.has("openssl req -new -key private_key.pem -out request.csr") &&
          successfulCommands.has("openssl req -text -noout -in request.csr")
        )

      case "verify-key-csr":
        return (
          successfulCommands.has("openssl req -noout -modulus -in request.csr | openssl md5") &&
          successfulCommands.has("openssl rsa -noout -modulus -in private_key.pem | openssl md5") &&
          successfulCommands.has("echo 'Comparing hashes...'")
        )

      case "verify-chain":
        return (
          successfulCommands.has("openssl verify -CAfile full_chain.pem signed_cert.pem") &&
          successfulCommands.has("openssl x509 -in signed_cert.pem -text -noout | grep 'Issuer\\|Subject'")
        )

      case "build-chain":
        return (
          successfulCommands.has("cat signed_cert.pem intermediate.pem root.pem > full_chain.pem") &&
          successfulCommands.has("openssl verify -CAfile full_chain.pem signed_cert.pem") &&
          successfulCommands.has("openssl x509 -in full_chain.pem -text -noout")
        )

      default:
        return true
    }
  }

  const completeExercise = () => {
    if (!showSuccessMessage) {
      setShowSuccessMessage(true)
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: "\n🎉 Congratulations! You've successfully completed all required commands for this exercise! 🎉\n",
        },
      ])
      onComplete()
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (!showSuccessMessage) {
      const allPrerequisitesMet = checkAllPrerequisites()
      if (allPrerequisitesMet) {
        completeExercise()
      }
    }
  }, [successfulCommands, commandState])

  if (availableCommands.length === 0) {
    return null
  }

  return (
    <Card className="border-gray-800 h-full flex flex-col space-y-0 border-none">
      <CardHeader className="bg-gray-900 text-white border-gray-700 flex flex-row items-center justify-between px-2 flex-shrink-0 py-1 border-b rounded-sm my-[-30px]">
        <CardTitle className="text-sm font-mono flex items-center">
          <div className="flex space-x-2 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {module?.title || "Terminal"}
        </CardTitle>
        {isCompleted && (
          <div className="flex items-center text-green-400">
            <CheckCircle className="h-5 w-5 mr-1" />
            <span className="text-sm">Completed</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="!p-0 bg-black flex-1 min-h-0">
        <div
          className="bg-black text-green-400 font-mono text-sm h-full overflow-y-auto px-3 pt-0 pb-4"
          ref={terminalRef}
        >
          {history.map((entry, index) => (
            <div key={index} className="whitespace-pre-wrap mb-1">
              {entry.type === "input" ? (
                <div>
                  <span className="text-blue-400">user@server:~$</span> {entry.content}
                </div>
              ) : (
                <div>{entry.content}</div>
              )}
            </div>
          ))}

          {isInteractiveMode ? (
            <InteractiveCSR onComplete={handleInteractiveCSRComplete} onCancel={handleInteractiveCancel} />
          ) : (
            <div className="flex items-center mt-2 gap-2">
              <span className="text-blue-400">user@server:~$</span>
              {inputValue ? (
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputSubmit}
                    placeholder="Type a command or 'help'..."
                    className="bg-transparent border-none text-green-400 focus-visible:ring-0 focus-visible:ring-offset-0 font-mono p-0"
                    autoFocus
                  />
                </div>
              ) : (
                <div className="flex-1 flex items-center gap-2">
                  <Select value={selectedCommand} onValueChange={handleCommandSelect}>
                    <SelectTrigger
                      ref={selectRef}
                      className="bg-transparent border-none text-green-400 focus:ring-0 focus:ring-offset-0 flex-1"
                      onKeyDown={(e) => {
                        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                          setInputValue(e.key)
                          setTimeout(() => inputRef.current?.focus(), 0)
                          e.preventDefault()
                        }
                      }}
                    >
                      <SelectValue placeholder="Select a command..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCommands.map((command) => (
                        <SelectItem key={command.value} value={command.value}>
                          {command.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
