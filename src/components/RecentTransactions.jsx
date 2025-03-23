import "../styles/RecentTransactions.css"

function RecentTransactions({ transactions }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      "Food & Dining": "🍔",
      Shopping: "🛍️",
      Housing: "🏠",
      Transportation: "🚗",
      Entertainment: "🎬",
      Healthcare: "⚕️",
      Education: "📚",
      "Personal Care": "💇",
      Travel: "✈️",
      Utilities: "💡",
      Salary: "💼",
      Freelance: "💻",
      Investments: "📈",
      Gifts: "🎁",
      Refunds: "↩️",
      Other: "📋",
    }

    return icons[category] || "📋"
  }

  return (
    <div className="recent-transactions">
      {transactions.length > 0 ? (
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              <div className="transaction-icon">{getCategoryIcon(transaction.category)}</div>
              <div className="transaction-info">
                <span className="transaction-name">{transaction.description}</span>
                <div className="transaction-meta">
                  <span className="transaction-category">{transaction.category}</span>
                  <span className="transaction-date">{formatDate(transaction.date)}</span>
                </div>
              </div>
              <span className={`transaction-amount ${transaction.type === "income" ? "income" : "expense"}`}>
                {transaction.type === "income" ? "+" : "-"} {formatCurrency(transaction.amount)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-transactions">
          <div className="empty-state-icon">📋</div>
          <p>No recent transactions</p>
          <button className="add-transaction-btn">Add Transaction</button>
        </div>
      )}
    </div>
  )
}

export default RecentTransactions

