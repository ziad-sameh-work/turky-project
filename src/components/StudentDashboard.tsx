'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockUniversities, mockUserProfile, Badge } from '@/data/mockData';
import FloatingBottomNav from './FloatingBottomNav';
import UserProfile from './UserProfile';
import Sidebar from './Sidebar';
import UniversityDetailsModal from './UniversityDetailsModal';

interface StudentDashboardProps {
  userProfile: typeof mockUserProfile;
  badges: Badge[];
  onExplore?: () => void;
  onNavigate?: (page: string) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ userProfile, badges, onExplore, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [showProfile, setShowProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<typeof universityRankings[0] | null>(null);
  const [showUniversityModal, setShowUniversityModal] = useState(false);

  const earnedBadges = badges.filter(badge => badge.earned);
  const recommendations = mockUniversities.slice(0, 3);

  const universityRankings = [
    { name: 'Boğaziçi University', nameEn: 'Boğaziçi University', rank: 1, score: 95, city: 'Istanbul' },
    { name: 'Middle East Technical University', nameEn: 'METU', rank: 2, score: 92, city: 'Ankara' },
    { name: 'Istanbul Technical University', nameEn: 'ITU', rank: 3, score: 89, city: 'Istanbul' },
    { name: 'Istanbul University', nameEn: 'Istanbul University', rank: 4, score: 86, city: 'Istanbul' }
  ];

  const scholarships = [
    { name: 'Türkiye Government Scholarship', nameEn: 'Türkiye Scholarships', type: 'full', amount: 'Fully Funded', deadline: '2024-02-20' },
    { name: 'ITU International Scholarship', nameEn: 'ITU Scholarships', type: 'partial', amount: '50% Tuition Coverage', deadline: '2024-03-15' },
    { name: 'Boğaziçi Excellence Scholarship', nameEn: 'Boğaziçi Scholarships', type: 'full', amount: 'Fully Funded', deadline: '2024-01-30' }
  ];

  const handleUniversityClick = (university: typeof universityRankings[0]) => {
    setSelectedUniversity(university);
    setShowUniversityModal(true);
  };

  const handleCloseModal = () => {
    setShowUniversityModal(false);
    setSelectedUniversity(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" 
        />
      </div>

      <div className="relative z-10 px-6 pt-12 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSidebar(true)}
              className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl backdrop-blur-sm hover:bg-gray-700/50 transition-colors"
              title="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            
            <div>
              <h1 className="text-2xl font-black text-white">
                Welcome back,
                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent block">
                  {userProfile.name}! 🎓
                </span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">Ready to explore your future?</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowProfile(true)}
            className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg"
            title="Profile"
          >
            <span className="text-white text-xl">👤</span>
          </motion.button>
        </motion.div>

        {/* Badges Section */}
        {earnedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-lg font-bold text-white mb-4">Your Achievements</h2>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {earnedBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`
                    flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-2xl
                    bg-gradient-to-r ${badge.color} shadow-lg
                  `}
                >
                  {badge.icon}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* University Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-white mb-4">🏛️ Turkish University Rankings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {universityRankings.map((university, index) => (
              <motion.div
                key={university.rank}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleUniversityClick(university)}
                className="p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      university.rank <= 3 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-600'
                    }`}>
                      {university.rank}
                    </div>
                    <span className="text-white font-medium text-sm">{university.score}/100</span>
                  </div>
                  <span className="text-gray-400 text-xs">{university.city}</span>
                </div>
                
                <h3 className="text-white font-semibold mb-1">{university.name}</h3>
                <p className="text-gray-400 text-sm">{university.nameEn}</p>
                
                <div className="mt-3">
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${university.score}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scholarships */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-white mb-4">💰 Available Scholarships</h2>
          <div className="space-y-4">
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-white font-semibold">{scholarship.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        scholarship.type === 'full' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {scholarship.amount}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{scholarship.nameEn}</p>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-red-400">📅 Deadline:</span>
                      <span className="text-red-400 font-medium">
                        {new Date(scholarship.deadline).toLocaleDateString('en-US')}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <span className="text-yellow-400 text-sm">→</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Recommended for You</h2>
            <button className="text-red-400 text-sm font-semibold">View All</button>
          </div>
          
          <div className="space-y-4">
            {recommendations.map((university, index) => (
              <motion.div
                key={university.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300"
              >
                <div className="flex space-x-4">
                  {/* University Image Placeholder */}
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  
                  {/* University Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-sm mb-1 truncate">{university.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-yellow-400 text-xs">⭐ {university.rating}</span>
                      <span className="text-gray-400 text-xs">•</span>
                      <span className="text-gray-400 text-xs">{university.city}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                      {university.description}
                    </p>
                    <div className="text-red-400 text-xs font-semibold mt-2">
                      {university.tuitionRange}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <span className="text-red-400 text-sm">→</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 grid grid-cols-3 gap-4"
        >
          {[
            { label: 'Universities', value: '150+', icon: '🏛️' },
            { label: 'Programs', value: '500+', icon: '📚' },
            { label: 'Students', value: '10K+', icon: '👥' }
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-white font-bold text-lg">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onNavigate={(page) => {
          if (onNavigate) {
            onNavigate(page);
          } else if (page === 'explore' && onExplore) {
            onExplore();
          } else if (page === 'profile') {
            setShowProfile(true);
          }
        }}
      />

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-full flex items-start justify-center p-4">
            <div className="w-full max-w-4xl">
              <UserProfile onBack={() => setShowProfile(false)} />
            </div>
          </div>
        </div>
      )}

      {/* University Details Modal */}
      <UniversityDetailsModal
        university={selectedUniversity}
        isOpen={showUniversityModal}
        onClose={handleCloseModal}
      />

      {/* Enhanced Floating Bottom Navigation */}
      {!showProfile && !showUniversityModal && (
        <FloatingBottomNav
          activeTab={activeTab}
          onTabChange={(tabId) => {
            setActiveTab(tabId);
            if (tabId === 'search' && onExplore) {
              onExplore();
            }
          }}
          variant="dashboard"
        />
      )}
    </div>
  );
};

export default StudentDashboard;
