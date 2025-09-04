'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RestaurantWelcomeScreenProps {
  onNext: (searchData: {
    cuisineType: string;
    location: string;
    priceRange: string;
  }) => void;
}

const RestaurantWelcomeScreen: React.FC<RestaurantWelcomeScreenProps> = ({ onNext }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchData, setSearchData] = useState({
    cuisineType: '',
    location: '',
    priceRange: ''
  });

  const turkishFoodImages = [
    '/images/food/kebab-hero.jpg',
    '/images/food/baklava-hero.jpg',
    '/images/food/turkish-breakfast.jpg',
    '/images/food/meze-platter.jpg'
  ];

  const cuisineTypes = [
    { value: 'turkish', label: 'Turkish Traditional', icon: '🥙' },
    { value: 'international', label: 'International', icon: '🍝' },
    { value: 'halal', label: 'Halal', icon: '☪️' },
    { value: 'vegetarian', label: 'Vegetarian', icon: '🥗' }
  ];

  const locations = [
    { value: 'sultanahmet', label: 'Sultanahmet', icon: '🏛️' },
    { value: 'taksim', label: 'Taksim', icon: '🌆' },
    { value: 'bosphorus', label: 'Bosphorus', icon: '🌊' },
    { value: 'nearme', label: 'Near Me', icon: '📍' }
  ];

  const priceRanges = [
    { value: 'budget', label: 'Budget (₺50-100)', icon: '₺' },
    { value: 'midrange', label: 'Mid-range (₺100-300)', icon: '₺₺' },
    { value: 'luxury', label: 'Luxury (₺300+)', icon: '₺₺₺' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % turkishFoodImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (searchData.cuisineType && searchData.location && searchData.priceRange) {
      onNext(searchData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
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

        {/* Hero Food Image Carousel */}
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
              className="absolute inset-0 bg-gradient-to-br from-orange-900/50 to-black/50"
            >
              {/* Placeholder for Turkish food images */}
              <div className="w-full h-full bg-gradient-to-br from-orange-800 to-orange-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {['🥙', '🧁', '🍳', '🫒'][currentImageIndex]}
                  </div>
                  <div className="text-white font-semibold">
                    {['Turkish Kebab', 'Sweet Baklava', 'Turkish Breakfast', 'Meze Platter'][currentImageIndex]}
                  </div>
                  <div className="text-orange-200 text-sm">Authentic Turkish Cuisine</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {turkishFoodImages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-orange-500 w-8' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="w-full max-w-md space-y-4 mb-8"
        >
          <h2 className="text-white font-bold text-lg mb-4">🔍 Quick Search</h2>
          
          {/* Cuisine Type Selector */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Cuisine Type</label>
            <div className="grid grid-cols-2 gap-2">
              {cuisineTypes.map((cuisine) => (
                <motion.button
                  key={cuisine.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSearchData(prev => ({ ...prev, cuisineType: cuisine.value }))}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    searchData.cuisineType === cuisine.value
                      ? 'bg-orange-500/20 border-orange-500/50 text-white'
                      : 'bg-gray-800/40 border-gray-700/30 text-gray-300 hover:bg-gray-800/60'
                  }`}
                >
                  <div className="text-lg mb-1">{cuisine.icon}</div>
                  <div className="text-xs font-medium">{cuisine.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Location Selector */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Location</label>
            <div className="grid grid-cols-2 gap-2">
              {locations.map((location) => (
                <motion.button
                  key={location.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSearchData(prev => ({ ...prev, location: location.value }))}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    searchData.location === location.value
                      ? 'bg-orange-500/20 border-orange-500/50 text-white'
                      : 'bg-gray-800/40 border-gray-700/30 text-gray-300 hover:bg-gray-800/60'
                  }`}
                >
                  <div className="text-lg mb-1">{location.icon}</div>
                  <div className="text-xs font-medium">{location.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Price Range Selector */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Price Range</label>
            <div className="grid grid-cols-3 gap-2">
              {priceRanges.map((price) => (
                <motion.button
                  key={price.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSearchData(prev => ({ ...prev, priceRange: price.value }))}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    searchData.priceRange === price.value
                      ? 'bg-orange-500/20 border-orange-500/50 text-white'
                      : 'bg-gray-800/40 border-gray-700/30 text-gray-300 hover:bg-gray-800/60'
                  }`}
                >
                  <div className="text-lg mb-1">{price.icon}</div>
                  <div className="text-xs font-medium">{price.label}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Search Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          whileHover={{ 
            scale: searchData.cuisineType && searchData.location && searchData.priceRange ? 1.05 : 1,
            boxShadow: searchData.cuisineType && searchData.location && searchData.priceRange ? "0 20px 40px rgba(251, 146, 60, 0.3)" : "none"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          disabled={!(searchData.cuisineType && searchData.location && searchData.priceRange)}
          className={`
            font-bold py-4 px-12 rounded-2xl text-lg shadow-2xl transition-all duration-300 border
            ${searchData.cuisineType && searchData.location && searchData.priceRange
              ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-orange-500/25 border-orange-400/20 hover:shadow-orange-500/40'
              : 'bg-gray-700/50 text-gray-400 cursor-not-allowed border-gray-600/30'
            }
          `}
        >
          Search for Restaurants
          <motion.span
            animate={{ 
              x: searchData.cuisineType && searchData.location && searchData.priceRange ? [0, 5, 0] : 0 
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="ml-2 inline-block"
          >
            🔍
          </motion.span>
        </motion.button>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
          className="flex space-x-6 mt-8"
        >
          {[
            { icon: '⭐', text: 'Top Rated' },
            { icon: '🚚', text: 'Delivery' },
            { icon: '💰', text: 'Best Prices' }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl mb-2">{feature.icon}</div>
              <div className="text-sm text-gray-400">{feature.text}</div>
            </div>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
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
