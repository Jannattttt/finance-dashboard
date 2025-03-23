"use client"
import "../styles/Sidebar.css"
import { Home, CreditCard, Banknote, BarChart2, Wallet, Settings, LogOut } from "lucide-react"

function Sidebar({ activeView, setActiveView, isOpen }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "transactions", label: "Transactions", icon: CreditCard },
    { id: "payments", label: "Payments", icon: Banknote },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "cards", label: "Cards", icon: Wallet },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleNavigation = (id) => {
    setActiveView(id)
    // On mobile, close the sidebar after navigation
    if (window.innerWidth < 768) {
      document.querySelector(".sidebar").classList.remove("open")
    }
  }

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo">
        <div className="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#7B61FF"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M15 8H9C8.44772 8 8 8.44772 8 9V15C8 15.5523 8.44772 16 9 16H15C15.5523 16 16 15.5523 16 15V9C16 8.44772 15.5523 8 15 8Z"
              fill="white"
            />
          </svg>
        </div>
        <h1>Finance</h1>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${activeView === item.id ? "active" : ""}`}
                onClick={() => handleNavigation(item.id)}
              >
                <span className="nav-icon">
                  <item.icon size={20} />
                </span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button">
          <span className="nav-icon">
            <LogOut size={20} />
          </span>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

