'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TravelTipsMain from './TravelTipsMain';
import TransportationMain from './TransportationMain';
import TouristProfileDashboard from './TouristProfileDashboard';
import UserProfile from './UserProfile';
import { mockTravelGuide, mockTouristDashboard } from '@/data/mockData';

interface TouristDashboardProps {
  userProfile: {
    name: string;
    email: string;
    userType: string;
    preferences?: Record<string, string>;
    language?: string;
  };
  onBack: () => void;
}

type TouristView = 'dashboard' | 'travel-tips' | 'transportation' | 'attractions' | 'hotels' | 'profile' | 'user-profile';

const TouristDashboard: React.FC<TouristDashboardProps> = ({ userProfile, onBack }) => {
  const [currentView, setCurrentView] = useState<TouristView>('dashboard');
  const [showProfile, setShowProfile] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const touristFeatures = [
    {
      id: 'travel-tips',
      title: 'Travel Tips & Guides',
      description: 'Essential information for traveling in Turkey',
      icon: '📚',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-600/20 to-pink-600/20',
      borderColor: 'border-purple-500/30'
    },
    {
      id: 'transportation',
      title: 'Transportation',
      description: 'Navigate Istanbul with ease',
      icon: '🚇',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-600/20 to-cyan-600/20',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'attractions',
      title: 'Tourist Attractions',
      description: 'Discover amazing places to visit',
      icon: '🏛️',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-600/20 to-emerald-600/20',
      borderColor: 'border-green-500/30'
    },
    {
      id: 'hotels',
      title: 'Hotels & Accommodation',
      description: 'Find the perfect place to stay',
      icon: '🏨',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-600/20 to-red-600/20',
      borderColor: 'border-orange-500/30'
    },
    {
      id: 'user-profile',
      title: 'User Profile',
      description: 'Manage your account and preferences',
      icon: '👤',
      color: 'from-gray-500 to-gray-700',
      bgColor: 'from-gray-600/20 to-gray-700/20',
      borderColor: 'border-gray-500/30'
    }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'travel-tips':
        return (
          <TravelTipsMain 
            travelGuide={mockTravelGuide}
          />
        );
      case 'transportation':
        return (
          <TransportationMain 
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'user-profile':
        return (
          <UserProfile 
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 px-6 pt-12 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
          >
            <span className="text-white text-xl">←</span>
          </motion.button>

          <div className="text-center">
            <h1 className="text-2xl font-black text-white">
              Welcome, {userProfile.name}
              <span className="bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent block">
                Explore Turkey
              </span>
            </h1>
            <p className="text-gray-400 text-sm">Your tourist guide to Turkey</p>
          </div>

          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowUserProfile(true)}
              className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg"
              title="User Profile"
            >
              <span className="text-white text-xl">⚙️</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowProfile(true)}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg"
              title="Tourist Dashboard"
            >
              <span className="text-white text-xl">👤</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Tourist Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: 'Attractions', value: '500+', icon: '🏛️', color: 'from-purple-500 to-purple-700' },
            { label: 'Hotels', value: '1000+', icon: '🏨', color: 'from-blue-500 to-blue-700' },
            { label: 'Reviews', value: '50K+', icon: '⭐', color: 'from-green-500 to-green-700' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm text-center"
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
              <div className="text-white font-bold text-lg">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Tourist Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 mb-8"
        >
          <h2 className="text-white font-bold text-lg mb-4">🧭 Tourist Services</h2>
          {touristFeatures.map((feature, index) => (
            <motion.button
              key={feature.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView(feature.id as TouristView)}
              className={`w-full p-5 bg-gradient-to-r ${feature.bgColor} border ${feature.borderColor} rounded-2xl backdrop-blur-sm hover:bg-opacity-80 transition-all duration-300 group`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                <div className="flex-1 text-left">
                  <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>

                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-gray-400 text-2xl group-hover:text-white transition-colors duration-300"
                >
                  →
                </motion.div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-8"
        >
          <h2 className="text-white font-bold text-lg mb-4">⚡ Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl text-center"
            >
              <div className="text-yellow-400 text-3xl mb-2">📍</div>
              <div className="text-yellow-300 font-semibold text-sm">Find Nearby</div>
              <div className="text-gray-400 text-xs mt-1">Attractions & services</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-gradient-to-r from-pink-500/20 to-red-600/20 border border-pink-500/30 rounded-2xl text-center"
            >
              <div className="text-pink-400 text-3xl mb-2">💬</div>
              <div className="text-pink-300 font-semibold text-sm">Ask AI</div>
              <div className="text-gray-400 text-xs mt-1">Travel assistance</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-gradient-to-r from-teal-500/20 to-cyan-600/20 border border-teal-500/30 rounded-2xl text-center"
            >
              <div className="text-teal-400 text-3xl mb-2">🗺️</div>
              <div className="text-teal-300 font-semibold text-sm">Interactive Map</div>
              <div className="text-gray-400 text-xs mt-1">Explore visually</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl text-center"
            >
              <div className="text-indigo-400 text-3xl mb-2">📱</div>
              <div className="text-indigo-300 font-semibold text-sm">Mobile Apps</div>
              <div className="text-gray-400 text-xs mt-1">Essential downloads</div>
            </motion.button>
          </div>
        </motion.div>

        {/* Featured Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg">🌟 Featured Destinations</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('attractions')}
              className="text-purple-400 text-sm font-semibold"
            >
              View All →
            </motion.button>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-2">
            {['Hagia Sophia', 'Blue Mosque', 'Topkapi Palace'].map((destination, index) => (
              <motion.div
                key={destination}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-64 p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm cursor-pointer hover:bg-gray-800/60 transition-all duration-300"
              >
                <div className="w-full h-32 bg-gradient-to-br from-purple-700 to-blue-800 rounded-xl mb-3 flex items-center justify-center">
                  <span className="text-4xl">🏛️</span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{destination}</h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-yellow-400">⭐ 4.9</span>
                  <span className="text-purple-400">Explore →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Show profile modals
  if (showProfile) {
    return <TouristProfileDashboard dashboardData={mockTouristDashboard} onClose={() => setShowProfile(false)} />;
  }

  if (showUserProfile) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">User Profile Settings</h2>
            <button
              onClick={() => setShowUserProfile(false)}
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
          <div className="max-h-[80vh] overflow-y-auto">
            <UserProfile onBack={() => setShowUserProfile(false)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {renderCurrentView()}
    </AnimatePresence>
  );
};

export default TouristDashboard;
