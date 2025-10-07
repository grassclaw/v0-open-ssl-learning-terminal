"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface CSRField {
  id: string
  label: string
  defaultValue: string
}

interface InteractiveCSRProps {
  onComplete: (values: Record<string, string>) => void
  onCancel: () => void
}

export default function InteractiveCSR({ onComplete, onCancel }: InteractiveCSRProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({
    country: "",
    state: "",
    locality: "",
    organization: "",
    organizationalUnit: "",
    commonName: "",
    email: "",
    password: "",
    companyName: "",
  })
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0)
  const [currentInput, setCurrentInput] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const csrFields: CSRField[] = [
    {
      id: "country",
      label: "Country Name (2 letter code)",
      defaultValue: "US",
    },
    {
      id: "state",
      label: "State or Province Name (full name)",
      defaultValue: "California",
    },
    {
      id: "locality",
      label: "Locality Name (eg, city)",
      defaultValue: "San Francisco",
    },
    {
      id: "organization",
      label: "Organization Name (eg, company)",
      defaultValue: "Example Inc",
    },
    {
      id: "organizationalUnit",
      label: "Organizational Unit Name (eg, section)",
      defaultValue: "IT Department",
    },
    {
      id: "commonName",
      label: "Common Name (e.g. server FQDN or YOUR name)",
      defaultValue: "example.com",
    },
    {
      id: "email",
      label: "Email Address",
      defaultValue: "admin@example.com",
    },
    {
      id: "password",
      label: "A challenge password",
      defaultValue: "",
    },
    {
      id: "companyName",
      label: "An optional company name",
      defaultValue: "",
    },
  ]

  // Focus the input field when the component mounts or the current field changes
  useEffect(() => {
    if (inputRef.current && !isCompleted) {
      inputRef.current.focus()
    }
  }, [currentFieldIndex, isCompleted])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleFieldComplete()
    }
  }

  const handleFieldComplete = () => {
    const currentField = csrFields[currentFieldIndex]

    // Use the input value or the default value if input is empty
    const valueToSave = currentInput.trim() === "" ? currentField.defaultValue : currentInput

    // Save the value
    setFormValues((prev) => ({
      ...prev,
      [currentField.id]: valueToSave,
    }))

    // Clear the current input
    setCurrentInput("")

    // Move to the next field or complete the form
    if (currentFieldIndex < csrFields.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1)
    } else {
      setIsCompleted(true)
      // Small delay to show the last field's completion before submitting
      setTimeout(() => {
        onComplete(formValues)
      }, 500)
    }
  }

  // Render the completed form with all values
  if (isCompleted) {
    return (
      <div className="bg-black text-green-400 font-mono text-sm p-4 border border-gray-700 rounded-md">
        <p>CSR information completed. Generating CSR...</p>
      </div>
    )
  }

  const currentField = csrFields[currentFieldIndex]
  const displayedFields = csrFields.slice(0, currentFieldIndex + 1)

  return (
    <div className="bg-black text-green-400 font-mono text-sm p-4 border border-gray-700 rounded-md">
      <div className="mb-4">
        <p>You are about to be asked to enter information that will be incorporated</p>
        <p>into your certificate request.</p>
        <p>What you are about to enter is what is called a Distinguished Name or a DN.</p>
        <p>There are quite a few fields but you can leave some blank</p>
        <p>For some fields there will be a default value,</p>
        <p>If you enter '.', the field will be left blank.</p>
        <p>-----</p>
      </div>

      <div className="space-y-1">
        {displayedFields.map((field, index) => (
          <div key={field.id} className="flex flex-col">
            {index < currentFieldIndex ? (
              // Already completed fields
              <div>
                <span>
                  {field.label} [{field.defaultValue}]:
                </span>
                <span className="ml-1">{formValues[field.id] || field.defaultValue}</span>
              </div>
            ) : (
              // Current field
              <div className="flex items-center">
                <span>
                  {field.label} [{field.defaultValue}]:
                </span>
                <div className="relative flex-1 ml-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none w-full text-green-400 caret-green-400"
                    placeholder="(press Enter to continue)"
                    aria-label={field.label}
                  />
                  <span className="absolute right-0 top-0 text-gray-500 text-xs">(→ Enter)</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="border-gray-700 text-green-400 hover:bg-gray-800"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
