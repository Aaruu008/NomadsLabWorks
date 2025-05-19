import React from "react";
import { useNavigate } from "react-router-dom";

const colors = [
  "bg-red-400", "bg-green-400", "bg-blue-400", "bg-purple-400", "bg-yellow-400",
  "bg-pink-400", "bg-teal-400", "bg-orange-400", "bg-indigo-400",
];

function getRandomColor(seed: string): string {
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

const AccountPage: React.FC = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "Guest";
  const userEmail = `${username.toLowerCase()}@gmail.com`; // optional: dummy email
  const avatarBg = getRandomColor(username);
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#e5d9c5] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-sm rounded-2xl py-8 px-6 shadow-lg text-center">
        {/* Back Button */}
        <button
          onClick={() => navigate("/todos")}
          className="absolute top-4 left-4 flex items-center space-x-1 text--500 font-semibold hover:text-yellow-600 transition"
          aria-label="Back to Tasks"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-md ${avatarBg}`}>
          {firstLetter}
        </div>

        <h2 className="text-lg font-semibold">{username}</h2>
        <p className="text-gray-500 text-sm mb-6">{userEmail}</p>

        {["Edit profile", "About us", "Privacy policy", "Settings"].map((item) => (
          <button
            key={item}
            className="w-full py-3 my-2 rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-all"
          >
            {item}
          </button>
        ))}

        <button
          className="text-yellow-500 font-medium mt-4"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Log out
        </button>

        <button
          className="w-full mt-3 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-all"
        >
          Delete account
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
