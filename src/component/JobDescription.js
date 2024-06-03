import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobDescription.css';

const JobDescription = () => {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState('');
  
  const jobSuggestions = [
    'Software Engineer',
    'Data Scientist',
    'Python Developer',
    'UI/UX',
    'Frontend Developer',
    // Add more job suggestions as needed
  ];

  const handleJobSelect = () => {
    // Navigate to the interview page with the selected job description
    navigate('/interview', { state: { jobDescription } });
  };

  return (
    <div className="job-description">
      <h2>Enter Job Description</h2>
      <div className="job-suggestions">
        <p>Suggested Jobs:</p>
        <ul>
          {jobSuggestions.map((job, index) => (
            <li key={index} onClick={() => setJobDescription(job)}>{job}</li>
          ))}
        </ul>
      </div>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Enter job description..."
        rows="5"
        cols="50"
      ></textarea>
      <button onClick={handleJobSelect}>Start Interview</button>
    </div>
  );
};

export default JobDescription;
