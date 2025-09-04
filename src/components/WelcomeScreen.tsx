'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface WelcomeScreenProps {
  onNext: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const turkishUniversityImages = [
    '/images/istanbul-skyline.jpg',
    '/images/bosphorus-university.jpg',
    '/images/turkish-architecture.jpg',
    '/images/student-life.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % turkishUniversityImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          // Use deterministic values based on index for SSR compatibility
          const xPos = (i * 37) % 400; // Deterministic x position
          const yPos = (i * 67) % 800; // Deterministic y position
          const duration = 2 + (i % 3); // Duration between 2-4 seconds
          const delay = (i * 0.1) % 2; // Delay between 0-2 seconds
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500/30 rounded-full"
              initial={{ 
                x: xPos, 
                y: yPos,
                opacity: 0 
              }}
              animate={{ 
                y: [yPos, yPos - 100, yPos - 200],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo/Brand */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/25">
            <span className="text-4xl font-bold text-white">🇹🇷</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl font-black text-white mb-4 leading-tight"
        >
          Study in
          <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent block">
            Turkey
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl text-gray-300 mb-8 max-w-md leading-relaxed"
        >
          Discover world-class universities, vibrant culture, and endless opportunities
        </motion.p>

        {/* Image Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative w-80 h-48 rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-black/50"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-black/50"
            >
              {/* Placeholder for university images */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏛️</div>
                  <div className="text-white font-semibold">Turkish Universities</div>
                  <div className="text-gray-400 text-sm">Excellence in Education</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {turkishUniversityImages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-red-500 w-8' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex space-x-6 mb-12"
        >
          {[
            { icon: '🎓', text: 'Top Universities' },
            { icon: '🌍', text: 'Global Community' },
            { icon: '💼', text: 'Career Support' }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl mb-2">{feature.icon}</div>
              <div className="text-sm text-gray-400">{feature.text}</div>
            </div>
          ))}
        </motion.div>

        {/* Get Started Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-4 px-12 rounded-2xl text-lg shadow-2xl shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 border border-red-400/20"
        >
          Get Started
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="ml-2 inline-block"
          >
            →
          </motion.span>
        </motion.button>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  delay: i * 0.2 
                }}
                className="w-2 h-2 bg-red-500/50 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
