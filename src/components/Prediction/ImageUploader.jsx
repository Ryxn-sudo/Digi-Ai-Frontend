import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, Loader } from 'lucide-react';

const ImageUploader = ({ selectedImage, handleImageUpload, handlePrediction, loading }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const event = { target: { files: [file] } };
      handleImageUpload(event);
    }
  }, [handleImageUpload]);

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className={`border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center
          ${isDragging 
            ? 'border-purple-500 bg-purple-900/20' 
            : 'border-gray-600 hover:border-purple-500 bg-gray-800/50'}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        whileHover={{ scale: 1.01 }}
        style={{ minHeight: "200px" }}
      >
        <Upload className={`h-12 w-12 ${isDragging ? 'text-purple-400' : 'text-gray-400'} mb-3`} />
        <p className="text-gray-300 text-center mb-2 font-medium">
          Drag & drop an image or <span className="text-blue-400">browse</span>
        </p>
        <p className="text-gray-500 text-sm">Supported formats: JPG, PNG</p>
        
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </motion.div>
      
      {selectedImage && (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="max-w-xs mx-auto rounded-xl overflow-hidden shadow-lg bg-gray-800 p-3 border border-gray-700"
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(168, 85, 247, 0.2)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <Image className="absolute top-2 right-2 text-purple-300 bg-gray-900 rounded-full p-1 shadow-sm" size={20} />
              <img src={selectedImage} alt="Preview" className="rounded-lg w-full" />
            </div>
          </motion.div>
          
          <motion.div className="flex justify-center">
            <motion.button 
              onClick={handlePrediction}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl transition-all shadow-md shadow-green-700/30 flex items-center justify-center"
              whileHover={loading ? {} : { scale: 1.05 }}
              whileTap={loading ? {} : { scale: 0.95 }}
            >
              {loading ? (
                <Loader className="animate-spin mr-2" size={18} />
              ) : (
                <Image className="mr-2" size={18} />
              )}
              {loading ? 'Analyzing...' : 'Predict Digit'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageUploader;
