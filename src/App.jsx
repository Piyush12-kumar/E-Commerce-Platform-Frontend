// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, fetchProfile } from './redux/slices/authSlice';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Spinner from './components/common/Spinner';
import PrivateRoute from './components/auth/PrivateRoute';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function App() {
  const dispatch = useDispatch();
  const { loading: authLoading, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // On startup, check for a token
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    // After the initial check, if a token exists, fetch the user's profile
    if (!authLoading && token) {
      dispatch(fetchProfile());
    }
  }, [authLoading, token, dispatch]);

  // The Gatekeeper: Do not render the app until the initial auth check is complete.
  if (authLoading) {
    return <Spinner />;
  }

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminPage /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;