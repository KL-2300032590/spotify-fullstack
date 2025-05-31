import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// All logos except the red "eater" logo
const coloredLogos = [
    '/logos/l1.jpg',
  '/logos/l2.jpg',
  '/logos/l3.jpg',
    '/logos/l3.4.jpg',
  '/logos/l4.jpg',
  '/logos/l5.jpg',
  '/logos/l6.jpg',
  '/logos/l8.jpg',
];

const RED_LOGO = '/logos/l7.jpg';
const MAIN_LOGO = '/logos/MainLogo.jpg';

function getGlowForLogo(logo) {
  if (logo.includes('logo2')) return '#1db954';
  if (logo.includes('logo3')) return '#1da1f2';
  if (logo.includes('l2')) return '#ffe066';
  if (logo.includes('l3.4')) return '#a259ff';
  if (logo.includes('l4')) return '#ff61a6';
  if (logo.includes('l3.png')) return '#ff9900';
  return '#fff';
}

const bgVariants = {
  initial: {
    background: 'radial-gradient(circle at 50% 60%, #232 0%, #191414 100%)',
  },
  chaos: {
    background: [
      'radial-gradient(circle at 50% 60%, #e50914 0%, #191414 100%)',
      'radial-gradient(circle at 48% 62%, #ff3c3c 10%, #191414 100%)',
      'radial-gradient(circle at 52% 58%, #e50914 0%, #191414 100%)',
    ],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
  calm: {
    background: 'radial-gradient(circle at 50% 60%, #1db954 0%, #191414 100%)',
  },
};

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const LogoAnimation = () => {
  const [visibleLogos, setVisibleLogos] = useState([]);
  const [stage, setStage] = useState('initial');
  const [showRedLogo, setShowRedLogo] = useState(false);
  const [showMainLogo, setShowMainLogo] = useState(false);

  useEffect(() => {
    coloredLogos.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLogos(prev => [...prev, coloredLogos[i]]);
      }, i * 180);
    });

    setTimeout(() => setStage('chaos'), coloredLogos.length * 180 + 300);

    setTimeout(() => {
      setShowRedLogo(true);
      setStage('red');
      setTimeout(() => setVisibleLogos([]), 300);
    }, coloredLogos.length * 180 + 1200);

    setTimeout(() => {
      setShowRedLogo(false);
      setShowMainLogo(true);
      setStage('main');
    }, coloredLogos.length * 180 + 2000);
  }, []);

  const logoVariants = {
    initial: { scale: 0.2, opacity: 0, y: 60 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      x: stage === 'chaos' ? [0, 16] : 0,
      rotate: stage === 'chaos' ? [0, 8] : 0,
      filter: stage === 'chaos'
        ? 'brightness(1.2) blur(2px) drop-shadow(0 0 16px #e50914)'
        : 'brightness(1)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 18,
        duration: 0.5,
        repeat: stage === 'chaos' ? Infinity : 0,
        repeatType: 'mirror',
      },
    },
    exit: { opacity: 0, scale: 0.5, rotate: 30, transition: { duration: 0.3 } },
  };

  const redLogoVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1, 7, 12],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 1.2,
        times: [0, 0.15, 0.7, 1],
        ease: 'easeInOut',
      },
    },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } },
  };

  const mainLogoVariants = {
    initial: { scale: 0.5, opacity: 0, y: 60 },
    animate: {
      scale: [0.5, 1.1, 0.95, 1, 1.05, 1],
      opacity: [0, 1, 1, 1, 1, 1],
      y: [60, 0, 0, 0, 0, 0],
      filter: [
        'brightness(1.5) drop-shadow(0 0 32px #1db954)',
        'brightness(1.7) drop-shadow(0 0 48px #1db954)',
        'brightness(1.5) drop-shadow(0 0 32px #1db954)',
        'brightness(1.5) drop-shadow(0 0 32px #1db954)',
        'brightness(1.7) drop-shadow(0 0 48px #1db954)',
        'brightness(1.5) drop-shadow(0 0 32px #1db954)',
      ],
      transition: {
        duration: 2.2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror',
      },
    },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } },
  };

  const getBgVariant = () => {
    if (stage === 'main') return 'calm';
    if (stage === 'chaos' || stage === 'red') return 'chaos';
    return 'initial';
  };

  return (
    <motion.div
      className="w-full h-32 sm:h-44 md:h-56 flex items-center justify-center overflow-hidden relative shadow-2xl"
      variants={bgVariants}
      initial="initial"
      animate={getBgVariant()}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      style={{ borderBottom: '6px solid #191414', borderRadius: '0 0 2rem 2rem' }}
    >
      <motion.div
        className="flex flex-row items-center gap-4 sm:gap-8 w-full justify-center relative z-10"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <AnimatePresence>
          {visibleLogos.map((logo, i) => (
            <motion.div
              key={i}
              className="relative flex items-center  justify-center"
              style={{ zIndex: 1 }}
            >
              <motion.div
                className="absolute"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '90%',
                  background: getGlowForLogo(logo),
                  filter: 'blur(28px) opacity(0.7)',
                  zIndex: 0,
                }}
                animate={{
                  scale: stage === 'chaos' ? [1, 1.15, 1] : 1,
                  opacity: stage === 'chaos' ? [0.7, 1, 0.7] : 0.7,
                }}
                transition={{
                  duration: 0.7,
                  repeat: stage === 'chaos' ? Infinity : 0,
                  repeatType: 'mirror',
                }}
              />
              <motion.img
                src={logo}
                alt={`logo-${i}`}
                variants={logoVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover={{ scale: 1.2, rotate: 8 }}
                whileTap={{ scale: 0.9, rotate: -8 }}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain"
                style={{
                  zIndex: 1,
                  borderRadius: '50%', // This already applies to all colored logos
                  background: 'transparent',
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Red Logo Attack - ADDED borderRadius HERE */}
      <AnimatePresence>
        {showRedLogo && (
          <motion.img
            src={RED_LOGO}
            alt="red-logo"
            variants={redLogoVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute z-50 pointer-events-none"
            style={{
              width: '12rem',
              height: '12rem',
              objectFit: 'contain',
              borderRadius: '50%', // Added borderRadius to the RED_LOGO
            }}
          />
        )}
      </AnimatePresence>

      {/* Main Logo Win */}
      <AnimatePresence>
        {showMainLogo && (
          <motion.img
            src={MAIN_LOGO}
            alt="main-logo"
            variants={mainLogoVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute z-40 pointer-events-none"
            style={{
              width: '10rem',
              height: '10rem',
              objectFit: 'contain',
              borderRadius: '100%', // Already had this
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LogoAnimation;