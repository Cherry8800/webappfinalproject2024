import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import Dashboard from './components/Dashboard';
import ContactPage from './components/ContactPage';
import UserListPage from './components/UserListPage';
import AdminServiceListPage from './components/AdminServiceListPage';
import ServiceListPage from './components/ServiceListPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import ContactForm from '../../server/models/ContactForm';
import AdminContactPage from './components/AdminContactPage';
import { useSelector } from 'react-redux';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/users" element={<ProtectedRoute role="admin"><UserListPage /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute role="admin"><AdminServiceListPage /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><ServiceListPage /></ProtectedRoute>} />
        <Route path="/contact" element={<ContactForm isAuthenticated={isAuthenticated} />}/>
        <Route path="/admin/contact-forms"element={
    isAdmin ? (
      <AdminContactPage />
    ) : (
      <Navigate to="/" replace />
    )
  }
/>
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboardPage /></ProtectedRoute>} /> {/* Add AdminDashboardPage route */}
      </Routes>
    </>
  );
};

export default App;
