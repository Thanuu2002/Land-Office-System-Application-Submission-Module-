import React, { useState, useEffect } from 'react';

function Status() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = atob(token).split(':');
        const user_id = decodedToken[0];

        const response = await fetch(`/backend/fetch_user_applications.php?user_id=${user_id}`);
        const data = await response.json();

        if (response.ok) {
          setApplications(data);
        } else {
          setError(data.error || 'Failed to fetch applications');
        }
      } catch (error) {
        setError('Network error');
      }
    };

    fetchApplications();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h2>Application Status</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {applications.length === 0 && !error && <p>No applications found.</p>}
      {applications.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Submitted Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.type}</td>
                <td>{app.status}</td>
                <td>{app.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Status;
