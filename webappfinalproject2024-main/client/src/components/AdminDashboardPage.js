import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboardPage.css';

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin dashboard!</p>
      <ul className="admin-dashboard-links">
        <li><Link to="/admin/users">Manage Users</Link></li>
        <li><Link to="/admin/services">Manage Services</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboardPage;
