import SchedulePayments from "./SchedulePayments"
import RecentPayments from "./RecentPayments"

function Payments() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Payments</h1>
        <p>Manage your scheduled and recent payments</p>
      </div>

      <div className="page-content">
        <div className="payments-grid">
          <div className="scheduled-payments-section">
            <SchedulePayments showAll={true} />
          </div>

          <div className="recent-payments-section">
            <RecentPayments showAll={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payments

