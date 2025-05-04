import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Info, Clock, Award, Target } from 'lucide-react';

const GameInstructions = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-gray-800 rounded-2xl w-full max-w-2xl p-4 sm:p-6 shadow-2xl border border-purple-800 my-4 sm:my-0"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
              <Info className="text-blue-400 mr-2" size={20} />
              How to Play
            </h2>
            
            <motion.button 
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 sm:p-2"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <X size={24} />
            </motion.button>
          </div>
          
          <div className="space-y-4 sm:space-y-6 text-gray-200 overflow-y-auto max-h-[70vh]">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center">
                <Target className="text-green-400 mr-2" size={18} />
                Game Objective
              </h3>
              <p className="text-sm sm:text-base">
                Draw the shown number as clearly as possible. The AI will analyze your drawing and 
                determine if it matches the target digit.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
                <Clock className="text-yellow-400 mr-2" size={18} />
                Game Rules
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li className="flex">
                  <Check size={16} className="text-green-400 mr-2 shrink-0 mt-0.5" />
                  <span>You have 30 seconds to draw each digit</span>
                </li>
                <li className="flex">
                  <Check size={16} className="text-green-400 mr-2 shrink-0 mt-0.5" />
                  <span>Draw in the white canvas area with your mouse or touch input</span>
                </li>
                <li className="flex">
                  <Check size={16} className="text-green-400 mr-2 shrink-0 mt-0.5" />
                  <span>Click "Submit Drawing" when you're ready to check your answer</span>
                </li>
                <li className="flex">
                  <Check size={16} className="text-green-400 mr-2 shrink-0 mt-0.5" />
                  <span>Earn 10 points for each correct guess</span>
                </li>
                <li className="flex">
                  <Check size={16} className="text-green-400 mr-2 shrink-0 mt-0.5" />
                  <span>Build a streak by getting consecutive answers correct</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center">
                <Award className="text-purple-400 mr-2" size={18} />
                Tips for Success
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-300">
                <li>Draw the digit clearly in the center of the canvas</li>
                <li>Use thick, solid strokes for better recognition</li>
                <li>Don't rush - accuracy is more important than speed</li>
                <li>Draw the digits similarly to how they appear in textbooks</li>
              </ul>
            </div>
            
            <motion.button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg mt-4"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Let's Play!
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameInstructions;
