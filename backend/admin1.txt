import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './admindashboard.css';
import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaFileAlt,
  FaEnvelope,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import logo from '../assets/logo.png';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editItem, setEditItem] = useState(null); // {id, role, email}

  useEffect(() => {
    if (activeContent === 'users') fetchUsers();
    if (activeContent === 'staff') fetchStaff();
    setEditItem(null); // reset edit form when switching tabs
    setSearchTerm('');
  }, [activeContent]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost/land-office-system/backend/get_users.php');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await fetch('http://localhost/land-office-system/backend/get_staff.php');
      const data = await res.json();
      setStaff(data);
    } catch (err) {
      console.error('Failed to fetch staff:', err);
    }
  };

  const confirmLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#003366',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  const handleDelete = async (id, role) => {
    const confirmed = await Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#003366',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
    });

    if (confirmed.isConfirmed) {
      try {
        await fetch('http://localhost/land-office-system/backend/delete_user.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, role }),
        });

        role === 'user' ? fetchUsers() : fetchStaff();

        Swal.fire('Deleted!', 'The account has been deleted.', 'success');
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error!', 'Failed to delete the account.', 'error');
      }
    }
  };

  // Start editing user/staff
  const startEdit = (item, role) => {
    setEditItem({ ...item, role });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditItem(null);
  };

  // Save updated data
  const saveEdit = async () => {
    if (!editItem.email.trim()) {
      Swal.fire('Validation', 'Email cannot be empty', 'warning');
      return;
    }

    try {
      const endpoint =
        editItem.role === 'user'
          ? 'http://localhost/land-office-system/backend/update_user.php'
          : 'http://localhost/land-office-system/backend/update_staff.php';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editItem.id,
          email: editItem.email,
          // You can add other fields here if you want to edit them
        }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire('Success', 'Account updated successfully', 'success');
        setEditItem(null);

        // Refresh lists
        if (editItem.role === 'user') {
          fetchUsers();
        } else {
          fetchStaff();
        }
      } else {
        Swal.fire('Error', data.message || 'Update failed', 'error');
      }
    } catch (err) {
      console.error('Update failed:', err);
      Swal.fire('Error', 'Server error during update', 'error');
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toString().includes(searchTerm)
  );

  const filteredStaff = staff.filter(
    (s) =>
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toString().includes(searchTerm)
  );

  const renderTable = (data, role) => (
    <>
      <input
        type="text"
        placeholder="Search by email or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, email, created_at }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>
                {editItem && editItem.id === id && editItem.role === role ? (
                  <input
                    type="email"
                    value={editItem.email}
                    onChange={(e) =>
                      setEditItem((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                ) : (
                  email
                )}
              </td>
              <td>{created_at}</td>
              <td>
                {editItem && editItem.id === id && editItem.role === role ? (
                  <>
                    <button className="save-btn" onClick={saveEdit}>
                      <FaSave />
                    </button>
                    <button className="cancel-btn" onClick={cancelEdit}>
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => startEdit({ id, email, created_at }, role)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(id, role)}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  const renderMainContent = () => {
    switch (activeContent) {
      case 'dashboard':
        return (
          <>
            <h1>Welcome to Admin Dashboard</h1>
            <p>Use the menu to manage the system.</p>
          </>
        );
      case 'users':
        return (
          <>
            <h1>Registered Users</h1>
            {renderTable(filteredUsers, 'user')}
          </>
        );
      case 'staff':
        return (
          <>
            <h1>Staff Members</h1>
            {renderTable(filteredStaff, 'staff')}
          </>
        );
      case 'applications':
        return (
          <>
            <h1>All Applications</h1>
            <ul>
              <li>App #1001 - Deed - Pending</li>
              <li>App #1002 - Land Register - Completed</li>
            </ul>
          </>
        );
      case 'contacts':
        return (
          <>
            <h1>Contact Messages</h1>
            <ul>
              <li>John Doe: Inquiry about deed application.</li>
              <li>Jane Smith: Trouble with login.</li>
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
        <button className="sidebar-link" onClick={() => setActiveContent('users')}>
          <FaUsers className="icon" /> View Users
        </button>
        <button className="sidebar-link" onClick={() => setActiveContent('staff')}>
          <FaUserTie className="icon" /> View Staff
        </button>
        <button className="sidebar-link" onClick={() => setActiveContent('applications')}>
          <FaFileAlt className="icon" /> Applications
        </button>
        <button className="sidebar-link" onClick={() => setActiveContent('contacts')}>
          <FaEnvelope className="icon" /> Contacts
        </button>
        <button className="sidebar-link" onClick={confirmLogout}>
          <FaSignOutAlt className="icon" /> Logout
        </button>
      </aside>

      <main className="main-content">
        <div className="center-content">{renderMainContent()}</div>
      </main>
    </div>
  );
}

export default AdminDashboard;
