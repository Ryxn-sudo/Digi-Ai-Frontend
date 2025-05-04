import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, BarChart3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import NumberChallengeGame from '../components/Game/NumberChallengeGame';
import ScoreBoard from '../components/Game/ScoreBoard';
import GameInstructions from '../components/Game/GameInstructions';

const GamePage = () => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const gameRef = useRef(null);
  const navigate = useNavigate();
  
 
  useEffect(() => {
   
    if (!localStorage.getItem('numberGame_gamesPlayed')) {
      localStorage.setItem('numberGame_gamesPlayed', '0');
    }
  }, []);

  const handleCorrectGuess = () => {
    setScore(prevScore => prevScore + 10);
    setStreak(prevStreak => prevStreak + 1);
  };

  const handleWrongGuess = () => {
    setStreak(0);
  };

  const handlePredictionComplete = (predictionData) => {
    setPredictionHistory(prev => {
      // Add the new prediction to history
      const updatedHistory = [...prev, predictionData];
      
      // Keep only the last 50 predictions to avoid localStorage size issues
      const limitedHistory = updatedHistory.slice(-50);
      
      return limitedHistory;
    });
  };

  const handleGameStart = () => {
    if (!gameActive) {
      setGameActive(true);
      // Increment games played when a game starts
      const currentGamesPlayed = parseInt(localStorage.getItem('numberGame_gamesPlayed') || '0');
      localStorage.setItem('numberGame_gamesPlayed', (currentGamesPlayed + 1).toString());
    }
  };

  const handleReset = () => {
    // Increment games played on manual reset too
    const currentGamesPlayed = parseInt(localStorage.getItem('numberGame_gamesPlayed') || '0');
    localStorage.setItem('numberGame_gamesPlayed', (currentGamesPlayed + 1).toString());
    
    setScore(0);
    setStreak(0);
    setGameActive(false);
    
    if (gameRef.current) {
      gameRef.current.resetGame();
    }
  };
  
  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-8 gap-3">
          <Link to="/">
            <motion.button 
              className="flex items-center text-white bg-gray-800 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={16} className="mr-1 sm:mr-2" />
              Back
            </motion.button>
          </Link>
          
          <motion.h1 
            className="text-xl sm:text-3xl font-bold text-center text-white order-first w-full sm:w-auto sm:order-none"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            Number Drawing Challenge
          </motion.h1>
          
          <motion.button
            onClick={() => setShowInstructions(true)}
            className="flex items-center text-white bg-indigo-600 px-3 sm:px-4 py-2 rounded-lg hover:bg-indigo-500 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info size={16} className="mr-1 sm:mr-2" />
            How to Play
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2">
            <NumberChallengeGame 
              ref={gameRef}
              onCorrectGuess={handleCorrectGuess}
              onWrongGuess={handleWrongGuess}
              onPredictionComplete={handlePredictionComplete}
              onGameStart={handleGameStart}
              currentScore={score}
              currentStreak={streak}
            />
          </div>
          
          <div>
            <ScoreBoard 
              score={score} 
              streak={streak} 
              onReset={handleReset}
              predictionHistory={predictionHistory}
            />
            
            <motion.button
              onClick={handleViewDashboard}
              className="w-full mt-4 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg flex items-center justify-center text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <BarChart3 size={16} className="mr-1 sm:mr-2" />
              View Dashboard
            </motion.button>
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
