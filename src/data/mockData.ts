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
  admissionSteps?: any[];
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
