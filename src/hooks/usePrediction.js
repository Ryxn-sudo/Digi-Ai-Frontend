import { useState } from 'react';
import { getPredictionFromCanvasAPI, getPredictionFromImageAPI } from '../services/api';

export const usePrediction = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preprocessedImage, setPreprocessedImage] = useState(null);
  
  const getPredictionFromCanvas = async (canvasRef, showDebug) => {
    if (!canvasRef.current) return null;
    
    setLoading(true);
    try {
      // Get the canvas data as base64
      const canvasData = canvasRef.current.getDataURL('png', false, '#FFFFFF');
      
      const data = await getPredictionFromCanvasAPI(canvasData, showDebug);
      setPrediction(data);
      
      if (data.preprocessed_image) {
        setPreprocessedImage(data.preprocessed_image);
      }
      
      return data; // Return the prediction data
    } catch (error) {
      console.error('Error:', error);
      const errorData = { error: 'Failed to get prediction' };
      setPrediction(errorData);
      return errorData; // Return the error data
    } finally {
      setLoading(false);
    }
  };

  const getPredictionFromImage = async (selectedImage) => {
    if (!selectedImage) return;
    
    setLoading(true);
    try {
      const data = await getPredictionFromImageAPI(selectedImage);
      setPrediction(data);
    } catch (error) {
      console.error('Error:', error);
      setPrediction({ error: 'Failed to get prediction' });
    }
    setLoading(false);
  };

  const resetPrediction = () => {
    setPrediction(null);
    setPreprocessedImage(null);
  };

  return {
    prediction,
    loading,
    preprocessedImage,
    getPredictionFromCanvas,
    getPredictionFromImage,
    resetPrediction
  };
};
