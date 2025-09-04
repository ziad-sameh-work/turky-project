'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBottomNav from './FloatingBottomNav';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'scholarship' | 'deadline' | 'forum' | 'update' | 'achievement';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  priority: 'high' | 'medium' | 'low';
}

interface NotificationCenterProps {
  onBack: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Scholarship Alert! 🎓',
      message: 'Ahmad, check out this new grant! Turkish Government Scholarship applications are now open with full coverage.',
      type: 'scholarship',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      actionUrl: '/scholarships',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Application Deadline Reminder ⏰',
      message: 'YÖS exam registration closes in 5 days. Don\'t miss out on your chance to study in Turkey!',
      type: 'deadline',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionUrl: '/planner',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Forum Reply 💬',
      message: 'Mehmet K. replied to your question about METU dorm life. Check out his helpful tips!',
      type: 'forum',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      actionUrl: '/community',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Achievement Unlocked! 🏆',
      message: 'Congratulations! You earned the "First Post" badge for joining the community discussion.',
      type: 'achievement',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: true,
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Weekly Update 📧',
      message: '5 Tips for YÖS Success - Your weekly study guide is ready with expert advice and strategies.',
      type: 'update',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: false,
      actionUrl: '/updates',
      priority: 'low'
    }
  ]);

  const [showPushDemo, setShowPushDemo] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'scholarship': return '💰';
      case 'deadline': return '⏰';
      case 'forum': return '💬';
      case 'achievement': return '🏆';
      case 'update': return '📧';
      default: return '🔔';
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') {
      return 'from-red-500/20 to-red-700/20 border-red-500/30';
    }
    switch (type) {
      case 'scholarship': return 'from-yellow-500/20 to-yellow-700/20 border-yellow-500/30';
      case 'deadline': return 'from-orange-500/20 to-orange-700/20 border-orange-500/30';
      case 'forum': return 'from-blue-500/20 to-blue-700/20 border-blue-500/30';
      case 'achievement': return 'from-purple-500/20 to-purple-700/20 border-purple-500/30';
      case 'update': return 'from-green-500/20 to-green-700/20 border-green-500/30';
      default: return 'from-gray-500/20 to-gray-700/20 border-gray-500/30';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const simulatePushNotification = () => {
    setShowPushDemo(true);
    setTimeout(() => setShowPushDemo(false), 4000);
    
    // Add new notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: 'New Dorm Available! 🏠',
      message: 'A spot just opened up at METU Campus Residence. Apply now before it\'s taken!',
      type: 'update',
      timestamp: new Date(),
      read: false,
      actionUrl: '/housing',
      priority: 'high'
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" 
        />
      </div>

      {/* Push Notification Demo */}
      <AnimatePresence>
        {showPushDemo && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 mx-6 mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 shadow-2xl"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">🎓</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm">Turkish Study App</h4>
                  <p className="text-gray-300 text-sm">New Dorm Available! 🏠</p>
                  <p className="text-gray-400 text-xs mt-1">Tap to view details</p>
                </div>
                <span className="text-gray-400 text-xs">now</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <h1 className="text-2xl font-bold text-white mb-1">Notifications</h1>
            <div className="flex items-center justify-center space-x-2">
              {unreadCount > 0 && (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{unreadCount}</span>
                </div>
              )}
              <span className="text-gray-400 text-sm">{notifications.length} total</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={simulatePushNotification}
            className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Action Bar */}
      {unreadCount > 0 && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 px-6 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={markAllAsRead}
            className="w-full p-3 bg-blue-500/20 border border-blue-500/30 rounded-2xl text-blue-400 font-medium"
          >
            Mark All as Read ({unreadCount})
          </motion.button>
        </motion.div>
      )}

      {/* Notifications List */}
      <div className="relative z-10 px-6 pb-32 space-y-4">
        <AnimatePresence>
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl border backdrop-blur-sm transition-all ${
                !notification.read 
                  ? `bg-gradient-to-r ${getNotificationColor(notification.type, notification.priority)} shadow-lg`
                  : 'bg-gray-800/40 border-gray-700/30'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                  !notification.read ? 'bg-white/10' : 'bg-gray-700/50'
                }`}>
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-semibold ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {notification.priority === 'high' && (
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      )}
                      <span className="text-gray-400 text-xs">{formatTimeAgo(notification.timestamp)}</span>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-3 leading-relaxed ${!notification.read ? 'text-gray-200' : 'text-gray-400'}`}>
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {notification.actionUrl && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => markAsRead(notification.id)}
                          className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 text-sm font-medium"
                        >
                          View Details
                        </motion.button>
                      )}
                      
                      {!notification.read && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => markAsRead(notification.id)}
                          className="px-4 py-2 bg-gray-600/50 border border-gray-500/30 rounded-xl text-gray-300 text-sm"
                        >
                          Mark Read
                        </motion.button>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-white font-bold text-lg mb-2">All caught up!</h3>
            <p className="text-gray-400 text-sm">No new notifications at the moment.</p>
          </motion.div>
        )}
      </div>

      {/* Enhanced Floating Bottom Navigation */}
      <FloatingBottomNav
        activeTab="search"
        onTabChange={(tabId: string) => {
          if (tabId === 'home') {
            onBack();
          }
        }}
        variant="dashboard"
      />
    </div>
  );
};

export default NotificationCenter;
