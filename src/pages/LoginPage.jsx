// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import SimpleLoginTest from '../components/debug/SimpleLoginTest';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Get user object instead of token to confirm login is fully complete
  const { loading, error, user } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || "/";

  // This effect will run once the user object is successfully populated
  useEffect(() => {
    console.log('Login page useEffect - user changed:', user);
    if (user) {
        console.log('User is logged in, navigating to:', from);
        navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // Debug auth state changes
  useEffect(() => {
    console.log('Auth state changed:', { loading, error, user: !!user });
  }, [loading, error, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted with username:', username);
    console.log('Current auth state:', { loading, error, user });
    dispatch(login({ username, password }));
  };

  return (
    <div>
      <SimpleLoginTest />
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && (
          <div style={{color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fee', border: '1px solid #fcc'}}>
            Error: {typeof error === 'string' ? error : JSON.stringify(error)}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f9ff', border: '1px solid #0ea5e9' }}>
          <h4>Demo Credentials:</h4>
          <p>Use the test user account to try the application.</p>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => {setUsername('johnny'); setPassword('johnny');}}
            style={{ marginRight: '1rem' }}
          >
            Fill Test User (johnny/johnny)
          </button>
        </div>
        
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;