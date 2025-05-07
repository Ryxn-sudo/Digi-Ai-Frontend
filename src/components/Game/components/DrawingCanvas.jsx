import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import { motion } from 'framer-motion';

const DrawingCanvas = ({ canvasRef, brushSize, canvasSize, difficultySettings, containerRef, disabled }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl p-1 mx-auto shadow-xl"
      style={{ 
        width: '100%', 
        maxWidth: canvasSize.width * difficultySettings.canvasScale + 6 
      }}
      whileHover={{ boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)" }}
    >
      <CanvasDraw
        ref={canvasRef}
        brushColor="#000000"
        brushRadius={brushSize}
        canvasWidth={Math.min(
          canvasSize.width * difficultySettings.canvasScale, 
          containerRef.current?.clientWidth - 20 || 300
        )}
        canvasHeight={canvasSize.height * difficultySettings.canvasScale}
        backgroundColor="#FFFFFF"
        hideGrid={true}
        lazyRadius={0}
        immediateLoading={true}
        disabled={disabled}
      />
    </motion.div>
  );
};

export default DrawingCanvas;
