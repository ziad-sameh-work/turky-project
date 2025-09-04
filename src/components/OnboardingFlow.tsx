'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './WelcomeScreen';
import UserTypeSelection from './UserTypeSelection';
import WelcomeQuiz from './WelcomeQuiz';
import BadgeSystem from './BadgeSystem';
import LanguageSelection from './LanguageSelection';
import SignupLogin from './SignupLogin';
import StudentDashboard from './StudentDashboard';
import ExplorationDashboard from './ExplorationDashboard';
import TouristOnboardingFlow from './TouristOnboardingFlow';
import { mockUserProfile, mockBadges } from '@/data/mockData';

type OnboardingStep = 
  | 'welcome' 
  | 'userType' 
  | 'quiz' 
  | 'badge' 
  | 'language' 
  | 'signup' 
  | 'dashboard'
  | 'exploration'
  | 'tourist';

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [userProfile, setUserProfile] = useState(mockUserProfile);
  const [badges, setBadges] = useState(mockBadges);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleWelcomeNext = () => {
    setCurrentStep('userType');
  };

  const handleUserTypeSelect = (userType: string) => {
    setUserProfile(prev => ({ ...prev, userType: userType as 'student' | 'tourist' | 'resident' }));
    
    // Route to tourist flow if tourist is selected
    if (userType === 'tourist') {
      setCurrentStep('tourist');
    } else {
      setCurrentStep('quiz');
    }
  };

  const handleQuizComplete = (answers: Record<string, string[]>) => {
    // Update user preferences based on quiz answers
    const preferences = {
      studyField: answers['1']?.[0] || '',
      budget: answers['2']?.[0] || '',
      preferredCity: answers['3']?.[0] || ''
    };
    
    setUserProfile(prev => ({ ...prev, preferences }));
    
    // Award Future Scholar badge
    setBadges(prev => prev.map(badge => 
      badge.id === 'future-scholar' 
        ? { ...badge, earned: true }
        : badge
    ));
    
    setCurrentStep('badge');
  };

  const handleBadgeClose = () => {
    console.log('handleBadgeClose called, changing step to language');
    setCurrentStep('language');
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setUserProfile(prev => ({ ...prev, language }));
  };

  const handleLanguageContinue = () => {
    setCurrentStep('signup');
  };

  const handleSignupComplete = (userData: { email: string; name: string; method: string }) => {
    setUserProfile(prev => ({ 
      ...prev, 
      email: userData.email, 
      name: userData.name 
    }));
    setCurrentStep('dashboard');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'userType':
        setCurrentStep('welcome');
        break;
      case 'quiz':
        setCurrentStep('userType');
        break;
      case 'language':
        setCurrentStep('quiz');
        break;
      case 'signup':
        setCurrentStep('language');
        break;
      default:
        break;
    }
  };

  const futureScholarBadge = badges.find(badge => badge.id === 'future-scholar' && badge.earned);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentStep === 'welcome' && (
          <WelcomeScreen key="welcome" onNext={handleWelcomeNext} />
        )}
        
        {currentStep === 'userType' && (
          <UserTypeSelection 
            key="userType" 
            onSelect={handleUserTypeSelect} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 'quiz' && (
          <WelcomeQuiz 
            key="quiz" 
            onComplete={handleQuizComplete} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 'language' && (
          <div key="language" className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
            <div className="relative z-10 pt-12 px-6">
              <button
                onClick={handleBack}
                className="mb-8 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
              >
                <span className="text-white text-xl">←</span>
              </button>
              
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-white mb-4">
                  Choose Your
                  <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent block">
                    Language
                  </span>
                </h1>
                <p className="text-gray-300 text-lg max-w-md mx-auto">
                  Select your preferred language for the best experience
                </p>
              </div>
              
              <div className="max-w-md mx-auto">
                <LanguageSelection
                  selectedLanguage={selectedLanguage}
                  onSelect={handleLanguageSelect}
                  onContinue={handleLanguageContinue}
                />
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 'signup' && (
          <SignupLogin 
            key="signup" 
            onComplete={handleSignupComplete} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 'dashboard' && (
          <StudentDashboard 
            key="dashboard" 
            userProfile={userProfile} 
            badges={badges}
            onExplore={() => setCurrentStep('exploration')}
          />
        )}
        
        {currentStep === 'exploration' && (
          <ExplorationDashboard 
            key="exploration" 
            userProfile={userProfile} 
            onBack={() => setCurrentStep('dashboard')}
          />
        )}
        
        {currentStep === 'tourist' && (
          <TouristOnboardingFlow key="tourist" />
        )}
      </AnimatePresence>
      
      {/* Badge Modal */}
      {currentStep === 'badge' && futureScholarBadge && (
        <BadgeSystem 
          badge={futureScholarBadge} 
          onClose={handleBadgeClose} 
        />
      )}
    </div>
  );
};

export default OnboardingFlow;
