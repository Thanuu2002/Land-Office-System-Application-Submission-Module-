import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import './staffdashboard.css';
import { FaTachometerAlt, FaFileAlt, FaPhone, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeContent, setActiveContent] = useState('dashboard');
  const [selectedType, setSelectedType] = useState('');
  const [deeds, setDeeds] = useState([]);
  const [landSearches, setLandSearches] = useState([]);
  const [officialPapers, setOfficialPapers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (location.state?.section) {
      setActiveContent(location.state.section);
      setSelectedType('');
    }
  }, [location.state]);

  useEffect(() => {
    fetch('http://localhost/land-office-system/backend/get_deeds.php')
      .then((res) => res.json())
      .then((data) => setDeeds(data));

    fetch('http://localhost/land-office-system/backend/get_landsearch.php')
      .then((res) => res.json())
      .then((data) => setLandSearches(data));

    fetch('http://localhost/land-office-system/backend/get_officialpaper.php')
      .then((res) => res.json())
      .then((data) => setOfficialPapers(data));

    fetch('http://localhost/land-office-system/backend/get_contact.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setMessages(data.data);
        }
      });
  }, []);

  const confirmLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
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

  const handleViewApplication = (app, type) => {
    navigate('/view-application', { state: { application: app, type } });
  };

  const handleViewMessage = (msg) => {
    navigate('/view-contact', { state: { message: msg } });
  };

  const renderSubmittedApplications = () => {
    if (!selectedType) {
      return (
        <>
          <h1>Select Application Type</h1>
          <div className="application-buttons">
            <button className="application-btn" onClick={() => setSelectedType('deed')}>
              View Deed Applications
            </button>
            <button className="application-btn" onClick={() => setSelectedType('landsearch')}>
              View Land Search Applications
            </button>
            <button className="application-btn" onClick={() => setSelectedType('officialpaper')}>
              View Official Paper Applications
            </button>
          </div>
        </>
      );
    }

    const backButton = (
      <button className="back-btn" onClick={() => setSelectedType('')}>
        ← Back to Application Type Selection
      </button>
    );

    if (selectedType === 'deed') {
      return (
        <>
          {backButton}
          <h3>Deed Applications</h3>
          {deeds.length === 0 ? (
            <p>No deed applications found.</p>
          ) : (
            <ul>
              {deeds.map((deed) => (
                <li key={deed.id}>
                  {deed.name} - {deed.deed_number} - Status: {deed.status}
                  <button onClick={() => handleViewApplication(deed, 'deed')}>View</button>
                </li>
              ))}
            </ul>
          )}
        </>
      );
    }

    if (selectedType === 'landsearch') {
      return (
        <>
          {backButton}
          <h3>Land Search Applications</h3>
          {landSearches.length === 0 ? (
            <p>No land search applications found.</p>
          ) : (
            <ul>
              {landSearches.map((app) => (
                <li key={app.id}>
                  {app.village} - {app.land_name} - Status: {app.status}
                  <button onClick={() => handleViewApplication(app, 'landsearch')}>View</button>
                </li>
              ))}
            </ul>
          )}
        </>
      );
    }

    if (selectedType === 'officialpaper') {
      return (
        <>
          {backButton}
          <h3>Official Paper Applications</h3>
          {officialPapers.length === 0 ? (
            <p>No official paper applications found.</p>
          ) : (
            <ul>
              {officialPapers.map((paper) => (
                <li key={paper.id}>
                  {paper.applicant_name} - {paper.land_name} - Status: {paper.status}
                  <button onClick={() => handleViewApplication(paper, 'officialpaper')}>View</button>
                </li>
              ))}
            </ul>
          )}
        </>
      );
    }

    return null;
  };

  const renderMainContent = () => {
    switch (activeContent) {
      case 'dashboard':
        return (
          <>
            <h1>Welcome to Staff Dashboard</h1>
            <p>Use the menu to view and manage applications.</p>
          </>
        );
      case 'submittedApplications':
        return renderSubmittedApplications();
      case 'contact':
        return (
          <>
            <h1>Contact Messages</h1>
            {messages.length === 0 ? (
              <p>No contact messages found.</p>
            ) : (
              <ul>
                {messages.map((msg) => (
                  <li key={msg.id}>
                    {msg.email}
                    <button onClick={() => handleViewMessage(msg)}>View</button>
                  </li>
                ))}
              </ul>
            )}
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
        <button className="sidebar-link" onClick={() => { setActiveContent('dashboard'); setSelectedType(''); }}>
          <FaTachometerAlt className="icon" /> Dashboard
        </button>
        <button className="sidebar-link" onClick={() => { setActiveContent('submittedApplications'); setSelectedType(''); }}>
          <FaFileAlt className="icon" /> Submitted Applications
        </button>
        <button className="sidebar-link" onClick={() => setActiveContent('contact')}>
          <FaPhone className="icon" /> Contact
        </button>
        <button className="sidebar-link" onClick={confirmLogout}>
          <FaSignOutAlt className="icon" /> Logout
        </button>
      </aside>

      <main className="main-content" id="main-content">
        <div className="center-content">{renderMainContent()}</div>
      </main>
    </div>
  );
};

export default StaffDashboard;
