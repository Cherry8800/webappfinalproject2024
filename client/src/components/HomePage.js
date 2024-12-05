import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg'; // Adjust the import based on your file structure
import '../styles/HomePage.css'; // Import the CSS file

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

// import React from 'react';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   return (
//     <div>
//       <h1>Welcome to the Website Schedule Managing System</h1>
//       <p>Manage your appointments and schedules easily!</p>
//       {!userInfo && (
//         <>
//           <Link to="/signup"><button>Sign Up</button></Link>
//           <Link to="/login"><button>Log In</button></Link>
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;