"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"
import { terminalCommands } from "@/lib/terminal-data"
import InteractiveCSR from "@/components/interactive-csr"

interface TerminalProps {
  moduleId: string
  onComplete: () => void
  isCompleted: boolean
}

export default function Terminal({ moduleId, onComplete, isCompleted }: TerminalProps) {
  const [history, setHistory] = useState<Array<{ type: "input" | "output"; content: string }>>([
    { type: "output", content: "Welcome to the OpenSSL CSR Generator Terminal" },
    { type: "output", content: "Select a command from the dropdown below..." },
  ])
  const [executedCommands, setExecutedCommands] = useState<Set<string>>(new Set())
  const [successfulCommands, setSuccessfulCommands] = useState<Set<string>>(new Set())
  const [commandState, setCommandState] = useState<Record<string, boolean>>({})
  const [selectedCommand, setSelectedCommand] = useState<string>("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const selectRef = useRef<HTMLButtonElement>(null)
  const [isInteractiveMode, setIsInteractiveMode] = useState(false)
  const [interactiveCommand, setInteractiveCommand] = useState<string>("")

  // Get commands for current module
  const availableCommands = terminalCommands[moduleId] || []

  // Reset terminal when module changes
  useEffect(() => {
    setHistory([
      { type: "output", content: "Welcome to the OpenSSL CSR Generator Terminal" },
      { type: "output", content: "Select a command from the dropdown below..." },
    ])
    setExecutedCommands(new Set())
    setSuccessfulCommands(new Set())
    setCommandState({})
    setSelectedCommand("")
    setShowSuccessMessage(false)
  }, [moduleId])

  const handleInteractiveCSRComplete = (values: Record<string, string>) => {
    // Format the CSR values for display
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

    // Add the response to history
    setHistory((prev) => [...prev, { type: "output", content: formattedValues }])

    // Exit interactive mode
    setIsInteractiveMode(false)

    // Mark the command as executed and successful
    setExecutedCommands((prev) => new Set(prev).add(interactiveCommand))
    setSuccessfulCommands((prev) => new Set(prev).add(interactiveCommand))

    // Store the CSR values for later use
    setCommandState((prev) => ({
      ...prev,
      csrExists: true,
      csrValues: values, // Store the actual values entered
    }))

    // Check if this completes the exercise
    const allPrerequisitesMet = checkAllPrerequisites()
    if (allPrerequisitesMet) {
      completeExercise()
    }
  }

  // Add this function to handle cancellation of interactive mode
  const handleInteractiveCancel = () => {
    setIsInteractiveMode(false)
    setHistory((prev) => [...prev, { type: "output", content: "CSR generation cancelled." }])
  }

  const handleCommandSelect = (command: string) => {
    // Find the command object
    const commandObj = availableCommands.find((cmd) => cmd.value === command)

    if (!commandObj) return

    // Add the selected command to history with the full command text
    setHistory((prev) => [...prev, { type: "input", content: command }])

    // Check if this is an interactive command
    if (commandObj.interactive) {
      setIsInteractiveMode(true)
      setInteractiveCommand(command)
      return
    }

    // Get the appropriate response based on command state
    let response = commandObj.response
    let isCommandSuccessful = true // Assume success by default

    // Special handling for viewing CSR contents to show the actual values entered
    if (command === "openssl req -text -noout -in request.csr" && commandState.csrValues) {
      const values = commandState.csrValues as Record<string, string>

      // Use the actual values or defaults if empty
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

    // Check for conditional responses
    if (commandObj.conditionalResponses) {
      for (const condition of commandObj.conditionalResponses) {
        // Check if the condition is met
        const conditionMet = condition.requires
          ? condition.requires.every((req) => commandState[req] || successfulCommands.has(req))
          : condition.requiresNot
            ? condition.requiresNot.every((req) => !commandState[req] && !successfulCommands.has(req))
            : false

        if (conditionMet) {
          response = condition.response
          // If this is an error response (contains specific error messages), mark as unsuccessful
          if (
            response.includes("No such file or directory") ||
            response.includes("Error:") ||
            response.includes("command not found")
          ) {
            isCommandSuccessful = false
          }
          break
        }
      }
    }

    // Add the response to history
    setHistory((prev) => [...prev, { type: "output", content: response }])

    // Mark this command as executed
    setExecutedCommands((prev) => new Set(prev).add(command))

    // If command was successful, mark it as such
    if (isCommandSuccessful) {
      setSuccessfulCommands((prev) => new Set(prev).add(command))

      // Update command state
      if (commandObj.setsState) {
        setCommandState((prev) => ({
          ...prev,
          ...commandObj.setsState,
        }))
      }
    }

    // Check if this is the final command that completes the exercise
    if (commandObj.completesExercise && isCommandSuccessful) {
      // Check if all required prerequisites have been successfully executed
      const allPrerequisitesMet = checkAllPrerequisites()

      if (allPrerequisitesMet) {
        completeExercise()
      }
    }

    // Clear the selected command after execution
    setSelectedCommand("")

    // Focus back on the select dropdown to keep it accessible
    setTimeout(() => {
      if (selectRef.current) {
        selectRef.current.focus()
      }
    }, 100)
  }

  const checkAllPrerequisites = () => {
    // For each module, define the specific prerequisites
    switch (moduleId) {
      case "install-openssl":
        // Need to have successfully installed OpenSSL AND checked the version
        return commandState.opensslInstalled === true && successfulCommands.has("openssl version")

      case "create-private-key":
        // Need to have successfully generated the key AND set permissions
        return (
          successfulCommands.has("openssl genrsa -out private_key.pem 2048") &&
          successfulCommands.has("chmod 600 private_key.pem")
        )

      case "create-csr":
        // Need to have successfully created the CSR AND viewed its contents
        return (
          successfulCommands.has("openssl req -new -key private_key.pem -out request.csr") &&
          successfulCommands.has("openssl req -text -noout -in request.csr")
        )

      case "verify-key-csr":
        // Need to have checked both moduli AND compared them
        return (
          successfulCommands.has("openssl req -noout -modulus -in request.csr | openssl md5") &&
          successfulCommands.has("openssl rsa -noout -modulus -in private_key.pem | openssl md5") &&
          successfulCommands.has("echo 'Comparing hashes...'")
        )

      case "verify-chain":
        // Need to have run both the verify command and the certificate details command
        return (
          successfulCommands.has("openssl verify -CAfile full_chain.pem signed_cert.pem") &&
          successfulCommands.has("openssl x509 -in signed_cert.pem -text -noout | grep 'Issuer\\|Subject'")
        )

      case "build-chain":
        // Need to have built the chain correctly, verified it, and inspected it
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

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Check if the exercise should be completed after each successful command
  useEffect(() => {
    // Only run this check if we haven't already shown the success message
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
    <Card className="border-gray-800">
      <CardHeader className="bg-gray-900 text-white border-b border-gray-700 rounded-t-lg flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-mono flex items-center">
          <div className="flex space-x-2 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          Terminal
        </CardTitle>
        {isCompleted && (
          <div className="flex items-center text-green-400">
            <CheckCircle className="h-5 w-5 mr-1" />
            <span className="text-sm">Completed</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-black text-green-400 font-mono text-sm p-4 h-80 overflow-y-auto" ref={terminalRef}>
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
            <div className="flex items-center mt-2">
              <span className="text-blue-400 mr-2">user@server:~$</span>
              <Select value={selectedCommand} onValueChange={handleCommandSelect}>
                <SelectTrigger
                  ref={selectRef}
                  className="bg-transparent border-none text-green-400 focus:ring-0 focus:ring-offset-0 w-full max-w-[500px]"
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
      </CardContent>
    </Card>
  )
}
