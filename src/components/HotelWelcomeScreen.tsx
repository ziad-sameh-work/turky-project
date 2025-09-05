'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HotelWelcomeScreenProps {
  onNext: (searchData: {
    destination: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    guests: number;
  }) => void;
}

const HotelWelcomeScreen: React.FC<HotelWelcomeScreenProps> = ({ onNext }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  const destinations = [
    { id: 'istanbul', name: 'Istanbul', icon: '🏙️' },
    { id: 'antalya', name: 'Antalya', icon: '🏖️' },
    { id: 'bursa', name: 'Bursa', icon: '🏔️' },
    { id: 'cappadocia', name: 'Cappadocia', icon: '🎈' }
  ];

  const roomOptions = [
    { id: 1, name: '1 Room', icon: '🛏️' },
    { id: 2, name: '2 Rooms', icon: '🛏️🛏️' },
    { id: 3, name: '3 Rooms', icon: '🛏️🛏️🛏️' },
    { id: 4, name: '4+ Rooms', icon: '🏨' }
  ];

  const guestOptions = [
    { id: 1, name: '1 Guest', icon: '👤' },
    { id: 2, name: '2 Guests', icon: '👥' },
    { id: 3, name: '3 Guests', icon: '👨‍👩‍👧' },
    { id: 4, name: '4+ Guests', icon: '👨‍👩‍👧‍👦' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onNext({
        destination: selectedDestination,
        checkIn,
        checkOut,
        rooms,
        guests
      });
    }
  };

  const canProceedStep = () => {
    switch (currentStep) {
      case 0: return selectedDestination !== '';
      case 1: return checkIn !== '';
      case 2: return checkOut !== '';
      case 3: return rooms > 0 && guests > 0;
      default: return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0: return 'Choose Your Destination';
      case 1: return 'Select Check-in Date';
      case 2: return 'Select Check-out Date';
      case 3: return 'Rooms & Guests';
      default: return '';
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 0: return 'Next: Check-in';
      case 1: return 'Next: Check-out';
      case 2: return 'Next: Rooms & Guests';
      case 3: return 'Search Hotels';
      default: return 'Next';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-2 gap-4">
            {destinations.map((destination) => (
              <motion.button
                key={destination.id}
                onClick={() => setSelectedDestination(destination.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedDestination === destination.id
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                    : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-blue-400 hover:bg-blue-400/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-2">{destination.icon}</div>
                <div className="font-medium">{destination.name}</div>
              </motion.button>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="max-w-md mx-auto">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-4 rounded-xl border-2 border-gray-700 bg-gray-800/50 text-white text-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
        );
      case 2:
        return (
          <div className="max-w-md mx-auto">
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              className="w-full p-4 rounded-xl border-2 border-gray-700 bg-gray-800/50 text-white text-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Number of Rooms</h3>
              <div className="grid grid-cols-2 gap-4">
                {roomOptions.map((room) => (
                  <motion.button
                    key={room.id}
                    onClick={() => setRooms(room.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      rooms === room.id
                        ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                        : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-blue-400 hover:bg-blue-400/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl mb-1">{room.icon}</div>
                    <div className="font-medium text-sm">{room.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Number of Guests</h3>
              <div className="grid grid-cols-2 gap-4">
                {guestOptions.map((guest) => (
                  <motion.button
                    key={guest.id}
                    onClick={() => setGuests(guest.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      guests === guest.id
                        ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                        : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-blue-400 hover:bg-blue-400/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl mb-1">{guest.icon}</div>
                    <div className="font-medium text-sm">{guest.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>
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
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg'
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
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-8 pt-24">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              🏨 Hotel Search
            </h1>
            <h2 className="text-3xl font-semibold text-white mb-4">
              {getStepTitle()}
            </h2>
            <p className="text-lg text-gray-300">
              Step {currentStep + 1} of 4
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
                      ? 'bg-blue-500'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelWelcomeScreen;
