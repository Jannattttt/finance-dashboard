import "../styles/CreditCard.css"

function CreditCard() {
  return (
    <div className="credit-card">
      <div className="card-chip">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" strokeWidth="2" />
          <path d="M7 12H17" stroke="white" strokeWidth="2" />
        </svg>
      </div>
      <div className="card-number">**** **** **** 1234</div>
      <div className="card-details">
        <div className="card-holder">
          <span className="label">CARD HOLDER</span>
          <span className="value">FIRDAUS ZAKARI</span>
        </div>
        <div className="card-expiry">
          <span className="label">VALID THRU</span>
          <span className="value">05/25</span>
        </div>
      </div>
    </div>
  )
}

export default CreditCard

