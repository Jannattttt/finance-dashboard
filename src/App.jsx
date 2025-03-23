"use client"

import { useState, useEffect } from "react"
import "./App.css"
import Dashboard from "./components/Dashboard"
import Sidebar from "./components/Sidebar"
import Transactions from "./components/Transactions"
import Payments from "./components/Payments"
import Analytics from "./components/Analytics"
import Cards from "./components/Cards"
import Settings from "./components/Settings"
import { TransactionsProvider } from "./context/TransactionsContext"
import { Menu } from "lucide-react"

function App() {
  const [activeView, setActiveView] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      if (mobile) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Close sidebar when clicking a menu item on mobile
  const handleViewChange = (view) => {
    setActiveView(view)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  // Render the active view based on sidebar selection
  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "transactions":
        return <Transactions />
      case "payments":
        return <Payments />
      case "analytics":
        return <Analytics />
      case "cards":
        return <Cards />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <TransactionsProvider>
      <div className="app">
        <Sidebar activeView={activeView} setActiveView={handleViewChange} isOpen={sidebarOpen} />

        <main className={`content ${!sidebarOpen ? "content-expanded" : ""}`}>
          <div className="mobile-header">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
              <Menu size={24} />
            </button>
            <h1>Finance Dashboard</h1>
          </div>

          {renderActiveView()}
        </main>

        {/* Mobile overlay to close sidebar when clicked outside */}
        {sidebarOpen && isMobile && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
      </div>
    </TransactionsProvider>
  )
}

export default App

