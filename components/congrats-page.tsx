"use client"

interface CongratsPageProps {
  onRestart: () => void
}

export default function CongratsPage({ onRestart }: CongratsPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Congratulations!</h1>
          <p className="text-gray-600">
            You've successfully completed the Certificate Signing Request (CSR) Learning Module.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">What you've learned:</h2>
          <ul className="text-left text-sm space-y-1">
            <li>• Understanding of Certificate Authorities and their role</li>
            <li>• How to use OpenSSL for cryptographic operations</li>
            <li>• Creating private keys and CSRs</li>
            <li>• Verifying certificate chains</li>
            <li>• Best practices for certificate management</li>
          </ul>
        </div>

        <div className="space-y-4">
          <button
            onClick={onRestart}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Restart Module
          </button>
          <a
            href="#"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Download Certificate of Completion
          </a>
        </div>
      </div>
    </div>
  )
}
