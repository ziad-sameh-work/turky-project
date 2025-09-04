'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBottomNav from './FloatingBottomNav';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'milestone' | 'social' | 'study' | 'premium';
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface AchievementDashboardProps {
  onBack: () => void;
}

const AchievementDashboard: React.FC<AchievementDashboardProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your profile setup',
      icon: '👋',
      category: 'milestone',
      points: 50,
      unlocked: true,
      unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'First Post',
      description: 'Make your first community post',
      icon: '📝',
      category: 'social',
      points: 100,
      unlocked: true,
      unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Storyteller',
      description: 'Create your first diary entry',
      icon: '📖',
      category: 'social',
      points: 75,
      unlocked: true,
      unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      title: 'Study Streak',
      description: 'Use the app for 7 consecutive days',
      icon: '🔥',
      category: 'study',
      points: 200,
      unlocked: false,
      progress: 5,
      maxProgress: 7
    },
    {
      id: '5',
      title: 'University Explorer',
      description: 'View 10 different university profiles',
      icon: '🏛️',
      category: 'study',
      points: 150,
      unlocked: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: '6',
      title: 'Social Butterfly',
      description: 'Get 50 likes on your posts',
      icon: '🦋',
      category: 'social',
      points: 300,
      unlocked: false,
      progress: 24,
      maxProgress: 50
    },
    {
      id: '7',
      title: 'Premium Member',
      description: 'Subscribe to premium plan',
      icon: '👑',
      category: 'premium',
      points: 500,
      unlocked: false
    },
    {
      id: '8',
      title: 'Application Master',
      description: 'Complete all required documents',
      icon: '📋',
      category: 'milestone',
      points: 400,
      unlocked: false,
      progress: 6,
      maxProgress: 8
    },
    {
      id: '9',
      title: 'Community Helper',
      description: 'Help 5 students with replies',
      icon: '🤝',
      category: 'social',
      points: 250,
      unlocked: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: '10',
      title: 'YÖS Champion',
      description: 'Complete YÖS exam registration',
      icon: '🏆',
      category: 'milestone',
      points: 1000,
      unlocked: false
    }
  ]);

  const categories = [
    { id: 'all', name: 'All', icon: '🏆' },
    { id: 'milestone', name: 'Milestones', icon: '🎯' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'study', name: 'Study', icon: '📚' },
    { id: 'premium', name: 'Premium', icon: '👑' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const completionPercentage = (unlockedCount / achievements.length) * 100;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'milestone': return 'from-blue-500/20 to-blue-700/20 border-blue-500/30 text-blue-400';
      case 'social': return 'from-green-500/20 to-green-700/20 border-green-500/30 text-green-400';
      case 'study': return 'from-purple-500/20 to-purple-700/20 border-purple-500/30 text-purple-400';
      case 'premium': return 'from-yellow-500/20 to-yellow-700/20 border-yellow-500/30 text-yellow-400';
      default: return 'from-gray-500/20 to-gray-700/20 border-gray-500/30 text-gray-400';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getLevel = (points: number) => {
    if (points >= 2000) return { level: 'Master', color: 'text-purple-400', next: null };
    if (points >= 1000) return { level: 'Expert', color: 'text-blue-400', next: 2000 };
    if (points >= 500) return { level: 'Advanced', color: 'text-green-400', next: 1000 };
    if (points >= 200) return { level: 'Intermediate', color: 'text-yellow-400', next: 500 };
    return { level: 'Beginner', color: 'text-gray-400', next: 200 };
  };

  const currentLevel = getLevel(totalPoints);

  return (
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

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 pt-12 pb-4 px-6"
      >
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-1">Achievements</h1>
            <p className="text-sm text-gray-400">Track your progress</p>
          </div>

          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-xl">🏆</span>
          </div>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-6 mb-6"
      >
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
              className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-purple-500/25"
            >
              <span className="text-white text-3xl">🎖️</span>
            </motion.div>
            <h2 className={`text-2xl font-bold mb-2 ${currentLevel.color}`}>
              {currentLevel.level}
            </h2>
            <div className="text-3xl font-bold text-white mb-1">{totalPoints}</div>
            <div className="text-gray-400 text-sm">Total Points</div>
          </div>

          {currentLevel.next && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Next Level</span>
                <span className="text-gray-400 text-sm">{totalPoints} / {currentLevel.next}</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalPoints / currentLevel.next) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-white">{unlockedCount}</div>
              <div className="text-gray-400 text-sm">Unlocked</div>
            </div>
            <div>
              <div className="text-xl font-bold text-purple-400">{Math.round(completionPercentage)}%</div>
              <div className="text-gray-400 text-sm">Complete</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-6 mb-6"
      >
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-purple-500/20 border border-purple-500/30 text-purple-400'
                  : 'bg-gray-800/50 border border-gray-700/30 text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Achievements Grid */}
      <div className="relative z-10 px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-2xl border backdrop-blur-sm transition-all ${
                  achievement.unlocked
                    ? `bg-gradient-to-r ${getCategoryColor(achievement.category)} shadow-lg`
                    : 'bg-gray-800/40 border-gray-700/30'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all ${
                    achievement.unlocked 
                      ? 'bg-white/10 shadow-lg' 
                      : 'bg-gray-700/50 grayscale opacity-50'
                  }`}>
                    {achievement.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-bold ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {achievement.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'
                        }`}>
                          {achievement.points}pts
                        </span>
                        {achievement.unlocked && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-3 leading-relaxed ${
                      achievement.unlocked ? 'text-gray-200' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>

                    {achievement.unlocked && achievement.unlockedAt ? (
                      <div className="text-xs text-gray-400">
                        Unlocked {formatDate(achievement.unlockedAt)}
                      </div>
                    ) : achievement.progress !== undefined && achievement.maxProgress ? (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">Progress</span>
                          <span className="text-xs text-gray-400">
                            {achievement.progress} / {achievement.maxProgress}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500">
                        🔒 Locked
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredAchievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-white font-bold text-lg mb-2">No achievements found</h3>
            <p className="text-gray-400 text-sm">Try selecting a different category.</p>
          </motion.div>
        )}

        {/* Premium Discount Info */}
        {totalPoints >= 500 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-r from-yellow-500/20 to-orange-700/20 border border-yellow-500/30 rounded-2xl p-6 text-center"
          >
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-yellow-400 font-bold text-lg mb-2">Premium Discount Available!</h3>
            <p className="text-gray-300 text-sm mb-4">
              You've earned {Math.floor(totalPoints / 100) * 5}% discount on premium subscription!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl text-white font-medium"
            >
              Claim Discount
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Enhanced Floating Bottom Navigation */}
      <FloatingBottomNav
        activeTab="search"
        onTabChange={(tabId: string) => {
          if (tabId === 'home') {
            onBack();
          }
        }}
        variant="dashboard"
      />
    </div>
  );
};

export default AchievementDashboard;
