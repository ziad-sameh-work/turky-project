'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TravelGuide, VisaRequirement, DocumentChecklistItem } from '../data/mockData';

interface PreTravelGuideProps {
  travelGuide: TravelGuide;
}

const PreTravelGuide: React.FC<PreTravelGuideProps> = ({ travelGuide }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [checkedDocuments, setCheckedDocuments] = useState<Set<string>>(new Set());
  const [selectedInsurance, setSelectedInsurance] = useState<string>('');

  const handleDocumentCheck = (documentId: string) => {
    const newChecked = new Set(checkedDocuments);
    if (newChecked.has(documentId)) {
      newChecked.delete(documentId);
    } else {
      newChecked.add(documentId);
    }
    setCheckedDocuments(newChecked);
  };

  const getVisaRequirementColor = (requirement: VisaRequirement['requirement']) => {
    switch (requirement) {
      case 'visa-free': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'e-visa': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'visa-on-arrival': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'embassy-visa': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: DocumentChecklistItem['category']) => {
    switch (category) {
      case 'essential': return 'text-red-400 bg-red-500/20';
      case 'recommended': return 'text-yellow-400 bg-yellow-500/20';
      case 'optional': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const downloadChecklist = () => {
    // Mock PDF download functionality
    const element = document.createElement('a');
    element.href = '/documents/turkey-travel-checklist.pdf';
    element.download = 'Turkey_Travel_Document_Checklist.pdf';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          className="inline-flex items-center space-x-3 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <div className="text-3xl">📋</div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Pre-Travel Guide</h1>
            <p className="text-gray-400">Everything you need before your Turkey adventure</p>
          </div>
        </motion.div>
      </div>

      {/* Visa Requirements Section */}
      <motion.div
        className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <div className="text-2xl">🛂</div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Visa Requirements</h2>
            <p className="text-sm text-gray-400">Check your country&apos;s visa requirements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {travelGuide.preTravel.visaRequirements.map((visa) => (
            <motion.div
              key={visa.countryCode}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedCountry === visa.countryCode
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCountry(selectedCountry === visa.countryCode ? '' : visa.countryCode)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">{visa.countryCode === 'US' ? '🇺🇸' : visa.countryCode === 'GB' ? '🇬🇧' : visa.countryCode === 'DE' ? '🇩🇪' : visa.countryCode === 'RU' ? '🇷🇺' : '🌍'}</div>
                <div>
                  <h3 className="font-medium text-white">{visa.country}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getVisaRequirementColor(visa.requirement)}`}>
                    {visa.requirement.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{visa.duration}</span>
                </div>
                {visa.fee && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fee:</span>
                    <span className="text-white">{visa.fee}</span>
                  </div>
                )}
                {visa.processingTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Processing:</span>
                    <span className="text-white">{visa.processingTime}</span>
                  </div>
                )}
              </div>

              <AnimatePresence>
                {selectedCountry === visa.countryCode && visa.notes && (
                  <motion.div
                    className="mt-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className="text-sm text-blue-300">{visa.notes}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Travel Insurance Section */}
      <motion.div
        className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <div className="text-2xl">🛡️</div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Travel Insurance</h2>
            <p className="text-sm text-gray-400">Compare and choose the best coverage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {travelGuide.preTravel.insuranceProviders.map((provider) => (
            <motion.div
              key={provider.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedInsurance === provider.id
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedInsurance(selectedInsurance === provider.id ? '' : provider.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{provider.name}</h3>
                <div className="flex items-center space-x-1">
                  <div className="text-yellow-400">⭐</div>
                  <span className="text-sm text-gray-300">{provider.rating}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Basic:</span>
                  <span className="text-white">${provider.price.basic}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Standard:</span>
                  <span className="text-white">${provider.price.standard}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Premium:</span>
                  <span className="text-white">${provider.price.premium}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-1">
                  {provider.coverage.slice(0, 3).map((item) => (
                    <span key={item} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {selectedInsurance === provider.id && (
                  <motion.div
                    className="mt-4 space-y-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Features:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {provider.features.map((feature) => (
                          <li key={feature} className="flex items-center space-x-2">
                            <div className="text-green-400">✓</div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
                      onClick={() => window.open(provider.link, '_blank')}
                    >
                      Get Quote
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Vaccinations Section */}
      <motion.div
        className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <div className="text-2xl">💉</div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Vaccinations</h2>
            <p className="text-sm text-gray-400">Recommended health preparations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {travelGuide.preTravel.vaccinations.map((vaccination) => (
            <motion.div
              key={vaccination.id}
              className="p-4 rounded-lg border border-gray-600"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">{vaccination.icon}</div>
                <div>
                  <h3 className="font-medium text-white">{vaccination.name}</h3>
                  <div className="flex space-x-2">
                    {vaccination.required && (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/30">
                        Required
                      </span>
                    )}
                    {vaccination.recommended && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded border border-yellow-500/30">
                        Recommended
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-2">{vaccination.description}</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Timeframe:</span>
                <span className="text-white">{vaccination.timeframe}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Document Checklist Section */}
      <motion.div
        className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <div className="text-2xl">📄</div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Document Checklist</h2>
              <p className="text-sm text-gray-400">Essential documents for your trip</p>
            </div>
          </div>
          <button
            onClick={downloadChecklist}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            <div className="text-lg">📥</div>
            <span>Download PDF</span>
          </button>
        </div>

        <div className="space-y-4">
          {travelGuide.preTravel.documentChecklist.map((document) => (
            <motion.div
              key={document.id}
              className={`p-4 rounded-lg border transition-all ${
                checkedDocuments.has(document.id)
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDocumentCheck(document.id)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    checkedDocuments.has(document.id)
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-500 hover:border-green-500'
                  }`}
                >
                  {checkedDocuments.has(document.id) && (
                    <div className="text-white text-sm">✓</div>
                  )}
                </button>

                <div className="text-2xl">{document.icon}</div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className={`font-medium ${checkedDocuments.has(document.id) ? 'text-green-400' : 'text-white'}`}>
                      {document.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(document.category)}`}>
                      {document.category.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{document.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="text-lg">💡</div>
            <span className="text-blue-400 font-medium">Pro Tip</span>
          </div>
          <p className="text-sm text-gray-300">
            Make digital copies of all important documents and store them securely in cloud storage. 
            Also carry physical copies separate from originals.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PreTravelGuide;
