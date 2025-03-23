import "../styles/BalanceSummary.css"

function BalanceSummary({ income, expenses, savings, incomeChange, expensesChange }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="balance-summary">
      <div className="summary-card income">
        <div className="card-icon">💵</div>
        <div className="card-content">
          <h4>Total Income</h4>
          <p className="amount">{formatCurrency(income)}</p>
          <div className={`change-indicator ${incomeChange >= 0 ? "positive" : "negative"}`}>
            <span className="change-arrow">{incomeChange >= 0 ? "↑" : "↓"}</span>
            <span className="change-value">{Math.abs(incomeChange).toFixed(1)}%</span>
            <span className="change-period">vs last month</span>
          </div>
        </div>
      </div>

      <div className="summary-card expenses">
        <div className="card-icon">💸</div>
        <div className="card-content">
          <h4>Total Expenses</h4>
          <p className="amount">{formatCurrency(expenses)}</p>
          <div className={`change-indicator ${expensesChange <= 0 ? "positive" : "negative"}`}>
            <span className="change-arrow">{expensesChange <= 0 ? "↓" : "↑"}</span>
            <span className="change-value">{Math.abs(expensesChange).toFixed(1)}%</span>
            <span className="change-period">vs last month</span>
          </div>
        </div>
      </div>

      <div className="summary-card savings">
        <div className="card-icon">🏦</div>
        <div className="card-content">
          <h4>Net Savings</h4>
          <p className="amount">{formatCurrency(savings)}</p>
          <div className="savings-ratio">
            <div className="savings-progress-bar">
              <div className="savings-progress" style={{ width: `${Math.min(100, (savings / income) * 100)}%` }}></div>
            </div>
            <span className="savings-percent">{income > 0 ? ((savings / income) * 100).toFixed(0) : 0}% of income</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceSummary

