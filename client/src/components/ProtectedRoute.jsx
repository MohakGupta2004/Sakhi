import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api'; // Import your API instance

const ProtectedRoute = ({ component: Component }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        api.get('/auth/profile', {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(({ data }) => {
            setUser(data.message); // Assuming the user object is in data.message
        })
        .catch(() => {
            setUser(null);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading...</p>; // Show loading state

    if (!user) {
        return <Navigate to="/login" />; // Redirect to login if not authenticated
    }

    return <Component />; // Render the protected component if authenticated
};

export default ProtectedRoute; 