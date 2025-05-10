import { useState, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { motion, AnimatePresence } from 'framer-motion';
import { Eraser, Wand2, Settings, Circle, AlertCircle, BarChart, UndoIcon, GridIcon, Download } from 'lucide-react';

const DrawingCanvas = ({ 
  canvasRef, 
  brushSize, 
  setBrushSize, 
  canvasSize: initialCanvasSize,
  setCanvasSize,
  showDebug, 
  setShowDebug, 
  clearCanvas, 
  handlePrediction, 
  loading 
}) => {
  const [showGrid, setShowGrid] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [canvasSize, setLocalCanvasSize] = useState(initialCanvasSize);
  const [containerWidth, setContainerWidth] = useState('100%');

  // Add resize handler to make canvas responsive
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      
      if (screenWidth < 768) { // Mobile devices
        const newSize = Math.min(screenWidth - 32, 400); // Account for padding
        setLocalCanvasSize({
          width: newSize,
          height: newSize
        });
        setContainerWidth(`${newSize + 8}px`);
      } else {
        setLocalCanvasSize(initialCanvasSize);
        setContainerWidth(`${initialCanvasSize.width + 8}px`);
      }
    };
    
    // Call once on mount
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [initialCanvasSize]);

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const handleSaveImage = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.getDataURL('png');
      const link = document.createElement('a');
      link.download = 'digit-drawing.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <motion.div 
      className="space-y-6 max-w-full px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className={`bg-white rounded-xl p-1 mx-auto shadow-2xl relative overflow-hidden ${showGrid ? 'bg-grid' : ''}`}
        style={{ 
          width: containerWidth, 
          maxWidth: '100%',
          transform: `scale(1)`,
          transformOrigin: 'center top'
        }}
        whileHover={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {showGrid && (
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" 
            style={{
              backgroundSize: '20px 20px',
              backgroundImage: 'linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)',
              zIndex: 10
            }}
          />
        )}
        
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
        className="flex justify-center flex-wrap gap-3"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <motion.button 
          onClick={clearCanvas}
          className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-lg shadow-red-700/30 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eraser className="mr-2" size={16} />
          Clear
        </motion.button>
        
        <motion.button 
          onClick={handleUndo}
          className="px-5 py-2.5 bg-amber-600 text-white rounded-xl shadow-lg shadow-amber-700/30 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UndoIcon className="mr-2" size={16} />
          Undo
        </motion.button>
        
        <motion.button 
          onClick={() => setShowTools(!showTools)}
          className="px-5 py-2.5 bg-gray-700 text-white rounded-xl shadow-lg flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="mr-2" size={16} />
          Tools
        </motion.button>
        
        <motion.button 
          onClick={handlePrediction}
          disabled={loading}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg shadow-blue-700/30 flex items-center disabled:opacity-60"
          whileHover={loading ? {} : { scale: 1.05 }}
          whileTap={loading ? {} : { scale: 0.95 }}
        >
          {loading ? (
            <Circle className="mr-2 animate-spin" size={16} />
          ) : (
            <Wand2 className="mr-2" size={16} />
          )}
          {loading ? 'Analyzing...' : 'Predict Digit'}
        </motion.button>
      </motion.div>
      
      <AnimatePresence>
        {showTools && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <label className="text-white text-sm">Brush: {brushSize}px</label>
                <input 
                  type="range" 
                  min="2" 
                  max="15" 
                  value={brushSize} 
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-32 accent-purple-500"
                />
              </div>
              
  
              
              <div className="h-8 border-r border-gray-600"></div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-1.5 rounded-lg flex items-center ${
                    showGrid ? 'bg-purple-600 text-white' : 'bg-gray-700 text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Toggle grid"
                >
                  <GridIcon size={16} />
                  <span className="ml-1 text-xs">Grid</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setShowDebug(!showDebug)}
                  className={`p-1.5 rounded-lg flex items-center ${
                    showDebug ? 'bg-purple-600 text-white' : 'bg-gray-700 text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Show processing steps"
                >
                  <BarChart size={16} />
                  <span className="ml-1 text-xs">Debug</span>
                </motion.button>
                
                <motion.button
                  onClick={handleSaveImage}
                  className="p-1.5 bg-gray-700 text-white rounded-lg flex items-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Save as image"
                >
                  <Download size={16} />
                  <span className="ml-1 text-xs">Save</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
  );
};

export default DrawingCanvas;
