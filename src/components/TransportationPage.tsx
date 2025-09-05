'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TransportOption {
  id: string;
  type: 'metro' | 'bus' | 'taxi' | 'walking';
  name: string;
  duration: string;
  cost: string;
  color: string;
  icon: string;
  details: {
    stations?: string;
    line?: string;
    busNumber?: string;
    distance?: string;
    steps?: string[];
  };
}

interface TransportationPageProps {
  onBack?: () => void;
}

const TransportationPage: React.FC<TransportationPageProps> = ({ onBack }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedTransport, setSelectedTransport] = useState('all');
  const [showResults, setShowResults] = useState(false);

  const transportOptions: TransportOption[] = [
    {
      id: 'metro',
      type: 'metro',
      name: 'Metro M2 Line',
      duration: '25 min',
      cost: '15 TL',
      color: 'blue',
      icon: '🚇',
      details: {
        stations: '8 stations',
        line: 'M2 Vezneciler-Hacıosman',
        steps: ['Board at Taksim', 'Transfer at Vezneciler', 'Exit at Sultanahmet']
      }
    },
    {
      id: 'bus',
      type: 'bus',
      name: 'Bus Route 28',
      duration: '40 min',
      cost: '22 TL',
      color: 'green',
      icon: '🚌',
      details: {
        busNumber: '28',
        stations: 'Taksim → Sultanahmet',
        steps: ['Board at Taksim Square', 'Direct route', 'Exit at Sultanahmet']
      }
    },
    {
      id: 'taxi',
      type: 'taxi',
      name: 'BiTaksi / Uber',
      duration: '15 min',
      cost: '120 TL',
      color: 'yellow',
      icon: '🚕',
      details: {
        distance: '8.5 km',
        steps: ['Book via app', 'Direct route', 'Payment via card']
      }
    },
    {
      id: 'walking',
      type: 'walking',
      name: 'Walking Route',
      duration: '45 min',
      cost: 'Free',
      color: 'gray',
      icon: '🚶',
      details: {
        distance: '3.2 km',
        steps: ['Head south on İstiklal', 'Turn right at Galata Bridge', 'Continue to Sultanahmet']
      }
    }
  ];

  const handleSearch = () => {
    if (fromLocation && toLocation) {
      setShowResults(true);
    }
  };

  const handleBookTransport = (option: TransportOption) => {
    // Award points based on transport type
    const points = option.type === 'taxi' ? 50 : option.type === 'metro' ? 10 : 20;
    alert(`${option.name} booked successfully! You earned ${points} points.`);
  };

  const liveAlerts = [
    { id: 1, message: "M2 line: Minor delays due to maintenance", type: 'warning' },
    { id: 2, message: "Heavy traffic at Taksim Square", type: 'info' },
    { id: 3, message: "Ferry service running normally", type: 'success' }
  ];

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
              <h1 className="text-3xl font-bold text-white">Transportation</h1>
              <p className="text-gray-400">Navigate Istanbul with ease</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Section - Quick Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6">Plan Your Journey</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">From</label>
                <input
                  type="text"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  placeholder="Current location or address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">To</label>
                <input
                  type="text"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  placeholder="Destination (Hotel, Restaurant, Site)"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">Preferred Transport</label>
              <div className="flex flex-wrap gap-2">
                {['all', 'metro', 'bus', 'taxi', 'walking'].map((transport) => (
                  <button
                    key={transport}
                    onClick={() => setSelectedTransport(transport)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTransport === transport
                        ? 'bg-white text-blue-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {transport.charAt(0).toUpperCase() + transport.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-white text-blue-600 font-bold py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Calculate Route Now
            </button>
          </div>
        </motion.div>

        {/* Live Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-bold text-white mb-4">Live Alerts</h3>
          <div className="space-y-2">
            {liveAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning'
                    ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400'
                    : alert.type === 'success'
                    ? 'bg-green-500/10 border-green-500 text-green-400'
                    : 'bg-blue-500/10 border-blue-500 text-blue-400'
                }`}
              >
                <p className="text-sm">{alert.message}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transportation Options */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-lg font-bold text-white mb-4">Route Options</h3>
            <div className="space-y-4">
              {transportOptions
                .filter(option => selectedTransport === 'all' || option.type === selectedTransport)
                .map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{option.icon}</div>
                      <div>
                        <h4 className="text-white font-bold">{option.name}</h4>
                        <p className="text-gray-400 text-sm">{option.details.stations || option.details.distance}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{option.duration}</p>
                      <p className="text-gray-400">{option.cost}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-white font-medium mb-2">Route Details:</h5>
                    <div className="space-y-1">
                      {option.details.steps?.map((step, stepIndex) => (
                        <p key={stepIndex} className="text-gray-300 text-sm">
                          {stepIndex + 1}. {step}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleBookTransport(option)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors"
                    >
                      {option.type === 'taxi' ? 'Book Now' : 'Start Journey'}
                    </button>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                      Share Route
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Interactive Map Placeholder */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8"
          >
            <h3 className="text-lg font-bold text-white mb-4">Interactive Route Map</h3>
            <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-gray-400">Interactive map with colored routes</p>
                <p className="text-gray-500 text-sm">Blue (Metro) • Green (Bus) • Yellow (Taxi) • Gray (Walking)</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Practical Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">🎫 Tickets & Prices</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">Metro/Bus/Tram: 15 TL</p>
              <p className="text-gray-300">Istanbulkart: Available at stations</p>
              <p className="text-gray-300">Recharge: Machines or mobile app</p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">⏰ Operating Hours</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">Metro: 06:00 - 00:00</p>
              <p className="text-gray-300">Bus: 24/7 (selected routes)</p>
              <p className="text-gray-300">Taxi: 24/7 available</p>
            </div>
          </div>
        </motion.div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8"
        >
          <h3 className="text-lg font-bold text-white mb-4">Additional Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🅿️', name: 'Parking', desc: 'Nearby parking spots' },
              { icon: '🚲', name: 'BiGO Bikes', desc: 'Electric bike sharing' },
              { icon: '⛴️', name: 'Ferry', desc: 'Asia-Europe crossing' },
              { icon: '🛴', name: 'Scooters', desc: 'Electric scooter rental' }
            ].map((service, index) => (
              <div key={index} className="text-center p-4 bg-gray-700/50 rounded-lg">
                <div className="text-2xl mb-2">{service.icon}</div>
                <p className="text-white font-medium text-sm">{service.name}</p>
                <p className="text-gray-400 text-xs">{service.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Points & Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-yellow-600 to-orange-700 rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-white mb-4">🏆 Earn Points & Rewards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">+10</p>
              <p className="text-white/80 text-sm">Route calculation</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">+50</p>
              <p className="text-white/80 text-sm">Taxi booking</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">+20</p>
              <p className="text-white/80 text-sm">Route sharing</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center"
          >
            <p className="text-blue-400 mb-4">💡 Use route 3 times for 10% taxi discount!</p>
            <div className="flex space-x-4 justify-center">
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
                Add to Itinerary
              </button>
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors">
                Save Route
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TransportationPage;
