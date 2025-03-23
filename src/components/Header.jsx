"use client"

import { useState } from "react"
import "../styles/Header.css"

function Header({ sidebarOpen, setSidebarOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
          <span className="hamburger"></span>
        </button>
        <div className="logo">
          <span className="logo-icon">💰</span>
          <h1>FinTrack</h1>
        </div>
      </div>

      <div className="header-right">
        <button className="notification-btn" aria-label="Notifications">
          <span className="notification-icon">🔔</span>
          <span className="notification-badge">3</span>
        </button>

        <div className="profile-dropdown">
          <button className="profile-btn" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="avatar">JS</div>
            <span className="profile-name">John Smith</span>
            <span className="dropdown-arrow">▼</span>
          </button>

          {isProfileOpen && (
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">👤</span>
                Profile
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">⚙️</span>
                Settings
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">🚪</span>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

