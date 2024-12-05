import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
        });
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error('Error fetching profile', error);
        alert('Error fetching profile');
      }
    };
    fetchProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/users/profile', { name, email, password }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Error updating profile');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={updateProfile}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ProfilePage = () => {
//   const [profile, setProfile] = useState({});
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:5000/api/users/profile', {
//           headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//         });
//         setProfile(data);
//         setName(data.name);
//         setEmail(data.email);
//       } catch (error) {
//         console.error('Error fetching profile', error);
//         alert('Error fetching profile');
//       }
//     };
//     fetchProfile();
//   }, []);

//   const updateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put('http://localhost:5000/api/users/profile', { name, email, password }, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       alert('Profile updated successfully');
//     } catch (error) {
//       console.error('Error updating profile', error);
//       alert('Error updating profile');
//     }
//   };

//   return (
//     <div>
//       <h2>My Profile</h2>
//       <form onSubmit={updateProfile}>
//         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit">Update Profile</button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;