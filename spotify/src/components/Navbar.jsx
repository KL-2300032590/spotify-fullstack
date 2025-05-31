import React, { useState, useEffect , useContext  } from 'react';
import { assets } from '../assets/assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // Track current active tab
  const [activeTab, setActiveTab] = useState('All');

  // Auto update activeTab based on URL
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('All');
    } else if (location.pathname.startsWith('/videos')) {
      setActiveTab('Music');
    } else if (location.pathname.startsWith('/podcasts')) {
      setActiveTab('Podcasts');
    }
  }, [location.pathname]);

  const handleExplorePremium = async () => {
  try {
    // Mock Razorpay Order Creation (optional)
    // const res = await fetch('/api/payment/create-order', { method: 'POST' });
    // const orderData = await res.json();

    // Simulate payment & call backend to activate premium
    const response = await fetch('/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user._id,
        razorpay_order_id: 'dummy_order_id',
        razorpay_payment_id: 'dummy_payment_id',
        razorpay_signature: 'dummy_signature', // You can skip this in mock version
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert('🎉 Premium activated!');
      // Optional: Refresh user context or redirect
    } else {
      alert('❌ Payment failed: ' + data.error);
    }
  } catch (err) {
    console.error('Payment error:', err);
    alert('Something went wrong. Try again later.');
  }
};


  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
          <img
            onClick={() => navigate(-1)}
            className='w-8 bg-black p-2 rounded-2xl cursor-pointer'
            src={assets.arrow_left}
            alt="Back"
          />
          <img
            onClick={() => navigate(1)}
            className='w-8 bg-black p-2 rounded-2xl cursor-pointer'
            src={assets.arrow_right}
            alt="Forward"
          />
        </div>
        <div className='flex items-center gap-4'>
          <p  onClick={handleExplorePremium} className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>
            Explore Premium
          </p>
          <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Install App</p>
          
          <p onClick={() => navigate('/profile')}
            className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer 
          ${user?.isPremium 
               ? 'bg-black text-white border border-red-500 shadow-md shadow-red-500/50 animate-pulse' 
                : 'bg-black text-white'}
               `}
             >
             {user?.email?.charAt(0).toUpperCase() || 'P'}
           </p>

        </div>
      </div>

      {/* Tabs */}
      <div className='flex items-center gap-2 mt-4'>
        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer ${
            activeTab === 'All' ? 'bg-white text-black' : 'bg-black text-white'
          }`}
          onClick={() => {
            setActiveTab('All');
            navigate('/');
          }}
        >
          All
        </p>

        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer ${
            activeTab === 'Music' ? 'bg-white text-black' : 'bg-black text-white'
          }`}
          onClick={() => {
            setActiveTab('Music');
            navigate('/videos');
          }}
        >
          Music
        </p>

        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer ${
            activeTab === 'Podcasts' ? 'bg-white text-black' : 'bg-black text-white'
          }`}
          onClick={() => {
            setActiveTab('Podcasts');
            navigate('/podcasts');
          }}
        >
          Podcasts
        </p>

           {user?.isPremium && user?.profileImage && (
  <>
    <img
      src={user.profileImage}
      alt="Premium"
      onClick={() => {
        setActiveTab('Premium');
        navigate('/premium');
      }}
      className={`w-10 h-10 rounded-full cursor-pointer border-2 border-red-500 transition-transform hover:scale-110 ${
        activeTab === 'Premium' ? 'ring-2 ring-red-600' : ''
      }`}
      title="Premium Content"
    />
    
  </>
)}





      </div>
    </>
  );
};

export default Navbar;
