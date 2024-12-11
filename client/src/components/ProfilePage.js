import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProfilePage.css'; 

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    bio: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${apiBaseUrl}/api/users/profile`, {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
        });
        setProfile(data);
      } catch (err) {
        setError('Error fetching profile. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await axios.put(`${apiBaseUrl}/api/users/profile`, profile, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      alert('Profile updated successfully');
    } catch (err) {
      setError('Error updating profile. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={updateProfile}>
          {['name', 'email', 'password', 'phone', 'address', 'bio'].map((field) => (
            <div key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={profile[field]}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button type="submit">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
