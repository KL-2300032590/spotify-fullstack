import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import premiumBadge from '../assets/assets/mic.png';

// Import an icon from react-icons (or any icon library you use)
import { FiLogOut } from 'react-icons/fi';  // Feather Icons logout door icon

const avatarList = Array.from({ length: 8 }, (_, i) => `/logos/l${i + 1}.jpg`);

const UserProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const modalRef = useRef();
  const [selectedImage, setSelectedImage] = useState(user?.profileImage || null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        navigate(-1);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [navigate]);

  const handleImageSelect = async (src) => {
    setSelectedImage(src);

    const token = localStorage.getItem('token');
    const res = await fetch('https://antara-b.onrender.com/api/auth/profile-image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ profileImage: src }),
    });

    const data = await res.json();
    if (data.user) {
      setUser(data.user);
    }
  };

  // New logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  if (!user) return <div className="text-white">Please log in to view profile.</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <motion.div
        ref={modalRef}
        className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg w-[90%] max-w-md text-white"
        initial={{ y: -40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -40, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 180, damping: 15 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {user.email?.split('@')[0]}
            {user.isPremium && (
              <img
                src={premiumBadge}
                alt="Premium"
                className="w-6 h-6 animate-pulse"
                title="Premium User"
              />
            )}
          </h2>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Logout"
            aria-label="Logout"
          >
            <FiLogOut size={24} />
          </button>
        </div>
        <p className="mb-1"><span className="text-gray-400">Email:</span> {user.email}</p>
        <p>
          <span className="text-gray-400">Account Type:</span>{' '}
          {user.isPremium ? (
            <span className="text-red-500 font-semibold">Premium</span>
          ) : (
            <span className="text-gray-400">Basic</span>
          )}
        </p>

        {user.isPremium && (
          <>
            <p className="mt-5 text-sm text-gray-400">Choose your profile badge:</p>
            <div className="grid grid-cols-4 gap-3 mt-2">
              {avatarList.map((src, idx) => (
                <motion.img
                  key={idx}
                  src={src}
                  alt={`l${idx + 1}`}
                  className={`w-16 h-16 rounded-full object-cover border-2 cursor-pointer transition-all duration-300 ${
                    selectedImage === src
                      ? 'border-red-500 shadow-red-500 shadow-md'
                      : 'border-gray-700'
                  }`}
                  onClick={() => handleImageSelect(src)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>
            {selectedImage && (
              <p className="text-green-400 text-sm mt-2">
                Selected: {selectedImage.split('/').pop()}
              </p>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default UserProfile;
