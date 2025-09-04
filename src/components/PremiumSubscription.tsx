'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBottomNav from './FloatingBottomNav';

interface PremiumFeature {
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}

interface PremiumSubscriptionProps {
  onBack: () => void;
}

const PremiumSubscription: React.FC<PremiumSubscriptionProps> = ({ onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [showPayment, setShowPayment] = useState(false);
  const [trialStarted, setTrialStarted] = useState(false);

  const premiumFeatures: PremiumFeature[] = [
    {
      icon: '🚫',
      title: 'Ad-Free Experience',
      description: 'Browse without interruptions and focus on your studies',
      highlight: true
    },
    {
      icon: '📚',
      title: 'Exclusive Study Guides',
      description: 'Access premium guides like "METU Application Secrets" and "YÖS Master Class"'
    },
    {
      icon: '🎯',
      title: 'Priority Support',
      description: 'Get faster responses from our AI assistant and support team'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Detailed progress tracking and personalized study recommendations'
    },
    {
      icon: '🏆',
      title: 'Exclusive Badges',
      description: 'Unlock premium achievements and showcase your dedication'
    },
    {
      icon: '📱',
      title: 'Offline Access',
      description: 'Download content for studying without internet connection'
    },
    {
      icon: '🎓',
      title: 'University Insider Tips',
      description: 'Get exclusive insights from current students and alumni'
    },
    {
      icon: '💰',
      title: 'Scholarship Alerts',
      description: 'First access to new scholarship opportunities and deadlines'
    }
  ];

  const plans = {
    monthly: {
      price: 5,
      period: 'month',
      savings: null,
      popular: false
    },
    yearly: {
      price: 50,
      period: 'year',
      savings: '17% off',
      popular: true
    }
  };

  const handleStartTrial = () => {
    setTrialStarted(true);
    setTimeout(() => {
      alert('🎉 7-day free trial activated! Enjoy all premium features.');
    }, 1000);
  };

  const handleSubscribe = () => {
    setShowPayment(true);
  };

  const handlePayment = () => {
    alert('🎉 Welcome to Premium! Your subscription is now active.');
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" 
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
            <h1 className="text-2xl font-bold text-white mb-1">Go Premium</h1>
            <p className="text-sm text-gray-400">Unlock your full potential</p>
          </div>

          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-xl">👑</span>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-6 mb-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
            className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-yellow-500/25"
          >
            <span className="text-white text-3xl">⭐</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Supercharge Your
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block">
              Study Journey
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Join thousands of successful students</p>
        </div>
      </motion.div>

      {/* Pricing Plans */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 px-6 mb-8"
      >
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <div className="flex bg-gray-700/50 rounded-xl p-1 mb-6">
            {Object.entries(plans).map(([key, plan]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPlan(key as 'monthly' | 'yearly')}
                className={`flex-1 p-3 rounded-lg font-medium transition-all relative ${
                  selectedPlan === key
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xs px-2 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="capitalize">{key}</div>
                {plan.savings && (
                  <div className="text-xs opacity-80">{plan.savings}</div>
                )}
              </motion.button>
            ))}
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-white mb-2">
              ${plans[selectedPlan].price}
              <span className="text-lg text-gray-400">/{plans[selectedPlan].period}</span>
            </div>
            {selectedPlan === 'yearly' && (
              <div className="text-green-400 text-sm">Save $10 per year!</div>
            )}
          </div>

          <div className="space-y-3">
            {!trialStarted ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartTrial}
                className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-green-500/25"
              >
                🎁 Start 7-Day Free Trial
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubscribe}
                className="w-full p-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-yellow-500/25"
              >
                👑 Subscribe Now
              </motion.button>
            )}
            
            <div className="text-center text-gray-400 text-sm">
              Cancel anytime • No commitment • Secure payment
            </div>
          </div>
        </div>
      </motion.div>

      {/* Premium Features */}
      <div className="relative z-10 px-6 pb-32">
        <h3 className="text-xl font-bold text-white mb-6 text-center">Premium Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`p-4 rounded-2xl border backdrop-blur-sm ${
                feature.highlight
                  ? 'bg-gradient-to-r from-yellow-500/20 to-orange-700/20 border-yellow-500/30'
                  : 'bg-gray-800/40 border-gray-700/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                  feature.highlight ? 'bg-yellow-500/20' : 'bg-gray-700/50'
                }`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold mb-1 ${
                    feature.highlight ? 'text-yellow-400' : 'text-white'
                  }`}>
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center"
        >
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex -space-x-2">
                {['👨‍🎓', '👩‍🎓', '👨‍💻', '👩‍🔬'].map((avatar, i) => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center border-2 border-gray-800">
                    <span className="text-lg">{avatar}</span>
                  </div>
                ))}
              </div>
              <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
            </div>
            <p className="text-white font-semibold mb-2">Join 5,000+ Premium Students</p>
            <p className="text-gray-400 text-sm">
              "Premium features helped me get into my dream university!" - Mehmet K.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowPayment(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-white mb-4 text-center">Complete Payment</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-700/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Premium {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}</span>
                    <span className="text-yellow-400 font-bold">${plans[selectedPlan].price}</span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {selectedPlan === 'yearly' ? 'Billed annually' : 'Billed monthly'}
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Secure payment powered by Stripe</span>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePayment}
                  className="flex-1 p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl text-white font-medium"
                >
                  Pay ${plans[selectedPlan].price}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPayment(false)}
                  className="px-6 py-3 bg-gray-600/50 rounded-xl text-white font-medium"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Floating Bottom Navigation */}
      <FloatingBottomNav
        activeTab="search"
        onTabChange={(tabId: string) => {
          if (tabId === 'home') {
            onBack();
          }
        }}
        variant="dashboard"
      />
    </div>
  );
};

export default PremiumSubscription;
