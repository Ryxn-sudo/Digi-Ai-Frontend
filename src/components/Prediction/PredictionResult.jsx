import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Percent, Hash, Image as ImageIcon } from 'lucide-react';

const PredictionResult = forwardRef(({ prediction, preprocessedImage }, ref) => {
  if (!prediction) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="mt-10 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        layout
        ref={ref}
      >
        <motion.h2 
          className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-5 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle className="mr-2 text-green-400" size={20} />
          Prediction Result
        </motion.h2>

        {prediction.error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center bg-red-900/20 p-3 rounded-lg border border-red-800"
          >
            <AlertCircle className="text-red-500 mr-2" size={18} />
            <p className="text-red-400">{prediction.error}</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <motion.div 
              className="space-y-4 p-5 bg-gray-900/50 rounded-lg shadow-sm border border-gray-700"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="flex items-start"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <Hash className="text-blue-400 mt-1 mr-3" size={20} />
                <div>
                  <p className="text-gray-300">
                    Predicted {prediction.digit_type ? `${prediction.digit_type} ` : ''}Number:
                  </p>
                  <motion.span 
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 block mt-1"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  >
                    {prediction.prediction}
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Percent className="text-green-400 mt-1 mr-3" size={20} />
                <div>
                  <p className="text-gray-300">Confidence:</p>
                  <span className="text-xl font-semibold text-green-400">
                    {typeof prediction.confidence === 'number' ? 
                      prediction.confidence.toFixed(2) : 
                      prediction.confidence}%
                  </span>
                </div>
              </motion.div>
              
              {prediction.estimated_digit_count && (
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Hash className="text-yellow-400 mt-1 mr-3" size={20} />
                  <div>
                    <p className="text-gray-300">Estimated digits:</p>
                    <span className="text-xl font-semibold text-yellow-400">
                      {prediction.estimated_digit_count}
                    </span>
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
                <p className="text-sm text-gray-300 mb-2 flex items-center">
                  <ImageIcon className="mr-2 text-purple-400" size={16} />
                  Preprocessed Image:
                </p>
                <motion.div className="bg-gray-900 p-2 inline-block rounded-lg border border-gray-700">
                  <motion.img 
                    src={preprocessedImage} 
                    alt="Preprocessed" 
                    className="rounded-lg"
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
