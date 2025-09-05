'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TransportOption, LiveAlert, TransportCard } from '../data/mockData';

interface TransportationOptionsProps {
  options: TransportOption[];
  alerts: LiveAlert[];
  cards: TransportCard[];
  onBookTaxi: (option: TransportOption) => void;
  onPurchaseCard: (card: TransportCard) => void;
}

const TransportationOptions: React.FC<TransportationOptionsProps> = ({
  options,
  alerts,
  cards,
  onBookTaxi,
  onPurchaseCard
}) => {
  const [selectedTab, setSelectedTab] = useState<'options' | 'cards' | 'alerts'>('options');

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      normal: { color: 'bg-green-500', text: 'Normal', icon: '✅' },
      delayed: { color: 'bg-yellow-500', text: 'Delayed', icon: '⏰' },
      maintenance: { color: 'bg-red-500', text: 'Maintenance', icon: '🔧' },
      crowded: { color: 'bg-orange-500', text: 'Crowded', icon: '👥' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.normal;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
        {config.icon} {config.text}
      </span>
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-900/50 rounded-lg p-1">
        {[
          { id: 'options', label: 'Transport Options', icon: '🚌' },
          { id: 'cards', label: 'Travel Cards', icon: '💳' },
          { id: 'alerts', label: 'Live Alerts', icon: '🚨' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as 'options' | 'cards' | 'alerts')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedTab === tab.id
                ? 'bg-green-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Transport Options Tab */}
      {selectedTab === 'options' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Available Routes</h3>
          {options.map((option) => (
            <motion.div
              key={option.id}
              className="border border-gray-700 rounded-lg p-4 bg-gray-900/30"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                  <span className="text-2xl">{option.icon}</span>
                  <div>
                    <h4 className="font-medium text-white">{option.name}</h4>
                    <p className="text-sm text-gray-400">
                      {option.operatingHours.start} - {option.operatingHours.end}
                    </p>
                  </div>
                </div>
                {getStatusBadge(option.liveStatus)}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-400">{option.estimatedTime} min</div>
                  <div className="text-xs text-gray-400">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-yellow-400">₺{option.estimatedCost}</div>
                  <div className="text-xs text-gray-400">Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-400">{option.comfort}/5</div>
                  <div className="text-xs text-gray-400">Comfort</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-400">{option.punctuality}/5</div>
                  <div className="text-xs text-gray-400">Reliability</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  {option.steps.length} steps • {option.crowdedness === 1 ? 'Not crowded' : 
                   option.crowdedness === 2 ? 'Slightly crowded' :
                   option.crowdedness === 3 ? 'Moderately crowded' :
                   option.crowdedness === 4 ? 'Very crowded' : 'Extremely crowded'}
                </div>
                {option.bookingAvailable && (
                  <motion.button
                    onClick={() => onBookTaxi(option)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Travel Cards Tab */}
      {selectedTab === 'cards' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Travel Cards & Tickets</h3>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="border border-gray-700 rounded-lg p-4 bg-gray-900/30"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">💳</div>
                  <div>
                    <h4 className="font-medium text-white">{card.name}</h4>
                    <p className="text-sm text-gray-400">{card.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-400">₺{card.price}</div>
                  <div className="text-xs text-gray-400">+{card.purchasePoints} points</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Valid for:</div>
                <div className="flex flex-wrap gap-2">
                  {card.validFor.map((transport) => (
                    <span
                      key={transport}
                      className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs"
                    >
                      {transport}
                    </span>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={() => onPurchaseCard(card)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Purchase Card
              </motion.button>
            </motion.div>
          ))}

          {/* Practical Information */}
          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
            <h4 className="font-medium text-white mb-3 flex items-center">
              💡 Payment Tips
            </h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">•</span>
                İstanbulkart can be recharged at stations and kiosks
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">•</span>
                Contactless payment accepted on buses and metro
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">•</span>
                Student discounts available with valid ID
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">•</span>
                Free transfers within 2 hours
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Alerts Tab */}
      {selectedTab === 'alerts' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Live Service Alerts</h3>
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">✅</div>
              <p>No active alerts. All services running normally!</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <motion.div
                key={alert.id}
                className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{alert.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{alert.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.severity === 'high' ? 'bg-red-500 text-white' :
                        alert.severity === 'medium' ? 'bg-yellow-500 text-black' :
                        'bg-blue-500 text-white'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{alert.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div>
                        Affected: {alert.affectedLines.join(', ')}
                      </div>
                      <div>
                        {new Date(alert.startTime).toLocaleTimeString()} 
                        {alert.endTime && ` - ${new Date(alert.endTime).toLocaleTimeString()}`}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {/* Additional Services */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
              <h4 className="font-medium text-white mb-3 flex items-center">
                🚗 Parking & Alternatives
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• Taksim Parking: ₺15/hour (45 spots available)</div>
                <div>• İSBİKE stations nearby</div>
                <div>• Martı scooters available</div>
              </div>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
              <h4 className="font-medium text-white mb-3 flex items-center">
                ⛴️ Ferry Services
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• Eminönü ↔ Üsküdar: Every 20 min</div>
                <div>• Karaköy ↔ Kadıköy: Every 15 min</div>
                <div>• Bosphorus tours available</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportationOptions;
