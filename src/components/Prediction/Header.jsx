import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const Header = () => {
  return (
    <motion.div
      className="mb-10 text-center"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="flex justify-center items-center mb-3">
        <motion.div 
          whileHover={{ rotate: 10, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gray-800 p-3 rounded-full shadow-md border border-gray-700"
        >
          <Brain size={42} className="text-purple-400" />
        </motion.div>
        <div className="ml-3">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Digit Recognition
          </h1>
        </div>
      </div>
      <motion.p 
        className="text-gray-300 max-w-lg mx-auto font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Draw or upload handwritten digits and watch our AI model identify them in real-time
      </motion.p>
    </motion.div>
  );
};

export default Header;
