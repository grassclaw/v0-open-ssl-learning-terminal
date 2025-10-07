"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lock, CheckCircle2, Terminal, Sparkles } from "lucide-react"

interface LearningPath {
  id: string
  title: string
  description: string
  status: "available" | "pending" | "completed"
  icon: string
}

const learningPaths: LearningPath[] = [
  {
    id: "csr-generation",
    title: "Certificate Signing Request (CSR)",
    description: "Learn to generate and manage CSRs with OpenSSL",
    status: "available",
    icon: "📝",
  },
  {
    id: "ssl-tls-certs",
    title: "SSL/TLS Certificate Generation",
    description: "Create and configure SSL/TLS certificates",
    status: "pending",
    icon: "🔐",
  },
  {
    id: "private-key-mgmt",
    title: "Private Key Management",
    description: "Secure generation and storage of private keys",
    status: "pending",
    icon: "🔑",
  },
  {
    id: "certificate-authority",
    title: "Certificate Authority Setup",
    description: "Build and manage your own Certificate Authority",
    status: "pending",
    icon: "🏛️",
  },
  {
    id: "digital-signatures",
    title: "Digital Signatures & Verification",
    description: "Sign and verify documents using OpenSSL",
    status: "pending",
    icon: "✍️",
  },
  {
    id: "encryption-basics",
    title: "Encryption and Decryption",
    description: "Master symmetric and asymmetric encryption",
    status: "pending",
    icon: "🔒",
  },
  {
    id: "cert-chain-validation",
    title: "Certificate Chain Validation",
    description: "Understand and validate certificate chains",
    status: "pending",
    icon: "⛓️",
  },
  {
    id: "https-config",
    title: "HTTPS Configuration",
    description: "Configure web servers with SSL/TLS",
    status: "pending",
    icon: "🌐",
  },
  {
    id: "key-exchange",
    title: "Key Exchange Protocols",
    description: "Learn Diffie-Hellman and other key exchange methods",
    status: "pending",
    icon: "🔄",
  },
  {
    id: "crl-management",
    title: "Certificate Revocation Lists",
    description: "Manage and verify certificate revocation",
    status: "pending",
    icon: "📋",
  },
]

interface LearningDashboardProps {
  onSelectPath: (pathId: string) => void
}

export default function LearningDashboard({ onSelectPath }: LearningDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="w-10 h-10 text-gray-800" />
            <h1 className="text-4xl font-bold text-gray-900">OpenSSL Learning Modules</h1>
          </div>
          <p className="text-gray-600 text-lg">Master OpenSSL through interactive terminal-based learning paths</p>
        </div>

        <Button
          className="w-full mb-8 h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Learn with AI
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path) => (
            <Card
              key={path.id}
              className={`transition-all duration-200 ${
                path.status === "available"
                  ? "hover:shadow-lg hover:scale-105 cursor-pointer border-2 border-green-200 bg-white"
                  : "opacity-60 cursor-not-allowed bg-gray-50"
              }`}
              onClick={() => path.status === "available" && onSelectPath(path.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-4xl">{path.icon}</div>
                  {path.status === "available" && <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>}
                  {path.status === "pending" && (
                    <Badge variant="secondary" className="gap-1">
                      <Lock className="w-3 h-3" />
                      Pending
                    </Badge>
                  )}
                  {path.status === "completed" && (
                    <Badge className="bg-blue-500 hover:bg-blue-600 gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{path.title}</CardTitle>
                <CardDescription className="text-sm">{path.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {path.status === "available" && (
                  <p className="text-sm text-green-600 font-medium">Click to start learning →</p>
                )}
                {path.status === "pending" && <p className="text-sm text-gray-500">Coming soon</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
