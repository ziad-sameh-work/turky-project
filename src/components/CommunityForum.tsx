'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBottomNav from './FloatingBottomNav';

interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Reply[];
  tags: string[];
  isLiked: boolean;
}

interface Reply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

interface CommunityForumProps {
  onBack: () => void;
}

const CommunityForum: React.FC<CommunityForumProps> = ({ onBack }) => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      author: 'Mehmet K.',
      avatar: '👨‍🎓',
      title: 'METU Dorm Life - Tips & Tricks',
      content: 'Hey everyone! I\'ve been living in METU dorms for 2 years now. Here are some essential tips:\n\n• Bring a good desk lamp - dorm lighting isn\'t great\n• Stock up on instant noodles from the campus market\n• Join floor WhatsApp groups for updates\n• The laundry room gets busy on weekends\n\nWhat other tips do you have?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 24,
      replies: [
        {
          id: '1-1',
          author: 'Ayşe M.',
          avatar: '👩‍🎓',
          content: 'Great tips! Also, don\'t forget to bring a small fridge if allowed. Saves so much money on drinks and snacks.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 8,
          isLiked: false
        },
        {
          id: '1-2',
          author: 'Can S.',
          avatar: '👨‍💻',
          content: 'The Wi-Fi can be slow during peak hours. Consider getting a mobile hotspot as backup for important deadlines.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          likes: 12,
          isLiked: true
        }
      ],
      tags: ['METU', 'Dorm Life', 'Tips'],
      isLiked: true
    },
    {
      id: '2',
      author: 'Zehra A.',
      avatar: '👩‍🔬',
      title: 'YÖS Exam Preparation - Study Group',
      content: 'Looking for serious study partners for YÖS 2025! I\'m aiming for engineering programs and have been preparing for 6 months.\n\nMy current scores:\n📊 Math: 85/100\n📐 Geometry: 78/100\n🧠 Logic: 82/100\n\nLet\'s form a study group and share resources. Who\'s in?',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 31,
      replies: [
        {
          id: '2-1',
          author: 'Ahmad (You)',
          avatar: '🙋‍♂️',
          content: 'I\'m interested! I\'m also preparing for YÖS and targeting computer engineering. What study materials are you using?',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          likes: 5,
          isLiked: false
        }
      ],
      tags: ['YÖS', 'Study Group', 'Engineering'],
      isLiked: false
    },
    {
      id: '3',
      author: 'Emre T.',
      avatar: '🎓',
      title: 'Scholarship Application Success Stories',
      content: 'Just got accepted for Türkiye Scholarship! 🎉\n\nHere\'s what helped me:\n✅ Started application 3 months early\n✅ Got recommendation letters from professors\n✅ Wrote a compelling motivation letter\n✅ Practiced interview questions\n\nHappy to answer questions and help others!',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 67,
      replies: [],
      tags: ['Scholarships', 'Success Story', 'Türkiye Scholarship'],
      isLiked: true
    }
  ]);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleLike = (postId: string, replyId?: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        if (replyId) {
          return {
            ...post,
            replies: post.replies.map(reply => 
              reply.id === replyId 
                ? { ...reply, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1, isLiked: !reply.isLiked }
                : reply
            )
          };
        } else {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked
          };
        }
      }
      return post;
    }));
  };

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: 'Ahmad (You)',
      avatar: '🙋‍♂️',
      title: newPostTitle,
      content: newPostContent,
      timestamp: new Date(),
      likes: 0,
      replies: [],
      tags: ['Question'],
      isLiked: false
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPost(false);

    // Show "First Post" badge achievement
    setTimeout(() => {
      alert('🎉 Achievement Unlocked: First Post Badge!');
    }, 500);
  };

  const handleSubmitReply = (postId: string) => {
    if (!replyContent.trim()) return;

    const newReply: Reply = {
      id: `${postId}-${Date.now()}`,
      author: 'Ahmad (You)',
      avatar: '🙋‍♂️',
      content: replyContent,
      timestamp: new Date(),
      likes: 0,
      isLiked: false
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, replies: [...post.replies, newReply] }
        : post
    ));

    setReplyContent('');
    setReplyingTo(null);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" 
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
            <h1 className="text-2xl font-bold text-white mb-1">Community Forum</h1>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <span>👥 2.4k members</span>
              <span>📝 156 posts today</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewPost(true)}
            className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Pull to Refresh Indicator */}
      <AnimatePresence>
        {refreshing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 text-center py-4"
          >
            <div className="inline-flex items-center space-x-2 text-green-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"
              />
              <span className="text-sm">Refreshing...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Forum Posts */}
      <div 
        ref={scrollRef}
        className="relative z-10 px-6 pb-32 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto"
        onTouchStart={(e) => {
          const startY = e.touches[0].clientY;
          const handleTouchMove = (e: TouchEvent) => {
            const currentY = e.touches[0].clientY;
            const scrollTop = scrollRef.current?.scrollTop || 0;
            if (currentY - startY > 100 && scrollTop === 0) {
              handleRefresh();
            }
          };
          document.addEventListener('touchmove', handleTouchMove, { once: true });
        }}
      >
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center text-xl">
                    {post.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{post.author}</h3>
                    <p className="text-sm text-gray-400">{formatTimeAgo(post.timestamp)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Post Content */}
              <h2 className="text-lg font-bold text-white mb-3">{post.title}</h2>
              <p className="text-gray-300 mb-4 whitespace-pre-line leading-relaxed">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-colors ${
                      post.isLiked 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={post.isLiked ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm">{post.likes}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 rounded-xl transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60573 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm">{post.replies.length}</span>
                  </motion.button>
                </div>
              </div>

              {/* Replies */}
              <AnimatePresence>
                {post.replies.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 space-y-4 border-l-2 border-gray-700/50 pl-6"
                  >
                    {post.replies.map((reply) => (
                      <motion.div
                        key={reply.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-700/30 rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{reply.avatar}</span>
                            <span className="font-medium text-white text-sm">{reply.author}</span>
                            <span className="text-xs text-gray-400">{formatTimeAgo(reply.timestamp)}</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleLike(post.id, reply.id)}
                            className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs transition-colors ${
                              reply.isLiked 
                                ? 'bg-red-500/20 text-red-400' 
                                : 'bg-gray-600/50 text-gray-400 hover:bg-gray-500/50'
                            }`}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill={reply.isLiked ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
                              <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{reply.likes}</span>
                          </motion.button>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{reply.content}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reply Input */}
              <AnimatePresence>
                {replyingTo === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 border-l-2 border-blue-500/50 pl-4"
                  >
                    <div className="flex space-x-3">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write your reply..."
                        className="flex-1 p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 resize-none"
                        rows={3}
                      />
                      <div className="flex flex-col space-y-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSubmitReply(post.id)}
                          disabled={!replyContent.trim()}
                          className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setReplyingTo(null)}
                          className="p-3 bg-gray-600/50 rounded-xl"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowNewPost(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-white mb-4">Create New Post</h2>
              
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Post title..."
                className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 mb-4"
              />
              
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 resize-none mb-4"
                rows={4}
              />
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitPost}
                  disabled={!newPostTitle.trim() || !newPostContent.trim()}
                  className="flex-1 p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNewPost(false)}
                  className="px-6 py-3 bg-gray-600/50 rounded-xl text-white font-medium"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default CommunityForum;
