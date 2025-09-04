'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Restaurant } from '@/data/mockData';

interface RestaurantDetailsProps {
  restaurant: Restaurant;
  onBack: () => void;
  onBookTable?: () => void;
  onOrderDelivery?: () => void;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ 
  restaurant, 
  onBack, 
  onBookTable, 
  onOrderDelivery 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'reviews'>('overview');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);

  const timeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  const handleBooking = () => {
    if (selectedTime) {
      setShowBooking(false);
      onBookTable?.();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" 
        />
      </div>

      <div className="relative z-10">
        {/* Header with Image */}
        <div className="relative h-64 bg-gradient-to-br from-orange-800 to-orange-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🍽️</div>
              <div className="text-white font-bold text-lg">{restaurant.name}</div>
            </div>
          </div>
          
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="absolute top-12 left-6 p-3 rounded-xl bg-black/30 border border-white/20 backdrop-blur-sm"
          >
            <span className="text-white text-xl">←</span>
          </motion.button>

          {/* Special Offer Badge */}
          {restaurant.specialOffer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-12 right-6 bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold text-sm"
            >
              {restaurant.specialOffer}
            </motion.div>
          )}
        </div>

        <div className="px-6 -mt-8 relative z-10">
          {/* Restaurant Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/90 border border-gray-700/50 rounded-2xl backdrop-blur-sm p-6 mb-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-black text-white mb-2">{restaurant.name}</h1>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-yellow-400 font-semibold">⭐ {restaurant.rating}</span>
                  <span className="text-gray-400">({restaurant.reviewCount} reviews)</span>
                  <span className="text-orange-400 font-semibold">{restaurant.priceRange}</span>
                </div>
                <p className="text-gray-300 text-sm">{restaurant.cuisineType.join(' • ')}</p>
              </div>
              
              <div className="text-right">
                <div className="text-orange-400 font-bold text-xl">₺{restaurant.averagePrice}</div>
                <div className="text-gray-400 text-sm">per person</div>
              </div>
            </div>

            {/* Location & Distance */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-gray-400">📍</span>
              <span className="text-gray-300 text-sm">{restaurant.location.address}</span>
              <span className="text-orange-400 text-sm">• {restaurant.location.distanceFromUser}km away</span>
            </div>

            {/* Operating Hours */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-gray-400">🕒</span>
              <span className="text-gray-300 text-sm">
                {restaurant.operatingHours.open} - {restaurant.operatingHours.close}
              </span>
              <span className="text-green-400 text-sm">• Open now</span>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {restaurant.features.delivery && (
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-xs">🚚 Delivery</span>
              )}
              {restaurant.features.outdoorSeating && (
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-lg text-xs">🌤️ Outdoor</span>
              )}
              {restaurant.features.liveMusic && (
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg text-xs">🎵 Live Music</span>
              )}
              {restaurant.features.familyFriendly && (
                <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-lg text-xs">👨‍👩‍👧‍👦 Family</span>
              )}
            </div>

            {/* Popular Dishes */}
            <div className="mb-4">
              <h3 className="text-white font-semibold mb-2">Popular Dishes</h3>
              <div className="flex flex-wrap gap-2">
                {restaurant.popularDishes.map((dish, index) => (
                  <span key={index} className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-lg text-sm">
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex space-x-1 mb-6 bg-gray-800/40 p-1 rounded-2xl"
          >
            {[
              { id: 'overview', label: 'Overview', icon: '📋' },
              { id: 'menu', label: 'Menu', icon: '📖' },
              { id: 'reviews', label: 'Reviews', icon: '⭐' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 mb-6"
              >
                {/* Contact Info */}
                <div className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-4">
                  <h3 className="text-white font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400">📞</span>
                      <span className="text-gray-300">{restaurant.contact.phone}</span>
                    </div>
                    {restaurant.contact.website && (
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400">🌐</span>
                        <span className="text-blue-400">{restaurant.contact.website}</span>
                      </div>
                    )}
                    {restaurant.contact.instagram && (
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400">📷</span>
                        <span className="text-pink-400">{restaurant.contact.instagram}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Services */}
                <div className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-4">
                  <h3 className="text-white font-semibold mb-3">Additional Services</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'familyFriendly', label: 'Family-friendly', icon: '👨‍👩‍👧‍👦' },
                      { key: 'outdoorSeating', label: 'Outdoor seating', icon: '🌤️' },
                      { key: 'accessibility', label: 'Accessibility', icon: '♿' },
                      { key: 'liveMusic', label: 'Live music', icon: '🎵' },
                      { key: 'alcoholServed', label: 'Alcohol served', icon: '🍷' },
                      { key: 'delivery', label: 'Delivery available', icon: '🚚' }
                    ].map((service) => (
                      <div
                        key={service.key}
                        className={`flex items-center space-x-2 p-2 rounded-lg ${
                          restaurant.features[service.key as keyof typeof restaurant.features]
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-gray-700/50 text-gray-400'
                        }`}
                      >
                        <span>{service.icon}</span>
                        <span className="text-sm">{service.label}</span>
                        <span className="ml-auto">
                          {restaurant.features[service.key as keyof typeof restaurant.features] ? '✓' : '✗'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Points System */}
                <div className="bg-gradient-to-r from-orange-500/20 to-orange-700/20 border border-orange-500/30 rounded-2xl p-4">
                  <h3 className="text-orange-300 font-semibold mb-2">Points System</h3>
                  <p className="text-orange-200 text-sm mb-2">
                    Earn {restaurant.points} points per meal ordered via app
                  </p>
                  <div className="text-orange-400 text-xs">
                    💡 Collect points for discounts at other restaurants
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4 mb-6"
              >
                {restaurant.menu.map((category) => (
                  <div key={category.id} className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-4">
                    <h3 className="text-white font-semibold mb-3">{category.name}</h3>
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-white font-medium">{item.name}</h4>
                              {item.isHalal && <span className="text-green-400 text-xs">☪️</span>}
                              {item.isVegetarian && <span className="text-green-400 text-xs">🥗</span>}
                              {item.isSpicy && <span className="text-red-400 text-xs">🌶️</span>}
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                          </div>
                          <div className="text-orange-400 font-semibold">₺{item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4 mb-6"
              >
                {restaurant.reviews.length > 0 ? (
                  restaurant.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-white font-semibold">{review.userName}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-yellow-400">⭐ {review.rating}</span>
                            <span className="text-gray-400 text-sm">{review.date}</span>
                          </div>
                        </div>
                        <div className="text-gray-400 text-sm">
                          👍 {review.helpful} helpful
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-3">{review.comment}</p>
                      
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center">
                          <div className="text-gray-400">Food</div>
                          <div className="text-yellow-400">⭐ {review.ratings.food}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400">Service</div>
                          <div className="text-yellow-400">⭐ {review.ratings.service}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400">Cleanliness</div>
                          <div className="text-yellow-400">⭐ {review.ratings.cleanliness}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400">Ambiance</div>
                          <div className="text-yellow-400">⭐ {review.ratings.ambiance}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">💬</div>
                    <h3 className="text-white font-semibold mb-2">No reviews yet</h3>
                    <p className="text-gray-400">Be the first to review this restaurant!</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-gray-900/90 to-transparent"
          >
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {restaurant.features.reservation && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowBooking(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl shadow-orange-500/25"
                >
                  📅 Book Table
                </motion.button>
              )}
              
              {restaurant.features.delivery && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOrderDelivery}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl shadow-blue-500/25"
                >
                  🚚 Order Delivery
                </motion.button>
              )}
            </div>
            
            <div className="flex justify-center space-x-4 mt-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-700/50 text-gray-300 px-4 py-2 rounded-xl text-sm"
              >
                ❤️ Add to Favorites
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-700/50 text-gray-300 px-4 py-2 rounded-xl text-sm"
              >
                📋 Add to Itinerary
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-white font-bold text-xl mb-4">Book a Table</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Number of Guests</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        onClick={() => setGuests(num)}
                        className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                          guests === num
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Time Slot</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg text-sm transition-all duration-300 ${
                          selectedTime === time
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowBooking(false)}
                  className="flex-1 py-3 px-4 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  disabled={!selectedTime}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    selectedTime
                      ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantDetails;
