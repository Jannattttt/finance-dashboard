"use client"

import { useState, useContext, useRef, useEffect } from "react"
import { TransactionsContext } from "../context/TransactionsContext"
import { X } from "lucide-react"
import "../styles/AddTransactionModal.css"

function AddTransactionModal({ onClose }) {
  const { addTransaction } = useContext(TransactionsContext)
  const [formData, setFormData] = useState({
    type: "expense",
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const modalRef = useRef(null)

  const expenseCategories = [
    "Food & Dining",
    "Shopping",
    "Housing",
    "Transportation",
    "Entertainment",
    "Healthcare",
    "Education",
    "Personal Care",
    "Travel",
    "Utilities",
    "Other",
  ]

  const incomeCategories = ["Salary", "Freelance", "Investments", "Gifts", "Refunds", "Other"]

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear messages when form changes
    setError("")
    setSuccess("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      setError("Please fill in all fields")
      return
    }

    const amount = Number.parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Add transaction
      const newTransaction = {
        id: Date.now().toString(),
        ...formData,
        amount: amount,
      }

      addTransaction(newTransaction)

      // Show success message
      setSuccess("Transaction added successfully!")

      // Reset form
      setFormData({
        type: "expense",
        description: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      })

      setIsSubmitting(false)

      // Close modal after a delay
      setTimeout(() => {
        onClose()
      }, 1500)
    }, 800)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <h2>Add New Transaction</h2>
          <button className="close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="message error-message">
            <span className="message-icon">⚠️</span>
            <span className="message-text">{error}</span>
            <button className="close-message" onClick={() => setError("")}>
              ×
            </button>
          </div>
        )}

        {success && (
          <div className="message success-message">
            <span className="message-icon">✅</span>
            <span className="message-text">{success}</span>
            <button className="close-message" onClick={() => setSuccess("")}>
              ×
            </button>
          </div>
        )}

        <form className="transaction-form" onSubmit={handleSubmit}>
          <div className="form-group transaction-type">
            <label>Transaction Type</label>
            <div className="toggle-container">
              <button
                type="button"
                className={`toggle-btn ${formData.type === "expense" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, type: "expense" })}
              >
                <span className="toggle-icon">💸</span>
                Expense
              </button>
              <button
                type="button"
                className={`toggle-btn ${formData.type === "income" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, type: "income" })}
              >
                <span className="toggle-icon">💵</span>
                Income
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What was this transaction for?"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="form-input amount-input"
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <div className="select-wrapper">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select a category</option>
                  {formData.type === "expense"
                    ? expenseCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))
                    : incomeCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                </select>
                <span className="select-arrow">▼</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTransactionModal

