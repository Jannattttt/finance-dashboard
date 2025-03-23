"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import "../styles/TransactionHistory.css"

function TransactionHistory({ transactions, showAll = false }) {
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [expandedTransaction, setExpandedTransaction] = useState(null)

  // Get transactions to display
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else if (sortField === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount
    } else if (sortField === "description") {
      return sortDirection === "asc"
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description)
    }
    return 0
  })

  const displayTransactions = showAll ? sortedTransactions : sortedTransactions.slice(0, 5)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    })
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  const toggleExpand = (id) => {
    setExpandedTransaction(expandedTransaction === id ? null : id)
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
  }

  return (
    <div className="transaction-history">
      <div className="section-header">
        <h2>Transaction History</h2>
        {!showAll && <button className="view-all-btn">View All</button>}
      </div>

      <div className="transaction-list">
        <div className="transaction-header">
          <div className="transaction-column name" onClick={() => handleSort("description")}>
            Name {getSortIcon("description")}
          </div>
          <div className="transaction-column category">Category</div>
          <div className="transaction-column date" onClick={() => handleSort("date")}>
            Date {getSortIcon("date")}
          </div>
          <div className="transaction-column amount" onClick={() => handleSort("amount")}>
            Amount {getSortIcon("amount")}
          </div>
          <div className="transaction-column status">Status</div>
        </div>

        {displayTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`transaction-item ${expandedTransaction === transaction.id ? "expanded" : ""}`}
          >
            <div className="transaction-column name" onClick={() => toggleExpand(transaction.id)}>
              <div className="user-avatar">{transaction.description.charAt(0)}</div>
              <span>{transaction.description}</span>
            </div>
            <div className="transaction-column category">{transaction.category}</div>
            <div className="transaction-column date">{formatDate(transaction.date)}</div>
            <div className="transaction-column amount">{formatCurrency(transaction.amount)}</div>
            <div className="transaction-column status">
              <span className={`status-badge ${transaction.type === "income" ? "completed" : "pending"}`}>
                {transaction.type === "income" ? "Completed" : "Pending"}
              </span>
              <div className="transaction-actions">
                <button className="action-btn" onClick={() => toggleDropdown(transaction.id)}>
                  <MoreHorizontal size={16} />
                </button>
                {activeDropdown === transaction.id && (
                  <div className="action-dropdown">
                    <button className="dropdown-item">
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                    <button className="dropdown-item">
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                    <button className="dropdown-item delete">
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {expandedTransaction === transaction.id && (
              <div className="transaction-details">
                <div className="detail-row">
                  <div className="detail-label">Transaction ID</div>
                  <div className="detail-value">{transaction.id}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Description</div>
                  <div className="detail-value">{transaction.description}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Category</div>
                  <div className="detail-value">{transaction.category}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Amount</div>
                  <div className="detail-value">{formatCurrency(transaction.amount)}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Date</div>
                  <div className="detail-value">{formatDate(transaction.date)}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Type</div>
                  <div className="detail-value">{transaction.type}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Status</div>
                  <div className="detail-value">
                    <span className={`status-badge ${transaction.type === "income" ? "completed" : "pending"}`}>
                      {transaction.type === "income" ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>
                <div className="detail-actions">
                  <button className="detail-btn edit">Edit Transaction</button>
                  <button className="detail-btn delete">Delete Transaction</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {displayTransactions.length === 0 && (
          <div className="no-transactions">
            <p>No transactions found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionHistory

