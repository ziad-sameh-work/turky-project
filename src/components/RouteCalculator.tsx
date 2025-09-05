'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransportRoute, TransportOption, mockTransportRoutes, mockLiveAlerts, mockTransportCards } from '../data/mockData';
import InteractiveMap from './InteractiveMap';
import TransportationOptions from './TransportationOptions';

interface RouteCalculatorProps {
  searchData: {
    from: string;
    to: string;
    transportType: string;
    departureTime: string;
  };
  onAddToItinerary: (route: TransportRoute, option: TransportOption) => void;
  onStartJourney: (route: TransportRoute, option: TransportOption) => void;
  onEarnPoints: (points: number, action: string) => void;
}

const RouteCalculator: React.FC<RouteCalculatorProps> = ({
  searchData,
  onAddToItinerary,
  onStartJourney,
  onEarnPoints
}) => {
  const [selectedRoute, setSelectedRoute] = useState<TransportRoute | null>(null);
  const [selectedOption, setSelectedOption] = useState<TransportOption | null>(null);
  const [isCalculating, setIsCalculating] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Simulate route calculation
    const timer = setTimeout(() => {
      setIsCalculating(false);
      setSelectedRoute(mockTransportRoutes[0]);
      setShowResults(true);
      // Award points for route calculation
      onEarnPoints(10, 'Route calculation');
    }, 2000);

    return () => clearTimeout(timer);
  }, [onEarnPoints]);

  const handleOptionSelect = (option: TransportOption) => {
    setSelectedOption(option);
  };

  const handleBookTaxi = (option: TransportOption) => {
    onEarnPoints(50, 'Taxi booking');
    // Simulate booking process
    alert(`Booking ${option.name}... You'll receive a confirmation shortly!`);
  };

  const handlePurchaseCard = (card: { name: string; price: number; purchasePoints: number }) => {
    onEarnPoints(card.purchasePoints, 'Travel card purchase');
    alert(`Purchased ${card.name} for ₺${card.price}!`);
  };

  const handleShareRoute = () => {
    onEarnPoints(20, 'Route sharing');
    navigator.clipboard.writeText(`Check out this route from ${searchData.from} to ${searchData.to}!`);
    alert('Route shared! 20 points earned.');
  };

  const filteredOptions = selectedRoute?.transportOptions.filter(option => 
    searchData.transportType === 'any' || option.type === searchData.transportType
  ) || [];

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-2xl font-semibold text-white mb-2">Calculating Best Routes</h2>
          <p className="text-gray-400">Finding the optimal transportation options for you...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
            🗺️ Route Results
          </h1>
          <div className="flex items-center justify-center space-x-4 text-gray-300">
            <span className="flex items-center">
              📍 <span className="ml-1 capitalize">{searchData.from.replace('-', ' ')}</span>
            </span>
            <span>→</span>
            <span className="flex items-center">
              🎯 <span className="ml-1 capitalize">{searchData.to.replace('-', ' ')}</span>
            </span>
          </div>
        </motion.div>

        <AnimatePresence>
          {showResults && selectedRoute && (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Map Section */}
              <div>
                <InteractiveMap
                  route={selectedRoute}
                  selectedOption={selectedOption}
                  onOptionSelect={handleOptionSelect}
                />
              </div>

              {/* Options Section */}
              <div>
                <TransportationOptions
                  options={filteredOptions}
                  alerts={mockLiveAlerts}
                  cards={mockTransportCards}
                  onBookTaxi={handleBookTaxi}
                  onPurchaseCard={handlePurchaseCard}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        {showResults && selectedOption && (
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => selectedRoute && onStartJourney(selectedRoute, selectedOption)}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Start Journey
            </motion.button>
            
            <motion.button
              onClick={() => selectedRoute && onAddToItinerary(selectedRoute, selectedOption)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📋 Add to Itinerary
            </motion.button>
            
            <motion.button
              onClick={handleShareRoute}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📤 Share Route
            </motion.button>
          </motion.div>
        )}

        {/* Points Notification */}
        <motion.div
          className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="flex items-center space-x-2">
            <span className="text-xl">🎁</span>
            <div>
              <div className="font-semibold">+10 Points Earned!</div>
              <div className="text-sm opacity-90">Route calculation completed</div>
            </div>
          </div>
        </motion.div>

        {/* Discount Notification */}
        {selectedOption?.type === 'taxi' && (
          <motion.div
            className="mt-6 max-w-2xl mx-auto p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎉</span>
              <div>
                <div className="font-semibold text-yellow-400">Special Offer!</div>
                <div className="text-sm text-gray-300">
                  Use this route 3 times to get 10% discount on taxi bookings
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Social Tips */}
        <motion.div
          className="mt-8 max-w-4xl mx-auto bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            💬 Community Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-green-400">@TravelPro_Istanbul</span>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-300">
                &ldquo;Exit at Sultanahmet station for the quickest walk to Hagia Sophia. The blue exit is closest!&rdquo;
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                <span>👍 24</span>
                <span>💬 5</span>
              </div>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-blue-400">@LocalGuide_TR</span>
                <span className="text-xs text-gray-400">1 day ago</span>
              </div>
              <p className="text-sm text-gray-300">
                &ldquo;Avoid metro during 8-9 AM and 6-7 PM if possible. Much less crowded at other times!&rdquo;
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                <span>👍 18</span>
                <span>💬 3</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RouteCalculator;
