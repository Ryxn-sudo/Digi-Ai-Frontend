import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Prediction/Header';
import ModeSelector from '../components/Prediction/ModeSelector';
import DrawingCanvas from '../components/Prediction/DrawingCanvas';
import ImageUploader from '../components/Prediction/ImageUploader';
import PredictionResult from '../components/Prediction/PredictionResult';
import { useCanvas } from '../hooks/useCanvas';
import { usePrediction } from '../hooks/usePrediction';
import { useImageUpload } from '../hooks/useImageUpload';

const PredictionPage = () => {
  const [isCanvas, setIsCanvas] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [correctNumber, setCorrectNumber] = useState(null);
  const containerRef = useRef(null);
  const resultRef = useRef(null);
  
  const { prediction, loading, preprocessedImage, getPredictionFromCanvas, getPredictionFromImage, resetPrediction } = usePrediction();
  const { brushSize, setBrushSize, canvasSize, showDebug, setShowDebug, canvasRef, clearCanvas } = useCanvas(containerRef);
  const { selectedImage, handleImageUpload } = useImageUpload(resetPrediction);
  
  const scrollToResults = () => {
    if (resultRef.current) {
      setTimeout(() => {
        resultRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      }, 100); // Small delay to ensure component has rendered
    }
  };
  
  // Effect to scroll to results when prediction is available
  useEffect(() => {
    if (prediction && !loading) {
      scrollToResults();
    }
  }, [prediction, loading]);
  
  const handleCanvasPrediction = () => {
    getPredictionFromCanvas(canvasRef, showDebug);
  };
  
  const handleImagePrediction = () => {
    getPredictionFromImage(selectedImage);
  };
  
  const handleClearCanvas = () => {
    clearCanvas();
    resetPrediction();
    setShowFeedback(false);
    setFeedbackSubmitted(false);
    setCorrectNumber(null);
  };

  const handleFeedbackSubmit = () => {
    // In a real app, you would send this feedback to your backend
    console.log(`User reported that the correct number is ${correctNumber}, not ${prediction.predictedNumber}`);
    
    // Show success message
    setFeedbackSubmitted(true);
    
    // Hide feedback UI after a delay
    setTimeout(() => {
      setShowFeedback(false);
      setFeedbackSubmitted(false);
    }, 3000);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 py-10 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto">
        <Header />
        
        <ModeSelector isCanvas={isCanvas} setIsCanvas={setIsCanvas} />

        <motion.div 
          className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          ref={containerRef}
        >
          {isCanvas ? (
            <DrawingCanvas 
              canvasRef={canvasRef}
              brushSize={brushSize}
              setBrushSize={setBrushSize}
              canvasSize={canvasSize}
              showDebug={showDebug}
              setShowDebug={setShowDebug}
              clearCanvas={handleClearCanvas}
              handlePrediction={handleCanvasPrediction}
              loading={loading}
            />
          ) : (
            <ImageUploader 
              selectedImage={selectedImage}
              handleImageUpload={handleImageUpload}
              handlePrediction={handleImagePrediction}
              loading={loading}
            />
          )}

          <PredictionResult 
            prediction={prediction} 
            preprocessedImage={preprocessedImage}
            ref={resultRef} 
          />
          
          {/* Feedback UI */}
          {prediction && !loading && !showFeedback && !feedbackSubmitted && (
            <div className="mt-6 flex justify-center">
              <motion.button
                onClick={() => setShowFeedback(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Report Incorrect Prediction
              </motion.button>
            </div>
          )}
          
          {showFeedback && prediction && !feedbackSubmitted && (
            <motion.div 
              className="mt-6 p-4 bg-gray-700/80 rounded-lg border border-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-white font-medium mb-3">What number did you actually write?</h3>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-4">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <motion.button
                    key={num}
                    onClick={() => setCorrectNumber(num)}
                    className={`h-10 rounded-md flex items-center justify-center font-bold ${
                      correctNumber === num 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {num}
                  </motion.button>
                ))}
              </div>
              <div className="flex justify-between">
                <motion.button
                  onClick={() => {
                    setShowFeedback(false);
                    setCorrectNumber(null);
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleFeedbackSubmit}
                  disabled={correctNumber === null}
                  className={`px-4 py-2 rounded-lg ${
                    correctNumber !== null
                      ? 'bg-green-600 hover:bg-green-500 text-white'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
                  whileHover={correctNumber !== null ? { scale: 1.03 } : {}}
                  whileTap={correctNumber !== null ? { scale: 0.97 } : {}}
                >
                  Submit Feedback
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {feedbackSubmitted && (
            <motion.div 
              className="mt-6 p-4 bg-green-600/20 rounded-lg border border-green-500 text-green-300 flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Thank you for your feedback! This helps improve our model.
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PredictionPage;
