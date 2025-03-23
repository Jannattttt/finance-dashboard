import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import "../styles/IncomeExpenseChart.css"

function IncomeExpenseChart({ transactions }) {
  // Group transactions by month
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date)
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.getFullYear()
    const key = `${month} ${year}`

    if (!acc[key]) {
      acc[key] = { month: key, income: 0, expenses: 0 }
    }

    if (transaction.type === "income") {
      acc[key].income += transaction.amount
    } else {
      acc[key].expenses += transaction.amount
    }

    return acc
  }, {})

  // Convert to array and sort by date
  const chartData = Object.values(monthlyData).sort((a, b) => {
    const [aMonth, aYear] = a.month.split(" ")
    const [bMonth, bYear] = b.month.split(" ")
    return new Date(`${aMonth} 1, ${aYear}`) - new Date(`${bMonth} 1, ${bYear}`)
  })

  return (
    <div className="income-expense-chart">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, ""]} />
            <Legend />
            <Bar dataKey="income" fill="#4CAF50" name="Income" />
            <Bar dataKey="expenses" fill="#F44336" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="no-data">No data available</div>
      )}
    </div>
  )
}

export default IncomeExpenseChart

