import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {userInfo ? (
        <>
          {userInfo.role === 'admin' ? (
            <>
              <Link to="/admin/dashboard">Admin Dashboard</Link>
              <Link to="/admin/users">User List</Link>
              <Link to="/admin/services">Admin Service List</Link>
              <Link to="/contact">Contact</Link> {/* Move Contact here */}
            </>
          ) : (
            <>
              <Link to="/profile">MyProfile</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/services">Service List</Link>
              <Link to="/contact">Contact</Link> {/* Keep Contact here for regular users */}
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/contact">Contact</Link> {/* Keep Contact here for non-logged-in users */}
        </>
      )}
    </nav>
  );
};

export default Navbar;

