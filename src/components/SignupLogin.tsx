'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SignupLoginProps {
  onComplete: (userData: { email: string; name: string; method: string }) => void;
  onBack: () => void;
}

const SignupLogin: React.FC<SignupLoginProps> = ({ onComplete, onBack }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const socialMethods = [
    { id: 'google', name: 'Google', icon: '🔍', color: 'from-blue-500 to-blue-700' },
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'from-blue-600 to-blue-800' },
    { id: 'apple', name: 'Apple', icon: '🍎', color: 'from-gray-600 to-gray-800' },
    { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'from-sky-500 to-sky-700' }
  ];

  const handleSocialLogin = (method: string) => {
    onComplete({
      email: `user@${method}.com`,
      name: 'Ahmad',
      method: method
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && (isLogin || formData.name)) {
      onComplete({
        email: formData.email,
        name: formData.name || 'Ahmad',
        method: 'email'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" 
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
          className="mb-8 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
        >
          <span className="text-white text-xl">←</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-black text-white mb-4">
            {isLogin ? 'Welcome Back' : 'Join Us'}
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent block">
              {isLogin ? 'Scholar' : 'Future Scholar'}
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            {isLogin 
              ? 'Sign in to continue your journey' 
              : 'Create your account to unlock personalized features'
            }
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 px-6 max-w-md mx-auto">
        {/* Social Login Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 mb-8"
        >
          {socialMethods.map((method, index) => (
            <motion.button
              key={method.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialLogin(method.id)}
              className="w-full p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm flex items-center space-x-4 hover:bg-gray-800/60 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center text-lg`}>
                {method.icon}
              </div>
              <span className="text-white font-semibold flex-1 text-left">
                Continue with {method.name}
              </span>
              <span className="text-gray-400">→</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700/50"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gradient-to-r from-black via-gray-900 to-black text-gray-400">
              Or continue with email
            </span>
          </div>
        </motion.div>

        {/* Email Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onSubmit={handleFormSubmit}
          className="space-y-4 mb-6"
        >
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm text-white placeholder-gray-400 focus:border-red-500/50 focus:outline-none transition-all duration-300"
                required={!isLogin}
              />
            </div>
          )}
          
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm text-white placeholder-gray-400 focus:border-red-500/50 focus:outline-none transition-all duration-300"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm text-white placeholder-gray-400 focus:border-red-500/50 focus:outline-none transition-all duration-300"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl shadow-red-500/25 border border-red-400/20"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="ml-2 inline-block"
            >
              →
            </motion.span>
          </motion.button>
        </motion.form>

        {/* Toggle Login/Signup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-400 hover:text-red-400 transition-colors duration-300"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
        </motion.div>

        {/* Terms */}
        {!isLogin && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-xs text-gray-500 text-center mt-6 leading-relaxed"
          >
            By creating an account, you agree to our{' '}
            <span className="text-red-400 hover:text-red-300 cursor-pointer">Terms of Service</span>
            {' '}and{' '}
            <span className="text-red-400 hover:text-red-300 cursor-pointer">Privacy Policy</span>
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default SignupLogin;
