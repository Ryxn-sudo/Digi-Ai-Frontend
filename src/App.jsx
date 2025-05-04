import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PredictionPage from './pages/PredictionPage';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import Navbar from './components/common/Navbar';
import TrainingContributionPage from './pages/TrainingContributionPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  return (
    <BrowserRouter>
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/predict" element={<PredictionPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/training" element={<TrainingContributionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </BrowserRouter>
  );
}

export default App;
