'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { AttractionGallery } from '../data/mockData';

interface AttractionGalleryProps {
  gallery: AttractionGallery;
  attractionName: string;
}

const AttractionGallery: React.FC<AttractionGalleryProps> = ({ gallery, attractionName }) => {
  const [activeTab, setActiveTab] = useState<'360' | 'video' | 'photos'>('360');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const tabs = [
    { id: '360', name: '360° Photos', icon: '🌐', count: gallery.photos360.length },
    { id: 'video', name: 'Tour Video', icon: '🎬', count: 1 },
    { id: 'photos', name: 'User Photos', icon: '📸', count: gallery.userPhotos.length }
  ];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    const currentImages = activeTab === '360' ? gallery.photos360 : gallery.userPhotos;
    setSelectedImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    const currentImages = activeTab === '360' ? gallery.photos360 : gallery.userPhotos;
    setSelectedImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <motion.div
      className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <div className="text-2xl">🖼️</div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Gallery</h2>
          <p className="text-sm text-gray-400">Explore {attractionName} in detail</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-900/50 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-purple-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="font-medium">{tab.name}</span>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* 360° Photos Tab */}
        {activeTab === '360' && (
          <motion.div
            key="360"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-lg">🌐</div>
                <span className="text-blue-400 font-medium">360° Experience</span>
              </div>
              <p className="text-sm text-gray-300">
                Immerse yourself in a full 360° view. Click and drag to explore every angle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gallery.photos360.map((photo, index) => (
                <motion.div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={photo}
                    alt={`360° view ${index + 1}`}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <div className="text-2xl">🌐</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">
                      360° View {index + 1}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {gallery.virtualTour && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white mb-1">Virtual Tour Available</h3>
                    <p className="text-sm text-gray-300">Take a complete virtual walkthrough</p>
                  </div>
                  <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                    Start Tour
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Video Tab */}
        {activeTab === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video
                className="w-full h-64 md:h-96 object-cover"
                controls
                poster={gallery.photos360[0]}
              >
                <source src={gallery.tourVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-lg">🎬</div>
                <span className="font-medium text-white">1-Minute Tour</span>
              </div>
              <p className="text-sm text-gray-300">
                Get a quick overview of the main highlights and must-see areas in just one minute.
              </p>
            </div>
          </motion.div>
        )}

        {/* User Photos Tab */}
        {activeTab === 'photos' && (
          <motion.div
            key="photos"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-white">Visitor Photos</h3>
                <p className="text-sm text-gray-400">Real photos from travelers like you</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                <div className="text-lg">📷</div>
                <span>Upload Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {gallery.userPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={photo}
                    alt={`User photo ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <div className="text-lg">👁️</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-lg">📸</div>
                <span className="text-green-400 font-medium">Share Your Experience</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                Help other travelers by sharing your photos and earn 10 points for each upload!
              </p>
              <button className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors">
                Upload Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeTab === '360' ? gallery.photos360[selectedImageIndex] : gallery.userPhotos[selectedImageIndex]}
                alt={`Gallery image ${selectedImageIndex + 1}`}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <div className="text-xl">⬅️</div>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <div className="text-xl">➡️</div>
              </button>
              
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <div className="text-xl">❌</div>
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {activeTab === '360' ? gallery.photos360.length : gallery.userPhotos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AttractionGallery;
