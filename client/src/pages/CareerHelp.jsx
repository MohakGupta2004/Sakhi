import React, { useState } from 'react';
import { Search, Briefcase, Building2, MapPin, Clock, CheckCircle } from 'lucide-react';
import "../styles/career.css"

function CareerHelp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "FemTech Solutions",
      position: "Senior Software Engineer",
      location: "Remote",
      type: "Full-time",
      image: "https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?auto=format&fit=crop&q=80&w=200",
      applied: false
    },
    {
      id: 3,
      company: "EmpowerHer Tech",
      position: "UX Designer",
      location: "San Francisco, CA",
      type: "Contract",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=200",
      applied: false
    },
    {
      id: 4,
      company: "GirlBoss Startup",
      position: "Marketing Director",
      location: "London, UK",
      type: "Full-time",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=200",
      applied: false
    }
  ]);

  const handleApply = (jobId) => {
    setJobs(jobs.map(job => job.id === jobId ? { ...job, applied: true } : job));
  };

  const filteredJobs = jobs.filter(job => 
    job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const appliedJobs = jobs.filter(job => job.applied);
  const availableJobs = filteredJobs.filter(job => !job.applied);

  return (
    <div className="job-listing">
      <div className="container-wrapper">
        <h1 className="page-title">Career Help</h1>
        
        <div className="section-layout">
          <div className="applied-jobs">
            <div className="card">
              <h2 className="section-title">
                <CheckCircle className="icon" />
                Applied Jobs
              </h2>
              <div>
                {appliedJobs.map(job => (
                  <div key={job.id} className="applied-job-card">
                    <div className="applied-job-content">
                      <img src={job.image} alt={job.company} className="applied-company-image" />
                      <div>
                        <h3 className="job-title">{job.position}</h3>
                        <p>{job.company}</p>
                        <p className="applied-status">Application Submitted</p>
                      </div>
                    </div>
                  </div>
                ))}
                {appliedJobs.length === 0 && (
                  <p className="empty-state">No applications yet</p>
                )}
              </div>
            </div>
          </div>

          <div className="available-jobs">
            <div className="card">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search for jobs..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                {availableJobs.map(job => (
                  <div key={job.id} className="job-card">
                    <div className="job-card-content">
                      <img src={job.image} alt={job.company} className="company-image" />
                      <div className="job-info">
                        <h3 className="job-title">{job.position}</h3>
                        <div className="job-details">
                          <span className="detail-item">
                            <Building2 className="icon" />
                            {job.company}
                          </span>
                          <span className="detail-item">
                            <MapPin className="icon" />
                            {job.location}
                          </span>
                          <span className="detail-item">
                            <Clock className="icon" />
                            {job.type}
                          </span>
                      <button
                        onClick={() => handleApply(job.id)}
                        className="apply-button"
                      >
                        <Briefcase className="icon" />
                        Apply Now
                      </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {availableJobs.length === 0 && (
                  <p className="empty-state">No jobs found matching your search</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerHelp;
