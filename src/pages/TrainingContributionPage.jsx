import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, RefreshCw, Check, Info } from 'lucide-react';
import CanvasDraw from 'react-canvas-draw'; 
import { submitTrainingData, getContributionStatus } from '../services/api';

const TrainingContributionPage = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null); // Reference for CanvasDraw
  const [selectedDigit, setSelectedDigit] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contributionStatus, setContributionStatus] = useState({
    unprocessed_contributions: 0,
    next_retrain_target: 50
  });
  const [isLoading, setIsLoading] = useState(true);
  const [canvasReady, setCanvasReady] = useState(false);
  const [brushSize, setBrushSize] = useState(8);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });
  // Add state for debug mode and processed image
  const [showDebug, setShowDebug] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  
  // Detect container size for responsive canvas - use maximum available width but fixed height
  useEffect(() => {
    if (containerRef.current) {
      const updateCanvasSize = () => {
       
        const containerWidth = containerRef.current.offsetWidth;
        
        const width = Math.max(280, containerWidth - 66);
        setCanvasSize({ width, height: 400 });
      };
      
      updateCanvasSize();
      window.addEventListener('resize', updateCanvasSize);
      return () => window.removeEventListener('resize', updateCanvasSize);
    }
  }, []);
  
  // Preprocess canvas image exactly as done in PredictionPage but with 32x32 format
  const preprocessCanvasImage = () => {
    if (!canvasRef.current) return null;
    
    try {
      // Get raw image data from canvas
      const rawImageData = canvasRef.current.getDataURL('png', false);
      
      return new Promise((resolve) => {
        // Create a temporary image element
        const img = new Image();
        img.onload = () => {
          // Create an off-screen canvas for processing
          const processCanvas = document.createElement('canvas');
          processCanvas.width = 32; // Using 32x32 as specified
          processCanvas.height = 32;
          const ctx = processCanvas.getContext('2d');
          
          // Fill with white background (digit recognition typically uses white background)
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, processCanvas.width, processCanvas.height);
          
          // Calculate the center and scale of the image
          const scale = Math.min(
            processCanvas.width / img.width,
            processCanvas.height / img.height
          ) * 0.8; // Add some padding around the digit
          
          const offsetX = (processCanvas.width - img.width * scale) / 2;
          const offsetY = (processCanvas.height - img.height * scale) / 2;
          
          // Draw the image with black pixels on white background
          ctx.beginPath();
          ctx.fillStyle = 'black';
          ctx.drawImage(
            img, 
            0, 0, img.width, img.height,
            offsetX, offsetY, img.width * scale, img.height * scale
          );
          
          // Enhanced processing to improve contrast and clarity
          const imageData = ctx.getImageData(0, 0, processCanvas.width, processCanvas.height);
          const data = imageData.data;
          
          // Threshold adjustment for better recognition
          for (let i = 0; i < data.length; i += 4) {
            // Convert to grayscale first
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            
            // Apply threshold to increase contrast
            const threshold = 200;
            const value = avg > threshold ? 255 : 0;
            
            // Set RGB channels
            data[i] = value;     // R
            data[i + 1] = value; // G
            data[i + 2] = value; // B
            // Keep alpha channel (i+3) as is
          }
          
          // Put processed image data back
          ctx.putImageData(imageData, 0, 0);
          
          // Get the final processed image
          const processedImageData = processCanvas.toDataURL('image/png');
          
          // Save processed image for debug display
          if (showDebug) {
            setProcessedImage(processedImageData);
          }
          
          resolve(processedImageData);
        };
        
        img.src = rawImageData;
      });
    } catch (error) {
      console.error("Error preprocessing image:", error);
      return null;
    }
  };
  
  // Check when canvas is ready
  useEffect(() => {
    if (canvasRef.current) {
      console.log("Canvas is ready");
      setCanvasReady(true);
    }
  }, [canvasRef.current]);
  
  // Fetch contribution status on component mount
  useEffect(() => {
    const fetchContributionStatus = async () => {
      try {
        setIsLoading(true);
        const response = await getContributionStatus();
        if (response && !response.error) {
          setContributionStatus(response);
        }
      } catch (error) {
        console.error('Failed to fetch contribution status', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContributionStatus();
    // Refresh status every 30 seconds
    const interval = setInterval(fetchContributionStatus, 30000);
    return () => clearInterval(interval);
  }, []);
  
  const handleDigitSelect = (digit) => {
    setSelectedDigit(digit);
  };
  
  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      setProcessedImage(null);
    }
  };
  
  const handleSubmit = async () => {
    if (selectedDigit === null) {
      alert('Please select a digit before submitting');
      return;
    }
    
    // Check if canvas is empty
    if (canvasRef.current && canvasRef.current.getSaveData() === '{"lines":[],"width":0,"height":0}') {
      alert('Please draw something before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    // Capture and process canvas data
    if (!canvasRef.current) {
      alert('Canvas not ready. Please try again.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      console.log("Processing canvas drawing...");
      // Use the preprocessing function to get better image quality
      const processedImageData = await preprocessCanvasImage();
      
      if (!processedImageData || processedImageData.length < 100) {
        alert('Failed to process drawing. Please try again.');
        setIsSubmitting(false);
        return;
      }
      
      console.log("Submitting processed image to API...");
      // Submit to API with the processed image
      submitTrainingData(processedImageData, selectedDigit)
        .then(response => {
          console.log("API Response:", response);
          
          if (!response) {
            throw new Error('No response from server');
          }
          
          if (response.error) {
            alert(`Error: ${response.error}`);
            return;
          }
          
         
          if (response.current_count !== undefined) {
            setContributionStatus(prev => ({
              ...prev,
              unprocessed_contributions: response.current_count
            }));
          }
          clearCanvas();
          setSelectedDigit(null);
          
          // Show thank you message
          setShowThankYou(true);
          setTimeout(() => setShowThankYou(false), 3000);
        })
        .catch(error => {
          console.error("Failed to submit training data:", error);
          alert("Failed to submit. Please try again.");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } catch (error) {
      console.error("Error preparing canvas data:", error);
      alert("Failed to prepare drawing for submission. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Calculate progress percentage
  const targetSamples = contributionStatus.next_retrain_target || 50;
  const currentSamples = contributionStatus.unprocessed_contributions || 0;
  const progress = Math.min(100, (currentSamples / targetSamples) * 100);
  const remainingSamples = Math.max(0, targetSamples - currentSamples);

  // Calculate progress status for visual indicators
  const progressStatus = 
    progress >= 100 ? "complete" : 
    progress >= 75 ? "almostThere" : 
    progress >= 50 ? "halfway" : 
    progress >= 25 ? "started" : "beginning";

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <motion.button 
              className="flex items-center text-white bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-all border border-gray-700/50 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </motion.button>
          </Link>
          
          <motion.h1 
            className="text-3xl font-bold text-white text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            Contribute to Training
          </motion.h1>
        </div>
        
        <motion.div
          className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl mb-8"
          ref={containerRef}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-start text-white mb-5 bg-blue-900/30 p-4 rounded-lg border border-blue-700/30">
            <Info size={22} className="mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-blue-100">Draw a digit and help improve our model's accuracy by contributing labeled examples. Each submission helps our AI learn and recognize handwriting better!</p>
          </div>
          
          {/* Enhanced Contribution Progress Bar */}
          <motion.div 
            className="bg-gray-800/80 p-5 rounded-xl mb-7 border border-gray-700/50 shadow-inner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex justify-between text-white mb-3 items-center">
              <div className="flex items-center">
                <motion.div 
                  className={`w-3 h-3 rounded-full mr-2 ${
                    progressStatus === "complete" ? "bg-green-500" : 
                    progressStatus === "almostThere" ? "bg-blue-400" : 
                    progressStatus === "halfway" ? "bg-purple-500" : 
                    progressStatus === "started" ? "bg-amber-500" : "bg-gray-500"
                  }`}
                  animate={{ 
                    scale: progressStatus === "complete" || progressStatus === "almostThere" ? [1, 1.2, 1] : 1
                  }}
                  transition={{ 
                    repeat: progressStatus === "complete" || progressStatus === "almostThere" ? Infinity : 0,
                    duration: 1.5
                  }}
                />
                <span className="font-semibold">Model Retraining Progress</span>
              </div>
              <span className="bg-gray-700/70 px-3 py-1 rounded-full text-sm font-medium">
                {currentSamples} / {targetSamples} samples
              </span>
            </div>
            
            <div className="w-full bg-gray-700/70 rounded-full h-5 p-0.5">
              <motion.div 
                className={`h-4 rounded-full ${
                  progress >= 100 
                    ? "bg-gradient-to-r from-emerald-500 to-green-400" 
                    : progress >= 75 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-400"
                      : "bg-gradient-to-r from-violet-600 to-blue-500"
                }`}
                style={{ width: `${progress}%` }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, type: "spring", stiffness: 50 }}
              >
                {progress >= 20 && (
                  <div className="h-full flex items-center justify-center text-white text-xs font-bold">
                    {Math.round(progress)}%
                  </div>
                )}
              </motion.div>
            </div>
            
            {remainingSamples > 0 ? (
              <div className="flex items-center mt-3 text-gray-300 text-sm">
                <RefreshCw size={14} className="mr-2 text-blue-400" />
                <p>
                  <span className="font-semibold text-blue-300">{remainingSamples} more samples</span> needed before the next model retraining
                </p>
              </div>
            ) : (
              <div className="flex items-center mt-3 text-green-300 text-sm">
                <Check size={16} className="mr-2" />
                <p className="font-medium">
                  Enough samples collected for retraining! The model will be updated soon.
                </p>
              </div>
            )}
          </motion.div>
          
          {/* Enhanced Canvas Section with CanvasDraw */}
          <motion.div 
            className="bg-indigo-950/40 rounded-xl p-3 mx-auto shadow-2xl mb-6 border border-indigo-800/30"
            style={{ width: canvasSize.width + 16 }}
            whileHover={{ boxShadow: "0 0 25px rgba(168, 85, 247, 0.3)" }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-inner">
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
                saveData={null} // Ensure we start with a clean canvas
                loadTimeOffset={0}
                style={{ display: 'block' }} // Ensure proper rendering
              />
            </div>
          </motion.div>
          
          {/* Debug display of processed image with enhanced styling */}
          {showDebug && processedImage && (
            <motion.div 
              className="mb-5 flex flex-col items-center bg-gray-900/50 p-4 rounded-lg border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-blue-300 mb-2 font-medium">Processed Image (32x32):</p>
              <div className="bg-black/50 p-2 rounded-lg border border-gray-700/50 inline-block shadow-lg">
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  className="rounded-lg"
                  style={{ width: '96px', imageRendering: 'pixelated' }} 
                />
              </div>
            </motion.div>
          )}
          
          {/* Enhanced Controls Section */}
          <div className="flex flex-col md:flex-row gap-6">
            <motion.div 
              className="flex-1 bg-gray-800/70 p-5 rounded-xl border border-gray-700/50 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center mr-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                    <RefreshCw size={14} className="text-violet-400" />
                  </motion.div>
                </span>
                Drawing Controls
              </h3>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="w-full">
                  <label className=" text-sm text-gray-300 mb-2 flex justify-between">
                    <span>Brush Size</span>
                    <span className="bg-violet-900/50 px-2 py-0.5 rounded text-violet-200 text-xs">{brushSize}px</span>
                  </label>
                  <input 
                    type="range" 
                    min="2" 
                    max="15" 
                    value={brushSize} 
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-violet-500" 
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  onClick={clearCanvas}
                  className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg border border-gray-600/50 shadow-md transition-all"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw size={16} className="mr-2" />
                  Clear
                </motion.button>
                
                {/* Debug mode toggle with enhanced styling */}
                <motion.button
                  onClick={() => setShowDebug(!showDebug)}
                  className={`flex items-center justify-center py-2 px-4 rounded-lg border shadow-md transition-all ${
                    showDebug 
                      ? 'bg-blue-600 hover:bg-blue-500 border-blue-500/50' 
                      : 'bg-gray-700 hover:bg-gray-600 border-gray-600/50'
                  } text-white`}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showDebug ? 'Debug Mode: ON' : 'Debug Mode: OFF'}
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 bg-gray-800/70 p-5 rounded-xl border border-gray-700/50 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center mr-2">
                  <span className="text-indigo-300 text-xs font-bold">#</span>
                </span>
                Select Digit
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                  <motion.button
                    key={digit}
                    onClick={() => handleDigitSelect(digit)}
                    className={`h-14 rounded-lg flex items-center justify-center text-lg font-bold shadow-md border transition-all ${
                      selectedDigit === digit 
                        ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white border-indigo-500/50' 
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600/50'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {digit}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.button
            onClick={handleSubmit}
            disabled={selectedDigit === null || isSubmitting}
            className={`mt-7 w-full flex items-center justify-center py-4 rounded-lg font-medium text-lg shadow-xl transition-all ${
              selectedDigit !== null && !isSubmitting
                ? 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white border border-green-500/50'
                : 'bg-gray-700 text-gray-400 border border-gray-600/50 cursor-not-allowed'
            }`}
            whileHover={selectedDigit !== null && !isSubmitting ? { scale: 1.02, y: -2 } : {}}
            whileTap={selectedDigit !== null && !isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <>
                <RefreshCw size={22} className="mr-3 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Save size={22} className="mr-3" />
                Submit {selectedDigit !== null ? `Digit ${selectedDigit}` : 'Drawing'}
              </>
            )}
          </motion.button>
          
          {/* Thank you notification */}
          {showThankYou && (
            <motion.div
              className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
            >
              <Check size={20} className="mr-2" />
              Thank you for contributing!
            </motion.div>
          )}
        </motion.div>
        
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Why Contribute?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard 
              title="Improve Accuracy" 
              description="Your contributions help make the model more accurate for everyone."
            />
            <InfoCard 
              title="Diverse Data" 
              description="Different handwriting styles help our model recognize all types of writing."
            />
            <InfoCard 
              title="Better Learning" 
              description="More training examples means better learning and fewer mistakes."
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InfoCard = ({ title, description }) => {
  return (
    <div className="bg-gray-700/50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export default TrainingContributionPage;
