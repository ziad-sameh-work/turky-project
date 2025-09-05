// Mock data for the Turkish study app

export interface University {
  id: string;
  name: string;
  city: string;
  image: string;
  rating: number;
  programs: string[];
  tuitionRange: string;
  description: string;
  localRank?: number;
  worldRank?: number;
  studentCount?: string;
  internationalStudents?: string;
  acceptanceRate?: string;
  campusSize?: string;
  establishedYear?: number;
  admissionSteps?: AdmissionStep[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  type: 'single' | 'multiple';
}

export interface QuizOption {
  id: string;
  text: string;
  icon: string;
  value: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  userType: 'student' | 'tourist' | 'resident';
  language: string;
  badges: Badge[];
  preferences: {
    studyField: string;
    budget: string;
    preferredCity: string;
  };
}

// Mock Universities Data
export const mockUniversities: University[] = [
  {
    id: '1',
    name: 'Istanbul Technical University',
    city: 'Istanbul',
    image: '/images/itu.jpg',
    rating: 4.8,
    programs: ['Engineering', 'Computer Science', 'Architecture'],
    tuitionRange: '$8,000 - $12,000',
    description: 'Leading technical university in Turkey with world-class engineering programs.'
  },
  {
    id: '2',
    name: 'Boğaziçi University',
    city: 'Istanbul',
    image: '/images/bogazici.jpg',
    rating: 4.9,
    programs: ['Business', 'Economics', 'International Relations'],
    tuitionRange: '$10,000 - $15,000',
    description: 'Premier university known for its beautiful Bosphorus campus and academic excellence.'
  },
  {
    id: '3',
    name: 'Middle East Technical University',
    city: 'Ankara',
    image: '/images/metu.jpg',
    rating: 4.7,
    programs: ['Engineering', 'Natural Sciences', 'Social Sciences'],
    tuitionRange: '$6,000 - $10,000',
    description: 'Top-ranked university with strong research programs and international recognition.'
  },
  {
    id: '4',
    name: 'Sabancı University',
    city: 'Istanbul',
    image: '/images/sabanci.jpg',
    rating: 4.6,
    programs: ['Engineering', 'Management', 'Arts'],
    tuitionRange: '$15,000 - $20,000',
    description: 'Modern private university with innovative interdisciplinary programs.'
  },
  {
    id: '5',
    name: 'Koç University',
    city: 'Istanbul',
    image: '/images/koc.jpg',
    rating: 4.5,
    programs: ['Medicine', 'Law', 'Business'],
    tuitionRange: '$18,000 - $25,000',
    description: 'Elite private university with world-class facilities and faculty.'
  }
];

// Mock Quiz Questions
export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: "What's your study field?",
    type: 'single',
    options: [
      { id: '1a', text: 'Engineering', icon: '⚙️', value: 'engineering' },
      { id: '1b', text: 'Business', icon: '💼', value: 'business' },
      { id: '1c', text: 'Medicine', icon: '🏥', value: 'medicine' },
      { id: '1d', text: 'Arts & Design', icon: '🎨', value: 'arts' },
      { id: '1e', text: 'Computer Science', icon: '💻', value: 'computer-science' },
      { id: '1f', text: 'Social Sciences', icon: '👥', value: 'social-sciences' }
    ]
  },
  {
    id: '2',
    question: "What's your budget range?",
    type: 'single',
    options: [
      { id: '2a', text: 'Under $5,000', icon: '💰', value: 'low' },
      { id: '2b', text: '$5,000 - $10,000', icon: '💵', value: 'medium' },
      { id: '2c', text: '$10,000 - $20,000', icon: '💸', value: 'high' },
      { id: '2d', text: 'Above $20,000', icon: '💎', value: 'premium' }
    ]
  },
  {
    id: '3',
    question: "Which city do you prefer?",
    type: 'single',
    options: [
      { id: '3a', text: 'Istanbul', icon: '🌉', value: 'istanbul' },
      { id: '3b', text: 'Ankara', icon: '🏛️', value: 'ankara' },
      { id: '3c', text: 'Izmir', icon: '🌊', value: 'izmir' },
      { id: '3d', text: 'Antalya', icon: '🏖️', value: 'antalya' },
      { id: '3e', text: 'No preference', icon: '🌍', value: 'any' }
    ]
  },
  {
    id: '4',
    question: "What matters most to you?",
    type: 'multiple',
    options: [
      { id: '4a', text: 'Academic reputation', icon: '🏆', value: 'reputation' },
      { id: '4b', text: 'Campus life', icon: '🎓', value: 'campus-life' },
      { id: '4c', text: 'International programs', icon: '🌐', value: 'international' },
      { id: '4d', text: 'Job opportunities', icon: '💼', value: 'career' },
      { id: '4e', text: 'Research facilities', icon: '🔬', value: 'research' }
    ]
  }
];

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: 'future-scholar',
    name: 'Future Scholar',
    description: 'Completed the welcome quiz and started your journey!',
    icon: '🎓',
    color: 'from-red-500 to-red-700',
    earned: false
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Viewed 10 different universities',
    icon: '🗺️',
    color: 'from-blue-500 to-blue-700',
    earned: false
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Connected with other students',
    icon: '🦋',
    color: 'from-purple-500 to-purple-700',
    earned: false
  }
];

// Mock User Profile
export const mockUserProfile: UserProfile = {
  id: 'user-1',
  name: 'Ahmad',
  email: 'ahmad@example.com',
  userType: 'student',
  language: 'Arabic',
  badges: mockBadges,
  preferences: {
    studyField: '',
    budget: '',
    preferredCity: ''
  }
};

// Language options
export const languageOptions = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

// User types
export const userTypes = [
  {
    id: 'student',
    name: 'Student',
    description: 'Looking to study in Turkey',
    icon: '🎓',
    gradient: 'from-red-500 to-red-700'
  },
  {
    id: 'tourist',
    name: 'Tourist',
    description: 'Exploring Turkey for travel',
    icon: '🧳',
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    id: 'resident',
    name: 'Resident',
    description: 'Living in Turkey',
    icon: '🏠',
    gradient: 'from-green-500 to-green-700'
  }
];

// Phase 2 Data Structures

export interface Scholarship {
  id: string;
  name: string;
  university: string;
  amount: string;
  deadline: string;
  requirements: string[];
  description: string;
  type: 'merit' | 'need' | 'international' | 'field-specific';
  applicationUrl: string;
}

export interface AdmissionStep {
  id: string;
  title: string;
  description: string;
  documents: string[];
  deadline?: string;
  completed: boolean;
  expandable: boolean;
}

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface VirtualTourStop {
  id: string;
  name: string;
  description: string;
  image: string;
  facts: string[];
  coordinates: { x: number; y: number };
}

// Extended University Data
export const extendedUniversities: (University & {
  worldRank: number;
  localRank: number;
  acceptanceRate: string;
  studentCount: string;
  internationalStudents: string;
  campusSize: string;
  establishedYear: number;
  admissionSteps: AdmissionStep[];
  virtualTour: VirtualTourStop[];
})[] = [
  {
    ...mockUniversities[0],
    worldRank: 401,
    localRank: 1,
    acceptanceRate: '15%',
    studentCount: '35,000',
    internationalStudents: '3,500',
    campusSize: '1,600 acres',
    establishedYear: 1773,
    admissionSteps: [
      {
        id: 'step1',
        title: 'Prepare Documents',
        description: 'Gather all required academic documents',
        documents: ['High School Diploma', 'Transcripts', 'English Proficiency (TOEFL/IELTS)', 'Passport Copy'],
        completed: false,
        expandable: true
      },
      {
        id: 'step2',
        title: 'YÖS Exam',
        description: 'Take the Higher Education Foreign Student Examination',
        documents: ['YÖS Registration', 'Exam Fee Payment', 'Test Center Selection'],
        deadline: 'March 15, 2024',
        completed: false,
        expandable: true
      },
      {
        id: 'step3',
        title: 'Online Application',
        description: 'Submit application through university portal',
        documents: ['Completed Application Form', 'Document Uploads', 'Application Fee'],
        deadline: 'April 30, 2024',
        completed: false,
        expandable: false
      }
    ],
    virtualTour: [
      {
        id: 'library',
        name: 'Mustafa İnan Library',
        description: 'Modern research facility with digital resources',
        image: '/tour/itu-library.jpg',
        facts: ['1M+ books', '24/7 access', 'Silent study zones'],
        coordinates: { x: 50, y: 30 }
      },
      {
        id: 'engineering',
        name: 'Engineering Faculty',
        description: 'State-of-the-art laboratories and classrooms',
        image: '/tour/itu-engineering.jpg',
        facts: ['Advanced robotics lab', '3D printing facilities', 'Industry partnerships'],
        coordinates: { x: 70, y: 50 }
      }
    ]
  },
  {
    ...mockUniversities[1],
    worldRank: 511,
    localRank: 2,
    acceptanceRate: '12%',
    studentCount: '20,000',
    internationalStudents: '2,800',
    campusSize: '1,100 acres',
    establishedYear: 1863,
    admissionSteps: [
      {
        id: 'step1',
        title: 'Document Preparation',
        description: 'Collect and authenticate all academic records',
        documents: ['Diploma Translation', 'Grade Conversion', 'Recommendation Letters'],
        completed: false,
        expandable: true
      }
    ],
    virtualTour: [
      {
        id: 'campus-view',
        name: 'Bosphorus Campus',
        description: 'Stunning waterfront campus overlooking the Bosphorus',
        image: '/tour/bogazici-campus.jpg',
        facts: ['Historic buildings', 'Waterfront location', 'Green spaces'],
        coordinates: { x: 40, y: 60 }
      }
    ]
  }
];

// Scholarship Data
export const mockScholarships: Scholarship[] = [
  {
    id: 'turkiye-burslari',
    name: 'Türkiye Scholarships',
    university: 'Government Program',
    amount: 'Full Tuition + $300/month',
    deadline: 'February 20, 2024',
    requirements: ['GPA 3.0+', 'Age under 21', 'English proficiency'],
    description: 'Comprehensive scholarship covering tuition, accommodation, and living expenses',
    type: 'international',
    applicationUrl: 'https://turkiyeburslari.gov.tr'
  },
  {
    id: 'itu-excellence',
    name: 'ITU Excellence Scholarship',
    university: 'Istanbul Technical University',
    amount: '50% Tuition Waiver',
    deadline: 'March 15, 2024',
    requirements: ['Top 10% of class', 'Engineering field', 'Portfolio submission'],
    description: 'Merit-based scholarship for outstanding engineering students',
    type: 'merit',
    applicationUrl: 'https://itu.edu.tr/scholarships'
  },
  {
    id: 'bogazici-international',
    name: 'Boğaziçi International Grant',
    university: 'Boğaziçi University',
    amount: '$2,000/semester',
    deadline: 'April 1, 2024',
    requirements: ['International student', 'Financial need', 'Academic excellence'],
    description: 'Need-based financial aid for international students',
    type: 'need',
    applicationUrl: 'https://bogazici.edu.tr/financial-aid'
  },
  {
    id: 'cs-innovation',
    name: 'Computer Science Innovation Award',
    university: 'Multiple Universities',
    amount: '$5,000 + Internship',
    deadline: 'January 30, 2024',
    requirements: ['CS/IT field', 'Project portfolio', 'Innovation focus'],
    description: 'Award for innovative computer science projects and research',
    type: 'field-specific',
    applicationUrl: 'https://cs-innovation-turkey.org'
  }
];

// Cost Calculator Data
export const costCategories = [
  { id: 'tuition', name: 'Tuition Fees', icon: '🎓', required: true },
  { id: 'accommodation', name: 'Accommodation', icon: '🏠', required: true },
  { id: 'food', name: 'Food & Dining', icon: '🍽️', required: true },
  { id: 'transport', name: 'Transportation', icon: '🚌', required: true },
  { id: 'books', name: 'Books & Supplies', icon: '📚', required: false },
  { id: 'personal', name: 'Personal Expenses', icon: '💰', required: false },
  { id: 'health', name: 'Health Insurance', icon: '🏥', required: true }
];

export const cityOptions = [
  { id: 'istanbul', name: 'Istanbul', multiplier: 1.2 },
  { id: 'ankara', name: 'Ankara', multiplier: 1.0 },
  { id: 'izmir', name: 'Izmir', multiplier: 1.1 },
  { id: 'antalya', name: 'Antalya', multiplier: 1.05 }
];

export const accommodationOptions = [
  { id: 'dorm', name: 'University Dorm', cost: 200, icon: '🏫' },
  { id: 'shared', name: 'Shared Apartment', cost: 350, icon: '🏠' },
  { id: 'studio', name: 'Studio Apartment', cost: 500, icon: '🏢' },
  { id: 'family', name: 'Host Family', cost: 300, icon: '👨‍👩‍👧‍👦' }
];

// Navigation Items for Phase 2
export const explorationNavItems = [
  { id: 'universities', name: 'Universities', icon: '🏛️', color: 'from-red-500 to-red-700' },
  { id: 'scholarships', name: 'Scholarships', icon: '💰', color: 'from-yellow-500 to-yellow-700' },
  { id: 'costs', name: 'Costs', icon: '📊', color: 'from-green-500 to-green-700' },
  { id: 'community', name: 'Community', icon: '👥', color: 'from-blue-500 to-blue-700' }
];

// Restaurant and Food Data Structures

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  cuisineType: string[];
  averagePrice: number;
  priceRange: '₺' | '₺₺' | '₺₺₺';
  location: {
    address: string;
    district: string;
    city: string;
    distanceFromUser?: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  specialOffer?: string;
  discountPercentage?: number;
  operatingHours: {
    open: string;
    close: string;
  };
  contact: {
    phone: string;
    website?: string;
    instagram?: string;
  };
  features: {
    delivery: boolean;
    reservation: boolean;
    familyFriendly: boolean;
    outdoorSeating: boolean;
    accessibility: boolean;
    liveMusic: boolean;
    alcoholServed: boolean;
  };
  popularDishes: string[];
  gallery: string[];
  menu: MenuCategory[];
  reviews: RestaurantReview[];
  points: number; // Points earned per meal
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isVegetarian?: boolean;
  isHalal?: boolean;
  isSpicy?: boolean;
}

export interface RestaurantReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  photos?: string[];
  ratings: {
    food: number;
    cleanliness: number;
    service: number;
    ambiance: number;
  };
  helpful: number;
}

export interface RestaurantSearchFilters {
  cuisineType: string[];
  priceRange: string[];
  rating: number;
  distance: number;
  features: string[];
}

export interface TouristPreferences {
  cuisinePreferences: string[];
  budgetRange: string;
  diningStyle: string[];
  dietaryRestrictions: string[];
  location: string;
}

// Mock Restaurant Data
export const mockRestaurants: Restaurant[] = [
  {
    id: 'nusr-et',
    name: 'Nusr-Et Steakhouse',
    image: '/images/restaurants/nusr-et.jpg',
    rating: 4.8,
    reviewCount: 2500,
    cuisineType: ['Turkish', 'Steakhouse', 'International'],
    averagePrice: 800,
    priceRange: '₺₺₺',
    location: {
      address: 'Etiler Mahallesi, Nispetiye Cd. No:87',
      district: 'Etiler',
      city: 'Istanbul',
      distanceFromUser: 1.5
    },
    coordinates: { lat: 41.0766, lng: 29.0253 },
    specialOffer: '15% discount via app',
    discountPercentage: 15,
    operatingHours: { open: '12:00', close: '02:00' },
    contact: {
      phone: '+90 212 358 1715',
      website: 'https://nusr-et.com.tr',
      instagram: '@nusr_et'
    },
    features: {
      delivery: false,
      reservation: true,
      familyFriendly: true,
      outdoorSeating: false,
      accessibility: true,
      liveMusic: false,
      alcoholServed: true
    },
    popularDishes: ['Ottoman Steak', 'Tomahawk', 'Baklava'],
    gallery: ['/images/restaurants/nusr-et-1.jpg', '/images/restaurants/nusr-et-2.jpg'],
    menu: [
      {
        id: 'steaks',
        name: 'Premium Steaks',
        items: [
          {
            id: 'ottoman-steak',
            name: 'Ottoman Steak',
            description: 'Premium beef with traditional Turkish spices',
            price: 450,
            isHalal: true
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'review-1',
        userId: 'user-1',
        userName: 'Ahmed M.',
        rating: 5,
        comment: 'Amazing experience! The meat quality is exceptional.',
        date: '2024-01-15',
        ratings: { food: 5, cleanliness: 5, service: 5, ambiance: 4 },
        helpful: 12
      }
    ],
    points: 20
  },
  {
    id: 'kebabci-oglu',
    name: 'Kebabçı Oğlu',
    image: '/images/restaurants/kebabci-oglu.jpg',
    rating: 4.6,
    reviewCount: 1850,
    cuisineType: ['Turkish', 'Kebab', 'Traditional'],
    averagePrice: 120,
    priceRange: '₺₺',
    location: {
      address: 'Sultanahmet Meydanı No:15',
      district: 'Sultanahmet',
      city: 'Istanbul',
      distanceFromUser: 0.8
    },
    coordinates: { lat: 41.0058, lng: 28.9784 },
    specialOffer: 'Free Turkish tea with meal',
    operatingHours: { open: '10:00', close: '23:00' },
    contact: {
      phone: '+90 212 517 6910',
      instagram: '@kebabcioglu_official'
    },
    features: {
      delivery: true,
      reservation: true,
      familyFriendly: true,
      outdoorSeating: true,
      accessibility: true,
      liveMusic: true,
      alcoholServed: false
    },
    popularDishes: ['Anatolian Kebab', 'Menemen', 'Baklava'],
    gallery: ['/images/restaurants/kebab-1.jpg', '/images/restaurants/kebab-2.jpg'],
    menu: [
      {
        id: 'kebabs',
        name: 'Traditional Kebabs',
        items: [
          {
            id: 'anatolian-kebab',
            name: 'Anatolian Kebab',
            description: 'Traditional lamb kebab with herbs and spices',
            price: 85,
            isHalal: true
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'review-2',
        userId: 'user-2',
        userName: 'Sarah L.',
        rating: 5,
        comment: 'Authentic Turkish flavors! The atmosphere is wonderful.',
        date: '2024-01-10',
        ratings: { food: 5, cleanliness: 4, service: 5, ambiance: 5 },
        helpful: 8
      }
    ],
    points: 20
  },
  {
    id: 'pandeli',
    name: 'Pandeli Restaurant',
    image: '/images/restaurants/pandeli.jpg',
    rating: 4.7,
    reviewCount: 980,
    cuisineType: ['Turkish', 'Ottoman', 'Fine Dining'],
    averagePrice: 350,
    priceRange: '₺₺₺',
    location: {
      address: 'Eminönü Mısır Çarşısı No:1',
      district: 'Eminönü',
      city: 'Istanbul',
      distanceFromUser: 2.1
    },
    coordinates: { lat: 41.0166, lng: 28.9706 },
    operatingHours: { open: '12:00', close: '17:00' },
    contact: {
      phone: '+90 212 527 3909',
      website: 'https://pandeli.com.tr'
    },
    features: {
      delivery: false,
      reservation: true,
      familyFriendly: true,
      outdoorSeating: false,
      accessibility: false,
      liveMusic: false,
      alcoholServed: true
    },
    popularDishes: ['Ottoman Lamb', 'Stuffed Vine Leaves', 'Turkish Delight'],
    gallery: ['/images/restaurants/pandeli-1.jpg'],
    menu: [
      {
        id: 'ottoman',
        name: 'Ottoman Specialties',
        items: [
          {
            id: 'ottoman-lamb',
            name: 'Ottoman Lamb',
            description: 'Slow-cooked lamb with traditional Ottoman spices',
            price: 180,
            isHalal: true
          }
        ]
      }
    ],
    reviews: [],
    points: 25
  }
];

// Restaurant Quiz Questions
export const restaurantQuizQuestions = [
  {
    id: '1',
    question: "What's your preferred cuisine type?",
    type: 'multiple' as const,
    options: [
      { id: '1a', text: 'Turkish Traditional', icon: '🥙', value: 'turkish' },
      { id: '1b', text: 'International', icon: '🍝', value: 'international' },
      { id: '1c', text: 'Seafood', icon: '🦐', value: 'seafood' },
      { id: '1d', text: 'Vegetarian', icon: '🥗', value: 'vegetarian' },
      { id: '1e', text: 'Fast Food', icon: '🍔', value: 'fastfood' },
      { id: '1f', text: 'Fine Dining', icon: '🍷', value: 'finedining' }
    ]
  },
  {
    id: '2',
    question: "What's your budget range per meal?",
    type: 'single' as const,
    options: [
      { id: '2a', text: 'Budget (₺50-100)', icon: '₺', value: 'budget' },
      { id: '2b', text: 'Mid-range (₺100-300)', icon: '₺₺', value: 'midrange' },
      { id: '2c', text: 'Luxury (₺300+)', icon: '₺₺₺', value: 'luxury' }
    ]
  },
  {
    id: '3',
    question: "Where would you like to dine?",
    type: 'single' as const,
    options: [
      { id: '3a', text: 'Sultanahmet (Historic)', icon: '🏛️', value: 'sultanahmet' },
      { id: '3b', text: 'Taksim (Modern)', icon: '🌆', value: 'taksim' },
      { id: '3c', text: 'Bosphorus (Waterfront)', icon: '🌊', value: 'bosphorus' },
      { id: '3d', text: 'Near My Hotel', icon: '📍', value: 'nearme' }
    ]
  },
  {
    id: '4',
    question: "What dining features matter to you?",
    type: 'multiple' as const,
    options: [
      { id: '4a', text: 'Outdoor Seating', icon: '🌤️', value: 'outdoor' },
      { id: '4b', text: 'Live Music', icon: '🎵', value: 'music' },
      { id: '4c', text: 'Family Friendly', icon: '👨‍👩‍👧‍👦', value: 'family' },
      { id: '4d', text: 'Delivery Available', icon: '🚚', value: 'delivery' },
      { id: '4e', text: 'Halal Options', icon: '☪️', value: 'halal' }
    ]
  }
];

// Hotel Quiz Questions
export const hotelQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What type of accommodation do you prefer?',
    type: 'multiple',
    options: [
      { id: 'luxury', text: 'Luxury Hotels', icon: '⭐', value: 'luxury' },
      { id: 'boutique', text: 'Boutique Hotels', icon: '🏨', value: 'boutique' },
      { id: 'business', text: 'Business Hotels', icon: '💼', value: 'business' },
      { id: 'budget', text: 'Budget-Friendly', icon: '💰', value: 'budget' }
    ]
  },
  {
    id: '2',
    question: 'What\'s your budget range per night?',
    type: 'single',
    options: [
      { id: 'budget', text: 'Budget (₺500-1500)', icon: '₺', value: 'budget' },
      { id: 'mid-range', text: 'Mid-range (₺1500-3000)', icon: '₺₺', value: 'mid-range' },
      { id: 'luxury', text: 'Luxury (₺3000+)', icon: '₺₺₺', value: 'luxury' }
    ]
  },
  {
    id: '3',
    question: 'Which location do you prefer?',
    type: 'single',
    options: [
      { id: 'city-center', text: 'City Center', icon: '🏙️', value: 'city-center' },
      { id: 'historical', text: 'Historical District', icon: '🏛️', value: 'historical' },
      { id: 'beach', text: 'Near Beach', icon: '🏖️', value: 'beach' },
      { id: 'airport', text: 'Near Airport', icon: '✈️', value: 'airport' }
    ]
  },
  {
    id: '4',
    question: 'Which amenities are important to you?',
    type: 'multiple',
    options: [
      { id: 'pool', text: 'Swimming Pool', icon: '🏊', value: 'pool' },
      { id: 'spa', text: 'Spa & Wellness', icon: '💆', value: 'spa' },
      { id: 'gym', text: 'Fitness Center', icon: '💪', value: 'gym' },
      { id: 'breakfast', text: 'Breakfast Included', icon: '🍳', value: 'breakfast' },
      { id: 'wifi', text: 'Free WiFi', icon: '📶', value: 'wifi' },
      { id: 'parking', text: 'Free Parking', icon: '🚗', value: 'parking' }
    ]
  }
];

// Transportation Data Structures
export interface TransportRoute {
  id: string;
  from: Location;
  to: Location;
  transportOptions: TransportOption[];
  distance: number;
  estimatedTime: number;
  pointsEarned: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  type: 'current' | 'hotel' | 'restaurant' | 'attraction' | 'station' | 'custom';
}

export interface TransportOption {
  id: string;
  type: 'metro' | 'bus' | 'taxi' | 'walking' | 'ferry' | 'bike';
  name: string;
  estimatedTime: number;
  estimatedCost: number;
  color: string;
  icon: string;
  steps: TransportStep[];
  comfort: number;
  crowdedness: number;
  punctuality: number;
  operatingHours: { start: string; end: string };
  liveStatus: 'normal' | 'delayed' | 'maintenance' | 'crowded';
  bookingAvailable: boolean;
}

export interface TransportStep {
  id: string;
  instruction: string;
  duration: number;
  distance?: number;
  transportType: string;
  lineNumber?: string;
  stationName?: string;
  direction?: string;
}

export interface LiveAlert {
  id: string;
  type: 'maintenance' | 'delay' | 'crowd' | 'closure' | 'info';
  title: string;
  description: string;
  affectedLines: string[];
  severity: 'low' | 'medium' | 'high';
  startTime: string;
  endTime?: string;
  icon: string;
}

export interface TransportCard {
  id: string;
  name: string;
  type: 'istanbulkart' | 'bilet35' | 'daily' | 'weekly';
  price: number;
  validFor: string[];
  description: string;
  purchasePoints: number;
}

export interface ParkingInfo {
  id: string;
  name: string;
  location: Location;
  hourlyRate: number;
  capacity: number;
  available: number;
  features: string[];
}

export interface BikeScooterInfo {
  id: string;
  type: 'bike' | 'scooter';
  brand: string;
  location: Location;
  pricePerMinute: number;
  batteryLevel?: number;
  available: boolean;
}

// Mock Transportation Data
export const mockTransportRoutes: TransportRoute[] = [
  {
    id: 'route-1',
    from: {
      id: 'taksim',
      name: 'Taksim Square',
      address: 'Taksim Meydanı, Beyoğlu',
      coordinates: { lat: 41.0369, lng: 28.9850 },
      type: 'attraction'
    },
    to: {
      id: 'hagia-sophia',
      name: 'Hagia Sophia',
      address: 'Sultan Ahmet, Ayasofya Meydanı',
      coordinates: { lat: 41.0086, lng: 28.9802 },
      type: 'attraction'
    },
    transportOptions: [
      {
        id: 'metro-option',
        type: 'metro',
        name: 'Metro M2 + Tram T1',
        estimatedTime: 25,
        estimatedCost: 15,
        color: '#0066CC',
        icon: '🚇',
        comfort: 4,
        crowdedness: 3,
        punctuality: 5,
        operatingHours: { start: '06:00', end: '00:00' },
        liveStatus: 'normal',
        bookingAvailable: false,
        steps: [
          {
            id: 'step-1',
            instruction: 'Walk to Taksim Metro Station',
            duration: 3,
            distance: 200,
            transportType: 'walking'
          },
          {
            id: 'step-2',
            instruction: 'Take M2 Metro to Vezneciler',
            duration: 12,
            transportType: 'metro',
            lineNumber: 'M2',
            stationName: 'Vezneciler',
            direction: 'Hacıosman'
          },
          {
            id: 'step-3',
            instruction: 'Transfer to T1 Tram at Eminönü',
            duration: 8,
            transportType: 'tram',
            lineNumber: 'T1',
            stationName: 'Sultanahmet',
            direction: 'Bağcılar'
          },
          {
            id: 'step-4',
            instruction: 'Walk to Hagia Sophia',
            duration: 2,
            distance: 150,
            transportType: 'walking'
          }
        ]
      },
      {
        id: 'bus-option',
        type: 'bus',
        name: 'Bus 28, 30D',
        estimatedTime: 40,
        estimatedCost: 12,
        color: '#00AA44',
        icon: '🚌',
        comfort: 3,
        crowdedness: 4,
        punctuality: 3,
        operatingHours: { start: '05:30', end: '23:30' },
        liveStatus: 'crowded',
        bookingAvailable: false,
        steps: [
          {
            id: 'step-1',
            instruction: 'Walk to Taksim Bus Stop',
            duration: 5,
            distance: 300,
            transportType: 'walking'
          },
          {
            id: 'step-2',
            instruction: 'Take Bus 28 to Eminönü',
            duration: 25,
            transportType: 'bus',
            lineNumber: '28',
            stationName: 'Eminönü',
            direction: 'Eminönü'
          },
          {
            id: 'step-3',
            instruction: 'Walk to Hagia Sophia',
            duration: 10,
            distance: 800,
            transportType: 'walking'
          }
        ]
      },
      {
        id: 'taxi-option',
        type: 'taxi',
        name: 'Taxi / BiTaksi',
        estimatedTime: 15,
        estimatedCost: 120,
        color: '#FFD700',
        icon: '🚕',
        comfort: 5,
        crowdedness: 1,
        punctuality: 4,
        operatingHours: { start: '00:00', end: '23:59' },
        liveStatus: 'normal',
        bookingAvailable: true,
        steps: [
          {
            id: 'step-1',
            instruction: 'Direct route via Galata Bridge',
            duration: 15,
            distance: 5200,
            transportType: 'taxi'
          }
        ]
      },
      {
        id: 'walking-option',
        type: 'walking',
        name: 'Walking Route',
        estimatedTime: 65,
        estimatedCost: 0,
        color: '#888888',
        icon: '🚶',
        comfort: 2,
        crowdedness: 1,
        punctuality: 5,
        operatingHours: { start: '00:00', end: '23:59' },
        liveStatus: 'normal',
        bookingAvailable: false,
        steps: [
          {
            id: 'step-1',
            instruction: 'Head south on İstiklal Caddesi',
            duration: 15,
            distance: 1200,
            transportType: 'walking'
          },
          {
            id: 'step-2',
            instruction: 'Cross Galata Bridge',
            duration: 20,
            distance: 1600,
            transportType: 'walking'
          },
          {
            id: 'step-3',
            instruction: 'Walk through Eminönü to Sultanahmet',
            duration: 30,
            distance: 2400,
            transportType: 'walking'
          }
        ]
      }
    ],
    distance: 5200,
    estimatedTime: 15,
    pointsEarned: 10
  }
];

export const mockLiveAlerts: LiveAlert[] = [
  {
    id: 'alert-1',
    type: 'maintenance',
    title: 'M2 Line Maintenance',
    description: 'Limited service between Taksim and Şişli stations',
    affectedLines: ['M2'],
    severity: 'medium',
    startTime: '2024-01-20T22:00:00Z',
    endTime: '2024-01-21T06:00:00Z',
    icon: '🔧'
  },
  {
    id: 'alert-2',
    type: 'crowd',
    title: 'High Traffic at Taksim',
    description: 'Expect delays and crowded conditions around 6 PM',
    affectedLines: ['M2', 'F1'],
    severity: 'low',
    startTime: '2024-01-20T17:00:00Z',
    endTime: '2024-01-20T19:00:00Z',
    icon: '👥'
  },
  {
    id: 'alert-3',
    type: 'delay',
    title: 'T1 Tram Delays',
    description: '5-10 minute delays due to increased passenger volume',
    affectedLines: ['T1'],
    severity: 'low',
    startTime: '2024-01-20T08:00:00Z',
    endTime: '2024-01-20T10:00:00Z',
    icon: '⏰'
  }
];

export const mockTransportCards: TransportCard[] = [
  {
    id: 'istanbulkart',
    name: 'İstanbulkart',
    type: 'istanbulkart',
    price: 50,
    validFor: ['metro', 'bus', 'tram', 'ferry', 'metrobus'],
    description: 'Rechargeable card for all public transport in Istanbul',
    purchasePoints: 5
  },
  {
    id: 'daily-pass',
    name: 'Daily Pass',
    type: 'daily',
    price: 25,
    validFor: ['metro', 'bus', 'tram'],
    description: 'Unlimited rides for one day',
    purchasePoints: 3
  },
  {
    id: 'weekly-pass',
    name: 'Weekly Pass',
    type: 'weekly',
    price: 150,
    validFor: ['metro', 'bus', 'tram', 'ferry'],
    description: 'Unlimited rides for one week',
    purchasePoints: 15
  }
];

export const mockParkingSpots: ParkingInfo[] = [
  {
    id: 'parking-1',
    name: 'Taksim Square Parking',
    location: {
      id: 'taksim-parking',
      name: 'Taksim Parking',
      address: 'Taksim Meydanı Yanı',
      coordinates: { lat: 41.0365, lng: 28.9844 },
      type: 'custom'
    },
    hourlyRate: 15,
    capacity: 200,
    available: 45,
    features: ['24/7', 'Security', 'Covered']
  },
  {
    id: 'parking-2',
    name: 'Sultanahmet Parking',
    location: {
      id: 'sultanahmet-parking',
      name: 'Sultanahmet Parking',
      address: 'Sultan Ahmet Mahallesi',
      coordinates: { lat: 41.0082, lng: 28.9784 },
      type: 'custom'
    },
    hourlyRate: 12,
    capacity: 150,
    available: 23,
    features: ['Historical Area', 'Walking Distance to Attractions']
  }
];

export const mockBikesScooters: BikeScooterInfo[] = [
  {
    id: 'bike-1',
    type: 'bike',
    brand: 'İSBİKE',
    location: {
      id: 'bike-station-1',
      name: 'Taksim Bike Station',
      address: 'Taksim Meydanı',
      coordinates: { lat: 41.0369, lng: 28.9850 },
      type: 'station'
    },
    pricePerMinute: 2,
    available: true
  },
  {
    id: 'scooter-1',
    type: 'scooter',
    brand: 'Martı',
    available: true,
    location: {
      id: 'scooter-1-loc',
      name: 'Near Galata Tower',
      address: 'Galata Kulesi Yakını',
      coordinates: { lat: 41.0256, lng: 28.9744 },
      type: 'custom'
    },
    pricePerMinute: 3
  }
];

// Transportation Quiz Questions
export const transportationQuizQuestions: QuizQuestion[] = [
  {
    id: 'transport-1',
    question: 'What is your preferred mode of transportation?',
    type: 'single',
    options: [
      { id: 'metro', text: 'Metro/Subway', icon: '🚇', value: 'metro' },
      { id: 'bus', text: 'Bus', icon: '🚌', value: 'bus' },
      { id: 'taxi', text: 'Taxi/Uber', icon: '🚕', value: 'taxi' },
      { id: 'walking', text: 'Walking', icon: '🚶', value: 'walking' },
      { id: 'ferry', text: 'Ferry', icon: '⛴️', value: 'ferry' },
      { id: 'tram', text: 'Tram', icon: '🚊', value: 'tram' }
    ]
  },
  {
    id: 'transport-2',
    question: 'How important is travel time vs cost?',
    type: 'single',
    options: [
      { id: 'speed', text: 'Speed is priority', icon: '⚡', value: 'speed' },
      { id: 'balance', text: 'Balance both', icon: '⚖️', value: 'balance' },
      { id: 'cost', text: 'Cost is priority', icon: '💰', value: 'cost' },
      { id: 'comfort', text: 'Comfort matters most', icon: '🛋️', value: 'comfort' }
    ]
  },
  {
    id: 'transport-3',
    question: 'Do you prefer direct routes or don\'t mind transfers?',
    type: 'single',
    options: [
      { id: 'direct', text: 'Direct routes only', icon: '➡️', value: 'direct' },
      { id: 'one-transfer', text: 'Up to 1 transfer', icon: '🔄', value: 'one-transfer' },
      { id: 'multiple', text: 'Multiple transfers OK', icon: '🔀', value: 'multiple' },
      { id: 'shortest', text: 'Shortest time regardless', icon: '⏱️', value: 'shortest' }
    ]
  },
  {
    id: 'transport-4',
    question: 'What time do you usually travel?',
    type: 'single',
    options: [
      { id: 'morning', text: 'Early morning (6-9 AM)', icon: '🌅', value: 'morning' },
      { id: 'midday', text: 'Mid-day (9 AM-5 PM)', icon: '☀️', value: 'midday' },
      { id: 'evening', text: 'Evening (5-8 PM)', icon: '🌆', value: 'evening' },
      { id: 'night', text: 'Night (8 PM-6 AM)', icon: '🌙', value: 'night' }
    ]
  }
];


// Phase 4: Tourist Attractions Data Structures

export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: 'Historical' | 'Museum' | 'Religious' | 'Cultural' | 'Nature' | 'Entertainment';
  rating: number;
  reviewCount: number;
  heroImage: string;
  heroVideo?: string;
  location: Location;
  quickInfo: AttractionQuickInfo;
  gallery: AttractionGallery;
  experience: AttractionExperience;
  services: AttractionServices;
  reviews: AttractionReview[];
  offers: AttractionOffer[];
  nearbyAttractions: string[];
  pointsReward: number;
}

export interface AttractionQuickInfo {
  openingHours: {
    weekdays: string;
    weekends: string;
    holidays?: string;
  };
  ticketPrices: {
    adult: number;
    child: number;
    student?: number;
    senior?: number;
    currency: string;
  };
  bestTimeToVisit: string[];
  directions: {
    metro?: string;
    bus?: string;
    taxi?: string;
    walking?: string;
  };
  upcomingEvents: AttractionEvent[];
  estimatedDuration: string;
}

export interface AttractionGallery {
  photos360: string[];
  tourVideo: string;
  userPhotos: string[];
  virtualTour?: string;
}

export interface AttractionExperience {
  activities: string[];
  duration: string;
  suitableFor: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  highlights: string[];
  tips: string[];
}

export interface AttractionServices {
  nearbyRestaurants: {
    id: string;
    name: string;
    distance: string;
    rating: number;
  }[];
  nearbyMarkets: {
    id: string;
    name: string;
    distance: string;
    type: string;
  }[];
  facilities: string[];
  accessibility: string[];
}

export interface AttractionReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  photos?: string[];
  visitDate: string;
  createdAt: string;
  helpful: number;
  verified: boolean;
}

export interface AttractionOffer {
  id: string;
  title: string;
  description: string;
  type: 'Points' | 'Discount' | 'Package';
  value: string;
  pointsRequired?: number;
  validUntil?: string;
  conditions?: string[];
}

export interface AttractionEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price?: number;
  bookingRequired: boolean;
}

// Mock Attractions Data
export const mockAttractions: Attraction[] = [
  {
    id: 'hagia-sophia',
    name: 'Hagia Sophia',
    description: 'Byzantine and Ottoman masterpiece - A magnificent architectural wonder that has served as both church and mosque',
    category: 'Historical',
    rating: 4.8,
    reviewCount: 12300,
    heroImage: '/images/attractions/hagia-sophia-hero.jpg',
    heroVideo: '/videos/hagia-sophia-tour.mp4',
    location: {
      id: 'hagia-sophia-loc',
      name: 'Hagia Sophia',
      address: 'Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul',
      coordinates: { lat: 41.0086, lng: 28.9802 },
      type: 'attraction'
    },
    quickInfo: {
      openingHours: {
        weekdays: '09:00 - 19:00',
        weekends: '09:00 - 19:00',
        holidays: '13:00 - 19:00'
      },
      ticketPrices: {
        adult: 400,
        child: 0,
        student: 200,
        senior: 200,
        currency: 'TL'
      },
      bestTimeToVisit: ['Early morning (9:00-10:00)', 'Late afternoon (17:00-18:00)'],
      directions: {
        metro: 'M2 to Sultanahmet (5-min walk)',
        bus: 'Bus 28, 30, 46 to Sultanahmet',
        taxi: '15-20 min from Taksim',
        walking: '10 min from Blue Mosque'
      },
      upcomingEvents: [
        {
          id: 'event-1',
          title: 'Byzantine History Tour',
          description: 'Guided tour focusing on Byzantine period',
          date: '2024-01-15',
          time: '14:00',
          price: 50,
          bookingRequired: true
        }
      ],
      estimatedDuration: '2-3 hours'
    },
    gallery: {
      photos360: [
        '/images/attractions/hagia-sophia-360-1.jpg',
        '/images/attractions/hagia-sophia-360-2.jpg'
      ],
      tourVideo: '/videos/hagia-sophia-1min-tour.mp4',
      userPhotos: [
        '/images/attractions/hagia-sophia-user-1.jpg',
        '/images/attractions/hagia-sophia-user-2.jpg'
      ],
      virtualTour: '/virtual-tours/hagia-sophia'
    },
    experience: {
      activities: ['Guided tour', 'Photography', 'Museum visit', 'Audio guide'],
      duration: '2-3 hours',
      suitableFor: ['Families', 'Children', 'Seniors', 'History enthusiasts'],
      difficulty: 'Easy',
      highlights: [
        'Magnificent dome architecture',
        'Byzantine mosaics',
        'Ottoman calligraphy',
        'Historical significance'
      ],
      tips: [
        'Visit early morning to avoid crowds',
        'Wear comfortable shoes',
        'Respect dress code',
        'Photography allowed without flash'
      ]
    },
    services: {
      nearbyRestaurants: [
        {
          id: 'pandeli',
          name: 'Pandeli Restaurant',
          distance: '200m',
          rating: 4.5
        },
        {
          id: 'sultanahmet-koftecisi',
          name: 'Sultanahmet Köftecisi',
          distance: '150m',
          rating: 4.3
        }
      ],
      nearbyMarkets: [
        {
          id: 'grand-bazaar',
          name: 'Grand Bazaar',
          distance: '800m',
          type: 'Traditional Market'
        }
      ],
      facilities: ['Restrooms', 'Prayer rooms', 'Gift shop', 'Audio guides', 'Wheelchair access'],
      accessibility: ['Wheelchair accessible entrance', 'Audio descriptions available', 'Large print guides']
    },
    reviews: [
      {
        id: 'review-1',
        userId: 'user-1',
        userName: 'Sarah Johnson',
        userAvatar: '/images/users/sarah.jpg',
        rating: 5,
        title: 'Absolutely breathtaking!',
        comment: 'The architecture is stunning and the history is fascinating. A must-visit when in Istanbul.',
        photos: ['/images/reviews/hagia-sophia-review-1.jpg'],
        visitDate: '2024-01-10',
        createdAt: '2024-01-11',
        helpful: 23,
        verified: true
      }
    ],
    offers: [
      {
        id: 'offer-1',
        title: '50 Points for Ticket Booking',
        description: 'Earn 50 points when you book your ticket through our app',
        type: 'Points',
        value: '50 points'
      },
      {
        id: 'offer-2',
        title: '10% Discount with Bosphorus Tour',
        description: 'Get 10% off when combined with Bosphorus tour booking',
        type: 'Discount',
        value: '10%',
        conditions: ['Must book both on same day', 'Valid for 30 days']
      }
    ],
    nearbyAttractions: ['blue-mosque', 'topkapi-palace', 'basilica-cistern'],
    pointsReward: 50
  },
  {
    id: 'blue-mosque',
    name: 'Sultan Ahmed Mosque (Blue Mosque)',
    description: 'Iconic mosque with six minarets and beautiful blue tiles',
    category: 'Religious',
    rating: 4.7,
    reviewCount: 8900,
    heroImage: '/images/attractions/blue-mosque-hero.jpg',
    location: {
      id: 'blue-mosque-loc',
      name: 'Blue Mosque',
      address: 'Sultan Ahmet, Atmeydanı Cd. No:7, 34122 Fatih/İstanbul',
      coordinates: { lat: 41.0054, lng: 28.9768 },
      type: 'attraction'
    },
    quickInfo: {
      openingHours: {
        weekdays: '08:30 - 12:00, 14:00 - 16:30, 17:30 - 19:00',
        weekends: '08:30 - 12:00, 14:00 - 16:30, 17:30 - 19:00'
      },
      ticketPrices: {
        adult: 0,
        child: 0,
        currency: 'TL'
      },
      bestTimeToVisit: ['Early morning', 'Between prayer times'],
      directions: {
        metro: 'M2 to Sultanahmet (3-min walk)',
        bus: 'Bus 28, 30, 46 to Sultanahmet',
        walking: '2 min from Hagia Sophia'
      },
      upcomingEvents: [],
      estimatedDuration: '1-2 hours'
    },
    gallery: {
      photos360: ['/images/attractions/blue-mosque-360.jpg'],
      tourVideo: '/videos/blue-mosque-tour.mp4',
      userPhotos: ['/images/attractions/blue-mosque-user-1.jpg']
    },
    experience: {
      activities: ['Prayer observation', 'Architecture viewing', 'Photography'],
      duration: '1-2 hours',
      suitableFor: ['Families', 'History enthusiasts', 'Architecture lovers'],
      difficulty: 'Easy',
      highlights: ['Six minarets', 'Blue Iznik tiles', 'Courtyard', 'Interior design'],
      tips: ['Dress modestly', 'Remove shoes', 'Respect prayer times', 'Free entry']
    },
    services: {
      nearbyRestaurants: [
        {
          id: 'deraliye',
          name: 'Deraliye Ottoman Cuisine',
          distance: '100m',
          rating: 4.4
        }
      ],
      nearbyMarkets: [
        {
          id: 'arasta-bazaar',
          name: 'Arasta Bazaar',
          distance: '50m',
          type: 'Souvenir Market'
        }
      ],
      facilities: ['Restrooms', 'Prayer facilities', 'Information center'],
      accessibility: ['Wheelchair accessible', 'Sign language guides available']
    },
    reviews: [],
    offers: [
      {
        id: 'offer-3',
        title: '30 Points for Visit Check-in',
        description: 'Check-in at Blue Mosque and earn 30 points',
        type: 'Points',
        value: '30 points'
      }
    ],
    nearbyAttractions: ['hagia-sophia', 'topkapi-palace', 'grand-bazaar'],
    pointsReward: 30
  }
];

// Attraction Quiz Questions
export const attractionQuizQuestions: QuizQuestion[] = [
  {
    id: 'attraction-1',
    question: 'What type of attractions interest you most?',
    type: 'multiple',
    options: [
      { id: 'historical', text: 'Historical Sites', icon: '🏛️', value: 'historical' },
      { id: 'museums', text: 'Museums', icon: '🏛️', value: 'museums' },
      { id: 'religious', text: 'Religious Sites', icon: '🕌', value: 'religious' },
      { id: 'nature', text: 'Nature & Parks', icon: '🌳', value: 'nature' }
    ]
  },
  {
    id: 'attraction-2',
    question: 'How much time do you typically spend at attractions?',
    type: 'single',
    options: [
      { id: 'quick', text: 'Quick visit (1 hour)', icon: '⚡', value: 'quick' },
      { id: 'moderate', text: 'Moderate (2-3 hours)', icon: '🕐', value: 'moderate' },
      { id: 'extended', text: 'Extended (4+ hours)', icon: '🕕', value: 'extended' }
    ]
  },
  {
    id: 'attraction-3',
    question: 'What\'s your preferred way to explore?',
    type: 'single',
    options: [
      { id: 'guided', text: 'Guided Tours', icon: '👥', value: 'guided' },
      { id: 'self', text: 'Self-guided', icon: '🚶', value: 'self' },
      { id: 'audio', text: 'Audio Guide', icon: '🎧', value: 'audio' }
    ]
  }
];

// ==========================================
// PHASE 5: TRAVEL TIPS & GUIDES
// ==========================================

// Travel Tips & Guides Interfaces
export interface VisaRequirement {
  country: string;
  countryCode: string;
  requirement: 'visa-free' | 'e-visa' | 'visa-on-arrival' | 'embassy-visa';
  duration: string;
  fee?: string;
  processingTime?: string;
  notes?: string;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  logo: string;
  rating: number;
  coverage: string[];
  price: {
    basic: number;
    standard: number;
    premium: number;
  };
  features: string[];
  link: string;
}

export interface Vaccination {
  id: string;
  name: string;
  required: boolean;
  recommended: boolean;
  description: string;
  timeframe: string;
  icon: string;
}

export interface DocumentChecklistItem {
  id: string;
  category: 'essential' | 'recommended' | 'optional';
  name: string;
  description: string;
  icon: string;
  completed: boolean;
}

export interface MonthlyWeather {
  month: string;
  monthNumber: number;
  temperature: {
    min: number;
    max: number;
  };
  rainfall: number;
  humidity: number;
  bestCities: string[];
  touristDensity: 'low' | 'medium' | 'high';
  events: string[];
  pros: string[];
  cons: string[];
  icon: string;
}

export interface EssentialApp {
  id: string;
  name: string;
  category: 'translation' | 'transport' | 'food' | 'maps' | 'emergency' | 'currency';
  description: string;
  features: string[];
  rating: number;
  downloads: string;
  icon: string;
  downloadLinks: {
    ios: string;
    android: string;
    web?: string;
  };
  offline: boolean;
  free: boolean;
}

export interface SafetyTip {
  id: string;
  category: 'scams' | 'customs' | 'emergency' | 'health' | 'transport' | 'general';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  icon: string;
  tips: string[];
}

export interface SIMCardPackage {
  id: string;
  provider: string;
  name: string;
  data: string;
  validity: string;
  price: number;
  speed: string;
  coverage: string[];
  features: string[];
  purchaseLocations: string[];
  rating: number;
  recommended: boolean;
}

export interface LegalInfo {
  id: string;
  category: 'alcohol' | 'smoking' | 'photography' | 'dress-code' | 'behavior' | 'customs';
  title: string;
  description: string;
  restrictions: string[];
  penalties: string[];
  icon: string;
}

export interface CostSavingTip {
  id: string;
  category: 'transport' | 'food' | 'attractions' | 'accommodation' | 'shopping';
  title: string;
  description: string;
  savings: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  steps: string[];
}

export interface EmergencyContact {
  id: string;
  service: string;
  number: string;
  description: string;
  available24h: boolean;
  languages: string[];
  icon: string;
}

export interface TravelGuide {
  id: string;
  preTravel: {
    visaRequirements: VisaRequirement[];
    insuranceProviders: InsuranceProvider[];
    vaccinations: Vaccination[];
    documentChecklist: DocumentChecklistItem[];
  };
  bestTimes: MonthlyWeather[];
  essentialApps: EssentialApp[];
  safetyTips: SafetyTip[];
  internetGuide: {
    simCards: SIMCardPackage[];
    wifiAvailability: string[];
    internetSpeed: string;
  };
  additionalInfo: {
    legalInfo: LegalInfo[];
    costSaving: CostSavingTip[];
    emergencyContacts: EmergencyContact[];
  };
}

// Mock Data for Travel Tips & Guides
export const mockTravelGuide: TravelGuide = {
  id: 'turkey-travel-guide',
  preTravel: {
    visaRequirements: [
      {
        country: 'United States',
        countryCode: 'US',
        requirement: 'e-visa',
        duration: '90 days',
        fee: '$50',
        processingTime: '24-48 hours',
        notes: 'Must apply online before travel'
      },
      {
        country: 'United Kingdom',
        countryCode: 'GB',
        requirement: 'e-visa',
        duration: '90 days',
        fee: '$50',
        processingTime: '24-48 hours'
      },
      {
        country: 'Germany',
        countryCode: 'DE',
        requirement: 'visa-free',
        duration: '90 days',
        notes: 'EU citizens enjoy visa-free travel'
      },
      {
        country: 'Russia',
        countryCode: 'RU',
        requirement: 'visa-free',
        duration: '60 days'
      }
    ],
    insuranceProviders: [
      {
        id: 'world-nomads',
        name: 'World Nomads',
        logo: '/images/insurance/world-nomads.png',
        rating: 4.5,
        coverage: ['Medical', 'Trip Cancellation', 'Baggage', 'Adventure Sports'],
        price: { basic: 45, standard: 75, premium: 120 },
        features: ['24/7 Support', 'Online Claims', 'Adventure Coverage'],
        link: 'https://worldnomads.com'
      },
      {
        id: 'safety-wing',
        name: 'SafetyWing',
        logo: '/images/insurance/safety-wing.png',
        rating: 4.3,
        coverage: ['Medical', 'Emergency Evacuation', 'Trip Interruption'],
        price: { basic: 37, standard: 56, premium: 89 },
        features: ['Digital Nomad Friendly', 'Worldwide Coverage', 'Affordable'],
        link: 'https://safetywing.com'
      }
    ],
    vaccinations: [
      {
        id: 'routine',
        name: 'Routine Vaccinations',
        required: true,
        recommended: true,
        description: 'MMR, DPT, flu, and COVID-19',
        timeframe: 'Up to date',
        icon: '💉'
      },
      {
        id: 'hepatitis-a',
        name: 'Hepatitis A',
        required: false,
        recommended: true,
        description: 'Protection against contaminated food/water',
        timeframe: '2 weeks before travel',
        icon: '🛡️'
      }
    ],
    documentChecklist: [
      {
        id: 'passport',
        category: 'essential',
        name: 'Passport',
        description: 'Valid for at least 6 months from entry date',
        icon: '📘',
        completed: false
      },
      {
        id: 'visa',
        category: 'essential',
        name: 'Visa/E-visa',
        description: 'Required for most nationalities',
        icon: '📋',
        completed: false
      },
      {
        id: 'insurance',
        category: 'essential',
        name: 'Travel Insurance',
        description: 'Medical and trip protection coverage',
        icon: '🛡️',
        completed: false
      }
    ]
  },
  bestTimes: [
    {
      month: 'April',
      monthNumber: 4,
      temperature: { min: 10, max: 20 },
      rainfall: 46,
      humidity: 65,
      bestCities: ['Istanbul', 'Cappadocia', 'Pamukkale'],
      touristDensity: 'medium',
      events: ['National Sovereignty Day', 'Tulip Festival'],
      pros: ['Perfect weather', 'Beautiful landscapes', 'Ideal for sightseeing'],
      cons: ['Increasing prices', 'More tourists'],
      icon: '🌞'
    },
    {
      month: 'May',
      monthNumber: 5,
      temperature: { min: 15, max: 25 },
      rainfall: 38,
      humidity: 62,
      bestCities: ['Istanbul', 'Cappadocia', 'Bodrum', 'Antalya'],
      touristDensity: 'high',
      events: ['Youth and Sports Day', 'Music festivals'],
      pros: ['Excellent weather', 'Long days', 'All attractions open'],
      cons: ['High prices', 'Crowded attractions'],
      icon: '☀️'
    }
  ],
  essentialApps: [
    {
      id: 'google-translate',
      name: 'Google Translate',
      category: 'translation',
      description: 'Real-time translation with camera and voice support',
      features: ['Camera translation', 'Voice translation', 'Offline mode'],
      rating: 4.5,
      downloads: '1B+',
      icon: '🌐',
      downloadLinks: {
        ios: 'https://apps.apple.com/app/google-translate',
        android: 'https://play.google.com/store/apps/details?id=com.google.android.apps.translate'
      },
      offline: true,
      free: true
    }
  ],
  safetyTips: [
    {
      id: 'taxi-scams',
      category: 'scams',
      title: 'Taxi Driver Scams',
      description: 'Common taxi scams and how to avoid them',
      severity: 'medium',
      icon: '🚕',
      tips: [
        'Always use the meter or agree on price beforehand',
        'Use ride-sharing apps like BiTaksi or Uber',
        'Have your destination written in Turkish'
      ]
    }
  ],
  internetGuide: {
    simCards: [
      {
        id: 'turkcell-tourist',
        provider: 'Turkcell',
        name: 'Tourist Package',
        data: '20GB',
        validity: '30 days',
        price: 150,
        speed: '4G/5G',
        coverage: ['Nationwide', 'Rural areas', 'Islands'],
        features: ['Unlimited social media', 'International calls'],
        purchaseLocations: ['Airport', 'Turkcell stores', 'Online'],
        rating: 4.5,
        recommended: true
      }
    ],
    wifiAvailability: [
      'Free WiFi in most hotels and hostels',
      'WiFi available in cafes and restaurants'
    ],
    internetSpeed: 'Average 25-50 Mbps in cities'
  },
  additionalInfo: {
    legalInfo: [
      {
        id: 'alcohol-laws',
        category: 'alcohol',
        title: 'Alcohol Regulations',
        description: 'Rules regarding alcohol consumption and purchase',
        restrictions: [
          'No alcohol sales between 10 PM - 6 AM',
          'Minimum age 18 for purchase'
        ],
        penalties: ['Fines for public consumption'],
        icon: '🍷'
      }
    ],
    costSaving: [
      {
        id: 'museum-pass',
        category: 'attractions',
        title: 'Museum Pass Istanbul',
        description: 'Skip lines and save money at major attractions',
        savings: 'Up to 40% off admission fees',
        difficulty: 'easy',
        icon: '🎫',
        steps: ['Purchase online or at participating museums', 'Valid for 5 days']
      }
    ],
    emergencyContacts: [
      {
        id: 'police',
        service: 'Police',
        number: '155',
        description: 'General police emergency line',
        available24h: true,
        languages: ['Turkish', 'English'],
        icon: '👮'
      }
    ]
  }
};

// ==========================================
// TOURIST PROFILE DASHBOARD
// ==========================================

// Tourist Profile Dashboard Interfaces
export interface PointActivity {
  id: string;
  type: 'earned' | 'redeemed';
  activity: string;
  points: number;
  date: string;
  category: 'booking' | 'review' | 'referral' | 'achievement' | 'redemption';
  icon: string;
  description?: string;
}

export interface VisitedPlace {
  id: string;
  name: string;
  type: 'restaurant' | 'hotel' | 'attraction' | 'transport';
  location: string;
  visitDate: string;
  rating?: number;
  review?: string;
  photos: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  pointsEarned: number;
  category: string;
  highlights: string[];
}

export interface TouristDashboardData {
  personalInfo: {
    fullName: string;
    email: string;
    phoneNumber: string;
    nationality: string;
    preferredLanguage: 'Arabic' | 'English';
    travelPreferences: string[];
    universityEnrollment: boolean;
    profilePicture: string;
    bio?: string;
    joinDate: string;
  };
  pointsSystem: {
    currentPoints: number;
    membershipLevel: string;
    nextLevel: string;
    pointsToNextLevel: number;
    totalPointsEarned: number;
    recentActivities: PointActivity[];
  };
  visitedPlaces: VisitedPlace[];
  documents: {
    passportPhoto: string | null;
    personalPhoto: string | null;
    passportPhotoVerified: boolean;
    personalPhotoVerified: boolean;
    lastUpdated: string;
  };
  statistics: {
    totalVisits: number;
    totalReviews: number;
    averageRating: number;
    favoriteCategory: string;
    totalDistance: number;
    countriesVisited: number;
  };
}

// Mock Tourist Dashboard Data
export const mockTouristDashboard: TouristDashboardData = {
  personalInfo: {
    fullName: 'Ahmed Hassan',
    email: 'ahmed.hassan@university.edu',
    phoneNumber: '+90 555 123 4567',
    nationality: 'Egyptian',
    preferredLanguage: 'English',
    travelPreferences: ['Cultural', 'Historical', 'Budget-Friendly'],
    universityEnrollment: true,
    profilePicture: '/images/profile/ahmed-hassan.jpg',
    bio: 'International student passionate about exploring Turkish culture and history. Love discovering hidden gems and authentic local experiences.',
    joinDate: '2024-01-15'
  },
  pointsSystem: {
    currentPoints: 2750,
    membershipLevel: 'Gold',
    nextLevel: 'Platinum',
    pointsToNextLevel: 1250,
    totalPointsEarned: 5420,
    recentActivities: [
      {
        id: 'act-001',
        type: 'earned',
        activity: 'Hotel Booking - Grand Hyatt Istanbul',
        points: 250,
        date: '2024-08-28',
        category: 'booking',
        icon: '🏨',
        description: 'Booked 3-night stay with early check-in'
      },
      {
        id: 'act-002',
        type: 'earned',
        activity: 'Restaurant Review - Pandeli',
        points: 50,
        date: '2024-08-25',
        category: 'review',
        icon: '⭐',
        description: 'Detailed review with photos'
      },
      {
        id: 'act-003',
        type: 'earned',
        activity: 'Attraction Visit - Hagia Sophia',
        points: 100,
        date: '2024-08-22',
        category: 'achievement',
        icon: '🏛️',
        description: 'First-time visitor bonus'
      },
      {
        id: 'act-004',
        type: 'redeemed',
        activity: 'Museum Pass Istanbul',
        points: -200,
        date: '2024-08-20',
        category: 'redemption',
        icon: '🎫',
        description: '5-day museum pass discount'
      },
      {
        id: 'act-005',
        type: 'earned',
        activity: 'Friend Referral - Sarah Ahmed',
        points: 300,
        date: '2024-08-18',
        category: 'referral',
        icon: '👥',
        description: 'Friend completed first booking'
      }
    ]
  },
  visitedPlaces: [
    {
      id: 'place-001',
      name: 'Hagia Sophia',
      type: 'attraction',
      location: 'Sultanahmet, Istanbul',
      visitDate: '2024-08-22',
      rating: 5,
      review: 'Absolutely breathtaking! The architecture and history are incredible. The audio guide was very informative.',
      photos: ['/images/visits/hagia-sophia-1.jpg', '/images/visits/hagia-sophia-2.jpg'],
      coordinates: { lat: 41.0086, lng: 28.9802 },
      pointsEarned: 100,
      category: 'Historical Site',
      highlights: ['Byzantine Architecture', 'Ottoman History', 'Audio Guide']
    },
    {
      id: 'place-002',
      name: 'Pandeli Restaurant',
      type: 'restaurant',
      location: 'Eminönü, Istanbul',
      visitDate: '2024-08-25',
      rating: 4,
      review: 'Traditional Ottoman cuisine in a beautiful historic setting. The lamb was exceptional!',
      photos: ['/images/visits/pandeli-1.jpg', '/images/visits/pandeli-2.jpg'],
      coordinates: { lat: 41.0178, lng: 28.9706 },
      pointsEarned: 75,
      category: 'Ottoman Cuisine',
      highlights: ['Historic Venue', 'Traditional Recipes', 'Excellent Service']
    },
    {
      id: 'place-003',
      name: 'Grand Hyatt Istanbul',
      type: 'hotel',
      location: 'Taksim, Istanbul',
      visitDate: '2024-08-28',
      rating: 5,
      review: 'Luxurious stay with amazing Bosphorus views. Staff was incredibly helpful and professional.',
      photos: ['/images/visits/grand-hyatt-1.jpg', '/images/visits/grand-hyatt-2.jpg'],
      coordinates: { lat: 41.0370, lng: 28.9857 },
      pointsEarned: 200,
      category: 'Luxury Hotel',
      highlights: ['Bosphorus View', 'Spa Services', 'Concierge Service']
    },
    {
      id: 'place-004',
      name: 'Blue Mosque',
      type: 'attraction',
      location: 'Sultanahmet, Istanbul',
      visitDate: '2024-08-23',
      rating: 5,
      review: 'Stunning architecture and peaceful atmosphere. Remember to dress modestly and remove shoes.',
      photos: ['/images/visits/blue-mosque-1.jpg'],
      coordinates: { lat: 41.0054, lng: 28.9768 },
      pointsEarned: 100,
      category: 'Religious Site',
      highlights: ['Ottoman Architecture', 'Six Minarets', 'Prayer Times']
    },
    {
      id: 'place-005',
      name: 'Metro Istanbul',
      type: 'transport',
      location: 'Various Stations',
      visitDate: '2024-08-22',
      rating: 4,
      review: 'Efficient and clean public transport. The Istanbulkart makes travel very convenient.',
      photos: ['/images/visits/metro-1.jpg'],
      coordinates: { lat: 41.0082, lng: 28.9784 },
      pointsEarned: 25,
      category: 'Public Transport',
      highlights: ['Istanbulkart', 'Clean Stations', 'Frequent Service']
    }
  ],
  documents: {
    passportPhoto: '/images/documents/passport-ahmed.jpg',
    personalPhoto: '/images/documents/personal-ahmed.jpg',
    passportPhotoVerified: true,
    personalPhotoVerified: true,
    lastUpdated: '2024-08-15'
  },
  statistics: {
    totalVisits: 12,
    totalReviews: 8,
    averageRating: 4.6,
    favoriteCategory: 'Historical Sites',
    totalDistance: 45.2,
    countriesVisited: 1
  }
};

// Update touristNavItems for tourist navigation
export const touristNavItems = [
  { id: 'restaurants', name: 'Restaurants', icon: '🍽️', href: '/tourist/restaurants' },
  { id: 'hotels', name: 'Hotels', icon: '🏨', href: '/tourist/hotels' },
  { id: 'transportation', name: 'Transportation', icon: '🚌', href: '/tourist/transportation' },
  { id: 'attractions', name: 'Attractions', icon: '🏛️', href: '/tourist/attractions' },
  { id: 'travel-tips', name: 'Travel Tips', icon: '📚', href: '/tourist/travel-tips' }
];
