'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TransportRoute, TransportOption } from '../data/mockData';

interface InteractiveMapProps {
  route: TransportRoute;
  selectedOption: TransportOption | null;
  onOptionSelect: (option: TransportOption) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  route, 
  selectedOption, 
  onOptionSelect 
}) => {
  const [mapView, setMapView] = useState<'overview' | 'detailed'>('overview');

  const getTransportColor = (type: string) => {
    switch (type) {
      case 'metro': return '#0066CC';
      case 'bus': return '#00AA44';
      case 'taxi': return '#FFD700';
      case 'walking': return '#888888';
      case 'ferry': return '#00AAFF';
      case 'bike': return '#FF6B35';
      default: return '#888888';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-400';
      case 'delayed': return 'text-yellow-400';
      case 'maintenance': return 'text-red-400';
      case 'crowded': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return '✅';
      case 'delayed': return '⏰';
      case 'maintenance': return '🔧';
      case 'crowded': return '👥';
      default: return '❓';
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Route Map</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setMapView('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mapView === 'overview'
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setMapView('detailed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mapView === 'detailed'
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Detailed
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gray-900 rounded-lg h-80 mb-6 overflow-hidden">
        {/* Placeholder Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-gray-700/30" />
              ))}
            </div>
          </div>
        </div>

        {/* Start Point */}
        <motion.div
          className="absolute w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"
          style={{ left: '20%', top: '30%' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-green-400 font-medium whitespace-nowrap">
            📍 {route.from.name}
          </div>
        </motion.div>

        {/* End Point */}
        <motion.div
          className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"
          style={{ right: '20%', bottom: '30%' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-red-400 font-medium whitespace-nowrap">
            🎯 {route.to.name}
          </div>
        </motion.div>

        {/* Route Lines */}
        {selectedOption && (
          <motion.svg
            className="absolute inset-0 w-full h-full"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <path
              d="M 20% 30% Q 50% 15% 80% 70%"
              stroke={selectedOption.color}
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </motion.svg>
        )}

        {/* Transport Icons along route */}
        {selectedOption && (
          <motion.div
            className="absolute text-2xl"
            style={{ left: '50%', top: '25%' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            {selectedOption.icon}
          </motion.div>
        )}
      </div>

      {/* Transport Options */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-white mb-4">Transportation Options</h4>
        {route.transportOptions.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => onOptionSelect(option)}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
              selectedOption?.id === option.id
                ? 'border-green-500 bg-green-500/20'
                : 'border-gray-700 bg-gray-800/50 hover:border-green-400 hover:bg-green-400/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: option.color }}
                />
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <div className="font-medium text-white">{option.name}</div>
                  <div className="text-sm text-gray-400">
                    {option.estimatedTime} min • ₺{option.estimatedCost}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`text-sm ${getStatusColor(option.liveStatus)}`}>
                  {getStatusIcon(option.liveStatus)} {option.liveStatus}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Rating</div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-xs ${
                          star <= Math.round((option.comfort + option.punctuality) / 2)
                            ? 'text-yellow-400'
                            : 'text-gray-600'
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Selected Route Details */}
      {selectedOption && (
        <motion.div
          className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h5 className="font-medium text-white mb-3">Route Details</h5>
          <div className="space-y-2">
            {selectedOption.steps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-white">{step.instruction}</div>
                  <div className="text-gray-400">
                    {step.duration} min
                    {step.distance && ` • ${step.distance}m`}
                    {step.lineNumber && ` • Line ${step.lineNumber}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-green-400">{selectedOption.comfort}/5</div>
                <div className="text-xs text-gray-400">Comfort</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-yellow-400">{selectedOption.punctuality}/5</div>
                <div className="text-xs text-gray-400">Punctuality</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-red-400">{5 - selectedOption.crowdedness}/5</div>
                <div className="text-xs text-gray-400">Space</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveMap;
