'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TravelTipsPageProps {
  onBack?: () => void;
}

const TravelTipsPage: React.FC<TravelTipsPageProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('pre-travel');

  const monthlyGuide = [
    { month: 'January', weather: 'Cold, Rainy', cities: 'Istanbul (Indoor)', density: 'Low', events: 'New Year' },
    { month: 'February', weather: 'Cool, Wet', cities: 'Antalya, Side', density: 'Low', events: 'Almond Blossom' },
    { month: 'March', weather: 'Mild, Spring', cities: 'Istanbul, Ankara', density: 'Medium', events: 'Nevruz' },
    { month: 'April', weather: 'Perfect', cities: 'Istanbul, Cappadocia', density: 'Medium', events: 'Tulip Festival' },
    { month: 'May', weather: 'Warm, Sunny', cities: 'All Turkey', density: 'High', events: 'Spring Festivals' },
    { month: 'June', weather: 'Hot, Dry', cities: 'Coastal Areas', density: 'High', events: 'Summer Season' },
    { month: 'July', weather: 'Very Hot', cities: 'Black Sea, Coast', density: 'Peak', events: 'Summer Festivals' },
    { month: 'August', weather: 'Hot, Humid', cities: 'Northern Turkey', density: 'Peak', events: 'Victory Day' },
    { month: 'September', weather: 'Perfect', cities: 'All Turkey', density: 'High', events: 'Harvest Season' },
    { month: 'October', weather: 'Mild, Pleasant', cities: 'Istanbul, Cappadocia', density: 'Medium', events: 'Republic Day' },
    { month: 'November', weather: 'Cool, Rainy', cities: 'Indoor Activities', density: 'Low', events: 'Atatürk Day' },
    { month: 'December', weather: 'Cold, Wet', cities: 'Istanbul (Museums)', density: 'Low', events: 'New Year Prep' }
  ];

  const essentialApps = [
    { name: 'Google Translate', icon: '🌐', desc: 'Real-time translation', link: 'Download from App Store' },
    { name: 'Moovit', icon: '🚌', desc: 'Public transportation', link: 'Download from Play Store' },
    { name: 'Yemeksepeti', icon: '🍕', desc: 'Food delivery', link: 'Download from App Store' },
    { name: 'BiTaksi', icon: '🚕', desc: 'Taxi booking', link: 'Download from Play Store' },
    { name: 'Istanbulkart', icon: '🎫', desc: 'Public transport card', link: 'Download from App Store' },
    { name: 'Turkish Airlines', icon: '✈️', desc: 'Flight management', link: 'Download from Play Store' }
  ];

  const simPackages = [
    { provider: 'Turkcell', data: '10GB', price: '150 TL', speed: '4G/5G', coverage: 'Excellent' },
    { provider: 'Vodafone', data: '15GB', price: '180 TL', speed: '4G/5G', coverage: 'Very Good' },
    { provider: 'Türk Telekom', data: '12GB', price: '160 TL', speed: '4G', coverage: 'Good' }
  ];

  const safetyTips = [
    { icon: '🚕', title: 'Taxi Safety', desc: 'Use meter or agree on price beforehand. Avoid overcharging.' },
    { icon: '🛍️', title: 'Shopping', desc: 'Bargain in bazaars. Fixed prices in malls and shops.' },
    { icon: '🕌', title: 'Cultural Respect', desc: 'Dress modestly in mosques. Remove shoes when entering.' },
    { icon: '💰', title: 'Money', desc: 'Use ATMs from banks. Avoid street money changers.' },
    { icon: '📱', title: 'Scam Awareness', desc: 'Be cautious of overly friendly strangers offering help.' },
    { icon: '🚨', title: 'Emergency', desc: 'Police: 155, Ambulance: 112, Fire: 110' }
  ];

  const sections = [
    { id: 'pre-travel', name: 'Pre-Travel Guide', icon: '📋' },
    { id: 'timing', name: 'Best Times to Visit', icon: '📅' },
    { id: 'apps', name: 'Essential Apps', icon: '📱' },
    { id: 'safety', name: 'Safety Tips', icon: '🛡️' },
    { id: 'internet', name: 'Internet Guide', icon: '📶' },
    { id: 'additional', name: 'Additional Info', icon: 'ℹ️' }
  ];

  const handleDownloadChecklist = () => {
    alert('Document checklist PDF download started! You earned 10 points.');
  };

  const handleSafetyArticles = () => {
    alert('Opening safety articles... You earned 5 points for reading safety tips!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative z-10 px-6 pt-12 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span className="text-white text-xl">←</span>
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">Travel Tips & Guides</h1>
              <p className="text-gray-400">Complete guide for your Turkey journey</p>
            </div>
          </div>
        </motion.div>

        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  activeSection === section.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pre-Travel Guide */}
        {activeSection === 'pre-travel' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🛂</span>Visa Requirements
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Tourist visa required for most countries</p>
                  <p>• Apply online at e-visa.gov.tr</p>
                  <p>• Valid for 90 days within 180 days</p>
                  <p>• Cost: $20-50 depending on nationality</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🏥</span>Travel Insurance
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Recommended for medical emergencies</p>
                  <p>• Coverage: €30,000+ for Schengen</p>
                  <p>• Compare: Allianz, AXA, Zurich</p>
                  <p>• Include adventure sports if needed</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">💉</span>Vaccinations
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• No special vaccinations required</p>
                  <p>• Recommended: Hepatitis A & B</p>
                  <p>• Routine: MMR, DPT, Flu</p>
                  <p>• Consult your doctor 4-6 weeks before</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">📄</span>Required Documents
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Passport (6+ months validity)</p>
                  <p>• Visa or e-visa printout</p>
                  <p>• Hotel booking confirmations</p>
                  <p>• Return flight tickets</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleDownloadChecklist}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-blue-700 transition-all"
              >
                📥 Download Document Checklist (PDF)
              </button>
            </div>
          </motion.div>
        )}

        {/* Best Times to Visit */}
        {activeSection === 'timing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-6">Monthly Travel Guide</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-3 px-2 text-gray-300">Month</th>
                      <th className="text-left py-3 px-2 text-gray-300">Weather</th>
                      <th className="text-left py-3 px-2 text-gray-300">Best Cities</th>
                      <th className="text-left py-3 px-2 text-gray-300">Tourist Density</th>
                      <th className="text-left py-3 px-2 text-gray-300">Events</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyGuide.map((month, index) => (
                      <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30">
                        <td className="py-3 px-2 text-white font-medium">{month.month}</td>
                        <td className="py-3 px-2 text-gray-300">{month.weather}</td>
                        <td className="py-3 px-2 text-gray-300">{month.cities}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            month.density === 'Peak' ? 'bg-red-500/20 text-red-400' :
                            month.density === 'High' ? 'bg-orange-500/20 text-orange-400' :
                            month.density === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {month.density}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-300">{month.events}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <h4 className="text-blue-400 font-bold mb-2">💡 Best Time Recommendation</h4>
              <p className="text-gray-300">
                <strong>April & September</strong> offer the perfect balance of great weather, 
                moderate crowds, and ideal conditions for visiting Istanbul and Cappadocia.
              </p>
            </div>
          </motion.div>
        )}

        {/* Essential Apps */}
        {activeSection === 'apps' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {essentialApps.map((app, index) => (
                <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="text-center">
                    <div className="text-4xl mb-3">{app.icon}</div>
                    <h4 className="text-white font-bold mb-2">{app.name}</h4>
                    <p className="text-gray-400 text-sm mb-4">{app.desc}</p>
                    <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
                      {app.link}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Safety Tips */}
        {activeSection === 'safety' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {safetyTips.map((tip, index) => (
                <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{tip.icon}</div>
                    <div>
                      <h4 className="text-white font-bold mb-2">{tip.title}</h4>
                      <p className="text-gray-300 text-sm">{tip.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={handleSafetyArticles}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-orange-700 transition-all"
              >
                🛡️ Read Detailed Safety Articles
              </button>
            </div>
          </motion.div>
        )}

        {/* Internet Guide */}
        {activeSection === 'internet' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-6">SIM Card Packages Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-3 px-4 text-gray-300">Provider</th>
                      <th className="text-left py-3 px-4 text-gray-300">Data</th>
                      <th className="text-left py-3 px-4 text-gray-300">Price</th>
                      <th className="text-left py-3 px-4 text-gray-300">Speed</th>
                      <th className="text-left py-3 px-4 text-gray-300">Coverage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simPackages.map((pkg, index) => (
                      <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30">
                        <td className="py-3 px-4 text-white font-medium">{pkg.provider}</td>
                        <td className="py-3 px-4 text-gray-300">{pkg.data}</td>
                        <td className="py-3 px-4 text-gray-300">{pkg.price}</td>
                        <td className="py-3 px-4 text-gray-300">{pkg.speed}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            pkg.coverage === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                            pkg.coverage === 'Very Good' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {pkg.coverage}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h4 className="text-white font-bold mb-4">📍 Where to Buy</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Airport counters (available 24/7)</p>
                  <p>• Provider stores in city centers</p>
                  <p>• Authorized dealers and kiosks</p>
                  <p>• Online pre-order and pickup</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h4 className="text-white font-bold mb-4">📋 Requirements</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Valid passport for registration</p>
                  <p>• Tourist visa or entry stamp</p>
                  <p>• Cash payment (TL preferred)</p>
                  <p>• Unlocked phone device</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Additional Information */}
        {activeSection === 'additional' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">⚖️</span>Local Laws
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Alcohol: Available but restricted hours</p>
                  <p>• Smoking: Banned in public places</p>
                  <p>• Photography: Avoid military areas</p>
                  <p>• Respect religious sites and customs</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">💰</span>Cost-Saving Tips
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Museum Pass Istanbul: 325 TL</p>
                  <p>• Istanbulkart for public transport</p>
                  <p>• Local restaurants vs tourist areas</p>
                  <p>• Free walking tours available</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🌤️</span>Weather Guide
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Mediterranean: Hot summers, mild winters</p>
                  <p>• Black Sea: Rainy, moderate temperatures</p>
                  <p>• Central: Continental, cold winters</p>
                  <p>• Eastern: Harsh winters, cool summers</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🎯</span>Tourist Passes
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Istanbul Tourist Pass: 7-day access</p>
                  <p>• Cappadocia Museum Pass: 72 hours</p>
                  <p>• Ephesus Combined Ticket: All sites</p>
                  <p>• Save 40-60% on attractions</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6">
              <h4 className="text-purple-400 font-bold mb-4">🏆 Earn Points by Exploring</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">+15</p>
                  <p className="text-gray-300 text-sm">Reading travel guides</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">+25</p>
                  <p className="text-gray-300 text-sm">Downloading resources</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">+10</p>
                  <p className="text-gray-300 text-sm">Sharing tips with friends</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TravelTipsPage;
