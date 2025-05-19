import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage('Please enter your email address.');
      return;
    }

    // Simulate sending reset link
    setMessage(`A reset link has been sent to ${email}`);
    setEmail('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Forgot Password?</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Enter your email address below and we’ll send you a password reset link.
        </p>

        {message && (
          <div className="bg-yellow-100 text-yellow-800 text-sm px-4 py-2 rounded mb-4 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 transition text-white font-semibold rounded-lg shadow"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <a href="/login" className="hover:underline text-yellow-500">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
