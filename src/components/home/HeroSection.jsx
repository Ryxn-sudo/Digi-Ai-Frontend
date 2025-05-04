import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart, Brain, Users } from 'lucide-react';

const HeroSection = () => {
  const [currentDigit, setCurrentDigit] = useState(7);
  const [confidence, setConfidence] = useState(99.8);
  
  // Cycle through different digits for the demo
  useEffect(() => {
    const timer = setInterval(() => {
      const newDigit = Math.floor(Math.random() * 10);
      setCurrentDigit(newDigit);
      setConfidence(95 + Math.random() * 4.9);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);
  
  const numberToWord = (num) => {
    const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    return words[num];
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md"
            style={{
              width: `${Math.random() * 20 + 5}rem`,
              height: `${Math.random() * 20 + 5}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 0
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [1, 1.2, 1], 
              rotate: [0, Math.random() * 360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: Math.random() * 10 + 15, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        ))}
        
        {/* Binary code background effect */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute text-xs text-white whitespace-nowrap opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 90 - 45}deg)`
              }}
            >
              {Array.from({length: 20}, () => Math.floor(Math.random() * 2)).join(' ')}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
              Handwritten Digit{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">Recognition</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-300"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                ></motion.span>
              </span>
              {' '}& Analysis
            </h1>
            
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-lg leading-relaxed">
              An AI-powered platform for recognizing handwritten digits, playing interactive learning games, and contributing to machine learning model improvement.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/game">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-lg font-medium flex items-center justify-center shadow-lg shadow-indigo-600/30"
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 25px -5px rgb(79 70 229 / 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Play the Game
                  <ArrowRight className="ml-2" size={18} />
                </motion.button>
              </Link>
              
              <Link to="/predict">
                <motion.button
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white rounded-xl text-lg font-medium shadow-lg shadow-purple-900/20"
                  whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Try Recognition
                </motion.button>
              </Link>
            </div>
            
            {/* Stats indicators */}
            <div className="mt-12 flex flex-wrap gap-6">
              {[
                { icon: <Users size={18} />, text: "40+ Users" },
                { icon: <BarChart size={18} />, text: "90.7% Accuracy" },
                { icon: <Brain size={18} />, text: "Neural Network" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                >
                  <span className="mr-2">{stat.icon}</span>
                  {stat.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Stylized image of handwritten digits and neural network */}
            <div className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl shadow-indigo-500/20 backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="AI Digit Recognition" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/95 via-indigo-900/70 to-purple-900/40 backdrop-blur-sm flex flex-col justify-end p-6 md:p-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 shadow-xl transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-center space-x-5">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentDigit}
                        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                        transition={{ duration: 0.5 }}
                        className="h-14 w-14 md:h-16 md:w-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                      >
                        {currentDigit}
                      </motion.div>
                    </AnimatePresence>
                    <div>
                      <div className="text-sm text-gray-300">Predicted:</div>
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={currentDigit}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="text-white font-bold text-xl md:text-2xl"
                        >
                          {numberToWord(currentDigit)} ({confidence.toFixed(1)}%)
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-8 -right-8 bg-gradient-to-br from-purple-600/80 to-purple-800/80 backdrop-blur-md rounded-xl p-3 md:p-4 shadow-lg border border-purple-500/50"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <div className="text-white text-sm md:text-base font-medium">Neural Network</div>
              <div className="text-xs md:text-sm text-purple-200">98.5% Accuracy</div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 -left-6 bg-gradient-to-br from-indigo-600/80 to-indigo-800/80 backdrop-blur-md rounded-xl p-3 md:p-4 shadow-lg border border-indigo-500/50"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ y: 5, scale: 1.05 }}
            >
              <div className="text-white text-sm md:text-base font-medium">MNIST Dataset</div>
              <div className="text-xs md:text-sm text-indigo-200">Training Complete</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
