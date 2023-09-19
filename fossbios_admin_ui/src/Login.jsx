import styles from './Login.module.css';
import  { useState } from 'react';
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
    <div className={styles.login_container} style={{width:'15%',margin:'0 auto',position:'absolute',top:"30%",left:'40%'}}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className={styles.loginform}>
        <div className={styles.loginform_input_div}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
          />
        </div>
        <div className={styles.loginform_input_div}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className={styles.loginform_input_div}>
        Don't have an account? <Link to="/">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
