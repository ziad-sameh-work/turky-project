'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SafetyTip {
  id: string;
  title: string;
  category: 'scams' | 'customs' | 'emergency' | 'general';
  description: string;
  details: string[];
  severity: 'low' | 'medium' | 'high';
  icon: string;
}

interface SafetyTipsProps {
  tips?: SafetyTip[];
}

const SafetyTips: React.FC<SafetyTipsProps> = ({ tips }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const defaultTips: SafetyTip[] = [
    {
      id: '1',
      title: 'Taxi Driver Scams',
      category: 'scams',
      description: 'Be aware of common taxi scams in tourist areas',
      details: [
        'Always use the meter or agree on price beforehand',
        'Avoid taxis near major tourist attractions',
        'Use BiTaksi or Uber for transparent pricing',
        'Keep small bills to avoid "no change" scams',
        'Know basic Turkish numbers for price negotiation'
      ],
      severity: 'high',
      icon: '🚕'
    },
    {
      id: '2',
      title: 'Street Vendor Tactics',
      category: 'scams',
      description: 'Common tricks used by street vendors',
      details: [
        'Aggressive carpet/jewelry salesmen in Grand Bazaar',
        'Free tea offers leading to high-pressure sales',
        'Fake "student" guides offering tours',
        'Overpriced items near Hagia Sophia/Blue Mosque',
        'Always compare prices and walk away if pressured'
      ],
      severity: 'medium',
      icon: '🛍️'
    },
    {
      id: '3',
      title: 'Mosque Etiquette',
      category: 'customs',
      description: 'Respectful behavior in religious sites',
      details: [
        'Remove shoes before entering',
        'Dress modestly (cover shoulders, long pants)',
        'Women should cover hair with provided scarves',
        'No photography during prayer times',
        'Speak quietly and be respectful',
        'Free entry to most mosques'
      ],
      severity: 'high',
      icon: '🕌'
    },
    {
      id: '4',
      title: 'Cultural Norms',
      category: 'customs',
      description: 'Important social customs to observe',
      details: [
        'Greet with handshake, close friends may kiss cheeks',
        'Remove shoes when entering homes',
        'Accept tea/coffee offers - it\'s hospitality',
        'Avoid pointing with index finger',
        'Public displays of affection should be minimal',
        'Tipping 10-15% is customary in restaurants'
      ],
      severity: 'medium',
      icon: '🤝'
    },
    {
      id: '5',
      title: 'Emergency Contacts',
      category: 'emergency',
      description: 'Important numbers to keep handy',
      details: [
        'Police: 155 (24/7 emergency line)',
        'Medical Emergency: 112 (ambulance)',
        'Fire Department: 110',
        'Tourist Police: 153 (English speaking)',
        'Your Embassy contact information',
        'Hotel/accommodation emergency number'
      ],
      severity: 'high',
      icon: '🚨'
    },
    {
      id: '6',
      title: 'Personal Safety',
      category: 'general',
      description: 'General safety precautions for tourists',
      details: [
        'Keep copies of passport and important documents',
        'Use hotel safe for valuables',
        'Stay aware in crowded areas (pickpockets)',
        'Avoid isolated areas at night',
        'Keep emergency cash in separate location',
        'Share itinerary with someone at home'
      ],
      severity: 'medium',
      icon: '🛡️'
    },
    {
      id: '7',
      title: 'Food & Water Safety',
      category: 'general',
      description: 'Staying healthy while eating local food',
      details: [
        'Drink bottled or filtered water',
        'Eat at busy, popular restaurants',
        'Avoid raw vegetables from street vendors',
        'Try Turkish breakfast - it\'s usually safe',
        'Street food is generally safe if cooked fresh',
        'Carry hand sanitizer'
      ],
      severity: 'low',
      icon: '🍽️'
    },
    {
      id: '8',
      title: 'Money & Payments',
      category: 'scams',
      description: 'Financial safety and avoiding money scams',
      details: [
        'Use ATMs inside banks when possible',
        'Count change carefully',
        'Avoid currency exchange on the street',
        'Credit cards widely accepted in cities',
        'Keep receipts for tax refunds',
        'Negotiate prices at bazaars'
      ],
      severity: 'medium',
      icon: '💳'
    }
  ];

  const tipsToShow = tips || defaultTips;

  const categories = [
    { id: 'all', label: 'All Tips', icon: '📋' },
    { id: 'scams', label: 'Avoid Scams', icon: '⚠️' },
    { id: 'customs', label: 'Local Customs', icon: '🕌' },
    { id: 'emergency', label: 'Emergency', icon: '🚨' },
    { id: 'general', label: 'General Safety', icon: '🛡️' }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? tipsToShow 
    : tipsToShow.filter(tip => tip.category === selectedCategory);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500/50 bg-red-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return 'High Priority';
      case 'medium': return 'Important';
      case 'low': return 'Good to Know';
      default: return 'Info';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-2">🛡️ Safety Tips</h2>
        <p className="text-gray-400">Stay safe and respect local customs during your visit</p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-xl border transition-all ${
              selectedCategory === category.id
                ? 'bg-blue-500/30 border-blue-500/50 text-blue-300'
                : 'bg-gray-800/30 border-gray-700/30 text-gray-400 hover:border-gray-600/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Safety Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-2xl p-4 backdrop-blur-sm cursor-pointer transition-all ${getSeverityColor(tip.severity)}`}
              onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{tip.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold text-lg">{tip.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-lg ${
                      tip.severity === 'high' ? 'bg-red-500/20 text-red-300' :
                      tip.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {getSeverityText(tip.severity)}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{tip.description}</p>
                  
                  <AnimatePresence>
                    {expandedTip === tip.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        {tip.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <span className="text-blue-400 text-sm mt-1">•</span>
                            <span className="text-gray-300 text-sm">{detail}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-gray-500 text-xs capitalize">{tip.category}</span>
                    <span className="text-blue-400 text-xs">
                      {expandedTip === tip.id ? 'Click to collapse' : 'Click for details'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Safety Articles Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-2xl p-6 text-center"
      >
        <h3 className="text-white font-bold text-lg mb-2">📚 Comprehensive Safety Guide</h3>
        <p className="text-gray-300 text-sm mb-4">
          Access detailed safety articles and emergency procedures
        </p>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📖 Safety Articles
        </motion.button>
      </motion.div>

      {/* Emergency Quick Access */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-red-700/20 to-red-800/20 border border-red-600/30 rounded-2xl p-4"
      >
        <h4 className="text-red-300 font-bold mb-3">🚨 Emergency Quick Access</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { number: '155', label: 'Police' },
            { number: '112', label: 'Medical' },
            { number: '110', label: 'Fire' },
            { number: '153', label: 'Tourist Police' }
          ].map((emergency) => (
            <motion.button
              key={emergency.number}
              className="p-2 bg-red-600/20 border border-red-500/30 rounded-lg text-center hover:bg-red-600/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(`tel:${emergency.number}`, '_self')}
            >
              <div className="text-red-300 font-bold">{emergency.number}</div>
              <div className="text-red-400 text-xs">{emergency.label}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SafetyTips;
