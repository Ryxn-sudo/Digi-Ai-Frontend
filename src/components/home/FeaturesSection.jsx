import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  Gamepad2, 
  BarChart3, 
  UserPlus, 
  PenTool,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      title: 'Digit Recognition',
      description: 'Draw or upload images of handwritten digits and let our AI model recognize them with high accuracy.',
      icon: <Brain size={24} />,
      color: 'bg-blue-500',
      path: '/'
    },
    {
      title: 'Interactive Game',
      description: 'Play our number challenge game to test your drawing skills and compete for high scores.',
      icon: <Gamepad2 size={24} />,
      color: 'bg-green-500',
      path: '/game'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View detailed analytics about model performance and your interaction history.',
      icon: <BarChart3 size={24} />,
      color: 'bg-purple-500',
      path: '/analytics'
    },
    {
      title: 'User Dashboard',
      description: 'Track your personal statistics, history and performance over time.',
      icon: <UserPlus size={24} />,
      color: 'bg-amber-500',
      path: '/dashboard'
    },
    {
      title: 'Training Contribution',
      description: 'Contribute to improving our model by submitting labeled examples of digits.',
      icon: <PenTool size={24} />,
      color: 'bg-red-500',
      path: '/training'
    },
    {
      title: 'Learning Resources',
      description: 'Access educational resources about machine learning and neural networks.',
      icon: <BookOpen size={24} />,
      color: 'bg-cyan-500',
      path: '#'
    }
  ];

  return (
    <section className="py-20 bg-gray-900" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the variety of tools and features our platform offers to interact with handwritten digit recognition technology.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <Link to={feature.path}>
                <div className="p-6">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
                <div className={`h-1 w-full ${feature.color}`}></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
