import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import "../styles/SpendingChart.css"

function SpendingChart({ transactions }) {
  // Group expenses by category
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      const { category, amount } = transaction
      if (!acc[category]) {
        acc[category] = 0
      }
      acc[category] += amount
      return acc
    }, {})

  // Convert to array for chart
  const chartData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }))

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  return (
    <div className="spending-chart">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, "Amount"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="no-data">No expense data available</div>
      )}
    </div>
  )
}

export default SpendingChart

