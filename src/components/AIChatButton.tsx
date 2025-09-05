'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const AIChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟',
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: 'شكراً لسؤالك! سأساعدك في العثور على المعلومات المناسبة حول الدراسة في تركيا.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center z-50 hover:shadow-blue-500/25"
      >
        <MessageCircle className="text-white" size={24} />
        
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">المساعد الذكي</h3>
                    <p className="text-green-400 text-xs">متصل الآن</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.isBot 
                        ? 'bg-gray-800/50 text-white' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString('ar-EG', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-700/50">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="اكتب رسالتك هنا..."
                    className="flex-1 p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="text-white" size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatButton;
