import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import { motion } from 'framer-motion';
import { Eraser, Wand2, Settings, Circle, AlertCircle, BarChart } from 'lucide-react';

const DrawingCanvas = ({ 
  canvasRef, 
  brushSize, 
  setBrushSize, 
  canvasSize, 
  showDebug, 
  setShowDebug, 
  clearCanvas, 
  handlePrediction, 
  loading 
}) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="bg-white rounded-xl p-1 mx-auto shadow-2xl"
        style={{ width: canvasSize.width + 8 }}
        whileHover={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
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
        />
      </motion.div>
      
      <motion.div 
        className="flex justify-center space-x-4"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <motion.button 
          onClick={clearCanvas}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-lg shadow-red-700/30 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eraser className="mr-2" size={18} />
          Clear
        </motion.button>
        
        <motion.button 
          onClick={handlePrediction}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg shadow-blue-700/30 flex items-center disabled:opacity-60"
          whileHover={loading ? {} : { scale: 1.05 }}
          whileTap={loading ? {} : { scale: 0.95 }}
        >
          {loading ? (
            <Circle className="mr-2 animate-spin" size={18} />
          ) : (
            <Wand2 className="mr-2" size={18} />
          )}
          {loading ? 'Analyzing...' : 'Predict Digit'}
        </motion.button>
      </motion.div>
      
      <motion.div 
        className="flex flex-col items-center mt-4 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl shadow-md border border-gray-700">
          <Settings size={16} className="text-gray-400" />
          <label className="text-white text-sm">Brush: {brushSize}px</label>
          <input 
            type="range" 
            min="2" 
            max="15" 
            value={brushSize} 
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-32 accent-purple-500"
          />
          
          <motion.div 
            className="flex items-center ml-3 text-white text-sm"
            whileHover={{ scale: 1.03 }}
          >
            <BarChart size={16} className="text-purple-400 mr-1" />
            <input
              type="checkbox"
              checked={showDebug}
              onChange={() => setShowDebug(!showDebug)}
              className="mr-2 accent-purple-500"
            />
            <span>Show Processing</span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="text-white text-sm mt-2 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg border border-gray-700"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center mb-2">
            <AlertCircle className="text-yellow-400 mr-2" size={18} />
            <span className="font-bold">Tips for better accuracy:</span>
          </div>
          <ul className="list-disc pl-5 text-gray-300 space-y-1">
            <li>Draw digits clearly with medium to thin strokes</li>
            <li>For multiple digits, leave space between them</li>
            <li>Keep digits centered vertically in the canvas</li>
            <li>For single digits, draw them larger in the center</li>
            <li>Try to match standard digit shapes (schoolbook style)</li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DrawingCanvas;
