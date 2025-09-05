'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
// Using Unicode icons instead of Heroicons for compatibility
// import {
//   ArrowLeftIcon,
//   UserIcon,
//   TrophyIcon,
//   AcademicCapIcon,
//   DocumentTextIcon
// } from '@heroicons/react/24/outline';
import { mockUserProfile } from '../data/userProfileData';
import PersonalInfoSection from './PersonalInfoSection';
import PointsSystemSection from './PointsSystemSection';
import UniversityStatusSection from './UniversityStatusSection';
import DocumentUploadSection from './DocumentUploadSection';
import DigitalWalletSection from './DigitalWalletSection';
import type { UserProfile, PersonalInfo, UniversityStatus } from '../data/userProfileData';

interface UserProfileProps {
  onBack?: () => void;
  userType?: 'student' | 'tourist';
}

const UserProfile: React.FC<UserProfileProps> = ({ onBack, userType = 'student' }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [activeSection, setActiveSection] = useState<'personal' | 'points' | 'university' | 'documents' | 'wallet'>('personal');

  // Filter sections based on user type
  const availableSections = userType === 'student' ? 
    ['personal', 'points', 'university', 'documents', 'wallet'] : 
    ['personal', 'points', 'documents', 'wallet'];

  const handlePersonalInfoSave = (updatedInfo: PersonalInfo) => {
    setUserProfile(prev => ({
      ...prev,
      personalInfo: updatedInfo,
      updatedAt: new Date().toISOString()
    }));
    // In a real app, you would make an API call here
    console.log('Personal info updated:', updatedInfo);
  };

  const handleUniversityStatusSave = (updatedStatus: UniversityStatus) => {
    setUserProfile(prev => ({
      ...prev,
      universityStatus: updatedStatus,
      updatedAt: new Date().toISOString()
    }));
    // In a real app, you would make an API call here
    console.log('University status updated:', updatedStatus);
  };


  const handleRedeemReward = (rewardId: string) => {
    setUserProfile(prev => {
      const reward = prev.pointsSystem.rewards.find(r => r.id === rewardId);
      if (!reward || prev.pointsSystem.currentPoints < reward.pointsCost) {
        return prev;
      }

      return {
        ...prev,
        pointsSystem: {
          ...prev.pointsSystem,
          currentPoints: prev.pointsSystem.currentPoints - reward.pointsCost,
          rewards: prev.pointsSystem.rewards.map(r => 
            r.id === rewardId ? { ...r, isRedeemed: true } : r
          )
        },
        updatedAt: new Date().toISOString()
      };
    });
    // In a real app, you would make an API call here
    console.log('Reward redeemed:', rewardId);
  };

  const handleDocumentUpload = async (documentType: string, file: File) => {
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newDocument = {
      id: `doc-${Date.now()}`,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      uploadDate: new Date().toISOString(),
      verificationStatus: 'pending' as const
    };

    setUserProfile(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: newDocument
      },
      updatedAt: new Date().toISOString()
    }));
    
    // In a real app, you would upload to a server here
    console.log('Document uploaded:', documentType, file.name);
  };

  const handleDocumentDelete = (documentType: string) => {
    setUserProfile(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: undefined
      },
      updatedAt: new Date().toISOString()
    }));
    // In a real app, you would make an API call here
    console.log('Document deleted:', documentType);
  };

  const handleWalletTopUp = (amount: number, paymentMethodId: string) => {
    // Simulate wallet top-up
    const newTransaction = {
      id: `txn-${Date.now()}`,
      type: 'topup' as const,
      amount: amount,
      currency: 'TRY' as const,
      description: 'Wallet Top-up',
      category: 'other' as const,
      status: 'completed' as const,
      paymentMethod: paymentMethodId,
      date: new Date().toISOString(),
      isOnline: true,
      pointsEarned: Math.floor(amount * 0.05)
    };

    setUserProfile(prev => ({
      ...prev,
      digitalWallet: {
        ...prev.digitalWallet,
        balance: {
          ...prev.digitalWallet.balance,
          totalBalance: prev.digitalWallet.balance.totalBalance + amount,
          availableBalance: prev.digitalWallet.balance.availableBalance + amount,
          lastUpdated: new Date().toISOString()
        },
        transactions: [newTransaction, ...prev.digitalWallet.transactions]
      },
      pointsSystem: {
        ...prev.pointsSystem,
        currentPoints: prev.pointsSystem.currentPoints + (newTransaction.pointsEarned || 0),
        totalEarnedPoints: prev.pointsSystem.totalEarnedPoints + (newTransaction.pointsEarned || 0)
      },
      updatedAt: new Date().toISOString()
    }));
    
    console.log('Wallet topped up:', amount, paymentMethodId);
  };


  const allSections = [
    {
      id: 'personal',
      name: 'Personal Info',
      icon: <div className="text-lg">👤</div>,
      color: 'from-blue-500 to-blue-700',
      description: 'Manage your profile details'
    },
    {
      id: 'points',
      name: 'Points & Achievements',
      icon: <div className="text-lg">🏆</div>,
      color: 'from-yellow-500 to-orange-700',
      description: 'View your progress and rewards'
    },
    {
      id: 'university',
      name: 'University Status',
      icon: <div className="text-lg">🎓</div>,
      color: 'from-purple-500 to-purple-700',
      description: 'Academic information'
    },
    {
      id: 'documents',
      name: 'Documents',
      icon: <div className="text-lg">📄</div>,
      color: 'from-green-500 to-green-700',
      description: 'Upload verification documents'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: <div className="text-lg">💰</div>,
      color: 'from-indigo-500 to-indigo-700',
      description: 'Manage payments and transactions'
    }
  ];

  // Filter sections based on user type
  const sections = allSections.filter(section => availableSections.includes(section.id));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="text-lg">←</div>
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">User Profile</h1>
              <p className="text-gray-400">Manage your account and preferences</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Last updated</p>
            <p className="text-white">
              {new Date(userProfile.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        {/* Profile Summary Card */}
        <motion.div
          className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              {userProfile.personalInfo.profilePicture ? (
                <Image
                  src={userProfile.personalInfo.profilePicture}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-lg">👤</div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">
                {userProfile.personalInfo.fullName}
              </h2>
              <p className="text-gray-400 mb-2">{userProfile.personalInfo.email}</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center space-x-1">
                  <div className="text-lg">🏆</div>
                  <span className="text-yellow-400">{userProfile.pointsSystem.membershipLevel.current}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">{userProfile.pointsSystem.currentPoints.toLocaleString()} points</span>
                </span>
                {userType === 'student' && userProfile.universityStatus.isEnrolled && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="flex items-center space-x-1">
                      <div className="text-lg">🎓</div>
                      <span className="text-purple-400">Student</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Navigation */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as typeof activeSection)}
              className={`p-4 rounded-xl border transition-all ${
                activeSection === section.id
                  ? `bg-gradient-to-r ${section.color} text-white border-transparent`
                  : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800'
              }`}
            >
              <div className="flex flex-col items-center">
                {section.icon}
                <div className="text-sm font-medium mt-2">{section.name}</div>
                <div className="text-xs opacity-80 mt-1">{section.description}</div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Active Section Content */}
        <div className="space-y-6">
          {activeSection === 'personal' && (
            <PersonalInfoSection
              personalInfo={userProfile.personalInfo}
              onSave={handlePersonalInfoSave}
            />
          )}
          
          {activeSection === 'points' && (
            <PointsSystemSection
              pointsSystem={userProfile.pointsSystem}
              onRedeemReward={handleRedeemReward}
            />
          )}
          
          {activeSection === 'university' && userType === 'student' && (
            <UniversityStatusSection
              universityStatus={userProfile.universityStatus}
              onSave={handleUniversityStatusSave}
            />
          )}
          
          {activeSection === 'documents' && (
            <DocumentUploadSection
              documents={userProfile.documents}
              onUpload={handleDocumentUpload}
              onDelete={handleDocumentDelete}
            />
          )}
          
          {activeSection === 'wallet' && (
            <DigitalWalletSection
              digitalWallet={userProfile.digitalWallet}
              onTopUpWallet={handleWalletTopUp}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
