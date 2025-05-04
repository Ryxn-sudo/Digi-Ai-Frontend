import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PenLine, FileImage, Brain, Check } from 'lucide-react';

const HowItWorksSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const steps = [
    {
      icon: <PenLine size={28} />,
      title: 'Draw a Digit',
      description: 'Use our interactive canvas to draw any digit from 0 to 9.',
      color: 'from-blue-600 to-indigo-600',
      shadowColor: 'shadow-blue-600/20'
    },
    {
      icon: <FileImage size={28} />,
      title: 'Upload an Image',
      description: 'Alternatively, upload an image of a handwritten digit.',
      color: 'from-indigo-600 to-purple-600',
      shadowColor: 'shadow-indigo-600/20'
    },
    {
      icon: <Brain size={28} />,
      title: 'AI Processing',
      description: 'Our neural network processes and analyzes the image.',
      color: 'from-purple-600 to-pink-600',
      shadowColor: 'shadow-purple-600/20'
    },
    {
      icon: <Check size={28} />,
      title: 'View the Result',
      description: 'Get instant results showing the predicted digit and confidence score.',
      color: 'from-pink-600 to-red-600',
      shadowColor: 'shadow-pink-600/20'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-gray-800 relative" id="how-it-works" ref={ref}>
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gray-700 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-gray-700 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 border border-gray-700 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 border border-gray-700 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32"
        >
          <span className="inline-block text-indigo-400 text-lg font-medium mb-2">Simple Process</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Works</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our platform uses advanced neural networks to recognize handwritten digits with high accuracy in just a few simple steps.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-red-600 hidden lg:block" style={{ transform: 'translateX(-50%)' }}>
            <div className="absolute inset-0 animate-pulse opacity-70"></div>
          </div>
          
          <div className="space-y-16 md:space-y-24 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
                transition={{ duration: 0.7, delay: index * 0.25 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}
              >
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'} mb-8 lg:mb-0`}>
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold text-white mb-3"
                    whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                      Step {index + 1}:
                    </span>{' '}
                    {step.title}
                  </motion.h3>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed">{step.description}</p>
                </div>
                
                <div className="lg:my-0 relative">
                  <motion.div 
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white z-10 relative shadow-lg ${step.shadowColor}`}
                    whileHover={{ scale: 1.15, rotate: [0, 5, -5, 0] }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 400, 
                      damping: 10,
                      rotate: { duration: 0.5, ease: "easeInOut" }
                    }}
                  >
                    {step.icon}
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-full blur-lg transform scale-125"></div>
                </div>
                
                <div className="lg:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Neural Network Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.95 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 md:mt-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 md:p-10 border border-gray-700 shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Behind the Scenes: Our Neural Network</h3>
          
          <div className="relative h-64 md:h-96 overflow-hidden rounded-xl">
            <img 
              src="https://miro.medium.com/max/2000/1*bhFifratH9DjKqMBTeQG5A.gif" 
              alt="Neural Network Animation" 
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent flex items-center">
              <div className="p-6 md:p-10">
                <h4 className="text-xl md:text-2xl font-bold text-white mb-3">Convolutional Neural Network</h4>
                <p className="text-gray-300 max-w-md text-base md:text-lg leading-relaxed">
                  Our model uses multiple convolutional layers followed by fully connected layers to achieve over 98% accuracy on recognizing handwritten digits.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
