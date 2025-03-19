import React from 'react';
import { Link } from 'react-router-dom';

const Emergency = () => {
    return (
        <div>
            <h1>Emergency Support</h1>
            <p>This is the Emergency Support page.</p>
            <Link to="/dashboard">Back to Dashboard</Link>
        </div>
    );
};

export default Emergency; 