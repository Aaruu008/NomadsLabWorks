import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Apple, CircleUser } from 'lucide-react'; 

interface LoginPageProps {
  setUsername: (username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUsername }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      const usernameFromEmail = email.split('@')[0];
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', usernameFromEmail);
      setUsername(usernameFromEmail);
      navigate('/todos');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-center items-center px-4">
      {/* Top Heading */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Login to your account</h2>

      {/* Form Box */}
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md space-y-5">
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Forgot Password */}
        <div className="text-right">
          <button className="text-sm text-yellow-500 hover:underline">Forgot Password?</button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-white font-semibold py-3 rounded-xl"
        >
          Login
        </button>

        {/* OR login with */}
        <div className="flex items-center gap-2 justify-center text-gray-400 text-sm">
          <span className="border-t border-gray-200 w-1/4"></span>
          <span>or login with</span>
          <span className="border-t border-gray-200 w-1/4"></span>
        </div>

        {/* Social Icons using Lucide */}
        <div className="flex justify-center gap-6 text-yellow-500">
          <Facebook className="w-6 h-6 cursor-pointer hover:text-yellow-600 transition" />
          <CircleUser className="w-6 h-6 cursor-pointer hover:text-yellow-600 transition" /> {/* Placeholder for Google */}
          <Apple className="w-6 h-6 cursor-pointer hover:text-yellow-600 transition" />
        </div>
      </div>

      {/* Bottom Sign Up */}
      <div className="mt-6 text-sm text-gray-500">
        Don’t have an account?{' '}
        <button
          onClick={() => navigate('/signup')}
          className="text-yellow-500 hover:underline font-medium"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
