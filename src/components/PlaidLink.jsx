"use client"

import { useState } from "react"
import "../styles/PlaidLink.css"

function PlaidLink() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [selectedBank, setSelectedBank] = useState("")

  const banks = [
    { id: "chase", name: "Chase" },
    { id: "bofa", name: "Bank of America" },
    { id: "wells", name: "Wells Fargo" },
    { id: "citi", name: "Citibank" },
    { id: "capital", name: "Capital One" },
  ]

  const handleConnect = (e) => {
    e.preventDefault()

    if (!selectedBank) return

    // In a real app, this is where you would initialize Plaid Link
    setIsConnecting(true)

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
    }, 2000)
  }

  if (isConnected) {
    return (
      <div className="plaid-container">
        <h2>Bank Connection</h2>
        <div className="connection-success">
          <div className="success-icon">✓</div>
          <h3>Successfully Connected!</h3>
          <p>Your bank account has been successfully connected. Transactions will be imported automatically.</p>
          <button className="disconnect-btn">Disconnect Bank</button>
        </div>
      </div>
    )
  }

  return (
    <div className="plaid-container">
      <h2>Connect Your Bank</h2>
      <p className="plaid-description">
        Connect your bank account to automatically import transactions. We use Plaid to securely connect to your bank
        without storing your credentials.
      </p>

      <div className="plaid-info">
        <h3>How it works:</h3>
        <ol>
          <li>Select your bank from the list below</li>
          <li>You'll be redirected to your bank's login page</li>
          <li>Log in with your bank credentials</li>
          <li>Select the accounts you want to connect</li>
          <li>Your transactions will be imported automatically</li>
        </ol>
      </div>

      <form className="bank-selection-form" onSubmit={handleConnect}>
        <div className="form-group">
          <label htmlFor="bank">Select Your Bank</label>
          <select
            id="bank"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            disabled={isConnecting}
          >
            <option value="">Select a bank</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="connect-btn" disabled={!selectedBank || isConnecting}>
          {isConnecting ? "Connecting..." : "Connect Bank"}
        </button>
      </form>

      <div className="plaid-security-note">
        <h4>Security Note</h4>
        <p>
          Your bank login credentials are never stored on our servers. We use Plaid's secure API to connect to your bank
          and import transaction data.
        </p>
      </div>
    </div>
  )
}

export default PlaidLink

