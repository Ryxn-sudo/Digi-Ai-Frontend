import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Play } from 'lucide-react';
import { DIFFICULTY_PRESETS } from '../constants/difficultySettings';

const StartScreen = ({ handleStartGame, difficulty, setDifficulty }) => {
  const handleChangeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <motion.div
      className="text-center py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring" }}
      >
        <Pencil size={40} className="text-white" />
      </motion.div>
      
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Number Drawing Challenge</h2>
      <p className="text-gray-300 mb-8 max-w-md mx-auto">
        Test your drawing skills! Draw the displayed digit and see if the AI can recognize it correctly.
      </p>
      
      <div className="mb-8 max-w-md mx-auto">
        <h3 className="text-white font-medium mb-3">Select Difficulty:</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(DIFFICULTY_PRESETS).map(([key, value]) => (
            <motion.button
              key={key}
              onClick={() => handleChangeDifficulty(key)}
              className={`px-3 py-2 rounded-lg flex items-center justify-center text-white text-sm
                bg-gradient-to-r ${value.color} ${difficulty === key ? 'ring-2 ring-white' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {value.icon}
              {value.name}
            </motion.button>
          ))}
        </div>
      </div>
      
      <motion.button
        onClick={handleStartGame}
        className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-medium rounded-xl shadow-lg shadow-green-700/20 flex items-center justify-center mx-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Play className="mr-2" size={20} />
        Start Game
      </motion.button>
    </motion.div>
  );
};

export default StartScreen;
