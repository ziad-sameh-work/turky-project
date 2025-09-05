'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PreTravelGuide from './PreTravelGuide';
import BestTimesToVisit from './BestTimesToVisit';
import EssentialApps from './EssentialApps';
import SafetyTips from './SafetyTips';
import InternetGuide from './InternetGuide';
import AdditionalInfo from './AdditionalInfo';
import type { TravelGuide } from '../data/mockData';

interface TravelTipsMainProps {
  travelGuide: TravelGuide;
}

const TravelTipsMain: React.FC<TravelTipsMainProps> = ({ travelGuide }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'pre-travel' | 'best-times' | 'apps' | 'safety' | 'internet' | 'additional'>('overview');

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📚', description: 'Complete travel guide overview' },
    { id: 'pre-travel', name: 'Pre-Travel', icon: '📋', description: 'Visa, insurance & documents' },
    { id: 'best-times', name: 'Best Times', icon: '🌤️', description: 'Weather & seasonal guide' },
    { id: 'apps', name: 'Essential Apps', icon: '📱', description: 'Must-have mobile apps' },
    { id: 'safety', name: 'Safety Tips', icon: '🛡️', description: 'Stay safe while traveling' },
    { id: 'internet', name: 'Internet Guide', icon: '📶', description: 'SIM cards & WiFi options' },
    { id: 'additional', name: 'Additional Info', icon: '📄', description: 'Laws, costs & emergencies' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <div className="text-4xl">📚</div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Travel Tips & Guides</h1>
              <p className="text-gray-300">Your complete guide to traveling in Turkey</p>
            </div>
          </div>
        </motion.div>

        {activeSection === 'overview' ? (
          /* Overview Section */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                className="bg-blue-500/20 rounded-xl p-4 text-center border border-blue-500/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl mb-2">🛂</div>
                <div className="text-lg font-semibold text-white">{travelGuide.preTravel.visaRequirements.length}</div>
                <div className="text-sm text-gray-300">Countries Covered</div>
              </motion.div>
              <motion.div
                className="bg-green-500/20 rounded-xl p-4 text-center border border-green-500/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl mb-2">🌤️</div>
                <div className="text-lg font-semibold text-white">{travelGuide.bestTimes.length}</div>
                <div className="text-sm text-gray-300">Months Analyzed</div>
              </motion.div>
              <motion.div
                className="bg-purple-500/20 rounded-xl p-4 text-center border border-purple-500/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl mb-2">📱</div>
                <div className="text-lg font-semibold text-white">{travelGuide.essentialApps.length}</div>
                <div className="text-sm text-gray-300">Essential Apps</div>
              </motion.div>
              <motion.div
                className="bg-orange-500/20 rounded-xl p-4 text-center border border-orange-500/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl mb-2">🛡️</div>
                <div className="text-lg font-semibold text-white">{travelGuide.safetyTips.length}</div>
                <div className="text-sm text-gray-300">Safety Tips</div>
              </motion.div>
            </div>

            {/* Section Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.slice(1).map((section, index) => (
                <motion.button
                  key={section.id}
                  className="bg-gray-800/50 rounded-xl p-6 text-left hover:bg-gray-800/70 transition-all border border-gray-700 hover:border-gray-600"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setActiveSection(section.id as typeof activeSection)}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-3xl">{section.icon}</div>
                    <h3 className="text-lg font-semibold text-white">{section.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{section.description}</p>
                  <div className="mt-4 flex items-center text-blue-400 text-sm">
                    <span>Explore</span>
                    <div className="ml-2">→</div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Featured Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <motion.div
                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                  <div className="text-xl">🌟</div>
                  <span>Quick Start Guide</span>
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <div className="text-green-400">✓</div>
                    <span>Check visa requirements for your country</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-green-400">✓</div>
                    <span>Get travel insurance coverage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-green-400">✓</div>
                    <span>Download essential apps</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-green-400">✓</div>
                    <span>Plan your visit timing</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                  <div className="text-xl">💡</div>
                  <span>Pro Tips</span>
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>• April-May and September-October are ideal months</div>
                  <div>• Download offline maps before traveling</div>
                  <div>• Keep digital copies of important documents</div>
                  <div>• Learn basic Turkish phrases</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* Section Content */
          <div>
            {/* Back Button */}
            <motion.button
              onClick={() => setActiveSection('overview')}
              className="mb-6 flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div>←</div>
              <span>Back to Overview</span>
            </motion.button>

            <AnimatePresence mode="wait">
              {activeSection === 'pre-travel' && (
                <motion.div
                  key="pre-travel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PreTravelGuide travelGuide={travelGuide} />
                </motion.div>
              )}

              {activeSection === 'best-times' && (
                <motion.div
                  key="best-times"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BestTimesToVisit monthlyWeather={travelGuide.bestTimes} />
                </motion.div>
              )}

              {activeSection === 'apps' && (
                <motion.div
                  key="apps"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <EssentialApps />
                </motion.div>
              )}

              {activeSection === 'safety' && (
                <motion.div
                  key="safety"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SafetyTips />
                </motion.div>
              )}

              {activeSection === 'internet' && (
                <motion.div
                  key="internet"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <InternetGuide />
                </motion.div>
              )}

              {activeSection === 'additional' && (
                <motion.div
                  key="additional"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AdditionalInfo />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelTipsMain;
