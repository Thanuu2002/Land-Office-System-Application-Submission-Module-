import React from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import './viewcontact.css';

function ViewContact() {
  const { state } = useLocation();
  const { message } = state || {};
  const navigate = useNavigate();

  const handleReply = () => {
    alert("Reply functionality can be added with email service integration.");
  };

  const handleBack = () => {
    // Navigate back to StaffDashboard with contact section active
    navigate('/staff-dashboard', { state: { section: 'contact' } });
  };

  return (
    <div className="view-contact-container">
      <h2>Message from: {message?.email}</h2>
      <p>{message?.message}</p>
      
      <div className="reply-section">
        <textarea placeholder="Type your reply here..." rows="6" />
        <div className="button-group">
          <button onClick={handleReply}>Send Reply</button>
          <button onClick={handleBack} className="back-button">Back</button>
        </div>
      </div>
    </div>
  );
}

export default ViewContact;


