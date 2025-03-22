import React, { useState } from 'react';
import '../styles/login.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import api from '../api'; // Import your API instance

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await api.post('/auth/login', { email, password }); // Send login request
            if (response) {
                // If login is successful, navigate to the Dashboard
                localStorage.setItem("token", response.data.token)
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className='supercontainer'>

        <div className="container">
            <Link to="/" className="back">&larr; Back</Link>
            <h2>Welcome Back Sakhi!</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <label>Email Address</label>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    />
                <label>Password</label>
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    />
                <button type="submit" className="signin">SIGN IN</button>
            </form>
        </div>
</div>
    );
};

export default Login;
