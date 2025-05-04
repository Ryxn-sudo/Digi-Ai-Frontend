import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 backdrop-blur-md"
            style={{
              width: `${Math.random() * 15 + 5}rem`,
              height: `${Math.random() * 15 + 5}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 0
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [1, 1.2, 1], 
              rotate: [0, Math.random() * 360],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: Math.random() * 10 + 20, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Handwritten Digit <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">Recognition</span> & Analysis
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              An AI-powered platform for recognizing handwritten digits, playing interactive learning games, and contributing to machine learning model improvement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/game">
                <motion.button
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-lg font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Play the Game
                  <ArrowRight className="ml-2" size={18} />
                </motion.button>
              </Link>
              <Link to="/">
                <motion.button
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white rounded-lg text-lg font-medium"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Try Recognition
                </motion.button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Stylized image of handwritten digits and neural network */}
            <div className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl shadow-indigo-500/20">
              <img 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="AI Digit Recognition" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/80 to-purple-900/40 backdrop-blur-sm flex flex-col justify-end p-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">7</div>
                    <div>
                      <div className="text-sm text-gray-300">Predicted:</div>
                      <div className="text-white font-bold text-xl">Seven (99.8%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-8 -right-8 bg-purple-600/80 backdrop-blur-md rounded-xl p-3 shadow-lg border border-purple-500/50"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="text-white text-sm">Neural Network</div>
              <div className="text-xs text-purple-200">98.5% Accuracy</div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 -left-6 bg-indigo-600/80 backdrop-blur-md rounded-xl p-3 shadow-lg border border-indigo-500/50"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="text-white text-sm">MNIST Dataset</div>
              <div className="text-xs text-indigo-200">Training Complete</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
