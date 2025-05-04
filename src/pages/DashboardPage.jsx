import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, History, PieChart } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalPredictions: 0,
    accuracy: 0,
    gameScore: 0,
    longestStreak: 0,
  });
  
  const [history, setHistory] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Fetch user stats and history from API
    setTimeout(() => {
      setStats({
        totalPredictions: 157,
        accuracy: 89,
        gameScore: 450,
        longestStreak: 12,
      });
      
      setHistory([
        { id: 1, date: '2023-10-25', number: 7, correct: true },
        { id: 2, date: '2023-10-24', number: 3, correct: true },
        { id: 3, date: '2023-10-24', number: 9, correct: false },
        // More history items
      ]);
    }, 500);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <motion.button 
              className="flex items-center text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </motion.button>
          </Link>
          
          <motion.h1 
            className="text-3xl font-bold text-white"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            User Dashboard
          </motion.h1>
          
          <div className="w-32"></div> {/* Spacer for alignment */}
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Predictions" 
            value={stats.totalPredictions} 
            icon={<PieChart className="text-blue-400" />}
          />
          <StatCard 
            title="Accuracy" 
            value={`${stats.accuracy}%`} 
            icon={<Award className="text-yellow-400" />}
          />
          <StatCard 
            title="Best Game Score" 
            value={stats.gameScore} 
            icon={<Award className="text-green-400" />}
          />
          <StatCard 
            title="Longest Streak" 
            value={stats.longestStreak} 
            icon={<History className="text-purple-400" />}
          />
        </div>
        
        {/* History Section */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-l-lg">Date</th>
                  <th scope="col" className="px-6 py-3">Number</th>
                  <th scope="col" className="px-6 py-3 rounded-r-lg">Result</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="bg-gray-800/50 border-b border-gray-700">
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{item.number}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${item.correct ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                        {item.correct ? 'Correct' : 'Incorrect'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon }) => {
  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 flex flex-col items-center"
      whileHover={{ scale: 1.03 }}
    >
      <div className="p-3 rounded-full bg-gray-700/50 mb-3">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h3 className="text-lg font-medium text-gray-300">{title}</h3>
      <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </motion.div>
  );
};

export default DashboardPage;
