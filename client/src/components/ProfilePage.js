import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProfilePage.css'; 

// Using environment variable for API base URL
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${apiBaseUrl}/api/users/profile`, {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
        });
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone || ''); // Set phone if available
        setAddress(data.address || ''); // Set address if available
        setBio(data.bio || ''); // Set bio if available
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
<<<<<<< HEAD
      await axios.put('http://localhost:5000/api/users/profile', 
        { name, email, password, phone, address, bio }, 
        {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
        }
      );
=======
      await axios.put(`${apiBaseUrl}/api/users/profile`, { name, email, password }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
>>>>>>> a243ec7ba11702a092a25f560a395d795a3de179
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Error updating profile');
    }
  };

  return (
    <div className="profile-container">
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
        <div>
          <label>Phone</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
