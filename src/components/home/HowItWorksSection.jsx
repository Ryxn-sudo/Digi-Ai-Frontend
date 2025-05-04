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
      icon: <PenLine size={24} />,
      title: 'Draw a Digit',
      description: 'Use our interactive canvas to draw any digit from 0 to 9.',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      icon: <FileImage size={24} />,
      title: 'Upload an Image',
      description: 'Alternatively, upload an image of a handwritten digit.',
      color: 'from-indigo-600 to-purple-600'
    },
    {
      icon: <Brain size={24} />,
      title: 'AI Processing',
      description: 'Our neural network processes and analyzes the image.',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: <Check size={24} />,
      title: 'View the Result',
      description: 'Get instant results showing the predicted digit and confidence score.',
      color: 'from-pink-600 to-red-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-800" id="how-it-works" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform uses advanced neural networks to recognize handwritten digits with high accuracy.
          </p>
        </motion.div>

        <div className="relative">
          
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-red-600 hidden lg:block" style={{ transform: 'translateX(-50%)' }}></div>
          
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}
              >
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300 text-lg">{step.description}</p>
                </div>
                
                <div className="my-6 lg:my-0 relative">
                  <motion.div 
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white z-10 relative`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    {step.icon}
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-full blur-lg transform scale-110"></div>
                </div>
                
                <div className="lg:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Neural Network Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 bg-gray-900 rounded-2xl p-8 border border-gray-700"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Behind the Scenes: Our Neural Network</h3>
          
          <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
            <img 
              src="https://miro.medium.com/max/2000/1*bhFifratH9DjKqMBTeQG5A.gif" 
              alt="Neural Network Animation" 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent flex items-center">
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">Convolutional Neural Network</h4>
                <p className="text-gray-300 max-w-md">
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
