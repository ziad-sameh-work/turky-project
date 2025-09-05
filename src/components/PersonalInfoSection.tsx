'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Replaced heroicons with simple text/emoji alternatives
import { PersonalInfo } from '../data/userProfileData';

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  onSave: (updatedInfo: PersonalInfo) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ 
  personalInfo, 
  onSave 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState<PersonalInfo>(personalInfo);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo(personalInfo);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedInfo(personalInfo);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave(editedInfo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving personal info:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setEditedInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditedInfo(prev => ({
          ...prev,
          profilePicture: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Personal Information</h2>
            <p className="text-sm text-gray-400">Manage your profile details</p>
          </div>
        </div>
        
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <span className="text-sm">✏️</span>
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <span className="text-sm">❌</span>
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white rounded-lg transition-colors"
            >
              <span className="text-sm">✅</span>
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Picture */}
      <div className="flex items-center space-x-6 mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            {(isEditing ? editedInfo.profilePicture : personalInfo.profilePicture) ? (
              <img
                src={isEditing ? editedInfo.profilePicture : personalInfo.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-gray-400">👤</span>
            )}
          </div>
          {isEditing && (
            <label className="absolute -bottom-2 -right-2 p-2 bg-blue-500 hover:bg-blue-600 rounded-full cursor-pointer transition-colors">
              <span className="text-sm">✏️</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">
            {isEditing ? editedInfo.fullName : personalInfo.fullName}
          </h3>
          <p className="text-gray-400">
            {isEditing ? editedInfo.email : personalInfo.email}
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedInfo.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
              {personalInfo.fullName}
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              value={editedInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
              {personalInfo.email}
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={editedInfo.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
              {personalInfo.phoneNumber}
            </div>
          )}
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nationality
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedInfo.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your nationality"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
              {personalInfo.nationality}
            </div>
          )}
        </div>

        {/* Preferred Language */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Preferred Language
          </label>
          {isEditing ? (
            <select
              value={editedInfo.preferredLanguage}
              onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </select>
          ) : (
            <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
              {personalInfo.preferredLanguage}
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date of Birth
          </label>
          {isEditing ? (
            <input
              type="date"
              value={editedInfo.dateOfBirth || ''}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
              {personalInfo.dateOfBirth ? 
                new Date(personalInfo.dateOfBirth).toLocaleDateString() : 
                'Not specified'
              }
            </div>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Gender
          </label>
          {isEditing ? (
            <select
              value={editedInfo.gender || ''}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          ) : (
            <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
              {personalInfo.gender || 'Not specified'}
            </div>
          )}
        </div>
      </div>

      {/* Save Changes Notice */}
      {isEditing && (
        <motion.div
          className="mt-6 p-4 bg-blue-500/20 border border-blue-500 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-blue-400">
            💡 Make sure all information is accurate before saving. This information will be used for verification purposes.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PersonalInfoSection;
