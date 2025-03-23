"use client"

import { createContext, useState, useEffect } from "react"

// Create context
export const TransactionsContext = createContext()

// Sample data
const sampleTransactions = [
  {
    id: "1",
    date: "2023-11-01",
    description: "James Smith",
    amount: 250.5,
    type: "income",
    category: "Graphic Design",
  },
  {
    id: "2",
    date: "2023-10-27",
    description: "Sarah Johnson",
    amount: 1800.0,
    type: "income",
    category: "Photo Editing",
  },
  {
    id: "3",
    date: "2023-10-25",
    description: "Linda Brown",
    amount: 575.0,
    type: "expense",
    category: "Financial Planning",
  },
  {
    id: "4",
    date: "2023-10-22",
    description: "Michael Peterson",
    amount: 642.0,
    type: "expense",
    category: "Architecture Services",
  },
  {
    id: "5",
    date: "2023-10-15",
    description: "Robert Wilson",
    amount: 350.0,
    type: "income",
    category: "Consulting",
  },
]

// Provider component
export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    // Load from localStorage or use sample data
    const savedTransactions = localStorage.getItem("transactions")
    return savedTransactions ? JSON.parse(savedTransactions) : sampleTransactions
  })

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])

  // Add transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction])
  }

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id))
  }

  // Update transaction
  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction,
      ),
    )
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

