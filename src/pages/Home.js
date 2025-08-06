import React from 'react';
import { Link } from 'react-router-dom'; // for navigation
import './home.css';
import logo from '../assets/logo.png'; // import logo image

const Home = () => {
  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">Land Office</div>
        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/register" title="Sign Up"><i className="fas fa-user"></i></Link>
          <a href="#notifications" title="Notifications"><i className="fas fa-bell"></i></a>
        </div>
      </nav>

      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Land Office Logo" className="logo" />
      </div>

      {/* Main Content */}
      <main className="main-content">
        <h1>Welcome to Land Office - Nikaweratiya</h1>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p><strong>Contact Us</strong></p>
        <p>Address: No.123, Main Street, Nikaweratiya</p>
        <p>Phone: 037-2223344</p>
        <p>Email: info@landoffice.lk</p>
      </footer>
    </div>
  );
}

export default Home;