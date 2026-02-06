import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/common/ToastContext';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  // Login function: call backend, store JWT, user, and expiry
  const login = async (userData) => {
    try {
      // userData: { email, password } or Google profile
      let res;
      if (userData.password) {
        res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userData.email, password: userData.password }),
        });
      } else {
        // For Google login, you may need a separate endpoint
        // For now, just simulate
        res = { ok: true, json: async () => ({ user: userData, token: 'dummy' }) };
      }
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', 'true');
        setIsAuthenticated(true);
        setUser(data.user);
        showToast('Login successfully', 'success');
        navigate('/dashboard');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await fetch('/api/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {}
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
    setUser(null);
    showToast('Logout successfully', 'error');
    navigate('/login');
  };

  // Validate token on every API call (optional: wrap fetch)
  // ...

  // Fetch latest user profile from backend
  const refreshUser = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      const res = await fetch('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('userData', JSON.stringify(data.user));
      }
    } catch (err) {}
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
