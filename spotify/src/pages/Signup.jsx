import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoAnimation from '../components/LogoAnimation';

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false); // delay showing form after animation

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await signup(email, password);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(res.error || 'Signup failed');
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 🎥 Background Animation */}
      <LogoAnimation />

      {/* 🎯 Signup Form (appears after animation finishes) */}
      {showForm && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-60 backdrop-blur-md p-8 rounded-xl shadow-lg w-80 sm:w-96">
            <h2 className="text-2xl text-center text-white font-bold mb-6">Create an Account</h2>
            <form onSubmit={handleSignup} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded bg-white text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="p-3 rounded bg-white text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                Sign Up
              </button>
            </form>
            {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
            {success && <p className="text-green-400 mt-3 text-sm">Account created! Redirecting...</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
