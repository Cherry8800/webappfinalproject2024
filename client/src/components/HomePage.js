import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div>
      <h1>Welcome to the Website Schedule Managing System</h1>
      <p>Manage your appointments and schedules easily!</p>
      {!userInfo && (
        <>
          <Link to="/signup"><button>Sign Up</button></Link>
          <Link to="/login"><button>Log In</button></Link>
        </>
      )}
    </div>
  );
};

export default HomePage;