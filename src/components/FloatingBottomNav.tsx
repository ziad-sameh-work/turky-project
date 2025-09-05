'use client';

import { motion } from 'framer-motion';

interface FloatingBottomNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'dashboard' | 'exploration';
}

const FloatingBottomNav: React.FC<FloatingBottomNavProps> = ({ 
  activeTab, 
  onTabChange
}) => {
  const dashboardTabs = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'search', 
      label: 'Explore', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'favorites', 
      label: 'Favorites', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  // Use dashboard tabs for all pages to maintain consistency
  const tabs = dashboardTabs;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      {/* Floating Container */}
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl px-6 py-4 shadow-2xl shadow-black/25">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-50" />
        
        {/* Navigation Items */}
        <div className="relative flex items-center space-x-8">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              whileHover={{ 
                scale: 1.1,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-300
                ${activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-200'
                }
              `}
            >
              {/* Active Tab Background */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-700/20 border border-red-500/30 rounded-2xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              {/* Icon Container */}
              <motion.div
                animate={{ 
                  scale: activeTab === tab.id ? 1.1 : 1,
                  rotate: activeTab === tab.id ? 5 : 0
                }}
                transition={{ 
                  duration: activeTab === tab.id ? 0.5 : 0.3,
                  type: "tween"
                }}
                className={`
                  relative w-8 h-8 flex items-center justify-center
                  ${activeTab === tab.id 
                    ? 'text-red-400' 
                    : 'text-current'
                  }
                `}
              >
                {tab.icon}
                
                {/* Active Indicator Dot */}
                {activeTab === tab.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                  />
                )}
              </motion.div>
              
              {/* Label */}
              <motion.span
                animate={{ 
                  opacity: activeTab === tab.id ? 1 : 0.7,
                  y: activeTab === tab.id ? 0 : 2
                }}
                className="text-xs font-medium leading-none"
              >
                {tab.label}
              </motion.span>
              
              {/* Ripple Effect on Tap */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: activeTab === tab.id ? [0, 1.5, 0] : 0,
                  opacity: activeTab === tab.id ? [0, 0.3, 0] : 0
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-red-500/20 rounded-2xl"
              />
            </motion.button>
          ))}
        </div>
        
        {/* Floating Animation Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-1 h-1 bg-red-400/50 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Bottom Glow */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 blur-xl rounded-full" />
    </motion.div>
  );
};

export default FloatingBottomNav;
