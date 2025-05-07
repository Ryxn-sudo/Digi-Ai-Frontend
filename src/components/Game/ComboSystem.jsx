import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

const ComboSystem = ({ streak, onComboChange }) => {
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [showComboMessage, setShowComboMessage] = useState(false);
  
  useEffect(() => {
    // Calculate combo multiplier based on streak
    let newMultiplier = 1;
    
    if (streak >= 20) {
      newMultiplier = 4; // 4x points
    } else if (streak >= 10) {
      newMultiplier = 3; // 3x points
    } else if (streak >= 5) {
      newMultiplier = 2; // 2x points
    }
    
    // If multiplier changed, show message and notify parent
    if (newMultiplier !== comboMultiplier) {
      setComboMultiplier(newMultiplier);
      setShowComboMessage(true);
      
      // Auto-hide message after 2.5 seconds
      setTimeout(() => setShowComboMessage(false), 2500);
      
      // Notify parent component about new multiplier
      if (onComboChange) {
        onComboChange(newMultiplier);
      }
    }
  }, [streak, comboMultiplier, onComboChange]);
  
  return (
    <div className="relative">
      {/* Always visible combo indicator */}
      {streak > 0 && (
        <div className={`flex items-center justify-center 
          ${comboMultiplier > 1 ? 'text-orange-400' : 'text-gray-400'}`}>
          <Flame 
            size={16} 
            className={comboMultiplier > 1 ? 'text-orange-500 animate-pulse' : ''} 
          />
          <span className="ml-1 text-sm font-medium">
            {comboMultiplier > 1 ? `${comboMultiplier}x Combo!` : `Combo: ${streak}`}
          </span>
        </div>
      )}
      
      {/* Animated popup when reaching new combo tier */}
      <AnimatePresence>
        {showComboMessage && comboMultiplier > 1 && (
          <motion.div
            className="absolute top-0 left-0 right-0 -mt-12 pointer-events-none"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.2 }}
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white 
              font-bold py-1 px-3 rounded-full text-center text-sm shadow-lg">
              {comboMultiplier}x COMBO MULTIPLIER!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComboSystem;
