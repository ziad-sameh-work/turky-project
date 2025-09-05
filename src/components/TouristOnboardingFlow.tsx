'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RestaurantWelcomeScreen from './RestaurantWelcomeScreen';
import RestaurantPreferencesQuiz from './RestaurantPreferencesQuiz';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
import HotelWelcomeScreen from './HotelWelcomeScreen';
import TouristTransportationFlow from './TouristTransportationFlow';
import UserProfile from './UserProfile';
import BadgeSystem from './BadgeSystem';
import LanguageSelection from './LanguageSelection';
import SignupLogin from './SignupLogin';
import { mockBadges, Restaurant, TouristPreferences, touristNavItems } from '@/data/mockData';

type TouristStep = 
  | 'navigation'
  | 'restaurants-welcome' 
  | 'restaurants-quiz' 
  | 'restaurants-badge' 
  | 'restaurants-language' 
  | 'restaurants-signup' 
  | 'restaurants-list'
  | 'restaurants-details'
  | 'hotels'
  | 'transportation'
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
  const [initialSearchData, setInitialSearchData] = useState<{
    cuisineType: string;
    location: string;
    priceRange: string;
  } | undefined>();
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
        setCurrentStep('restaurants-welcome');
        break;
      case 'hotels':
        setCurrentStep('hotels');
        break;
      case 'transport':
        setCurrentStep('transportation');
        break;
      default:
        break;
    }
  };

  // Restaurant flow handlers
  const handleRestaurantWelcomeNext = (searchData: {
    cuisineType: string;
    location: string;
    priceRange: string;
  }) => {
    setInitialSearchData(searchData);
    setCurrentStep('restaurants-quiz');
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
    
    setCurrentStep('restaurants-badge');
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

  // Transportation handlers
  const handleTransportationComplete = () => {
    setCurrentStep('navigation');
  };

  const handleTransportationBack = () => {
    setCurrentStep('navigation');
  };

  // Back navigation
  const handleBack = () => {
    switch (currentStep) {
      case 'restaurants-quiz':
        setCurrentStep('restaurants-welcome');
        break;
      case 'restaurants-language':
        setCurrentStep('restaurants-quiz');
        break;
      case 'restaurants-signup':
        setCurrentStep('restaurants-language');
        break;
      case 'restaurants-list':
        setCurrentStep('restaurants-signup');
        break;
      case 'restaurants-details':
        setCurrentStep('restaurants-list');
        break;
      case 'hotels':
      case 'transportation':
        setCurrentStep('navigation');
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
              {/* Profile Button */}
              <div className="absolute top-8 right-8">
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {touristNavItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigationSelect(item.id)}
                      className={`p-8 rounded-2xl border-2 border-gray-700 bg-gradient-to-br from-blue-500 to-purple-600 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 group`}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                      <p className="text-gray-400">
                        {item.id === 'restaurants' && 'Discover amazing Turkish cuisine'}
                        {item.id === 'hotels' && 'Find the perfect place to stay'}
                        {item.id === 'transport' && 'Navigate Istanbul with ease'}
                        {item.id === 'attractions' && 'Explore historical sites'}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Restaurant Flow */}
        {currentStep === 'restaurants-welcome' && (
          <RestaurantWelcomeScreen key="restaurant-welcome" onNext={handleRestaurantWelcomeNext} />
        )}
        
        {currentStep === 'restaurants-quiz' && (
          <RestaurantPreferencesQuiz 
            key="restaurant-quiz" 
            onComplete={handleRestaurantQuizComplete} 
            onBack={handleBack}
            initialSearchData={initialSearchData}
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
            initialSearchData={initialSearchData}
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
          />
        )}

        {/* Transportation Flow */}
        {currentStep === 'transportation' && (
          <TouristTransportationFlow 
            key="transportation" 
            onComplete={handleTransportationComplete}
            onBack={handleTransportationBack}
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
