import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('userInfo');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { email, password });
      const data = response.data;
      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate(data.role === 'admin' ? '/admin/dashboard' : '/dashboard');
        window.location.reload(); // Refresh the page
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/LoginPage.css';

// // Using environment variable for API base URL
// const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${apiBaseUrl}/api/users/login`, { email, password });
//       const data = response.data;
//       if (data) {
//         localStorage.setItem('userInfo', JSON.stringify(data));
//         navigate(data.role === 'admin' ? '/admin/dashboard' : '/dashboard');
//         window.location.reload(); // Refresh the page
//       } else {
//         alert('Login failed. Please check your credentials.');
//       }
//     } catch (error) {
//       console.error('Error during login', error);
//       alert('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <button type="submit">Log In</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;