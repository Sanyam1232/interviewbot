import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const fileInputRef = useRef(null);

  const handleUploadResume = () => {
    // Trigger click on file input
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Handle the selected file here (e.g., upload to server)
    console.log('Selected file:', selectedFile);
  };

  return (
    <nav className="navigation">
      <div className="left-buttons">
        <button className="upload-button" onClick={handleUploadResume}>Upload Resume</button>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Link to="/" className="nav-link">Job Descriptions</Link>
      </div>
    </nav>
  );
};

export default Navigation;
