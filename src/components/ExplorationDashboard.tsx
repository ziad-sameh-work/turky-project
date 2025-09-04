'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { explorationNavItems } from '@/data/mockData';
import FloatingBottomNav from './FloatingBottomNav';
import UniversityRankings from './UniversityRankings';
import ScholarshipListings from './ScholarshipListings';
import CostCalculator from './CostCalculator';
import AdmissionGuide from './AdmissionGuide';
import VirtualCampusTour from './VirtualCampusTour';

interface ExplorationDashboardProps {
  userProfile: any;
  onBack: () => void;
}

type ExplorationView = 'dashboard' | 'universities' | 'scholarships' | 'costs' | 'community' | 'admission' | 'tour';

const ExplorationDashboard: React.FC<ExplorationDashboardProps> = ({ userProfile, onBack }) => {
  const [currentView, setCurrentView] = useState<ExplorationView>('dashboard');
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>('');

  const handleUniversitySelect = (universityId: string) => {
    setSelectedUniversityId(universityId);
    setCurrentView('admission');
  };

  const handleTourStart = (universityId: string) => {
    setSelectedUniversityId(universityId);
    setCurrentView('tour');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'universities':
        return (
          <UniversityRankings
            onUniversitySelect={handleUniversitySelect}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'scholarships':
        return (
          <ScholarshipListings
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'costs':
        return (
          <CostCalculator
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'admission':
        return (
          <AdmissionGuide
            universityId={selectedUniversityId}
            onBack={() => setCurrentView('universities')}
          />
        );
      case 'tour':
        return (
          <VirtualCampusTour
            universityId={selectedUniversityId}
            onBack={() => setCurrentView('admission')}
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
          className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" 
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
              Explore
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent block">
                Turkey
              </span>
            </h1>
            <p className="text-gray-400 text-sm">Discover your perfect university</p>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <span className="text-white text-xl">🎓</span>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: 'Universities', value: '150+', icon: '🏛️', color: 'from-red-500 to-red-700' },
            { label: 'Scholarships', value: '$2M+', icon: '💰', color: 'from-yellow-500 to-yellow-700' },
            { label: 'Students', value: '50K+', icon: '👥', color: 'from-green-500 to-green-700' }
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

        {/* Main Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 mb-8"
        >
          <h2 className="text-white font-bold text-lg mb-4">🧭 Explore Sections</h2>
          {explorationNavItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView(item.id as ExplorationView)}
              className="w-full p-5 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className="text-white font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {item.id === 'universities' && 'Browse top Turkish universities with advanced filters'}
                    {item.id === 'scholarships' && 'Find funding opportunities and financial aid'}
                    {item.id === 'costs' && 'Calculate your budget with our interactive tool'}
                    {item.id === 'community' && 'Connect with students and get advice'}
                  </p>
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

        {/* Featured Universities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg">🌟 Featured Universities</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('universities')}
              className="text-blue-400 text-sm font-semibold"
            >
              View All →
            </motion.button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {['Istanbul Technical University', 'Boğaziçi University', 'METU'].map((uni, index) => (
              <motion.div
                key={uni}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleTourStart('1')}
                className="flex-shrink-0 w-64 p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm cursor-pointer hover:bg-gray-800/60 transition-all duration-300"
              >
                <div className="w-full h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mb-3 flex items-center justify-center">
                  <span className="text-4xl">🏛️</span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{uni}</h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-yellow-400">⭐ 4.8</span>
                  <span className="text-blue-400">Virtual Tour →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-gradient-to-r from-green-500/20 to-green-700/20 border border-green-500/30 rounded-2xl text-center"
          >
            <div className="text-green-400 text-3xl mb-2">📊</div>
            <div className="text-green-300 font-semibold text-sm">Compare Universities</div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-gradient-to-r from-purple-500/20 to-purple-700/20 border border-purple-500/30 rounded-2xl text-center"
          >
            <div className="text-purple-400 text-3xl mb-2">🎯</div>
            <div className="text-purple-300 font-semibold text-sm">Match Finder</div>
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Floating Bottom Navigation */}
      <FloatingBottomNav
        activeTab="search"
        onTabChange={(tabId) => {
          if (tabId === 'home') {
            onBack();
          }
          // Handle other navigation as needed
        }}
        variant="dashboard"
      />
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {renderCurrentView()}
    </AnimatePresence>
  );
};

export default ExplorationDashboard;
