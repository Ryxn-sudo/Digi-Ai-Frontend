import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight, Star } from 'lucide-react';

const CHALLENGE_TYPES = [
  {
    id: 'even-numbers',
    name: 'Even Numbers Only',
    description: 'Draw only even numbers with extreme rotations',
    difficulty: 'Medium',
    color: 'from-blue-500 to-indigo-600',
    reward: 200
  },
  {
    id: 'speed-round',
    name: 'Speed Challenge',
    description: 'Draw 10 digits in just 60 seconds total',
    difficulty: 'Hard',
    color: 'from-orange-500 to-red-600',
    reward: 300
  },
  {
    id: 'mirror-madness',
    name: 'Mirror Madness',
    description: 'All digits are mirrored - can you handle it?',
    difficulty: 'Expert',
    color: 'from-purple-600 to-pink-600',
    reward: 400
  }
];

const ChallengeMode = ({ onSelectChallenge, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Star size={24} className="text-yellow-400 mr-2" />
            Daily Challenges
          </h2>
          <motion.button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <X size={24} />
          </motion.button>
        </div>
        
        <div className="space-y-4">
          {CHALLENGE_TYPES.map(challenge => (
            <motion.div
              key={challenge.id}
              className={`bg-gradient-to-r ${challenge.color} rounded-xl p-4 cursor-pointer`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectChallenge(challenge.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">{challenge.name}</h3>
                <div className="bg-white/20 px-2 py-0.5 rounded text-xs text-white">
                  {challenge.difficulty}
                </div>
              </div>
              <p className="text-white/80 mt-2">{challenge.description}</p>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center">
                  <Award size={16} className="text-yellow-300 mr-1" />
                  <span className="text-yellow-200 font-medium">{challenge.reward} points reward</span>
                </div>
                <ArrowRight size={20} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChallengeMode;
