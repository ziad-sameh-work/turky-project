'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, DollarSign, Calendar, MapPin, Users, ExternalLink } from 'lucide-react';

interface Scholarship {
  id: string;
  name: string;
  nameEn: string;
  provider: string;
  amount: string;
  type: 'full' | 'partial';
  deadline: string;
  location: string;
  eligibility: string[];
  description: string;
  requirements: string[];
  applicationLink: string;
  color: string;
}

const ScholarshipSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'full' | 'partial'>('all');

  const scholarships: Scholarship[] = [
    {
      id: '1',
      name: 'منحة الحكومة التركية',
      nameEn: 'Türkiye Scholarships',
      provider: 'الحكومة التركية',
      amount: 'ممولة بالكامل',
      type: 'full',
      deadline: '2024-02-20',
      location: 'جميع المدن التركية',
      eligibility: ['جميع الجنسيات', 'معدل 70% فأكثر', 'إتقان اللغة الإنجليزية'],
      description: 'منحة شاملة تغطي الرسوم الدراسية والسكن والراتب الشهري والتأمين الصحي',
      requirements: ['شهادة الثانوية العامة', 'خطاب الدافع', 'خطابات التوصية', 'شهادة اللغة'],
      applicationLink: 'https://turkiyeburslari.gov.tr',
      color: 'from-red-500 to-red-700'
    },
    {
      id: '2',
      name: 'منحة جامعة إسطنبول التقنية',
      nameEn: 'ITU International Scholarships',
      provider: 'جامعة إسطنبول التقنية',
      amount: '50% من الرسوم',
      type: 'partial',
      deadline: '2024-03-15',
      location: 'إسطنبول',
      eligibility: ['الطلاب الدوليين', 'معدل 80% فأكثر', 'تخصصات الهندسة'],
      description: 'منحة جزئية للطلاب المتفوقين في التخصصات الهندسية',
      requirements: ['شهادة البكالوريوس', 'نتائج امتحان YÖS', 'محفظة أعمال'],
      applicationLink: 'https://itu.edu.tr',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: '3',
      name: 'منحة جامعة بوغازيتشي',
      nameEn: 'Boğaziçi University Scholarships',
      provider: 'جامعة بوغازيتشي',
      amount: 'ممولة بالكامل',
      type: 'full',
      deadline: '2024-01-30',
      location: 'إسطنبول',
      eligibility: ['الطلاب المتفوقين', 'معدل 85% فأكثر', 'إتقان اللغة الإنجليزية'],
      description: 'منحة كاملة للطلاب المتميزين أكاديمياً في جميع التخصصات',
      requirements: ['شهادة الثانوية', 'امتحان SAT أو YÖS', 'مقابلة شخصية'],
      applicationLink: 'https://bogazici.edu.tr',
      color: 'from-green-500 to-green-700'
    },
    {
      id: '4',
      name: 'منحة جامعة الشرق الأوسط التقنية',
      nameEn: 'METU Merit Scholarships',
      provider: 'جامعة الشرق الأوسط التقنية',
      amount: '25% من الرسوم',
      type: 'partial',
      deadline: '2024-04-01',
      location: 'أنقرة',
      eligibility: ['جميع الجنسيات', 'معدل 75% فأكثر', 'التخصصات العلمية'],
      description: 'منحة جزئية للطلاب في التخصصات العلمية والتقنية',
      requirements: ['شهادة الثانوية', 'نتائج YÖS', 'خطاب الدافع'],
      applicationLink: 'https://metu.edu.tr',
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: '5',
      name: 'منحة مؤسسة التعليم العالي',
      nameEn: 'YÖK International Scholarships',
      provider: 'مجلس التعليم العالي التركي',
      amount: 'ممولة بالكامل',
      type: 'full',
      deadline: '2024-03-01',
      location: 'جميع المدن',
      eligibility: ['الطلاب الدوليين', 'معدل 80% فأكثر', 'البحث العلمي'],
      description: 'منحة للطلاب الراغبين في الدراسات العليا والبحث العلمي',
      requirements: ['شهادة البكالوريوس', 'خطة البحث', 'خطابات التوصية'],
      applicationLink: 'https://yok.gov.tr',
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: '6',
      name: 'منحة جامعة صباح الدين زعيم',
      nameEn: 'SZU Excellence Scholarships',
      provider: 'جامعة صباح الدين زعيم',
      amount: '75% من الرسوم',
      type: 'partial',
      deadline: '2024-02-28',
      location: 'إسطنبول',
      eligibility: ['الطلاب المتفوقين', 'معدل 78% فأكثر', 'الأنشطة اللامنهجية'],
      description: 'منحة للطلاب المتميزين أكاديمياً واجتماعياً',
      requirements: ['شهادة الثانوية', 'شهادات الأنشطة', 'مقابلة شخصية'],
      applicationLink: 'https://izu.edu.tr',
      color: 'from-teal-500 to-teal-700'
    }
  ];

  const filteredScholarships = scholarships.filter(scholarship => 
    filter === 'all' || scholarship.type === filter
  );

  const fullScholarships = scholarships.filter(s => s.type === 'full');
  const partialScholarships = scholarships.filter(s => s.type === 'partial');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
            <Award className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">المنح الدراسية</h2>
            <p className="text-gray-400">اكتشف فرص التمويل المتاحة</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2 bg-gray-800/50 rounded-xl p-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all' 
                ? 'bg-yellow-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            الكل
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('full')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'full' 
                ? 'bg-green-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ممولة كاملاً
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('partial')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'partial' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ممولة جزئياً
          </motion.button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-2xl p-4"
        >
          <div className="flex items-center space-x-3">
            <Award className="text-green-400" size={24} />
            <div>
              <h3 className="text-2xl font-bold text-white">{fullScholarships.length}</h3>
              <p className="text-green-400 text-sm">منح ممولة بالكامل</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-2xl p-4"
        >
          <div className="flex items-center space-x-3">
            <DollarSign className="text-blue-400" size={24} />
            <div>
              <h3 className="text-2xl font-bold text-white">{partialScholarships.length}</h3>
              <p className="text-blue-400 text-sm">منح ممولة جزئياً</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-4"
        >
          <div className="flex items-center space-x-3">
            <Users className="text-purple-400" size={24} />
            <div>
              <h3 className="text-2xl font-bold text-white">{scholarships.length}</h3>
              <p className="text-purple-400 text-sm">إجمالي المنح</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredScholarships.map((scholarship, index) => (
          <motion.div
            key={scholarship.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${scholarship.color} rounded-xl flex items-center justify-center`}>
                  <Award className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{scholarship.name}</h3>
                  <p className="text-gray-400 text-sm">{scholarship.nameEn}</p>
                </div>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                scholarship.type === 'full' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {scholarship.amount}
              </span>
            </div>

            {/* Provider & Location */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="text-gray-400" size={16} />
                <span className="text-gray-300 text-sm">{scholarship.provider}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="text-gray-400" size={16} />
                <span className="text-gray-300 text-sm">{scholarship.location}</span>
              </div>
            </div>

            {/* Deadline */}
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="text-red-400" size={16} />
              <span className="text-red-400 text-sm font-medium">
                آخر موعد: {new Date(scholarship.deadline).toLocaleDateString('ar-EG')}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {scholarship.description}
            </p>

            {/* Eligibility */}
            <div className="mb-4">
              <h4 className="text-white font-medium text-sm mb-2">شروط الأهلية:</h4>
              <div className="flex flex-wrap gap-2">
                {scholarship.eligibility.map((item, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-lg">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <h4 className="text-white font-medium text-sm mb-2">المتطلبات:</h4>
              <ul className="space-y-1">
                {scholarship.requirements.slice(0, 3).map((req, idx) => (
                  <li key={idx} className="text-gray-400 text-xs flex items-center space-x-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Button */}
            <motion.a
              href={scholarship.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r ${scholarship.color} rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300`}
            >
              <span>تقدم الآن</span>
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipSection;
