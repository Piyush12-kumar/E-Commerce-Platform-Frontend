import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../redux/slices/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData)).then((result) => {
        if (!result.error) {
            alert('Registration successful! Please log in.');
            navigate('/login');
        }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{color: 'red'}}>{typeof error === 'string' ? error : 'Registration Failed'}</p>}
       <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>
       <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
       <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </form>
  );
};

export default Register;