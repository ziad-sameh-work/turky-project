'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { extendedUniversities, VirtualTourStop } from '@/data/mockData';

interface VirtualCampusTourProps {
  universityId: string;
  onBack: () => void;
}

const VirtualCampusTour: React.FC<VirtualCampusTourProps> = ({ universityId, onBack }) => {
  const [currentStop, setCurrentStop] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showFacts, setShowFacts] = useState(false);

  const university = extendedUniversities.find(uni => uni.id === universityId);
  
  if (!university || !university.virtualTour.length) {
    return <div>Virtual tour not available</div>;
  }

  const tourStops = university.virtualTour;
  const currentTourStop = tourStops[currentStop];

  const nextStop = () => {
    setCurrentStop((prev) => (prev + 1) % tourStops.length);
    setShowFacts(false);
  };

  const prevStop = () => {
    setCurrentStop((prev) => (prev - 1 + tourStops.length) % tourStops.length);
    setShowFacts(false);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden`}>
      {/* Immersive Background */}
      <div className="absolute inset-0">
        <motion.div
          key={currentStop}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 blur-3xl"
        />
      </div>

      {/* Header Controls */}
      <AnimatePresence>
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="relative z-10 pt-12 px-6"
          >
            <div className="flex items-center justify-between mb-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
              >
                <span className="text-white text-xl">←</span>
              </motion.button>

              <div className="text-center">
                <h1 className="text-xl font-black text-white">Virtual Tour</h1>
                <p className="text-gray-400 text-sm">{university.name}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFullscreen(true)}
                className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
              >
                <span className="text-white text-xl">⛶</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tour View */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* 360° View Container */}
        <motion.div
          key={currentStop}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8 }}
          className={`relative ${isFullscreen ? 'h-screen' : 'h-96'} mx-6 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl`}
        >
          {/* Campus Image Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 to-purple-800/30 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-center"
            >
              <div className="text-8xl mb-4">🏛️</div>
              <div className="text-white font-bold text-2xl mb-2">{currentTourStop.name}</div>
              <div className="text-gray-300 text-lg">{currentTourStop.description}</div>
            </motion.div>
          </div>

          {/* Touch Gesture Indicators */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Swipe indicators */}
            <motion.div
              animate={{ x: [-20, 20, -20] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 text-3xl"
            >
              ←
            </motion.div>
            <motion.div
              animate={{ x: [20, -20, 20] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 text-3xl"
            >
              →
            </motion.div>
          </div>

          {/* Interactive Hotspots */}
          {currentTourStop.coordinates && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFacts(!showFacts)}
              className="absolute bg-red-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg animate-pulse"
              style={{
                left: `${currentTourStop.coordinates.x}%`,
                top: `${currentTourStop.coordinates.y}%`
              }}
            >
              <span className="text-white text-sm">ℹ️</span>
            </motion.button>
          )}

          {/* Facts Popup */}
          <AnimatePresence>
            {showFacts && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-2xl p-4"
              >
                <h4 className="text-white font-bold text-lg mb-2">📍 {currentTourStop.name}</h4>
                <div className="space-y-2">
                  {currentTourStop.facts.map((fact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center space-x-2 text-gray-300 text-sm"
                    >
                      <span className="text-blue-400">•</span>
                      <span>{fact}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fullscreen Exit */}
          {isFullscreen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 p-3 rounded-xl bg-black/50 backdrop-blur-sm"
            >
              <span className="text-white text-xl">✕</span>
            </motion.button>
          )}
        </motion.div>

        {/* Tour Controls */}
        <div className="relative z-10 px-6 py-6">
          {/* Navigation Controls */}
          <div className="flex items-center justify-between mb-6">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
              whileTap={{ scale: 0.9 }}
              onClick={prevStop}
              className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700/30 backdrop-blur-sm"
            >
              <span className="text-white text-2xl">←</span>
            </motion.button>

            <div className="flex-1 mx-6">
              {/* Progress Dots */}
              <div className="flex justify-center space-x-2 mb-3">
                {tourStops.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentStop(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStop
                        ? 'bg-blue-500 w-8'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <div className="text-center">
                <div className="text-white font-semibold text-lg">{currentTourStop.name}</div>
                <div className="text-gray-400 text-sm">{currentStop + 1} of {tourStops.length}</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
              whileTap={{ scale: 0.9 }}
              onClick={nextStop}
              className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700/30 backdrop-blur-sm"
            >
              <span className="text-white text-2xl">→</span>
            </motion.button>
          </div>

          {/* Tour Options */}
          <div className="flex space-x-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                audioEnabled
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                  : 'bg-gray-800/40 border border-gray-700/30 text-gray-400'
              }`}
            >
              🎧 {audioEnabled ? 'Audio On' : 'Audio Off'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-300 text-sm font-semibold"
            >
              📱 AR Mode
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-300 text-sm font-semibold"
            >
              📤 Share
            </motion.button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-gradient-to-r from-red-500/20 to-red-700/20 border border-red-500/30 rounded-2xl text-center"
            >
              <div className="text-red-400 text-2xl mb-2">❤️</div>
              <div className="text-red-300 font-semibold text-sm">Add to Favorites</div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-gradient-to-r from-green-500/20 to-green-700/20 border border-green-500/30 rounded-2xl text-center"
            >
              <div className="text-green-400 text-2xl mb-2">📅</div>
              <div className="text-green-300 font-semibold text-sm">Schedule Visit</div>
            </motion.button>
          </div>

          {/* Swipe Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center mt-6"
          >
            <div className="text-gray-500 text-sm mb-2">Swipe to explore • Tap hotspots for info</div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-gray-600 text-2xl"
            >
              👆
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VirtualCampusTour;
