interface TerminalStep {
  id: string
  title: string
  introduction: string
  commands: Command[]
  helpText?: string
}

interface Command {
  value: string
  label: string
  response: string
  required?: boolean
  interactive?: boolean
  conditionalResponses?: ConditionalResponse[]
  setsState?: Record<string, boolean>
  completesStep?: boolean
}

interface ConditionalResponse {
  requires?: string[]
  requiresNot?: string[]
  response: string
}

export const terminalModules: Record<string, TerminalStep> = {
  "install-openssl": {
    id: "install-openssl",
    title: "Step 1: Install OpenSSL",
    introduction: `
╔════════════════════════════════════════════════════════════════╗
║                  OPENSSL INSTALLATION LAB                      ║
╚════════════════════════════════════════════════════════════════╝

Welcome to your first hands-on exercise!

OpenSSL is a powerful toolkit for working with SSL/TLS and 
cryptography. Before we can generate keys and certificates, 
we need to install it.

📚 WHAT YOU'LL LEARN:
   • How to install OpenSSL on different operating systems
   • How to verify your installation
   • Basic package manager commands

💡 TIP: Type 'help' at any time for guidance

🎯 YOUR TASK:
   1. Install OpenSSL using a package manager
   2. Verify the installation by checking the version

Select a command from the dropdown below to begin...
`,
    helpText: `
📖 HELP - Installing OpenSSL

AVAILABLE COMMANDS:
  • brew install openssl       (macOS with Homebrew)
  • apt-get install openssl    (Ubuntu/Debian Linux)
  • choco install openssl      (Windows with Chocolatey)
  • openssl version            (Check if OpenSSL is installed)

RECOMMENDED STEPS:
  1. Choose the install command for your OS
  2. Run 'openssl version' to verify installation

⚠️  NOTE: If you run 'openssl version' before installing,
    you'll see an error - this is expected!

Type 'help' again anytime you need this information.
`,
    commands: [
      {
        value: "help",
        label: "help - Show available commands",
        response: `
📖 HELP - Installing OpenSSL

AVAILABLE COMMANDS:
  • brew install openssl       (macOS with Homebrew)
  • apt-get install openssl    (Ubuntu/Debian Linux)
  • choco install openssl      (Windows with Chocolatey)
  • openssl version            (Check if OpenSSL is installed)

RECOMMENDED STEPS:
  1. Choose the install command for your OS
  2. Run 'openssl version' to verify installation

⚠️  NOTE: If you run 'openssl version' before installing,
    you'll see an error - this is expected!
`,
      },
      {
        value: "brew install openssl",
        label: "brew install openssl (macOS)",
        response: `
==> Downloading https://homebrew.bintray.com/bottles/openssl-1.1.1g.catalina.bottle.tar.gz
==> Pouring openssl-1.1.1g.catalina.bottle.tar.gz
==> Caveats
A CA file has been bootstrapped using certificates from the system
keychain. To add additional certificates, place .pem files in
  /usr/local/etc/openssl/certs

✅ OpenSSL installed successfully!

💡 NEXT STEP: Verify installation with 'openssl version'
`,
        conditionalResponses: [
          {
            requires: ["opensslInstalled"],
            response: "⚠️  OpenSSL is already installed.\n\n💡 TIP: Run 'openssl version' to check your version.",
          },
        ],
        setsState: { opensslInstalled: true },
      },
      {
        value: "apt-get install openssl",
        label: "apt-get install openssl (Ubuntu/Debian)",
        response: `
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages will be upgraded:
  openssl
1 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
Fetched 1,553 kB in 1s (1,553 kB/s)
Setting up openssl (1.1.1f-1ubuntu2.16) ...

✅ OpenSSL installed successfully!

💡 NEXT STEP: Verify installation with 'openssl version'
`,
        conditionalResponses: [
          {
            requires: ["opensslInstalled"],
            response: "⚠️  OpenSSL is already installed.\n\n💡 TIP: Run 'openssl version' to check your version.",
          },
        ],
        setsState: { opensslInstalled: true },
      },
      {
        value: "choco install openssl",
        label: "choco install openssl (Windows)",
        response: `
Chocolatey v0.10.15
Installing the following packages:
openssl
By installing you accept licenses.
...
openssl v1.1.1g [Approved]
openssl package files install completed.

✅ OpenSSL installed successfully!

💡 NEXT STEP: Verify installation with 'openssl version'
`,
        conditionalResponses: [
          {
            requires: ["opensslInstalled"],
            response: "⚠️  OpenSSL is already installed.\n\n💡 TIP: Run 'openssl version' to check your version.",
          },
        ],
        setsState: { opensslInstalled: true },
      },
      {
        value: "openssl version",
        label: "openssl version",
        response: `
OpenSSL 1.1.1g  21 Apr 2020

✅ Perfect! OpenSSL is installed and ready to use.

🎉 STEP COMPLETE! 

📚 WHAT YOU LEARNED:
   • How to install OpenSSL using package managers
   • How to verify your installation
   • OpenSSL version 1.1.1g is what we'll use in this course

Ready to move to the next step? Click "Next" below the terminal.
`,
        completesStep: true,
        conditionalResponses: [
          {
            requiresNot: ["opensslInstalled"],
            response: `
❌ Error: OpenSSL command not found. Please install OpenSSL first.

💡 TIP: Use one of these commands to install:
   • brew install openssl       (macOS)
   • apt-get install openssl    (Ubuntu/Debian)
   • choco install openssl      (Windows)

Type 'help' for more information.
`,
          },
        ],
      },
    ],
  },

  "create-private-key": {
    id: "create-private-key",
    title: "Step 2: Generate a Private Key",
    introduction: `
╔════════════════════════════════════════════════════════════════╗
║              PRIVATE KEY GENERATION LAB                        ║
╚════════════════════════════════════════════════════════════════╝

Now we'll create the foundation of your server's security: 
a private key.

📚 WHAT IS A PRIVATE KEY?
   A private key is a secret cryptographic key that:
   • Proves your identity
   • Decrypts data encrypted with your public key
   • Creates digital signatures
   • MUST be kept secret and secure

🔐 SECURITY NOTE:
   In production, NEVER share your private key with anyone,
   including the Certificate Authority!

💡 TIP: Type 'help' for guidance

🎯 YOUR TASK:
   1. Generate a 2048-bit RSA private key
   2. Verify the file was created
   3. Set secure permissions (chmod 600)

Select a command from the dropdown below...
`,
    helpText: `
📖 HELP - Generating Private Keys

AVAILABLE COMMANDS:
  • openssl genrsa -out private_key.pem 2048
    → Generates a 2048-bit RSA private key
  
  • ls -l private_key.pem
    → Verifies the key file exists
  
  • chmod 600 private_key.pem
    → Sets secure permissions (owner read/write only)
  
  • cat private_key.pem
    → Views the key contents (for educational purposes)

RECOMMENDED STEPS:
  1. Generate the key with 'openssl genrsa'
  2. Verify it exists with 'ls -l'
  3. Secure it with 'chmod 600'

🔐 SECURITY: In production, always set permissions to 600!
`,
    commands: [
      {
        value: "help",
        label: "help - Show available commands",
        response: `
📖 HELP - Generating Private Keys

AVAILABLE COMMANDS:
  • openssl genrsa -out private_key.pem 2048
    → Generates a 2048-bit RSA private key
  
  • ls -l private_key.pem
    → Verifies the key file exists
  
  • chmod 600 private_key.pem
    → Sets secure permissions (owner read/write only)
  
  • cat private_key.pem
    → Views the key contents (for educational purposes)

RECOMMENDED STEPS:
  1. Generate the key with 'openssl genrsa'
  2. Verify it exists with 'ls -l'
  3. Secure it with 'chmod 600'

🔐 SECURITY: In production, always set permissions to 600!
`,
      },
      {
        value: "openssl genrsa -out private_key.pem 2048",
        label: "openssl genrsa -out private_key.pem 2048",
        response: `
Generating RSA private key, 2048 bit long modulus
..........................................+++
..........................................+++
e is 65537 (0x10001)

✅ Private key saved to private_key.pem

📚 WHAT JUST HAPPENED:
   • Created a 2048-bit RSA key pair
   • The private key is saved in PEM format
   • File size: ~1679 bytes

💡 NEXT STEP: Verify the file with 'ls -l private_key.pem'
`,
        conditionalResponses: [
          {
            requires: ["keyExists"],
            response: `
⚠️  Warning: Overwriting existing private_key.pem...

Generating RSA private key, 2048 bit long modulus
..........................................+++
..........................................+++
e is 65537 (0x10001)

✅ Private key regenerated and saved to private_key.pem

💡 NOTE: You just replaced your old key. In production, be careful
   when regenerating keys as it invalidates existing certificates!
`,
          },
        ],
        setsState: { keyExists: true },
      },
      {
        value: "ls -l private_key.pem",
        label: "ls -l private_key.pem",
        response:
          "-rw-r--r--  1 user  staff  1679 May  1 10:23 private_key.pem\n\n✅ File exists! Size: 1679 bytes\n\n⚠️  SECURITY ISSUE: Permissions are 644 (readable by others)\n\n💡 NEXT STEP: Secure the file with 'chmod 600 private_key.pem'",
        conditionalResponses: [
          {
            requiresNot: ["keyExists"],
            response: `
❌ ls: private_key.pem: No such file or directory

💡 TIP: Generate the private key first using:
   openssl genrsa -out private_key.pem 2048

Type 'help' for more information.
`,
          },
          {
            requires: ["permissionsSet"],
            response: `
-rw-------  1 user  staff  1679 May  1 10:23 private_key.pem

✅ File exists with secure permissions (600)

📚 PERMISSIONS EXPLAINED:
   • rw------- means only the owner can read/write
   • No one else can access this file
   • This is the correct security posture for private keys
`,
          },
        ],
      },
      {
        value: "chmod 600 private_key.pem",
        label: "chmod 600 private_key.pem",
        response: `
✅ Permissions updated successfully!

📚 WHAT THIS MEANS:
   • 600 = Owner can read/write, no one else can access
   • This protects your private key from unauthorized access
   • Always use 600 or 400 for private keys in production

🎉 STEP COMPLETE!

You've successfully:
   ✓ Generated a 2048-bit RSA private key
   ✓ Verified the file exists
   ✓ Set secure permissions

Ready for the next step? Click "Next" below the terminal.
`,
        completesStep: true,
        conditionalResponses: [
          {
            requiresNot: ["keyExists"],
            response: `
❌ chmod: private_key.pem: No such file or directory

💡 TIP: Generate the private key first using:
   openssl genrsa -out private_key.pem 2048

Type 'help' for more information.
`,
          },
        ],
        setsState: { permissionsSet: true },
      },
      {
        value: "cat private_key.pem",
        label: "cat private_key.pem (view contents)",
        response: `
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAvj0Qhc5v+vQrxnZYPnDJmUFvRp7wVDWhXWtbNtUBJILIUFnk
A9gBwVX/5G5EBJfuKa+NwxOjQZkU6ZWp4VKXJhKKL7UZwvJXHtJvJyLnGJwJ3Omh
Xq6EOH+ZIhAYOu/LKs1VEYWhYGKPpBPCEfCYYNDYGPJ+TvXTmYQQZYQRUKPGgCg1
...
[Private key content truncated for security]
...
-----END RSA PRIVATE KEY-----

⚠️  IMPORTANT SECURITY REMINDER:
   In a real environment, NEVER display or share your private key!
   This is for educational purposes only.

📚 KEY FORMAT:
   • PEM format (Privacy Enhanced Mail)
   • Base64 encoded
   • Contains the private exponent and modulus
`,
        conditionalResponses: [
          {
            requiresNot: ["keyExists"],
            response: `
❌ cat: private_key.pem: No such file or directory

💡 TIP: Generate the private key first using:
   openssl genrsa -out private_key.pem 2048
`,
          },
        ],
      },
    ],
  },

  "create-csr": {
    id: "create-csr",
    title: "Step 3: Create a Certificate Signing Request (CSR)",
    introduction: `
╔════════════════════════════════════════════════════════════════╗
║           CERTIFICATE SIGNING REQUEST (CSR) LAB                ║
╚════════════════════════════════════════════════════════════════╝

Now we'll create a CSR - the document you send to a Certificate
Authority to request a signed certificate.

📚 WHAT IS A CSR?
   A CSR contains:
   • Your public key (derived from your private key)
   • Your identity information (domain, organization, etc.)
   • A digital signature proving you own the private key

🎯 CSR INFORMATION FIELDS:
   • Common Name (CN): Your domain (e.g., example.com)
   • Organization (O): Your company name
   • Organizational Unit (OU): Department
   • Country (C): Two-letter country code
   • State (ST): Full state/province name
   • Locality (L): City name
   • Email: Contact email address

💡 TIP: Type 'help' for guidance

🎯 YOUR TASK:
   1. Generate a CSR using your private key
   2. Fill in the identity information when prompted
   3. View the CSR contents to verify

Select a command from the dropdown below...
`,
    helpText: `
📖 HELP - Creating a CSR

AVAILABLE COMMANDS:
  • openssl req -new -key private_key.pem -out request.csr
    → Creates a new CSR (you'll fill in identity info)
  
  • openssl req -text -noout -in request.csr
    → Views the CSR contents in human-readable format

RECOMMENDED STEPS:
  1. Run 'openssl req -new' to create the CSR
  2. Fill in the prompted fields with your information
  3. View the CSR with 'openssl req -text'

📝 EXAMPLE VALUES:
   Country: US
   State: California
   City: San Francisco
   Organization: Example Inc
   Organizational Unit: IT Department
   Common Name: example.com
   Email: admin@example.com
`,
    commands: [
      {
        value: "help",
        label: "help - Show available commands",
        response: `
📖 HELP - Creating a CSR

AVAILABLE COMMANDS:
  • openssl req -new -key private_key.pem -out request.csr
    → Creates a new CSR (you'll fill in identity info)
  
  • openssl req -text -noout -in request.csr
    → Views the CSR contents in human-readable format

RECOMMENDED STEPS:
  1. Run 'openssl req -new' to create the CSR
  2. Fill in the prompted fields with your information
  3. View the CSR with 'openssl req -text'

📝 EXAMPLE VALUES:
   Country: US
   State: California
   City: San Francisco
   Organization: Example Inc
   Organizational Unit: IT Department
   Common Name: example.com
   Email: admin@example.com
`,
      },
      {
        value: "openssl req -new -key private_key.pem -out request.csr",
        label: "openssl req -new -key private_key.pem -out request.csr",
        response: "",
        interactive: true,
        setsState: { csrExists: true },
      },
      {
        value: "openssl req -text -noout -in request.csr",
        label: "openssl req -text -noout -in request.csr",
        response: `
Certificate Request:
    Data:
        Version: 0 (0x0)
        Subject: C=US, ST=California, L=San Francisco, O=Example Inc, OU=IT Department, CN=example.com/emailAddress=admin@example.com
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
         ...

✅ CSR contents displayed successfully!

📚 WHAT YOU'RE SEEING:
   • Subject: Your identity information
   • Public Key: Derived from your private key (2048-bit RSA)
   • Signature: Proves you own the private key

🎉 STEP COMPLETE!

You've successfully:
   ✓ Created a Certificate Signing Request
   ✓ Included your identity information
   ✓ Viewed the CSR contents

💡 NEXT: In production, you'd submit this CSR to a Certificate
   Authority for verification and signing.

Ready for the next step? Click "Next" below the terminal.
`,
        completesStep: true,
        conditionalResponses: [
          {
            requiresNot: ["csrExists"],
            response: `
❌ Error: Cannot open request.csr for reading, No such file or directory

💡 TIP: Generate the CSR first using:
   openssl req -new -key private_key.pem -out request.csr

Type 'help' for more information.
`,
          },
        ],
      },
    ],
  },

  "verify-key-csr": {
    id: "verify-key-csr",
    title: "Step 4: Verify Private Key and CSR Match",
    introduction: `
╔════════════════════════════════════════════════════════════════╗
║              KEY AND CSR VERIFICATION LAB                      ║
╚════════════════════════════════════════════════════════════════╝

Before submitting your CSR to a CA, it's critical to verify that
your private key and CSR are a matching cryptographic pair.

📚 WHY VERIFY?
   • Ensures the CSR was generated from your private key
   • Prevents submitting a CSR that won't work with your key
   • Confirms you'll be able to use the resulting certificate

🔍 HOW IT WORKS:
   We'll extract the "modulus" from both the private key and CSR,
   then compare their MD5 hashes. If they match, they're a pair!

💡 TIP: Type 'help' for guidance

🎯 YOUR TASK:
   1. Extract and hash the modulus from the CSR
   2. Extract and hash the modulus from the private key
   3. Compare the hashes to verify they match

Select a command from the dropdown below...
`,
    helpText: `
📖 HELP - Verifying Key and CSR Match

AVAILABLE COMMANDS:
  • openssl req -noout -modulus -in request.csr | openssl md5
    → Extracts and hashes the CSR's modulus
  
  • openssl rsa -noout -modulus -in private_key.pem | openssl md5
    → Extracts and hashes the private key's modulus
  
  • echo 'Comparing hashes...'
    → Compares the hashes to verify they match

RECOMMENDED STEPS:
  1. Run the CSR modulus command
  2. Run the private key modulus command
  3. Run the comparison command

📚 WHAT'S A MODULUS?
   The modulus is a large number that's part of the RSA key pair.
   Both the public key (in the CSR) and private key share the same
   modulus, so comparing them verifies they're a matching pair.
`,
    commands: [
      {
        value: "help",
        label: "help - Show available commands",
        response: `
📖 HELP - Verifying Key and CSR Match

AVAILABLE COMMANDS:
  • openssl req -noout -modulus -in request.csr | openssl md5
    → Extracts and hashes the CSR's modulus
  
  • openssl rsa -noout -modulus -in private_key.pem | openssl md5
    → Extracts and hashes the private key's modulus
  
  • echo 'Comparing hashes...'
    → Compares the hashes to verify they match

RECOMMENDED STEPS:
  1. Run the CSR modulus command
  2. Run the private key modulus command
  3. Run the comparison command

📚 WHAT'S A MODULUS?
   The modulus is a large number that's part of the RSA key pair.
   Both the public key (in the CSR) and private key share the same
   modulus, so comparing them verifies they're a matching pair.
`,
      },
      {
        value: "openssl req -noout -modulus -in request.csr | openssl md5",
        label: "Extract CSR modulus hash",
        response: `
(stdin)= e8a88d7e76140d33028110d1b2ff0be5

✅ CSR modulus hash extracted!

📚 WHAT THIS IS:
   • MD5 hash of the public key's modulus from your CSR
   • This unique fingerprint identifies your public key

💡 NEXT STEP: Extract the private key's modulus hash and compare
`,
        setsState: { csrModulusChecked: true },
      },
      {
        value: "openssl rsa -noout -modulus -in private_key.pem | openssl md5",
        label: "Extract private key modulus hash",
        response: `
(stdin)= e8a88d7e76140d33028110d1b2ff0be5

✅ Private key modulus hash extracted!

📚 WHAT THIS IS:
   • MD5 hash of the private key's modulus
   • Should match the CSR's modulus hash if they're a pair

💡 NEXT STEP: Run the comparison command to verify they match
`,
        setsState: { keyModulusChecked: true },
      },
      {
        value: "echo 'Comparing hashes...'",
        label: "Compare the hashes",
        response: `
Comparing hashes...

CSR modulus:         e8a88d7e76140d33028110d1b2ff0be5
Private key modulus: e8a88d7e76140d33028110d1b2ff0be5

✅ THE HASHES MATCH!

🎉 VERIFICATION SUCCESSFUL!

📚 WHAT THIS MEANS:
   • Your CSR was definitely generated from this private key
   • They are a valid cryptographic pair
   • The certificate you receive will work with your private key

🎉 STEP COMPLETE!

You've successfully:
   ✓ Extracted the modulus from your CSR
   ✓ Extracted the modulus from your private key
   ✓ Verified they match

💡 PRODUCTION TIP: Always perform this verification before
   submitting a CSR to a Certificate Authority!

Ready for the next step? Click "Next" below the terminal.
`,
        completesStep: true,
        conditionalResponses: [
          {
            requiresNot: ["csrModulusChecked", "keyModulusChecked"],
            response: `
Comparing hashes...

⚠️  You need to extract both modulus hashes first!

💡 TIP: Run these commands in order:
   1. openssl req -noout -modulus -in request.csr | openssl md5
   2. openssl rsa -noout -modulus -in private_key.pem | openssl md5
   3. Then run this comparison command again

Type 'help' for more information.
`,
          },
        ],
      },
    ],
  },

  "build-chain": {
    id: "build-chain",
    title: "Step 5: Build a Certificate Chain",
    introduction: `
╔════════════════════════════════════════════════════════════════╗
║            CERTIFICATE CHAIN BUILDING LAB                      ║
╚════════════════════════════════════════════════════════════════╝

After receiving your signed certificate from a CA, you need to
build a certificate chain for your web server.

📚 WHAT IS A CERTIFICATE CHAIN?
   A chain of trust from your certificate to a trusted root:
   
   Your Certificate (signed_cert.pem)
        ↓ signed by
   Intermediate CA (intermediate.pem)
        ↓ signed by
   Root CA (root.pem) ← Trusted by browsers

🔗 WHY CHAINS MATTER:
   • Browsers don't trust your certificate directly
   • They trust root CAs that are pre-installed
   • The chain proves your cert is signed by a trusted authority

⚠️  ORDER MATTERS!
   Certificates must be concatenated in this exact order:
   1. Your server certificate (signed_cert.pem)
   2. Intermediate certificate (intermediate.pem)
   3. Root certificate (root.pem)

💡 TIP: Type 'help' for guidance

🎯 YOUR TASK:
   1. Build the certificate chain file
   2. Verify the chain is valid
   3. Inspect the chain contents

Select a command from the dropdown below...
`,
    helpText: `
📖 HELP - Building Certificate Chains

AVAILABLE COMMANDS:
  • cat signed_cert.pem intermediate.pem root.pem > full_chain.pem
    → Builds the chain in the correct order
  
  • openssl verify -CAfile full_chain.pem signed_cert.pem
    → Verifies the chain is valid
  
  • openssl x509 -in full_chain.pem -text -noout
    → Inspects the chain contents
  
  • ls -l full_chain.pem
    → Checks if the chain file exists

RECOMMENDED STEPS:
  1. Build the chain with 'cat' command (order matters!)
  2. Verify with 'openssl verify'
  3. Inspect with 'openssl x509'

⚠️  WRONG ORDER: If you concatenate in the wrong order,
    the chain won't validate properly!
`,
    commands: [
      {
        value: "help",
        label: "help - Show available commands",
        response: `
📖 HELP - Building Certificate Chains

AVAILABLE COMMANDS:
  • cat signed_cert.pem intermediate.pem root.pem > full_chain.pem
    → Builds the chain in the correct order
  
  • openssl verify -CAfile full_chain.pem signed_cert.pem
    → Verifies the chain is valid
  
  • openssl x509 -in full_chain.pem -text -noout
    → Inspects the chain contents
  
  • ls -l full_chain.pem
    → Checks if the chain file exists

RECOMMENDED STEPS:
  1. Build the chain with 'cat' command (order matters!)
  2. Verify with 'openssl verify'
  3. Inspect with 'openssl x509'

⚠️  WRONG ORDER: If you concatenate in the wrong order,
    the chain won't validate properly!
`,
      },
      {
        value: "cat signed_cert.pem intermediate.pem root.pem > full_chain.pem",
        label: "cat signed_cert.pem intermediate.pem root.pem > full_chain.pem",
        response: `
✅ Certificate chain file 'full_chain.pem' created successfully!

📚 WHAT JUST HAPPENED:
   • Concatenated three certificates into one file
   • Order: Server → Intermediate → Root
   • This file can now be used on your web server

💡 NEXT STEP: Verify the chain with:
   openssl verify -CAfile full_chain.pem signed_cert.pem
`,
        setsState: { chainFileCreated: true },
      },
      {
        value: "cat intermediate.pem signed_cert.pem root.pem > full_chain.pem",
        label: "cat intermediate.pem signed_cert.pem root.pem > full_chain.pem",
        response: `
❌ Error: Incorrect certificate order!

⚠️  WRONG ORDER DETECTED

The correct order is:
   1. signed_cert.pem (your server certificate)
   2. intermediate.pem (intermediate CA)
   3. root.pem (root CA)

💡 TIP: Try again with the correct order:
   cat signed_cert.pem intermediate.pem root.pem > full_chain.pem

Type 'help' for more information.
`,
      },
      {
        value: "cat root.pem intermediate.pem signed_cert.pem > full_chain.pem",
        label: "cat root.pem intermediate.pem signed_cert.pem > full_chain.pem",
        response: `
❌ Error: Incorrect certificate order!

⚠️  WRONG ORDER DETECTED

The correct order is:
   1. signed_cert.pem (your server certificate)
   2. intermediate.pem (intermediate CA)
   3. root.pem (root CA)

💡 TIP: Try again with the correct order:
   cat signed_cert.pem intermediate.pem root.pem > full_chain.pem

Type 'help' for more information.
`,
      },
      {
        value: "openssl verify -CAfile full_chain.pem signed_cert.pem",
        label: "openssl verify -CAfile full_chain.pem signed_cert.pem",
        response: `
signed_cert.pem: OK

✅ CHAIN VERIFICATION SUCCESSFUL!

📚 WHAT THIS MEANS:
   • The certificate chain is valid
   • Each certificate is properly signed by its issuer
   • The chain leads to a trusted root CA
   • Browsers will trust this certificate

💡 NEXT STEP: Inspect the chain contents with:
   openssl x509 -in full_chain.pem -text -noout
`,
        conditionalResponses: [
          {
            requiresNot: ["chainFileCreated"],
            response: `
❌ Error: 'full_chain.pem' not found.

💡 TIP: Build the chain first using:
   cat signed_cert.pem intermediate.pem root.pem > full_chain.pem

Type 'help' for more information.
`,
          },
        ],
        setsState: { chainVerified: true },
      },
      {
        value: "openssl x509 -in full_chain.pem -text -noout",
        label: "openssl x509 -in full_chain.pem -text -noout",
        response: `
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number: 04:e5:7b:d2:1f:ef:aa:3d:bb:f3:4d:21:ec:3d:8e:84
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: C=US, O=Example CA, CN=Example Intermediate CA
        Validity
            Not Before: May  1 00:00:00 2023 GMT
            Not After : Apr 30 23:59:59 2024 GMT
        Subject: C=US, ST=California, L=San Francisco, O=Example Inc, 
                 OU=IT Department, CN=example.com
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
        X509v3 extensions:
            X509v3 Key Usage: critical
                Digital Signature, Key Encipherment
            X509v3 Extended Key Usage: 
                TLS Web Server Authentication
            X509v3 Subject Alternative Name: 
                DNS:example.com, DNS:www.example.com

✅ Certificate chain inspected successfully!

📚 KEY INFORMATION:
   • Issuer: Example Intermediate CA (who signed your cert)
   • Subject: example.com (your domain)
   • Validity: 1 year (typical for SSL certificates)
   • Key Usage: TLS Web Server Authentication
   • SANs: example.com, www.example.com

🎉 STEP COMPLETE!

You've successfully:
   ✓ Built a certificate chain in the correct order
   ✓ Verified the chain is valid
   ✓ Inspected the certificate details

💡 PRODUCTION: You would now install this chain on your web server
   (Apache, Nginx, etc.) to enable HTTPS!

Ready for the next step? Click "Next" below the terminal.
`,
        completesStep: true,
        conditionalResponses: [
          {
            requiresNot: ["chainFileCreated"],
            response: `
❌ Error: 'full_chain.pem' not found.

💡 TIP: Build the chain first using:
   cat signed_cert.pem intermediate.pem root.pem > full_chain.pem

Type 'help' for more information.
`,
          },
          {
            requiresNot: ["chainVerified"],
            response: `
⚠️  Warning: Chain not verified yet!

💡 TIP: Verify the chain first using:
   openssl verify -CAfile full_chain.pem signed_cert.pem

Then inspect the contents.
`,
          },
        ],
        setsState: { chainInspected: true },
      },
      {
        value: "ls -l full_chain.pem",
        label: "ls -l full_chain.pem",
        response: "-rw-r--r--  1 user  staff  7890 May  1 11:45 full_chain.pem\n\n✅ Chain file exists! Size: ~7.9 KB",
        conditionalResponses: [
          {
            requiresNot: ["chainFileCreated"],
            response: `
❌ ls: full_chain.pem: No such file or directory

💡 TIP: Build the chain first using:
   cat signed_cert.pem intermediate.pem root.pem > full_chain.pem
`,
          },
        ],
      },
    ],
  },

  "verify-chain": {
    id: "verify-chain",
    title: "Step 6: Verify and Inspect Certificate Chain",
    introduction: `
╔════════════════════════════════════════════════════════════════╗
║          CERTIFICATE CHAIN VERIFICATION LAB                    ║
╚════════════════════════════════════════════════════════════════╝

Now let's verify and inspect the certificate chain to ensure
everything is configured correctly.

📚 WHY VERIFY?
   • Confirms each certificate is signed by its issuer
   • Checks that the chain leads to a trusted root
   • Ensures no certificates have expired
   • Validates the trust relationships

🔍 WHAT WE'LL CHECK:
   • Chain validity (is it properly signed?)
   • Issuer and subject relationships
   • Certificate details and extensions

💡 TIP: Type 'help' for guidance

🎯 YOUR TASK:
   1. Verify the certificate chain is valid
   2. Inspect the issuer and subject fields

Select a command from the dropdown below...
`,
    helpText: `
📖 HELP - Verifying Certificate Chains

AVAILABLE COMMANDS:
  • openssl verify -CAfile full_chain.pem signed_cert.pem
    → Verifies the entire chain is valid and trusted
  
  • openssl x509 -in signed_cert.pem -text -noout | grep 'Issuer\\|Subject'
    → Shows who issued the cert and who it was issued to

RECOMMENDED STEPS:
  1. Verify the chain with 'openssl verify'
  2. Inspect the issuer/subject with 'grep' command

📚 UNDERSTANDING OUTPUT:
   • Issuer: The CA that signed your certificate
   • Subject: Your domain/organization (who the cert is for)
   • These should form a chain of trust
`,
    commands: [
      {
        value: "help",
        label: "help - Show available commands",
        response: `
📖 HELP - Verifying Certificate Chains

AVAILABLE COMMANDS:
  • openssl verify -CAfile full_chain.pem signed_cert.pem
    → Verifies the entire chain is valid and trusted
  
  • openssl x509 -in signed_cert.pem -text -noout | grep 'Issuer\\|Subject'
    → Shows who issued the cert and who it was issued to

RECOMMENDED STEPS:
  1. Verify the chain with 'openssl verify'
  2. Inspect the issuer/subject with 'grep' command

📚 UNDERSTANDING OUTPUT:
   • Issuer: The CA that signed your certificate
   • Subject: Your domain/organization (who the cert is for)
   • These should form a chain of trust
`,
      },
      {
        value: "openssl verify -CAfile full_chain.pem signed_cert.pem",
        label: "openssl verify -CAfile full_chain.pem signed_cert.pem",
        response: `
signed_cert.pem: OK

✅ VERIFICATION SUCCESSFUL!

📚 WHAT THIS CONFIRMS:
   • The certificate chain is cryptographically valid
   • Each certificate is properly signed by its issuer
   • The chain leads to a trusted root CA
   • No certificates have expired
   • The trust path is complete

💡 NEXT STEP: Inspect the certificate details with:
   openssl x509 -in signed_cert.pem -text -noout | grep 'Issuer\\|Subject'
`,
        setsState: { chainVerified: true },
      },
      {
        value: "openssl x509 -in signed_cert.pem -text -noout | grep 'Issuer\\|Subject'",
        label: "Check issuer and subject",
        response: `
        Issuer: C=US, O=Example CA, CN=Example Intermediate CA
        Subject: C=US, ST=California, L=San Francisco, O=Example Inc, 
                 OU=IT Department, CN=example.com

✅ Certificate details extracted!

📚 UNDERSTANDING THE TRUST CHAIN:
   
   Issuer: Example Intermediate CA
      ↓ This CA signed your certificate
   
   Subject: example.com (your domain)
      ↓ This is who the certificate identifies
   
   The Intermediate CA was itself signed by the Root CA,
   creating a complete chain of trust!

🎉 STEP COMPLETE!

You've successfully:
   ✓ Verified the certificate chain is valid
   ✓ Inspected the trust relationships
   ✓ Confirmed the issuer and subject fields

📚 WHAT YOU LEARNED:
   • How to verify certificate chains
   • Understanding issuer/subject relationships
   • The importance of complete trust paths

💡 PRODUCTION: This verification process is what browsers do
   automatically when users visit your HTTPS website!

🎊 CONGRATULATIONS! You've completed all hands-on labs!

Click "Next" to see your final summary and resources.
`,
        completesStep: true,
        conditionalResponses: [
          {
            requiresNot: ["chainVerified"],
            response: `
        Issuer: C=US, O=Example CA, CN=Example Intermediate CA
        Subject: C=US, ST=California, L=San Francisco, O=Example Inc, 
                 OU=IT Department, CN=example.com

📝 Certificate details shown, but...

💡 RECOMMENDATION: Verify the chain first using:
   openssl verify -CAfile full_chain.pem signed_cert.pem

This ensures the chain is valid before inspecting details.
`,
          },
        ],
      },
    ],
  },
}

// Export the old format for backward compatibility
export const terminalCommands: Record<string, Command[]> = Object.fromEntries(
  Object.entries(terminalModules).map(([key, module]) => [key, module.commands]),
)
