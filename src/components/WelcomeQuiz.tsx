'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockQuizQuestions, QuizQuestion, QuizOption } from '@/data/mockData';

interface WelcomeQuizProps {
  onComplete: (answers: Record<string, string[]>) => void;
  onBack: () => void;
}

const WelcomeQuiz: React.FC<WelcomeQuizProps> = ({ onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = mockQuizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuizQuestions.length) * 100;

  const handleOptionSelect = (option: QuizOption) => {
    if (currentQuestion.type === 'single') {
      setSelectedOptions([option.value]);
    } else {
      setSelectedOptions(prev => 
        prev.includes(option.value)
          ? prev.filter(val => val !== option.value)
          : [...prev, option.value]
      );
    }
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedOptions
    }));

    setIsAnimating(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < mockQuizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOptions([]);
      } else {
        onComplete({
          ...answers,
          [currentQuestion.id]: selectedOptions
        });
      }
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        const prevAnswers = answers[mockQuizQuestions[currentQuestionIndex - 1].id] || [];
        setSelectedOptions(prevAnswers);
        setIsAnimating(false);
      }, 300);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" 
        />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 px-6">
        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full mb-6 shadow-lg shadow-red-500/25"
        />
        
        <div className="flex items-center justify-between mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
          >
            <span className="text-white text-xl">←</span>
          </motion.button>

          <div className="text-center">
            <div className="text-red-400 font-semibold text-sm">
              Question {currentQuestionIndex + 1} of {mockQuizQuestions.length}
            </div>
            <div className="text-gray-400 text-xs mt-1">
              {Math.round(progress)}% Complete
            </div>
          </div>

          <div className="w-12" /> {/* Spacer */}
        </div>
      </div>

      {/* Question Content */}
      <div className="relative z-10 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: isAnimating ? 100 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="max-w-md mx-auto"
          >
            {/* Question */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-black text-white mb-8 text-center leading-tight"
            >
              {currentQuestion.question}
            </motion.h1>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(option)}
                  className={`
                    relative cursor-pointer group transition-all duration-300
                    ${selectedOptions.includes(option.value)
                      ? 'transform scale-105'
                      : ''
                    }
                  `}
                >
                  <div className={`
                    relative p-4 rounded-2xl border transition-all duration-300
                    ${selectedOptions.includes(option.value)
                      ? 'bg-gradient-to-r from-red-500/20 to-red-700/20 border-red-500/50 shadow-2xl shadow-red-500/25'
                      : 'bg-gray-800/40 border-gray-700/30 hover:bg-gray-800/60 hover:border-gray-600/50'
                    }
                    backdrop-blur-sm
                  `}>
                    
                    {/* Glow Effect */}
                    {selectedOptions.includes(option.value) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 to-red-700/10 blur-xl"
                      />
                    )}

                    <div className="relative z-10 flex items-center space-x-4">
                      {/* Icon */}
                      <motion.div
                        animate={{ 
                          scale: selectedOptions.includes(option.value) ? 1.2 : 1,
                          rotate: selectedOptions.includes(option.value) ? 360 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className={`
                          w-12 h-12 rounded-xl flex items-center justify-center text-xl
                          ${selectedOptions.includes(option.value)
                            ? 'bg-gradient-to-r from-red-500 to-red-700 shadow-lg'
                            : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                          }
                          transition-all duration-300
                        `}
                      >
                        {option.icon}
                      </motion.div>

                      {/* Text */}
                      <div className="flex-1">
                        <span className={`
                          font-semibold transition-colors duration-300
                          ${selectedOptions.includes(option.value)
                            ? 'text-white'
                            : 'text-gray-300 group-hover:text-white'
                          }
                        `}>
                          {option.text}
                        </span>
                      </div>

                      {/* Selection Indicator */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: selectedOptions.includes(option.value) ? 1 : 0,
                          opacity: selectedOptions.includes(option.value) ? 1 : 0
                        }}
                        className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-sm">✓</span>
                      </motion.div>
                    </div>

                    {/* Ripple Effect */}
                    {selectedOptions.includes(option.value) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 rounded-2xl bg-red-500/20"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Multiple Selection Hint */}
            {currentQuestion.type === 'multiple' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-6"
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <span className="text-blue-400 text-sm">💡</span>
                  <span className="text-blue-300 text-sm">You can select multiple options</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 w-full max-w-md">
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: selectedOptions.length > 0 ? 1 : 0.5,
            y: 0,
            scale: selectedOptions.length > 0 ? 1 : 0.95
          }}
          whileHover={{ 
            scale: selectedOptions.length > 0 ? 1.05 : 0.95,
            boxShadow: selectedOptions.length > 0 ? "0 20px 40px rgba(239, 68, 68, 0.3)" : "none"
          }}
          whileTap={{ scale: selectedOptions.length > 0 ? 0.95 : 0.9 }}
          onClick={handleNext}
          disabled={selectedOptions.length === 0}
          className={`
            w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300
            ${selectedOptions.length > 0
              ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-2xl shadow-red-500/25 border border-red-400/20'
              : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {currentQuestionIndex === mockQuizQuestions.length - 1 ? 'Complete Quiz' : 'Continue'}
          <motion.span
            animate={{ x: selectedOptions.length > 0 ? [0, 5, 0] : 0 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="ml-2 inline-block"
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* Question Counter Dots */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {mockQuizQuestions.map((_, index) => (
          <motion.div
            key={index}
            animate={{ 
              scale: index === currentQuestionIndex ? 1.2 : 1,
              opacity: index <= currentQuestionIndex ? 1 : 0.3
            }}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index === currentQuestionIndex
                ? 'bg-red-500 w-8'
                : index < currentQuestionIndex
                ? 'bg-red-400'
                : 'bg-gray-600'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomeQuiz;
