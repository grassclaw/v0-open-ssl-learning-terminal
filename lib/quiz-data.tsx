interface Answer {
  id: string
  text: string
  correct?: boolean
}

interface Question {
  id: string
  question: string
  answers: Answer[]
  explanation: string
}

export const quizQuestions: Record<string, Question[]> = {
  "certificate-authority": [
    {
      id: "ca-role",
      question: "What is the role of a Certificate Authority?",
      answers: [
        { id: "a", text: "To issue and sign certificates", correct: true },
        { id: "b", text: "To create private keys for websites" },
        { id: "c", text: "To encrypt data on the internet" },
        { id: "d", text: "To develop encryption algorithms" },
      ],
      explanation:
        "Certificate Authorities verify the identity of certificate requestors and issue digitally signed certificates that bind a public key to a verified identity.",
    },
    {
      id: "ca-exchange",
      question: "What is exchanged with a CA during the certificate issuance process?",
      answers: [
        { id: "a", text: "Private key and public key" },
        { id: "b", text: "CSR and signed certificate", correct: true },
        { id: "c", text: "Username and password" },
        { id: "d", text: "Private key and CSR" },
      ],
      explanation:
        "You send a Certificate Signing Request (CSR) to the CA, and after verification, they return a signed certificate. Your private key is never shared with the CA.",
    },
  ],
  openssl: [
    {
      id: "openssl-purpose",
      question: "What does OpenSSL help manage?",
      answers: [
        { id: "a", text: "Web server configurations" },
        { id: "b", text: "Database connections" },
        { id: "c", text: "Cryptographic operations", correct: true },
        { id: "d", text: "Network firewalls" },
      ],
      explanation:
        "OpenSSL is a toolkit for implementing SSL/TLS protocols and general-purpose cryptographic operations, including key generation, encryption, and certificate management.",
    },
    {
      id: "openssl-usecase",
      question: "What's one use case of OpenSSL?",
      answers: [
        { id: "a", text: "Managing web server content" },
        { id: "b", text: "Generating CSRs and certificates", correct: true },
        { id: "c", text: "Creating HTML templates" },
        { id: "d", text: "Monitoring network traffic" },
      ],
      explanation:
        "One of the primary use cases for OpenSSL is generating private keys, CSRs, and certificates for secure communications.",
    },
  ],
  environment: [
    {
      id: "environment-purpose",
      question: "What are you preparing in this exercise?",
      answers: [
        { id: "a", text: "A certificate for a web server", correct: true },
        { id: "b", text: "A database encryption key" },
        { id: "c", text: "A password manager" },
        { id: "d", text: "A network monitoring tool" },
      ],
      explanation:
        "In this exercise, you're preparing a certificate for a web server by generating a private key and CSR, which will be used to obtain a certificate from a CA.",
    },
  ],
  "terminal-intro": [
    {
      id: "terminal-shortcut",
      question: "What key shortcut opens the terminal on Linux?",
      answers: [
        { id: "a", text: "Ctrl + Alt + T", correct: true },
        { id: "b", text: "Cmd + Space" },
        { id: "c", text: "Ctrl + Shift + P" },
        { id: "d", text: "Alt + Tab" },
      ],
      explanation:
        "On most Linux distributions, Ctrl + Alt + T is the standard keyboard shortcut to open a terminal window.",
    },
    {
      id: "terminal-purpose",
      question: "What is the terminal primarily used for?",
      answers: [
        { id: "a", text: "Browsing the web" },
        { id: "b", text: "Playing games" },
        { id: "c", text: "Typing and executing text-based commands", correct: true },
        { id: "d", text: "Editing images" },
      ],
      explanation:
        "The terminal is a text-based interface that allows users to interact with the computer by typing commands, which is especially useful for system administration, development, and automation tasks.",
    },
  ],
  "upload-download": [
    {
      id: "csr-purpose",
      question: "What is the purpose of submitting a CSR to a Certificate Authority?",
      answers: [
        {
          id: "a",
          text: "To request a signed certificate that proves your identity and domain ownership",
          correct: true,
        },
        { id: "b", text: "To encrypt all the data on your server" },
        { id: "c", text: "To generate a private key for your server" },
        { id: "d", text: "To configure DNS records" },
      ],
      explanation:
        "A CSR is submitted to a CA to request a signed certificate. The CA verifies your identity and domain ownership before issuing the certificate, which serves as proof of your identity to clients connecting to your server.",
    },
    {
      id: "ca-validation",
      question: "Which of the following is a type of certificate validation performed by a CA?",
      answers: [
        { id: "a", text: "Secure Socket Validation (SSV)" },
        { id: "b", text: "Domain Validation (DV)", correct: true },
        { id: "c", text: "Password Validation (PV)" },
        { id: "d", text: "Firewall Validation (FV)" },
      ],
      explanation:
        "Domain Validation (DV) is a common type of certificate validation where the CA verifies that you control the domain for which you're requesting a certificate. Other types include Organization Validation (OV) and Extended Validation (EV).",
    },
    {
      id: "ca-return",
      question: "What does the CA return after verifying your CSR?",
      answers: [
        { id: "a", text: "Public key" },
        { id: "b", text: "Private key" },
        { id: "c", text: "Signed certificate", correct: true },
        { id: "d", text: "DNS record" },
      ],
      explanation:
        "After verifying your CSR and identity, the CA returns a signed certificate that contains your public key and identity information, signed with the CA's private key. This certificate can be installed on your server to establish secure connections.",
    },
  ],
  "build-chain": [
    {
      id: "chain-purpose",
      question: "Why do we need a certificate chain?",
      answers: [
        { id: "a", text: "To increase the encryption strength" },
        { id: "b", text: "To build trust from root to leaf", correct: true },
        { id: "c", text: "To reduce the certificate file size" },
        { id: "d", text: "To speed up the encryption process" },
      ],
      explanation:
        "Certificate chains establish a path of trust from a trusted root CA to your server's certificate, allowing clients to verify the authenticity of your certificate.",
    },
    {
      id: "verify-purpose",
      question: "What does the verify command check?",
      answers: [
        { id: "a", text: "That the certificate was issued by a trusted CA and has not been altered", correct: true },
        { id: "b", text: "That the certificate uses strong encryption" },
        { id: "c", text: "That the certificate has not expired" },
        { id: "d", text: "All of the above" },
      ],
      explanation:
        "The verify command checks the digital signature on the certificate to ensure it was issued by a trusted CA and has not been tampered with. It also checks the certificate's validity period and revocation status if configured.",
    },
  ],
}
