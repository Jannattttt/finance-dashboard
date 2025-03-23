"use client"

import { useState, useContext } from "react"
import { TransactionsContext } from "../context/TransactionsContext"
import { ChevronDown, ChevronUp, Edit, Trash2, MoreHorizontal } from "lucide-react"
import "../styles/TransactionList.css"

function TransactionList({ transactions }) {
  const { deleteTransaction } = useContext(TransactionsContext)
  const [sortField, setSortField] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Sort transactions
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    } else if (sortField === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
    } else if (sortField === "description") {
      return sortOrder === "asc"
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description)
    }
    return 0
  })

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  const handleDeleteClick = (id) => {
    setShowDeleteConfirm(id)
    setActiveDropdown(null)
  }

  const confirmDelete = (id) => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      deleteTransaction(id)
      setShowDeleteConfirm(null)
      setIsDeleting(false)
    }, 500)
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(null)
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return null
    return sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
  }

  return (
    <div className="transaction-list-container">
      {transactions.length > 0 ? (
        <div className="table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th className="sortable" onClick={() => handleSort("date")}>
                  Date <span className="sort-icon">{getSortIcon("date")}</span>
                </th>
                <th className="sortable" onClick={() => handleSort("description")}>
                  Description <span className="sort-icon">{getSortIcon("description")}</span>
                </th>
                <th>Category</th>
                <th className="sortable" onClick={() => handleSort("amount")}>
                  Amount <span className="sort-icon">{getSortIcon("amount")}</span>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction) => (
                <tr key={transaction.id} className={transaction.type}>
                  <td>{formatDate(transaction.date)}</td>
                  <td className="description-cell">
                    <div className="transaction-with-icon">
                      <span className="category-icon">{transaction.description.charAt(0)}</span>
                      {transaction.description}
                    </div>
                  </td>
                  <td>{transaction.category}</td>
                  <td className={`amount ${transaction.type}`}>
                    {transaction.type === "income" ? "+" : "-"} {formatCurrency(transaction.amount)}
                  </td>
                  <td className="actions-cell">
                    {showDeleteConfirm === transaction.id ? (
                      <div className="delete-confirm">
                        <span>Delete?</span>
                        <button
                          className="confirm-btn yes"
                          onClick={() => confirmDelete(transaction.id)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "..." : "Yes"}
                        </button>
                        <button className="confirm-btn no" onClick={cancelDelete} disabled={isDeleting}>
                          No
                        </button>
                      </div>
                    ) : (
                      <div className="action-buttons">
                        <button className="action-btn edit-btn" title="Edit">
                          <Edit size={16} />
                        </button>
                        <div className="dropdown-container">
                          <button
                            className="action-btn more-btn"
                            onClick={() => toggleDropdown(transaction.id)}
                            title="More options"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          {activeDropdown === transaction.id && (
                            <div className="action-dropdown">
                              <button className="dropdown-item">
                                <Edit size={14} />
                                <span>Edit</span>
                              </button>
                              <button
                                className="dropdown-item delete"
                                onClick={() => handleDeleteClick(transaction.id)}
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-transactions-message">
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No transactions found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionList

