import type React from "react"
export const diagrams: Record<string, { title: string; content: React.ReactNode }> = {
  "certificate-authority": {
    title: "Certificate Authority Process",
    content: (
      <div className="w-full max-w-3xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
          <div className="bg-blue-100 p-4 rounded-lg text-center w-full md:w-1/4">
            <div className="text-5xl mb-2">👤</div>
            <div className="font-semibold">Website Owner</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="border-t-2 border-gray-400 w-16 md:w-24 my-2 md:rotate-0 rotate-90"></div>
            <div className="bg-green-100 px-3 py-1 rounded text-sm">CSR</div>
            <div className="border-t-2 border-gray-400 w-16 md:w-24 my-2 md:rotate-0 rotate-90"></div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg text-center w-full md:w-1/4">
            <div className="text-5xl mb-2">🏢</div>
            <div className="font-semibold">Certificate Authority</div>
            <div className="text-sm mt-2">Verifies Identity</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="border-t-2 border-gray-400 w-16 md:w-24 my-2 md:rotate-0 rotate-90"></div>
            <div className="bg-yellow-100 px-3 py-1 rounded text-sm">Signed Certificate</div>
            <div className="border-t-2 border-gray-400 w-16 md:w-24 my-2 md:rotate-0 rotate-90"></div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg text-center w-full md:w-1/4">
            <div className="text-5xl mb-2">👤</div>
            <div className="font-semibold">Website Owner</div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 mt-4">
          Similar to a passport office verifying your identity before issuing an official document
        </div>
      </div>
    ),
  },
  "terminal-intro": {
    title: "Terminal Interfaces Across Operating Systems",
    content: (
      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-center mb-3">Linux Terminal</h3>
            <div className="bg-gray-900 text-green-400 p-3 rounded-md font-mono text-sm h-32 overflow-hidden">
              <div className="flex items-center mb-2">
                <div className="flex space-x-1 mr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-xs">user@linux:~</span>
              </div>
              <div className="mb-1">user@linux:~ $ ls -la</div>
              <div className="mb-1">total 32</div>
              <div className="mb-1">drwxr-xr-x 5 user user 4096 May 1 12:34 .</div>
              <div className="mb-1">drwxr-xr-x 3 root root 4096 Apr 15 09:12 ..</div>
              <div>user@linux:~ $ _</div>
            </div>
            <div className="text-center mt-2 text-sm">
              <span className="font-semibold">Shortcut:</span> Ctrl + Alt + T
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-center mb-3">macOS Terminal</h3>
            <div className="bg-gray-900 text-white p-3 rounded-md font-mono text-sm h-32 overflow-hidden">
              <div className="flex items-center mb-2">
                <div className="flex space-x-1 mr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-xs">user-macbook:~ user$</span>
              </div>
              <div className="mb-1">user-macbook:~ user$ ls -la</div>
              <div className="mb-1">total 16</div>
              <div className="mb-1">drwxr-xr-x@ 10 user staff 320 May 1 12:34 .</div>
              <div className="mb-1">drwxr-xr-x 5 root admin 160 Apr 15 09:12 ..</div>
              <div>user-macbook:~ user$ _</div>
            </div>
            <div className="text-center mt-2 text-sm">
              <span className="font-semibold">Shortcut:</span> Cmd + Space, type "Terminal"
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-center mb-3">Windows PowerShell</h3>
            <div className="bg-blue-900 text-white p-3 rounded-md font-mono text-sm h-32 overflow-hidden">
              <div className="mb-2 text-blue-300">Windows PowerShell</div>
              <div className="mb-1">PS C:\Users\User&gt; dir</div>
              <div className="mb-1">
                <span className="text-yellow-300">Directory:</span> C:\Users\User
              </div>
              <div className="mb-1">Mode LastWriteTime Length Name</div>
              <div className="mb-1">---- ------------- ------ ----</div>
              <div className="mb-1">d---- 5/1/2023 12:34 PM Documents</div>
              <div>PS C:\Users\User&gt; _</div>
            </div>
            <div className="text-center mt-2 text-sm">
              <span className="font-semibold">Access:</span> Search for "PowerShell" or use WSL
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-center mb-2">Common Terminal Commands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <ul className="text-sm space-y-1">
                <li>
                  <code className="bg-gray-200 px-1 rounded">ls</code> - List files and directories
                </li>
                <li>
                  <code className="bg-gray-200 px-1 rounded">cd</code> - Change directory
                </li>
                <li>
                  <code className="bg-gray-200 px-1 rounded">pwd</code> - Print working directory
                </li>
              </ul>
            </div>
            <div>
              <ul className="text-sm space-y-1">
                <li>
                  <code className="bg-gray-200 px-1 rounded">mkdir</code> - Create directory
                </li>
                <li>
                  <code className="bg-gray-200 px-1 rounded">rm</code> - Remove files
                </li>
                <li>
                  <code className="bg-gray-200 px-1 rounded">cp</code> - Copy files
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  "upload-download": {
    title: "CSR Submission and Certificate Issuance",
    content: (
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold text-center mb-2">1. Submit CSR</h3>
              <div className="flex justify-center mb-2">
                <div className="bg-white p-2 rounded border border-gray-300 text-center w-24">
                  <div className="text-xs">CSR</div>
                  <div className="text-xs text-gray-500">request.csr</div>
                </div>
              </div>
              <p className="text-sm">Upload your CSR to the CA's portal</p>
            </div>

            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="font-semibold text-center mb-2">2. CA Verification</h3>
              <div className="flex justify-center mb-2">
                <div className="bg-white p-2 rounded border border-gray-300 text-center w-24">
                  <div className="text-xs">✓</div>
                  <div className="text-xs text-gray-500">Verification</div>
                </div>
              </div>
              <p className="text-sm">CA verifies your identity and domain ownership</p>
            </div>

            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="font-semibold text-center mb-2">3. Download Certificate</h3>
              <div className="flex justify-center mb-2">
                <div className="bg-white p-2 rounded border border-gray-300 text-center w-24">
                  <div className="text-xs">CERT</div>
                  <div className="text-xs text-gray-500">signed_cert.pem</div>
                </div>
              </div>
              <p className="text-sm">Download your signed certificate and intermediates</p>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 p-4 rounded-lg w-full">
            <h3 className="font-semibold text-center mb-2">4. Install on Your Server</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="bg-white p-2 rounded border border-gray-300 text-center w-24">
                <div className="text-xs">KEY</div>
                <div className="text-xs text-gray-500">private_key.pem</div>
              </div>
              <div className="bg-white p-2 rounded border border-gray-300 text-center w-24">
                <div className="text-xs">CERT</div>
                <div className="text-xs text-gray-500">signed_cert.pem</div>
              </div>
              <div className="bg-white p-2 rounded border border-gray-300 text-center w-24">
                <div className="text-xs">CHAIN</div>
                <div className="text-xs text-gray-500">intermediate.pem</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  "build-chain": {
    title: "Certificate Chain Structure",
    content: (
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-4 rounded-lg w-64 text-center mb-4">
            <div className="font-semibold">Root CA Certificate</div>
            <div className="text-sm mt-1">Self-signed by Root CA</div>
            <div className="text-xs text-gray-500 mt-1">Pre-installed in browsers</div>
          </div>

          <div className="h-8 w-0.5 bg-gray-400"></div>
          <div className="text-xs bg-gray-200 px-2 py-0.5 rounded mb-1">Signs</div>

          <div className="bg-blue-100 p-4 rounded-lg w-64 text-center mb-4">
            <div className="font-semibold">Intermediate CA Certificate</div>
            <div className="text-sm mt-1">Signed by Root CA</div>
            <div className="text-xs text-gray-500 mt-1">Included in certificate chain</div>
          </div>

          <div className="h-8 w-0.5 bg-gray-400"></div>
          <div className="text-xs bg-gray-200 px-2 py-0.5 rounded mb-1">Signs</div>

          <div className="bg-yellow-100 p-4 rounded-lg w-64 text-center">
            <div className="font-semibold">Your Server Certificate</div>
            <div className="text-sm mt-1">Signed by Intermediate CA</div>
            <div className="text-xs text-gray-500 mt-1">Installed on your server</div>
          </div>

          <div className="mt-8 bg-gray-100 p-4 rounded-lg w-full">
            <div className="font-semibold mb-2">Certificate Chain File:</div>
            <div className="bg-white p-2 rounded border border-gray-300 font-mono text-sm">
              cat signed_cert.pem intermediate.pem root.pem &gt; full_chain.pem
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Concatenates your certificate with intermediate and root certificates
            </div>
          </div>
        </div>
      </div>
    ),
  },
}
