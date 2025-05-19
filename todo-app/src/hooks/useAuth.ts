import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Use your axios instance

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', email.split('@')[0]); // Store username
      setIsLoggedIn(true);
      navigate('/todos'); // Redirect after login
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Let components handle errors
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login');
  };

  // Check auth status on initial load
  useState(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  });

  return { isLoggedIn, login, logout };
};

export default useAuth;