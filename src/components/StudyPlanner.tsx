'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingBottomNav } from './FloatingBottomNav';

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'exam' | 'application' | 'document' | 'preparation';
}

interface StudyPlannerProps {
  onBack: () => void;
}

const StudyPlanner: React.FC<StudyPlannerProps> = ({ onBack }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Submit YÖS Application',
      description: 'Complete and submit YÖS exam registration',
      deadline: new Date('2025-04-30'),
      completed: false,
      priority: 'high',
      category: 'exam'
    },
    {
      id: '2',
      title: 'Prepare YÖS Math',
      description: 'Complete math preparation for YÖS exam',
      deadline: new Date('2025-05-20'),
      completed: false,
      priority: 'high',
      category: 'preparation'
    },
    {
      id: '3',
      title: 'University Applications',
      description: 'Submit applications to target universities',
      deadline: new Date('2025-07-31'),
      completed: false,
      priority: 'medium',
      category: 'application'
    },
    {
      id: '4',
      title: 'Scholarship Applications',
      description: 'Apply for Türkiye Scholarships',
      deadline: new Date('2025-02-20'),
      completed: true,
      priority: 'high',
      category: 'application'
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium' as const,
    category: 'preparation' as const
  });
  const [showNewTask, setShowNewTask] = useState(false);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (!newTask.title.trim() || !newTask.deadline) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      deadline: new Date(newTask.deadline),
      completed: false,
      priority: newTask.priority,
      category: newTask.category
    };

    setTasks(prev => [...prev, task]);
    setNewTask({ title: '', description: '', deadline: '', priority: 'medium', category: 'preparation' });
    setShowNewTask(false);
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500/20 to-red-700/20 border-red-500/30 text-red-400';
      case 'medium': return 'from-yellow-500/20 to-yellow-700/20 border-yellow-500/30 text-yellow-400';
      case 'low': return 'from-green-500/20 to-green-700/20 border-green-500/30 text-green-400';
      default: return 'from-gray-500/20 to-gray-700/20 border-gray-500/30 text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exam': return '📝';
      case 'application': return '📋';
      case 'document': return '📄';
      case 'preparation': return '📚';
      default: return '📌';
    }
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" 
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
            <h1 className="text-2xl font-bold text-white mb-1">Study Planner</h1>
            <p className="text-sm text-gray-400">Track your application timeline</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewTask(true)}
            className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-6 mb-6"
      >
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Overall Progress</h2>
            <div className="text-2xl font-bold text-teal-400">{Math.round(progressPercentage)}%</div>
          </div>
          
          <div className="w-full bg-gray-700/50 rounded-full h-3 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-white">{completedTasks}</div>
              <div className="text-gray-400 text-sm">Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-teal-400">{totalTasks - completedTasks}</div>
              <div className="text-gray-400 text-sm">Remaining</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tasks Timeline */}
      <div className="relative z-10 px-6 pb-32">
        <h3 className="text-lg font-bold text-white mb-4">Upcoming Tasks</h3>
        <div className="space-y-4">
          {tasks
            .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
            .map((task, index) => {
              const daysUntil = getDaysUntil(task.deadline);
              const isOverdue = daysUntil < 0;
              
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-2xl border transition-all ${
                    task.completed 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : isOverdue
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-gray-800/80 border-gray-700/50'
                  } backdrop-blur-sm`}
                >
                  <div className="flex items-start space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleTask(task.id)}
                      className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-500 hover:border-teal-400'
                      }`}
                    >
                      {task.completed && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </motion.button>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{getCategoryIcon(task.category)}</span>
                          <h4 className={`font-medium ${task.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                            {task.title}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs bg-gradient-to-r ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isOverdue 
                              ? 'bg-red-500/20 text-red-400' 
                              : daysUntil <= 7
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {isOverdue ? 'Overdue' : daysUntil === 0 ? 'Today' : `${daysUntil} days`}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-2">{task.description}</p>
                      <p className="text-gray-500 text-xs">Due: {task.deadline.toLocaleDateString()}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* New Task Modal */}
      <AnimatePresence>
        {showNewTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowNewTask(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-white mb-4">Add New Task</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Task title..."
                  className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-teal-500/50"
                />
                
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description..."
                  className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-teal-500/50 resize-none"
                  rows={3}
                />
                
                <input
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-teal-500/50"
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-teal-500/50"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value as any }))}
                    className="p-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-teal-500/50"
                  >
                    <option value="preparation">Preparation</option>
                    <option value="exam">Exam</option>
                    <option value="application">Application</option>
                    <option value="document">Document</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addTask}
                  disabled={!newTask.title.trim() || !newTask.deadline}
                  className="flex-1 p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl text-white font-medium disabled:opacity-50"
                >
                  Add Task
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNewTask(false)}
                  className="px-6 py-3 bg-gray-600/50 rounded-xl text-white font-medium"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingBottomNav
        activeTab="search"
        onTabChange={(tabId) => {
          if (tabId === 'home') {
            onBack();
          }
        }}
        variant="dashboard"
      />
    </div>
  );
};

export default StudyPlanner;
