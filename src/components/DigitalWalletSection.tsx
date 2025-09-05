'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DigitalWallet, PaymentMethod, Transaction } from '../data/userProfileData';

interface DigitalWalletSectionProps {
  digitalWallet: DigitalWallet;
  onTopUpWallet?: (amount: number, paymentMethodId: string) => void;
}

const DigitalWalletSection: React.FC<DigitalWalletSectionProps> = ({
  digitalWallet,
  onTopUpWallet
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'payments' | 'settings'>('overview');
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  // const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  const formatCurrency = (amount: number, currency: string = 'TRY') => {
    const symbol = currency === 'TRY' ? '₺' : currency === 'USD' ? '$' : '€';
    return `${symbol}${Math.abs(amount).toFixed(2)}`;
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'payment': return '💳';
      case 'refund': return '↩️';
      case 'transfer': return '🔄';
      case 'topup': return '⬆️';
      case 'withdrawal': return '⬇️';
      case 'reward': return '🎁';
      default: return '💰';
    }
  };

  const getCategoryIcon = (category: Transaction['category']) => {
    switch (category) {
      case 'restaurant': return '🍽️';
      case 'transportation': return '🚇';
      case 'accommodation': return '🏨';
      case 'shopping': return '🛍️';
      case 'entertainment': return '🎭';
      case 'education': return '📚';
      default: return '💼';
    }
  };

  const getPaymentMethodIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'credit_card': return '💳';
      case 'debit_card': return '💳';
      case 'bank_account': return '🏦';
      case 'digital_wallet': return '📱';
      case 'crypto': return '₿';
      default: return '💰';
    }
  };

  const handleTopUp = () => {
    if (onTopUpWallet && topUpAmount && selectedPaymentMethod) {
      onTopUpWallet(parseFloat(topUpAmount), selectedPaymentMethod);
      setShowTopUpModal(false);
      setTopUpAmount('');
      setSelectedPaymentMethod('');
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'transactions', name: 'Transactions', icon: '📋' },
    { id: 'payments', name: 'Payment Methods', icon: '💳' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Digital Wallet</h2>
          <p className="text-gray-400">Manage your payments and transactions</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Last updated</p>
          <p className="text-white text-sm">
            {new Date(digitalWallet.balance.lastUpdated).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Balance Card */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 text-sm">Total Balance</p>
            <h3 className="text-3xl font-bold">
              {formatCurrency(digitalWallet.balance.totalBalance, digitalWallet.balance.currency)}
            </h3>
          </div>
          <div className="text-4xl">💰</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-blue-100 text-xs">Available</p>
            <p className="text-lg font-semibold">
              {formatCurrency(digitalWallet.balance.availableBalance, digitalWallet.balance.currency)}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-xs">Pending</p>
            <p className="text-lg font-semibold">
              {formatCurrency(digitalWallet.balance.pendingBalance, digitalWallet.balance.currency)}
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setShowTopUpModal(true)}
            className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 px-4 text-sm font-medium transition-colors"
          >
            ⬆️ Top Up
          </button>
          <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 px-4 text-sm font-medium transition-colors">
            📤 Send Money
          </button>
          <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 px-4 text-sm font-medium transition-colors">
            📥 Request
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <p className="text-gray-400 text-sm">This Month</p>
                    <p className="text-white font-semibold">
                      {formatCurrency(
                        digitalWallet.transactions
                          .filter(t => t.type === 'payment' && new Date(t.date).getMonth() === new Date().getMonth())
                          .reduce((sum, t) => sum + Math.abs(t.amount), 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <p className="text-gray-400 text-sm">Points Earned</p>
                    <p className="text-white font-semibold">
                      {digitalWallet.transactions
                        .filter(t => t.pointsEarned)
                        .reduce((sum, t) => sum + (t.pointsEarned || 0), 0)} pts
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">💳</div>
                  <div>
                    <p className="text-gray-400 text-sm">Payment Methods</p>
                    <p className="text-white font-semibold">
                      {digitalWallet.paymentMethods.filter(pm => pm.isActive).length} Active
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              </div>
              <div className="divide-y divide-gray-700">
                {digitalWallet.transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-gray-700/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-xl">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div className="text-sm">
                          {getCategoryIcon(transaction.category)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{transaction.description}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            {transaction.location && (
                              <>
                                <span>•</span>
                                <span>{transaction.location}</span>
                              </>
                            )}
                            <span>•</span>
                            <span className={transaction.isOnline ? 'text-blue-400' : 'text-green-400'}>
                              {transaction.isOnline ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                        </p>
                        {transaction.pointsEarned && (
                          <p className="text-xs text-yellow-400">+{transaction.pointsEarned} pts</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'transactions' && (
          <motion.div
            key="transactions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Transaction Filters */}
            <div className="flex flex-wrap gap-2">
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                <option>All Categories</option>
                <option>Restaurant</option>
                <option>Transportation</option>
                <option>Shopping</option>
                <option>Entertainment</option>
              </select>
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                <option>All Types</option>
                <option>Payment</option>
                <option>Top-up</option>
                <option>Refund</option>
                <option>Reward</option>
              </select>
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>This month</option>
                <option>Last month</option>
              </select>
            </div>

            {/* All Transactions */}
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 divide-y divide-gray-700">
              {digitalWallet.transactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-700/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="text-xl">{getTransactionIcon(transaction.type)}</div>
                        <div className="text-sm">{getCategoryIcon(transaction.category)}</div>
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{new Date(transaction.date).toLocaleTimeString()}</span>
                          {transaction.merchant && (
                            <>
                              <span>•</span>
                              <span>{transaction.merchant}</span>
                            </>
                          )}
                          {transaction.location && (
                            <>
                              <span>•</span>
                              <span>{transaction.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                      </p>
                      <div className="flex items-center space-x-2 text-xs mt-1">
                        <span className={`px-2 py-1 rounded-full ${
                          transaction.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                          transaction.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                          'bg-red-900/30 text-red-400'
                        }`}>
                          {transaction.status}
                        </span>
                        {transaction.pointsEarned && (
                          <span className="text-yellow-400">+{transaction.pointsEarned} pts</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'payments' && (
          <motion.div
            key="payments"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Add Payment Method Button */}
            <button
              onClick={() => {/* TODO: Implement add payment method */}}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-4 font-medium transition-colors"
            >
              + Add Payment Method
            </button>

            {/* Payment Methods */}
            <div className="space-y-3">
              {digitalWallet.paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`bg-gray-800/50 rounded-lg p-4 border transition-colors ${
                    method.isDefault ? 'border-blue-500' : 'border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">{getPaymentMethodIcon(method.type)}</div>
                      <div>
                        <p className="text-white font-medium">{method.name}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          {method.bankName && <span>{method.bankName}</span>}
                          {method.expiryDate && (
                            <>
                              <span>•</span>
                              <span>Expires {method.expiryDate}</span>
                            </>
                          )}
                          <span>•</span>
                          <span className={`px-2 py-1 rounded-full ${
                            method.verificationStatus === 'verified' ? 'bg-green-900/30 text-green-400' :
                            method.verificationStatus === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                            'bg-red-900/30 text-red-400'
                          }`}>
                            {method.verificationStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      <button className="text-gray-400 hover:text-white p-1">
                        ⚙️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Auto Top-up Settings */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Auto Top-up</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Enable Auto Top-up</span>
                  <button 
                    onClick={() => {/* TODO: Implement settings update */}}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      digitalWallet.settings.autoTopup ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      digitalWallet.settings.autoTopup ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Top-up Amount</label>
                    <input
                      type="number"
                      value={digitalWallet.settings.autoTopupAmount}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">When Balance Below</label>
                    <input
                      type="number"
                      value={digitalWallet.settings.autoTopupThreshold}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Require PIN for payments</span>
                  <button 
                    onClick={() => {/* TODO: Implement settings update */}}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      digitalWallet.settings.security.requirePinForPayments ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      digitalWallet.settings.security.requirePinForPayments ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Biometric authentication</span>
                  <button 
                    onClick={() => {/* TODO: Implement settings update */}}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      digitalWallet.settings.security.requireBiometric ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      digitalWallet.settings.security.requireBiometric ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Daily Spending Limit</label>
                  <input
                    type="number"
                    value={digitalWallet.settings.security.maxDailySpend}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Transaction notifications</span>
                  <button 
                    onClick={() => {/* TODO: Implement settings update */}}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      digitalWallet.settings.notifications.transactions ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      digitalWallet.settings.notifications.transactions ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Low balance alerts</span>
                  <button 
                    onClick={() => {/* TODO: Implement settings update */}}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      digitalWallet.settings.notifications.lowBalance ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      digitalWallet.settings.notifications.lowBalance ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Monthly statements</span>
                  <button 
                    onClick={() => {/* TODO: Implement settings update */}}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      digitalWallet.settings.notifications.monthlyStatement ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      digitalWallet.settings.notifications.monthlyStatement ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-up Modal */}
      <AnimatePresence>
        {showTopUpModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Top Up Wallet</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Amount</label>
                  <input
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Payment Method</label>
                  <select
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Select payment method</option>
                    {digitalWallet.paymentMethods
                      .filter(pm => pm.isActive && pm.verificationStatus === 'verified')
                      .map(pm => (
                        <option key={pm.id} value={pm.id}>{pm.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowTopUpModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-2 px-4 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTopUp}
                  disabled={!topUpAmount || !selectedPaymentMethod}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg py-2 px-4 transition-colors"
                >
                  Top Up
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DigitalWalletSection;
