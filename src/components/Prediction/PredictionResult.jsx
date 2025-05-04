import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Percent, Hash, Image as ImageIcon, Sparkles } from 'lucide-react';

const PredictionResult = forwardRef(({ prediction, preprocessedImage }, ref) => {
  if (!prediction) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="mt-10 p-6 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.3)] border border-gray-700/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        layout
        ref={ref}
      >
        <motion.div
          className="absolute -top-3 -right-3 h-24 w-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.h2 
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-5 flex items-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle className="mr-2 text-green-400 drop-shadow-md" size={22} />
          Prediction Result
          <motion.span
            className="ml-2"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={16} className="text-yellow-400" />
          </motion.span>
        </motion.h2>

        {prediction.error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center bg-gradient-to-r from-red-900/30 to-red-800/30 p-4 rounded-lg border border-red-700 shadow-inner"
          >
            <AlertCircle className="text-red-500 mr-3 flex-shrink-0" size={20} />
            <p className="text-red-300 font-medium">{prediction.error}</p>
          </motion.div>
        ) : (
          <div className="space-y-6 relative z-10">
            <motion.div 
              className="space-y-4 p-5 bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-lg shadow-lg border border-gray-700/80"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ boxShadow: "0 8px 30px rgba(14, 165, 233, 0.15)" }}
            >
              <motion.div 
                className="flex items-start"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <div className="bg-blue-500/20 p-2 rounded-lg mr-3 flex-shrink-0">
                  <Hash className="text-blue-400" size={20} />
                </div>
                <div>
                  <p className="text-gray-300 font-medium">
                    Predicted {prediction.digit_type ? `${prediction.digit_type} ` : ''}Number:
                  </p>
                  <motion.div 
                    className="relative"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  >
                    <motion.span 
                      className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 block mt-1"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {prediction.prediction}
                    </motion.span>
                    <motion.div
                      className="absolute -inset-1 rounded-lg bg-blue-500/10 -z-10 blur-sm"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-green-500/20 p-2 rounded-lg mr-3 flex-shrink-0">
                  <Percent className="text-green-400" size={20} />
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Confidence:</p>
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                    {typeof prediction.confidence === 'number' ? 
                      prediction.confidence.toFixed(2) : 
                      prediction.confidence}%
                  </span>
                  <motion.div 
                    className="h-2 bg-gray-700 rounded-full mt-1 overflow-hidden w-36"
                    initial={{ width: 0 }}
                    animate={{ width: "9rem" }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${Math.min(100, typeof prediction.confidence === 'number' ? prediction.confidence : 0)}%` }}
                      transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
              
              {prediction.estimated_digit_count && (
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="bg-yellow-500/20 p-2 rounded-lg mr-3 flex-shrink-0">
                    <Hash className="text-yellow-400" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Estimated digits:</p>
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">
                      {prediction.estimated_digit_count}
                    </span>
                    <div className="flex space-x-1 mt-1">
                      {Array.from({ length: prediction.estimated_digit_count }).map((_, i) => (
                        <motion.div 
                          key={i}
                          className="h-4 w-3 bg-yellow-500/60 rounded-sm"
                          initial={{ height: 0 }}
                          animate={{ height: 16 }}
                          transition={{ delay: 0.7 + (i * 0.1) }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
            
            {preprocessedImage && (
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-sm text-gray-300 mb-2 flex items-center font-medium">
                  <ImageIcon className="mr-2 text-purple-400" size={16} />
                  Preprocessed Image:
                </p>
                <motion.div 
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 inline-block rounded-lg border border-gray-700 shadow-lg"
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(168, 85, 247, 0.2)" }}
                >
                  <motion.img 
                    src={preprocessedImage} 
                    alt="Preprocessed" 
                    className="rounded-md"
                    style={{ maxWidth: "200px" }} 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
});

PredictionResult.displayName = 'PredictionResult';

export default PredictionResult;
