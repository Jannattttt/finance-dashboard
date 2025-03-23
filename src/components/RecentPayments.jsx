import "../styles/RecentPayments.css"
import { Zap, Droplets, Wifi } from "lucide-react"

function RecentPayments({ showAll = false }) {
  const recentPayments = [
    {
      id: 1,
      name: "Electric Bill",
      date: "15/11/2023",
      status: "Completed",
      amount: 75,
      icon: Zap,
    },
    {
      id: 2,
      name: "Water Bill",
      date: "10/11/2023",
      status: "Completed",
      amount: 25,
      icon: Droplets,
    },
    {
      id: 3,
      name: "Internet Service",
      date: "05/11/2023",
      status: "Completed",
      amount: 60,
      icon: Wifi,
    },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="recent-payments">
      <div className="section-header">
        <h2>Recent Payments</h2>
        {!showAll && <button className="view-all-btn">View All</button>}
      </div>

      <div className="payments-list">
        {recentPayments.map((payment) => (
          <div key={payment.id} className="payment-item">
            <div className="payment-icon">
              <payment.icon size={20} />
            </div>
            <div className="payment-details">
              <div className="payment-name">{payment.name}</div>
              <div className="payment-status">
                {payment.date} • {payment.status}
              </div>
            </div>
            <div className="payment-amount">{formatCurrency(payment.amount)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentPayments

