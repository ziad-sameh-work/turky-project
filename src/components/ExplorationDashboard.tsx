'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { explorationNavItems } from '@/data/mockData';
import FloatingBottomNav from './FloatingBottomNav';
import Chatbot from './Chatbot';
import CommunityForum from './CommunityForum';
import HousingGuide from './HousingGuide';
import DocumentChecklist from './DocumentChecklist';
import StudyPlanner from './StudyPlanner';
import UniversityRankings from './UniversityRankings';
import ScholarshipListings from './ScholarshipListings';
import CostCalculator from './CostCalculator';
import AdmissionGuide from './AdmissionGuide';
import VirtualCampusTour from './VirtualCampusTour';
import NotificationCenter from './NotificationCenter';
import PremiumSubscription from './PremiumSubscription';
import StudyDiary from './StudyDiary';
import AchievementDashboard from './AchievementDashboard';
import TouristProfileDashboard from './TouristProfileDashboard';
import { mockTouristDashboard } from '@/data/mockData';

interface ExplorationDashboardProps {
  userProfile: {
    name: string;
    email: string;
    userType: string;
    preferences?: Record<string, string>;
    language?: string;
  };
  onBack: () => void;
}

type ExplorationView = 'dashboard' | 'universities' | 'scholarships' | 'costs' | 'community' | 'admission' | 'tour';

const ExplorationDashboard: React.FC<ExplorationDashboardProps> = ({ userProfile, onBack }) => {
  const [currentView, setCurrentView] = useState<ExplorationView>('dashboard');
  const [showChatbot, setShowChatbot] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showHousing, setShowHousing] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showPlanner, setShowPlanner] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showDiary, setShowDiary] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
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
              Welcome, {userProfile.name}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent block">
                Explore Turkey
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

        {/* Phase 3 Interactive Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-8"
        >
          <h2 className="text-white font-bold text-lg mb-4">🚀 Interactive Tools</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowChatbot(true)}
              className="p-4 bg-gradient-to-r from-blue-500/20 to-blue-700/20 border border-blue-500/30 rounded-2xl text-center"
            >
              <div className="text-blue-400 text-3xl mb-2">🤖</div>
              <div className="text-blue-300 font-semibold text-sm">AI Assistant</div>
              <div className="text-gray-400 text-xs mt-1">Ask about universities</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCommunity(true)}
              className="p-4 bg-gradient-to-r from-green-500/20 to-green-700/20 border border-green-500/30 rounded-2xl text-center"
            >
              <div className="text-green-400 text-3xl mb-2">👥</div>
              <div className="text-green-300 font-semibold text-sm">Community</div>
              <div className="text-gray-400 text-xs mt-1">Connect with students</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowHousing(true)}
              className="p-4 bg-gradient-to-r from-orange-500/20 to-orange-700/20 border border-orange-500/30 rounded-2xl text-center"
            >
              <div className="text-orange-400 text-3xl mb-2">🏠</div>
              <div className="text-orange-300 font-semibold text-sm">Housing Guide</div>
              <div className="text-gray-400 text-xs mt-1">Find dorms & apartments</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDocuments(true)}
              className="p-4 bg-gradient-to-r from-indigo-500/20 to-indigo-700/20 border border-indigo-500/30 rounded-2xl text-center"
            >
              <div className="text-indigo-400 text-3xl mb-2">📋</div>
              <div className="text-indigo-300 font-semibold text-sm">Documents</div>
              <div className="text-gray-400 text-xs mt-1">Application checklist</div>
            </motion.button>
          </div>
        </motion.div>

        {/* Study Planner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPlanner(true)}
            className="w-full p-6 bg-gradient-to-r from-teal-500/20 to-teal-700/20 border border-teal-500/30 rounded-2xl text-center"
          >
            <div className="text-teal-400 text-4xl mb-3">📅</div>
            <div className="text-teal-300 font-bold text-lg mb-2">Study Planner</div>
            <div className="text-gray-400 text-sm">Create timeline for your application journey</div>
          </motion.button>
        </motion.div>

        {/* Phase 4 Retention Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mb-8"
        >
          <h2 className="text-white font-bold text-lg mb-4">🎯 Stay Engaged</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowNotifications(true)}
              className="p-4 bg-gradient-to-r from-red-500/20 to-red-700/20 border border-red-500/30 rounded-2xl text-center"
            >
              <div className="text-red-400 text-3xl mb-2">🔔</div>
              <div className="text-red-300 font-semibold text-sm">Notifications</div>
              <div className="text-gray-400 text-xs mt-1">Stay updated</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDiary(true)}
              className="p-4 bg-gradient-to-r from-pink-500/20 to-pink-700/20 border border-pink-500/30 rounded-2xl text-center"
            >
              <div className="text-pink-400 text-3xl mb-2">📖</div>
              <div className="text-pink-300 font-semibold text-sm">Study Diary</div>
              <div className="text-gray-400 text-xs mt-1">Document journey</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAchievements(true)}
              className="p-4 bg-gradient-to-r from-purple-500/20 to-purple-700/20 border border-purple-500/30 rounded-2xl text-center"
            >
              <div className="text-purple-400 text-3xl mb-2">🏆</div>
              <div className="text-purple-300 font-semibold text-sm">Achievements</div>
              <div className="text-gray-400 text-xs mt-1">Track progress</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPremium(true)}
              className="p-4 bg-gradient-to-r from-yellow-500/20 to-yellow-700/20 border border-yellow-500/30 rounded-2xl text-center"
            >
              <div className="text-yellow-400 text-3xl mb-2">👑</div>
              <div className="text-yellow-300 font-semibold text-sm">Premium</div>
              <div className="text-gray-400 text-xs mt-1">Unlock features</div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Floating Bottom Navigation */}
      <FloatingBottomNav
        activeTab="search"
        onTabChange={(tabId: string) => {
          if (tabId === 'home') {
            onBack();
          } else if (tabId === 'profile') {
            setShowProfile(true);
          } else if (tabId === 'favorites') {
            // Handle favorites navigation
            console.log('Favorites clicked');
          }
        }}
        variant="dashboard"
      />
    </div>
  );

  // Render Phase 3 components
  if (showChatbot) {
    return <Chatbot onBack={() => setShowChatbot(false)} />;
  }
  
  if (showCommunity) {
    return <CommunityForum onBack={() => setShowCommunity(false)} />;
  }
  
  if (showHousing) {
    return <HousingGuide onBack={() => setShowHousing(false)} />;
  }
  
  if (showDocuments) {
    return <DocumentChecklist onBack={() => setShowDocuments(false)} />;
  }
  
  if (showPlanner) {
    return <StudyPlanner onBack={() => setShowPlanner(false)} />;
  }
  
  if (showNotifications) {
    return <NotificationCenter onBack={() => setShowNotifications(false)} />;
  }
  
  if (showPremium) {
    return <PremiumSubscription onBack={() => setShowPremium(false)} />;
  }
  
  if (showDiary) {
    return <StudyDiary onBack={() => setShowDiary(false)} />;
  }
  
  if (showAchievements) {
    return <AchievementDashboard onBack={() => setShowAchievements(false)} />;
  }
  
  if (showProfile) {
    return <TouristProfileDashboard dashboardData={mockTouristDashboard} onClose={() => setShowProfile(false)} />;
  }

  return (
    <AnimatePresence mode="wait">
      {renderCurrentView()}
    </AnimatePresence>
  );
};

export default ExplorationDashboard;
