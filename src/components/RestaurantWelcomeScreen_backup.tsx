'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RestaurantWelcomeScreenProps {
  onNext: (searchData: {
    cuisineType: string;
    location: string;
    priceRange: string;
  }) => void;
}

const RestaurantWelcomeScreen: React.FC<RestaurantWelcomeScreenProps> = ({ onNext }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const cuisineTypes = [
    { id: 'turkish', name: 'Turkish Traditional', icon: '🥙' },
    { id: 'international', name: 'International', icon: '🍝' },
    { id: 'halal', name: 'Halal', icon: '☪' },
    { id: 'vegetarian', name: 'Vegetarian', icon: '🥗' }
  ];

  const locations = [
    { id: 'sultanahmet', name: 'Sultanahmet', icon: '🏛' },
    { id: 'taksim', name: 'Taksim', icon: '🌆' },
    { id: 'bosphorus', name: 'Bosphorus', icon: '🌊' },
    { id: 'near-me', name: 'Near Me', icon: '📍' }
  ];

  const priceRanges = [
    { id: 'budget', name: 'Budget (₺50-100)', icon: '₺' },
    { id: 'mid-range', name: 'Mid-range (₺100-300)', icon: '₺₺' },
    { id: 'luxury', name: 'Luxury (₺300+)', icon: '₺₺₺' }
  ];

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      onNext({
        cuisineType: selectedCuisine,
        location: selectedLocation,
        priceRange: selectedPrice
      });
    }
  };

  const canProceedStep = () => {
    switch (currentStep) {
      case 0: return selectedCuisine !== '';
      case 1: return selectedLocation !== '';
      case 2: return selectedPrice !== '';
      default: return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0: return 'Choose Your Cuisine Type';
      case 1: return 'Select Location';
      case 2: return 'Pick Your Price Range';
      default: return '';
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 0: return 'Next: Location';
      case 1: return 'Next: Price Range';
      case 2: return 'Search Restaurants';
      default: return 'Next';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-2 gap-4">
            {cuisineTypes.map((cuisine) => (
              <motion.button
                key={cuisine.id}
                onClick={() => setSelectedCuisine(cuisine.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedCuisine === cuisine.id
                    ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                    : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-orange-400 hover:bg-orange-400/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-2">{cuisine.icon}</div>
                <div className="font-medium">{cuisine.name}</div>
              </motion.button>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-2 gap-4">
            {locations.map((location) => (
              <motion.button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedLocation === location.id
                    ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                    : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-orange-400 hover:bg-orange-400/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-2">{location.icon}</div>
                <div className="font-medium">{location.name}</div>
              </motion.button>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 gap-4">
            {priceRanges.map((price) => (
              <motion.button
                key={price.id}
                onClick={() => setSelectedPrice(price.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedPrice === price.id
                    ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                    : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-orange-400 hover:bg-orange-400/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-2xl">{price.icon}</div>
                  <div className="font-medium">{price.name}</div>
                </div>
              </motion.button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Continue Button - Fixed at top */}
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          onClick={handleNext}
          disabled={!canProceedStep()}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
            canProceedStep()
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-lg'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={canProceedStep() ? { scale: 1.05 } : {}}
          whileTap={canProceedStep() ? { scale: 0.95 } : {}}
        >
          {getButtonText()}
        </motion.button>
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Food Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const xPos = (i * 45) % 400;
          const yPos = (i * 73) % 800;
          const duration = 3 + (i % 3);
          const delay = (i * 0.15) % 2;
          
          return (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-20"
              initial={{ 
                x: xPos, 
                y: yPos,
                opacity: 0,
                rotate: 0
              }}
              animate={{ 
                y: [yPos, yPos - 150, yPos - 300],
                opacity: [0, 0.3, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay
              }}
            >
              {['🥙', '🍖', '🧄', '🌶️', '🫒'][i % 5]}
            </motion.div>
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
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/25">
            <span className="text-4xl font-bold text-white">🍽️</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl font-black text-white mb-4 leading-tight"
        >
          Taste
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent block">
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
          Discover authentic flavors, from street food to fine dining
        </motion.p>

    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Logo/Brand */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/25">
          <span className="text-4xl font-bold text-white">🍽️</span>
        </div>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-5xl font-black text-white mb-4 leading-tight"
      >
        Taste
        <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent block">
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
        Discover authentic flavors, from street food to fine dining
      </motion.p>

      {/* Hero Food Image Carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-full h-96 bg-orange-500/50 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/25">
          <span className="text-4xl font-bold text-white">🍴</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-8 pt-24">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
              🔍 Quick Search
            </h1>
            <h2 className="text-3xl font-semibold text-white mb-4">
              {getStepTitle()}
            </h2>
            <p className="text-lg text-gray-300">
              Step {currentStep + 1} of 3
            </p>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {[0, 1, 2].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    step <= currentStep
                      ? 'bg-orange-500'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  delay: i * 0.2 
                }}
                className="w-2 h-2 bg-orange-500/50 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantWelcomeScreen;
