import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin dashboard! Use the links below to manage users and services.</p>
      <ul>
        <li><Link to="/admin/users">Manage Users</Link></li>
        <li><Link to="/admin/services">Manage Services</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboardPage;