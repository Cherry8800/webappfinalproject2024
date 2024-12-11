import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminContactPage = () => {
  const [forms, setForms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all contact forms
  const fetchForms = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assumes token is stored in localStorage
        },
      };

      const { data } = await axios.get('/api/contact-forms', config);
      setForms(data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Error fetching contact forms.'
      );
    }
  };

  // Delete a contact form
  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios.delete(`/api/contact-forms/${id}`, config);
      setForms(forms.filter((form) => form._id !== id)); // Remove deleted form from the list
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Error deleting the contact form.'
      );
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div>
      <h2>Contact Form Submissions</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {forms.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Submitted At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form._id}>
                <td>{form.name}</td>
                <td>{form.email}</td>
                <td>{form.message}</td>
                <td>{new Date(form.submittedAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDelete(form._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminContactPage;
