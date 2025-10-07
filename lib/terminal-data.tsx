interface ConditionalResponse {
  requires?: string[]
  requiresNot?: string[]
  response: string
}

interface Command {
  value: string
  label: string
  response: string
  required?: boolean
  interactive?: boolean
  conditionalResponses?: ConditionalResponse[]
  setsState?: Record<string, boolean>
  completesExercise?: boolean
}

export const terminalCommands: Record<string, Command[]> = {
  "install-openssl": [
    {
      value: "brew install openssl",
      label: "Install OpenSSL using Homebrew (macOS)",
      response:
        "==> Downloading https://homebrew.bintray.com/bottles/openssl-1.1.1g.catalina.bottle.tar.gz\n==> Pouring openssl-1.1.1g.catalina.bottle.tar.gz\n==> Caveats\nA CA file has been bootstrapped using certificates from the system\nkeychain. To add additional certificates, place .pem files in\n  /usr/local/etc/openssl/certs\n\nand run\n  /usr/local/opt/openssl/bin/c_rehash\n\nOpenSSL installed successfully.",
      conditionalResponses: [
        {
          requires: ["opensslInstalled"],
          response: "OpenSSL is already installed.",
        },
      ],
      setsState: { opensslInstalled: true },
      // Removed completesExercise: true from here
    },
    {
      value: "apt-get install openssl",
      label: "Install OpenSSL using apt-get (Ubuntu/Debian)",
      response:
        "Reading package lists... Done\nBuilding dependency tree       \nReading state information... Done\nThe following packages will be upgraded:\n  openssl\n1 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.\nNeed to get 1,553 kB of archives.\nAfter this operation, 0 B of additional disk space will be used.\nGet:1 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 openssl amd64 1.1.1f-1ubuntu2.16 [1,553 kB]\nFetched 1,553 kB in 1s (1,553 kB/s)\nReading changelogs... Done\n(Reading database ... 123456 files and directories currently installed.)\nPreparing to unpack .../openssl_1.1.1f-1ubuntu2.16_amd64.deb ...\nUnpacking openssl (1.1.1f-1ubuntu2.16) ...\nSetting up openssl (1.1.1f-1ubuntu2.16) ...\nProcessing triggers for man-db (2.9.1-1) ...\n\nOpenSSL installed successfully.",
      conditionalResponses: [
        {
          requires: ["opensslInstalled"],
          response: "OpenSSL is already installed.",
        },
      ],
      setsState: { opensslInstalled: true },
      // Removed completesExercise: true from here
    },
    {
      value: "choco install openssl",
      label: "Install OpenSSL using Chocolatey (Windows)",
      response:
        "Chocolatey v0.10.15\nInstalling the following packages:\nopenssl\nBy installing you accept licenses.\n...\nopenssl v1.1.1g [Approved]\nopenssl package files install completed.\nThe install of openssl was successful.\n\nOpenSSL installed successfully.",
      conditionalResponses: [
        {
          requires: ["opensslInstalled"],
          response: "OpenSSL is already installed.",
        },
      ],
      setsState: { opensslInstalled: true },
      // Removed completesExercise: true from here
    },
    {
      value: "openssl version",
      label: "Check OpenSSL version",
      response: "OpenSSL 1.1.1g  21 Apr 2020",
      completesExercise: true, // Only this command completes the exercise
      conditionalResponses: [
        {
          requiresNot: ["opensslInstalled"],
          response: "Error: OpenSSL command not found. Please install OpenSSL first.",
        },
      ],
    },
    {
      value: "unknown",
      label: "Enter custom command",
      response: "Error: Command not recognized. Please select from the dropdown or type a supported command.",
    },
  ],
  "create-private-key": [
    {
      value: "openssl genrsa -out private_key.pem 2048",
      label: "Generate a 2048-bit RSA private key",
      response:
        "Generating RSA private key, 2048 bit long modulus\n..........................................+++\n..........................................+++\ne is 65537 (0x10001)\nPrivate key saved to private_key.pem\n\n✅ Key generation complete. Now verify it with:\nls -l private_key.pem",
      conditionalResponses: [
        {
          requires: ["keyExists"],
          response:
            "⚠️ Warning: Overwriting existing private_key.pem...\n\nGenerating RSA private key, 2048 bit long modulus\n..........................................+++\n..........................................+++\ne is 65537 (0x10001)\nPrivate key saved to private_key.pem\n\n✅ Key regeneration complete. You can verify it again with:\nls -l private_key.pem",
        },
      ],
      setsState: { keyExists: true },
      // Removed completesExercise: true from here
    },
    {
      value: "ls -l private_key.pem",
      label: "Verify the private key file exists",
      response: "-rw-r--r--  1 user  staff  1679 May  1 10:23 private_key.pem",
      conditionalResponses: [
        {
          requiresNot: ["keyExists"],
          response:
            "ls: private_key.pem: No such file or directory\n\nTip: Generate the private key first using:\nopenssl genrsa -out private_key.pem 2048",
        },
        {
          requires: ["permissionsSet"],
          response:
            "-rw-------  1 user  staff  1679 May  1 10:23 private_key.pem\n\n✅ The file permissions are now secure (600).",
        },
      ],
    },
    {
      value: "chmod 600 private_key.pem",
      label: "Set secure permissions on the private key",
      response: "✅ Permissions updated successfully. You can verify with:\nls -l private_key.pem",
      completesExercise: true, // Only this command completes the exercise
      conditionalResponses: [
        {
          requiresNot: ["keyExists"],
          response:
            "chmod: private_key.pem: No such file or directory\n\nTip: Generate the private key first using:\nopenssl genrsa -out private_key.pem 2048",
        },
      ],
      setsState: { permissionsSet: true },
    },
    {
      value: "cat private_key.pem",
      label: "View the contents of the private key",
      response:
        "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAvj0Qhc5v+vQrxnZYPnDJmUFvRp7wVDWhXWtbNtUBJILIUFnk\nA9gBwVX/5G5EBJfuKa+NwxOjQZkU6ZWp4VKXJhKKL7UZwvJXHtJvJyLnGJwJ3Omh\nXq6EOH+ZIhAYOu/LKs1VEYWhYGKPpBPCEfCYYNDYGPJ+TvXTmYQQZYQRUKPGgCg1\n...\n[Private key content truncated for security]\n...\n-----END RSA PRIVATE KEY-----\n\n⚠️ Important: In a real environment, never display your private key or share it with anyone!",
      conditionalResponses: [
        {
          requiresNot: ["keyExists"],
          response:
            "cat: private_key.pem: No such file or directory\n\nTip: Generate the private key first using:\nopenssl genrsa -out private_key.pem 2048",
        },
      ],
    },
    {
      value: "whoami",
      label: "whoami",
      response:
        "⚠️ Unknown command or unsupported in this lab.\n\nTip: Focus on the lab steps:\n1. Generate key → openssl genrsa -out private_key.pem 2048\n2. Verify key → ls -l private_key.pem\n3. Secure permissions → chmod 600 private_key.pem (optional)",
    },
  ],
  "create-csr": [
    {
      value: "openssl req -new -key private_key.pem -out request.csr",
      label: "Create a new CSR using the private key",
      response: "", // This will be filled by the interactive component
      interactive: true,
      setsState: { csrExists: true },
    },
    {
      value: "openssl req -text -noout -in request.csr",
      label: "View the contents of the CSR",
      response:
        "Certificate Request:\n    Data:\n        Version: 0 (0x0)\n        Subject: C=US, ST=California, L=San Francisco, O=Example Inc, OU=IT Department, CN=example.com/emailAddress=admin@example.com\n        Subject Public Key Info:\n            Public Key Algorithm: rsaEncryption\n                Public-Key: (2048 bit)\n                Modulus:\n                    00:b4:31:98:0a:c4:bc:62:c1:88:aa:dc:b0:c8:bb:\n                    33:35:19:d5:0c:64:b9:3d:41:b2:96:fc:f3:30:b1:\n                    ...\n                Exponent: 65537 (0x10001)\n        Attributes:\n            a0:00\n    Signature Algorithm: sha256WithRSAEncryption\n         84:a8:9a:11:a7:d8:bd:0b:26:7e:52:24:a9:a1:9a:51:23:14:\n         ...",
      completesExercise: true,
      conditionalResponses: [
        {
          requiresNot: ["csrExists"],
          response:
            "Error: Cannot open request.csr for reading, No such file or directory\n\nTip: Generate the CSR first using:\nopenssl req -new -key private_key.pem -out request.csr",
        },
      ],
    },
  ],
  "verify-key-csr": [
    {
      value: "openssl req -noout -modulus -in request.csr | openssl md5",
      label: "Extract and hash the modulus from the CSR",
      response: "(stdin)= e8a88d7e76140d33028110d1b2ff0be5",
      setsState: { csrModulusChecked: true },
    },
    {
      value: "openssl rsa -noout -modulus -in private_key.pem | openssl md5",
      label: "Extract and hash the modulus from the private key",
      response: "(stdin)= e8a88d7e76140d33028110d1b2ff0be5",
      setsState: { keyModulusChecked: true },
    },
    {
      value: "echo 'Comparing hashes...'",
      label: "Compare the hashes to verify they match",
      response:
        "Comparing hashes...\nThe hashes match! This confirms that the CSR was generated from this private key.",
      completesExercise: true,
      conditionalResponses: [
        {
          requiresNot: ["csrModulusChecked", "keyModulusChecked"],
          response:
            "Comparing hashes...\n\nTip: You need to extract the modulus hashes first using:\nopenssl req -noout -modulus -in request.csr | openssl md5\nopenssl rsa -noout -modulus -in private_key.pem | openssl md5",
        },
      ],
    },
  ],
  "build-chain": [
    {
      value: "cat signed_cert.pem intermediate.pem root.pem > full_chain.pem",
      label: "cat signed_cert.pem intermediate.pem root.pem > full_chain.pem",
      response: "Certificate chain file 'full_chain.pem' created successfully.",
      setsState: { chainFileCreated: true },
    },
    {
      value: "cat intermediate.pem signed_cert.pem root.pem > full_chain.pem",
      label: "cat intermediate.pem signed_cert.pem root.pem > full_chain.pem",
      response: "Error: Make sure to concatenate signed_cert.pem, intermediate.pem, and root.pem in that order.",
    },
    {
      value: "cat root.pem intermediate.pem signed_cert.pem > full_chain.pem",
      label: "cat root.pem intermediate.pem signed_cert.pem > full_chain.pem",
      response: "Error: Make sure to concatenate signed_cert.pem, intermediate.pem, and root.pem in that order.",
    },
    {
      value: "openssl verify -CAfile full_chain.pem signed_cert.pem",
      label: "openssl verify -CAfile full_chain.pem signed_cert.pem",
      response: "signed_cert.pem: OK",
      conditionalResponses: [
        {
          requiresNot: ["chainFileCreated"],
          response: "Error: 'full_chain.pem' not found. Please build the chain first.",
        },
      ],
      setsState: { chainVerified: true },
    },
    {
      value: "openssl x509 -in full_chain.pem -text -noout",
      label: "openssl x509 -in full_chain.pem -text -noout",
      response:
        "Certificate:\n    Data:\n        Version: 3 (0x2)\n        Serial Number:\n            04:e5:7b:d2:1f:ef:aa:3d:bb:f3:4d:21:ec:3d:8e:84\n        Signature Algorithm: sha256WithRSAEncryption\n        Issuer: C=US, O=Example CA, CN=Example Intermediate CA\n        Validity\n            Not Before: May  1 00:00:00 2023 GMT\n            Not After : Apr 30 23:59:59 2024 GMT\n        Subject: C=US, ST=California, L=San Francisco, O=Example Inc, OU=IT Department, CN=example.com\n        Subject Public Key Info:\n            Public Key Algorithm: rsaEncryption\n                Public-Key: (2048 bit)\n                Modulus:\n                    00:b4:31:98:0a:c4:bc:62:c1:88:aa:dc:b0:c8:bb:\n                    33:35:19:d5:0c:64:b9:3d:41:b2:96:fc:f3:30:b1:\n                    68:40:e3:ba:16:54:63:62:6a:8f:9b:d4:fe:34:c5:\n                    ...\n                Exponent: 65537 (0x10001)\n        X509v3 extensions:\n            X509v3 Key Usage: critical\n                Digital Signature, Key Encipherment\n            X509v3 Extended Key Usage: \n                TLS Web Server Authentication, TLS Web Client Authentication\n            X509v3 Basic Constraints: critical\n                CA:FALSE\n            X509v3 Subject Alternative Name: \n                DNS:example.com, DNS:www.example.com\n    Signature Algorithm: sha256WithRSAEncryption\n    ...",
      completesExercise: true,
      conditionalResponses: [
        {
          requiresNot: ["chainFileCreated"],
          response: "Error: 'full_chain.pem' not found. Please build the chain first.",
        },
        {
          requiresNot: ["chainVerified"],
          response:
            "Error: Please verify the certificate chain first using 'openssl verify -CAfile full_chain.pem signed_cert.pem'",
        },
      ],
      setsState: { chainInspected: true },
    },
    {
      value: "ls -l full_chain.pem",
      label: "ls -l full_chain.pem",
      response: "-rw-r--r--  1 user  staff  7890 May  1 11:45 full_chain.pem",
      conditionalResponses: [
        {
          requiresNot: ["chainFileCreated"],
          response:
            "ls: full_chain.pem: No such file or directory\n\nError: full_chain.pem not found. Please build the chain first.",
        },
      ],
    },
  ],
  "verify-chain": [
    {
      value: "openssl verify -CAfile full_chain.pem signed_cert.pem",
      label: "Verify the certificate chain",
      response: "signed_cert.pem: OK",
      setsState: { chainVerified: true },
    },
    {
      value: "openssl x509 -in signed_cert.pem -text -noout | grep 'Issuer\\|Subject'",
      label: "Check the certificate's issuer and subject",
      response:
        "        Issuer: C=US, O=Example CA, CN=Example Intermediate CA\n        Subject: C=US, ST=California, L=San Francisco, O=Example Inc, OU=IT Department, CN=example.com",
      setsState: { certDetailsChecked: true },
      completesExercise: true,
      conditionalResponses: [
        {
          requiresNot: ["chainVerified"],
          response:
            "It's recommended to verify the certificate chain first using 'openssl verify -CAfile full_chain.pem signed_cert.pem' before examining the details.",
        },
      ],
    },
  ],
}
