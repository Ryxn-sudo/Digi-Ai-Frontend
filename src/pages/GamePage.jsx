import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import NumberChallengeGame from '../components/Game/NumberChallengeGame';
import ScoreBoard from '../components/Game/ScoreBoard';
import GameInstructions from '../components/Game/GameInstructions';

const GamePage = () => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const gameRef = useRef(null);

  const handleCorrectGuess = () => {
    setScore(prevScore => prevScore + 10);
    setStreak(prevStreak => prevStreak + 1);
  };

  const handleWrongGuess = () => {
    setStreak(0);
  };

  const handleReset = () => {
    setScore(0);
    setStreak(0);
    if (gameRef.current) {
      gameRef.current.resetGame();
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <motion.button 
              className="flex items-center text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </motion.button>
          </Link>
          
          <motion.h1 
            className="text-3xl font-bold text-center text-white"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            Number Drawing Challenge
          </motion.h1>
          
          <motion.button
            onClick={() => setShowInstructions(true)}
            className="flex items-center text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info size={18} className="mr-2" />
            How to Play
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <NumberChallengeGame 
              ref={gameRef}
              onCorrectGuess={handleCorrectGuess}
              onWrongGuess={handleWrongGuess}
              currentScore={score}
              currentStreak={streak}
            />
          </div>
          
          <div>
            <ScoreBoard 
              score={score} 
              streak={streak} 
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
      
      {showInstructions && (
        <GameInstructions onClose={() => setShowInstructions(false)} />
      )}
    </motion.div>
  );
};

export default GamePage;
