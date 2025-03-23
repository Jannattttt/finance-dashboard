"use client"

import { useContext, useState } from "react"
import { TransactionsContext } from "../context/TransactionsContext"
import TransactionList from "./TransactionList"
import AddTransactionModal from "./AddTransactionModal"
import { Plus, Filter, Search } from "lucide-react"

function Transactions() {
  const { transactions } = useContext(TransactionsContext)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const handleAddTransaction = () => {
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilter = (newFilter) => {
    setFilter(newFilter)
  }

  const filteredTransactions = transactions.filter((transaction) => {
    // Apply type filter
    if (filter !== "all" && transaction.type !== filter) {
      return false
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        transaction.description.toLowerCase().includes(searchLower) ||
        transaction.category.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Transactions</h1>
          <p>View and manage all your transactions</p>
        </div>
        <button className="add-transaction-btn" onClick={handleAddTransaction}>
          <Plus size={16} />
          <span>Add Transaction</span>
        </button>
      </div>

      <div className="transactions-filters">
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              ×
            </button>
          )}
        </div>

        <div className="filter-dropdown">
          <button className="filter-btn">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <div className="filter-options">
            <button className={`filter-option ${filter === "all" ? "active" : ""}`} onClick={() => handleFilter("all")}>
              All Transactions
            </button>
            <button
              className={`filter-option ${filter === "income" ? "active" : ""}`}
              onClick={() => handleFilter("income")}
            >
              Income
            </button>
            <button
              className={`filter-option ${filter === "expense" ? "active" : ""}`}
              onClick={() => handleFilter("expense")}
            >
              Expenses
            </button>
          </div>
        </div>
      </div>

      <div className="page-content">
        <TransactionList transactions={filteredTransactions} />
      </div>

      {showAddModal && <AddTransactionModal onClose={closeModal} />}
    </div>
  )
}

export default Transactions

