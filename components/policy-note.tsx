export default function PolicyNote() {
  return (
    <div className="mt-6 bg-gray-100 p-4 rounded-lg border-l-4 border-blue-600">
      <h3 className="font-bold text-lg flex items-center">
        <span className="mr-2">🔒</span>
        Special Note: DoD / FIPS / TAXII Requirements
      </h3>

      <p className="mt-2">
        In high-security environments such as the Department of Defense (DoD) or CISA TAXII servers, certificate
        requests must meet strict standards.
      </p>

      <p className="mt-2 font-medium">Key requirements:</p>
      <ul className="list-disc pl-6 mt-1">
        <li>Use of FIPS 140-2 or FIPS 140-3 validated cryptographic modules (NIST)</li>
        <li>Adherence to DoD Instruction (DoDI) 8520.02 for PKI operations</li>
        <li>
          Non-interactive CSR generation using command-line flags (e.g., -subj) for automation or when multiple CNs/SANs
          are needed
        </li>
        <li>Compliance with DISA STIGs and CISA AIS guidelines</li>
      </ul>

      <div className="bg-gray-800 text-green-400 p-3 rounded-md font-mono text-sm mt-3 overflow-x-auto">
        openssl req -new -key private_key.pem -out request.csr -subj "/C=US/ST=California/L=San Francisco/O=Example
        Inc/OU=IT Department/CN=example.com/emailAddress=admin@example.com"
      </div>

      <p className="mt-3 font-medium">References:</p>
      <ul className="list-disc pl-6 mt-1 text-sm">
        <li>
          <a
            href="https://csrc.nist.gov/publications/detail/fips/140/2/final"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            FIPS 140-2: https://csrc.nist.gov/publications/detail/fips/140/2/final
          </a>
        </li>
        <li>
          <a
            href="https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodi/852002p.pdf"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DoDI 8520.02: https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodi/852002p.pdf
          </a>
        </li>
        <li>
          <a
            href="https://www.cisa.gov"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            CISA AIS TAXII guidance: https://www.cisa.gov
          </a>
        </li>
      </ul>

      <p className="mt-3">
        This approach ensures compliance with government regulations and enables secure, automated certificate
        enrollment.
      </p>
    </div>
  )
}
