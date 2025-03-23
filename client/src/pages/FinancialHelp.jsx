import React from 'react';
import "../styles/finance.css"
const FinancialHelp = () => {
    return (
      <div className="financial-help-container">
        <header className="header">
          <h1>Financial Assistance</h1>
          <p>Get the support you need to manage your finances.</p>
        </header>
  
        <section className="assistance-options">
          <div className="f-card">
            <h2>Emergency Funds</h2>
            <p>Apply for emergency financial aid in times of crisis.</p>
            <button className="btn">Apply Now</button>
          </div>
          <div className="f-card">
            <h2>Budget Planning</h2>
            <p>Learn how to create and manage your budget effectively.</p>
            <button className="btn">Get Started</button>
          </div>
          <div className="f-card">
            <h2>Debt Relief</h2>
            <p>Find resources to help manage and reduce your debts.</p>
            <button className="btn">Learn More</button>
          </div>
        </section>
      </div>
    );
  };


export default FinancialHelp; 