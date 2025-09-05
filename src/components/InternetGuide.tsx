'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SIMCard {
  id: string;
  provider: string;
  name: string;
  price: number;
  duration: string;
  data: string;
  speed: string;
  coverage: string[];
  features: string[];
  purchaseLocations: string[];
  rating: number;
  bestFor: string;
  icon: string;
}

interface InternetGuideProps {
  simCards?: SIMCard[];
}

const InternetGuide: React.FC<InternetGuideProps> = ({ simCards }) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'data' | 'rating'>('price');

  const defaultSIMCards: SIMCard[] = [
    {
      id: '1',
      provider: 'Turkcell',
      name: 'Tourist Package',
      price: 150,
      duration: '30 days',
      data: '20GB',
      speed: '4G/5G',
      coverage: ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Cappadocia'],
      features: ['Unlimited calls', 'Free SMS', 'EU roaming', 'Hotspot'],
      purchaseLocations: ['Airport', 'Turkcell stores', 'Online'],
      rating: 4.5,
      bestFor: 'Heavy users',
      icon: '📶'
    },
    {
      id: '2',
      provider: 'Vodafone',
      name: 'Visitor SIM',
      price: 120,
      duration: '30 days',
      data: '15GB',
      speed: '4G',
      coverage: ['Istanbul', 'Ankara', 'Izmir', 'Bodrum', 'Marmaris'],
      features: ['Local calls', '100 SMS', 'Social media free', 'Mobile app'],
      purchaseLocations: ['Airport', 'Vodafone stores', 'Kiosks'],
      rating: 4.2,
      bestFor: 'Social media',
      icon: '📱'
    },
    {
      id: '3',
      provider: 'Türk Telekom',
      name: 'Travel Connect',
      price: 100,
      duration: '15 days',
      data: '10GB',
      speed: '4G',
      coverage: ['Istanbul', 'Ankara', 'Antalya', 'Trabzon'],
      features: ['Basic calls', '50 SMS', 'WhatsApp free', 'Customer support'],
      purchaseLocations: ['Airport', 'TT stores', 'Authorized dealers'],
      rating: 4.0,
      bestFor: 'Budget travelers',
      icon: '💰'
    },
    {
      id: '4',
      provider: 'BiP',
      name: 'Digital Nomad',
      price: 200,
      duration: '30 days',
      data: '50GB',
      speed: '5G',
      coverage: ['Major cities', 'Tourist areas', 'Highways'],
      features: ['Unlimited calls', 'International SMS', 'VPN friendly', 'Priority network'],
      purchaseLocations: ['Online only', 'Digital delivery'],
      rating: 4.7,
      bestFor: 'Business travelers',
      icon: '💼'
    },
    {
      id: '5',
      provider: 'Pttcell',
      name: 'Basic Tourist',
      price: 75,
      duration: '15 days',
      data: '5GB',
      speed: '4G',
      coverage: ['Istanbul', 'Ankara', 'Izmir'],
      features: ['Local calls', '25 SMS', 'Basic support'],
      purchaseLocations: ['Post offices', 'PTT stores'],
      rating: 3.8,
      bestFor: 'Light users',
      icon: '📮'
    },
    {
      id: '6',
      provider: 'eSIM Turkey',
      name: 'Digital Tourist',
      price: 180,
      duration: '30 days',
      data: '25GB',
      speed: '4G/5G',
      coverage: ['Nationwide', 'Tourist hotspots'],
      features: ['Instant activation', 'No physical SIM', 'Multi-device', 'QR setup'],
      purchaseLocations: ['Online', 'Mobile app', 'QR code'],
      rating: 4.4,
      bestFor: 'Tech-savvy users',
      icon: '📲'
    }
  ];

  const cardsToShow = simCards || defaultSIMCards;

  const providers = ['all', ...Array.from(new Set(cardsToShow.map(card => card.provider)))];

  const filteredAndSortedCards = cardsToShow
    .filter(card => selectedProvider === 'all' || card.provider === selectedProvider)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'data': return parseInt(b.data) - parseInt(a.data);
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'Turkcell': return 'from-yellow-500 to-orange-600';
      case 'Vodafone': return 'from-red-500 to-red-600';
      case 'Türk Telekom': return 'from-blue-500 to-blue-600';
      case 'BiP': return 'from-purple-500 to-purple-600';
      case 'Pttcell': return 'from-green-500 to-green-600';
      case 'eSIM Turkey': return 'from-cyan-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-2">📶 Internet & SIM Cards</h2>
        <p className="text-gray-400">Stay connected during your Turkey visit</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="text-gray-300 text-sm font-medium mb-2 block">Provider:</label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-gray-700/30 rounded-xl text-white focus:border-blue-500/50 focus:outline-none"
          >
            {providers.map(provider => (
              <option key={provider} value={provider}>
                {provider === 'all' ? 'All Providers' : provider}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="text-gray-300 text-sm font-medium mb-2 block">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price' | 'data' | 'rating')}
            className="w-full p-3 bg-gray-800/50 border border-gray-700/30 rounded-xl text-white focus:border-blue-500/50 focus:outline-none"
          >
            <option value="price">Price (Low to High)</option>
            <option value="data">Data (High to Low)</option>
            <option value="rating">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      {/* SIM Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getProviderColor(card.provider)} flex items-center justify-center text-xl`}>
                {card.icon}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">₺{card.price}</div>
                <div className="text-gray-400 text-sm">{card.duration}</div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-white font-bold text-lg">{card.name}</h3>
              <p className="text-gray-400 text-sm">{card.provider}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-yellow-400">⭐</span>
                <span className="text-yellow-400 text-sm font-medium">{card.rating}</span>
                <span className="text-gray-500 text-xs">•</span>
                <span className="text-blue-400 text-xs">{card.bestFor}</span>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-2 bg-gray-700/30 rounded-lg">
                <div className="text-white font-bold">{card.data}</div>
                <div className="text-gray-400 text-xs">Data</div>
              </div>
              <div className="text-center p-2 bg-gray-700/30 rounded-lg">
                <div className="text-white font-bold">{card.speed}</div>
                <div className="text-gray-400 text-xs">Speed</div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h4 className="text-gray-300 text-sm font-medium mb-2">Features:</h4>
              <div className="flex flex-wrap gap-1">
                {card.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-lg"
                  >
                    {feature}
                  </span>
                ))}
                {card.features.length > 3 && (
                  <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-lg">
                    +{card.features.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Coverage */}
            <div className="mb-4">
              <h4 className="text-gray-300 text-sm font-medium mb-2">Coverage:</h4>
              <div className="text-gray-400 text-xs">
                {card.coverage.slice(0, 3).join(', ')}
                {card.coverage.length > 3 && ` +${card.coverage.length - 3} more`}
              </div>
            </div>

            {/* Purchase Locations */}
            <div className="mb-4">
              <h4 className="text-gray-300 text-sm font-medium mb-2">Where to buy:</h4>
              <div className="flex flex-wrap gap-1">
                {card.purchaseLocations.map((location, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-lg"
                  >
                    {location}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              className={`w-full py-3 bg-gradient-to-r ${getProviderColor(card.provider)} text-white font-bold rounded-xl hover:opacity-90 transition-all`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Choose This Plan
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-6 backdrop-blur-sm"
      >
        <h3 className="text-white font-bold text-lg mb-4">📊 Quick Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700/30">
                <th className="text-left text-gray-300 p-2">Provider</th>
                <th className="text-left text-gray-300 p-2">Price</th>
                <th className="text-left text-gray-300 p-2">Data</th>
                <th className="text-left text-gray-300 p-2">Duration</th>
                <th className="text-left text-gray-300 p-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedCards.slice(0, 5).map((card) => (
                <tr key={card.id} className="border-b border-gray-700/20">
                  <td className="text-white p-2">{card.provider}</td>
                  <td className="text-white p-2">₺{card.price}</td>
                  <td className="text-white p-2">{card.data}</td>
                  <td className="text-white p-2">{card.duration}</td>
                  <td className="text-yellow-400 p-2">⭐ {card.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6"
      >
        <h3 className="text-white font-bold text-lg mb-4">💡 Internet Tips for Turkey</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-blue-300 font-medium">📍 Where to Buy:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Istanbul Airport (IST) - Multiple providers</li>
              <li>• Sabiha Gökçen Airport (SAW) - Limited options</li>
              <li>• City center stores - Better prices</li>
              <li>• Online pre-order - Convenient pickup</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-purple-300 font-medium">🔧 Setup Tips:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Bring passport for registration</li>
              <li>• Check phone compatibility</li>
              <li>• Download provider apps</li>
              <li>• Save customer service numbers</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InternetGuide;
