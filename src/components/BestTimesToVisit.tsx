'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MonthlyWeather } from '../data/mockData';

interface BestTimesToVisitProps {
  monthlyWeather: MonthlyWeather[];
}

const BestTimesToVisit: React.FC<BestTimesToVisitProps> = ({ monthlyWeather }) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const getDensityColor = (density: 'low' | 'medium' | 'high') => {
    switch (density) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 10) return 'text-blue-400';
    if (temp < 20) return 'text-green-400';
    if (temp < 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRecommendationScore = (month: MonthlyWeather) => {
    let score = 0;
    
    // Temperature score (20-25°C is ideal)
    const avgTemp = (month.temperature.min + month.temperature.max) / 2;
    if (avgTemp >= 15 && avgTemp <= 25) score += 3;
    else if (avgTemp >= 10 && avgTemp <= 30) score += 2;
    else score += 1;
    
    // Rainfall score (less is better)
    if (month.rainfall < 40) score += 3;
    else if (month.rainfall < 80) score += 2;
    else score += 1;
    
    // Tourist density score (medium is ideal)
    if (month.touristDensity === 'medium') score += 3;
    else if (month.touristDensity === 'low') score += 2;
    else score += 1;
    
    return score;
  };

  const getBestMonths = () => {
    return monthlyWeather
      .map(month => ({ ...month, score: getRecommendationScore(month) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          className="inline-flex items-center space-x-3 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <div className="text-3xl">🌤️</div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Best Times to Visit</h1>
            <p className="text-gray-400">Plan your perfect Turkey adventure</p>
          </div>
        </motion.div>
      </div>

      {/* Quick Recommendations */}
      <motion.div
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-2xl">⭐</div>
          <h2 className="text-xl font-semibold text-white">Top Recommendations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getBestMonths().map((month, index) => (
            <motion.div
              key={month.monthNumber}
              className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="text-lg">{month.icon}</div>
                  <span className="font-medium text-white">{month.month}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < Math.floor(month.score / 2) ? 'bg-yellow-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-300 mb-2">
                {month.temperature.min}°C - {month.temperature.max}°C
              </div>
              <div className="text-xs text-gray-400">
                Best for: {month.bestCities.slice(0, 2).join(', ')}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* View Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-800/50 rounded-lg p-1 border border-gray-700">
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-md transition-all ${
              viewMode === 'table'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📊 Table View
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-4 py-2 rounded-md transition-all ${
              viewMode === 'cards'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📱 Card View
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'table' ? (
          /* Table View */
          <motion.div
            key="table"
            className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Month</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Temperature</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Rainfall</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Crowds</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Best Cities</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Events</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyWeather.map((month, index) => (
                    <motion.tr
                      key={month.monthNumber}
                      className={`border-t border-gray-700 hover:bg-gray-700/30 cursor-pointer transition-colors ${
                        selectedMonth === month.monthNumber ? 'bg-blue-500/10' : ''
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => setSelectedMonth(
                        selectedMonth === month.monthNumber ? null : month.monthNumber
                      )}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">{month.icon}</div>
                          <span className="font-medium text-white">{month.month}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="space-y-1">
                          <div className={`font-medium ${getTemperatureColor(month.temperature.max)}`}>
                            {month.temperature.max}°C
                          </div>
                          <div className={`text-sm ${getTemperatureColor(month.temperature.min)}`}>
                            {month.temperature.min}°C
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <div className="text-blue-400">💧</div>
                          <span className="text-white">{month.rainfall}mm</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getDensityColor(month.touristDensity)}`}>
                          {month.touristDensity.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-300">
                          {month.bestCities.slice(0, 2).join(', ')}
                          {month.bestCities.length > 2 && (
                            <span className="text-gray-500"> +{month.bestCities.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-300">
                          {month.events.slice(0, 1).join(', ')}
                          {month.events.length > 1 && (
                            <span className="text-gray-500"> +{month.events.length - 1}</span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Expanded Month Details */}
            <AnimatePresence>
              {selectedMonth && (
                <motion.div
                  className="border-t border-gray-700 p-6 bg-gray-900/30"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {(() => {
                    const month = monthlyWeather.find(m => m.monthNumber === selectedMonth);
                    if (!month) return null;

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-white mb-3">✅ Pros</h3>
                          <ul className="space-y-1">
                            {month.pros.map((pro, index) => (
                              <li key={index} className="flex items-center space-x-2 text-sm text-green-400">
                                <div>•</div>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-3">⚠️ Cons</h3>
                          <ul className="space-y-1">
                            {month.cons.map((con, index) => (
                              <li key={index} className="flex items-center space-x-2 text-sm text-red-400">
                                <div>•</div>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-3">🏙️ Best Cities</h3>
                          <div className="flex flex-wrap gap-2">
                            {month.bestCities.map((city) => (
                              <span key={city} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">
                                {city}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-3">🎉 Events</h3>
                          <div className="space-y-1">
                            {month.events.map((event, index) => (
                              <div key={index} className="text-sm text-gray-300">{event}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Card View */
          <motion.div
            key="cards"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {monthlyWeather.map((month, index) => (
              <motion.div
                key={month.monthNumber}
                className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{month.icon}</div>
                    <h3 className="text-lg font-semibold text-white">{month.month}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getDensityColor(month.touristDensity)}`}>
                    {month.touristDensity}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Temperature:</span>
                    <span className={`font-medium ${getTemperatureColor((month.temperature.min + month.temperature.max) / 2)}`}>
                      {month.temperature.min}°C - {month.temperature.max}°C
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Rainfall:</span>
                    <div className="flex items-center space-x-1">
                      <div className="text-blue-400">💧</div>
                      <span className="text-white">{month.rainfall}mm</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Humidity:</span>
                    <span className="text-white">{month.humidity}%</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="mb-2">
                    <span className="text-sm text-gray-400">Best Cities:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {month.bestCities.slice(0, 3).map((city) => (
                      <span key={city} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                {month.events.length > 0 && (
                  <div className="mt-3">
                    <span className="text-sm text-gray-400">Events:</span>
                    <div className="text-sm text-gray-300 mt-1">
                      {month.events[0]}
                      {month.events.length > 1 && (
                        <span className="text-gray-500"> +{month.events.length - 1} more</span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weather Legend */}
      <motion.div
        className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">🔍 Understanding the Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-white mb-2">Tourist Density</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/30"></div>
                <span className="text-gray-300">Low - Fewer crowds, better prices</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-yellow-500/20 border border-yellow-500/30"></div>
                <span className="text-gray-300">Medium - Balanced experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/30"></div>
                <span className="text-gray-300">High - Peak season, crowded</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Temperature Guide</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="text-blue-400">❄️</div>
                <span className="text-gray-300">Below 10°C - Cold weather</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-green-400">🌤️</div>
                <span className="text-gray-300">10-20°C - Mild weather</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-yellow-400">☀️</div>
                <span className="text-gray-300">20-30°C - Warm weather</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-red-400">🔥</div>
                <span className="text-gray-300">Above 30°C - Hot weather</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Planning Tips</h4>
            <div className="space-y-1 text-gray-300">
              <div>• Book 2-3 months in advance for peak season</div>
              <div>• Consider shoulder seasons for best value</div>
              <div>• Check local holidays and events</div>
              <div>• Pack layers for temperature variations</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BestTimesToVisit;
