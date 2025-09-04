'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBottomNav from './FloatingBottomNav';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatbotProps {
  onBack: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi Ahmad! 👋 I'm here to help you with your Turkish university journey. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "What's the best university for computer engineering?",
        "Tell me about scholarships",
        "How do I prepare for YÖS exam?",
        "What are the application deadlines?"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses: { [key: string]: { text: string; suggestions?: string[] } } = {
    'computer engineering': {
      text: "🎓 For Computer Engineering, I highly recommend **Boğaziçi University**! Here's why:\n\n• **Top Ranking**: #1 in Turkey for Engineering\n• **Strong Alumni Network**: Graduates work at Google, Microsoft, and top tech companies\n• **Research Opportunities**: Cutting-edge AI and robotics labs\n• **International Recognition**: Partnerships with MIT and Stanford\n\nOther excellent options: METU, ITU, and Bilkent University.",
      suggestions: [
        "Tell me about Boğaziçi admission requirements",
        "What about METU for computer engineering?",
        "Show me scholarship opportunities",
        "Compare engineering programs"
      ]
    },
    'scholarships': {
      text: "💰 Great news! There are many scholarship opportunities:\n\n**Government Scholarships:**\n• Türkiye Scholarships (Full coverage + stipend)\n• YTB Scholarships for international students\n\n**University Scholarships:**\n• Boğaziçi Merit Scholarships (50-100% tuition)\n• METU Academic Excellence Awards\n• Bilkent Full Scholarships\n\n**Private Scholarships:**\n• Vehbi Koç Foundation\n• Sabancı Foundation Education Grants",
      suggestions: [
        "How to apply for Türkiye Scholarships?",
        "What are the scholarship requirements?",
        "Show me application deadlines",
        "Calculate my scholarship chances"
      ]
    },
    'yös exam': {
      text: "📚 YÖS (Foreign Student Exam) Preparation Guide:\n\n**Exam Structure:**\n• Mathematics: 40 questions\n• Geometry: 20 questions\n• IQ/Logic: 20 questions\n• Duration: 100 minutes\n\n**Preparation Tips:**\n• Start 6-12 months early\n• Practice daily with past papers\n• Join YÖS prep courses\n• Focus on time management\n\n**Key Dates 2025:**\n• Registration: March-April\n• Exam Date: May-June\n• Results: July",
      suggestions: [
        "Find YÖS preparation materials",
        "Show me practice tests",
        "YÖS exam centers near me",
        "Create study timeline for YÖS"
      ]
    },
    'deadlines': {
      text: "⏰ **Important Application Deadlines 2025:**\n\n**YÖS Exam:**\n• Registration: March 15 - April 30\n• Exam Date: May 25, 2025\n\n**University Applications:**\n• Early Applications: June 1-15\n• Regular Applications: July 1-31\n• Late Applications: August 1-15\n\n**Scholarship Deadlines:**\n• Türkiye Scholarships: February 20\n• University Scholarships: March-May\n\n⚠️ **Pro Tip:** Apply early for better chances!",
      suggestions: [
        "Set deadline reminders",
        "Create application timeline",
        "Check required documents",
        "Find application requirements"
      ]
    }
  };

  const generateBotResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Default response
    return {
      text: "I'd be happy to help you with that! I can assist with:\n\n• University recommendations and rankings\n• Scholarship opportunities and applications\n• YÖS exam preparation and tips\n• Application deadlines and requirements\n• Student life and accommodation\n• Study planning and timelines\n\nWhat specific topic would you like to explore?",
      suggestions: [
        "Best universities for my field",
        "Available scholarships",
        "YÖS exam preparation",
        "Application requirements"
      ]
    };
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        isUser: false,
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
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
            <h1 className="text-2xl font-bold text-white mb-1">Study Assistant</h1>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Online</span>
            </div>
          </div>

          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-xl">🤖</span>
          </div>
        </div>
      </motion.div>

      {/* Chat Messages */}
      <div className="relative z-10 flex-1 px-6 pb-32 max-h-[calc(100vh-200px)] overflow-y-auto">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                <div
                  className={`p-4 rounded-2xl ${
                    message.isUser
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white ml-4'
                      : 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-gray-100 mr-4'
                  }`}
                >
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {message.text}
                  </div>
                  <div className={`text-xs mt-2 opacity-70 ${message.isUser ? 'text-red-100' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Suggestions */}
                {message.suggestions && !message.isUser && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 mr-4"
                  >
                    <div className="text-xs text-gray-400 mb-2">Suggested questions:</div>
                    <div className="space-y-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left p-3 bg-gray-800/40 hover:bg-gray-700/60 border border-gray-700/30 rounded-xl text-sm text-gray-300 transition-colors"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 flex justify-start"
            >
              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 p-4 rounded-2xl mr-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-20 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent"
      >
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder="Ask me anything about studying in Turkey..."
              className="w-full p-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || isTyping}
            className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </motion.div>

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

export default Chatbot;
