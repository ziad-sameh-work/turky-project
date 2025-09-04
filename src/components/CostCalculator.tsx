'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { costCategories, cityOptions, accommodationOptions } from '@/data/mockData';
import FloatingBottomNav from './FloatingBottomNav';

interface CostCalculatorProps {
  onBack: () => void;
}

const CostCalculator: React.FC<CostCalculatorProps> = ({ onBack }) => {
  const [selectedCity, setSelectedCity] = useState('istanbul');
  const [selectedAccommodation, setSelectedAccommodation] = useState('dorm');
  const [lifestyle, setLifestyle] = useState(2); // 1-3 scale
  const [includeOptional, setIncludeOptional] = useState<string[]>(['books']);

  const baseCosts = {
    tuition: 8000,
    accommodation: accommodationOptions.find((acc: any) => acc.id === selectedAccommodation)?.cost || 200,
    food: 250,
    transport: 50,
    books: 100,
    personal: 150,
    health: 80
  };

  const selectedCityData = cityOptions.find((city: any) => city.id === selectedCity);
  const cityMultiplier = selectedCityData?.multiplier || 1;
  const lifestyleMultiplier = 0.7 + (lifestyle * 0.3); // 0.7 to 1.6

  interface CostBreakdown {
    categories: Array<{
      category: string;
      amount: number;
      color: string;
      percentage: number;
    }>;
    total: number;
  }

  const totalCost: CostBreakdown = useMemo(() => {
    const breakdown: CostBreakdown = {
      categories: [],
      total: 0
    };

    costCategories.forEach((category: any) => {
      if (category.required || includeOptional.includes(category.id)) {
        let amount = baseCosts[category.id as keyof typeof baseCosts] || 0;
        
        if (category.id !== 'tuition') {
          amount *= cityMultiplier * lifestyleMultiplier;
        }
        
        breakdown.total += amount;
        breakdown.categories.push({
          category: category.name,
          amount: Math.round(amount),
          color: getColorForCategory(category.id),
          percentage: 0, // Will be calculated after total is known
        });
      }
    });

    // Calculate percentages
    breakdown.categories.forEach(cost => {
      cost.percentage = Math.round((cost.amount / breakdown.total) * 100);
    });

    return breakdown;
  }, [selectedCity, selectedAccommodation, lifestyle, includeOptional, cityMultiplier, lifestyleMultiplier]);

  function getColorForCategory(categoryId: string): string {
    const colors: Record<string, string> = {
      tuition: '#ef4444',
      accommodation: '#3b82f6',
      food: '#10b981',
      transport: '#f59e0b',
      books: '#8b5cf6',
      personal: '#ec4899',
      health: '#06b6d4'
    };
    return colors[categoryId] || '#6b7280';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" 
        />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 px-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="mb-6 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
        >
          <span className="text-white text-xl">←</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-black text-white mb-2">
            Cost
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent block">
              Calculator
            </span>
          </h1>
          <p className="text-gray-400 text-sm">
            Estimate your monthly budget in Turkey
          </p>
        </motion.div>
      </div>

      {/* Calculator Form */}
      <div className="relative z-10 px-6 pb-24">
        {/* City Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-white font-semibold text-sm mb-3">📍 Select City</h3>
          <div className="grid grid-cols-2 gap-3">
            {cityOptions.map((city: any) => (
              <motion.button
                key={city.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCity(city.id)}
                className={`
                  p-4 rounded-xl text-sm font-semibold transition-all duration-300
                  ${selectedCity === city.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg'
                    : 'bg-gray-800/40 text-gray-300 border border-gray-700/30'
                  }
                `}
              >
                <div>{city.name}</div>
                <div className="text-xs opacity-75">×{city.multiplier} cost</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Accommodation Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <h3 className="text-white font-semibold text-sm mb-3">🏠 Accommodation Type</h3>
          <div className="space-y-3">
            {accommodationOptions.map((option: any) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedAccommodation(option.id)}
                className={`
                  w-full p-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-between
                  ${selectedAccommodation === option.id
                    ? 'bg-gradient-to-r from-green-500/20 to-green-700/20 border border-green-500/30 text-green-300'
                    : 'bg-gray-800/40 text-gray-300 border border-gray-700/30'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{option.icon}</span>
                  <span className="font-semibold">{option.name}</span>
                </div>
                <span className="font-bold">${option.cost}/month</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Lifestyle Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <h3 className="text-white font-semibold text-sm mb-3">
            💰 Lifestyle Level: {['Budget', 'Moderate', 'Comfortable'][lifestyle - 1]}
          </h3>
          <div className="bg-gray-800/40 rounded-xl p-4">
            <input
              type="range"
              min="1"
              max="3"
              value={lifestyle}
              onChange={(e) => setLifestyle(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>💸 Budget</span>
              <span>💰 Moderate</span>
              <span>💎 Comfortable</span>
            </div>
          </div>
        </motion.div>

        {/* Optional Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-8"
        >
          <h3 className="text-white font-semibold text-sm mb-3">📚 Optional Expenses</h3>
          <div className="space-y-2">
            {costCategories.filter((cat: any) => !cat.required).map((category: any, index: number) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setIncludeOptional(prev => 
                  prev.includes(category.id)
                    ? prev.filter(id => id !== category.id)
                    : [...prev, category.id]
                )}
                className={`
                  w-full p-3 rounded-xl text-sm transition-all duration-300 flex items-center justify-between
                  ${includeOptional.includes(category.id)
                    ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
                    : 'bg-gray-800/40 text-gray-400 border border-gray-700/30'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
                <span className="text-xs">
                  {includeOptional.includes(category.id) ? '✓ Included' : '+ Add'}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 border border-gray-700/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          {/* Total Cost */}
          <div className="text-center mb-6">
            <div className="text-4xl font-black text-green-400 mb-2">
              ${totalCost.total.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Estimated Monthly Budget</div>
          </div>

          {/* Cost Breakdown Chart */}
          <div className="mb-6">
            <h4 className="text-white font-semibold text-sm mb-4">📊 Cost Breakdown</h4>
            
            {/* Visual Chart */}
            <div className="flex h-4 rounded-full overflow-hidden mb-4">
              {totalCost.categories.map((cost: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ width: 0 }}
                  animate={{ width: `${cost.percentage}%` }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.8 }}
                  style={{ backgroundColor: cost.color }}
                  className="h-full"
                />
              ))}
            </div>

            {/* Legend */}
            <div className="space-y-2">
              {totalCost.categories.map((cost: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cost.color }}
                    />
                    <span className="text-gray-300">{cost.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">${cost.amount}</div>
                    <div className="text-gray-400 text-xs">{cost.percentage}%</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-300 text-sm font-semibold"
            >
              💾 Save Budget
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-sm font-semibold"
            >
              📤 Share Results
            </motion.button>
          </div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl"
          >
            <div className="flex items-start space-x-3">
              <span className="text-yellow-400 text-lg">💡</span>
              <div>
                <div className="text-yellow-300 font-semibold text-sm mb-1">Budget Tips</div>
                <div className="text-yellow-200 text-xs leading-relaxed">
                  Consider university dorms for cheaper accommodation. Cook at home to save on food costs. Use student discounts for transportation.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Floating Bottom Navigation */}
      <FloatingBottomNav
        activeTab="search"
        onTabChange={(tabId) => {
          if (tabId === 'home') {
            onBack();
          }
          // Handle other navigation as needed
        }}
        variant="dashboard"
      />
    </div>
  );
};

export default CostCalculator;
