import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './viewapplication.css';

const ViewApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { application, type } = location.state || {};
  const [status, setStatus] = useState(application?.status || '');

  const [deeds, setDeeds] = useState([]);
  const [landSearches, setLandSearches] = useState([]);
  const [officialPapers, setOfficialPapers] = useState([]);

  useEffect(() => {
    fetch('http://localhost/land-office-system/backend/get_deeds.php')
      .then((res) => res.json())
      .then((data) => setDeeds(data))
      .catch((err) => console.error(err));

    fetch('http://localhost/land-office-system/backend/get_landsearch.php')
      .then((res) => res.json())
      .then((data) => setLandSearches(data))
      .catch((err) => console.error(err));

    fetch('http://localhost/land-office-system/backend/get_officialpaper.php')
      .then((res) => res.json())
      .then((data) => setOfficialPapers(data))
      .catch((err) => console.error(err));
  }, []);

  const formatLabel = (label) =>
    label.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const handleUpdateStatus = useCallback(() => {
    if (!status) {
      Swal.fire('Warning', 'Please select a status before updating.', 'warning');
      return;
    }

    const endpointMap = {
      deed: 'update_deed_status.php',
      landsearch: 'update_landsearch_status.php',
      officialpaper: 'update_officialpaper_status.php',
    };

    const endpoint = endpointMap[type];
    if (!endpoint) {
      Swal.fire('Error', 'Invalid application type.', 'error');
      return;
    }

    fetch(`http://localhost/land-office-system/backend/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: application.id,
        status: status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          Swal.fire('Success', 'Status updated successfully.', 'success');
        } else {
          Swal.fire('Error', 'Failed to update status.', 'error');
        }
      })
      .catch(() => {
        Swal.fire('Error', 'An error occurred while updating.', 'error');
      });
  }, [status, application?.id, type]);

  if (!application || !type) {
    return <div className="view-application-container"><p>No application data found.</p></div>;
  }

  return (
    <div className="view-application-container">
      <h2>Application Details</h2>
      <div className="application-details">
        {Object.entries(application).map(([key, value]) => (
          <div key={key} className="detail-row">
            <strong>{formatLabel(key)}:</strong> {value}
          </div>
        ))}
      </div>

      <div className="status-section">
        <label htmlFor="status">Update Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button onClick={handleUpdateStatus}>Update</button>
      </div>

      <div className="all-applications">
        <h3>All Deed Applications</h3>
        {deeds.length === 0 ? (
          <p>No deed applications found.</p>
        ) : (
          <ul>
            {deeds.map((d) => (
              <li key={d.id}>
                {d.name} - {d.deed_number} - Status: {d.status}
              </li>
            ))}
          </ul>
        )}

        <h3>All Land Search Applications</h3>
        {landSearches.length === 0 ? (
          <p>No land search applications found.</p>
        ) : (
          <ul>
            {landSearches.map((l) => (
              <li key={l.id}>
                {l.village} - {l.land_name} - Status: {l.status}
              </li>
            ))}
          </ul>
        )}

        <h3>All Official Paper Applications</h3>
        {officialPapers.length === 0 ? (
          <p>No official paper applications found.</p>
        ) : (
          <ul>
            {officialPapers.map((o) => (
              <li key={o.id}>
                {o.applicant_name} - {o.land_name} - Status: {o.status}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
};

export default ViewApplication;
