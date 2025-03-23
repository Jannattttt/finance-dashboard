"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import "../styles/BalanceChart.css"

function BalanceChart() {
  const [activeIndex, setActiveIndex] = useState(null)

  // Sample data for the chart
  const monthlyData = [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 1800 },
    { month: "Mar", amount: 1400 },
    { month: "Apr", amount: 2200 },
    { month: "May", amount: 1600 },
    { month: "Jun", amount: 800 },
    { month: "Jul", amount: 1900 },
    { month: "Aug", amount: 2400 },
    { month: "Sep", amount: 1500 },
    { month: "Oct", amount: 1100 },
    { month: "Nov", amount: 1700 },
    { month: "Dec", amount: 1300 },
  ]

  const quarterlyData = [
    { month: "Q1", amount: 4400 },
    { month: "Q2", amount: 4600 },
    { month: "Q3", amount: 5800 },
    { month: "Q4", amount: 4100 },
  ]

  const yearlyData = [
    { month: "2020", amount: 12000 },
    { month: "2021", amount: 15000 },
    { month: "2022", amount: 18000 },
    { month: "2023", amount: 19000 },
  ]

  const [chartData, setChartData] = useState(monthlyData)
  const [period, setPeriod] = useState("monthly")

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod)
    setActiveIndex(null)

    switch (newPeriod) {
      case "monthly":
        setChartData(monthlyData)
        break
      case "quarterly":
        setChartData(quarterlyData)
        break
      case "yearly":
        setChartData(yearlyData)
        break
      default:
        setChartData(monthlyData)
    }
  }

  const handleBarClick = (data, index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{payload[0].payload.month}</p>
          <p className="tooltip-value">${payload[0].value}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="balance-chart-container">
      <div className="chart-period-selector">
        <button
          className={`period-btn ${period === "monthly" ? "active" : ""}`}
          onClick={() => handlePeriodChange("monthly")}
        >
          Monthly
        </button>
        <button
          className={`period-btn ${period === "quarterly" ? "active" : ""}`}
          onClick={() => handlePeriodChange("quarterly")}
        >
          Quarterly
        </button>
        <button
          className={`period-btn ${period === "yearly" ? "active" : ""}`}
          onClick={() => handlePeriodChange("yearly")}
        >
          Yearly
        </button>
      </div>

      <div className="balance-chart">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8a8a8a" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#8a8a8a" }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(123, 97, 255, 0.1)" }} />
            <Bar
              dataKey="amount"
              fill="#7B61FF"
              radius={[4, 4, 0, 0]}
              barSize={20}
              onClick={handleBarClick}
              animationDuration={500}
              activeBar={{ fill: "#5D4EBF" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {activeIndex !== null && (
        <div className="chart-details">
          <h3>{chartData[activeIndex].month} Summary</h3>
          <div className="chart-detail-row">
            <span className="detail-label">Total Balance:</span>
            <span className="detail-value">${chartData[activeIndex].amount}</span>
          </div>
          <div className="chart-detail-row">
            <span className="detail-label">Income:</span>
            <span className="detail-value">${Math.round(chartData[activeIndex].amount * 0.6)}</span>
          </div>
          <div className="chart-detail-row">
            <span className="detail-label">Expenses:</span>
            <span className="detail-value">${Math.round(chartData[activeIndex].amount * 0.4)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default BalanceChart

