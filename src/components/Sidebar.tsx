'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate }) => {
  const navigationItems = [
    {
      id: 'favorites',
      title: 'Favorites',
      titleEn: 'Favorites',
      icon: '❤️',
      color: 'from-pink-500 to-pink-700'
    },
    {
      id: 'community',
      title: 'Community',
      titleEn: 'Community',
      icon: '👥',
      color: 'from-indigo-500 to-indigo-700'
    },
    {
      id: 'housing',
      title: 'Housing Guide',
      titleEn: 'Housing Guide',
      icon: '🏠',
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: 'planner',
      title: 'Study Planner',
      titleEn: 'Study Planner',
      icon: '📅',
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      titleEn: 'Notifications',
      icon: '🔔',
      color: 'from-red-500 to-red-700'
    },
    {
      id: 'achievements',
      title: 'Achievements',
      titleEn: 'Achievements',
      icon: '🏆',
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 'settings',
      title: 'Settings',
      titleEn: 'Settings',
      icon: '⚙️',
      color: 'from-slate-500 to-slate-700'
    }
  ];

  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50 z-50 overflow-y-auto"
          >
            {/* Header Logo */}
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-2xl">🎓</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">Turkish Study App</h3>
                  <p className="text-gray-400 text-sm">Your gateway to Turkish universities</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-700/50 transition-colors absolute top-4 right-4"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="p-4 space-y-2">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleItemClick(item.id)}
                  className="w-full p-4 bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/30 hover:border-gray-600/50 rounded-xl backdrop-blur-sm transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    
                    {/* Text Content */}
                    <div className="flex-1 text-left">
                      <h3 className="text-white font-semibold text-base mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.titleEn}</p>
                    </div>
                    
                    {/* Arrow */}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-gray-400 group-hover:text-white transition-colors duration-300"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
