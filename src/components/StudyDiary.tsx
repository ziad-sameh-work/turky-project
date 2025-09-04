'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBottomNav from './FloatingBottomNav';

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  photos: string[];
  mood: 'excited' | 'nervous' | 'confident' | 'determined' | 'happy';
  timestamp: Date;
  tags: string[];
  shared: boolean;
}

interface StudyDiaryProps {
  onBack: () => void;
}

const StudyDiary: React.FC<StudyDiaryProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: '1',
      title: 'Excited for METU!',
      content: 'Just submitted my YÖS application today! I\'ve been dreaming about studying computer engineering at METU for months. The campus looks amazing in the virtual tour, and I can\'t wait to meet other international students. Feeling nervous but mostly excited about this new chapter! 🎓',
      photos: ['📸', '🏛️', '💻'],
      mood: 'excited',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tags: ['METU', 'Application', 'YÖS'],
      shared: true
    },
    {
      id: '2',
      title: 'Study Group Success',
      content: 'Had an amazing study session with my YÖS prep group today. We solved 50 math problems and helped each other with geometry. Zehra shared some great tips for time management during the exam. Feeling more confident about the upcoming test!',
      photos: ['📚', '✏️', '👥'],
      mood: 'confident',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      tags: ['Study Group', 'YÖS Prep', 'Math'],
      shared: false
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'happy' as const,
    tags: [] as string[],
    photos: [] as string[]
  });
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const moodEmojis = {
    excited: '🤩',
    nervous: '😰',
    confident: '😎',
    determined: '💪',
    happy: '😊'
  };

  const moodColors = {
    excited: 'from-yellow-500/20 to-orange-700/20 border-yellow-500/30',
    nervous: 'from-blue-500/20 to-blue-700/20 border-blue-500/30',
    confident: 'from-purple-500/20 to-purple-700/20 border-purple-500/30',
    determined: 'from-red-500/20 to-red-700/20 border-red-500/30',
    happy: 'from-green-500/20 to-green-700/20 border-green-500/30'
  };

  const addEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      photos: newEntry.photos,
      mood: newEntry.mood,
      timestamp: new Date(),
      tags: newEntry.tags,
      shared: false
    };

    setEntries(prev => [entry, ...prev]);
    setNewEntry({ title: '', content: '', mood: 'happy', tags: [], photos: [] });
    setShowNewEntry(false);

    // Show "Storyteller" badge achievement
    setTimeout(() => {
      alert('🎉 Achievement Unlocked: Storyteller Badge!\nKeep documenting your journey!');
    }, 500);
  };

  const shareEntry = (entryId: string, platform: 'twitter' | 'instagram' | 'facebook') => {
    const entry = entries.find(e => e.id === entryId);
    if (!entry) return;

    setEntries(prev => prev.map(e => 
      e.id === entryId ? { ...e, shared: true } : e
    ));

    const shareText = `${entry.title}\n\n${entry.content.substring(0, 100)}...\n\n#TurkishStudyJourney #StudyAbroad #METU`;
    
    switch (platform) {
      case 'twitter':
        alert(`📱 Sharing to X (Twitter):\n\n"${shareText}"`);
        break;
      case 'instagram':
        alert(`📷 Sharing to Instagram:\n\n"${shareText}"`);
        break;
      case 'facebook':
        alert(`👥 Sharing to Facebook:\n\n"${shareText}"`);
        break;
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !newEntry.tags.includes(tagInput.trim())) {
      setNewEntry(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewEntry(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addPhoto = () => {
    const photoEmojis = ['📸', '🏛️', '💻', '📚', '🎓', '✏️', '📝', '🌟', '💡', '🎯'];
    const randomPhoto = photoEmojis[Math.floor(Math.random() * photoEmojis.length)];
    
    if (!newEntry.photos.includes(randomPhoto)) {
      setNewEntry(prev => ({
        ...prev,
        photos: [...prev.photos, randomPhoto]
      }));
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" 
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
            <h1 className="text-2xl font-bold text-white mb-1">Study Diary</h1>
            <p className="text-sm text-gray-400">Document your journey</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewEntry(true)}
            className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-6 mb-6"
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{entries.length}</div>
            <div className="text-gray-400 text-sm">Entries</div>
          </div>
          <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-400">{entries.filter(e => e.shared).length}</div>
            <div className="text-gray-400 text-sm">Shared</div>
          </div>
          <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{Math.floor(entries.length / 7) + 1}</div>
            <div className="text-gray-400 text-sm">Weeks</div>
          </div>
        </div>
      </motion.div>

      {/* Diary Entries */}
      <div className="relative z-10 px-6 pb-32 space-y-6">
        <AnimatePresence>
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border backdrop-blur-sm bg-gradient-to-r ${moodColors[entry.mood]}`}
            >
              {/* Entry Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">
                    {moodEmojis[entry.mood]}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{entry.title}</h3>
                    <p className="text-gray-400 text-sm">{formatDate(entry.timestamp)}</p>
                  </div>
                </div>
                {entry.shared && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
                    <span className="text-green-400 text-xs font-medium">Shared</span>
                  </div>
                )}
              </div>

              {/* Photos */}
              {entry.photos.length > 0 && (
                <div className="flex space-x-2 mb-4">
                  {entry.photos.map((photo, idx) => (
                    <div key={idx} className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
                      {photo}
                    </div>
                  ))}
                </div>
              )}

              {/* Content */}
              <p className="text-gray-200 mb-4 leading-relaxed">{entry.content}</p>

              {/* Tags */}
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {entry.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-gray-300 text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => shareEntry(entry.id, 'twitter')}
                    className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 text-sm font-medium"
                  >
                    Share to X
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => shareEntry(entry.id, 'instagram')}
                    className="px-4 py-2 bg-pink-500/20 border border-pink-500/30 rounded-xl text-pink-400 text-sm font-medium"
                  >
                    Instagram
                  </motion.button>
                </div>
                
                <div className="text-gray-400 text-sm capitalize">
                  Feeling {entry.mood}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {entries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-white font-bold text-lg mb-2">Start Your Story</h3>
            <p className="text-gray-400 text-sm">Create your first diary entry to begin documenting your study journey!</p>
          </motion.div>
        )}
      </div>

      {/* New Entry Modal */}
      <AnimatePresence>
        {showNewEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowNewEntry(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-white mb-4">New Diary Entry</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Entry title..."
                  className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50"
                />
                
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="What's on your mind? Share your thoughts, feelings, and experiences..."
                  className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 resize-none"
                  rows={4}
                />

                {/* Mood Selector */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">How are you feeling?</label>
                  <div className="flex space-x-2">
                    {Object.entries(moodEmojis).map(([mood, emoji]) => (
                      <motion.button
                        key={mood}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setNewEntry(prev => ({ ...prev, mood: mood as any }))}
                        className={`p-3 rounded-xl border transition-all ${
                          newEntry.mood === mood
                            ? 'bg-pink-500/20 border-pink-500/30'
                            : 'bg-gray-700/30 border-gray-600/30 hover:bg-gray-600/30'
                        }`}
                      >
                        <span className="text-2xl">{emoji}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Photos */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Photos</label>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addPhoto}
                      className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-lg text-pink-400 text-sm"
                    >
                      Add Photo
                    </motion.button>
                  </div>
                  {newEntry.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newEntry.photos.map((photo, idx) => (
                        <div key={idx} className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center text-xl">
                          {photo}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Tags</label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Add tag..."
                      className="flex-1 p-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addTag}
                      className="px-4 py-2 bg-pink-500/20 border border-pink-500/30 rounded-lg text-pink-400"
                    >
                      Add
                    </motion.button>
                  </div>
                  {newEntry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newEntry.tags.map((tag, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-400 text-sm cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          #{tag} ×
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addEntry}
                  disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                  className="flex-1 p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl text-white font-medium disabled:opacity-50"
                >
                  Save Entry
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNewEntry(false)}
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

export default StudyDiary;
