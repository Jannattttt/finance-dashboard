import "../styles/SchedulePayments.css"
import { Tv, Dumbbell, Car } from "lucide-react"

function SchedulePayments({ showAll = false }) {
  const scheduledPayments = [
    {
      id: 1,
      name: "Netflix Subscription",
      date: "15/11/2023",
      amount: 12,
      icon: Tv,
    },
    {
      id: 2,
      name: "Gym Membership",
      date: "20/11/2023",
      amount: 45,
      icon: Dumbbell,
    },
    {
      id: 3,
      name: "Car Insurance",
      date: "25/11/2023",
      amount: 150,
      icon: Car,
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
    <div className="schedule-payments">
      <div className="section-header">
        <h2>Schedule Payments</h2>
        {!showAll && <button className="view-all-btn">View All</button>}
      </div>

      <div className="payments-list">
        {scheduledPayments.map((payment) => (
          <div key={payment.id} className="payment-item">
            <div className="payment-icon">
              <payment.icon size={20} />
            </div>
            <div className="payment-details">
              <div className="payment-name">{payment.name}</div>
              <div className="payment-date">{payment.date}</div>
            </div>
            <div className="payment-amount">{formatCurrency(payment.amount)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SchedulePayments

