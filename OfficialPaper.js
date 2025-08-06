import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './officialpaper.css';

function OfficialPaper() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantAddress: '',
    nationalId: '',
    district: '',
    village: '',
    landName: '',
    extent: '',
    reason: '',
    division: '',
    volume: '',
    folio: ''
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
      const response = await fetch('http://localhost/land-office-system/backend/officialpaper.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.status === "success") {
        alert(result.message);
        navigate('/payment'); // Navigate to payment page on success
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
    <div className="officialpaper-container">
      <h1>Application for Official Papers</h1>
      <form onSubmit={handleSubmit} className="officialpaper-form">
        <div className="form-group">
          <label htmlFor="applicantName">Name of Applicant:</label>
          <input
            type="text"
            id="applicantName"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="applicantAddress">Address of Applicant:</label>
          <input
            type="text"
            id="applicantAddress"
            name="applicantAddress"
            value={formData.applicantAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nationalId">National Identity Card Number:</label>
          <input
            type="text"
            id="nationalId"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="district">District:</label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="village">Village:</label>
          <input
            type="text"
            id="village"
            name="village"
            value={formData.village}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="landName">Name of the Land:</label>
          <input
            type="text"
            id="landName"
            name="landName"
            value={formData.landName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="extent">Extent:</label>
          <input
            type="text"
            id="extent"
            name="extent"
            value={formData.extent}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reasons for Request of Extract:</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="division">Division:</label>
          <input
            type="text"
            id="division"
            name="division"
            value={formData.division}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="volume">Volume:</label>
          <input
            type="text"
            id="volume"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="folio">Folio:</label>
          <input
            type="text"
            id="folio"
            name="folio"
            value={formData.folio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="back-btn" onClick={handleBack}>Back</button>
        </div>
      </form>
    </div>
  );
}

export default OfficialPaper;

