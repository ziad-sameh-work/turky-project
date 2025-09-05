'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TransportationWelcomeScreen from './TransportationWelcomeScreen';
import RouteCalculator from './RouteCalculator';
import { TransportRoute, TransportOption } from '../data/mockData';

interface TouristTransportationFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

const TouristTransportationFlow: React.FC<TouristTransportationFlowProps> = ({ 
  onComplete, 
  onBack 
}) => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'calculator' | 'completed'>('welcome');
  const [routeData, setRouteData] = useState<{
    from: string;
    to: string;
    transportType: string;
    departureTime: string;
  } | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [itinerary, setItinerary] = useState<Array<{route: TransportRoute, option: TransportOption}>>([]);

  const handleRouteSearch = (searchData: {
    from: string;
    to: string;
    transportType: string;
    departureTime: string;
  }) => {
    setRouteData(searchData);
    setCurrentStep('calculator');
  };

  const handleAddToItinerary = (route: TransportRoute, option: TransportOption) => {
    setItinerary(prev => [...prev, { route, option }]);
    // Show success message
    alert('Route added to your itinerary!');
  };

  const handleStartJourney = () => {
    // Award bonus points for starting journey
    setUserPoints(prev => prev + 25);
    setCurrentStep('completed');
  };

  const handleEarnPoints = (points: number) => {
    setUserPoints(prev => prev + points);
  };

  const handleComplete = () => {
    onComplete();
  };

  if (currentStep === 'welcome') {
    return (
      <TransportationWelcomeScreen onNext={handleRouteSearch} />
    );
  }

  if (currentStep === 'calculator' && routeData) {
    return (
      <RouteCalculator
        searchData={routeData}
        onAddToItinerary={handleAddToItinerary}
        onStartJourney={handleStartJourney}
        onEarnPoints={handleEarnPoints}
      />
    );
  }

  if (currentStep === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <motion.div
          className="max-w-2xl mx-auto text-center px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-8xl mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            🎉
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
            Journey Started!
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Your transportation is all set. Have a safe and enjoyable journey through Istanbul!
          </p>

          {/* Points Summary */}
          <motion.div
            className="bg-gray-800/50 rounded-xl p-6 mb-8 backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Points Earned</h3>
            <div className="text-3xl font-bold text-green-400 mb-2">{userPoints} Points</div>
            <div className="text-sm text-gray-400">
              Route calculation (10) + Journey start (25) + Bonuses ({userPoints - 35})
            </div>
          </motion.div>

          {/* Itinerary Summary */}
          {itinerary.length > 0 && (
            <motion.div
              className="bg-gray-800/50 rounded-xl p-6 mb-8 backdrop-blur-sm border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Your Itinerary</h3>
              <div className="space-y-3">
                {itinerary.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.option.icon}</span>
                      <div className="text-left">
                        <div className="text-white font-medium">{item.option.name}</div>
                        <div className="text-sm text-gray-400">
                          {item.route.from.name} → {item.route.to.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-medium">{item.option.estimatedTime} min</div>
                      <div className="text-sm text-gray-400">₺{item.option.estimatedCost}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={handleComplete}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Continue Exploring Turkey
            </motion.button>
            
            <motion.button
              onClick={onBack}
              className="px-8 py-4 bg-gray-700 text-white rounded-xl font-semibold text-lg hover:bg-gray-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Plan Another Route
            </motion.button>
          </div>

          {/* Tips for Next Steps */}
          <motion.div
            className="mt-8 p-4 bg-blue-500/20 border border-blue-500 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <h4 className="font-semibold text-blue-400 mb-2">💡 What&apos;s Next?</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>• Download offline maps for backup navigation</div>
              <div>• Keep your İstanbulkart charged for seamless travel</div>
              <div>• Check live alerts before departure</div>
              <div>• Rate your journey to help other travelers</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default TouristTransportationFlow;
