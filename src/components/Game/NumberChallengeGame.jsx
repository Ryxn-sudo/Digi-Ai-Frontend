import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { motion } from 'framer-motion';
import { 
  Eraser, Check, X, AlertTriangle, Circle, Clock, Trophy
} from 'lucide-react';
import { useCanvas } from '../../hooks/useCanvas';
import { usePrediction } from '../../hooks/usePrediction';

const NumberChallengeGame = forwardRef(({ onCorrectGuess, onWrongGuess, currentScore, currentStreak }, ref) => {
  const [targetDigit, setTargetDigit] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStatus, setGameStatus] = useState('waiting'); // waiting, playing, success, fail
  const [roundResult, setRoundResult] = useState(null);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  
  // Use the hooks instead of direct state/refs
  const { brushSize, canvasSize, canvasRef, clearCanvas, setShowDebug } = useCanvas(containerRef);
  const { prediction, loading, getPredictionFromCanvas, resetPrediction } = usePrediction();

  useImperativeHandle(ref, () => ({
    resetGame: () => {
      handleNewRound();
    }
  }));

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    setTimeLeft(30);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          if (gameStatus === 'playing') {
            setGameStatus('fail');
            setRoundResult({ 
              message: "Time's up!", 
              details: "You ran out of time." 
            });
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const generateRandomDigit = () => {
    return Math.floor(Math.random() * 10);
  };

  const handleNewRound = () => {
    clearCanvas();
    resetPrediction();
    
    const newDigit = generateRandomDigit();
    setTargetDigit(newDigit);
    setGameStatus('playing');
    setRoundResult(null);
    startTimer();
  };

  const checkDrawing = async () => {
    if (!canvasRef.current) return;
    
    try {
      // Get prediction result directly from the function call
      const result = await getPredictionFromCanvas(canvasRef, true);
      
      if (!result) return;
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      const predictedDigit = parseInt(result.prediction);
      
      if (predictedDigit === targetDigit) {
        setGameStatus('success');
        setRoundResult({
          message: "Correct!",
          details: `You correctly drew the digit ${targetDigit}!`,
          prediction: predictedDigit
        });
        onCorrectGuess();
      } else {
        setGameStatus('fail');
        setRoundResult({
          message: "Not quite right",
          details: `The AI recognized your drawing as ${predictedDigit}, not ${targetDigit}.`,
          prediction: predictedDigit
        });
        onWrongGuess();
      }
      
    } catch (error) {
      console.error('Error predicting digit:', error);
      setGameStatus('fail');
      setRoundResult({
        message: "Error",
        details: "Could not recognize your drawing. Please try again.",
      });
    } finally {
      clearInterval(timerRef.current);
    }
  };

  // Initial game start
  React.useEffect(() => {
    if (targetDigit === null) {
      handleNewRound();
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {gameStatus === 'playing' && (
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
            <span className={`font-bold text-xl ${timeLeft < 10 ? 'text-red-500' : 'text-white'}`}>
              {timeLeft}s
            </span>
          </motion.div>
          
          <motion.div 
            className="bg-gray-900 rounded-lg p-4 mb-6 text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <p className="text-gray-400 mb-2">Draw this digit:</p>
            <motion.div 
              className="text-6xl font-bold text-white"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              key={targetDigit} // Ensure animation runs on digit change
            >
              {targetDigit}
            </motion.div>
          </motion.div>
        </div>
      )}
      
      {(gameStatus === 'success' || gameStatus === 'fail') && roundResult && (
        <motion.div 
          className={`mb-6 p-4 rounded-lg ${gameStatus === 'success' ? 'bg-green-900/50' : 'bg-red-900/50'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            {gameStatus === 'success' ? (
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
      )}

      <motion.div 
        className="bg-white rounded-xl p-1  mx-auto  shadow-xl"
        style={{ width: canvasSize.width + 6 }}
        whileHover={{ boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)" }}
      >
        <CanvasDraw
          ref={canvasRef}
          brushColor="#000000"
          brushRadius={brushSize}
          canvasWidth={canvasSize.width}
          canvasHeight={canvasSize.height}
          backgroundColor="#FFFFFF"
          hideGrid={true}
          lazyRadius={0}
          immediateLoading={true}
          disabled={gameStatus !== 'playing'}
        />
      </motion.div>
      
      <div className="flex justify-center mt-6 space-x-4">
        <motion.button 
          onClick={clearCanvas}
          className="px-5 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-lg shadow-red-700/20 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={gameStatus !== 'playing'}
        >
          <Eraser className="mr-2" size={18} />
          Clear
        </motion.button>
        
        {gameStatus === 'playing' && (
          <motion.button 
            onClick={checkDrawing}
            disabled={loading}
            className="px-5 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl shadow-lg shadow-green-700/20 flex items-center"
            whileHover={loading ? {} : { scale: 1.05 }}
            whileTap={loading ? {} : { scale: 0.95 }}
          >
            {loading ? (
              <Circle className="mr-2 animate-spin" size={18} />
            ) : (
              <Check className="mr-2" size={18} />
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
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-300">Streak:</span>
            <span className="font-bold ml-2">{currentStreak}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default NumberChallengeGame;
