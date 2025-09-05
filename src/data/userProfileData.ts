// User Profile Data Structures and Interfaces

export interface UserProfile {
  id: string;
  personalInfo: PersonalInfo;
  pointsSystem: PointsSystemData;
  universityStatus: UniversityStatus;
  documents: UserDocuments;
  digitalWallet: DigitalWallet;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  preferredLanguage: 'Arabic' | 'English';
  profilePicture?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
}

export interface PointsSystemData {
  currentPoints: number;
  totalEarnedPoints: number;
  membershipLevel: MembershipLevel;
  userBadges: UserBadge[];
  rewards: Reward[];
  levelProgress: LevelProgress;
}

export interface MembershipLevel {
  current: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  pointsRequired: number;
  pointsToNext: number;
  benefits: string[];
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: string;
  category: 'booking' | 'social' | 'travel' | 'achievement';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'voucher' | 'upgrade' | 'experience';
  value: string;
  expiryDate?: string;
  isRedeemed: boolean;
  category: 'restaurant' | 'hotel' | 'transportation' | 'general';
}

export interface LevelProgress {
  currentLevelPoints: number;
  nextLevelPoints: number;
  progressPercentage: number;
}

export interface UniversityStatus {
  isEnrolled: boolean;
  universityName?: string;
  studentId?: string;
  enrollmentYear?: number;
  graduationYear?: number;
  fieldOfStudy?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'not_submitted';
}

export interface UserDocuments {
  profilePhoto?: UploadedDocument;
  proofOfResidence?: UploadedDocument;
  universityEnrollment?: UploadedDocument;
  healthInsurance?: UploadedDocument;
}

export interface UploadedDocument {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  previewUrl?: string;
}

export interface UserPreferences {
  travelStyle: 'Budget' | 'Mid-range' | 'Luxury' | 'Backpacker';
  interests: string[];
  dietaryRestrictions: string[];
  accessibility: string[];
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
  bookingUpdates: boolean;
  pointsUpdates: boolean;
}

export interface DigitalWallet {
  balance: WalletBalance;
  paymentMethods: PaymentMethod[];
  transactions: Transaction[];
  settings: WalletSettings;
  limits: WalletLimits;
}

export interface WalletBalance {
  totalBalance: number;
  availableBalance: number;
  pendingBalance: number;
  currency: 'TRY' | 'USD' | 'EUR';
  lastUpdated: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'bank_account' | 'digital_wallet' | 'crypto';
  name: string;
  lastFour?: string;
  expiryDate?: string;
  bankName?: string;
  isDefault: boolean;
  isActive: boolean;
  addedDate: string;
  verificationStatus: 'pending' | 'verified' | 'failed';
}

export interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'transfer' | 'topup' | 'withdrawal' | 'reward';
  amount: number;
  currency: 'TRY' | 'USD' | 'EUR';
  description: string;
  merchant?: string;
  category: 'restaurant' | 'transportation' | 'accommodation' | 'shopping' | 'entertainment' | 'education' | 'other';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentMethod?: string;
  date: string;
  location?: string;
  isOnline: boolean;
  receiptUrl?: string;
  pointsEarned?: number;
}

export interface WalletSettings {
  autoTopup: boolean;
  autoTopupAmount: number;
  autoTopupThreshold: number;
  notifications: {
    transactions: boolean;
    lowBalance: boolean;
    monthlyStatement: boolean;
  };
  security: {
    requirePinForPayments: boolean;
    requireBiometric: boolean;
    maxDailySpend: number;
  };
}

export interface WalletLimits {
  dailySpendLimit: number;
  monthlySpendLimit: number;
  singleTransactionLimit: number;
  dailyWithdrawalLimit: number;
  monthlyTopupLimit: number;
}

// Mock User Profile Data
export const mockUserProfile: UserProfile = {
  id: 'user-001',
  personalInfo: {
    fullName: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phoneNumber: '+90 555 123 4567',
    nationality: 'Egyptian',
    preferredLanguage: 'English',
    dateOfBirth: '1998-03-15',
    gender: 'Male'
  },
  pointsSystem: {
    currentPoints: 2450,
    totalEarnedPoints: 3200,
    membershipLevel: {
      current: 'Gold',
      pointsRequired: 2000,
      pointsToNext: 550,
      benefits: [
        'Priority booking',
        '15% discount on hotels',
        'Free cancellation',
        'Dedicated support',
        'Exclusive rewards'
      ]
    },
    userBadges: [
      {
        id: 'badge-001',
        name: 'First Booking',
        description: 'Made your first restaurant reservation',
        icon: '🎉',
        dateEarned: '2024-01-15',
        category: 'booking',
        rarity: 'common'
      },
      {
        id: 'badge-002',
        name: 'Review Master',
        description: 'Posted 5 helpful reviews',
        icon: '⭐',
        dateEarned: '2024-02-20',
        category: 'social',
        rarity: 'rare'
      },
      {
        id: 'badge-003',
        name: 'Explorer',
        description: 'Visited 10 different locations',
        icon: '🗺️',
        dateEarned: '2024-03-10',
        category: 'travel',
        rarity: 'epic'
      },
      {
        id: 'badge-004',
        name: 'Transport Pro',
        description: 'Used all transport modes in Istanbul',
        icon: '🚇',
        dateEarned: '2024-03-25',
        category: 'achievement',
        rarity: 'rare'
      }
    ],
    rewards: [
      {
        id: 'reward-001',
        name: '20% Hotel Discount',
        description: 'Get 20% off your next hotel booking',
        pointsCost: 500,
        type: 'discount',
        value: '20%',
        expiryDate: '2024-06-30',
        isRedeemed: false,
        category: 'hotel'
      },
      {
        id: 'reward-002',
        name: 'Free Airport Transfer',
        description: 'Complimentary transfer from/to airport',
        pointsCost: 800,
        type: 'voucher',
        value: 'Free Transfer',
        expiryDate: '2024-05-31',
        isRedeemed: false,
        category: 'transportation'
      },
      {
        id: 'reward-003',
        name: 'Restaurant Voucher',
        description: '₺100 voucher for any restaurant',
        pointsCost: 300,
        type: 'voucher',
        value: '₺100',
        isRedeemed: true,
        category: 'restaurant'
      }
    ],
    levelProgress: {
      currentLevelPoints: 2450,
      nextLevelPoints: 3000,
      progressPercentage: 82
    }
  },
  universityStatus: {
    isEnrolled: true,
    universityName: 'Istanbul Technical University',
    studentId: 'ITU2024001',
    enrollmentYear: 2024,
    graduationYear: 2026,
    fieldOfStudy: 'Computer Engineering',
    verificationStatus: 'verified'
  },
  documents: {
    profilePhoto: {
      id: 'doc-001',
      fileName: 'profile_photo.jpg',
      fileType: 'image/jpeg',
      fileSize: 2048576,
      uploadDate: '2024-01-10',
      verificationStatus: 'verified'
    },
    proofOfResidence: {
      id: 'doc-002',
      fileName: 'utility_bill.pdf',
      fileType: 'application/pdf',
      fileSize: 1024000,
      uploadDate: '2024-01-12',
      verificationStatus: 'verified'
    },
    universityEnrollment: {
      id: 'doc-003',
      fileName: 'enrollment_certificate.pdf',
      fileType: 'application/pdf',
      fileSize: 856432,
      uploadDate: '2024-01-15',
      verificationStatus: 'verified'
    },
    healthInsurance: {
      id: 'doc-004',
      fileName: 'insurance_card.jpg',
      fileType: 'image/jpeg',
      fileSize: 1536000,
      uploadDate: '2024-01-18',
      verificationStatus: 'pending'
    }
  },
  digitalWallet: {
    balance: {
      totalBalance: 1250.75,
      availableBalance: 1150.75,
      pendingBalance: 100.00,
      currency: 'TRY',
      lastUpdated: '2024-03-25T14:30:00Z'
    },
    paymentMethods: [
      {
        id: 'pm-001',
        type: 'credit_card',
        name: 'Visa **** 4532',
        lastFour: '4532',
        expiryDate: '12/26',
        bankName: 'Garanti BBVA',
        isDefault: true,
        isActive: true,
        addedDate: '2024-01-15',
        verificationStatus: 'verified'
      },
      {
        id: 'pm-002',
        type: 'bank_account',
        name: 'İş Bankası Checking',
        bankName: 'Türkiye İş Bankası',
        isDefault: false,
        isActive: true,
        addedDate: '2024-02-01',
        verificationStatus: 'verified'
      },
      {
        id: 'pm-003',
        type: 'digital_wallet',
        name: 'Papara Wallet',
        isDefault: false,
        isActive: true,
        addedDate: '2024-02-15',
        verificationStatus: 'verified'
      }
    ],
    transactions: [
      {
        id: 'txn-001',
        type: 'payment',
        amount: -45.50,
        currency: 'TRY',
        description: 'Restaurant Payment - Pandeli',
        merchant: 'Pandeli Restaurant',
        category: 'restaurant',
        status: 'completed',
        paymentMethod: 'pm-001',
        date: '2024-03-25T12:30:00Z',
        location: 'Sultanahmet, Istanbul',
        isOnline: false,
        pointsEarned: 23
      },
      {
        id: 'txn-002',
        type: 'payment',
        amount: -12.75,
        currency: 'TRY',
        description: 'Metro Card Top-up',
        merchant: 'İETT',
        category: 'transportation',
        status: 'completed',
        paymentMethod: 'pm-001',
        date: '2024-03-24T08:15:00Z',
        location: 'Taksim Metro Station',
        isOnline: false,
        pointsEarned: 6
      },
      {
        id: 'txn-003',
        type: 'topup',
        amount: 200.00,
        currency: 'TRY',
        description: 'Wallet Top-up',
        category: 'other',
        status: 'completed',
        paymentMethod: 'pm-002',
        date: '2024-03-23T14:20:00Z',
        isOnline: true,
        pointsEarned: 10
      },
      {
        id: 'txn-004',
        type: 'payment',
        amount: -85.25,
        currency: 'TRY',
        description: 'Online Shopping - Amazon Turkey',
        merchant: 'Amazon Turkey',
        category: 'shopping',
        status: 'completed',
        paymentMethod: 'pm-001',
        date: '2024-03-22T16:45:00Z',
        isOnline: true,
        pointsEarned: 43
      },
      {
        id: 'txn-005',
        type: 'reward',
        amount: 25.00,
        currency: 'TRY',
        description: 'Points Redemption Bonus',
        category: 'other',
        status: 'completed',
        date: '2024-03-21T10:00:00Z',
        isOnline: true
      }
    ],
    settings: {
      autoTopup: true,
      autoTopupAmount: 100.00,
      autoTopupThreshold: 50.00,
      notifications: {
        transactions: true,
        lowBalance: true,
        monthlyStatement: true
      },
      security: {
        requirePinForPayments: true,
        requireBiometric: false,
        maxDailySpend: 500.00
      }
    },
    limits: {
      dailySpendLimit: 500.00,
      monthlySpendLimit: 5000.00,
      singleTransactionLimit: 1000.00,
      dailyWithdrawalLimit: 1000.00,
      monthlyTopupLimit: 10000.00
    }
  },
  preferences: {
    travelStyle: 'Mid-range',
    interests: ['Cultural Sites', 'Food & Dining', 'Museums', 'Shopping', 'Nightlife'],
    dietaryRestrictions: ['Halal'],
    accessibility: [],
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false,
      bookingUpdates: true,
      pointsUpdates: true
    }
  },
  createdAt: '2024-01-10T10:00:00Z',
  updatedAt: '2024-03-25T14:30:00Z'
};

// Available travel styles for user selection
export const travelStyles = [
  { id: 'budget', name: 'Budget', description: 'Cost-effective options', icon: '💰' },
  { id: 'mid-range', name: 'Mid-range', description: 'Balance of comfort and value', icon: '⚖️' },
  { id: 'luxury', name: 'Luxury', description: 'Premium experiences', icon: '✨' },
  { id: 'backpacker', name: 'Backpacker', description: 'Adventure-focused travel', icon: '🎒' }
];

// Available interests for user selection
export const availableInterests = [
  'Cultural Sites', 'Food & Dining', 'Museums', 'Shopping', 'Nightlife',
  'Nature & Parks', 'Adventure Sports', 'Photography', 'Architecture',
  'Local Markets', 'Religious Sites', 'Art Galleries', 'Music & Entertainment',
  'Beach & Water Activities', 'Historical Tours', 'Street Food', 'Festivals'
];

// Available dietary restrictions
export const dietaryRestrictions = [
  'Halal', 'Kosher', 'Vegetarian', 'Vegan', 'Gluten-Free',
  'Dairy-Free', 'Nut-Free', 'Seafood Allergy', 'No Pork', 'No Beef'
];

// Available accessibility options
export const accessibilityOptions = [
  'Wheelchair Accessible', 'Visual Impairment Support', 'Hearing Impairment Support',
  'Mobility Assistance', 'Sign Language', 'Large Print Materials', 'Audio Descriptions'
];

// Document upload configuration
export const documentTypes = [
  {
    id: 'profilePhoto',
    name: 'Profile Photo',
    description: 'A clear photo of yourself (e.g., student ID photo)',
    acceptedFormats: ['image/jpeg', 'image/png', 'image/jpg'],
    maxSize: 5 * 1024 * 1024, // 5MB
    required: false
  },
  {
    id: 'proofOfResidence',
    name: 'Proof of Residence',
    description: 'Utility bill, rental agreement, or official address document',
    acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
    maxSize: 5 * 1024 * 1024, // 5MB
    required: true
  },
  {
    id: 'universityEnrollment',
    name: 'University Enrollment Certificate',
    description: 'Official enrollment certificate or student ID',
    acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
    maxSize: 5 * 1024 * 1024, // 5MB
    required: false
  },
  {
    id: 'healthInsurance',
    name: 'Health Insurance',
    description: 'Insurance card or policy document',
    acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
    maxSize: 5 * 1024 * 1024, // 5MB
    required: true
  }
];
