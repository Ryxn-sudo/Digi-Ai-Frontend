import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const Header = () => {
  return (
    <motion.div
      className="relative mb-8 md:mb-16 text-center py-6 md:py-8 px-4 max-w-screen-xl mx-auto"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 90 }}
    >
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-300 opacity-30"
            initial={{ 
              x: Math.random() * 100 - 50 + "%", 
              y: Math.random() * 100 + "%", 
              scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
              y: [`${Math.random() * 20 + 40}%`, `${Math.random() * 20 + 60}%`],
              x: [`${Math.random() * 20 - 10 + i * 15}%`, `${Math.random() * 20 - 10 + i * 15}%`]
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: Math.random() * 3 + 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="flex flex-col items-center mb-3 md:mb-5">
        <div className='flex flex-col md:flex-row items-center gap-2 md:gap-4'>
          <motion.div 
            className="relative bg-gray-800/80 p-3 md:p-4 rounded-xl shadow-lg border border-purple-500/30 backdrop-blur-sm"
            whileHover={{ scale: 1.05, rotate: 0 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: ["0 0 0 rgba(168, 85, 247, 0.3)", "0 0 15px rgba(168, 85, 247, 0.6)", "0 0 0 rgba(168, 85, 247, 0.3)"]
            }}
            transition={{ 
              boxShadow: { repeat: Infinity, duration: 2 },
              scale: { type: "spring", stiffness: 400 }
            }}
          >
            <Brain size={36} className="text-purple-400" />
          </motion.div>
          
          <motion.h1 
            className="mt-2 md:mt-5 text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Digit Recognition
          </motion.h1>
        </div>
        
        {/* Decorative underline */}
        <motion.div 
          className="h-1 w-32 md:w-40 mt-3 rounded-full bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </div>
      
      <motion.p 
        className="text-gray-300 max-w-lg mx-auto font-medium text-base md:text-lg px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Draw or upload handwritten digits and watch our AI model identify them in real-time
      </motion.p>
    </motion.div>
  );
};

export default Header;
