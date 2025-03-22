import React, { useState, useRef } from 'react';
import "../styles/legalguidance.css";

const LegalGuidance = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        incidentDate: "",
        location: "",
        description: "",
        incidentType: "",
        time: ""
    });
    
    const [firContent, setFirContent] = useState("");
    const firContentRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("E-FIR Generated Successfully!");
        
        const generatedFirContent = `
            To,
            The Officer in Charge,
            ${formData.location} Police Station

            Subject: Filing of E-FIR

            Respected Sir/Madam,
            I, ${formData.name}, residing at ${formData.address}, would like to formally lodge an FIR regarding an incident that occurred on ${formData.incidentDate} at ${formData.time} in ${formData.location}. Below are the details of the incident:

            Type of Incident: ${formData.incidentType}
            Contact Number: ${formData.phone}
            Description of Incident: ${formData.description}

            I request you to kindly register my complaint and take necessary action at the earliest.

            Thank you for your time and assistance.

            Sincerely,
            ${formData.name}
            Contact: ${formData.phone}
        `;
        
        setFirContent(generatedFirContent);

        if (firContentRef.current) {
            firContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="outer-container">
            <div className="container wide-container">
                <header className="header">
                    <div className="header-content">
                        <h1>E-FIR Generator</h1>
                    </div>
                    <p>File your First Information Report electronically</p>
                </header>

                <form onSubmit={handleSubmit} className="main-form">
                    <div className="form-section">
                        <h2>Personal Information</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Incident Details</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Type of Incident</label>
                                <select name="incidentType" value={formData.incidentType} onChange={handleChange} required>
                                    <option value="">Select incident type</option>
                                    <option value="theft">Theft</option>
                                    <option value="assault">Assault</option>
                                    <option value="cybercrime">Cybercrime</option>
                                    <option value="fraud">Fraud</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Date of Incident</label>
                                <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Time of Incident</label>
                                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Detailed Description</h2>
                        <div className="form-group">
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">Submit FIR</button>
                    </div>
                </form>

                {firContent && (
                    <div className="fir-output" ref={firContentRef} style={{ color: 'black' }}>
                        <h2>Generated E-FIR</h2>
                        <pre>{firContent}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LegalGuidance;
