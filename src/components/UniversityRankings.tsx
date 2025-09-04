'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockUniversities } from '@/data/mockData';
import FloatingBottomNav from './FloatingBottomNav';

interface UniversityRankingsProps {
  onUniversitySelect: (universityId: string) => void;
  onBack: () => void;
}

const UniversityRankings: React.FC<UniversityRankingsProps> = ({ onUniversitySelect, onBack }) => {
  const [selectedField, setSelectedField] = useState('all');
  const [sortBy, setSortBy] = useState('ranking');
  const [maxTuition, setMaxTuition] = useState(25000);
  const [showFilters, setShowFilters] = useState(false);

  const fields = [
    { id: 'all', name: 'All Fields', icon: '🎓' },
    { id: 'engineering', name: 'Engineering', icon: '⚙️' },
    { id: 'computer-science', name: 'Computer Science', icon: '💻' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'medicine', name: 'Medicine', icon: '🏥' }
  ];

  const sortOptions = [
    { id: 'ranking', name: 'World Ranking', icon: '🏆' },
    { id: 'tuition', name: 'Tuition Cost', icon: '💰' },
    { id: 'acceptance', name: 'Acceptance Rate', icon: '📊' },
    { id: 'students', name: 'Student Count', icon: '👥' }
  ];

  const filteredAndSortedUniversities = useMemo(() => {
    let filtered = mockUniversities.filter((uni: any) => {
      // Field filter
      if (selectedField !== 'all') {
        const fieldMatch = uni.programs?.some((program: string) => 
          program.toLowerCase().includes(selectedField.replace('-', ' '))
        );
        if (!fieldMatch) return false;
      }

      // Tuition filter (extract min value from range)
      const tuitionRange = uni.tuitionRange || '$0 - $0';
      const tuitionMin = parseInt(tuitionRange.split(' - ')[0].replace(/[^0-9]/g, ''));
      if (tuitionMin > maxTuition) return false;

      return true;
    });

    // Sort universities
    filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'ranking':
          return a.worldRank - b.worldRank;
        case 'tuition':
          const aTuition = parseInt(a.tuitionRange.split(' - ')[0].replace(/[^0-9]/g, ''));
          const bTuition = parseInt(b.tuitionRange.split(' - ')[0].replace(/[^0-9]/g, ''));
          return aTuition - bTuition;
        case 'acceptance':
          return parseInt(a.acceptanceRate) - parseInt(b.acceptanceRate);
        case 'students':
          return parseInt(b.studentCount.replace(/[^0-9]/g, '')) - parseInt(a.studentCount.replace(/[^0-9]/g, ''));
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedField, sortBy, maxTuition]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" 
        />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 px-6">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
          >
            <span className="text-white text-xl">←</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowFilters(!showFilters)}
            className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
          >
            <span className="text-white text-xl">⚙️</span>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-black text-white mb-2">
            University
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent block">
              Rankings
            </span>
          </h1>
          <p className="text-gray-400 text-sm">
            {filteredAndSortedUniversities.length} universities found
          </p>
        </motion.div>

        {/* Quick Field Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-2 overflow-x-auto pb-2 mb-6"
        >
          {fields.map((field) => (
            <motion.button
              key={field.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedField(field.id)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                ${selectedField === field.id
                  ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg'
                  : 'bg-gray-800/40 text-gray-300 border border-gray-700/30'
                }
              `}
            >
              <span className="mr-2">{field.icon}</span>
              {field.name}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10 px-6 mb-6"
          >
            <div className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-4 backdrop-blur-sm">
              {/* Sort Options */}
              <div className="mb-4">
                <h3 className="text-white font-semibold text-sm mb-3">Sort By</h3>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSortBy(option.id)}
                      className={`
                        p-3 rounded-xl text-sm transition-all duration-300 flex items-center space-x-2
                        ${sortBy === option.id
                          ? 'bg-red-500/20 border border-red-500/30 text-red-300'
                          : 'bg-gray-700/30 text-gray-400'
                        }
                      `}
                    >
                      <span>{option.icon}</span>
                      <span>{option.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Tuition Range */}
              <div>
                <h3 className="text-white font-semibold text-sm mb-3">
                  Max Tuition: ${maxTuition.toLocaleString()}
                </h3>
                <input
                  type="range"
                  min="5000"
                  max="30000"
                  step="1000"
                  value={maxTuition}
                  onChange={(e) => setMaxTuition(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* University List */}
      <div className="relative z-10 px-6 pb-24">
        <div className="space-y-4">
          {filteredAndSortedUniversities.map((university, index) => (
            <motion.div
              key={university.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onUniversitySelect(university.id)}
              className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-4 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300 cursor-pointer"
            >
              <div className="flex space-x-4">
                {/* University Logo/Rank */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-red-400 text-xs font-bold">#{university.localRank}</div>
                      <div className="text-white text-lg">🏛️</div>
                    </div>
                  </div>
                </div>

                {/* University Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-bold text-sm leading-tight">
                      {university.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-yellow-400 text-xs">⭐ {university.rating}</div>
                      <div className="text-gray-400 text-xs">World #{university.worldRank}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-2 text-xs text-gray-400">
                    <span>📍 {university.city}</span>
                    <span>👥 {university.studentCount}</span>
                    <span>🌍 {university.internationalStudents}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-red-400 text-sm font-semibold">
                      {university.tuitionRange}
                    </div>
                    <div className="text-green-400 text-xs">
                      {university.acceptanceRate} acceptance
                    </div>
                  </div>

                  {/* Programs */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {university.programs.slice(0, 3).map((program, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-lg"
                      >
                        {program}
                      </span>
                    ))}
                    {university.programs.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-lg">
                        +{university.programs.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Arrow */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex-shrink-0 self-center text-gray-400 text-xl"
                >
                  →
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAndSortedUniversities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white font-bold text-lg mb-2">No universities found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your filters</p>
          </motion.div>
        )}
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

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/25"
      >
        <span className="text-white text-xl">📊</span>
      </motion.button>
    </div>
  );
};

export default UniversityRankings;
