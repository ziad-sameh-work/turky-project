'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingBottomNav } from './FloatingBottomNav';

interface Dorm {
  id: string;
  name: string;
  university: string;
  price: number;
  rating: number;
  distance: string;
  amenities: string[];
  images: string[];
  reviews: Review[];
  coordinates: { lat: number; lng: number };
  capacity: number;
  available: number;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: Date;
}

interface HousingGuideProps {
  onBack: () => void;
}

const HousingGuide: React.FC<HousingGuideProps> = ({ onBack }) => {
  const [selectedDorm, setSelectedDorm] = useState<Dorm | null>(null);
  const [mapView, setMapView] = useState(true);
  const [filters, setFilters] = useState({
    maxPrice: 2000,
    minRating: 0,
    university: 'all'
  });

  const dorms: Dorm[] = [
    {
      id: '1',
      name: 'METU Campus Residence',
      university: 'METU',
      price: 800,
      rating: 4.5,
      distance: '0.2 km from campus',
      amenities: ['WiFi', 'Laundry', 'Study Room', 'Cafeteria', 'Gym'],
      images: ['🏠', '🛏️', '📚', '🍽️'],
      coordinates: { lat: 39.8917, lng: 32.7814 },
      capacity: 1200,
      available: 45,
      reviews: [
        {
          id: '1-1',
          author: 'Mehmet K.',
          rating: 5,
          comment: 'Great location, very close to engineering faculty. Clean rooms and good facilities.',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          id: '1-2',
          author: 'Ayşe M.',
          rating: 4,
          comment: 'Good value for money. WiFi can be slow during peak hours but overall satisfied.',
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: '2',
      name: 'Boğaziçi Student Housing',
      university: 'Boğaziçi',
      price: 1200,
      rating: 4.8,
      distance: '0.1 km from campus',
      amenities: ['WiFi', 'Laundry', 'Library', 'Restaurant', 'Sports Center', 'Parking'],
      images: ['🏢', '🛏️', '📖', '🏃‍♂️'],
      coordinates: { lat: 41.0857, lng: 29.0435 },
      capacity: 800,
      available: 12,
      reviews: [
        {
          id: '2-1',
          author: 'Can S.',
          rating: 5,
          comment: 'Premium facilities and amazing Bosphorus view from some rooms. Highly recommended!',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: '3',
      name: 'ITU Dormitory Complex',
      university: 'ITU',
      price: 950,
      rating: 4.2,
      distance: '0.3 km from campus',
      amenities: ['WiFi', 'Laundry', 'Study Hall', 'Canteen', 'Security'],
      images: ['🏘️', '🛏️', '📝', '🛡️'],
      coordinates: { lat: 41.1044, lng: 29.0233 },
      capacity: 1500,
      available: 78,
      reviews: [
        {
          id: '3-1',
          author: 'Zehra A.',
          rating: 4,
          comment: 'Large complex with good facilities. Sometimes noisy but great for making friends.',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: '4',
      name: 'Bilkent Private Residence',
      university: 'Bilkent',
      price: 1500,
      rating: 4.9,
      distance: '0.5 km from campus',
      amenities: ['WiFi', 'Laundry', 'Private Study', 'Fine Dining', 'Spa', 'Concierge'],
      images: ['🏨', '🛏️', '🍷', '💆‍♀️'],
      coordinates: { lat: 39.8681, lng: 32.7499 },
      capacity: 600,
      available: 8,
      reviews: [
        {
          id: '4-1',
          author: 'Emre T.',
          rating: 5,
          comment: 'Luxury accommodation with excellent service. Worth the premium price.',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        }
      ]
    }
  ];

  const filteredDorms = dorms.filter(dorm => 
    dorm.price <= filters.maxPrice &&
    dorm.rating >= filters.minRating &&
    (filters.university === 'all' || dorm.university === filters.university)
  );

  const universities = ['all', ...Array.from(new Set(dorms.map(d => d.university)))];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}>
        ⭐
      </span>
    ));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" 
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 pt-12 pb-4 px-6"
      >
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-1">Housing Guide</h1>
            <p className="text-sm text-gray-400">Find your perfect dorm</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMapView(!mapView)}
            className={`p-3 rounded-2xl ${mapView ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-800/50 text-gray-400'} border border-gray-700/50`}
          >
            {mapView ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H21V21H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9H15V15H9V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-6 mb-6"
      >
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Max Price (₺/month)</label>
              <input
                type="range"
                min="500"
                max="2000"
                step="100"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center text-white font-medium mt-1">₺{filters.maxPrice}</div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Min Rating</label>
              <select
                value={filters.minRating}
                onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
                className="w-full p-2 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-orange-500/50"
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">University</label>
              <select
                value={filters.university}
                onChange={(e) => setFilters(prev => ({ ...prev, university: e.target.value }))}
                className="w-full p-2 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-orange-500/50"
              >
                {universities.map(uni => (
                  <option key={uni} value={uni}>
                    {uni === 'all' ? 'All Universities' : uni}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-32">
        {mapView ? (
          /* Map View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-6"
          >
            <div className="relative h-64 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden">
              {/* Simulated Map */}
              <div className="absolute inset-0 bg-gray-600/20">
                <div className="absolute top-4 left-4 text-xs text-gray-400">🗺️ Interactive Map</div>
                <div className="absolute bottom-4 right-4 text-xs text-gray-400">Pinch to zoom • Tap pins for details</div>
                
                {/* Map Pins */}
                {filteredDorms.map((dorm, index) => (
                  <motion.button
                    key={dorm.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedDorm(dorm)}
                    className="absolute w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + (index % 2) * 20}%`
                    }}
                  >
                    {index + 1}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="mt-4 text-center text-gray-400 text-sm">
              Showing {filteredDorms.length} dorms near selected universities
            </div>
          </motion.div>
        ) : (
          /* List View */
          <div className="space-y-4">
            <AnimatePresence>
              {filteredDorms.map((dorm, index) => (
                <motion.div
                  key={dorm.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{dorm.name}</h3>
                      <p className="text-orange-400 text-sm mb-2">{dorm.university} • {dorm.distance}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">{renderStars(dorm.rating)}</div>
                        <span className="text-gray-400 text-sm">({dorm.rating})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">₺{dorm.price}</div>
                      <div className="text-gray-400 text-sm">/month</div>
                      <div className="text-green-400 text-xs mt-1">{dorm.available} available</div>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="flex space-x-2 mb-4">
                    {dorm.images.map((img, idx) => (
                      <div key={idx} className="w-16 h-16 bg-gray-700/50 rounded-xl flex items-center justify-center text-2xl">
                        {img}
                      </div>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dorm.amenities.map((amenity, idx) => (
                      <span key={idx} className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDorm(dorm)}
                    className="w-full p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white font-medium"
                  >
                    View Details & Reviews
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Dorm Details Modal */}
      <AnimatePresence>
        {selectedDorm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center"
            onClick={() => setSelectedDorm(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800/95 backdrop-blur-sm border-t border-gray-700/50 rounded-t-3xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                {/* Handle */}
                <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6"></div>

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedDorm.name}</h2>
                    <p className="text-orange-400 mb-2">{selectedDorm.university} • {selectedDorm.distance}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStars(selectedDorm.rating)}</div>
                      <span className="text-gray-400">({selectedDorm.rating})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">₺{selectedDorm.price}</div>
                    <div className="text-gray-400">/month</div>
                  </div>
                </div>

                {/* Images Gallery */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {selectedDorm.images.map((img, idx) => (
                    <div key={idx} className="aspect-square bg-gray-700/50 rounded-xl flex items-center justify-center text-3xl">
                      {img}
                    </div>
                  ))}
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{selectedDorm.capacity}</div>
                    <div className="text-gray-400 text-sm">Total Capacity</div>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{selectedDorm.available}</div>
                    <div className="text-gray-400 text-sm">Available Now</div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDorm.amenities.map((amenity, idx) => (
                      <span key={idx} className="px-3 py-2 bg-orange-500/20 text-orange-400 text-sm rounded-xl">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">Reviews ({selectedDorm.reviews.length})</h3>
                  <div className="space-y-4">
                    {selectedDorm.reviews.map((review) => (
                      <div key={review.id} className="bg-gray-700/30 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-white">{review.author}</span>
                          <div className="flex items-center space-x-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-gray-400 text-sm">{formatDate(review.date)}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white font-medium"
                  >
                    Apply Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 p-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white font-medium"
                  >
                    Save to Favorites
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Floating Bottom Navigation */}
      <FloatingBottomNav
        activeTab="search"
        onTabChange={(tabId) => {
          if (tabId === 'home') {
            onBack();
          }
        }}
        variant="dashboard"
      />
    </div>
  );
};

export default HousingGuide;
