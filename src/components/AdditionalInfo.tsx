'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoSection {
  id: string;
  title: string;
  category: 'laws' | 'costs' | 'weather' | 'emergency';
  icon: string;
  content: InfoItem[];
}

interface InfoItem {
  title: string;
  description: string;
  details?: string[];
  action?: {
    type: 'call' | 'link' | 'download';
    value: string;
    label: string;
  };
}

interface EmergencyContact {
  name: string;
  number: string;
  description: string;
  available: string;
}

interface AdditionalInfoProps {
  sections?: InfoSection[];
  emergencyContacts?: EmergencyContact[];
  onBack?: () => void;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ sections, emergencyContacts, onBack }) => {
  const [activeSection, setActiveSection] = useState<string>('laws');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const defaultSections: InfoSection[] = [
    {
      id: 'laws',
      title: 'Laws & Regulations',
      category: 'laws',
      icon: '⚖️',
      content: [
        {
          title: 'Alcohol Laws',
          description: 'Important regulations about alcohol consumption',
          details: [
            'Legal drinking age is 18 years',
            'Alcohol sales prohibited after 10 PM in shops',
            'Bars and restaurants can serve until 2 AM',
            'No alcohol consumption in public parks or beaches',
            'Heavy penalties for drunk driving (0.05% BAC limit)',
            'Some areas may have local restrictions during Ramadan'
          ]
        },
        {
          title: 'Smoking Regulations',
          description: 'Where you can and cannot smoke',
          details: [
            'Smoking banned in all indoor public spaces',
            'No smoking in restaurants, cafes, bars',
            'Designated smoking areas in airports',
            'Smoking allowed in outdoor areas of restaurants',
            'Heavy fines for smoking in prohibited areas (₺108)',
            'E-cigarettes follow same rules as regular cigarettes'
          ]
        },
        {
          title: 'Photography Rules',
          description: 'What you can and cannot photograph',
          details: [
            'No photography of military installations',
            'Ask permission before photographing people',
            'Some museums charge extra for photography',
            'Drone photography requires permits',
            'Be respectful in religious sites',
            'Police and security personnel may restrict photography'
          ]
        },
        {
          title: 'Cultural Sensitivity',
          description: 'Respecting local customs and traditions',
          details: [
            'Dress modestly when visiting mosques',
            'Remove shoes before entering homes',
            'Avoid public displays of affection',
            'Respect prayer times and religious practices',
            'Learn basic Turkish greetings',
            'Tipping is customary (10-15% in restaurants)'
          ]
        }
      ]
    },
    {
      id: 'costs',
      title: 'Cost-Saving Tips',
      category: 'costs',
      icon: '💰',
      content: [
        {
          title: 'Tourist Passes & Discounts',
          description: 'Save money with special tourist offers',
          details: [
            'Museum Pass Turkey: ₺375 for 15 days',
            'Istanbul Welcome Card: Transport + attractions',
            'Student discounts available with ISIC card',
            'Group discounts for 10+ people',
            'Early bird booking discounts',
            'Off-season rates (November-March)'
          ],
          action: {
            type: 'link',
            value: 'https://muze.gov.tr/museum-pass-turkey',
            label: 'Get Museum Pass'
          }
        },
        {
          title: 'Budget Transportation',
          description: 'Affordable ways to get around',
          details: [
            'Public transport much cheaper than taxis',
            'Istanbul Card for discounted metro/bus fares',
            'Walking tours often free (tip-based)',
            'Shared dolmuş (minibus) for short distances',
            'Ferry rides offer great views at low cost',
            'Overnight buses cheaper than flights'
          ]
        },
        {
          title: 'Food & Dining Savings',
          description: 'Eat well without breaking the bank',
          details: [
            'Street food is cheap and delicious',
            'Lunch menus (öğle menüsü) offer good value',
            'Local markets for fresh produce',
            'Avoid tourist area restaurants',
            'Turkish breakfast included in most hotels',
            'Bring water bottle (tap water is safe in cities)'
          ]
        },
        {
          title: 'Shopping Smart',
          description: 'Get the best deals on souvenirs',
          details: [
            'Bargain in bazaars (start at 50% of asking price)',
            'Compare prices between shops',
            'Buy Turkish delight from local shops, not airports',
            'Carpet shops offer shipping services',
            'Tax refund available for purchases over ₺118',
            'Avoid "special tourist prices"'
          ]
        }
      ]
    },
    {
      id: 'weather',
      title: 'Weather & Destinations',
      category: 'weather',
      icon: '🌤️',
      content: [
        {
          title: 'Spring (March-May)',
          description: 'Ideal weather for most destinations',
          details: [
            'Perfect for Istanbul and western Turkey',
            'Cappadocia balloon rides at their best',
            'Mild temperatures, less crowded',
            'Cherry blossoms in April',
            'Some rain, bring light jacket',
            'Best time for hiking and outdoor activities'
          ]
        },
        {
          title: 'Summer (June-August)',
          description: 'Hot weather, peak tourist season',
          details: [
            'Very hot in central Turkey (35°C+)',
            'Perfect for coastal areas and swimming',
            'Crowded tourist sites, book in advance',
            'Long daylight hours (sunrise 5 AM)',
            'High accommodation prices',
            'Ideal for beach destinations like Antalya'
          ]
        },
        {
          title: 'Autumn (September-November)',
          description: 'Great weather, fewer crowds',
          details: [
            'Excellent for all regions',
            'Sea still warm for swimming',
            'Beautiful fall colors in northern Turkey',
            'Harvest season, great local food',
            'Moderate prices and crowds',
            'Perfect for cultural tours'
          ]
        },
        {
          title: 'Winter (December-February)',
          description: 'Cold but magical, especially in Cappadocia',
          details: [
            'Snow in central and eastern Turkey',
            'Skiing in Uludağ and Palandöken',
            'Fewer tourists, better prices',
            'Istanbul can be rainy and cold',
            'Cappadocia balloon rides weather dependent',
            'Cozy atmosphere in thermal springs'
          ]
        }
      ]
    }
  ];

  const defaultEmergencyContacts: EmergencyContact[] = [
    {
      name: 'Police Emergency',
      number: '155',
      description: 'General police emergency line',
      available: '24/7'
    },
    {
      name: 'Medical Emergency',
      number: '112',
      description: 'Ambulance and medical emergencies',
      available: '24/7'
    },
    {
      name: 'Fire Department',
      number: '110',
      description: 'Fire emergencies and rescue',
      available: '24/7'
    },
    {
      name: 'Tourist Police',
      number: '153',
      description: 'English-speaking tourist assistance',
      available: '24/7'
    },
    {
      name: 'Coast Guard',
      number: '158',
      description: 'Maritime emergencies and rescue',
      available: '24/7'
    },
    {
      name: 'Poison Control',
      number: '114',
      description: 'Poisoning and toxic substance help',
      available: '24/7'
    },
    {
      name: 'Consular Services',
      number: '+90 312 455 5555',
      description: 'Embassy assistance for foreign nationals',
      available: 'Mon-Fri 9AM-5PM'
    },
    {
      name: 'Tourism Hotline',
      number: '170',
      description: 'Tourist information and complaints',
      available: '24/7'
    }
  ];

  const sectionsToShow = sections || defaultSections;
  const contactsToShow = emergencyContacts || defaultEmergencyContacts;

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleAction = (action: InfoItem['action']) => {
    if (!action) return;
    
    switch (action.type) {
      case 'call':
        handleCall(action.value);
        break;
      case 'link':
        window.open(action.value, '_blank');
        break;
      case 'download':
        // Implement download functionality
        console.log('Download:', action.value);
        break;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'laws': return 'from-red-500 to-pink-600';
      case 'costs': return 'from-green-500 to-emerald-600';
      case 'weather': return 'from-blue-500 to-cyan-600';
      case 'emergency': return 'from-orange-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-2 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-colors mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-white text-xl">←</span>
          <span className="text-white text-sm">Back</span>
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-2">📋 Additional Information</h2>
        <p className="text-gray-400">Important details for your Turkey visit</p>
      </motion.div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sectionsToShow.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-xl border transition-all ${
              activeSection === section.id
                ? 'bg-blue-500/30 border-blue-500/50 text-blue-300'
                : 'bg-gray-800/30 border-gray-700/30 text-gray-400 hover:border-gray-600/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">{section.icon}</span>
            {section.title}
          </motion.button>
        ))}
        <motion.button
          onClick={() => setActiveSection('emergency')}
          className={`px-4 py-2 rounded-xl border transition-all ${
            activeSection === 'emergency'
              ? 'bg-red-500/30 border-red-500/50 text-red-300'
              : 'bg-gray-800/30 border-gray-700/30 text-gray-400 hover:border-gray-600/50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">🚨</span>
          Emergency Contacts
        </motion.button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeSection === 'emergency' ? (
          <motion.div
            key="emergency"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-2xl p-6">
              <h3 className="text-red-300 font-bold text-lg mb-4">🚨 Emergency Contacts</h3>
              <p className="text-gray-300 text-sm mb-6">
                Save these numbers in your phone before traveling. Click to call directly.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactsToShow.map((contact, index) => (
                  <motion.div
                    key={contact.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4 hover:bg-gray-800/60 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-bold">{contact.name}</h4>
                      <span className="text-xs text-gray-400">{contact.available}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{contact.description}</p>
                    <motion.button
                      onClick={() => handleCall(contact.number)}
                      className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-orange-700 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      📞 Call {contact.number}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {sectionsToShow
              .find(section => section.id === activeSection)
              ?.content.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-6 backdrop-blur-sm"
                >
                  <div 
                    className="cursor-pointer"
                    onClick={() => setExpandedItem(expandedItem === item.title ? null : item.title)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-bold text-lg">{item.title}</h3>
                      <span className="text-blue-400 text-sm">
                        {expandedItem === item.title ? '▼' : '▶'}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>

                  <AnimatePresence>
                    {expandedItem === item.title && item.details && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-2"
                      >
                        {item.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <span className="text-blue-400 text-sm mt-1">•</span>
                            <span className="text-gray-300 text-sm">{detail}</span>
                          </div>
                        ))}
                        
                        {item.action && (
                          <motion.button
                            onClick={() => handleAction(item.action)}
                            className={`mt-4 px-4 py-2 bg-gradient-to-r ${getCategoryColor(activeSection)} text-white font-bold rounded-lg hover:opacity-90 transition-all`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {item.action.label}
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Reference Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-6"
      >
        <h3 className="text-white font-bold text-lg mb-4">📱 Quick Reference</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-1">🆘</div>
            <div className="text-white font-bold">155</div>
            <div className="text-gray-400 text-xs">Police</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🚑</div>
            <div className="text-white font-bold">112</div>
            <div className="text-gray-400 text-xs">Medical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-white font-bold">110</div>
            <div className="text-gray-400 text-xs">Fire</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">ℹ️</div>
            <div className="text-white font-bold">153</div>
            <div className="text-gray-400 text-xs">Tourist Police</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdditionalInfo;
