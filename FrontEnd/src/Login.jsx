import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:8080/api/login', {
        params: { username, password }
      });

      if (response.data) {
        localStorage.setItem('username', username); // Store username in localStorage
        navigate('/home');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };
  
  return (
    <div className="login-container">
    <div className='hii'>
    <dotlottie-player src="https://lottie.host/cac5dddf-95e9-4fb5-973c-bc2e86ad6aa6/jvNhgIPF0q.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
    </div>
    <form className="login-form" onSubmit={handleLogin}>
    <h2>Ｌｏｇｉｎ</h2>
    <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    />
    <input
    type="password"
    placeholder="Password"
    value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ｌｏｇｉｎ</button>
        <div className="signup-link">
          <p>Don't have an account?</p>
          <a onClick={handleSignup}>Sign Up</a>
        </div>
        </form>
    </div>
  );
};

export default LoginPage;
