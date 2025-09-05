'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { TouristDashboardData } from '../data/mockData';

interface TouristProfileDashboardProps {
  dashboardData: TouristDashboardData;
  onClose: () => void;
}

const TouristProfileDashboard: React.FC<TouristProfileDashboardProps> = ({ dashboardData, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'points' | 'documents'>('overview');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const { personalInfo, pointsSystem, documents, statistics } = dashboardData;

  const progressPercentage = ((pointsSystem.currentPoints) / (pointsSystem.currentPoints + pointsSystem.pointsToNextLevel)) * 100;

  const canDownloadPDF = documents.passportPhoto && documents.personalPhoto && 
                         documents.passportPhotoVerified && documents.personalPhotoVerified;

  const generatePDF = async () => {
    if (!canDownloadPDF) return;
    
    setIsGeneratingPDF(true);
    
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock PDF download with password protection
    const password = personalInfo.phoneNumber.slice(-4);
    const blob = new Blob(['Mock PDF content'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personalInfo.fullName.replace(' ', '_')}_Travel_Documents_${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setIsGeneratingPDF(false);
    
    // Show password notification
    alert(`PDF downloaded successfully!\nPassword: ${password}\n(Last 4 digits of your phone number)`);
  };


  const getActivityColor = (category: string) => {
    switch (category) {
      case 'booking': return 'text-blue-400 bg-blue-500/20';
      case 'review': return 'text-yellow-400 bg-yellow-500/20';
      case 'referral': return 'text-green-400 bg-green-500/20';
      case 'achievement': return 'text-purple-400 bg-purple-500/20';
      case 'redemption': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'points', name: 'Points History', icon: '⭐' },
    { id: 'documents', name: 'Documents', icon: '📄' }
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={personalInfo.profilePicture}
                  alt={personalInfo.fullName}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white/20"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="text-white text-xs">✓</div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{personalInfo.fullName}</h1>
                <p className="text-blue-100">{personalInfo.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                    {pointsSystem.membershipLevel} Member
                  </span>
                  <span className="text-blue-100 text-sm">
                    Joined {new Date(personalInfo.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <div className="text-2xl">✕</div>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-700">
          <div className="flex space-x-1 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Personal Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <div className="text-xl">👤</div>
                      <span>Personal Information</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Phone:</span>
                        <span className="text-white">{personalInfo.phoneNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Nationality:</span>
                        <span className="text-white">{personalInfo.nationality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Language:</span>
                        <span className="text-white">{personalInfo.preferredLanguage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">University:</span>
                        <span className={`${personalInfo.universityEnrollment ? 'text-green-400' : 'text-red-400'}`}>
                          {personalInfo.universityEnrollment ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-2">Travel Preferences:</span>
                        <div className="flex flex-wrap gap-2">
                          {personalInfo.travelPreferences.map((pref) => (
                            <span key={pref} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">
                              {pref}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {personalInfo.bio && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <span className="text-gray-400 block mb-2">Bio:</span>
                        <p className="text-gray-300 text-sm">{personalInfo.bio}</p>
                      </div>
                    )}
                  </div>

                  {/* Points System */}
                  <div className="bg-gray-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <div className="text-xl">⭐</div>
                      <span>Points & Membership</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-400">{pointsSystem.currentPoints}</div>
                        <div className="text-gray-400">Current Points</div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">{pointsSystem.membershipLevel}</span>
                          <span className="text-gray-400">{pointsSystem.nextLevel}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                        <div className="text-center text-sm text-gray-400 mt-2">
                          {pointsSystem.pointsToNextLevel} points to {pointsSystem.nextLevel}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-lg font-semibold text-white">{pointsSystem.totalPointsEarned}</div>
                          <div className="text-xs text-gray-400">Total Earned</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-white">{statistics.totalReviews}</div>
                          <div className="text-xs text-gray-400">Reviews Written</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <div className="text-xl">📊</div>
                    <span>Travel Statistics</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{statistics.totalReviews}</div>
                      <div className="text-sm text-gray-400">Reviews</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{statistics.averageRating}</div>
                      <div className="text-sm text-gray-400">Avg Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{statistics.totalDistance}km</div>
                      <div className="text-sm text-gray-400">Distance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{statistics.countriesVisited}</div>
                      <div className="text-sm text-gray-400">Countries</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-gray-400">Favorite Category: </span>
                    <span className="text-white font-medium">{statistics.favoriteCategory}</span>
                  </div>
                </div>
              </motion.div>
            )}


            {/* Points History Tab */}
            {activeTab === 'points' && (
              <motion.div
                key="points"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">Recent Point Activities</h3>
                <div className="space-y-3">
                  {pointsSystem.recentActivities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      className="bg-gray-800/50 rounded-lg p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{activity.icon}</div>
                          <div>
                            <h4 className="font-medium text-white">{activity.activity}</h4>
                            {activity.description && (
                              <p className="text-sm text-gray-400">{activity.description}</p>
                            )}
                            <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-semibold ${activity.type === 'earned' ? 'text-green-400' : 'text-red-400'}`}>
                            {activity.type === 'earned' ? '+' : ''}{activity.points}
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${getActivityColor(activity.category)}`}>
                            {activity.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <motion.div
                key="documents"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-white">Document Management</h3>
                
                {/* Document Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">Passport Photo</h4>
                      <div className={`px-2 py-1 rounded text-xs ${documents.passportPhotoVerified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {documents.passportPhotoVerified ? 'Verified' : 'Pending'}
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-lg h-32 flex items-center justify-center">
                      {documents.passportPhoto ? (
                        <span className="text-gray-300">📄 Passport Photo</span>
                      ) : (
                        <span className="text-gray-500">No photo uploaded</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">Personal Photo</h4>
                      <div className={`px-2 py-1 rounded text-xs ${documents.personalPhotoVerified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {documents.personalPhotoVerified ? 'Verified' : 'Pending'}
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-lg h-32 flex items-center justify-center">
                      {documents.personalPhoto ? (
                        <span className="text-gray-300">📷 Personal Photo</span>
                      ) : (
                        <span className="text-gray-500">No photo uploaded</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* PDF Download Section */}
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <div className="text-xl">📥</div>
                    <span>Download Travel Documents PDF</span>
                  </h4>
                  
                  {canDownloadPDF ? (
                    <div className="space-y-4">
                      <div className="text-sm text-gray-300">
                        <p>Your document package includes:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Verified passport photo</li>
                          <li>Verified personal photo</li>
                          <li>Digital watermark with your name and date</li>
                          <li>Password protection (last 4 digits of phone number)</li>
                        </ul>
                      </div>
                      
                      <button
                        onClick={generatePDF}
                        disabled={isGeneratingPDF}
                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        {isGeneratingPDF ? (
                          <>
                            <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                            <span>Generating PDF...</span>
                          </>
                        ) : (
                          <>
                            <div className="text-lg">📄</div>
                            <span>Download Secure PDF</span>
                          </>
                        )}
                      </button>
                      
                      <div className="text-xs text-gray-400 text-center">
                        Last updated: {new Date(documents.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-red-400 mb-3">⚠️ Missing Required Documents</div>
                      <p className="text-gray-300 text-sm mb-4">
                        Please upload and verify both passport and personal photos before downloading the PDF.
                      </p>
                      <div className="space-y-2 text-sm">
                        {!documents.passportPhoto && (
                          <div className="text-red-400">• Passport photo not uploaded</div>
                        )}
                        {!documents.personalPhoto && (
                          <div className="text-red-400">• Personal photo not uploaded</div>
                        )}
                        {!documents.passportPhotoVerified && documents.passportPhoto && (
                          <div className="text-yellow-400">• Passport photo pending verification</div>
                        )}
                        {!documents.personalPhotoVerified && documents.personalPhoto && (
                          <div className="text-yellow-400">• Personal photo pending verification</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TouristProfileDashboard;
