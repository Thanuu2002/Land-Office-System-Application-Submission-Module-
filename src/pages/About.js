import React, { useEffect } from 'react';
import './about.css'; // Assuming the CSS file is still the same

const About = () => {

  useEffect(() => {
    // Fade in sections when scrolling
    const faders = document.querySelectorAll('.fade-in-section');

    const appearOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add('is-visible');
          appearOnScroll.unobserve(entry.target);
        }
      });
    }, appearOptions);

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });

  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">Land Office</div>
        <div className="nav-right">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact Us</a>
          <a href="/register" title="Sign Up"><i className="fas fa-user"></i></a>
          <a href="#notifications" title="Notifications"><i className="fas fa-bell"></i></a>
        </div>
      </nav>

      {/* About Main Content */}
      <main className="about-content">
        <h1>About Us</h1>
        <p>Welcome to the Land Office - Nikaweratiya! We are dedicated to providing efficient, reliable, and transparent land-related services to our community.</p>

        <div className="section fade-in-section">
          <h2>Who We Are</h2>
          <p>We are a government office specializing in land registrations, deed verifications, and property documentation services. Our dedicated staff ensures that all processes are conducted legally, securely, and smoothly for all citizens.</p>
        </div>

        <div className="section fade-in-section">
          <h2>Our Mission</h2>
          <p>Our mission is to simplify land services for the public through modern technology, accurate record-keeping, and outstanding customer support.</p>
        </div>

        <div className="section fade-in-section">
          <h2>Our Vision</h2>
          <p>To be a trusted and leading land service provider, ensuring property rights are protected and processes are accessible to all.</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer" id="contact">
        <p><strong>Contact Us</strong></p>
        <p>Address: No.123, Main Street, Nikaweratiya</p>
        <p>Phone: 037-2223344</p>
        <p>Email: info@landoffice.lk</p>
      </footer>
    </div>
  );
};

export default About;