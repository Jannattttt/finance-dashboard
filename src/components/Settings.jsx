"use client"

import { SettingsIcon } from "lucide-react"

function Settings() {
  return (
    <div className="placeholder-page">
      <SettingsIcon size={48} className="placeholder-icon" />
      <h2>Settings</h2>
      <p>This page is under development. Soon you'll be able to customize your dashboard and account settings here.</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  )
}

export default Settings

