'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { AttractionQuickInfo } from '../data/mockData';

interface AttractionQuickInfoProps {
  quickInfo: AttractionQuickInfo;
}

const AttractionQuickInfo: React.FC<AttractionQuickInfoProps> = ({ quickInfo }) => {
  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return 'Free';
    return `${price} ${currency}`;
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
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
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <div className="text-2xl">ℹ️</div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Quick Information</h2>
          <p className="text-sm text-gray-400">Essential details for your visit</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opening Hours */}
        <motion.div
          className="bg-gray-900/50 rounded-lg p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <div className="text-lg">🕐</div>
            <h3 className="font-semibold text-white">Opening Hours</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Weekdays:</span>
              <span className="text-white">{quickInfo.openingHours.weekdays}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Weekends:</span>
              <span className="text-white">{quickInfo.openingHours.weekends}</span>
            </div>
            {quickInfo.openingHours.holidays && (
              <div className="flex justify-between">
                <span className="text-gray-400">Holidays:</span>
                <span className="text-white">{quickInfo.openingHours.holidays}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Ticket Prices */}
        <motion.div
          className="bg-gray-900/50 rounded-lg p-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <div className="text-lg">🎫</div>
            <h3 className="font-semibold text-white">Ticket Prices</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Adults:</span>
              <span className="text-white font-medium">
                {formatPrice(quickInfo.ticketPrices.adult, quickInfo.ticketPrices.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Children (&lt;12):</span>
              <span className="text-white font-medium">
                {formatPrice(quickInfo.ticketPrices.child, quickInfo.ticketPrices.currency)}
              </span>
            </div>
            {quickInfo.ticketPrices.student && (
              <div className="flex justify-between">
                <span className="text-gray-400">Students:</span>
                <span className="text-white font-medium">
                  {formatPrice(quickInfo.ticketPrices.student, quickInfo.ticketPrices.currency)}
                </span>
              </div>
            )}
            {quickInfo.ticketPrices.senior && (
              <div className="flex justify-between">
                <span className="text-gray-400">Seniors:</span>
                <span className="text-white font-medium">
                  {formatPrice(quickInfo.ticketPrices.senior, quickInfo.ticketPrices.currency)}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Best Time to Visit */}
        <motion.div
          className="bg-gray-900/50 rounded-lg p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <div className="text-lg">⏰</div>
            <h3 className="font-semibold text-white">Best Time to Visit</h3>
          </div>
          <div className="space-y-2">
            {quickInfo.bestTimeToVisit.map((time, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">{time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Estimated Duration */}
        <motion.div
          className="bg-gray-900/50 rounded-lg p-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <div className="text-lg">⏱️</div>
            <h3 className="font-semibold text-white">Duration</h3>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {quickInfo.estimatedDuration}
            </div>
            <div className="text-sm text-gray-400">Recommended visit time</div>
          </div>
        </motion.div>
      </div>

      {/* Directions */}
      <motion.div
        className="mt-6 bg-gray-900/50 rounded-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <div className="text-lg">🚇</div>
          <h3 className="font-semibold text-white">How to Get There</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickInfo.directions.metro && (
            <div className="flex items-start space-x-3">
              <div className="text-lg">🚇</div>
              <div>
                <div className="text-sm font-medium text-blue-400">Metro</div>
                <div className="text-sm text-gray-300">{quickInfo.directions.metro}</div>
              </div>
            </div>
          )}
          {quickInfo.directions.bus && (
            <div className="flex items-start space-x-3">
              <div className="text-lg">🚌</div>
              <div>
                <div className="text-sm font-medium text-green-400">Bus</div>
                <div className="text-sm text-gray-300">{quickInfo.directions.bus}</div>
              </div>
            </div>
          )}
          {quickInfo.directions.taxi && (
            <div className="flex items-start space-x-3">
              <div className="text-lg">🚕</div>
              <div>
                <div className="text-sm font-medium text-yellow-400">Taxi</div>
                <div className="text-sm text-gray-300">{quickInfo.directions.taxi}</div>
              </div>
            </div>
          )}
          {quickInfo.directions.walking && (
            <div className="flex items-start space-x-3">
              <div className="text-lg">🚶</div>
              <div>
                <div className="text-sm font-medium text-purple-400">Walking</div>
                <div className="text-sm text-gray-300">{quickInfo.directions.walking}</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      {quickInfo.upcomingEvents.length > 0 && (
        <motion.div
          className="mt-6 bg-gray-900/50 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <div className="text-lg">🎭</div>
            <h3 className="font-semibold text-white">Upcoming Events</h3>
          </div>
          <div className="space-y-3">
            {quickInfo.upcomingEvents.map((event) => (
              <div key={event.id} className="border border-gray-600 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-white">{event.title}</h4>
                  {event.price && (
                    <span className="text-sm bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {event.price} TL
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-300 mb-2">{event.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>📅 {formatEventDate(event.date)} at {event.time}</span>
                  {event.bookingRequired && (
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                      Booking Required
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AttractionQuickInfo;
