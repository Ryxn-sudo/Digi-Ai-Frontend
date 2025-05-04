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
        staggerChildren: 0.15
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
      icon: <Brain size={28} />,
      color: 'from-blue-500 to-blue-600',
      path: '/',
      shadowColor: 'shadow-blue-500/20'
    },
    {
      title: 'Interactive Game',
      description: 'Play our number challenge game to test your drawing skills and compete for high scores.',
      icon: <Gamepad2 size={28} />,
      color: 'from-green-500 to-emerald-600',
      path: '/game',
      shadowColor: 'shadow-green-500/20'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View detailed analytics about model performance and your interaction history.',
      icon: <BarChart3 size={28} />,
      color: 'from-purple-500 to-violet-600',
      path: '/analytics',
      shadowColor: 'shadow-purple-500/20'
    },
    {
      title: 'User Dashboard',
      description: 'Track your personal statistics, history and performance over time.',
      icon: <UserPlus size={28} />,
      color: 'from-amber-500 to-orange-600',
      path: '/dashboard',
      shadowColor: 'shadow-amber-500/20'
    },
    {
      title: 'Training Contribution',
      description: 'Contribute to improving our model by submitting labeled examples of digits.',
      icon: <PenTool size={28} />,
      color: 'from-red-500 to-rose-600',
      path: '/training',
      shadowColor: 'shadow-red-500/20'
    },
    {
      title: 'Learning Resources',
      description: 'Access educational resources about machine learning and neural networks.',
      icon: <BookOpen size={28} />,
      color: 'from-cyan-500 to-sky-600',
      path: '#',
      shadowColor: 'shadow-cyan-500/20'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-gray-950" id="features">
      {/* Background grid pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1rem 1rem, #333 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          opacity: 0.1
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
          ref={ref}
        >
          <span className="inline-block text-blue-400 text-lg font-medium mb-2">Platform Features</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Features</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore the variety of tools and features our platform offers to interact with handwritten digit recognition technology.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8"
        >
          {features.map((feature, index) => (
            <Link to={feature.path} key={index}>
              <motion.div
                variants={item}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-xl hover:border-gray-600"
              >
                <div className="p-6 md:p-8 flex-1">
                  <div className={`w-14 h-14 mb-5 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center text-white shadow-lg ${feature.shadowColor}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
                <div className={`h-1.5 w-full bg-gradient-to-r ${feature.color}`}></div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
        
        {/* Additional feature highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 md:mt-24 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to explore more?</h3>
              <p className="text-gray-300">Discover our complete suite of AI-powered digit recognition tools.</p>
            </div>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300"
              >
                Explore All Features
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
