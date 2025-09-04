'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { languageOptions } from '@/data/mockData';

interface LanguageSelectionProps {
  selectedLanguage: string;
  onSelect: (language: string) => void;
  onContinue: () => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ 
  selectedLanguage, 
  onSelect, 
  onContinue 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl backdrop-blur-sm flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">
              {languageOptions.find(lang => lang.code === selectedLanguage)?.flag || '🌍'}
            </span>
            <span className="text-white font-semibold">
              {languageOptions.find(lang => lang.code === selectedLanguage)?.name || 'Select Language'}
            </span>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="text-gray-400 text-xl"
          >
            ↓
          </motion.span>
        </motion.button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-2 bg-gray-800/90 border border-gray-700/50 rounded-2xl backdrop-blur-sm shadow-2xl z-10 overflow-hidden"
            >
              {languageOptions.map((language, index) => (
                <motion.button
                  key={language.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  onClick={() => {
                    onSelect(language.code);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full p-4 flex items-center space-x-3 transition-colors duration-200
                    ${selectedLanguage === language.code ? 'bg-red-500/20 border-l-4 border-red-500' : ''}
                  `}
                >
                  <span className="text-2xl">{language.flag}</span>
                  <span className="text-white font-medium">{language.name}</span>
                  {selectedLanguage === language.code && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto text-red-400"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
        className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl shadow-red-500/25 border border-red-400/20"
      >
        Continue to Sign Up
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="ml-2 inline-block"
        >
          →
        </motion.span>
      </motion.button>
    </div>
  );
};

export default LanguageSelection;
