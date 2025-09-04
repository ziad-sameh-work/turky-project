'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingBottomNav } from './FloatingBottomNav';

interface Document {
  id: string;
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
  deadline?: Date;
  category: 'academic' | 'personal' | 'financial' | 'visa';
  tips?: string[];
}

interface University {
  id: string;
  name: string;
  documents: Document[];
}

interface DocumentChecklistProps {
  onBack: () => void;
}

const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ onBack }) => {
  const [selectedUniversity, setSelectedUniversity] = useState<string>('metu');
  const [documents, setDocuments] = useState<{ [key: string]: Document[] }>({
    metu: [
      {
        id: '1',
        title: 'YÖS Exam Result',
        description: 'Official YÖS exam score report',
        required: true,
        completed: false,
        deadline: new Date('2025-07-15'),
        category: 'academic',
        tips: ['Score must be above 65 for engineering programs', 'Original document required']
      },
      {
        id: '2',
        title: 'High School Diploma',
        description: 'Certified copy of high school graduation certificate',
        required: true,
        completed: true,
        category: 'academic',
        tips: ['Must be translated to Turkish', 'Apostille required for international students']
      },
      {
        id: '3',
        title: 'High School Transcript',
        description: 'Official transcript showing all grades',
        required: true,
        completed: false,
        category: 'academic',
        tips: ['GPA calculation required', 'All subjects must be listed']
      },
      {
        id: '4',
        title: 'Passport Copy',
        description: 'Clear copy of passport information page',
        required: true,
        completed: true,
        category: 'personal',
        tips: ['Passport must be valid for at least 1 year', 'Color copy preferred']
      },
      {
        id: '5',
        title: 'Passport Photos',
        description: '4 recent passport-size photographs',
        required: true,
        completed: false,
        category: 'personal',
        tips: ['White background', 'Taken within last 6 months']
      },
      {
        id: '6',
        title: 'Financial Statement',
        description: 'Bank statement showing sufficient funds',
        required: true,
        completed: false,
        deadline: new Date('2025-06-30'),
        category: 'financial',
        tips: ['Minimum $8,000 USD equivalent', 'Statement must be recent (within 30 days)']
      },
      {
        id: '7',
        title: 'Health Insurance',
        description: 'Valid health insurance certificate',
        required: true,
        completed: false,
        category: 'personal',
        tips: ['Must cover Turkey', 'Minimum coverage requirements apply']
      },
      {
        id: '8',
        title: 'Student Visa',
        description: 'Turkish student visa',
        required: true,
        completed: false,
        deadline: new Date('2025-08-15'),
        category: 'visa',
        tips: ['Apply after acceptance letter', 'Processing takes 2-4 weeks']
      },
      {
        id: '9',
        title: 'Language Certificate',
        description: 'Turkish or English proficiency certificate',
        required: false,
        completed: false,
        category: 'academic',
        tips: ['TÖMER certificate for Turkish', 'IELTS/TOEFL for English programs']
      },
      {
        id: '10',
        title: 'Motivation Letter',
        description: 'Personal statement explaining study goals',
        required: false,
        completed: false,
        category: 'academic',
        tips: ['Max 500 words', 'Explain why you chose METU and your program']
      }
    ],
    bogazici: [
      {
        id: '1',
        title: 'YÖS Exam Result',
        description: 'Official YÖS exam score report',
        required: true,
        completed: false,
        deadline: new Date('2025-07-20'),
        category: 'academic',
        tips: ['Minimum score varies by program', 'Engineering requires 70+']
      },
      {
        id: '2',
        title: 'English Proficiency',
        description: 'TOEFL/IELTS or Boğaziçi English exam',
        required: true,
        completed: false,
        category: 'academic',
        tips: ['TOEFL iBT: 87+', 'IELTS: 6.5+', 'Or pass Boğaziçi English exam']
      },
      {
        id: '3',
        title: 'High School Diploma',
        description: 'Certified high school graduation certificate',
        required: true,
        completed: false,
        category: 'academic'
      },
      {
        id: '4',
        title: 'Academic Transcript',
        description: 'Official high school transcript',
        required: true,
        completed: false,
        category: 'academic'
      },
      {
        id: '5',
        title: 'Recommendation Letters',
        description: '2 academic recommendation letters',
        required: false,
        completed: false,
        category: 'academic',
        tips: ['From teachers or counselors', 'Should highlight academic potential']
      }
    ]
  });

  const universities = [
    { id: 'metu', name: 'METU (Middle East Technical University)' },
    { id: 'bogazici', name: 'Boğaziçi University' },
    { id: 'itu', name: 'Istanbul Technical University' },
    { id: 'bilkent', name: 'Bilkent University' }
  ];

  const currentDocuments = documents[selectedUniversity] || [];
  const completedCount = currentDocuments.filter(doc => doc.completed).length;
  const requiredCount = currentDocuments.filter(doc => doc.required).length;
  const completionPercentage = currentDocuments.length > 0 ? (completedCount / currentDocuments.length) * 100 : 0;

  const toggleDocument = (docId: string) => {
    setDocuments(prev => ({
      ...prev,
      [selectedUniversity]: prev[selectedUniversity].map(doc =>
        doc.id === docId ? { ...doc, completed: !doc.completed } : doc
      )
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return '📚';
      case 'personal': return '👤';
      case 'financial': return '💰';
      case 'visa': return '📄';
      default: return '📋';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'from-blue-500/20 to-blue-700/20 border-blue-500/30 text-blue-400';
      case 'personal': return 'from-green-500/20 to-green-700/20 border-green-500/30 text-green-400';
      case 'financial': return 'from-yellow-500/20 to-yellow-700/20 border-yellow-500/30 text-yellow-400';
      case 'visa': return 'from-purple-500/20 to-purple-700/20 border-purple-500/30 text-purple-400';
      default: return 'from-gray-500/20 to-gray-700/20 border-gray-500/30 text-gray-400';
    }
  };

  const isOverdue = (deadline?: Date) => {
    if (!deadline) return false;
    return new Date() > deadline;
  };

  const formatDeadline = (deadline?: Date) => {
    if (!deadline) return null;
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays <= 7) return `Due in ${diffDays} days`;
    return deadline.toLocaleDateString();
  };

  const generatePDF = () => {
    const universityName = universities.find(u => u.id === selectedUniversity)?.name || 'University';
    const docs = currentDocuments;
    
    // Create PDF content as text (in a real app, you'd use a PDF library)
    const pdfContent = `
DOCUMENT CHECKLIST - ${universityName.toUpperCase()}
Generated on: ${new Date().toLocaleDateString()}

PROGRESS SUMMARY:
- Total Documents: ${docs.length}
- Completed: ${completedCount}
- Required Documents: ${requiredCount}
- Completion: ${Math.round(completionPercentage)}%

DOCUMENT LIST:
${docs.map((doc, index) => `
${index + 1}. ${doc.title} ${doc.required ? '(REQUIRED)' : '(OPTIONAL)'}
   Status: ${doc.completed ? '✓ COMPLETED' : '○ PENDING'}
   Category: ${doc.category.toUpperCase()}
   ${doc.deadline ? `Deadline: ${doc.deadline.toLocaleDateString()}` : ''}
   Description: ${doc.description}
   ${doc.tips ? `Tips: ${doc.tips.join('; ')}` : ''}
`).join('\n')}

NEXT STEPS:
1. Complete all required documents first
2. Check deadlines and prioritize urgent items
3. Prepare documents in advance
4. Keep copies of all submitted documents

For questions, contact the university admissions office.
    `.trim();

    // Create and download the "PDF" (as text file for demo)
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${universityName.replace(/\s+/g, '_')}_Document_Checklist.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show success message
    alert('📄 Document checklist downloaded successfully!\nSaved to your device for offline viewing.');
  };

  const groupedDocuments = currentDocuments.reduce((groups, doc) => {
    if (!groups[doc.category]) {
      groups[doc.category] = [];
    }
    groups[doc.category].push(doc);
    return groups;
  }, {} as { [key: string]: Document[] });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" 
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 pt-12 pb-4 px-6"
      >
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-1">Document Checklist</h1>
            <p className="text-sm text-gray-400">Track your application progress</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generatePDF}
            className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* University Selector */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-6 mb-6"
      >
        <select
          value={selectedUniversity}
          onChange={(e) => setSelectedUniversity(e.target.value)}
          className="w-full p-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
        >
          {universities.map(uni => (
            <option key={uni.id} value={uni.id}>{uni.name}</option>
          ))}
        </select>
      </motion.div>

      {/* Progress Summary */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-6 mb-6"
      >
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Progress Overview</h2>
            <div className="text-2xl font-bold text-indigo-400">{Math.round(completionPercentage)}%</div>
          </div>
          
          <div className="w-full bg-gray-700/50 rounded-full h-3 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-white">{completedCount}</div>
              <div className="text-gray-400 text-sm">Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-yellow-400">{currentDocuments.length - completedCount}</div>
              <div className="text-gray-400 text-sm">Remaining</div>
            </div>
            <div>
              <div className="text-xl font-bold text-red-400">{requiredCount - currentDocuments.filter(d => d.required && d.completed).length}</div>
              <div className="text-gray-400 text-sm">Required Left</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Document Categories */}
      <div className="relative z-10 px-6 pb-32 space-y-6">
        {Object.entries(groupedDocuments).map(([category, docs], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 bg-gradient-to-r ${getCategoryColor(category)} rounded-xl`}>
                <span className="text-2xl">{getCategoryIcon(category)}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white capitalize">{category} Documents</h3>
                <p className="text-gray-400 text-sm">{docs.filter(d => d.completed).length} of {docs.length} completed</p>
              </div>
            </div>

            <div className="space-y-3">
              {docs.map((doc, docIndex) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (categoryIndex * 0.1) + (docIndex * 0.05) }}
                  className={`p-4 rounded-xl border transition-all ${
                    doc.completed 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : doc.deadline && isOverdue(doc.deadline)
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-gray-700/30 border-gray-600/30'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleDocument(doc.id)}
                      className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        doc.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-500 hover:border-indigo-400'
                      }`}
                    >
                      {doc.completed && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </motion.button>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${doc.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                          {doc.title}
                          {doc.required && <span className="text-red-400 ml-2">*</span>}
                        </h4>
                        {doc.deadline && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isOverdue(doc.deadline) 
                              ? 'bg-red-500/20 text-red-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {formatDeadline(doc.deadline)}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-2">{doc.description}</p>
                      
                      {doc.tips && doc.tips.length > 0 && (
                        <div className="mt-2">
                          <details className="text-sm">
                            <summary className="text-indigo-400 cursor-pointer hover:text-indigo-300">
                              Tips & Requirements
                            </summary>
                            <ul className="mt-2 space-y-1 text-gray-400 ml-4">
                              {doc.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start space-x-2">
                                  <span className="text-indigo-400 mt-1">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Floating Bottom Navigation */}
      <FloatingBottomNav
        activeTab="search"
        onTabChange={(tabId) => {
          if (tabId === 'home') {
            onBack();
          }
        }}
        variant="dashboard"
      />
    </div>
  );
};

export default DocumentChecklist;
