'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface EssentialApp {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  downloadLinks: {
    ios?: string;
    android?: string;
    web?: string;
  };
  rating: number;
  features: string[];
}

interface EssentialAppsProps {
  apps?: EssentialApp[];
}

const EssentialApps: React.FC<EssentialAppsProps> = ({ apps }) => {
  const defaultApps: EssentialApp[] = [
    {
      id: '1',
      name: 'Google Translate',
      description: 'Essential for communication with locals',
      category: 'Communication',
      icon: '🌐',
      downloadLinks: {
        ios: 'https://apps.apple.com/app/google-translate/id414706506',
        android: 'https://play.google.com/store/apps/details?id=com.google.android.apps.translate',
        web: 'https://translate.google.com'
      },
      rating: 4.5,
      features: ['Offline translation', 'Camera translation', 'Voice input', 'Turkish support']
    },
    {
      id: '2',
      name: 'Moovit',
      description: 'Public transportation navigation in Istanbul',
      category: 'Transportation',
      icon: '🚇',
      downloadLinks: {
        ios: 'https://apps.apple.com/app/moovit/id498477945',
        android: 'https://play.google.com/store/apps/details?id=com.tranzmate'
      },
      rating: 4.3,
      features: ['Real-time arrivals', 'Route planning', 'Metro & bus info', 'Offline maps']
    },
    {
      id: '3',
      name: 'Yemeksepeti',
      description: 'Food delivery service across Turkey',
      category: 'Food & Dining',
      icon: '🍕',
      downloadLinks: {
        ios: 'https://apps.apple.com/app/yemeksepeti/id445499454',
        android: 'https://play.google.com/store/apps/details?id=com.yemeksepeti.android'
      },
      rating: 4.2,
      features: ['Local restaurants', 'Fast delivery', 'Multiple cuisines', 'Payment options']
    },
    {
      id: '4',
      name: 'BiTaksi',
      description: 'Reliable taxi service in major Turkish cities',
      category: 'Transportation',
      icon: '🚕',
      downloadLinks: {
        ios: 'https://apps.apple.com/app/bitaksi/id542591434',
        android: 'https://play.google.com/store/apps/details?id=com.bitaksi.bitaksi'
      },
      rating: 4.1,
      features: ['GPS tracking', 'Fare estimation', 'Multiple payment', 'Driver ratings']
    },
    {
      id: '5',
      name: 'TripAdvisor',
      description: 'Reviews and recommendations for attractions',
      category: 'Travel',
      icon: '🏛️',
      downloadLinks: {
        ios: 'https://apps.apple.com/app/tripadvisor/id284876795',
        android: 'https://play.google.com/store/apps/details?id=com.tripadvisor.tripadvisor'
      },
      rating: 4.4,
      features: ['Tourist reviews', 'Photo galleries', 'Booking options', 'Offline access']
    },
    {
      id: '6',
      name: 'XE Currency',
      description: 'Real-time currency conversion for Turkish Lira',
      category: 'Finance',
      icon: '💱',
      downloadLinks: {
        ios: 'https://apps.apple.com/app/xe-currency/id315241195',
        android: 'https://play.google.com/store/apps/details?id=com.xe.currency'
      },
      rating: 4.6,
      features: ['Live rates', 'Offline mode', 'Rate alerts', 'Calculator']
    }
  ];

  const appsToShow = apps || defaultApps;

  const handleDownload = (link: string, appName: string, platform: string) => {
    window.open(link, '_blank');
    // Track download for analytics
    console.log(`Downloaded ${appName} for ${platform}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Communication': return 'from-blue-500 to-cyan-600';
      case 'Transportation': return 'from-green-500 to-emerald-600';
      case 'Food & Dining': return 'from-orange-500 to-red-600';
      case 'Travel': return 'from-purple-500 to-pink-600';
      case 'Finance': return 'from-yellow-500 to-amber-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-2">📱 Essential Apps</h2>
        <p className="text-gray-400">Must-have applications for your Turkey trip</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appsToShow.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300"
          >
            {/* App Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${getCategoryColor(app.category)} flex items-center justify-center text-2xl shadow-lg`}>
                {app.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">{app.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{app.description}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-yellow-400 text-sm font-medium">{app.rating}</span>
                  <span className="text-gray-500 text-xs">•</span>
                  <span className="text-gray-400 text-xs">{app.category}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h4 className="text-gray-300 text-sm font-medium mb-2">Key Features:</h4>
              <div className="flex flex-wrap gap-2">
                {app.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-lg"
                  >
                    {feature}
                  </span>
                ))}
                {app.features.length > 3 && (
                  <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-lg">
                    +{app.features.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Download Buttons */}
            <div className="space-y-2">
              <h4 className="text-gray-300 text-sm font-medium">Download:</h4>
              <div className="flex flex-wrap gap-2">
                {app.downloadLinks.ios && (
                  <motion.button
                    onClick={() => handleDownload(app.downloadLinks.ios!, app.name, 'iOS')}
                    className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-lg text-white text-sm font-medium transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>🍎</span>
                    <span>App Store</span>
                  </motion.button>
                )}
                {app.downloadLinks.android && (
                  <motion.button
                    onClick={() => handleDownload(app.downloadLinks.android!, app.name, 'Android')}
                    className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-lg text-white text-sm font-medium transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>🤖</span>
                    <span>Google Play</span>
                  </motion.button>
                )}
                {app.downloadLinks.web && (
                  <motion.button
                    onClick={() => handleDownload(app.downloadLinks.web!, app.name, 'Web')}
                    className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg text-white text-sm font-medium transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>🌐</span>
                    <span>Web App</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Download All */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-6 text-center"
      >
        <h3 className="text-white font-bold text-lg mb-2">📋 Quick Setup Guide</h3>
        <p className="text-gray-300 text-sm mb-4">
          Download these apps before your trip for the best experience in Turkey
        </p>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📥 Download Setup Guide (PDF)
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EssentialApps;
