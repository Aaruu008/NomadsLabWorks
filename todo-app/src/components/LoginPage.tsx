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
  const [error, setError] = useState(''); 

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
        <div className="flex justify-center space-x-4">
    {/* Facebook */}
    <button className="border p-3 rounded-full hover:bg-blue-100 transition hover:scale-105 duration-200">
      <svg
        className="w-5 h-5 text-blue-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M22 12a10 10 0 10-11.62 9.87v-6.99H8.9v-2.88h1.48V9.41c0-1.47.87-2.29 2.2-2.29.64 0 1.31.12 1.31.12v1.45h-.74c-.73 0-.96.45-.96.91v1.1h1.63l-.26 2.88h-1.37V21.9A10 10 0 0022 12z" />
      </svg>
    </button>

    {/* Google */}
    <button className="border p-3 rounded-full hover:bg-red-100 transition hover:scale-105 duration-200">
      <svg
        className="w-5 h-5"
        viewBox="0 0 533.5 544.3"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M533.5 278.4c0-17.4-1.6-34.2-4.6-50.4H272v95.3h146.9c-6.3 34.1-25.3 62.9-53.9 82.3l86.9 67c50.6-46.7 81.6-115.5 81.6-194.2z"
          fill="#4285f4"
        />
        <path
          d="M272 544.3c72.9 0 134-24.2 178.6-65.8l-86.9-67c-24.1 16.2-55 25.8-91.7 25.8-70.6 0-130.5-47.7-151.8-111.4l-89.4 69.1c43.7 85.5 133.2 144.3 241.2 144.3z"
          fill="#34a853"
        />
        <path
          d="M120.2 325.9c-5.5-16.6-8.7-34.3-8.7-52.4s3.2-35.8 8.7-52.4l-89.4-69.1C12.1 184.3 0 229.4 0 273.5s12.1 89.2 30.8 121.5l89.4-69.1z"
          fill="#fbbc04"
        />
        <path
          d="M272 109.7c39.7 0 75.2 13.7 103.3 40.6l77.4-77.4C406 27.5 344.9 0 272 0 164 0 74.5 58.8 30.8 152.1l89.4 69.1c21.2-63.6 81.1-111.5 151.8-111.5z"
          fill="#ea4335"
        />
      </svg>
    </button>

    {/* Apple */}
    <button className="border p-3 rounded-full hover:bg-gray-100 transition hover:scale-105 duration-200">
      <svg
        className="w-5 h-5 text-gray-800"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M16.365 1.43c0 1.14-.49 2.24-1.27 3.05-.89.9-2.16 1.6-3.39 1.49a3.4 3.4 0 01-.03-.52c0-1.11.47-2.31 1.27-3.09.4-.38.89-.7 1.42-.92.4-.16.83-.26 1.26-.26.17 0 .34.01.5.03.12.01.24.03.36.05.2.03.4.07.59.14-.03.01-.06.01-.1.02zM21.12 16.45c-.29.73-.63 1.44-1.03 2.11-.38.64-.8 1.25-1.28 1.81-.62.75-1.25 1.43-2.01 1.63-1.01.26-1.71-.11-2.55-.41-.66-.23-1.28-.5-2.01-.48-.76.02-1.5.27-2.18.52-.84.31-1.68.63-2.57.36-.86-.26-1.52-1.01-2.1-1.78-1.1-1.46-1.86-3.16-2.36-4.93-.35-1.28-.58-2.6-.61-3.93a7.24 7.24 0 011.08-3.73c.66-1.12 1.55-2.12 2.71-2.47 1.03-.3 2.14-.1 3.13.11.71.15 1.39.34 2.09.4.96.09 1.91-.1 2.82-.35.92-.26 1.84-.57 2.81-.49 1.34.12 2.27.87 3 1.84-1.15.7-1.84 2.02-1.67 3.33.15 1.22.82 2.22 1.47 3.23z" />
      </svg>
    </button>
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
