import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Cookies } from 'react-cookie'; // Import Cookies for token management
import api from '../api'; // Import your API instance
import '../styles/signup.css'; // Import the CSS file for styling

const SignUp = () => {
    const [personDetails, setPersonDetails] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    const cookie = new Cookies(); // Initialize Cookies

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const result = await api.post('/auth/register', personDetails); // Send signup request
            localStorage.setItem('token', result.data?.token); // Store token in localStorage
            cookie.set('token', result.data?.token); // Store token in cookies
            navigate('/dashboard'); // Redirect to the dashboard
        } catch (error) {
            setError(error?.response?.statusText || 'Something went wrong'); // Handle error
        }
    };

    return (
    <div className='supercontainer'>

        <div className="container">
            <Link to="/" className="back-button">Back</Link>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={personDetails.email} 
                    onChange={(e) =>
                        setPersonDetails((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                    required 
                    />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={personDetails.password} 
                    onChange={(e) =>
                        setPersonDetails((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }))
                    }
                    required 
                    />
                <div className="checkbox-container">
                    <input type="checkbox" />
                    <label>I agree to the <a href="#">terms and conditions</a></label>
                </div>
                <div className="checkbox-container">
                    <input type="checkbox" />
                    <label>Remain Anonymous</label>
                </div>
                <button type="submit">SIGN UP</button>
            </form>
            {error && <p className="text-center text-red-700 p-4">{error}</p>} {/* Error message */}
        </div>
</div>
    );
};

export default SignUp; 