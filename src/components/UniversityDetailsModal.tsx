'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Star, Users, Calendar, DollarSign, Globe, Phone, Mail, ExternalLink, FileText, CheckCircle } from 'lucide-react';

interface University {
  name: string;
  nameEn: string;
  rank: number;
  score: number;
  city: string;
}

interface UniversityDetailsModalProps {
  university: University | null;
  isOpen: boolean;
  onClose: () => void;
}

const UniversityDetailsModal: React.FC<UniversityDetailsModalProps> = ({ university, isOpen, onClose }) => {
  if (!university) return null;

  const universityDetails = {
    'Boğaziçi University': {
      description: 'Boğaziçi University is a major research university located on the European side of Istanbul. It has a strong reputation for academic excellence and is consistently ranked as one of the top universities in Turkey.',
      founded: '1863',
      students: '16,000+',
      faculties: ['Engineering', 'Arts & Sciences', 'Economics & Administrative Sciences', 'Education'],
      tuitionRange: '$8,000 - $12,000',
      language: 'English',
      website: 'https://www.boun.edu.tr',
      phone: '+90 212 359 4000',
      email: 'info@boun.edu.tr',
      requiredDocuments: [
        'High School Diploma (Certified Translation)',
        'Official Transcripts',
        'English Proficiency Test (TOEFL/IELTS)',
        'Passport Copy',
        'Motivation Letter',
        'Letters of Recommendation (2)',
        'Portfolio (for Art/Design programs)',
        'Health Insurance Certificate',
        'Financial Statement',
        'Residence Permit Application'
      ],
      programs: ['Computer Engineering', 'Electrical Engineering', 'Business Administration', 'Psychology', 'International Relations'],
      facilities: ['Central Library', 'Research Centers', 'Sports Complex', 'Student Housing', 'Medical Center'],
      achievements: ['Top 500 in QS World Rankings', 'AACSB Accredited Business School', 'Strong Industry Partnerships']
    },
    'Middle East Technical University': {
      description: 'METU is a public technical university located in Ankara. Known for its strong engineering and natural sciences programs, it is one of the most prestigious universities in Turkey.',
      founded: '1956',
      students: '27,000+',
      faculties: ['Engineering', 'Architecture', 'Arts & Sciences', 'Economic & Administrative Sciences', 'Education'],
      tuitionRange: '$3,000 - $6,000',
      language: 'English',
      website: 'https://www.metu.edu.tr',
      phone: '+90 312 210 2000',
      email: 'info@metu.edu.tr',
      requiredDocuments: [
        'High School Diploma (Certified Translation)',
        'Official Transcripts',
        'English Proficiency Test (TOEFL/IELTS)',
        'Passport Copy',
        'Motivation Letter',
        'Letters of Recommendation (2)',
        'SAT/YÖS Exam Results',
        'Health Insurance Certificate',
        'Financial Statement',
        'Residence Permit Application'
      ],
      programs: ['Computer Engineering', 'Mechanical Engineering', 'Architecture', 'Physics', 'Economics'],
      facilities: ['Technopark', 'Central Library', 'Cultural Center', 'Sports Facilities', 'Research Labs'],
      achievements: ['Top 300 in QS World Rankings', 'Leading Research Output', 'Strong Alumni Network']
    },
    'Istanbul Technical University': {
      description: 'ITU is one of the world\'s oldest technical universities, with a strong focus on engineering, architecture, and applied sciences. Located in Istanbul, it has a rich history of innovation.',
      founded: '1773',
      students: '38,000+',
      faculties: ['Civil Engineering', 'Mechanical Engineering', 'Electrical & Electronics', 'Architecture', 'Chemical & Metallurgical'],
      tuitionRange: '$4,000 - $8,000',
      language: 'Turkish/English',
      website: 'https://www.itu.edu.tr',
      phone: '+90 212 285 3000',
      email: 'info@itu.edu.tr',
      requiredDocuments: [
        'High School Diploma (Certified Translation)',
        'Official Transcripts',
        'English Proficiency Test (TOEFL/IELTS)',
        'Passport Copy',
        'Motivation Letter',
        'Letters of Recommendation (2)',
        'YÖS Exam Results',
        'Health Insurance Certificate',
        'Financial Statement',
        'Residence Permit Application'
      ],
      programs: ['Civil Engineering', 'Architecture', 'Computer Engineering', 'Industrial Engineering', 'Naval Architecture'],
      facilities: ['Ayazağa Campus', 'Maçka Campus', 'Research Centers', 'Technopark', 'Libraries'],
      achievements: ['World\'s 3rd Oldest Technical University', 'Strong Engineering Programs', 'Historic Campus']
    },
    'Istanbul University': {
      description: 'Istanbul University is one of Turkey\'s oldest and largest universities. It offers a wide range of programs across multiple disciplines and has a significant impact on Turkish higher education.',
      founded: '1453',
      students: '60,000+',
      faculties: ['Medicine', 'Law', 'Literature', 'Economics', 'Engineering', 'Pharmacy'],
      tuitionRange: '$2,000 - $5,000',
      language: 'Turkish/English',
      website: 'https://www.istanbul.edu.tr',
      phone: '+90 212 440 0000',
      email: 'info@istanbul.edu.tr',
      requiredDocuments: [
        'High School Diploma (Certified Translation)',
        'Official Transcripts',
        'Turkish Proficiency Test (TÖMER)',
        'Passport Copy',
        'Motivation Letter',
        'Letters of Recommendation (2)',
        'YÖS Exam Results',
        'Health Insurance Certificate',
        'Financial Statement',
        'Residence Permit Application'
      ],
      programs: ['Medicine', 'Law', 'Business Administration', 'Literature', 'Pharmacy'],
      facilities: ['Multiple Campuses', 'University Hospital', 'Central Library', 'Museums', 'Research Centers'],
      achievements: ['Turkey\'s Oldest University', 'Comprehensive Program Offering', 'Strong Medical School']
    }
  };

  const details = universityDetails[university.name as keyof typeof universityDetails];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl ${
                    university.rank <= 3 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-600'
                  }`}>
                    {university.rank}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{university.name}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{university.city}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star size={16} />
                        <span>{university.score}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">About the University</h3>
                <p className="text-gray-300 leading-relaxed">{details?.description}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4 text-center">
                  <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">{details?.founded}</div>
                  <div className="text-gray-400 text-xs">Founded</div>
                </div>
                
                <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4 text-center">
                  <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">{details?.students}</div>
                  <div className="text-gray-400 text-xs">Students</div>
                </div>
                
                <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4 text-center">
                  <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">{details?.tuitionRange}</div>
                  <div className="text-gray-400 text-xs">Tuition</div>
                </div>
                
                <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4 text-center">
                  <Globe className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">{details?.language}</div>
                  <div className="text-gray-400 text-xs">Language</div>
                </div>
              </div>

              {/* Faculties */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Faculties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {details?.faculties.map((faculty, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{faculty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Programs */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Popular Programs</h3>
                <div className="flex flex-wrap gap-2">
                  {details?.programs.map((program, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                      {program}
                    </span>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Campus Facilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {details?.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Achievements</h3>
                <div className="space-y-2">
                  {details?.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-300">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span>Contact Information</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">{details?.website}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">{details?.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300 text-sm">{details?.email}</span>
                  </div>
                </div>
              </div>

              {/* Required Documents */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-orange-400" />
                  <span>Required Documents</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {details?.requiredDocuments?.map((document, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-800/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{document}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700/50">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ExternalLink size={18} />
                  <span>Apply Now</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(details?.website, '_blank')}
                  className="flex-1 bg-gray-800/50 border border-gray-700/50 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700/50 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Globe size={18} />
                  <span>Visit Website</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UniversityDetailsModal;
