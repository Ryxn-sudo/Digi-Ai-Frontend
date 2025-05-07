import React from 'react';
import { motion } from 'framer-motion';
import { Clock, RotateCw } from 'lucide-react';

const PlayingScreen = ({ targetDigit, timeLeft, digitRotation, isFlipped, blurLevel, difficultySettings }) => {
  return (
    <div className="mb-6">
      <motion.div 
        className="mb-2 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center">
          <Clock size={18} className="text-blue-400 mr-2" />
          <span className="text-white font-medium">Time left:</span>
        </div>
        <div className="flex items-center">
          <span className={`font-bold text-xl ${timeLeft < difficultySettings.timeLimit / 3 ? 'text-red-500' : 'text-white'}`}>
            {timeLeft}s
          </span>
          <span className={`ml-3 px-2 py-0.5 text-xs rounded bg-gradient-to-r ${difficultySettings.color} text-white`}>
            {difficultySettings.name}
          </span>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-gray-900 rounded-lg p-4 mb-6 text-center relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
      >
        <div className="flex items-center justify-center mb-2">
          <p className="text-gray-400">Draw this digit:</p>
          <RotateCw size={16} className="ml-2 text-purple-400" />
          <span className="text-purple-400 text-sm ml-1">{digitRotation}°</span>
          {isFlipped && <span className="text-orange-400 text-sm ml-2">(mirrored)</span>}
        </div>
        <motion.div 
          className={`text-6xl font-bold text-white inline-block ${
            blurLevel === 1 ? 'blur-[1px]' : 
            blurLevel === 2 ? 'blur-[2px]' : ''
          }`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            rotate: digitRotation,
            scaleX: isFlipped ? -1 : 1,
          }}
          key={`${targetDigit}-${digitRotation}-${isFlipped}`}
          style={{ 
            transform: `rotate(${digitRotation}deg) scaleX(${isFlipped ? -1 : 1})`,
          }}
        >
          {targetDigit}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlayingScreen;
