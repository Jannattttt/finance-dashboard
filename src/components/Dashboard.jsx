"use client"

import { useContext, useState, useEffect } from "react"
import { TransactionsContext } from "../context/TransactionsContext"
import "../styles/Dashboard.css"
import BalanceChart from "./BalanceChart"
import CreditCard from "./CreditCard"
import SchedulePayments from "./SchedulePayments"
import RecentPayments from "./RecentPayments"
import TransactionHistory from "./TransactionHistory"
import AddTransactionModal from "./AddTransactionModal"
import {
  Search,
  Bell,
  Settings,
  Plus,
  ShoppingCart,
  Repeat,
  TrendingUp,
  FileText,
  Check,
  AlertTriangle,
  Info,
} from "lucide-react"
import image1 from "../assets/profilee.jpeg"

function Dashboard() {
  const { transactions } = useContext(TransactionsContext)
  const [searchTerm, setSearchTerm] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Calculate summary data
  const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const savings = income - expenses
  const investments = 1380 // Sample data
  const bills = 1500 // Sample data

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Handle notifications
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    // Close other dropdowns
    setShowSettings(false)
  }

  // Handle settings
  const toggleSettings = () => {
    setShowSettings(!showSettings)
    // Close other dropdowns
    setShowNotifications(false)
  }

  // Handle add transaction
  const handleAddTransaction = () => {
    setShowAddModal(true)
  }

  // Close modal
  const closeModal = () => {
    setShowAddModal(false)
  }

  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header skeleton-header">
          <div className="welcome-section">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
          </div>
          <div className="header-actions">
            <div className="skeleton-search"></div>
            <div className="skeleton-circle"></div>
            <div className="skeleton-circle"></div>
            <div className="skeleton-profile"></div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="metrics-row">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="metric-card skeleton-card">
                <div className="skeleton-icon"></div>
                <div className="metric-details">
                  <div className="skeleton-amount"></div>
                  <div className="skeleton-text"></div>
                </div>
              </div>
            ))}
            <div className="metric-card credit-card-container skeleton-card">
              <div className="skeleton-credit-card"></div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="transaction-section skeleton-section"></div>
            <div className="balance-section skeleton-section"></div>
            <div className="payments-section">
              <div className="scheduled-payments skeleton-section"></div>
              <div className="recent-payments skeleton-section"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Dashboard</h1>
          <p>Hi Firdaus, Good Morning!</p>
        </div>

        <div className="header-actions">
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <div className="dropdown-container">
            <button className="icon-button" onClick={toggleSettings}>
              <Settings size={20} />
            </button>
            {showSettings && (
              <div className="dropdown-menu settings-menu">
                <div className="dropdown-header">Settings</div>
                <a href="#" className="dropdown-item">
                  Account Settings
                </a>
                <a href="#" className="dropdown-item">
                  Preferences
                </a>
                <a href="#" className="dropdown-item">
                  Notifications
                </a>
                <a href="#" className="dropdown-item">
                  Privacy & Security
                </a>
              </div>
            )}
          </div>

          <div className="dropdown-container">
            <button className="icon-button notification-btn" onClick={toggleNotifications}>
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            {showNotifications && (
              <div className="dropdown-menu notification-menu">
                <div className="dropdown-header">Notifications</div>
                <div className="notification-item unread">
                  <div className="notification-icon success">
                    <Check size={14} />
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">Payment Successful</div>
                    <div className="notification-text">Your payment of $150 was successful</div>
                    <div className="notification-time">2 minutes ago</div>
                  </div>
                </div>
                <div className="notification-item unread">
                  <div className="notification-icon warning">
                    <AlertTriangle size={14} />
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">Low Balance Alert</div>
                    <div className="notification-text">Your account balance is below $500</div>
                    <div className="notification-time">1 hour ago</div>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-icon info">
                    <Info size={14} />
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">New Feature Available</div>
                    <div className="notification-text">Check out our new budget planning tool</div>
                    <div className="notification-time">1 day ago</div>
                  </div>
                </div>
                <a href="#" className="view-all-link">
                  View All Notifications
                </a>
              </div>
            )}
          </div>

          <div className="user-profile">
            <img src={image1} alt="Firdaus Zakari" className="avatar" />
            <span className="user-name">Firdaus Zakari</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="metrics-row">
          <div className="metric-card">
            <div className="metric-icon shopping">
              <ShoppingCart size={20} />
            </div>
            <div className="metric-details">
              <h3>{formatCurrency(597)}</h3>
              <p>Shopping Costs & Expenses</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon transfer">
              <Repeat size={20} />
            </div>
            <div className="metric-details">
              <h3>{formatCurrency(875)}</h3>
              <p>Transfer Payments</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon investment">
              <TrendingUp size={20} />
            </div>
            <div className="metric-details">
              <h3>{formatCurrency(investments)}</h3>
              <p>Investment & Earnings</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon bills">
              <FileText size={20} />
            </div>
            <div className="metric-details">
              <h3>{formatCurrency(bills)}</h3>
              <p>Bills Acquisition & Utilities</p>
            </div>
          </div>

          <div className="metric-card credit-card-container">
            <CreditCard />
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="transaction-section">
            <TransactionHistory transactions={transactions} />
          </div>

          <div className="balance-section">
            <div className="section-header">
              <h2>Balance</h2>
              <div className="balance-period-selector">
                <button className="period-btn active">Monthly</button>
                <button className="period-btn">Quarterly</button>
                <button className="period-btn">Yearly</button>
              </div>
            </div>
            <BalanceChart />
          </div>

          <div className="payments-section">
            <div className="scheduled-payments">
              <SchedulePayments />
            </div>

            <div className="recent-payments">
              <RecentPayments />
            </div>
          </div>
        </div>

        <button className="floating-action-btn" onClick={handleAddTransaction}>
          <Plus size={24} />
        </button>
      </div>

      {showAddModal && <AddTransactionModal onClose={closeModal} />}
    </div>
  )
}

export default Dashboard

