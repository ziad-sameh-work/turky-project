'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRestaurants, Restaurant, RestaurantSearchFilters } from '@/data/mockData';

interface RestaurantListProps {
  onRestaurantSelect: (restaurant: Restaurant) => void;
  onBack: () => void;
  userPreferences?: Record<string, string[]>;
  initialSearchData?: {
    cuisineType: string;
    location: string;
    priceRange: string;
  };
}

const RestaurantList: React.FC<RestaurantListProps> = ({ 
  onRestaurantSelect, 
  onBack, 
  userPreferences,
  initialSearchData 
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'nearest' | 'cheapest' | 'rating' | 'popular'>('rating');
  const [filters, setFilters] = useState<RestaurantSearchFilters>({
    cuisineType: initialSearchData?.cuisineType ? [initialSearchData.cuisineType] : [],
    priceRange: initialSearchData?.priceRange ? [initialSearchData.priceRange] : [],
    rating: 0,
    distance: 10,
    features: []
  });

  const cuisineOptions = ['Turkish', 'International', 'Seafood', 'Vegetarian', 'Steakhouse', 'Ottoman'];
  const priceOptions = [
    { value: 'budget', label: '₺ (₺50-100)', symbol: '₺' },
    { value: 'midrange', label: '₺₺ (₺100-300)', symbol: '₺₺' },
    { value: 'luxury', label: '₺₺₺ (₺300+)', symbol: '₺₺₺' }
  ];
  const featureOptions = [
    { value: 'delivery', label: 'Delivery Available', icon: '🚚' },
    { value: 'outdoor', label: 'Outdoor Seating', icon: '🌤️' },
    { value: 'family', label: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
    { value: 'music', label: 'Live Music', icon: '🎵' },
    { value: 'halal', label: 'Halal Options', icon: '☪️' }
  ];

  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = mockRestaurants.filter(restaurant => {
      // Cuisine filter
      if (filters.cuisineType.length > 0) {
        const hasMatchingCuisine = filters.cuisineType.some(cuisine => 
          restaurant.cuisineType.some(restCuisine => 
            restCuisine.toLowerCase().includes(cuisine.toLowerCase())
          )
        );
        if (!hasMatchingCuisine) return false;
      }

      // Price range filter
      if (filters.priceRange.length > 0) {
        const priceMap = { budget: '₺', midrange: '₺₺', luxury: '₺₺₺' };
        const hasMatchingPrice = filters.priceRange.some(price => 
          restaurant.priceRange === priceMap[price as keyof typeof priceMap]
        );
        if (!hasMatchingPrice) return false;
      }

      // Rating filter
      if (filters.rating > 0 && restaurant.rating < filters.rating) return false;

      // Distance filter
      if (restaurant.location.distanceFromUser && restaurant.location.distanceFromUser > filters.distance) return false;

      // Features filter
      if (filters.features.length > 0) {
        const hasMatchingFeature = filters.features.some(feature => {
          switch (feature) {
            case 'delivery': return restaurant.features.delivery;
            case 'outdoor': return restaurant.features.outdoorSeating;
            case 'family': return restaurant.features.familyFriendly;
            case 'music': return restaurant.features.liveMusic;
            case 'halal': return restaurant.popularDishes.some(dish => dish.toLowerCase().includes('halal'));
            default: return false;
          }
        });
        if (!hasMatchingFeature) return false;
      }

      return true;
    });

    // Sort restaurants
    switch (sortBy) {
      case 'nearest':
        filtered.sort((a, b) => (a.location.distanceFromUser || 0) - (b.location.distanceFromUser || 0));
        break;
      case 'cheapest':
        filtered.sort((a, b) => a.averagePrice - b.averagePrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  const toggleFilter = (type: keyof RestaurantSearchFilters, value: string) => {
    setFilters(prev => {
      if (type === 'cuisineType' || type === 'priceRange' || type === 'features') {
        const currentArray = prev[type] as string[];
        const newArray = currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value];
        return { ...prev, [type]: newArray };
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" 
        />
      </div>

      <div className="relative z-10 px-6 pt-12 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
          >
            <span className="text-white text-xl">←</span>
          </motion.button>

          <div className="text-center">
            <h1 className="text-2xl font-black text-white">
              Restaurants
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent block text-lg">
                {filteredAndSortedRestaurants.length} found
              </span>
            </h1>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl backdrop-blur-sm transition-all duration-300 ${
              showFilters 
                ? 'bg-orange-500/20 border-orange-500/50' 
                : 'bg-gray-800/50 border-gray-700/50'
            }`}
          >
            <span className="text-white text-xl">⚙️</span>
          </motion.button>
        </motion.div>

        {/* Quick Filters Bar - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cuisine Filter */}
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm">Cuisine</h3>
              <select 
                value={filters.cuisineType[0] || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  cuisineType: e.target.value ? [e.target.value] : [] 
                }))}
                className="w-full p-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white text-sm focus:border-orange-500/50 focus:outline-none"
              >
                <option value="">All Cuisines</option>
                {cuisineOptions.map((cuisine) => (
                  <option key={cuisine} value={cuisine.toLowerCase()}>{cuisine}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm">Price Range</h3>
              <select 
                value={filters.priceRange[0] || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  priceRange: e.target.value ? [e.target.value] : [] 
                }))}
                className="w-full p-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white text-sm focus:border-orange-500/50 focus:outline-none"
              >
                <option value="">All Prices</option>
                {priceOptions.map((price) => (
                  <option key={price.value} value={price.value}>{price.label}</option>
                ))}
              </select>
            </div>

            {/* Location/District Filter */}
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm">Location</h3>
              <select 
                value=""
                onChange={(e) => {
                  // Filter by district
                  if (e.target.value) {
                    setFilters(prev => ({ ...prev, district: e.target.value }));
                  }
                }}
                className="w-full p-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white text-sm focus:border-orange-500/50 focus:outline-none"
              >
                <option value="">All Areas</option>
                <option value="sultanahmet">Sultanahmet</option>
                <option value="taksim">Taksim</option>
                <option value="etiler">Etiler</option>
                <option value="beyoglu">Beyoğlu</option>
                <option value="galata">Galata</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="mt-4 flex justify-between items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilters({
                cuisineType: [],
                priceRange: [],
                rating: 0,
                distance: 10,
                features: []
              })}
              className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg text-sm hover:bg-gray-700/70 transition-colors"
            >
              Clear All Filters
            </motion.button>
            
            <div className="text-orange-400 text-sm font-medium">
              {filteredAndSortedRestaurants.length} restaurants found
            </div>
          </div>
        </motion.div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {/* Sort Options */}
                <div>
                  <h3 className="text-white font-semibold mb-2">Sort By</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'rating', label: 'Highest Rated', icon: '⭐' },
                      { value: 'nearest', label: 'Nearest', icon: '📍' },
                      { value: 'cheapest', label: 'Cheapest', icon: '💰' },
                      { value: 'popular', label: 'Most Popular', icon: '🔥' }
                    ].map((sort) => (
                      <motion.button
                        key={sort.value}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSortBy(sort.value as 'nearest' | 'cheapest' | 'rating' | 'popular')}
                        className={`p-2 rounded-xl text-sm transition-all duration-300 ${
                          sortBy === sort.value
                            ? 'bg-orange-500/20 border border-orange-500/50 text-white'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                        }`}
                      >
                        {sort.icon} {sort.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Cuisine Filter */}
                <div>
                  <h3 className="text-white font-semibold mb-2">Cuisine Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {cuisineOptions.map((cuisine) => (
                      <motion.button
                        key={cuisine}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFilter('cuisineType', cuisine.toLowerCase())}
                        className={`px-3 py-1 rounded-lg text-xs transition-all duration-300 ${
                          filters.cuisineType.includes(cuisine.toLowerCase())
                            ? 'bg-orange-500/20 border border-orange-500/50 text-white'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                        }`}
                      >
                        {cuisine}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-white font-semibold mb-2">Price Range</h3>
                  <div className="flex gap-2">
                    {priceOptions.map((price) => (
                      <motion.button
                        key={price.value}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFilter('priceRange', price.value)}
                        className={`px-3 py-2 rounded-xl text-sm transition-all duration-300 ${
                          filters.priceRange.includes(price.value)
                            ? 'bg-orange-500/20 border border-orange-500/50 text-white'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                        }`}
                      >
                        {price.symbol}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="text-white font-semibold mb-2">Minimum Rating</h3>
                  <div className="flex gap-2">
                    {[4, 3, 0].map((rating) => (
                      <motion.button
                        key={rating}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters(prev => ({ ...prev, rating }))}
                        className={`px-3 py-2 rounded-xl text-sm transition-all duration-300 ${
                          filters.rating === rating
                            ? 'bg-orange-500/20 border border-orange-500/50 text-white'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                        }`}
                      >
                        {rating > 0 ? `${rating}+ ⭐` : 'Any'}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Restaurant Cards */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredAndSortedRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRestaurantSelect(restaurant)}
                className="p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300 cursor-pointer"
              >
                <div className="flex space-x-4">
                  {/* Restaurant Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-700 to-orange-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🍽️</span>
                  </div>
                  
                  {/* Restaurant Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-bold text-lg truncate">{restaurant.name}</h3>
                      {restaurant.specialOffer && (
                        <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-lg">
                          {restaurant.specialOffer}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-yellow-400 text-sm">⭐ {restaurant.rating}</span>
                      <span className="text-gray-400 text-sm">({restaurant.reviewCount} reviews)</span>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-400 text-sm">{restaurant.cuisineType.join(', ')}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-orange-400 font-semibold">
                          ₺{restaurant.averagePrice} avg
                        </span>
                        <span className="text-gray-400 text-sm">
                          📍 {restaurant.location.distanceFromUser}km away
                        </span>
                      </div>
                      
                      <div className="flex space-x-1">
                        {restaurant.features.delivery && <span className="text-xs">🚚</span>}
                        {restaurant.features.outdoorSeating && <span className="text-xs">🌤️</span>}
                        {restaurant.features.liveMusic && <span className="text-xs">🎵</span>}
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <div className="text-gray-400 text-xs">
                        Popular: {restaurant.popularDishes.slice(0, 2).join(', ')}
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        {restaurant.operatingHours.open} - {restaurant.operatingHours.close}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center justify-center space-y-2"
                  >
                    <div className="w-10 h-10 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center">
                      <span className="text-orange-400 text-lg">→</span>
                    </div>
                    <span className="text-xs text-gray-400">View</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredAndSortedRestaurants.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white font-bold text-xl mb-2">No restaurants found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your filters or search criteria</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilters({ cuisineType: [], priceRange: [], rating: 0, distance: 10, features: [] })}
              className="bg-orange-500/20 text-orange-300 px-6 py-2 rounded-xl border border-orange-500/30"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
