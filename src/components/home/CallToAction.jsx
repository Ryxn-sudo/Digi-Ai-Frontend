import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, PenLine, Gamepad2, Sparkles } from 'lucide-react';

const CallToAction = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-600/20 blur-3xl"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3
            }}
            animate={{ 
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: Math.random() * 10 + 15, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-indigo-900/80 via-indigo-800/80 to-purple-900/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/30 border border-indigo-500/30"
        >
          <div className="relative px-6 py-16 md:p-12 lg:p-20">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl"></div>
            
            <div className="relative text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20"
              >
                <Sparkles size={18} className="text-indigo-300 mr-2" />
                <span className="text-white/90">Join thousands of users worldwide</span>
              </motion.div>
              
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to explore handwritten digit recognition?
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl text-indigo-200 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Join thousands of users who are already exploring, learning, and contributing to our AI-powered platform.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-5 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/predict">
                  <motion.button
                    className="px-8 py-4 bg-white text-indigo-900 hover:bg-indigo-50 rounded-xl text-lg font-medium flex items-center justify-center w-full sm:w-auto shadow-lg shadow-indigo-900/30"
                    whileHover={{ scale: 1.03, boxShadow: '0 20px 25px -5px rgba(79, 70, 229, 0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <PenLine size={20} className="mr-2" />
                    Start Recognition
                    <ArrowRight size={18} className="ml-2" />
                  </motion.button>
                </Link>
                
                <Link to="/game">
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white rounded-xl text-lg font-medium flex items-center justify-center w-full sm:w-auto shadow-lg shadow-purple-900/30"
                    whileHover={{ scale: 1.03, boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Gamepad2 size={20} className="mr-2" />
                    Play the Game
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Technology section */}
        <div className="mt-20 md:mt-24 text-center">
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-white mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Powered by Advanced Technology
          </motion.h3>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {['TensorFlow', 'PyTorch', 'React', 'Node.js', 'OpenCV', 'Framer Motion'].map((tech, index) => (
              <motion.div
                key={index}
                className="px-5 py-3 bg-gray-800/80 text-gray-300 rounded-full text-sm md:text-base font-medium backdrop-blur-sm border border-gray-700/50"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(75, 85, 99, 0.5)' }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
          
          <motion.p 
            className="text-gray-400 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            © {new Date().getFullYear()} Handwritten Digit Recognition App. All rights reserved.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
