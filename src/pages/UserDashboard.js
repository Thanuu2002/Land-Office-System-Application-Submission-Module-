import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './userdashboard.css';
import { FaTachometerAlt, FaFileAlt, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';

function UserDashboard() {
  const navigate = useNavigate();

  // Manage which content to show inside main content area
  const [activeContent, setActiveContent] = useState('dashboard'); // default view

  const confirmLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#003366',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  const handleApplicationSelect = (applicationType) => {
    if (applicationType === 'deed') {
      navigate('/deeds');
    } else if (applicationType === 'land_register') {
      navigate('/landregister');
    } else if (applicationType === 'official_paper') {
      navigate('/officialpaper');
    }
  };

  // Render different main content based on activeContent state
  const renderMainContent = () => {
    switch (activeContent) {
      case 'dashboard':
        return (
          <>
            <h1>Welcome to Your Dashboard</h1>
            <p>Use the menu to navigate through your options.</p>
          </>
        );
      case 'submitApplication':
        return (
          <>
            <h1>Select Application Type</h1>
            <p>Please select the type of application you want to submit:</p>
            <div className="application-buttons">
              <button className="application-btn" onClick={() => handleApplicationSelect('deed')}>
                Application for Copies of Deeds
              </button>
              <button className="application-btn" onClick={() => handleApplicationSelect('land_register')}>
                Application for Land Registers
              </button>
              <button className="application-btn" onClick={() => handleApplicationSelect('official_paper')}>
                Application for Official Papers
              </button>
            </div>
          </>
        );
      case 'status':
        return (
          <>
            <h1>Your Application Status</h1>
            <p>Here you can view the status of your submitted applications.</p>
            {/* You can replace below with real data fetched from backend */}
            <ul>
              <li>Application #12345 - Pending</li>
              <li>Application #12346 - Approved</li>
              <li>Application #12347 - Rejected</li>
            </ul>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo-section">
          <img src={logo} alt="Land Office Logo" className="logo" />
          <h2>Land Office</h2>
        </div>
        <button className="sidebar-link" onClick={() => setActiveContent('dashboard')}>
          <FaTachometerAlt className="icon" /> Dashboard
        </button>
        <button className="sidebar-link" onClick={() => setActiveContent('submitApplication')}>
          <FaFileAlt className="icon" /> Submit Application
        </button>
        <button className="sidebar-link" onClick={() => setActiveContent('status')}>
          <FaInfoCircle className="icon" /> Status
        </button>
        <button className="sidebar-link" onClick={confirmLogout}>
          <FaSignOutAlt className="icon" /> Logout
        </button>
      </aside>

      <main className="main-content" id="main-content">
        <div className="center-content">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;
