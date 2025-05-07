import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { useCanvas } from '../../hooks/useCanvas';
import { usePrediction } from '../../hooks/usePrediction';
import { useGameLogic } from './hooks/useGameLogic';

import StartScreen from './components/StartScreen';
import PlayingScreen from './components/PlayingScreen';
import ResultScreen from './components/ResultScreen';
import TimeoutScreen from './components/TimeoutScreen';
import DrawingCanvas from './components/DrawingCanvas';
import GameControls from './components/GameControls';

const NumberChallengeGame = forwardRef(({ 
  onCorrectGuess, 
  onWrongGuess, 
  onPredictionComplete, 
  onGameStart,
  currentScore, 
  currentStreak 
}, ref) => {
  const containerRef = useRef(null);
  
  // Use the hooks
  const { brushSize, canvasSize, canvasRef, clearCanvas, setShowDebug } = useCanvas(containerRef);
  const { prediction, loading, getPredictionFromCanvas, resetPrediction } = usePrediction();
  
  // Game logic hook
  const {
    targetDigit,
    timeLeft,
    gameStatus,
    roundResult,
    digitRotation,
    isFlipped,
    difficulty,
    blurLevel,
    difficultySettings,
    handleStartGame,
    handleNewRound,
    checkDrawing,
    resetGame,
    setDifficulty
  } = useGameLogic(
    onCorrectGuess, 
    onWrongGuess, 
    onPredictionComplete, 
    onGameStart,
    canvasRef,
    clearCanvas,
    getPredictionFromCanvas,
    resetPrediction
  );

  useImperativeHandle(ref, () => ({
    resetGame
  }));

  return (
    <motion.div
      ref={containerRef}
      className="bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Start Screen */}
      {gameStatus === 'start' && (
        <StartScreen 
          handleStartGame={handleStartGame} 
          difficulty={difficulty} 
          setDifficulty={setDifficulty} 
        />
      )}
      
      {/* Timeout Screen */}
      {gameStatus === 'timeout' && <TimeoutScreen />}
      
      {/* Playing Screen */}
      {gameStatus === 'playing' && (
        <PlayingScreen 
          targetDigit={targetDigit}
          timeLeft={timeLeft}
          digitRotation={digitRotation}
          isFlipped={isFlipped}
          blurLevel={blurLevel}
          difficultySettings={difficultySettings}
        />
      )}
      
      {/* Result Screen (Success or Failure) */}
      {(gameStatus === 'success' || gameStatus === 'fail') && roundResult && (
        <ResultScreen 
          gameStatus={gameStatus} 
          roundResult={roundResult} 
          handleNewRound={handleNewRound} 
        />
      )}

      {/* Canvas and Controls (visible for all states except start) */}
      {gameStatus !== 'start' && (
        <>
          <DrawingCanvas 
            canvasRef={canvasRef}
            brushSize={brushSize}
            canvasSize={canvasSize}
            difficultySettings={difficultySettings}
            containerRef={containerRef}
            disabled={gameStatus !== 'playing'}
          />
          
          <GameControls 
            gameStatus={gameStatus}
            clearCanvas={clearCanvas}
            checkDrawing={checkDrawing}
            loading={loading}
            currentScore={currentScore}
            currentStreak={currentStreak}
            difficultySettings={difficultySettings}
          />
        </>
      )}
    </motion.div>
  );
});

export default NumberChallengeGame;
