"use client"

import { CreditCard } from "lucide-react"

function Cards() {
  return (
    <div className="placeholder-page">
      <CreditCard size={48} className="placeholder-icon" />
      <h2>Cards Management</h2>
      <p>This page is under development. Soon you'll be able to manage your credit and debit cards here.</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  )
}

export default Cards

