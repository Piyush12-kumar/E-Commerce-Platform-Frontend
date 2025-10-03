import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, token } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
        navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{typeof error === 'string' ? error : 'Login Failed'}</p>}
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
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </form>
  );
};

export default Login;