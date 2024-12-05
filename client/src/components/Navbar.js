import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Logo1 from '../assets/logo1.JPG';

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <div>
        <img src={Logo1} alt="QueueBy6 Logo" className="app-logo" />
        <span className="navbar-logoword">QUEUECARE</span>
      </div>
        
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {userInfo ? (
          <>
            {userInfo.role === 'admin' ? (
              <>
                <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                <li><Link to="/admin/users">User List</Link></li>
                <li><Link to="/admin/services">Admin Service List</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/profile">MyProfile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/services">Service List</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </>
            )}
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   const handleLogout = () => {
//     localStorage.removeItem('userInfo');
//     window.location.href = '/';
//   };

//   return (
//     <nav>
//       <Link to="/">Home</Link>
//       {userInfo ? (
//         <>
//           {userInfo.role === 'admin' ? (
//             <>
//               <Link to="/admin/dashboard">Admin Dashboard</Link>
//               <Link to="/admin/users">User List</Link>
//               <Link to="/admin/services">Admin Service List</Link>
//               <Link to="/contact">Contact</Link> {/* Move Contact here */}
//             </>
//           ) : (
//             <>
//               <Link to="/profile">MyProfile</Link>
//               <Link to="/dashboard">Dashboard</Link>
//               <Link to="/services">Service List</Link>
//               <Link to="/contact">Contact</Link> {/* Keep Contact here for regular users */}
//             </>
//           )}
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <Link to="/signup">Signup</Link>
//           <Link to="/login">Login</Link>
//           <Link to="/contact">Contact</Link> {/* Keep Contact here for non-logged-in users */}
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

