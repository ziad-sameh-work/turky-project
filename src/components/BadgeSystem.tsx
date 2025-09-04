'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/data/mockData';

interface BadgeSystemProps {
  badge: Badge;
  onClose: () => void;
}

const BadgeSystem: React.FC<BadgeSystemProps> = ({ badge, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className="relative max-w-sm w-full"
        >
          {/* Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} opacity-20 blur-2xl rounded-3xl`} />
          
          {/* Card */}
          <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-700/50 rounded-3xl p-8 text-center shadow-2xl">
            {/* Confetti Animation */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              {[...Array(20)].map((_, i) => {
                // Use deterministic values for SSR compatibility
                const xPos = (i * 15) % 300;
                const rotation = (i * 18) % 360;
                const delay = (i * 0.025) % 0.5;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: xPos, 
                      y: 300,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{ 
                      y: -100,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: rotation
                    }}
                    transition={{
                      duration: 2,
                      delay: delay,
                      ease: "easeOut"
                    }}
                    className="absolute w-2 h-2 bg-red-500 rounded-full"
                  />
                );
              })}
            </div>

            {/* Badge Icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className={`
                w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-4xl
                bg-gradient-to-r ${badge.color} shadow-2xl
              `}
            >
              {badge.icon}
            </motion.div>

            {/* Badge Earned Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <div className="text-red-400 font-semibold text-sm mb-2">🎉 Badge Earned!</div>
              <h2 className="text-2xl font-black text-white mb-2">{badge.name}</h2>
              <p className="text-gray-300 text-sm leading-relaxed">{badge.description}</p>
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log('Badge Continue button clicked');
                onClose();
              }}
              className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-red-500/25"
            >
              Continue
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BadgeSystem;
