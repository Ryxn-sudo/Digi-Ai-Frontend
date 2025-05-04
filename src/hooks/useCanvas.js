import { useState, useRef, useEffect } from 'react';

export const useCanvas = (containerRef) => {
  const [brushSize, setBrushSize] = useState(8);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 280 });
  const [showDebug, setShowDebug] = useState(false);
  const canvasRef = useRef(null);

  // Adjust canvas size based on container width
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 32; // Accounting for padding
      setCanvasSize({
        width: Math.min(600, Math.max(280, containerWidth)), // Between 280 and 600px
        height: 280
      });
    }
  }, [containerRef]);

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  return {
    brushSize,
    setBrushSize,
    canvasSize,
    showDebug,
    setShowDebug,
    canvasRef,
    clearCanvas
  };
};
