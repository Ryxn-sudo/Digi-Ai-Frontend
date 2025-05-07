import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, AlertTriangle } from 'lucide-react';

const ResultScreen = ({ gameStatus, roundResult, handleNewRound }) => {
  const isSuccess = gameStatus === 'success';
  
  return (
    <motion.div 
      className={`mb-6 p-4 rounded-lg ${isSuccess ? 'bg-green-900/50' : 'bg-red-900/50'}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center">
        {isSuccess ? (
          <Trophy size={24} className="text-yellow-400 mr-2" />
        ) : (
          <AlertTriangle size={24} className="text-red-400 mr-2" />
        )}
        <h3 className="text-xl font-bold text-white">{roundResult.message}</h3>
      </div>
      <p className="text-gray-300 mt-2">{roundResult.details}</p>
      
      <motion.button
        onClick={handleNewRound}
        className="mt-4 flex items-center justify-center w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Next Round
      </motion.button>
    </motion.div>
  );
};

export default ResultScreen;
