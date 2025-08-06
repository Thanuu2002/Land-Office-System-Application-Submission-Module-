import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email && message) {
      try {
        const response = await fetch('http://localhost/land-office-system/backend/contact.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, message }),
        });

        const result = await response.json();

        if (result.status === 'success') {
          setFeedback('Message sent successfully!');
          setEmail('');
          setMessage('');
        } else {
          setFeedback('Error: ' + result.message);
        }
      } catch (error) {
        setFeedback('An error occurred while sending the message.');
      }
    } else {
      setFeedback('Please fill out all fields.');
    }
  };

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

      {/* Contact Section */}
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>Have any questions? Feel free to message us!</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>

        {/* Feedback Message */}
        {feedback && <p className="feedback">{feedback}</p>}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p><strong>Land Office - Nikaweratiya</strong></p>
        <p>Address: No.123, Main Street, Nikaweratiya</p>
        <p>Phone: 037-2223344</p>
        <p>Email: info@landoffice.lk</p>
      </footer>
    </div>
  );
};

export default Contact;
