import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactForm = ({ isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setErrorMessage('You must log in to submit the form.');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assumes token is stored in localStorage
        },
      };

      await axios.post('/api/contact-forms/submit', formData, config);
      setSuccessMessage('Form submitted successfully!');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Error submitting the form.'
      );
    }
  };

  return (
    <div>
      <h2>Contact Us</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isAuthenticated}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isAuthenticated}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={!isAuthenticated}
            required
          />
        </div>
        <button type="submit" disabled={!isAuthenticated}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
