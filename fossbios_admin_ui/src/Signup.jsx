// src/components/AdminSignup.jsx
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AdminSignup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios.post('http://127.0.0.1:8000/admin/admin-signup', {
      name,
      email,
      password,
    }).then((response) => {
      console.log(response);
      navigate('/admin-login');
    }).catch((err) => {
      console.log(err);
      setError('Error in signup. Please try again.');
    });
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <h2>Admin Sign Up</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <label>Name</label>
          <input type="text" ref={nameRef} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={passwordRef} required />
        </div>
        <button type="submit">Sign Up</button>
        <div>
          Already have an account? <Link to="/admin-login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default AdminSignup;
