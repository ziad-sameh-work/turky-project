'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Attraction {
  id: string;
  name: string;
  description: string;
  rating: number;
  totalVisitors: number;
  image: string;
  hours: string;
  ticketPrice: {
    adult: string;
    child: string;
  };
  bestTime: string;
  directions: string;
  duration: string;
  suitableFor: string[];
  activities: string[];
  facilities: string[];
  nearbyServices: string[];
}

interface AttractionsPageProps {
  onBack?: () => void;
}

const AttractionsPage: React.FC<AttractionsPageProps> = ({ onBack }) => {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'gallery' | 'reviews' | 'map'>('info');

  const attractions: Attraction[] = [
    {
      id: 'hagia-sophia',
      name: 'Hagia Sophia',
      description: 'Byzantine and Ottoman masterpiece - A stunning architectural wonder that has served as both church and mosque',
      rating: 4.8,
      totalVisitors: 12300,
      image: '🕌',
      hours: '09:00 - 19:00',
      ticketPrice: {
        adult: '400 TL',
        child: 'Free (<12 years)'
      },
      bestTime: 'Early morning',
      directions: 'Metro M2 to Sultanahmet (5-min walk)',
      duration: '2-3 hours',
      suitableFor: ['Families', 'Children', 'Seniors'],
      activities: ['Guided tour', 'Photography', 'Museum visit'],
      facilities: ['Restrooms', 'Prayer rooms', 'Gift shop'],
      nearbyServices: ['Traditional restaurants', 'Souvenir shops', 'Cafés']
    },
    {
      id: 'blue-mosque',
      name: 'Sultan Ahmed Mosque (Blue Mosque)',
      description: 'Magnificent Ottoman mosque with stunning blue tiles and six minarets',
      rating: 4.7,
      totalVisitors: 15600,
      image: '🕌',
      hours: '08:30 - 18:00',
      ticketPrice: {
        adult: 'Free',
        child: 'Free'
      },
      bestTime: 'Late afternoon',
      directions: 'Metro M2 to Sultanahmet (3-min walk)',
      duration: '1-2 hours',
      suitableFor: ['Families', 'Children', 'Seniors'],
      activities: ['Prayer', 'Photography', 'Architecture tour'],
      facilities: ['Restrooms', 'Prayer rooms', 'Ablution area'],
      nearbyServices: ['Traditional restaurants', 'Turkish baths', 'Carpet shops']
    },
    {
      id: 'topkapi-palace',
      name: 'Topkapi Palace',
      description: 'Former Ottoman palace with breathtaking views and rich history',
      rating: 4.6,
      totalVisitors: 8900,
      image: '🏰',
      hours: '09:00 - 18:00',
      ticketPrice: {
        adult: '320 TL',
        child: 'Free (<12 years)'
      },
      bestTime: 'Morning',
      directions: 'Metro M2 to Sultanahmet (8-min walk)',
      duration: '3-4 hours',
      suitableFor: ['History lovers', 'Families', 'Adults'],
      activities: ['Palace tour', 'Treasury visit', 'Garden walk'],
      facilities: ['Restrooms', 'Cafeteria', 'Museum shop'],
      nearbyServices: ['Fine dining', 'Art galleries', 'Bookshops']
    },
    {
      id: 'grand-bazaar',
      name: 'Grand Bazaar',
      description: 'Historic covered market with thousands of shops and authentic Turkish goods',
      rating: 4.5,
      totalVisitors: 25000,
      image: '🏪',
      hours: '09:00 - 19:00',
      ticketPrice: {
        adult: 'Free',
        child: 'Free'
      },
      bestTime: 'Mid-morning',
      directions: 'Metro M2 to Beyazıt-Kapalıçarşı',
      duration: '2-4 hours',
      suitableFor: ['Shoppers', 'Families', 'Culture enthusiasts'],
      activities: ['Shopping', 'Bargaining', 'Cultural exploration'],
      facilities: ['Restrooms', 'ATMs', 'Currency exchange'],
      nearbyServices: ['Traditional tea houses', 'Restaurants', 'Spice bazaar']
    }
  ];

  const handleAttractionSelect = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setActiveTab('info');
  };

  const handleBookTicket = (attraction: Attraction) => {
    alert(`Ticket booked for ${attraction.name}! You earned 50 points.`);
  };

  const handleAddToItinerary = (attraction: Attraction) => {
    alert(`${attraction.name} added to your itinerary! You earned 10 points.`);
  };

  const handleGuideMe = (attraction: Attraction) => {
    alert(`Opening navigation to ${attraction.name}...`);
  };

  if (selectedAttraction) {
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
              <button
                onClick={() => setSelectedAttraction(null)}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span className="text-white text-xl">←</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">{selectedAttraction.name}</h1>
                <p className="text-gray-400">{selectedAttraction.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 mb-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 flex items-center space-x-6">
              <div className="text-8xl">{selectedAttraction.image}</div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedAttraction.name}</h2>
                <p className="text-white/90 mb-4">{selectedAttraction.description}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-white font-bold">{selectedAttraction.rating}/5</span>
                  </div>
                  <span className="text-white/80">({selectedAttraction.totalVisitors.toLocaleString()} visitors)</span>
                  <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">
                    📍 View on Map
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex space-x-2 mb-6">
              {[
                { id: 'info', name: 'Quick Info', icon: 'ℹ️' },
                { id: 'gallery', name: 'Gallery', icon: '📸' },
                { id: 'reviews', name: 'Reviews', icon: '⭐' },
                { id: 'map', name: 'Map', icon: '🗺️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'info' | 'gallery' | 'reviews' | 'map')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            {activeTab === 'info' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">🕒 Quick Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hours:</span>
                      <span className="text-white">{selectedAttraction.hours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Adult Ticket:</span>
                      <span className="text-white">{selectedAttraction.ticketPrice.adult}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Child Ticket:</span>
                      <span className="text-white">{selectedAttraction.ticketPrice.child}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Best Time:</span>
                      <span className="text-white">{selectedAttraction.bestTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{selectedAttraction.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">🚇 Directions</h3>
                  <p className="text-gray-300 mb-4">{selectedAttraction.directions}</p>
                  <button
                    onClick={() => handleGuideMe(selectedAttraction)}
                    className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    🧭 Guide Me
                  </button>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">🎯 Activities</h3>
                  <div className="space-y-2">
                    {selectedAttraction.activities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-blue-400">•</span>
                        <span className="text-gray-300">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">👥 Suitable For</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAttraction.suitableFor.map((group, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">📸 Photo Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="bg-gray-700 rounded-lg h-32 flex items-center justify-center">
                        <span className="text-4xl">{selectedAttraction.image}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                      🎥 360° Virtual Tour
                    </button>
                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                      📹 1-Minute Tour Video
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">⭐ Visitor Reviews</h3>
                  <div className="space-y-4 mb-6">
                    {[
                      { name: 'Ahmed K.', rating: 5, comment: 'Absolutely breathtaking! A must-visit in Istanbul.' },
                      { name: 'Sarah M.', rating: 4, comment: 'Beautiful architecture, but can get very crowded.' },
                      { name: 'Marco R.', rating: 5, comment: 'The history and beauty of this place is unmatched.' }
                    ].map((review, index) => (
                      <div key={index} className="border-b border-gray-700 pb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-white font-medium">{review.name}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                      ✍️ Add Review
                    </button>
                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                      📸 Upload Photo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">🗺️ Interactive Map</h3>
                  <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🗺️</div>
                      <p className="text-gray-400">Interactive Google Map</p>
                      <p className="text-gray-500 text-sm">Routes: Metro, Bus, Taxi, Walking</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                      🚇 Metro Route
                    </button>
                    <button className="p-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                      🚌 Bus Route
                    </button>
                    <button className="p-3 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors">
                      🚕 Taxi Route
                    </button>
                    <button className="p-3 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors">
                      🚶 Walking Route
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Additional Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">🏪 Nearby Services</h3>
              <div className="space-y-2">
                {selectedAttraction.nearbyServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">🏢 Facilities</h3>
              <div className="space-y-2">
                {selectedAttraction.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-green-400">•</span>
                    <span className="text-gray-300">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Offers & Discounts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-yellow-600 to-orange-700 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-bold text-white mb-4">🎁 Special Offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">+50</p>
                <p className="text-white/80 text-sm">Points for booking</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">10%</p>
                <p className="text-white/80 text-sm">Discount with tour package</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">🎫</p>
                <p className="text-white/80 text-sm">Combo deals available</p>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
          >
            <button
              onClick={() => handleBookTicket(selectedAttraction)}
              className="flex-1 px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
            >
              🎫 Book Ticket
            </button>
            <button
              onClick={() => handleAddToItinerary(selectedAttraction)}
              className="flex-1 px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
            >
              📋 Add to Itinerary
            </button>
            <button
              onClick={() => setSelectedAttraction(null)}
              className="flex-1 px-6 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors"
            >
              🏛️ Nearby Attractions
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold text-white">Tourist Attractions</h1>
              <p className="text-gray-400">Discover Istanbul's most iconic landmarks</p>
            </div>
          </div>
        </motion.div>

        {/* Featured Attractions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {attractions.map((attraction, index) => (
            <motion.div
              key={attraction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => handleAttractionSelect(attraction)}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className="text-5xl group-hover:scale-110 transition-transform">
                  {attraction.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {attraction.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {attraction.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-white font-medium">{attraction.rating}</span>
                      </div>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">
                        {attraction.totalVisitors.toLocaleString()} visitors
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{attraction.ticketPrice.adult}</p>
                      <p className="text-gray-400 text-xs">{attraction.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: '🗺️', name: 'Interactive Map', desc: 'View all attractions' },
            { icon: '🎫', name: 'Book Tickets', desc: 'Skip the lines' },
            { icon: '📋', name: 'My Itinerary', desc: 'Plan your visit' },
            { icon: '🏆', name: 'Rewards', desc: 'Earn points' }
          ].map((action, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer text-center"
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <h4 className="text-white font-medium text-sm">{action.name}</h4>
              <p className="text-gray-400 text-xs">{action.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Points & Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-gradient-to-r from-purple-600 to-blue-700 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">🏆 Earn Points & Rewards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">+50</p>
              <p className="text-white/80 text-sm">Ticket booking</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">+25</p>
              <p className="text-white/80 text-sm">Photo upload</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">+15</p>
              <p className="text-white/80 text-sm">Review writing</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AttractionsPage;
