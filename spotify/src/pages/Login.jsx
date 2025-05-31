import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoAnimation from '../components/LogoAnimation'; // Ensure path is correct
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../components/Loading';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.token) {
      navigate('/');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleSignupRedirect = () => navigate('/signup');

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <LogoAnimation />
      </div>

      {/* Login Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-black/70 backdrop-blur-md p-8 rounded-lg shadow-lg w-[90%] max-w-md text-white">
            
             <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
  {isLoading && (
    <Loading className="w-0.5 h-0.5" /> // or use w-1.5 h-1.5 for smaller size
  )}
 
</h2>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                  className="p-3 rounded text-black"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  className="p-3 rounded text-black"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={handleSignupRedirect}
                  className="bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded"
                >
                  New user? Signup
                </button>
              </form>
              {error && <p className="text-red-400 mt-3">{error}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
