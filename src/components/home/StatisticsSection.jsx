import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import trio from '../../assets/Images/trio.png'
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
      value: '150+',
      label: 'Predictions Made',
      description: 'Number of digit predictions processed'
    },
    {
      value: '25+',
      label: 'User Contributions',
      description: 'Handwritten samples contributed by users'
    },
    {
      value: '32+',
      label: 'Daily Players',
      description: 'Users playing our number challenge game daily'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/5 blur-3xl"
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.2 + 0.1
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Impact</span> by the Numbers
          </h2>
          <p className="text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
            Our platform continues to grow and improve with each user interaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ 
                opacity: inView ? 1 : 0, 
                scale: inView ? 1 : 0.9,
                y: inView ? 0 : 20
              }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 relative overflow-hidden group hover:border-white/30 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-70 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full"></div>
              
              <motion.h3 
                className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white mb-3 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: inView ? 1 : 0,
                  y: inView ? 0 : 20
                }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              >
                {stat.value}
              </motion.h3>
              <h4 className="text-lg md:text-xl font-medium text-indigo-300 mb-2">{stat.label}</h4>
              <p className="text-indigo-200/80 text-sm md:text-base">{stat.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* User Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-white/10 max-w-4xl mx-auto shadow-xl shadow-purple-900/20"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-indigo-400/50 flex-shrink-0 shadow-lg shadow-purple-900/30">
              <img 
                src={trio}
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <svg className="h-10 w-10 text-indigo-400 mb-4 opacity-70" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-white text-lg md:text-xl italic mb-6 leading-relaxed">
                "This platform has revolutionized how to teach pattern recognition to  students. The interactive nature and real-time feedback make it an invaluable educational tool."
              </p>
              <div>
                <h4 className="text-xl md:text-2xl font-medium text-white">Team. Digi AI</h4>
                <p className="text-indigo-300">Computer Science Department</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection;
