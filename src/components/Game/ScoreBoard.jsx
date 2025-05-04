import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Flame, BarChart3, RefreshCw } from 'lucide-react';

const ScoreBoard = ({ score, streak, onReset, predictionHistory = [] }) => {
  const [highScore, setHighScore] = useState(0);
  const [highStreak, setHighStreak] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [totalPredictions, setTotalPredictions] = useState(0);
  const [correctPredictions, setCorrectPredictions] = useState(0);
  
  
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('numberGame_highScore', score);
    }
    
    if (streak > highStreak) {
      setHighStreak(streak);
      localStorage.setItem('numberGame_highStreak', streak);
    }
  }, [score, streak, highScore, highStreak]);
  
 
  useEffect(() => {
    if (predictionHistory && predictionHistory.length > 0) {
      
      const total = predictionHistory.length;
      const correct = predictionHistory.filter(pred => pred.isCorrect).length;
      
      setTotalPredictions(total);
      setCorrectPredictions(correct);
      
   
      localStorage.setItem('numberGame_totalPredictions', total);
      localStorage.setItem('numberGame_correctPredictions', correct);
      localStorage.setItem('numberGame_predictionHistory', JSON.stringify(predictionHistory));
    }
  }, [predictionHistory]);
  
  
  useEffect(() => {
    const loadStats = () => {
      const savedHighScore = parseInt(localStorage.getItem('numberGame_highScore') || '0');
      const savedHighStreak = parseInt(localStorage.getItem('numberGame_highStreak') || '0');
      const savedGamesPlayed = parseInt(localStorage.getItem('numberGame_gamesPlayed') || '0');
      const savedTotalPredictions = parseInt(localStorage.getItem('numberGame_totalPredictions') || '0');
      const savedCorrectPredictions = parseInt(localStorage.getItem('numberGame_correctPredictions') || '0');
      
      setHighScore(savedHighScore);
      setHighStreak(savedHighStreak);
      setGamesPlayed(savedGamesPlayed);
      setTotalPredictions(savedTotalPredictions);
      setCorrectPredictions(savedCorrectPredictions);
    };
    
    // Load initially
    loadStats();
    
    // Also set up an interval to check for updates (in case another component updates localStorage)
    const intervalId = setInterval(loadStats, 2000); // Check every 2 seconds
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleGameReset = () => {
    // Don't increment games played here since we're doing it in GamePage
    // Just call parent reset function
    onReset();
  };
  
  // Calculate model accuracy
  const accuracy = totalPredictions > 0 
    ? Math.round((correctPredictions / totalPredictions) * 100) 
    : 0;

  return (
    <motion.div 
      className="bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
        <Trophy className="text-yellow-400 mr-2" size={20} />
        Scoreboard
      </h2>
      
      <div className="space-y-4 sm:space-y-6">
        <motion.div 
          className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-4 sm:p-5 shadow-inner border border-indigo-700"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-between items-center">
            <p className="text-gray-300 font-medium flex items-center text-sm sm:text-base">
              <Award className="text-yellow-400 mr-1 sm:mr-2" size={16} />
              High Score:
            </p>
            <motion.span 
              className="text-2xl sm:text-3xl font-bold text-white"
              key={highScore}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              {highScore}
            </motion.span>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-300 font-medium flex items-center text-sm sm:text-base">
              <Flame className="text-orange-400 mr-1 sm:mr-2" size={16} />
              Best Streak:
            </p>
            <motion.span 
              className="text-2xl sm:text-3xl font-bold text-white"
              key={highStreak}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              {highStreak}
            </motion.span>
          </div>
        </motion.div>
        
        <div className="bg-gray-900 rounded-xl p-4 sm:p-5 shadow-inner border border-gray-800">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center">
            <BarChart3 className="text-blue-400 mr-2" size={16} />
            Current Game
          </h3>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400 text-xs sm:text-sm">Score</p>
              <motion.p 
                className="text-xl sm:text-2xl font-bold text-white"
                key={score}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.4 }}
              >
                {score}
              </motion.p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400 text-xs sm:text-sm">Streak</p>
              <motion.p 
                className="text-xl sm:text-2xl font-bold text-white"
                key={streak}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.4 }}
              >
                {streak}
              </motion.p>
            </div>
          </div>
          
          <div className="mt-3 bg-gray-800 p-3 rounded-lg">
            <p className="text-gray-400 text-xs sm:text-sm">Model Accuracy</p>
            <div className="flex justify-between items-center">
              <div className="w-full bg-gray-700 rounded-full h-2 mt-1 mr-3">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${accuracy}%` }}
                ></div>
              </div>
              <span className="text-white font-bold whitespace-nowrap">{accuracy}%</span>
            </div>
          </div>
        </div>
        
        <div className="pt-2 sm:pt-3">
          <div className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 text-center">
            Games Played: {gamesPlayed} | Predictions: {totalPredictions}
          </div>
          
          <motion.button
            onClick={handleGameReset}
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-xl shadow-lg flex items-center justify-center text-sm sm:text-base"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <RefreshCw size={16} className="mr-1 sm:mr-2" />
            Reset Game
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreBoard;
