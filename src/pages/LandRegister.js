import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landsearch.css';

function LandRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personType: '',
    reason: '',
    village: '',
    landName: '',
    extent: '',
    korale: '',
    pattu: '',
    gnDivision: '',
    dsDivision: '',
    volNo: '',
    folioNo: ''
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
      const response = await fetch('http://localhost/land-office-system/backend/landsearch.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.status === "success") {
        alert(result.message);
        navigate('/payment');  // Navigate immediately on success
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
    <div className="land-register-container">
      <h1>Application for Land Search</h1>
      <form onSubmit={handleSubmit} className="land-register-form">
        <div className="form-group">
          <label htmlFor="personType">Notary Public / Owner of Land / Representative of Owner:</label>
          <input
            type="text"
            id="personType"
            name="personType"
            value={formData.personType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reasons for Search of Land Registers:</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="village">Village where the Land is Located:</label>
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
          <label htmlFor="korale">Korale:</label>
          <input
            type="text"
            id="korale"
            name="korale"
            value={formData.korale}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pattu">Pattu:</label>
          <input
            type="text"
            id="pattu"
            name="pattu"
            value={formData.pattu}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gnDivision">GN Division:</label>
          <input
            type="text"
            id="gnDivision"
            name="gnDivision"
            value={formData.gnDivision}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dsDivision">DS Division:</label>
          <input
            type="text"
            id="dsDivision"
            name="dsDivision"
            value={formData.dsDivision}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="volNo">Vol. No:</label>
          <input
            type="text"
            id="volNo"
            name="volNo"
            value={formData.volNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="folioNo">Folio No:</label>
          <input
            type="text"
            id="folioNo"
            name="folioNo"
            value={formData.folioNo}
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

export default LandRegister;



