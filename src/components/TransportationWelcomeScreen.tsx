'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransportationWelcomeScreenProps {
  onNext: (routeData: {
    from: string;
    to: string;
    transportType: string;
    departureTime: string;
  }) => void;
}

const TransportationWelcomeScreen: React.FC<TransportationWelcomeScreenProps> = ({ onNext }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [transportType, setTransportType] = useState('');
  const [departureTime, setDepartureTime] = useState('');

  const fromOptions = [
    { id: 'current', name: 'Current Location', icon: '📍' },
    { id: 'taksim', name: 'Taksim Square', icon: '🏙️' },
    { id: 'sultanahmet', name: 'Sultanahmet', icon: '🏛️' },
    { id: 'galata', name: 'Galata Tower', icon: '🗼' },
    { id: 'custom', name: 'Enter Address', icon: '📝' }
  ];

  const toOptions = [
    { id: 'hagia-sophia', name: 'Hagia Sophia', icon: '🕌' },
    { id: 'blue-mosque', name: 'Blue Mosque', icon: '🕌' },
    { id: 'grand-bazaar', name: 'Grand Bazaar', icon: '🏪' },
    { id: 'bosphorus', name: 'Bosphorus Bridge', icon: '🌉' },
    { id: 'topkapi', name: 'Topkapi Palace', icon: '🏰' },
    { id: 'custom', name: 'Enter Destination', icon: '📝' }
  ];

  const transportOptions = [
    { id: 'any', name: 'Best Route', icon: '🎯', description: 'Show all options' },
    { id: 'metro', name: 'Metro/Tram', icon: '🚇', description: 'Fast & reliable' },
    { id: 'bus', name: 'Bus', icon: '🚌', description: 'Extensive network' },
    { id: 'taxi', name: 'Taxi/Uber', icon: '🚕', description: 'Door to door' },
    { id: 'walking', name: 'Walking', icon: '🚶', description: 'Scenic route' }
  ];

  const timeOptions = [
    { id: 'now', name: 'Leave Now', icon: '⏰' },
    { id: 'custom', name: 'Choose Time', icon: '🕐' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onNext({
        from: fromLocation,
        to: toLocation,
        transportType,
        departureTime
      });
    }
  };

  const canProceedStep = () => {
    switch (currentStep) {
      case 0: return fromLocation !== '';
      case 1: return toLocation !== '';
      case 2: return transportType !== '';
      case 3: return departureTime !== '';
      default: return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0: return 'Where are you starting from?';
      case 1: return 'Where do you want to go?';
      case 2: return 'Preferred transportation?';
      case 3: return 'When do you want to travel?';
      default: return '';
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 0: return 'Next: Destination';
      case 1: return 'Next: Transport';
      case 2: return 'Next: Time';
      case 3: return 'Calculate Route';
      default: return 'Next';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {fromOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setFromLocation(option.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  fromLocation === option.id
                    ? 'border-green-500 bg-green-500/20 text-green-400'
                    : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-green-400 hover:bg-green-400/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-2">{option.icon}</div>
                <div className="font-medium">{option.name}</div>
              </motion.button>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {toOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setToLocation(option.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  toLocation === option.id
                    ? 'border-green-500 bg-green-500/20 text-green-400'
                    : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-green-400 hover:bg-green-400/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-2">{option.icon}</div>
                <div className="font-medium">{option.name}</div>
              </motion.button>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {transportOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setTransportType(option.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  transportType === option.id
                    ? 'border-green-500 bg-green-500/20 text-green-400'
                    : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-green-400 hover:bg-green-400/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-2">{option.icon}</div>
                <div className="font-medium text-lg">{option.name}</div>
                <div className="text-sm text-gray-400 mt-1">{option.description}</div>
              </motion.button>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="grid grid-cols-1 gap-4">
              {timeOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => {
                    if (option.id === 'now') {
                      setDepartureTime('now');
                    } else {
                      setDepartureTime('custom');
                    }
                  }}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    (option.id === 'now' && departureTime === 'now') || 
                    (option.id === 'custom' && departureTime === 'custom')
                      ? 'border-green-500 bg-green-500/20 text-green-400'
                      : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-green-400 hover:bg-green-400/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">{option.icon}</div>
                    <div className="font-medium">{option.name}</div>
                  </div>
                </motion.button>
              ))}
            </div>
            {departureTime === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4"
              >
                <input
                  type="time"
                  className="w-full p-4 rounded-xl border-2 border-gray-700 bg-gray-800/50 text-white text-lg focus:border-green-500 focus:outline-none"
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
              </motion.div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Continue Button - Fixed at top */}
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          onClick={handleNext}
          disabled={!canProceedStep()}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
            canProceedStep()
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={canProceedStep() ? { scale: 1.05 } : {}}
          whileTap={canProceedStep() ? { scale: 0.95 } : {}}
        >
          {getButtonText()}
        </motion.button>
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-green-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-8 pt-24">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
              🚌 Transportation
            </h1>
            <h2 className="text-3xl font-semibold text-white mb-4">
              {getStepTitle()}
            </h2>
            <p className="text-lg text-gray-300">
              Step {currentStep + 1} of 4 - Plan your journey through Istanbul
            </p>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {[0, 1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    step <= currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <motion.div 
            className="max-w-2xl mx-auto bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
              💡 Quick Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">•</span>
                Metro operates 06:00-00:00
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">•</span>
                İstanbulkart works for all transport
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">•</span>
                Avoid rush hours (8-9 AM, 6-7 PM)
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">•</span>
                Taxi apps: BiTaksi, Uber
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TransportationWelcomeScreen;
