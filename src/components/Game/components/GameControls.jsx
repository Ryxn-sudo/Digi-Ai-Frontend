import React from 'react';
import { motion } from 'framer-motion';
import { Eraser, Check, Circle, Trophy } from 'lucide-react';

const GameControls = ({ 
  gameStatus, 
  clearCanvas, 
  checkDrawing, 
  loading, 
  currentScore, 
  currentStreak, 
  difficultySettings 
}) => {
  return (
    <>
      <div className="flex justify-center mt-6 space-x-3 sm:space-x-4">
        <motion.button 
          onClick={clearCanvas}
          className="px-3 sm:px-5 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-lg shadow-red-700/20 flex items-center text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={gameStatus !== 'playing'}
        >
          <Eraser className="mr-1 sm:mr-2" size={16} />
          Clear
        </motion.button>
        
        {gameStatus === 'playing' && (
          <motion.button 
            onClick={checkDrawing}
            disabled={loading}
            className="px-3 sm:px-5 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl shadow-lg shadow-green-700/20 flex items-center text-sm sm:text-base"
            whileHover={loading ? {} : { scale: 1.05 }}
            whileTap={loading ? {} : { scale: 0.95 }}
          >
            {loading ? (
              <Circle className="mr-1 sm:mr-2 animate-spin" size={16} />
            ) : (
              <Check className="mr-1 sm:mr-2" size={16} />
            )}
            {loading ? 'Checking...' : 'Submit Drawing'}
          </motion.button>
        )}
      </div>
      
      <div className="mt-6 pt-5 border-t border-gray-700">
        <div className="flex justify-between text-white">
          <div className="flex items-center">
            <Trophy size={16} className="text-yellow-400 mr-2" />
            <span className="text-gray-300">Score:</span>
            <span className="font-bold ml-2">{currentScore}</span>
            {difficultySettings.pointsMultiplier > 1 && (
              <span className="ml-2 text-xs text-emerald-400">
                {difficultySettings.pointsMultiplier}x multiplier
              </span>
            )}
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-300">Streak:</span>
            <span className="font-bold ml-2">{currentStreak}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameControls;
