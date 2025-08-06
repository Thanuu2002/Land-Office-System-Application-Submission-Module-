import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcoded login for admin only
    if (email === 'admin@gmail.com' && password === 'admin@123' && role === 'admin') {
      localStorage.setItem('role', 'admin');
      localStorage.setItem('email', email);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Redirecting...',
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 1500);

      return;
    }

    // Login for user and staff via backend
    try {
      const response = await fetch('http://localhost/land-office-system/backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('role', data.role);
        localStorage.setItem('email', data.email);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Redirecting...',
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          if (data.role === 'user') {
            navigate('/user-dashboard');
          } else if (data.role === 'staff') {
            navigate('/staff-dashboard');
          }
        }, 1500);

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.message || 'Please check your credentials.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Please try again later.',
      });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

