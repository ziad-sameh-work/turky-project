'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Using Unicode icons instead of Heroicons for compatibility
// import {
//   TrophyIcon,
//   StarIcon,
//   FireIcon,
//   SparklesIcon,
//   GiftIcon,
//   ChevronRightIcon
// } from '@heroicons/react/24/outline';
import { PointsSystemData } from '../data/userProfileData';

interface PointsSystemSectionProps {
  pointsSystem: PointsSystemData;
  onRedeemReward: (rewardId: string) => void;
}

const PointsSystemSection: React.FC<PointsSystemSectionProps> = ({ 
  pointsSystem, 
  onRedeemReward 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'rewards'>('overview');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 bg-gray-500/20';
      case 'rare': return 'text-blue-400 bg-blue-500/20';
      case 'epic': return 'text-purple-400 bg-purple-500/20';
      case 'legendary': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'booking': return '📅';
      case 'social': return '👥';
      case 'travel': return '✈️';
      case 'achievement': return '🏆';
      default: return '🎯';
    }
  };

  const getRewardTypeIcon = (type: string) => {
    switch (type) {
      case 'discount': return '💰';
      case 'voucher': return '🎫';
      case 'upgrade': return '⬆️';
      case 'experience': return '🌟';
      default: return '🎁';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-yellow-500/20 rounded-lg">
          <div className="text-2xl">🏆</div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Points & Achievements</h2>
          <p className="text-sm text-gray-400">Track your progress and rewards</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-900/50 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'badges', label: 'Badges', icon: '🏅' },
          { id: 'rewards', label: 'Rewards', icon: '🎁' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-yellow-500 text-black'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Current Points & Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-6 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Current Points</h3>
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <div className="text-lg">⭐</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {pointsSystem.currentPoints.toLocaleString()}
              </div>
              <p className="text-sm text-gray-300">
                Total earned: {pointsSystem.totalEarnedPoints.toLocaleString()} points
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Membership Level</h3>
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <div className="text-lg">🏆</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {pointsSystem.membershipLevel.current}
              </div>
              <p className="text-sm text-gray-300 mb-3">
                {pointsSystem.membershipLevel.pointsToNext} points to next level
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${pointsSystem.levelProgress.progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">
                {pointsSystem.levelProgress.progressPercentage}% to {
                  pointsSystem.membershipLevel.current === 'Bronze' ? 'Silver' :
                  pointsSystem.membershipLevel.current === 'Silver' ? 'Gold' :
                  pointsSystem.membershipLevel.current === 'Gold' ? 'Platinum' :
                  pointsSystem.membershipLevel.current === 'Platinum' ? 'Diamond' : 'Max Level'
                }
              </p>
            </div>
          </div>

          {/* Membership Benefits */}
          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {pointsSystem.membershipLevel.current} Member Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pointsSystem.membershipLevel.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="text-lg">✅</div>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Earned Badges ({pointsSystem.userBadges.length})
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pointsSystem.userBadges.map((badge) => (
              <motion.div
                key={badge.id}
                className={`p-4 rounded-lg border ${getRarityColor(badge.rarity)}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{badge.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-white">{badge.name}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                        {badge.rarity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{badge.description}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <span>{getCategoryIcon(badge.category)} {badge.category}</span>
                      <span>•</span>
                      <span>{formatDate(badge.dateEarned)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Available Rewards</h3>
            <p className="text-sm text-gray-400">
              {pointsSystem.currentPoints.toLocaleString()} points available
            </p>
          </div>
          
          <div className="space-y-4">
            {pointsSystem.rewards.map((reward) => (
              <motion.div
                key={reward.id}
                className={`p-4 rounded-lg border transition-all ${
                  reward.isRedeemed 
                    ? 'bg-gray-900/50 border-gray-600 opacity-60' 
                    : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-2xl">{getRewardTypeIcon(reward.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-white">{reward.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          reward.category === 'restaurant' ? 'bg-orange-500/20 text-orange-400' :
                          reward.category === 'hotel' ? 'bg-purple-500/20 text-purple-400' :
                          reward.category === 'transportation' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {reward.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{reward.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>💰 {reward.pointsCost} points</span>
                        {reward.expiryDate && (
                          <>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                              <div className="text-sm">🔥</div>
                              <span>Expires {formatDate(reward.expiryDate)}</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-400">{reward.value}</div>
                    </div>
                    {reward.isRedeemed ? (
                      <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                        ✓ Redeemed
                      </div>
                    ) : (
                      <button
                        onClick={() => onRedeemReward(reward.id)}
                        disabled={pointsSystem.currentPoints < reward.pointsCost}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          pointsSystem.currentPoints >= reward.pointsCost
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {pointsSystem.currentPoints >= reward.pointsCost ? 'Redeem' : 'Insufficient Points'}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PointsSystemSection;
