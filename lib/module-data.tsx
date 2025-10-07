import type React from "react"
import { CheckCircle } from "lucide-react"
import PolicyNote from "@/components/policy-note"

export interface Module {
  id: string
  moduleNumber: number
  title: string
  content: React.ReactNode
  hasQuiz: boolean
  hasTerminal: boolean
  hasDiagram: boolean
}

export const modules: Module[] = [
  {
    id: "welcome",
    moduleNumber: 1,
    title: "Welcome / Overview",
    content: (
      <div className="space-y-4">
        <p>
          Welcome to the Certificate Signing Request (CSR) Learning Module. In today's digital landscape, secure
          communication is essential for protecting sensitive information and establishing trust online.
        </p>
        <p>
          <strong>Why Certificates Matter in Cybersecurity:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Identity Verification:</strong> Digital certificates verify that websites and services are who they
            claim to be, preventing impersonation attacks.
          </li>
          <li>
            <strong>Data Encryption:</strong> Certificates enable encrypted connections (HTTPS), ensuring that data
            transmitted between clients and servers remains private.
          </li>
          <li>
            <strong>Data Integrity:</strong> Certificates help ensure that data hasn't been tampered with during
            transmission.
          </li>
          <li>
            <strong>Trust Establishment:</strong> The certificate system creates a chain of trust from trusted
            Certificate Authorities to individual websites and services.
          </li>
        </ul>
        <p>
          In this module, you'll learn about Certificate Signing Request (CSRs), a critical component in the certificate
          issuance process. You'll understand what CSRs are, how they're created using OpenSSL, and how they fit into
          the broader certificate ecosystem.
        </p>
        <p>
          By the end of this module, you'll be able to generate CSRs, understand their contents, and know how to use
          them to obtain trusted certificates for secure communications.
        </p>
      </div>
    ),
    hasQuiz: false,
    hasTerminal: false,
    hasDiagram: false,
  },
  {
    id: "certificate-authority",
    moduleNumber: 2,
    title: "What is a Certificate Authority (CA)?",
    content: (
      <div className="space-y-4">
        <p>
          A <strong>Certificate Authority (CA)</strong> is a trusted third party that issues digital certificates. These
          certificates bind a public key to an entity (like a website, organization, or individual) after verifying the
          entity's identity.
        </p>
        <p>
          <strong>The Role of a CA:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Identity Verification:</strong> CAs verify that the entity requesting a certificate legitimately
            owns or controls the domain or organization it claims.
          </li>
          <li>
            <strong>Certificate Issuance:</strong> After verification, the CA issues a digitally signed certificate that
            contains the entity's public key and identity information.
          </li>
          <li>
            <strong>Revocation Management:</strong> CAs maintain Certificate Revocation Lists (CRLs) and Online
            Certificate Status Protocol (OCSP) services to indicate when certificates should no longer be trusted.
          </li>
          <li>
            <strong>Trust Anchor:</strong> Web browsers and operating systems come pre-installed with a list of trusted
            root CA certificates, establishing a foundation of trust.
          </li>
        </ul>
        <p>
          <strong>The Certificate Issuance Process:</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>
            An entity generates a private key and a corresponding Certificate Signing Request (CSR) containing their
            public key and identity information.
          </li>
          <li>The entity submits the CSR to a CA.</li>
          <li>
            The CA verifies the entity's identity through various validation methods (domain validation, organization
            validation, or extended validation).
          </li>
          <li>
            Upon successful verification, the CA signs the certificate with its private key and returns the signed
            certificate to the entity.
          </li>
          <li>
            The entity installs the certificate on their server, often alongside intermediate certificates that form a
            chain of trust to a trusted root CA.
          </li>
        </ol>
        <p>
          This process is similar to how a passport office (the CA) verifies your identity before issuing an official
          passport (the certificate) that others can trust as proof of your identity.
        </p>
      </div>
    ),
    hasQuiz: true,
    hasTerminal: false,
    hasDiagram: true,
  },
  {
    id: "openssl",
    moduleNumber: 3,
    title: "What is OpenSSL and Why Is It Important?",
    content: (
      <div className="space-y-4">
        <p>
          <strong>OpenSSL</strong> is a robust, open-source toolkit that implements the Secure Sockets Layer (SSL) and
          Transport Layer Security (TLS) protocols, along with a general-purpose cryptography library.
        </p>
        <p>
          <strong>Key Features of OpenSSL:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Cryptographic Functions:</strong> Provides implementations of cryptographic algorithms for
            encryption, decryption, hashing, and digital signatures.
          </li>
          <li>
            <strong>SSL/TLS Implementation:</strong> Enables secure communication over computer networks.
          </li>
          <li>
            <strong>Key and Certificate Management:</strong> Tools for generating, managing, and converting
            cryptographic keys and certificates.
          </li>
          <li>
            <strong>CSR Creation:</strong> Functionality to create Certificate Signing Requests for obtaining
            certificates from CAs.
          </li>
        </ul>
        <p>
          <strong>Why OpenSSL is Important:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Widespread Adoption:</strong> OpenSSL is used by approximately two-thirds of all web servers and is
            a critical component of the internet's security infrastructure.
          </li>
          <li>
            <strong>Cross-Platform:</strong> Available on virtually all operating systems, making it a universal tool
            for cryptographic operations.
          </li>
          <li>
            <strong>Comprehensive Toolset:</strong> Provides a complete suite of tools for managing the entire
            certificate lifecycle.
          </li>
          <li>
            <strong>Command-Line Interface:</strong> Offers powerful command-line tools that can be used in scripts and
            automated processes.
          </li>
          <li>
            <strong>Open Source:</strong> Being open source means it's continuously reviewed, improved, and maintained
            by a global community of security experts.
          </li>
        </ul>
        <p>
          <strong>Common Use Cases:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Generating private keys and CSRs for SSL/TLS certificates</li>
          <li>Creating self-signed certificates for development and testing</li>
          <li>Converting certificates between different formats (PEM, DER, PKCS#12)</li>
          <li>Verifying certificates and certificate chains</li>
          <li>Testing SSL/TLS connections and configurations</li>
          <li>Encrypting and decrypting files</li>
          <li>Creating and verifying digital signatures</li>
        </ul>
        <p>
          In this module, we'll focus on using OpenSSL to generate private keys and CSRs, which are essential steps in
          obtaining SSL/TLS certificates for secure communications.
        </p>
      </div>
    ),
    hasQuiz: true,
    hasTerminal: false,
    hasDiagram: false,
  },
  {
    id: "environment",
    moduleNumber: 4,
    title: "Dummy Environment Overview",
    content: (
      <div className="space-y-4">
        <p>
          Before we dive into the hands-on portion of this module, let's understand the practice environment we'll be
          working with. In a real-world scenario, you would be generating a CSR for a specific domain or service that
          you control. For this learning module, we'll use a simulated environment.
        </p>
        <p>
          <strong>Our Scenario:</strong>
        </p>
        <p>
          You're preparing to secure a web server for the domain <code>example.com</code>. You need to:
        </p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Generate a private key that will remain on your server</li>
          <li>Create a CSR to send to a Certificate Authority</li>
          <li>Verify that your private key and CSR match</li>
          <li>Understand how to work with the certificate once it's returned from the CA</li>
          <li>Build and verify a certificate chain</li>
        </ol>
        <p>
          <strong>What You'll Learn:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>How to use OpenSSL commands to generate cryptographic materials</li>
          <li>The relationship between private keys, CSRs, and certificates</li>
          <li>How to verify the integrity of your cryptographic materials</li>
          <li>How certificate chains work and why they're important</li>
        </ul>
        <p>
          <strong>Important Notes:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            In a real environment, you would keep your private key secure and never share it with anyone, including the
            CA
          </li>
          <li>
            The commands we'll use are the same ones you would use in a production environment, but we're using example
            values
          </li>
          <li>
            For simplicity, we'll use minimal information in our CSR, but in a real scenario, you would include more
            detailed organization information
          </li>
        </ul>
        <p>
          In the next sections, we'll walk through the process step by step, using the terminal to execute OpenSSL
          commands and understand their output.
        </p>
      </div>
    ),
    hasQuiz: true,
    hasTerminal: false,
    hasDiagram: false,
  },
  {
    id: "terminal-intro",
    moduleNumber: 5,
    title: "Intro to Terminal",
    content: (
      <div className="space-y-4">
        <p>Before we begin using OpenSSL, let's get familiar with the terminal.</p>
        <p>
          The terminal is a text-based interface where you type commands to interact with the operating system. It's a
          powerful tool that gives you direct access to your computer's functions and is essential for many
          cybersecurity and system administration tasks.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-medium">How to open the terminal:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Linux:</strong> Press Ctrl + Alt + T or search for "Terminal" in your applications menu
            </li>
            <li>
              <strong>macOS:</strong> Open Spotlight (Cmd + Space), type 'Terminal', and hit Enter
            </li>
            <li>
              <strong>Windows:</strong> Use Windows Subsystem for Linux (WSL), PowerShell, or Git Bash
            </li>
          </ul>
        </div>
        <p>
          <strong>Why the terminal matters:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Efficiency:</strong> Many tasks can be performed faster through the command line than through
            graphical interfaces
          </li>
          <li>
            <strong>Automation:</strong> Commands can be scripted to automate repetitive tasks
          </li>
          <li>
            <strong>Remote Access:</strong> You can manage remote servers without needing a graphical interface
          </li>
          <li>
            <strong>Precision:</strong> Commands give you precise control over system operations
          </li>
        </ul>
        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
          <p>
            <strong>Don't worry</strong> — for this course, we'll use a safe simulated terminal where you can practice
            without affecting your actual system. The commands you'll learn are real and transferable to your own
            environment when you're ready.
          </p>
        </div>
        <p>In the next module, we'll start using the terminal to install and work with OpenSSL.</p>
      </div>
    ),
    hasQuiz: true,
    hasTerminal: false,
    hasDiagram: true,
  },
  {
    id: "install-openssl",
    moduleNumber: 6,
    title: "Hands-On Lab: Install OpenSSL",
    content: (
      <div className="space-y-4">
        <p>
          The first step in our hands-on lab is to ensure that OpenSSL is installed on your system. OpenSSL is available
          for all major operating systems.
        </p>

        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
          <p className="font-bold">💡 Installation Options</p>
          <p className="mt-2">In this simulation, you can install OpenSSL using any of these package managers:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              <code>brew install openssl</code> (for macOS)
            </li>
            <li>
              <code>apt-get install openssl</code> (for Ubuntu/Debian Linux)
            </li>
            <li>
              <code>choco install openssl</code> (for Windows with Chocolatey)
            </li>
          </ul>
          <p className="mt-2">
            Choose the one that matches your operating system, or experiment with different ones to see how they work.
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500">
          <p className="font-bold">⚠️ Testing Before Installation</p>
          <p className="mt-2">
            If you try to run <code>openssl version</code> before installing OpenSSL, you'll get an error message. This
            simulates what would happen on a system where OpenSSL isn't yet installed.
          </p>
        </div>

        <p>
          <strong>Try it yourself:</strong> Select a command from the dropdown in the terminal below to install OpenSSL.
          After installation, verify it's working by checking the version.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-medium">Installation Steps:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Install OpenSSL using one of the package managers</li>
            <li>
              Verify the installation by running <code>openssl version</code>
            </li>
            <li>Notice that if you try to install again, you'll be told it's already installed</li>
          </ol>
          <p className="mt-2 text-green-600 font-medium">
            <CheckCircle className="inline h-4 w-4 mr-1" />
            To complete this exercise: Install OpenSSL and verify the version
          </p>
        </div>

        <p>
          After successful installation, you should see OpenSSL version 1.1.1g, which is what we'll be using throughout
          this module.
        </p>
      </div>
    ),
    hasQuiz: false,
    hasTerminal: true,
    hasDiagram: false,
  },
  {
    id: "create-private-key",
    moduleNumber: 7,
    title: "Hands-On Lab: Create Private Key",
    content: (
      <div className="space-y-4">
        <p>
          Now that OpenSSL is installed, we will generate a private key — the foundation of your server's security. This
          key will later be used to:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Create your Certificate Signing Request (CSR)</li>
          <li>Establish secure connections with clients</li>
          <li>Decrypt information that was encrypted with your public key</li>
        </ul>

        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
          <p className="font-bold">💥 Step 1: Generate the Private Key</p>
          <p>Run:</p>
          <pre className="bg-gray-800 text-green-400 p-2 rounded mt-2 overflow-x-auto">
            openssl genrsa -out private_key.pem 2048
          </pre>
          <p className="mt-2">This command:</p>
          <ul className="list-disc pl-6">
            <li>Creates a 2048-bit RSA private key</li>
            <li>Saves it to the file private_key.pem</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
          <p className="font-bold">💥 Step 2: Verify the File Was Created</p>
          <p>Run:</p>
          <pre className="bg-gray-800 text-green-400 p-2 rounded mt-2 overflow-x-auto">ls -l private_key.pem</pre>
          <p className="mt-2">You should see a line showing private_key.pem with a size of ~1679 bytes.</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500">
          <p className="font-bold">🔒 Important Security Note</p>
          <p>In a production environment:</p>
          <ul className="list-disc pl-6">
            <li>Keep your private key secure and confidential</li>
            <li>
              Set permissions to 600:
              <pre className="bg-gray-800 text-green-400 p-2 rounded mt-2 overflow-x-auto">
                chmod 600 private_key.pem
              </pre>
            </li>
            <li>Never share your private key with anyone</li>
            <li>Consider using a hardware security module (HSM) for key storage in high-security environments</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-medium">✅ Terminal Behavior:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              If you run <code>ls -l</code> before generating the key, you'll see an error message
            </li>
            <li>If you try to generate the key again, it will overwrite the existing file</li>
            <li>The terminal will provide helpful tips if you skip steps or run commands out of order</li>
          </ul>
          <p className="mt-2 text-green-600 font-medium">
            <CheckCircle className="inline h-4 w-4 mr-1" />
            To complete this exercise: Generate a private key, verify it exists, and set secure permissions
          </p>
        </div>
      </div>
    ),
    hasQuiz: false,
    hasTerminal: true,
    hasDiagram: false,
  },
  {
    id: "create-csr",
    moduleNumber: 8,
    title: "Hands-On Lab: Create CSR",
    content: (
      <div className="space-y-4">
        <p>
          With our private key generated, we can now create a Certificate Signing Request (CSR). The CSR contains your
          public key (derived from your private key) and information about your identity.
        </p>
        <p>
          When you submit this CSR to a Certificate Authority (CA), they will verify your identity and issue a signed
          certificate that binds your public key to your verified identity.
        </p>
        <p>
          <strong>Information included in a CSR:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Common Name (CN):</strong> The fully qualified domain name (e.g., example.com)
          </li>
          <li>
            <strong>Organization (O):</strong> Your company or entity name
          </li>
          <li>
            <strong>Organizational Unit (OU):</strong> Department or division
          </li>
          <li>
            <strong>Country (C):</strong> Two-letter country code
          </li>
          <li>
            <strong>State/Province (ST):</strong> Full name of state or province
          </li>
          <li>
            <strong>Locality (L):</strong> City
          </li>
          <li>
            <strong>Email Address:</strong> Contact email
          </li>
        </ul>
        <p>
          <strong>Try it yourself:</strong> Use the terminal below to create a CSR using your private key. The CSR will
          be saved to a file named <code>request.csr</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-medium">Understanding the command:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <code>openssl</code>: The base command
            </li>
            <li>
              <code>req</code>: The subcommand for certificate requests
            </li>
            <li>
              <code>-new</code>: Indicates we're creating a new CSR
            </li>
            <li>
              <code>-key private_key.pem</code>: Specifies the private key to use
            </li>
            <li>
              <code>-out request.csr</code>: Specifies the output file for the CSR
            </li>
          </ul>
          <p className="mt-2 text-green-600 font-medium">
            <CheckCircle className="inline h-4 w-4 mr-1" />
            To complete this exercise: Generate a CSR and view its contents
          </p>
        </div>
        <p>
          When running this command, you will be prompted to enter the identity information mentioned above. Fill in the
          fields with appropriate values for your certificate.
        </p>

        <PolicyNote />
      </div>
    ),
    hasQuiz: false,
    hasTerminal: true,
    hasDiagram: false,
  },
  {
    id: "verify-key-csr",
    moduleNumber: 9,
    title: "Verify Key + CSR Match",
    content: (
      <div className="space-y-4">
        <p>
          Before submitting your CSR to a CA, it's a good practice to verify that your private key and CSR match. This
          ensures that the CSR was generated using your private key and that you'll be able to use the resulting
          certificate with your private key.
        </p>
        <p>
          The verification process works by comparing the modulus of the public key in the CSR with the modulus of your
          private key. If they match, it confirms they are a cryptographic pair.
        </p>
        <p>
          <strong>Try it yourself:</strong> Use the terminal below to verify that your private key and CSR match by
          comparing their modulus values.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-medium">Understanding the commands:</p>
          <p>We'll run two commands and compare their output:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Extract and hash the modulus from the CSR</li>
            <li>Extract and hash the modulus from the private key</li>
          </ol>
          <p>If the resulting MD5 hashes match, the private key and CSR are correctly paired.</p>
          <p className="mt-2 text-green-600 font-medium">
            <CheckCircle className="inline h-4 w-4 mr-1" />
            To complete this exercise: Extract and compare the modulus hashes from both the CSR and private key
          </p>
        </div>
      </div>
    ),
    hasQuiz: false,
    hasTerminal: true,
    hasDiagram: false,
  },
  {
    id: "upload-download",
    moduleNumber: 10,
    title: "Simulate Upload to CA / Download Certificate",
    content: (
      <div className="space-y-4">
        <p>
          Now that we've created and verified our CSR, the next step in a real-world scenario would be to submit it to a
          Certificate Authority (CA) for verification and certificate issuance.
        </p>
        <p>This process typically involves:</p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Logging into your CA's portal or management interface</li>
          <li>
            Selecting the type of certificate you need (e.g., Domain Validation, Organization Validation, Extended
            Validation)
          </li>
          <li>Uploading your CSR file or pasting its contents</li>
          <li>Completing the verification process required by the CA</li>
          <li>Receiving your signed certificate once verification is complete</li>
        </ol>
        <p>
          <strong>Verification Methods:</strong> Depending on the certificate type, the CA might verify your identity
          through:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Domain Validation (DV):</strong> Proving you control the domain (via email, DNS record, or file
            upload)
          </li>
          <li>
            <strong>Organization Validation (OV):</strong> Verifying your organization's existence and domain ownership
          </li>
          <li>
            <strong>Extended Validation (EV):</strong> Rigorous verification of your legal entity and domain ownership
          </li>
        </ul>
        <p>
          <strong>For this simulation:</strong> We'll visualize the process of submitting a CSR to a CA and receiving a
          signed certificate.
        </p>
      </div>
    ),
    hasQuiz: true,
    hasTerminal: false,
    hasDiagram: true,
  },
  {
    id: "build-chain",
    moduleNumber: 11,
    title: "Hands-On Lab: Build Certificate Chain",
    content: (
      <div className="space-y-4">
        <p>
          After receiving your signed certificate from a CA, you'll typically need to set up a certificate chain on your
          server. A certificate chain (also called a certification path) establishes trust from your certificate up to a
          trusted root certificate.
        </p>

        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
          <p className="font-bold">💡 Certificate Chain Components</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              <strong>Leaf Certificate (signed_cert.pem):</strong> Your server's certificate, signed by an intermediate
              CA
            </li>
            <li>
              <strong>Intermediate Certificate (intermediate.pem):</strong> Certificate that bridges the trust between
              your certificate and the root certificate
            </li>
            <li>
              <strong>Root Certificate (root.pem):</strong> Self-signed certificate of a trusted root CA, pre-installed
              in browsers and operating systems
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500">
          <p className="font-bold">⚠️ Important: File Order Matters</p>
          <p className="mt-2">
            When building a certificate chain, the order of concatenation is important. The correct order is:
          </p>
          <ol className="list-decimal pl-6 mt-2">
            <li>Your server certificate (signed_cert.pem)</li>
            <li>Intermediate certificate(s) (intermediate.pem)</li>
            <li>Root certificate (root.pem)</li>
          </ol>
          <p className="mt-2">
            This order allows clients to follow the chain of trust from your certificate up to a trusted root.
          </p>
        </div>

        <p>
          <strong>Try it yourself:</strong> Use the terminal below to build, verify, and inspect a certificate chain.
        </p>

        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-medium">Terminal Exercise: Building and Verifying a Certificate Chain</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Step 1: Build the chain</strong>
              <pre className="bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto">
                cat signed_cert.pem intermediate.pem root.pem &gt; full_chain.pem
              </pre>
              <p className="text-sm text-gray-600">
                This concatenates the files in the correct order to create a chain file.
              </p>
            </li>
            <li>
              <strong>Step 2: Verify the chain</strong>
              <pre className="bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto">
                openssl verify -CAfile full_chain.pem signed_cert.pem
              </pre>
              <p className="text-sm text-gray-600">This checks that the certificate chain is valid and trusted.</p>
            </li>
            <li>
              <strong>Step 3: Inspect the chain</strong>
              <pre className="bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto">
                openssl x509 -in full_chain.pem -text -noout
              </pre>
              <p className="text-sm text-gray-600">This displays the details of the certificate in the chain file.</p>
            </li>
          </ol>
          <p className="mt-4 text-green-600 font-medium">
            <CheckCircle className="inline h-4 w-4 mr-1" />
            To complete this exercise: Build the certificate chain, verify it, and inspect its contents
          </p>
        </div>
      </div>
    ),
    hasQuiz: true,
    hasTerminal: true,
    hasDiagram: true,
  },
  {
    id: "verify-chain",
    moduleNumber: 12,
    title: "Verify Full Chain",
    content: (
      <div className="space-y-4">
        <p>
          After building your certificate chain, it's important to verify that the chain is valid and complete. This
          helps ensure that clients will be able to establish trust with your server without encountering certificate
          errors.
        </p>
        <p>
          <strong>What Verification Checks:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Each certificate in the chain is properly signed by the issuer of the next certificate</li>
          <li>None of the certificates have expired</li>
          <li>None of the certificates have been revoked (if CRL checking is enabled)</li>
          <li>The chain leads to a trusted root certificate</li>
        </ul>
        <p>
          <strong>Try it yourself:</strong> Use the terminal below to verify a certificate chain and inspect its
          details.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-medium">Understanding the commands:</p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Verify the certificate chain:</strong>
              <pre className="bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto">
                openssl verify -CAfile full_chain.pem signed_cert.pem
              </pre>
              <p>
                This command checks the full certificate chain to ensure it is valid and trusted. It verifies that each
                certificate in the chain is properly signed by its issuer and that the chain leads to a trusted root.
              </p>
            </li>
            <li>
              <strong>Inspect certificate details:</strong>
              <pre className="bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto">
                openssl x509 -in signed_cert.pem -text -noout | grep 'Issuer\\|Subject'
              </pre>
              <p>This command displays the issuer and subject fields from the certificate, helping you see:</p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Issuer:</strong> Who issued the certificate (typically the CA)
                </li>
                <li>
                  <strong>Subject:</strong> Who the certificate was issued to (your domain/organization)
                </li>
              </ul>
            </li>
          </ol>
          <p className="mt-4 text-green-600 font-medium">
            <CheckCircle className="inline h-4 w-4 mr-1" />
            To complete this exercise: Run both commands to verify the chain validity and inspect the certificate's
            trust relationships
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500 mt-4">
          <p className="font-medium">📝 Why Both Commands Matter:</p>
          <p className="mt-1">These two commands together give you a complete view of your certificate:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              The <code>verify</code> command confirms the chain is technically valid and trusted
            </li>
            <li>
              The <code>x509</code> command with <code>grep</code> shows you the actual trust relationships
            </li>
          </ul>
          <p className="mt-2">
            In real-world scenarios, verifying the chain is usually enough for automated systems, but inspecting the
            certificate fields gives you a deeper understanding of the certificate's structure and trust relationships,
            which is valuable for troubleshooting and security audits.
          </p>
        </div>
      </div>
    ),
    hasQuiz: false,
    hasTerminal: true,
    hasDiagram: false,
  },
  {
    id: "crls",
    moduleNumber: 13,
    title: "Certificate Revocation Lists (CRLs)",
    content: (
      <div className="space-y-4">
        <p>
          Certificate Revocation Lists (CRLs) are an important part of the PKI ecosystem. They provide a mechanism for
          CAs to publish lists of certificates that should no longer be trusted, even if they haven't expired.
        </p>
        <p>
          <strong>Reasons for Certificate Revocation:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Private key compromise</li>
          <li>CA compromise</li>
          <li>Change of affiliation (the certificate holder is no longer associated with the organization)</li>
          <li>Certificate superseded (replaced by a newer certificate)</li>
          <li>Cessation of operation (the service is no longer active)</li>
        </ul>
        <p>
          <strong>How CRLs Work:</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>CAs periodically publish updated CRLs</li>
          <li>CRLs contain the serial numbers of revoked certificates and revocation dates</li>
          <li>Clients can download and check CRLs to verify if a certificate has been revoked</li>
        </ol>
        <p>
          <strong>Limitations of CRLs:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>CRLs can become large and unwieldy</li>
          <li>
            They're only updated periodically, creating a window where revoked certificates might still be trusted
          </li>
          <li>Clients need to download the entire CRL, even to check a single certificate</li>
        </ul>
        <p>
          <strong>Alternative: Online Certificate Status Protocol (OCSP)</strong>
        </p>
        <p>
          OCSP addresses some limitations of CRLs by allowing clients to check the status of individual certificates in
          real-time, rather than downloading entire revocation lists.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-medium">Example of checking a CRL:</p>
          <pre className="text-sm overflow-x-auto">
            curl -O http://crl.example.com/root.crl openssl crl -inform DER -in root.crl -noout -text
          </pre>
          <p className="mt-2">This downloads a CRL and displays its contents in a human-readable format.</p>
        </div>
      </div>
    ),
    hasQuiz: false,
    hasTerminal: false,
    hasDiagram: false,
  },
  {
    id: "summary",
    moduleNumber: 14,
    title: "Final Summary and Resources",
    content: (
      <div className="space-y-4">
        <p>
          <strong>Congratulations!</strong> You've completed the Certificate Signing Request (CSR) Learning Module.
          Let's recap what you've learned:
        </p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>The importance of certificates in establishing secure communications</li>
          <li>The role of Certificate Authorities in verifying identity and issuing certificates</li>
          <li>How OpenSSL is used to generate private keys and CSRs</li>
          <li>The process of submitting a CSR to a CA and receiving a signed certificate</li>
          <li>How to verify that your private key and CSR match</li>
          <li>The importance of certificate chains and how to build them</li>
          <li>How to verify certificate chains</li>
          <li>The role of Certificate Revocation Lists in maintaining trust</li>
        </ol>
        <p>
          <strong>Key Takeaways:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Always keep your private key secure and never share it with anyone</li>
          <li>Ensure your CSR contains accurate information about your organization and domain</li>
          <li>Verify that your private key and CSR match before submitting to a CA</li>
          <li>Include the complete certificate chain when configuring your web server</li>
          <li>Regularly check for certificate expiration and plan for renewal</li>
        </ul>
        <p>
          <strong>Additional Resources:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <a
              href="https://www.openssl.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              OpenSSL Official Website
            </a>
            : Documentation, downloads, and community resources
          </li>
          <li>
            <a
              href="https://letsencrypt.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Let's Encrypt
            </a>
            : Free, automated, and open Certificate Authority
          </li>
          <li>
            <a
              href="https://ccadb.org/cas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Mozilla CA List
            </a>
            : List of trusted Certificate Authorities
          </li>
          <li>
            <a
              href="https://www.ssllabs.com/ssltest/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              SSL Labs Server Test
            </a>
            : Test your server's SSL/TLS configuration
          </li>
        </ul>
        <p>
          We hope this module has provided you with a solid understanding of CSRs and their role in the certificate
          issuance process. As you continue your cybersecurity journey, remember that proper certificate management is a
          critical component of maintaining secure systems and communications.
        </p>
      </div>
    ),
    hasQuiz: false,
    hasTerminal: false,
    hasDiagram: false,
  },
]
