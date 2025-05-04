import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Upload } from 'lucide-react';

const ModeSelector = ({ isCanvas, setIsCanvas }) => {
  return (
    <motion.div 
      className="flex justify-center space-x-6 mb-10"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <motion.button 
        className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center 
          ${isCanvas 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-700/50' 
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'}`}
        onClick={() => setIsCanvas(true)}
        whileHover={{ scale: isCanvas ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Pencil className="mr-2" size={18} />
        Draw Digit
      </motion.button>
      
      <motion.button 
        className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center
          ${!isCanvas 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-700/50' 
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'}`}
        onClick={() => setIsCanvas(false)}
        whileHover={{ scale: !isCanvas ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Upload className="mr-2" size={18} />
        Upload Image
      </motion.button>
    </motion.div>
  );
};

export default ModeSelector;
