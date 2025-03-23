import React, { useState } from 'react';
import { Search, Briefcase, Building2, MapPin, Clock, CheckCircle } from 'lucide-react';
import "../styles/ngo.css"

function NGOHelp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      organization: "Helping Hands",
      role: "Community Volunteer",
      location: "Remote",
      type: "Part-time",
      image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&q=80&w=200",
      applied: false
    },
    {
      id: 2,
      organization: "Green Earth",
      role: "Environmental Activist",
      location: "New York, NY",
      type: "Full-time",
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=200",
      applied: false
    },
    {
      id: 3,
      organization: "EduForAll",
      role: "Teaching Assistant",
      location: "San Francisco, CA",
      type: "Contract",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=200",
      applied: false
    }
  ]);

  const handleApply = (opportunityId) => {
    setOpportunities(opportunities.map(opp => opp.id === opportunityId ? { ...opp, applied: true } : opp));
  };

  const filteredOpportunities = opportunities.filter(opp => 
    opp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const appliedOpportunities = opportunities.filter(opp => opp.applied);
  const availableOpportunities = filteredOpportunities.filter(opp => !opp.applied);

  return (
    <div className="opportunity-listing">
      <div className="container-wrapper">
        <h1 className="page-title">NGO Volunteer Opportunities</h1>
        
        <div className="section-layout">
          <div className="applied-opportunities scrollable-container">
            <div className="card">
              <h2 className="section-title">
                <CheckCircle className="icon" />
                Applied Opportunities
              </h2>
              <div>
                {appliedOpportunities.map(opp => (
                  <div key={opp.id} className="applied-opportunity-card">
                    <div className="applied-opportunity-content">
                      <img src={opp.image} alt={opp.organization} className="applied-organization-image" />
                      <div>
                        <h3 className="opportunity-title">{opp.role}</h3>
                        <p>{opp.organization}</p>
                        <p className="applied-status">Application Submitted</p>
                      </div>
                    </div>
                  </div>
                ))}
                {appliedOpportunities.length === 0 && (
                  <p className="empty-state">No applications yet</p>
                )}
              </div>
            </div>
          </div>

          <div className="available-opportunities scrollable-container">
            <div className="card">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search for opportunities..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                {availableOpportunities.map(opp => (
                  <div key={opp.id} className="opportunity-card">
                    <div className="opportunity-card-content">
                      <img src={opp.image} alt={opp.organization} className="organization-image" />
                      <div className="opportunity-info">
                        <h3 className="opportunity-title">{opp.role}</h3>
                        <div className="opportunity-details">
                          <span className="detail-item">
                            <Building2 className="icon" />
                            {opp.organization}
                          </span>
                          <span className="detail-item">
                            <MapPin className="icon" />
                            {opp.location}
                          </span>
                          <span className="detail-item">
                            <Clock className="icon" />
                            {opp.type}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleApply(opp.id)}
                        className="apply-button"
                      >
                        <Briefcase className="icon" />
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
                {availableOpportunities.length === 0 && (
                  <p className="empty-state">No opportunities found matching your search</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NGOHelp;
