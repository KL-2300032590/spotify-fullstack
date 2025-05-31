// Navbar.js or App.js (where you integrate the LogoAnimation)
import React from 'react';
import LogoAnimation from './LogoAnimation';


const Navbar = () => {
  return (
    <>
      {/* Top Navbar */}
      <div className="navbar w-full border-b-2 border-gray-800 px-5 sm:px-12 py-4 text-lg bg-gray-900 flex items-center">
        <p className="font-bold text-white tracking-wide">Admin panel</p>
        {/* Add more navbar items here if needed */}
      </div>

      {/* Animated Logo Bar (full width, below navbar) */}
      <div className="w-full bg-black">
        <LogoAnimation />
      </div>
    </>
  );
};

export default Navbar;
