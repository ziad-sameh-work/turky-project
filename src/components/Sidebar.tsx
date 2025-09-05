'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate }) => {
  const navigationItems = [
    {
      id: 'home',
      title: 'الصفحة الرئيسية',
      titleEn: 'Home',
      icon: '🏠',
      color: 'from-red-500 to-red-700'
    },
    {
      id: 'explore',
      title: 'استكشاف',
      titleEn: 'Explore',
      icon: '🔍',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'universities',
      title: 'الجامعات',
      titleEn: 'Universities',
      icon: '🏛️',
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 'scholarships',
      title: 'المنح الدراسية',
      titleEn: 'Scholarships',
      icon: '💰',
      color: 'from-yellow-500 to-yellow-700'
    },
    {
      id: 'applications',
      title: 'طلباتي',
      titleEn: 'My Applications',
      icon: '📝',
      color: 'from-green-500 to-green-700'
    },
    {
      id: 'favorites',
      title: 'المفضلة',
      titleEn: 'Favorites',
      icon: '❤️',
      color: 'from-pink-500 to-pink-700'
    },
    {
      id: 'community',
      title: 'المجتمع',
      titleEn: 'Community',
      icon: '👥',
      color: 'from-indigo-500 to-indigo-700'
    },
    {
      id: 'chatbot',
      title: 'المساعد الذكي',
      titleEn: 'AI Assistant',
      icon: '🤖',
      color: 'from-cyan-500 to-cyan-700'
    },
    {
      id: 'housing',
      title: 'دليل السكن',
      titleEn: 'Housing Guide',
      icon: '🏠',
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: 'documents',
      title: 'الوثائق المطلوبة',
      titleEn: 'Required Documents',
      icon: '📋',
      color: 'from-teal-500 to-teal-700'
    },
    {
      id: 'planner',
      title: 'مخطط الدراسة',
      titleEn: 'Study Planner',
      icon: '📅',
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      id: 'notifications',
      title: 'الإشعارات',
      titleEn: 'Notifications',
      icon: '🔔',
      color: 'from-red-500 to-red-700'
    },
    {
      id: 'diary',
      title: 'مذكرة الدراسة',
      titleEn: 'Study Diary',
      icon: '📖',
      color: 'from-pink-500 to-pink-700'
    },
    {
      id: 'achievements',
      title: 'الإنجازات',
      titleEn: 'Achievements',
      icon: '🏆',
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 'premium',
      title: 'العضوية المميزة',
      titleEn: 'Premium',
      icon: '👑',
      color: 'from-yellow-500 to-yellow-700'
    },
    {
      id: 'costs',
      title: 'حاسبة التكاليف',
      titleEn: 'Cost Calculator',
      icon: '💳',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'profile',
      title: 'الملف الشخصي',
      titleEn: 'Profile',
      icon: '👤',
      color: 'from-gray-500 to-gray-700'
    },
    {
      id: 'settings',
      title: 'الإعدادات',
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
            {/* Header */}
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">القائمة الرئيسية</h2>
                  <p className="text-gray-400 text-sm">Navigation Menu</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
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
                    <div className="flex-1 text-right rtl:text-right">
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

            {/* Footer */}
            <div className="p-6 border-t border-gray-700/50 mt-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl">🎓</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Turkish Study App</h3>
                <p className="text-gray-400 text-sm">Your gateway to Turkish universities</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
