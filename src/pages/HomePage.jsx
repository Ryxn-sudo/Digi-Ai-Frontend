import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import StatisticsSection from '../components/home/StatisticsSection';
import CallToAction from '../components/home/CallToAction';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatisticsSection />
      <CallToAction />
    </motion.div>
  );
};

export default HomePage;
