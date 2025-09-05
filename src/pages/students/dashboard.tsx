'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StudentSidebar from '../../components/StudentSidebar';
import AIChatButton from '../../components/AIChatButton';
import StudentCostCalculator from '../../components/StudentCostCalculator';
import CommunityForum from '../../components/CommunityForum';

const StudentDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('cost-calculator');

  const renderContent = () => {
    switch (activeSection) {
      case 'cost-calculator':
        return <StudentCostCalculator />;
      case 'community':
        return <CommunityForum onBack={() => setActiveSection('cost-calculator')} />;
      case 'housing-guide':
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">دليل السكن</h2>
            <p className="text-gray-300">قريباً - دليل شامل للسكن الطلابي في تركيا</p>
          </div>
        );
      case 'study-planner':
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">مخطط الدراسة</h2>
            <p className="text-gray-300">قريباً - أداة لتنظيم جدولك الدراسي</p>
          </div>
        );
      case 'achievements':
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">الإنجازات</h2>
            <p className="text-gray-300">قريباً - تتبع إنجازاتك ونقاطك</p>
          </div>
        );
      case 'documents':
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">الوثائق المطلوبة</h2>
            <p className="text-gray-300">قريباً - دليل الوثائق المطلوبة للدراسة</p>
          </div>
        );
      default:
        return <StudentCostCalculator />;
    }
  };

  return (
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

      {/* Sidebar */}
      <StudentSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="ml-80 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 pt-8 pb-4 px-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {activeSection === 'cost-calculator' && 'حاسبة التكاليف الشهرية'}
                {activeSection === 'community' && 'مجتمع الطلاب'}
                {activeSection === 'housing-guide' && 'دليل السكن'}
                {activeSection === 'study-planner' && 'مخطط الدراسة'}
                {activeSection === 'achievements' && 'الإنجازات'}
                {activeSection === 'documents' && 'الوثائق المطلوبة'}
              </h1>
              <p className="text-gray-400">
                {activeSection === 'cost-calculator' && 'احسب تكاليف المعيشة والدراسة في تركيا'}
                {activeSection === 'community' && 'تواصل مع الطلاب الآخرين'}
                {activeSection === 'housing-guide' && 'دليل شامل للسكن الطلابي'}
                {activeSection === 'study-planner' && 'نظم جدولك الدراسي بفعالية'}
                {activeSection === 'achievements' && 'تتبع تقدمك وإنجازاتك'}
                {activeSection === 'documents' && 'جميع الوثائق المطلوبة للدراسة'}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">أحمد محمد</p>
                <p className="text-gray-400 text-sm">طالب دولي</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">👨‍🎓</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="relative z-10 px-8 pb-8">
          {renderContent()}
        </div>
      </div>

      {/* AI Chat Button */}
      <AIChatButton />
    </div>
  );
};

export default StudentDashboard;
