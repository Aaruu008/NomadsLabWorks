// src/hooks/useAuth.ts
import { useState } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) setIsLoggedIn(true);
  };

  return {
    isLoggedIn,
    username,
    password,
    setUsername,
    setPassword,
    handleLogin
  };
};

export default useAuth;
