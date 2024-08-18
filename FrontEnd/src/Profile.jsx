import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const goOut = () => {
    localStorage.removeItem('username'); // Remove username from localStorage on logout
    navigate('/');
  };
  const goup = () => {
    navigate('/updatepass');
  };

  return (
    <div>
      {!showProfile && (
        <button className="profile-button" onClick={toggleProfile}>Profile</button>
      )}
      <div className={`profile-sidebar ${showProfile ? 'open' : ''}`}>
        <div className="profile-content">
          <button className="close-button" onClick={toggleProfile}>X</button>
          <img src="data:image/jpeg;base64,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" alt="" className="profile-photo" />
          <p>{username}</p>
          <button className='tg' onClick={goup}>Update Password</button>
          <button onClick={goOut}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
