'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Define local interfaces for transportation route display
interface RouteDetails {
  line?: string;
  busNumber?: string;
  stations?: number;
  stops?: number;
  waitTime: number;
  comfort: number;
  crowdedness: number;
  punctuality: number;
  apps?: string[];
  difficulty?: string;
  scenic?: boolean;
}

interface DisplayRoute {
  id: string;
  type: 'metro' | 'bus' | 'taxi' | 'walking';
  duration: number;
  cost: number;
  distance: number;
  steps: string[];
  details: RouteDetails;
}

interface TransportationMainProps {
  onBack?: () => void;
}

const TransportationMain: React.FC<TransportationMainProps> = ({ onBack }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [preferredTransport, setPreferredTransport] = useState<'all' | 'metro' | 'bus' | 'taxi' | 'walking'>('all');
  const [routeCalculated, setRouteCalculated] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<DisplayRoute | null>(null);
  const [showLiveAlerts, setShowLiveAlerts] = useState(false);

  const transportOptions = [
    { id: 'all', label: 'All Options', icon: '🚇' },
    { id: 'metro', label: 'Metro', icon: '🚇' },
    { id: 'bus', label: 'Bus', icon: '🚌' },
    { id: 'taxi', label: 'Taxi', icon: '🚕' },
    { id: 'walking', label: 'Walking', icon: '🚶' }
  ];

  const mockRoutes: DisplayRoute[] = [
    {
      id: '1',
      type: 'metro',
      duration: 25,
      cost: 15,
      distance: 8.5,
      steps: [
        'Walk to Taksim Metro Station (3 min)',
        'Take M2 Line towards Vezneciler (18 min)',
        'Exit at Sultanahmet Station',
        'Walk to Hagia Sophia (4 min)'
      ],
      details: {
        line: 'M2 Vezneciler-Hacıosman',
        stations: 6,
        waitTime: 3,
        comfort: 4,
        crowdedness: 3,
        punctuality: 5
      }
    },
    {
      id: '2',
      type: 'bus',
      duration: 40,
      cost: 12,
      distance: 9.2,
      steps: [
        'Walk to Taksim Bus Stop (2 min)',
        'Take Bus 28 towards Eminönü (32 min)',
        'Exit at Sultanahmet Stop',
        'Walk to Hagia Sophia (6 min)'
      ],
      details: {
        busNumber: '28',
        stops: 12,
        waitTime: 8,
        comfort: 3,
        crowdedness: 4,
        punctuality: 3
      }
    },
    {
      id: '3',
      type: 'taxi',
      duration: 15,
      cost: 120,
      distance: 7.8,
      steps: [
        'Request taxi via app',
        'Direct route to Hagia Sophia',
        'Traffic dependent'
      ],
      details: {
        apps: ['BiTaksi', 'Uber', 'Taxi'],
        waitTime: 2,
        comfort: 5,
        crowdedness: 1,
        punctuality: 4
      }
    },
    {
      id: '4',
      type: 'walking',
      duration: 85,
      cost: 0,
      distance: 6.2,
      steps: [
        'Head south on İstiklal Caddesi',
        'Continue to Galata Bridge',
        'Cross to Eminönü',
        'Walk up to Sultanahmet',
        'Arrive at Hagia Sophia'
      ],
      details: {
        difficulty: 'Moderate',
        scenic: true,
        waitTime: 0,
        comfort: 2,
        crowdedness: 2,
        punctuality: 5
      }
    }
  ];

  const liveAlerts = [
    { id: '1', type: 'warning', message: 'M2 line: 5-minute delays due to maintenance', time: '2 min ago' },
    { id: '2', type: 'info', message: 'High crowds at Taksim station (6-8 PM)', time: '15 min ago' },
    { id: '3', type: 'success', message: 'Ferry service running on schedule', time: '1 hour ago' }
  ];

  const handleCalculateRoute = () => {
    if (fromLocation && toLocation) {
      setRouteCalculated(true);
      // Award points for route calculation
      console.log('Awarded 10 points for route calculation');
    }
  };

  const handleSelectRoute = (route: DisplayRoute) => {
    setSelectedRoute(route);
    // Use selectedRoute for detailed view or booking
    console.log('Selected route:', route.id, 'Route type:', route.type);
  };

  const handleBookTaxi = (route: DisplayRoute) => {
    // Award points for taxi booking
    console.log('Awarded 50 points for taxi booking');
    alert('Redirecting to taxi booking app...');
  };

  const handleShareRoute = () => {
    // Award points for sharing route
    console.log('Awarded 20 points for sharing route');
    navigator.share?.({
      title: 'My Route to Hagia Sophia',
      text: `Check out this route: ${fromLocation} to ${toLocation}`,
      url: window.location.href
    });
  };

  const getRouteColor = (type: string) => {
    switch (type) {
      case 'metro': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'bus': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'taxi': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'walking': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    }
  };

  const getRouteIcon = (type: string) => {
    switch (type) {
      case 'metro': return '🚇';
      case 'bus': return '🚌';
      case 'taxi': return '🚕';
      case 'walking': return '🚶';
      default: return '🚇';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {onBack && (
            <motion.button
              onClick={onBack}
              className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white text-xl">←</span>
            </motion.button>
          )}
          
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">🚇 Transportation</h1>
            <p className="text-gray-300">Smart navigation for Istanbul</p>
          </div>
          
          <motion.button
            onClick={() => setShowLiveAlerts(!showLiveAlerts)}
            className="p-3 bg-red-500/20 rounded-xl border border-red-500/30 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-red-400 text-xl">🚨</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </motion.button>
        </motion.div>

        {/* Live Alerts */}
        <AnimatePresence>
          {showLiveAlerts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 space-y-2"
            >
              {liveAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${
                    alert.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300' :
                    alert.type === 'info' ? 'bg-blue-500/20 border-blue-500/30 text-blue-300' :
                    'bg-green-500/20 border-green-500/30 text-green-300'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{alert.message}</span>
                    <span className="text-xs opacity-70">{alert.time}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section - Quick Search */}
        <motion.div
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 mb-8 border border-blue-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Plan Your Journey</h2>
            <p className="text-gray-300">Get the best route with real-time information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
              <input
                type="text"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="Current Location or Address"
                className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
              <input
                type="text"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                placeholder="Tourist Site, Hotel, Restaurant"
                className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">Preferred Transport</label>
            <div className="flex flex-wrap gap-2">
              {transportOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setPreferredTransport(option.id as 'all' | 'metro' | 'bus' | 'taxi' | 'walking')}
                  className={`px-4 py-2 rounded-xl border transition-all ${
                    preferredTransport === option.id
                      ? 'bg-blue-500/30 border-blue-500/50 text-blue-300'
                      : 'bg-gray-800/30 border-gray-700/30 text-gray-400 hover:border-gray-600/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            onClick={handleCalculateRoute}
            disabled={!fromLocation || !toLocation}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🧭 Calculate Route Now
          </motion.button>
        </motion.div>

        {/* Route Results */}
        <AnimatePresence>
          {routeCalculated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Interactive Map Placeholder */}
              <motion.div
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/30"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">🗺️ Interactive Route Map</h3>
                <div className="h-64 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <div className="text-gray-300">Interactive map with colored routes</div>
                    <div className="text-sm text-gray-400 mt-2">
                      Blue (Metro) • Green (Bus) • Yellow (Taxi) • Gray (Walking)
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Transportation Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockRoutes.map((route, index) => (
                  <motion.div
                    key={route.id}
                    className={`p-6 rounded-2xl border cursor-pointer transition-all hover:scale-105 ${getRouteColor(route.type)}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={() => handleSelectRoute(route)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getRouteIcon(route.type)}</span>
                        <div>
                          <h4 className="font-bold text-lg capitalize">{route.type}</h4>
                          <p className="text-sm opacity-80">{route.distance} km</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{route.duration} min</div>
                        <div className="text-sm">{route.cost === 0 ? 'Free' : `${route.cost} TL`}</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {route.steps.slice(0, 2).map((step: string, stepIndex: number) => (
                        <div key={stepIndex} className="text-sm opacity-80">
                          {stepIndex + 1}. {step}
                        </div>
                      ))}
                      {route.steps.length > 2 && (
                        <div className="text-xs opacity-60">+{route.steps.length - 2} more steps</div>
                      )}
                    </div>

                    {route.type === 'taxi' && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookTaxi(route);
                        }}
                        className="w-full py-2 bg-yellow-500/30 border border-yellow-500/50 rounded-lg text-yellow-300 font-medium hover:bg-yellow-500/40 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        📱 Book Now
                      </motion.button>
                    )}

                    <div className="flex justify-between text-xs mt-3 opacity-70">
                      <span>Comfort: {'⭐'.repeat(route.details.comfort)}</span>
                      <span>Punctuality: {'⭐'.repeat(route.details.punctuality)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Practical Information */}
              <motion.div
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">💳 Practical Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-300">🎫 Tickets & Cards</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>Metro/Bus/Tram: 15 TL</div>
                      <div>Istanbulkart: 50 TL (includes 6 TL credit)</div>
                      <div>Daily Pass: 45 TL</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-300">🕐 Operating Hours</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>Metro: 06:00 - 00:00</div>
                      <div>Bus: 24/7 (some routes)</div>
                      <div>Tram: 06:00 - 23:30</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-300">🚲 Additional Services</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>BiGO Bikes: 5 TL/30min</div>
                      <div>Ferry: 15-25 TL</div>
                      <div>Parking: 10-20 TL/hour</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <motion.button
                  className="flex-1 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-blue-700 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🚀 Start Journey
                </motion.button>
                <motion.button
                  className="flex-1 py-4 bg-gray-800/50 border border-gray-700/50 text-gray-300 font-bold rounded-xl hover:bg-gray-800/70 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  📋 Add to Itinerary
                </motion.button>
                <motion.button
                  onClick={handleShareRoute}
                  className="px-6 py-4 bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold rounded-xl hover:bg-purple-500/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  📤 Share
                </motion.button>
              </motion.div>

              {/* Points Notification */}
              <motion.div
                className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 }}
              >
                <div className="text-yellow-300 font-semibold">
                  🎉 Use route 3 times for 10% taxi discount!
                </div>
                <div className="text-sm text-yellow-400/80 mt-1">
                  Earn points: Route calculation (+10) • Taxi booking (+50) • Share route (+20)
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TransportationMain;
