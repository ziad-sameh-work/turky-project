'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { userTypes } from '@/data/mockData';

interface UserTypeSelectionProps {
  onSelect: (userType: string) => void;
  onBack: () => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onSelect, onBack }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  const handleSelect = (typeId: string) => {
    setSelectedType(typeId);
    setTimeout(() => onSelect(typeId), 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 px-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="mb-8 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
        >
          <span className="text-white text-xl">←</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-black text-white mb-4">
            Choose Your
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent block">
              Journey
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Select your profile to get personalized recommendations
          </p>
        </motion.div>
      </div>

      {/* User Type Cards */}
      <div className="relative z-10 px-6 flex flex-col space-y-6 max-w-md mx-auto">
        {userTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setHoveredType(type.id)}
            onHoverEnd={() => setHoveredType(null)}
            onClick={() => handleSelect(type.id)}
            className={`relative cursor-pointer group ${
              selectedType === type.id ? 'animate-pulse' : ''
            }`}
          >
            {/* Card Background */}
            <div className={`
              relative p-6 rounded-3xl border transition-all duration-500
              ${selectedType === type.id 
                ? 'bg-gradient-to-r from-red-500/20 to-red-700/20 border-red-500/50 shadow-2xl shadow-red-500/25' 
                : hoveredType === type.id
                ? 'bg-gray-800/60 border-gray-600/50 shadow-xl shadow-black/25'
                : 'bg-gray-800/40 border-gray-700/30 shadow-lg shadow-black/20'
              }
              backdrop-blur-sm
            `}>
              
              {/* Glow Effect */}
              {(hoveredType === type.id || selectedType === type.id) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${type.gradient} opacity-10 blur-xl`}
                />
              )}

              {/* Content */}
              <div className="relative z-10 flex items-center space-x-4">
                {/* Icon */}
                <motion.div
                  animate={{ 
                    scale: hoveredType === type.id ? 1.2 : 1,
                    rotate: selectedType === type.id ? 360 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center text-2xl
                    bg-gradient-to-r ${type.gradient} shadow-lg
                  `}
                >
                  {type.icon}
                </motion.div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {type.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>

                {/* Arrow */}
                <motion.div
                  animate={{ 
                    x: hoveredType === type.id ? 5 : 0,
                    opacity: hoveredType === type.id ? 1 : 0.5
                  }}
                  className="text-gray-400 text-xl"
                >
                  →
                </motion.div>
              </div>

              {/* Selection Indicator */}
              {selectedType === type.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-sm">✓</span>
                </motion.div>
              )}

              {/* Animated Border */}
              {hoveredType === type.id && (
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${type.gradient.includes('red') ? '#ef4444' : '#3b82f6'}, transparent)`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    padding: '2px'
                  }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-center">
          <div className="text-gray-500 text-sm mb-2">Swipe up to continue</div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-red-500/50 text-2xl"
          >
            ↑
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserTypeSelection;
