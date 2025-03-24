"use client"

import { BarChart2 } from "lucide-react"

function Analytics() {
  return (
    <div className="placeholder-page">
      <BarChart2 size={48} className="placeholder-icon" />
      <h2>Analytics Dashboard</h2>
      <p>This page is under development. Soon you'll be able to view detailed financial analytics and reports here. You'll be notified when the page is ready!</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  )
}

export default Analytics

