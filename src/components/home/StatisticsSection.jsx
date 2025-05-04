import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatisticsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const stats = [
    {
      value: '98.7%',
      label: 'Model Accuracy',
      description: 'Recognition accuracy on MNIST test dataset'
    },
    {
      value: '1.5M+',
      label: 'Predictions Made',
      description: 'Number of digit predictions processed'
    },
    {
      value: '25K+',
      label: 'User Contributions',
      description: 'Handwritten samples contributed by users'
    },
    {
      value: '3.2K+',
      label: 'Daily Players',
      description: 'Users playing our number challenge game daily'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">By the Numbers</h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Our platform continues to grow and improve with each user interaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: inView ? 1 : 0, 
                scale: inView ? 1 : 0.9 
              }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full"></div>
              <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-white/5 rounded-full"></div>
              
              <motion.h3 
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: inView ? 1 : 0,
                  y: inView ? 0 : 20
                }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              >
                {stat.value}
              </motion.h3>
              <h4 className="text-xl font-medium text-indigo-300 mb-1">{stat.label}</h4>
              <p className="text-indigo-200/80 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* User Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-400 flex-shrink-0">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <svg className="h-8 w-8 text-indigo-400 mb-4 opacity-70" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-white text-lg italic mb-6">
                "This platform has revolutionized how I teach pattern recognition to my students. The interactive nature and real-time feedback make it an invaluable educational tool."
              </p>
              <div>
                <h4 className="text-xl font-medium text-white">Dr. Emily Chen</h4>
                <p className="text-indigo-300">Computer Science Professor</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection;
