import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Flame, BarChart3, RefreshCw } from 'lucide-react';

const ScoreBoard = ({ score, streak, onReset }) => {
  const [highScore, setHighScore] = useState(0);
  const [highStreak, setHighStreak] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  
  // Update high score and streak when current values change
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('numberGame_highScore', score);
    }
    
    if (streak > highStreak) {
      setHighStreak(streak);
      localStorage.setItem('numberGame_highStreak', streak);
    }
  }, [score, streak]);
  
  // Load saved stats from localStorage on component mount
  useEffect(() => {
    const savedHighScore = parseInt(localStorage.getItem('numberGame_highScore') || '0');
    const savedHighStreak = parseInt(localStorage.getItem('numberGame_highStreak') || '0');
    const savedGamesPlayed = parseInt(localStorage.getItem('numberGame_gamesPlayed') || '0');
    
    setHighScore(savedHighScore);
    setHighStreak(savedHighStreak);
    setGamesPlayed(savedGamesPlayed);
  }, []);
  
  const handleGameReset = () => {
    // Increment games played counter
    const newGamesPlayed = gamesPlayed + 1;
    setGamesPlayed(newGamesPlayed);
    localStorage.setItem('numberGame_gamesPlayed', newGamesPlayed);
    
    // Call parent reset function
    onReset();
  };

  return (
    <motion.div 
      className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
        <Trophy className="text-yellow-400 mr-2" />
        Scoreboard
      </h2>
      
      <div className="space-y-6">
        <motion.div 
          className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-5 shadow-inner border border-indigo-700"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-between items-center">
            <p className="text-gray-300 font-medium flex items-center">
              <Award className="text-yellow-400 mr-2" size={18} />
              High Score:
            </p>
            <motion.span 
              className="text-3xl font-bold text-white"
              key={highScore}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              {highScore}
            </motion.span>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-300 font-medium flex items-center">
              <Flame className="text-orange-400 mr-2" size={18} />
              Best Streak:
            </p>
            <motion.span 
              className="text-3xl font-bold text-white"
              key={highStreak}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              {highStreak}
            </motion.span>
          </div>
        </motion.div>
        
        <div className="bg-gray-900 rounded-xl p-5 shadow-inner border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center">
            <BarChart3 className="text-blue-400 mr-2" size={18} />
            Current Game
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Score</p>
              <motion.p 
                className="text-2xl font-bold text-white"
                key={score}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.4 }}
              >
                {score}
              </motion.p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Streak</p>
              <motion.p 
                className="text-2xl font-bold text-white"
                key={streak}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.4 }}
              >
                {streak}
              </motion.p>
            </div>
          </div>
        </div>
        
        <div className="pt-3">
          <div className="text-gray-400 text-sm mb-4 text-center">
            Games Played: {gamesPlayed}
          </div>
          
          <motion.button
            onClick={handleGameReset}
            className="w-full py-3 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-xl shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <RefreshCw size={18} className="mr-2" />
            Reset Game
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreBoard;
