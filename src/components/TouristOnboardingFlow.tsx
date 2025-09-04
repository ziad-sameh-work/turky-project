'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import RestaurantWelcomeScreen from './RestaurantWelcomeScreen';
import RestaurantPreferencesQuiz from './RestaurantPreferencesQuiz';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
import BadgeSystem from './BadgeSystem';
import LanguageSelection from './LanguageSelection';
import SignupLogin from './SignupLogin';
import { mockBadges, Restaurant, TouristPreferences } from '@/data/mockData';

type TouristStep = 
  | 'welcome' 
  | 'quiz' 
  | 'badge' 
  | 'language' 
  | 'signup' 
  | 'restaurants'
  | 'details';

interface TouristProfile {
  id: string;
  name: string;
  email: string;
  userType: 'tourist';
  language: string;
  preferences: TouristPreferences;
  badges: typeof mockBadges;
  points: number;
}

const TouristOnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TouristStep>('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [initialSearchData, setInitialSearchData] = useState<{
    cuisineType: string;
    location: string;
    priceRange: string;
  } | undefined>();
  const [userPreferences, setUserPreferences] = useState<Record<string, string[]>>({});
  const [badges, setBadges] = useState(mockBadges);
  const [touristProfile, setTouristProfile] = useState<TouristProfile>({
    id: 'tourist-1',
    name: 'Tourist',
    email: '',
    userType: 'tourist',
    language: 'en',
    preferences: {
      cuisinePreferences: [],
      budgetRange: '',
      diningStyle: [],
      dietaryRestrictions: [],
      location: ''
    },
    badges: mockBadges,
    points: 0
  });

  const handleWelcomeNext = (searchData: {
    cuisineType: string;
    location: string;
    priceRange: string;
  }) => {
    setInitialSearchData(searchData);
    setCurrentStep('quiz');
  };

  const handleQuizComplete = (answers: Record<string, string[]>) => {
    setUserPreferences(answers);
    
    // Update tourist preferences based on quiz answers
    const preferences: TouristPreferences = {
      cuisinePreferences: answers['1'] || [],
      budgetRange: answers['2']?.[0] || '',
      diningStyle: answers['4'] || [],
      dietaryRestrictions: [], // Can be extended
      location: answers['3']?.[0] || ''
    };
    
    setTouristProfile(prev => ({ ...prev, preferences }));
    
    // Award Food Explorer badge
    setBadges(prev => prev.map(badge => 
      badge.id === 'future-scholar' 
        ? { ...badge, name: 'Food Explorer', description: 'Completed restaurant preferences and started your culinary journey!', icon: '🍽️', earned: true }
        : badge
    ));
    
    setCurrentStep('badge');
  };

  const handleBadgeClose = () => {
    setCurrentStep('language');
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setTouristProfile(prev => ({ ...prev, language }));
  };

  const handleLanguageContinue = () => {
    setCurrentStep('signup');
  };

  const handleSignupComplete = (userData: { email: string; name: string; method: string }) => {
    setTouristProfile(prev => ({ 
      ...prev, 
      email: userData.email, 
      name: userData.name 
    }));
    setCurrentStep('restaurants');
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentStep('details');
  };

  const handleBookTable = () => {
    // Award points for booking
    setTouristProfile(prev => ({ ...prev, points: prev.points + 10 }));
    
    // Show success message or navigate back
    alert(`Table booked successfully at ${selectedRestaurant?.name}! You earned 10 points.`);
    setCurrentStep('restaurants');
  };

  const handleOrderDelivery = () => {
    // Award points for ordering
    setTouristProfile(prev => ({ ...prev, points: prev.points + (selectedRestaurant?.points || 20) }));
    
    // Show success message or navigate back
    alert(`Order placed successfully! You earned ${selectedRestaurant?.points || 20} points.`);
    setCurrentStep('restaurants');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'quiz':
        setCurrentStep('welcome');
        break;
      case 'language':
        setCurrentStep('quiz');
        break;
      case 'signup':
        setCurrentStep('language');
        break;
      case 'restaurants':
        setCurrentStep('signup');
        break;
      case 'details':
        setCurrentStep('restaurants');
        break;
      default:
        break;
    }
  };

  const foodExplorerBadge = badges.find(badge => badge.earned);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentStep === 'welcome' && (
          <RestaurantWelcomeScreen key="welcome" onNext={handleWelcomeNext} />
        )}
        
        {currentStep === 'quiz' && (
          <RestaurantPreferencesQuiz 
            key="quiz" 
            onComplete={handleQuizComplete} 
            onBack={handleBack}
            initialSearchData={initialSearchData}
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
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent block">
                    Language
                  </span>
                </h1>
                <p className="text-gray-300 text-lg max-w-md mx-auto">
                  Select your preferred language for the best dining experience
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
        
        {currentStep === 'restaurants' && (
          <RestaurantList 
            key="restaurants" 
            onRestaurantSelect={handleRestaurantSelect}
            onBack={handleBack}
            userPreferences={userPreferences}
            initialSearchData={initialSearchData}
          />
        )}
        
        {currentStep === 'details' && selectedRestaurant && (
          <RestaurantDetails 
            key="details" 
            restaurant={selectedRestaurant}
            onBack={() => setCurrentStep('restaurants')}
            onBookTable={handleBookTable}
            onOrderDelivery={handleOrderDelivery}
          />
        )}
      </AnimatePresence>
      
      {/* Badge Modal */}
      {currentStep === 'badge' && foodExplorerBadge && (
        <BadgeSystem 
          badge={foodExplorerBadge} 
          onClose={handleBadgeClose} 
        />
      )}
    </div>
  );
};

export default TouristOnboardingFlow;
