'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockScholarships } from '@/data/mockData';
import FloatingBottomNav from './FloatingBottomNav';

interface ScholarshipListingsProps {
  onBack: () => void;
}

const ScholarshipListings: React.FC<ScholarshipListingsProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  const scholarshipTypes = [
    { id: 'all', name: 'All Types', icon: '🎓', color: 'from-gray-500 to-gray-700' },
    { id: 'international', name: 'International', icon: '🌍', color: 'from-blue-500 to-blue-700' },
    { id: 'merit', name: 'Merit-Based', icon: '🏆', color: 'from-yellow-500 to-yellow-700' },
    { id: 'need', name: 'Need-Based', icon: '💰', color: 'from-green-500 to-green-700' },
    { id: 'field-specific', name: 'Field-Specific', icon: '🔬', color: 'from-purple-500 to-purple-700' }
  ];

  const filteredScholarships = useMemo(() => {
    let filtered = mockScholarships.filter(scholarship => {
      const matchesSearch = scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           scholarship.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           scholarship.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === 'all' || scholarship.type === selectedType;
      
      return matchesSearch && matchesType;
    });

    // Sort scholarships
    filtered.sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else if (sortBy === 'amount') {
        // Extract numeric value from amount string for comparison
        const aAmount = parseInt(a.amount.replace(/[^0-9]/g, '')) || 0;
        const bAmount = parseInt(b.amount.replace(/[^0-9]/g, '')) || 0;
        return bAmount - aAmount;
      }
      return 0;
    });

    return filtered;
  }, [searchQuery, selectedType, sortBy]);

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return { status: 'expired', color: 'text-red-400', text: 'Expired' };
    if (daysUntil <= 7) return { status: 'urgent', color: 'text-red-400', text: `${daysUntil} days left` };
    if (daysUntil <= 30) return { status: 'soon', color: 'text-yellow-400', text: `${daysUntil} days left` };
    return { status: 'normal', color: 'text-green-400', text: `${daysUntil} days left` };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" 
        />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 px-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="mb-6 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
        >
          <span className="text-white text-xl">←</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-black text-white mb-2">
            Scholarship
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent block">
              Opportunities
            </span>
          </h1>
          <p className="text-gray-400 text-sm">
            {filteredScholarships.length} scholarships available
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative mb-6"
        >
          <input
            type="text"
            placeholder="Search scholarships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm text-white placeholder-gray-400 focus:border-yellow-500/50 focus:outline-none transition-all duration-300"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
            🔍
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex space-x-2 overflow-x-auto pb-2 mb-6"
        >
          {scholarshipTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedType(type.id)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2
                ${selectedType === type.id
                  ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                  : 'bg-gray-800/40 text-gray-300 border border-gray-700/30'
                }
              `}
            >
              <span>{type.icon}</span>
              <span>{type.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Sort Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex space-x-3 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSortBy('deadline')}
            className={`
              px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
              ${sortBy === 'deadline'
                ? 'bg-red-500/20 border border-red-500/30 text-red-300'
                : 'bg-gray-700/30 text-gray-400'
              }
            `}
          >
            📅 By Deadline
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSortBy('amount')}
            className={`
              px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
              ${sortBy === 'amount'
                ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                : 'bg-gray-700/30 text-gray-400'
              }
            `}
          >
            💰 By Amount
          </motion.button>
        </motion.div>
      </div>

      {/* Scholarship Cards */}
      <div className="relative z-10 px-6 pb-24">
        <div className="space-y-4">
          {filteredScholarships.map((scholarship, index) => {
            const deadlineInfo = getDeadlineStatus(scholarship.deadline);
            const typeInfo = scholarshipTypes.find(t => t.id === scholarship.type);
            
            return (
              <motion.div
                key={scholarship.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-5 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg leading-tight mb-1">
                      {scholarship.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{scholarship.university}</p>
                  </div>
                  
                  {typeInfo && (
                    <div className={`px-3 py-1 rounded-xl text-xs font-semibold bg-gradient-to-r ${typeInfo.color} text-white`}>
                      {typeInfo.icon} {typeInfo.name}
                    </div>
                  )}
                </div>

                {/* Amount and Deadline */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-green-400 font-bold text-xl">
                    {scholarship.amount}
                  </div>
                  <div className={`text-sm font-semibold ${deadlineInfo.color}`}>
                    📅 {deadlineInfo.text}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {scholarship.description}
                </p>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold text-sm mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {scholarship.requirements.map((req, reqIndex) => (
                      <span
                        key={reqIndex}
                        className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs rounded-lg"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-300 text-sm font-semibold"
                  >
                    📋 View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(34, 197, 94, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl text-sm font-semibold shadow-lg"
                  >
                    🚀 Apply Now
                  </motion.button>
                </div>

                {/* Swipe Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  className="flex justify-center mt-3"
                >
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5, 
                          delay: i * 0.2 
                        }}
                        className="w-1 h-1 bg-gray-600 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {filteredScholarships.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-white font-bold text-lg mb-2">No scholarships found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      {/* Floating Stats */}
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

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-yellow-500/20 to-yellow-700/20 border border-yellow-500/30 rounded-2xl p-4 backdrop-blur-sm"
      >
        <div className="text-center">
          <div className="text-yellow-400 text-2xl font-bold">${mockScholarships.reduce((total, s) => {
            const amount = parseInt(s.amount.replace(/[^0-9]/g, '')) || 0;
            return total + amount;
          }, 0).toLocaleString()}</div>
          <div className="text-yellow-300 text-xs">Total Available</div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScholarshipListings;
