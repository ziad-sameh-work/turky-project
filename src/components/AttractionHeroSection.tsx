'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Attraction } from '../data/mockData';

interface AttractionHeroSectionProps {
  attraction: Attraction;
  onViewMap: () => void;
}

const AttractionHeroSection: React.FC<AttractionHeroSectionProps> = ({ 
  attraction, 
  onViewMap 
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const formatReviewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <motion.div
      className="relative h-screen bg-gray-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Media */}
      <div className="absolute inset-0">
        {isVideoPlaying && attraction.heroVideo ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            onError={() => setIsVideoPlaying(false)}
          >
            <source src={attraction.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={attraction.heroImage}
            alt={attraction.name}
            fill
            className="object-cover"
            priority
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12">
        <motion.div
          className="max-w-4xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Category Badge */}
          <motion.div
            className="inline-flex items-center px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="text-blue-400 text-sm font-medium">{attraction.category}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {attraction.name}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-6 max-w-3xl leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {attraction.description}
          </motion.p>

          {/* Rating and Stats */}
          <motion.div
            className="flex items-center space-x-6 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < Math.floor(attraction.rating) 
                        ? 'text-yellow-400' 
                        : 'text-gray-500'
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-white font-semibold text-lg">
                {formatRating(attraction.rating)}
              </span>
            </div>
            
            <div className="text-gray-300">
              ({formatReviewCount(attraction.reviewCount)} visitors)
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* Play Video Button */}
            {attraction.heroVideo && !isVideoPlaying && (
              <button
                onClick={handlePlayVideo}
                className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg transition-all duration-300 text-white"
              >
                <div className="text-lg">▶️</div>
                <span className="font-medium">Watch Video</span>
              </button>
            )}

            {/* View on Map Button */}
            <button
              onClick={onViewMap}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-white font-medium"
            >
              <div className="text-lg">🗺️</div>
              <span>View on Map</span>
            </button>

            {/* Quick Info Button */}
            <button className="flex items-center space-x-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-600 rounded-lg transition-all duration-300 text-white">
              <div className="text-lg">ℹ️</div>
              <span>Quick Info</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              ⬇️
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Video Controls Overlay */}
      {isVideoPlaying && (
        <motion.div
          className="absolute top-6 right-6 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => setIsVideoPlaying(false)}
            className="p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full transition-colors text-white"
          >
            <div className="text-lg">❌</div>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AttractionHeroSection;
