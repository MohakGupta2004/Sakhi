import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
    return (
        <div className='supercontainer'>

        <div className="container">
            <div className="menu-icon">
                <span>&#9776;</span>
            </div>
            <h1>WELCOME TO SAKHI</h1>
            <p>A safe space for support and guidance</p>
            
            <div className="button-grid">
                <Link to="/emergency" className="button">EMERGENCY SUPPORT</Link>
                <Link to="/career-help" className="button">CAREER HELP</Link>
                <Link to="/legal-guidance" className="button">LEGAL GUIDANCE</Link>
                <Link to="/financial-help" className="button">FINANCIAL HELP</Link>
                <Link to="/ngo-help" className="button">NGO AND HELP CENTRES</Link>
                <Link to="/mental-health" className="button">MENTAL HEALTH</Link>
            </div>
            
        </div>
        </div>
    );
};

export default Dashboard; 