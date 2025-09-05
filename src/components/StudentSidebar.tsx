'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Users, 
  BookOpen, 
  Trophy, 
  FileText, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface StudentSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ activeSection, onSectionChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = [
    {
      id: 'cost-calculator',
      label: 'حاسبة التكاليف',
      labelEn: 'Cost Calculator',
      icon: Calculator,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'community',
      label: 'المجتمع',
      labelEn: 'Community',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'housing-guide',
      label: 'دليل السكن',
      labelEn: 'Housing Guide',
      icon: BookOpen,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'study-planner',
      label: 'مخطط الدراسة',
      labelEn: 'Study Planner',
      icon: BookOpen,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'achievements',
      label: 'الإنجازات',
      labelEn: 'Achievements',
      icon: Trophy,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'documents',
      label: 'الوثائق',
      labelEn: 'Documents',
      icon: FileText,
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <motion.div
      initial={{ width: isCollapsed ? 80 : 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700/50 z-40 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🎓</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Turkey Guide</h2>
                <p className="text-gray-400 text-xs">Student Dashboard</p>
              </div>
            </motion.div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="p-4 space-y-2 overflow-y-auto h-full pb-20">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSectionChange(item.id)}
              className={`w-full p-3 rounded-xl transition-all duration-200 flex items-center ${
                isActive
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                  : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/30 hover:border-gray-600/50'
              } ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}`}
            >
              <Icon size={20} className={`${isActive ? '' : 'opacity-70'}`} />
              
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex-1 text-right"
                  >
                    <h3 className="font-semibold text-sm">{item.label}</h3>
                    <p className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                      {item.labelEn}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {isActive && !isCollapsed && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StudentSidebar;
