import { useState, useRef, useEffect } from 'react';
import { DIFFICULTY_PRESETS } from '../constants/difficultySettings';

export const useGameLogic = (onCorrectGuess, onWrongGuess, onPredictionComplete, onGameStart, canvasRef, clearCanvas, getPredictionFromCanvas, resetPrediction) => {
  const [targetDigit, setTargetDigit] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStatus, setGameStatus] = useState('start'); // start, playing, success, fail, timeout
  const [roundResult, setRoundResult] = useState(null);
  const [recentDigits, setRecentDigits] = useState([]);
  const [digitRotation, setDigitRotation] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [blurLevel, setBlurLevel] = useState(0);
  
  const timerRef = useRef(null);
  
  
  const difficultySettings = DIFFICULTY_PRESETS[difficulty];

  
  const generateRandomDigit = () => {
    
    const allDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    
    let availableDigits = allDigits;
    
    if (recentDigits.length > 0) {
     
      const mostRecent = recentDigits[recentDigits.length - 1];
      availableDigits = allDigits.filter(d => d !== mostRecent);
      
     
      if (recentDigits.length >= 3 && availableDigits.length > 3) {
        
        const recentSet = new Set(recentDigits.slice(-3));
        
       
        const notRecentlyUsed = availableDigits.filter(d => !recentSet.has(d));
        
        if (notRecentlyUsed.length >= 3) {
          availableDigits = notRecentlyUsed;
        }
      }
    }
    
    // Select a random digit from the available options
    const randomIndex = Math.floor(Math.random() * availableDigits.length);
    const newDigit = availableDigits[randomIndex];
    
    // Update recent digits history
    setRecentDigits(prev => {
      const updated = [...prev, newDigit];
      return updated.slice(-5); // Keep only last 5 digits in history
    });
    
    return newDigit;
  };

  // Generate a random rotation angle based on difficulty
  const generateRandomRotation = () => {
    const maxRotation = difficultySettings.rotationRange;
    return Math.floor(Math.random() * (maxRotation * 2 + 1)) - maxRotation;
  };
  
  // Determine if digit should be flipped based on difficulty
  const shouldFlipDigit = () => {
    return Math.random() < difficultySettings.flipChance;
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Set time based on difficulty
    setTimeLeft(difficultySettings.timeLimit);
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        // When timer reaches zero
        if (prevTime <= 1) {
          // Important: Clear the interval immediately to prevent multiple executions
          clearInterval(timerRef.current);
          timerRef.current = null;
          
          // Handle timeout in a separate function to ensure it runs
          handleTimeOut();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Separate function to handle timeout
  const handleTimeOut = () => {
    console.log("Time's up! Handling timeout...");
    
    // Update game status and show result
    setGameStatus('timeout');
    setRoundResult({ 
      message: "Time's up!", 
      details: "You ran out of time." 
    });
    
    // Call callback to break the streak
    if (onWrongGuess) onWrongGuess();
    
    // Set a timeout to return to start screen
    setTimeout(() => {
      console.log("Returning to start screen after timeout");
      setGameStatus('start');
      clearCanvas();
      resetPrediction();
    }, 3000);
  };

  const handleStartGame = () => {
    clearCanvas();
    resetPrediction();
    
    const newDigit = generateRandomDigit();
    const newRotation = generateRandomRotation();
    const newIsFlipped = shouldFlipDigit();
    
    setTargetDigit(newDigit);
    setDigitRotation(newRotation);
    setIsFlipped(newIsFlipped);
    setBlurLevel(difficultySettings.blurLevel);
    setGameStatus('playing');
    setRoundResult(null);
    startTimer();
    
    // Call the onGameStart callback
    if (onGameStart) {
      onGameStart();
    }
  };

  const handleNewRound = () => {
    clearCanvas();
    resetPrediction();
    
    const newDigit = generateRandomDigit();
    const newRotation = generateRandomRotation();
    const newIsFlipped = shouldFlipDigit();
    
    setTargetDigit(newDigit);
    setDigitRotation(newRotation);
    setIsFlipped(newIsFlipped);
    setBlurLevel(difficultySettings.blurLevel);
    setGameStatus('playing');
    setRoundResult(null);
    startTimer();
  };

  const resetGame = () => {
    setGameStatus('start');
    if (timerRef.current) clearInterval(timerRef.current);
    clearCanvas();
    resetPrediction();
    setRoundResult(null);
    setRecentDigits([]);
    setDigitRotation(0);
    setIsFlipped(false);
    setBlurLevel(0);
  };

  const checkDrawing = async () => {
    if (!canvasRef.current) return;
    
    try {
      // Get prediction result directly from the function call
      // Pass the rotation angle and flip status to process the image before prediction
      const result = await getPredictionFromCanvas(canvasRef, true, {
        rotation: digitRotation,
        flipped: isFlipped
      });
      
      if (!result) return;
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      const predictedDigit = parseInt(result.prediction);
      const isCorrect = predictedDigit === targetDigit;
      
      // Store prediction details for analytics
      const predictionData = {
        targetDigit,
        predictedDigit,
        isCorrect,
        timestamp: new Date().toISOString(),
        confidence: result.confidence || 0,
        rotation: digitRotation,
        flipped: isFlipped,
        difficulty: difficulty,
        pointsEarned: isCorrect ? (10 * difficultySettings.pointsMultiplier) : 0
      };
      
      // Call the onPredictionComplete callback with prediction data
      if (onPredictionComplete) {
        onPredictionComplete(predictionData);
      }
      
      if (isCorrect) {
        // Award points based on difficulty multiplier
        onCorrectGuess(difficultySettings.pointsMultiplier);
        
        setGameStatus('success');
        setRoundResult({
          message: "Correct!",
          details: `You correctly drew the digit ${targetDigit}!`,
          prediction: predictedDigit,
          confidence: result.confidence,
          pointsEarned: 10 * difficultySettings.pointsMultiplier
        });
      } else {
        setGameStatus('fail');
        setRoundResult({
          message: "Not quite right",
          details: `The AI recognized your drawing as ${predictedDigit}, not ${targetDigit}.`,
          prediction: predictedDigit,
          confidence: result.confidence
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

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
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
  };
};
