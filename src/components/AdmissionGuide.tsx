'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { extendedUniversities, AdmissionStep } from '@/data/mockData';

interface AdmissionGuideProps {
  universityId: string;
  onBack: () => void;
}

const AdmissionGuide: React.FC<AdmissionGuideProps> = ({ universityId, onBack }) => {
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const university = extendedUniversities.find(uni => uni.id === universityId);
  
  if (!university) {
    return <div>University not found</div>;
  }

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const toggleCompletion = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const progressPercentage = (completedSteps.length / university.admissionSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
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
          className="mb-6"
        >
          <h1 className="text-3xl font-black text-white mb-2">
            Admission
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent block">
              Guide
            </span>
          </h1>
          <p className="text-gray-300 text-lg mb-4">{university.name}</p>
          
          {/* Progress Bar */}
          <div className="bg-gray-800/40 rounded-full h-3 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-green-500 to-green-700 rounded-full shadow-lg shadow-green-500/25"
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{completedSteps.length} of {university.admissionSteps.length} completed</span>
            <span className="text-green-400 font-semibold">{Math.round(progressPercentage)}%</span>
          </div>
        </motion.div>
      </div>

      {/* Steps List */}
      <div className="relative z-10 px-6 pb-24">
        <div className="space-y-4">
          {university.admissionSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`
                bg-gray-800/40 border rounded-2xl backdrop-blur-sm transition-all duration-300
                ${completedSteps.includes(step.id)
                  ? 'border-green-500/50 bg-green-500/10'
                  : expandedSteps.includes(step.id)
                  ? 'border-gray-600/50 bg-gray-800/60'
                  : 'border-gray-700/30'
                }
              `}
            >
              {/* Step Header */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => step.expandable && toggleStep(step.id)}
                className={`p-4 ${step.expandable ? 'cursor-pointer' : ''}`}
              >
                <div className="flex items-center space-x-4">
                  {/* Step Number/Checkbox */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompletion(step.id);
                    }}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                      ${completedSteps.includes(step.id)
                        ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg'
                        : 'bg-gray-700/50 text-gray-300 border border-gray-600/50'
                      }
                    `}
                  >
                    {completedSteps.includes(step.id) ? '✓' : index + 1}
                  </motion.button>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-bold text-sm ${
                        completedSteps.includes(step.id) ? 'text-green-300' : 'text-white'
                      }`}>
                        {step.title}
                      </h3>
                      {step.deadline && (
                        <div className="text-red-400 text-xs font-semibold">
                          📅 {step.deadline}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{step.description}</p>
                  </div>

                  {/* Expand Arrow */}
                  {step.expandable && (
                    <motion.div
                      animate={{ rotate: expandedSteps.includes(step.id) ? 180 : 0 }}
                      className="text-gray-400 text-xl"
                    >
                      ↓
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Expandable Content */}
              <AnimatePresence>
                {expandedSteps.includes(step.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-700/30"
                  >
                    <div className="p-4">
                      <h4 className="text-white font-semibold text-sm mb-3">Required Documents:</h4>
                      <div className="space-y-2">
                        {step.documents.map((document, docIndex) => (
                          <motion.div
                            key={docIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: docIndex * 0.1 }}
                            className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-xl"
                          >
                            <div className="w-6 h-6 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                              <span className="text-blue-400 text-xs">📄</span>
                            </div>
                            <span className="text-gray-300 text-sm flex-1">{document}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-6 h-6 bg-gray-600/50 rounded-lg flex items-center justify-center"
                            >
                              <span className="text-gray-400 text-xs">+</span>
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-300 text-sm font-semibold"
                        >
                          📋 View Checklist
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-sm font-semibold"
                        >
                          🔗 Official Guide
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gradient-to-r from-gray-800/60 to-gray-900/60 border border-gray-700/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          <h3 className="text-white font-bold text-lg mb-4">📊 Application Summary</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-black text-green-400">{university.acceptanceRate}</div>
              <div className="text-gray-400 text-xs">Acceptance Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-blue-400">{university.internationalStudents}</div>
              <div className="text-gray-400 text-xs">International Students</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Application Deadline:</span>
              <span className="text-red-400 font-semibold">April 30, 2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Decision Date:</span>
              <span className="text-yellow-400 font-semibold">June 15, 2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Tuition Range:</span>
              <span className="text-green-400 font-semibold">{university.tuitionRange}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-xl shadow-lg"
          >
            🚀 Start Application
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdmissionGuide;
