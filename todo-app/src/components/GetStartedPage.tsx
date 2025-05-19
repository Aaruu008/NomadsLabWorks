import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getStartedImage from '../assets/getstarted.png';

const GetStarted: React.FC = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRoute = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    navigate(isLoggedIn ? '/todos' : '/login');
  };

  return (
    <div
      className={`w-full h-screen flex flex-col px-6 bg-white transition-opacity duration-1000 ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Top Section: Heading + Subheadings */}
      <div className="mt-10 max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 font-sans">
          Get Started
        </h1>

       <div className="flex flex-wrap space-x-4 text-gray-600 text-sm sm:text-base font-medium tracking-wide mb-10">
  {['• Create Task', '• Set Reminder', '• Track Progress'].map((text, index) => (
    <span
      key={index}
      onClick={handleRoute}
      className="cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:text-yellow-500"
    >
      {text}
    </span>
  ))}
</div>

      </div>

      {/* Image Section */}
      <div className="flex-grow flex justify-center items-center">
        <img
          src={getStartedImage}
          alt="Getting Started"
          className="w-full max-w-4xl h-auto object-contain rounded-lg shadow-md"
          style={{ maxHeight: '60vh' }}
        />
      </div>

      {/* Bottom Button */}
      <div className="mb-12 flex justify-center">
        <button
          onClick={handleRoute}
          className="bg-yellow-400 hover:bg-yellow-500 text-white text-lg sm:text-xl font-semibold py-3 px-10 rounded-full shadow-lg transition duration-300"
        >
          Get Started →
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
