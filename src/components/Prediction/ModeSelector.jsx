import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Upload, ChevronRight } from 'lucide-react';

const ModeSelector = ({ isCanvas, setIsCanvas }) => {
  return (
    <motion.div 
      className="flex justify-center space-x-6 mb-10"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <motion.div className="relative">
        <motion.button 
          className={`px-8 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center relative overflow-hidden
            ${isCanvas 
              ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white shadow-lg shadow-blue-700/50' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'}`}
          onClick={() => setIsCanvas(true)}
          whileHover={{ scale: isCanvas ? 1.02 : 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {isCanvas && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 200, opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
            />
          )}
          <Pencil className="mr-2" size={18} />
          Draw Digit
          {isCanvas && <ChevronRight size={16} className="ml-1 opacity-70" />}
        </motion.button>
        {isCanvas && (
          <motion.div 
            className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-50 -z-10"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
      
      <motion.div className="relative">
        <motion.button 
          className={`px-8 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center relative overflow-hidden
            ${!isCanvas 
              ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white shadow-lg shadow-blue-700/50' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'}`}
          onClick={() => setIsCanvas(false)}
          whileHover={{ scale: !isCanvas ? 1.02 : 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {!isCanvas && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 200, opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
            />
          )}
          <Upload className="mr-2" size={18} />
          Upload Image
          {!isCanvas && <ChevronRight size={16} className="ml-1 opacity-70" />}
        </motion.button>
        {!isCanvas && (
          <motion.div 
            className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-50 -z-10"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ModeSelector;
