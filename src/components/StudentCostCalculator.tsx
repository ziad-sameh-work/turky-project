'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Home, Book, Utensils, Car, ShoppingBag } from 'lucide-react';

interface CostItem {
  id: string;
  category: string;
  name: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
}

const StudentCostCalculator: React.FC = () => {
  const [costs, setCosts] = useState<CostItem[]>([
    {
      id: '1',
      category: 'السكن',
      name: 'إيجار الشقة',
      amount: 2500,
      icon: <Home size={20} />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: '2',
      category: 'التعليم',
      name: 'الرسوم الدراسية',
      amount: 15000,
      icon: <Book size={20} />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: '3',
      category: 'الطعام',
      name: 'وجبات شهرية',
      amount: 1200,
      icon: <Utensils size={20} />,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: '4',
      category: 'المواصلات',
      name: 'بطاقة النقل',
      amount: 300,
      icon: <Car size={20} />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: '5',
      category: 'أخرى',
      name: 'مصروفات شخصية',
      amount: 800,
      icon: <ShoppingBag size={20} />,
      color: 'from-pink-500 to-pink-600'
    }
  ]);

  const [newCost, setNewCost] = useState({
    category: '',
    name: '',
    amount: 0
  });

  const totalCost = costs.reduce((sum, cost) => sum + cost.amount, 0);

  const handleAddCost = () => {
    if (!newCost.name || !newCost.category || newCost.amount <= 0) return;

    const cost: CostItem = {
      id: Date.now().toString(),
      category: newCost.category,
      name: newCost.name,
      amount: newCost.amount,
      icon: <DollarSign size={20} />,
      color: 'from-gray-500 to-gray-600'
    };

    setCosts(prev => [...prev, cost]);
    setNewCost({ category: '', name: '', amount: 0 });
  };

  const handleUpdateCost = (id: string, amount: number) => {
    setCosts(prev => prev.map(cost => 
      cost.id === id ? { ...cost, amount } : cost
    ));
  };

  const handleDeleteCost = (id: string) => {
    setCosts(prev => prev.filter(cost => cost.id !== id));
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
          <Calculator className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">حاسبة التكاليف الشهرية</h2>
          <p className="text-gray-400 text-sm">احسب تكاليف المعيشة والدراسة</p>
        </div>
      </div>

      {/* Total Cost Display */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-2xl p-6 mb-6"
      >
        <div className="text-center">
          <h3 className="text-green-400 text-sm font-medium mb-2">إجمالي التكاليف الشهرية</h3>
          <div className="text-4xl font-bold text-white mb-2">
            {totalCost.toLocaleString()} <span className="text-2xl text-green-400">₺</span>
          </div>
          <div className="text-sm text-green-300">
            ≈ ${(totalCost * 0.034).toFixed(0)} USD
          </div>
        </div>
      </motion.div>

      {/* Cost Items */}
      <div className="space-y-4 mb-6">
        {costs.map((cost, index) => (
          <motion.div
            key={cost.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${cost.color} rounded-lg flex items-center justify-center`}>
                  {cost.icon}
                </div>
                <div>
                  <h4 className="text-white font-medium">{cost.name}</h4>
                  <p className="text-gray-400 text-sm">{cost.category}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={cost.amount}
                  onChange={(e) => handleUpdateCost(cost.id, Number(e.target.value))}
                  className="w-24 p-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white text-right focus:outline-none focus:border-green-500/50"
                />
                <span className="text-green-400 font-medium">₺</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteCost(cost.id)}
                  className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  ×
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add New Cost */}
      <div className="border-t border-gray-700/50 pt-6">
        <h3 className="text-white font-semibold mb-4">إضافة تكلفة جديدة</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="الفئة (مثل: السكن)"
            value={newCost.category}
            onChange={(e) => setNewCost(prev => ({ ...prev, category: e.target.value }))}
            className="p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50"
          />
          
          <input
            type="text"
            placeholder="اسم التكلفة"
            value={newCost.name}
            onChange={(e) => setNewCost(prev => ({ ...prev, name: e.target.value }))}
            className="p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50"
          />
          
          <input
            type="number"
            placeholder="المبلغ (₺)"
            value={newCost.amount || ''}
            onChange={(e) => setNewCost(prev => ({ ...prev, amount: Number(e.target.value) }))}
            className="p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50"
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddCost}
          disabled={!newCost.name || !newCost.category || newCost.amount <= 0}
          className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          إضافة التكلفة
        </motion.button>
      </div>

      {/* Cost Breakdown */}
      <div className="mt-6 pt-6 border-t border-gray-700/50">
        <h3 className="text-white font-semibold mb-4">تفصيل التكاليف</h3>
        
        <div className="space-y-2">
          {costs.map((cost) => {
            const percentage = (cost.amount / totalCost) * 100;
            return (
              <div key={cost.id} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">{cost.category}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${cost.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-white text-sm font-medium w-12 text-right">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentCostCalculator;
