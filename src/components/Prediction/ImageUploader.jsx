import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {  Image, Loader, CloudUpload, CheckCircle2 } from 'lucide-react';

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
        className={`border-2 border-dashed rounded-xl p-10 transition-all flex flex-col items-center justify-center relative overflow-hidden
          ${isDragging 
            ? 'border-purple-500 bg-purple-900/20' 
            : 'border-gray-600 hover:border-blue-500 bg-gray-800/50'}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(91, 33, 182, 0.15)" }}
        style={{ minHeight: "230px" }}
      >
        {isDragging && (
          <motion.div
            className="absolute inset-0 bg-purple-500/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        
        <motion.div
          className={`p-4 rounded-full mb-4 ${isDragging ? 'bg-purple-500/20' : 'bg-gray-700'}`}
          animate={{ scale: isDragging ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 1.5, repeat: isDragging ? Infinity : 0 }}
        >
          <CloudUpload className={`h-14 w-14 ${isDragging ? 'text-purple-400' : 'text-gray-400'}`} />
        </motion.div>
        
        <motion.p 
          className="text-gray-200 text-center mb-2 font-semibold"
          animate={{ y: isDragging ? [-2, 2, -2] : 0 }}
          transition={{ duration: 1.5, repeat: isDragging ? Infinity : 0 }}
        >
          Drag & drop an image or <span className="text-blue-400 underline cursor-pointer">browse</span>
        </motion.p>
        <p className="text-gray-500 text-sm">Supported formats: JPG, PNG, GIF</p>
        
        {isDragging && (
          <motion.div 
            className="absolute inset-0 border-2 border-purple-500 rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        
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
            className="max-w-xs mx-auto rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-3 border border-gray-700"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 30px rgba(91, 33, 182, 0.2)",
              borderColor: "rgba(168, 85, 247, 0.5)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative rounded-lg overflow-hidden">
              <motion.div className="absolute top-2 right-2 z-10 bg-black/40 p-1.5 rounded-full backdrop-blur-sm">
                <CheckCircle2 className="text-green-400" size={18} />
              </motion.div>
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
              
              <motion.img 
                src={selectedImage} 
                alt="Preview" 
                className="rounded-lg w-full"
                initial={{ scale: 1.1, filter: 'blur(5px)' }}
                animate={{ scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
              />
              
              <motion.div
                className="absolute bottom-2 left-2 px-2 py-1 bg-black/40 text-white text-xs rounded-md backdrop-blur-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Image size={12} className="inline mr-1" /> Image loaded
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div className="flex justify-center">
            <motion.button 
              onClick={handlePrediction}
              disabled={loading}
              className="px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-xl shadow-green-700/30 flex items-center justify-center relative overflow-hidden group"
              whileHover={loading ? {} : { scale: 1.05, boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4)" }}
              whileTap={loading ? {} : { scale: 0.97 }}
            >
              {!loading && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-white/20 to-emerald-500/0"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 200, opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 0.5 }}
                />
              )}
              
              {loading ? (
                <Loader className="animate-spin mr-2" size={18} />
              ) : (
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mr-2"
                >
                  <Image size={18} />
                </motion.div>
              )}
              <span className="font-medium">
                {loading ? 'Analyzing...' : 'Predict Digit'}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageUploader;
