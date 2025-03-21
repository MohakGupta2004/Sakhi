import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Emergency from './pages/Emergency';
import CareerHelp from './pages/CareerHelp';
import LegalGuidance from './pages/LegalGuidance';
import FinancialHelp from './pages/FinancialHelp';
import NGOHelp from './pages/NGOHelp';
import MentalHealth from './pages/MentalHealth';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
    return (
        <div className='app-container'>

        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                <Route path="/emergency" element={<ProtectedRoute component={Emergency} />} />
                <Route path="/career-help" element={<ProtectedRoute component={CareerHelp} />} />
                <Route path="/legal-guidance" element={<ProtectedRoute component={LegalGuidance} />} />
                <Route path="/financial-help" element={<ProtectedRoute component={FinancialHelp} />} />
                <Route path="/ngo-help" element={<ProtectedRoute component={NGOHelp} />} />
                <Route path="/mental-health" element={<ProtectedRoute component={MentalHealth} />} />
            </Routes>
        </Router>
        </div>
    )
}

export default App
