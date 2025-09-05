'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Using Unicode icons instead of Heroicons for compatibility
// import {
//   AcademicCapIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   ClockIcon,
//   ExclamationTriangleIcon
// } from '@heroicons/react/24/outline';
// Using Unicode icons instead of Heroicons for compatibility
import { UniversityStatus } from '../data/userProfileData';

interface UniversityStatusSectionProps {
  universityStatus: UniversityStatus;
  onSave: (updatedStatus: UniversityStatus) => void;
}

const UniversityStatusSection: React.FC<UniversityStatusSectionProps> = ({ 
  universityStatus, 
  onSave 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState<UniversityStatus>(universityStatus);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedStatus(universityStatus);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedStatus(universityStatus);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave(editedStatus);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving university status:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof UniversityStatus, value: string | number | boolean) => {
    setEditedStatus(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getVerificationStatusInfo = (status: string) => {
    switch (status) {
      case 'verified':
        return {
          icon: <div className="text-lg">✅</div>,
          text: 'Verified',
          color: 'text-green-400 bg-green-500/20 border-green-500/30'
        };
      case 'pending':
        return {
          icon: <div className="text-lg">⏰</div>,
          text: 'Pending Verification',
          color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
        };
      case 'rejected':
        return {
          icon: <div className="text-lg">⚠️</div>,
          text: 'Verification Failed',
          color: 'text-red-400 bg-red-500/20 border-red-500/30'
        };
      default:
        return {
          icon: <div className="text-lg">⏰</div>,
          text: 'Not Submitted',
          color: 'text-gray-400 bg-gray-500/20 border-gray-500/30'
        };
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const verificationInfo = getVerificationStatusInfo(universityStatus.verificationStatus);

  return (
    <motion.div
      className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <div className="text-2xl">🎓</div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">University Enrollment</h2>
            <p className="text-sm text-gray-400">Manage your academic information</p>
          </div>
        </div>
        
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <div className="text-sm">✏️</div>
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <div className="text-sm">❌</div>
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white rounded-lg transition-colors"
            >
              <div className="text-sm">✅</div>
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Enrollment Status Toggle */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Are you currently enrolled in a university?
        </label>
        {isEditing ? (
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="isEnrolled"
                checked={editedStatus.isEnrolled === true}
                onChange={() => handleInputChange('isEnrolled', true)}
                className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 focus:ring-purple-500"
              />
              <span className="text-white">Yes</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="isEnrolled"
                checked={editedStatus.isEnrolled === false}
                onChange={() => handleInputChange('isEnrolled', false)}
                className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 focus:ring-purple-500"
              />
              <span className="text-white">No</span>
            </label>
          </div>
        ) : (
          <div className={`inline-flex items-center px-3 py-2 rounded-lg ${
            universityStatus.isEnrolled 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-gray-500/20 text-gray-400'
          }`}>
            {universityStatus.isEnrolled ? '✓ Yes' : '✗ No'}
          </div>
        )}
      </div>

      {/* University Details - Only show if enrolled */}
      {(isEditing ? editedStatus.isEnrolled : universityStatus.isEnrolled) && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {/* Verification Status */}
          <div className={`p-4 rounded-lg border ${verificationInfo.color}`}>
            <div className="flex items-center space-x-3">
              {verificationInfo.icon}
              <div>
                <h3 className="font-medium">{verificationInfo.text}</h3>
                <p className="text-sm opacity-80">
                  {universityStatus.verificationStatus === 'verified' && 'Your university enrollment has been verified.'}
                  {universityStatus.verificationStatus === 'pending' && 'Your documents are being reviewed.'}
                  {universityStatus.verificationStatus === 'rejected' && 'Please resubmit your enrollment documents.'}
                  {universityStatus.verificationStatus === 'not_submitted' && 'Upload your enrollment certificate to verify your status.'}
                </p>
              </div>
            </div>
          </div>

          {/* University Information Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* University Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                University Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedStatus.universityName || ''}
                  onChange={(e) => handleInputChange('universityName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter university name"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
                  {universityStatus.universityName || 'Not specified'}
                </div>
              )}
            </div>

            {/* Student ID */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Student ID
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedStatus.studentId || ''}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter student ID"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
                  {universityStatus.studentId || 'Not specified'}
                </div>
              )}
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Field of Study
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedStatus.fieldOfStudy || ''}
                  onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Computer Science, Business Administration"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
                  {universityStatus.fieldOfStudy || 'Not specified'}
                </div>
              )}
            </div>

            {/* Enrollment Year */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enrollment Year
              </label>
              {isEditing ? (
                <select
                  value={editedStatus.enrollmentYear || ''}
                  onChange={(e) => handleInputChange('enrollmentYear', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              ) : (
                <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
                  {universityStatus.enrollmentYear || 'Not specified'}
                </div>
              )}
            </div>

            {/* Expected Graduation Year */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expected Graduation Year
              </label>
              {isEditing ? (
                <select
                  value={editedStatus.graduationYear || ''}
                  onChange={(e) => handleInputChange('graduationYear', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select year</option>
                  {years.concat([currentYear + 1, currentYear + 2, currentYear + 3, currentYear + 4, currentYear + 5]).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              ) : (
                <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
                  {universityStatus.graduationYear || 'Not specified'}
                </div>
              )}
            </div>
          </div>

          {/* Benefits Notice */}
          <motion.div
            className="p-4 bg-blue-500/20 border border-blue-500 rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h4 className="font-semibold text-blue-400 mb-2">🎓 Student Benefits</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>• Special student discounts on accommodations</div>
              <div>• Priority access to educational tours</div>
              <div>• Student-friendly restaurant recommendations</div>
              <div>• Reduced rates on public transportation</div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Save Changes Notice */}
      {isEditing && (
        <motion.div
          className="mt-6 p-4 bg-purple-500/20 border border-purple-500 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-purple-400">
            💡 Upload your enrollment certificate in the Documents section to verify your student status and unlock exclusive benefits.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UniversityStatusSection;
