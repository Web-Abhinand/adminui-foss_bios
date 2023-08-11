// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/admin/admin-login', {
      email,
      password,
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('adminToken', token); // Save the admin token in localStorage
        navigate('/admin-dashboard');
      }
    }).catch((err) => {
      console.log(err);
    });
    console.log('Login: ', email, password);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        Don't have an account? <Link to="/">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
