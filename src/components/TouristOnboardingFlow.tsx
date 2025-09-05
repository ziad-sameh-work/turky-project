'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RestaurantPreferencesQuiz from './RestaurantPreferencesQuiz';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
import HotelWelcomeScreen from './HotelWelcomeScreen';
import TransportationPage from './TransportationPage';
import TravelTipsPage from './TravelTipsPage';
import AttractionsPage from './AttractionsPage';
import UserProfile from './UserProfile';
import BadgeSystem from './BadgeSystem';
import LanguageSelection from './LanguageSelection';
import SignupLogin from './SignupLogin';
import { mockBadges, Restaurant, TouristPreferences, touristNavItems } from '@/data/mockData';

type TouristStep = 
  | 'navigation'
  | 'restaurants-quiz' 
  | 'restaurants-badge' 
  | 'restaurants-language' 
  | 'restaurants-signup' 
  | 'restaurants-list'
  | 'restaurants-details'
  | 'hotels'
  | 'transportation'
  | 'travel-tips'
  | 'attractions'
  | 'profile';

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
  const [currentStep, setCurrentStep] = useState<TouristStep>('navigation');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [userPreferences, setUserPreferences] = useState<Record<string, string[]>>({});
  const [badges, setBadges] = useState(mockBadges);
  const [, setTouristProfile] = useState<TouristProfile>({
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

  // Navigation handlers
  const handleNavigationSelect = (option: string) => {
    switch (option) {
      case 'restaurants':
        // Set default preferences and go directly to restaurant list
        const defaultPreferences: TouristPreferences = {
          cuisinePreferences: ['Turkish'],
          budgetRange: 'midrange',
          diningStyle: [],
          dietaryRestrictions: [],
          location: 'sultanahmet'
        };
        
        setTouristProfile(prev => ({ ...prev, preferences: defaultPreferences }));
        setUserPreferences({
          '1': ['Turkish'],
          '2': ['midrange'],
          '3': ['sultanahmet']
        });
        setCurrentStep('restaurants-list');
        break;
      case 'hotels':
        setCurrentStep('hotels');
        break;
      case 'transportation':
        setCurrentStep('transportation');
        break;
      case 'travel-tips':
        setCurrentStep('travel-tips');
        break;
      case 'attractions':
        setCurrentStep('attractions');
        break;
      default:
        break;
    }
  };


  const handleRestaurantQuizComplete = (answers: Record<string, string[]>) => {
    setUserPreferences(answers);
    
    const preferences: TouristPreferences = {
      cuisinePreferences: answers['1'] || [],
      budgetRange: answers['2']?.[0] || '',
      diningStyle: answers['4'] || [],
      dietaryRestrictions: [],
      location: answers['3']?.[0] || ''
    };
    
    setTouristProfile(prev => ({ ...prev, preferences }));
    
    setBadges(prev => prev.map(badge => 
      badge.id === 'future-scholar' 
        ? { ...badge, name: 'Food Explorer', description: 'Completed restaurant preferences and started your culinary journey!', icon: '🍽️', earned: true }
        : badge
    ));
    
    // Skip to restaurant list directly after quiz completion
    setCurrentStep('restaurants-list');
  };

  const handleRestaurantBadgeClose = () => {
    setCurrentStep('restaurants-language');
  };

  const handleRestaurantLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setTouristProfile(prev => ({ ...prev, language }));
  };

  const handleRestaurantLanguageContinue = () => {
    setCurrentStep('restaurants-signup');
  };

  const handleRestaurantSignupComplete = (userData: { email: string; name: string; method: string }) => {
    setTouristProfile(prev => ({ 
      ...prev, 
      email: userData.email, 
      name: userData.name 
    }));
    setCurrentStep('restaurants-list');
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentStep('restaurants-details');
  };

  const handleBookTable = () => {
    setTouristProfile(prev => ({ ...prev, points: prev.points + 10 }));
    alert(`Table booked successfully at ${selectedRestaurant?.name}! You earned 10 points.`);
    setCurrentStep('restaurants-list');
  };

  const handleOrderDelivery = () => {
    setTouristProfile(prev => ({ ...prev, points: prev.points + (selectedRestaurant?.points || 20) }));
    alert(`Order placed successfully! You earned ${selectedRestaurant?.points || 20} points.`);
    setCurrentStep('restaurants-list');
  };

  // Hotel handlers
  const handleHotelSearch = () => {
    alert('Hotel search functionality coming soon!');
    setCurrentStep('navigation');
  };


  // Back navigation
  const handleBack = () => {
    switch (currentStep) {
      case 'restaurants-quiz':
        setCurrentStep('navigation');
        break;
      case 'restaurants-language':
        setCurrentStep('restaurants-quiz');
        break;
      case 'restaurants-signup':
        setCurrentStep('restaurants-language');
        break;
      case 'restaurants-list':
        setCurrentStep('navigation');
        break;
      case 'restaurants-details':
        setCurrentStep('restaurants-list');
        break;
      default:
        setCurrentStep('navigation');
        break;
    }
  };

  const foodExplorerBadge = badges.find(badge => badge.earned);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {/* Navigation Menu */}
        {currentStep === 'navigation' && (
          <motion.div
            key="navigation"
            className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative z-10 flex flex-col min-h-screen px-8 pt-16">
              {/* Header with Back and Profile Buttons */}
              <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    // Navigate back to user type selection in OnboardingFlow
                    window.location.href = '/';
                  }}
                  className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg"
                  title="Back"
                >
                  <span className="text-white text-xl">←</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentStep('profile')}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg"
                  title="Profile"
                >
                  <span className="text-white text-xl">👤</span>
                </motion.button>
              </div>
              
              <div className="max-w-4xl mx-auto w-full text-center">
                <motion.h1 
                  className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-green-500 bg-clip-text text-transparent"
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  🇹🇷 Explore Turkey
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-300 mb-12"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Choose your adventure and discover the best of Turkey
                </motion.p>
                
                <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
                  {touristNavItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigationSelect(item.id)}
                      className={`p-6 rounded-2xl border-2 border-gray-700 bg-gradient-to-br from-blue-500 to-purple-600 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 group w-full`}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                          <p className="text-gray-400 text-sm">
                            {item.id === 'restaurants' && 'Discover amazing Turkish cuisine'}
                            {item.id === 'hotels' && 'Find the perfect place to stay'}
                            {item.id === 'transportation' && 'Navigate Istanbul with ease'}
                            {item.id === 'attractions' && 'Explore historical sites'}
                            {item.id === 'travel-tips' && 'Complete guide for your journey'}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        
        {currentStep === 'restaurants-quiz' && (
          <RestaurantPreferencesQuiz 
            key="restaurant-quiz" 
            onComplete={handleRestaurantQuizComplete} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 'restaurants-language' && (
          <div key="restaurant-language" className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
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
                  onSelect={handleRestaurantLanguageSelect}
                  onContinue={handleRestaurantLanguageContinue}
                />
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 'restaurants-signup' && (
          <SignupLogin 
            key="restaurant-signup" 
            onComplete={handleRestaurantSignupComplete} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 'restaurants-list' && (
          <RestaurantList 
            key="restaurant-list" 
            onRestaurantSelect={handleRestaurantSelect}
            onBack={handleBack}
            userPreferences={userPreferences}
          />
        )}
        
        {currentStep === 'restaurants-details' && selectedRestaurant && (
          <RestaurantDetails 
            key="restaurant-details" 
            restaurant={selectedRestaurant}
            onBack={() => setCurrentStep('restaurants-list')}
            onBookTable={handleBookTable}
            onOrderDelivery={handleOrderDelivery}
          />
        )}

        {/* Hotel Flow */}
        {currentStep === 'hotels' && (
          <HotelWelcomeScreen 
            key="hotels" 
            onNext={handleHotelSearch}
            onBack={() => setCurrentStep('navigation')}
          />
        )}

        {/* Transportation Flow */}
        {currentStep === 'transportation' && (
          <TransportationPage 
            key="transportation" 
            onBack={() => setCurrentStep('navigation')}
          />
        )}

        {/* Travel Tips Flow */}
        {currentStep === 'travel-tips' && (
          <TravelTipsPage 
            key="travel-tips" 
            onBack={() => setCurrentStep('navigation')}
          />
        )}

        {/* Attractions Flow */}
        {currentStep === 'attractions' && (
          <AttractionsPage 
            key="attractions" 
            onBack={() => setCurrentStep('navigation')}
          />
        )}

        {/* Profile Flow */}
        {currentStep === 'profile' && (
          <UserProfile 
            key="profile" 
            onBack={() => setCurrentStep('navigation')}
            userType="tourist"
          />
        )}
      </AnimatePresence>
      
      {/* Badge Modal */}
      {currentStep === 'restaurants-badge' && foodExplorerBadge && (
        <BadgeSystem 
          badge={foodExplorerBadge} 
          onClose={handleRestaurantBadgeClose} 
        />
      )}
    </div>
  );
};

export default TouristOnboardingFlow;
