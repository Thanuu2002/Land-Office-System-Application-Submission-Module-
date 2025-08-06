import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './deeds.css';

function Deeds() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    nid: '',
    deedNumber: '',
    attestationDate: '',
    notaryName: '',
    notaryAddress: '',
    otherDocument: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/land-office-system/backend/deed.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Application submitted successfully.');
        navigate('/payment');
      } else {
        alert('Submission failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const handleBack = () => {
    navigate('/user-dashboard');
  };

  return (
    <div className="deeds-container">
      <h1 className="form-title">Application for Copies of Deeds</h1>
      <form onSubmit={handleSubmit} className="deeds-form">
        <div className="form-group">
          <label htmlFor="name">Name of Applicant:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address of Applicant:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="nid">National Identity Card Number:</label>
          <input type="text" id="nid" name="nid" value={formData.nid} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="deedNumber">Deed Number:</label>
          <input type="text" id="deedNumber" name="deedNumber" value={formData.deedNumber} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="attestationDate">Date of Deed Attestation:</label>
          <input type="date" id="attestationDate" name="attestationDate" value={formData.attestationDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="notaryName">Name of Notary Public:</label>
          <input type="text" id="notaryName" name="notaryName" value={formData.notaryName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="notaryAddress">Address of Notary Public:</label>
          <input type="text" id="notaryAddress" name="notaryAddress" value={formData.notaryAddress} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="otherDocument">If Other Document, Details:</label>
          <input type="text" id="otherDocument" name="otherDocument" value={formData.otherDocument} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason for Request of Copy:</label>
          <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} required></textarea>
        </div>

        <div className="button-group">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="back-btn" onClick={handleBack}>Back</button>
        </div>
      </form>
    </div>
  );
}

export default Deeds;

