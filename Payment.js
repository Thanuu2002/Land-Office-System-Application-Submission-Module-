import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './payment.css';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    amount: '',
    userId: 1 // Replace with actual user ID, maybe from logged-in user state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData to send data to backend
    const paymentData = new FormData();
    paymentData.append('user_id', formData.userId);
    paymentData.append('card_number', formData.cardNumber);
    paymentData.append('card_name', formData.cardName);
    paymentData.append('expiry_date', formData.expiryDate);
    paymentData.append('cvv', formData.cvv);
    paymentData.append('amount', formData.amount);

    // Make the POST request to payment.php
    fetch('http://localhost/land-office-system/backend/payment.php', {
      method: 'POST',
      body: paymentData
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          Swal.fire({
            title: 'Payment Successful!',
            text: 'Your payment has been processed successfully.',
            icon: 'success',
            confirmButtonText: 'Back to Dashboard',
            confirmButtonColor: '#004080'
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirect to user dashboard after payment success
              navigate('/user-dashboard');
            }
          });
        } else {
          Swal.fire({
            title: 'Payment Failed',
            text: data.message,
            icon: 'error',
            confirmButtonText: 'Retry'
          });
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: 'There was an error processing your payment. Please try again.',
          icon: 'error',
          confirmButtonText: 'Close'
        });
      });
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>
      <p>Pay via Credit Card or Debit Card</p>

      <form id="paymentForm" onSubmit={handleSubmit}>
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          required
          maxLength="19"
        />

        <label htmlFor="cardName">Name on Card</label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={formData.cardName}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />

        <label htmlFor="expiryDate">Expiry Date</label>
        <input
          type="text"
          id="expiryDate"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          placeholder="MM/YY"
          required
          maxLength="5"
        />

        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          placeholder="123"
          required
          maxLength="4"
        />

        <label htmlFor="amount">Amount (LKR)</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          required
        />
      </form>

      <div className="button-container">
        <button type="submit" form="paymentForm" className="pay-now-btn">Pay Now</button>
        <button onClick={() => navigate('/user-dashboard')} className="back-btn">Back</button>
      </div>
    </div>
  );
}

export default Payment;
