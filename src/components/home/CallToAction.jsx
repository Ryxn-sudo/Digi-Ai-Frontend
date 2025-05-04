import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, PenLine, Gamepad2 } from 'lucide-react';

const CallToAction = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="py-24 bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-indigo-900 to-purple-800 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/20"
        >
          <div className="relative px-6 py-16 md:p-12 lg:p-20">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
            
            <div className="relative text-center max-w-3xl mx-auto">
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to explore handwritten digit recognition?
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl text-indigo-200 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Join thousands of users who are already exploring, learning, and contributing to our AI-powered platform.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/">
                  <motion.button
                    className="px-8 py-4 bg-white text-indigo-900 hover:bg-indigo-100 rounded-xl text-lg font-medium flex items-center justify-center w-full sm:w-auto"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <PenLine size={20} className="mr-2" />
                    Start Recognition
                    <ArrowRight size={18} className="ml-2" />
                  </motion.button>
                </Link>
                
                <Link to="/game">
                  <motion.button
                    className="px-8 py-4 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-lg font-medium flex items-center justify-center w-full sm:w-auto"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Gamepad2 size={20} className="mr-2" />
                    Play the Game
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Extra information section */}
        <div className="mt-20 text-center">
          <motion.h3 
            className="text-2xl font-bold text-white mb-6"
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
              <div
                key={index}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm"
              >
                {tech}
              </div>
            ))}
          </motion.div>
          
          <motion.p 
            className="text-gray-400 text-sm"
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
