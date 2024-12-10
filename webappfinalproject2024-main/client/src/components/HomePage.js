import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
import '../styles/HomePage.css';

const HomePage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className="home-page">
      <header className="home-header">
        <img src={Logo} alt="QueueBy6 Logo" className="app-logo" />
        <h1>Welcome to the Schedule Managing System!</h1>
        <p>Your efficient solution for scheduling patient appointments.</p>
      </header>
      <div className="hero-section">
        {!userInfo && (
          <>
            <Link to="/signup">
              <button className="hero-button">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="hero-button">Log In</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
