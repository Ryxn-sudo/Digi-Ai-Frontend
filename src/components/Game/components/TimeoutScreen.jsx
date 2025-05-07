import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const TimeoutScreen = () => {
  return (
    <motion.div 
      className="mb-6 p-5 rounded-lg bg-red-900/70 border-2 border-red-500"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { type: "spring" } }}
    >
      <motion.div 
        className="flex flex-col items-center text-center"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1, repeat: 3 }}
      >
        <motion.div 
          className="w-20 h-20 mb-4 bg-red-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: 6 }}
        >
          <Clock size={40} className="text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">Time's Up!</h3>
        <p className="text-gray-200 mb-4">Your streak has been reset.</p>
        <p className="text-gray-300">Returning to game menu...</p>
      </motion.div>
    </motion.div>
  );
};

export default TimeoutScreen;
