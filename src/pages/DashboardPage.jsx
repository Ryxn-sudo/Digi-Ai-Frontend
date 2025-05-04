import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, History, PieChart, BarChart3, Percent, Brain, ChevronLeft, ChevronRight } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalPredictions: 0,
    correctPredictions: 0,
    accuracy: 0,
    gameScore: 0,
    longestStreak: 0,
    gamesPlayed: 0
  });
  
  const [fullHistory, setFullHistory] = useState([]);
  const [displayHistory, setDisplayHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [digitDistribution, setDigitDistribution] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      try {
        setIsLoading(true);
        
        // Get basic stats
        const highScore = parseInt(localStorage.getItem('numberGame_highScore') || '0');
        const highStreak = parseInt(localStorage.getItem('numberGame_highStreak') || '0');
        const gamesPlayed = parseInt(localStorage.getItem('numberGame_gamesPlayed') || '0');
        const totalPredictions = parseInt(localStorage.getItem('numberGame_totalPredictions') || '0');
        const correctPredictions = parseInt(localStorage.getItem('numberGame_correctPredictions') || '0');
        
        // Calculate accuracy
        const accuracy = totalPredictions > 0 
          ? Math.round((correctPredictions / totalPredictions) * 100) 
          : 0;
        
        // Get prediction history
        const predictionHistoryString = localStorage.getItem('numberGame_predictionHistory');
        const predictionHistory = predictionHistoryString ? JSON.parse(predictionHistoryString) : [];
        
        // Process history for display and calculate digit distribution
        const processedHistory = predictionHistory.map((pred, index) => ({
          id: index,
          date: new Date(pred.timestamp).toLocaleDateString(),
          time: new Date(pred.timestamp).toLocaleTimeString(),
          number: pred.targetDigit,
          predicted: pred.predictedDigit,
          correct: pred.isCorrect,
          confidence: pred.confidence || 0
        }));
        
        // Create digit distribution data
        const distribution = {};
        for (let i = 0; i <= 9; i++) {
          // Count how many times each digit was the target
          distribution[i] = {
            total: predictionHistory.filter(p => p.targetDigit === i).length,
            correct: predictionHistory.filter(p => p.targetDigit === i && p.isCorrect).length
          };
        }
        
        // Update state
        setStats({
          totalPredictions,
          correctPredictions,
          accuracy,
          gameScore: highScore,
          longestStreak: highStreak,
          gamesPlayed
        });
        
        setFullHistory(processedHistory.reverse()); // Newest first
        setDigitDistribution(distribution);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading game analytics data:", error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Handle pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayHistory(fullHistory.slice(startIndex, endIndex));
  }, [currentPage, fullHistory]);

  const totalPages = Math.ceil(fullHistory.length / itemsPerPage);
  
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-6 sm:mb-8">
          <Link to="/">
            <motion.button 
              className="flex items-center text-white bg-gray-800 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </motion.button>
          </Link>
          
          <motion.h1 
            className="text-xl sm:text-3xl font-bold text-white w-full sm:w-auto text-center sm:text-left order-first sm:order-none mb-4 sm:mb-0"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            Game Analytics Dashboard
          </motion.h1>
          
          <Link to="/game">
            <motion.button
              className="flex items-center text-white bg-green-600 px-3 sm:px-4 py-2 rounded-lg hover:bg-green-500 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Award size={18} className="mr-2" />
              Play Game
            </motion.button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="w-16 h-16 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Total Predictions" 
                value={stats.totalPredictions} 
                icon={<Brain className="text-blue-400" />}
              />
              <StatCard 
                title="Model Accuracy" 
                value={`${stats.accuracy}%`} 
                icon={<Percent className="text-yellow-400" />}
                valueColor={stats.accuracy > 80 ? "text-green-400" : stats.accuracy > 60 ? "text-yellow-400" : "text-red-400"}
              />
              <StatCard 
                title="Games Played" 
                value={stats.gamesPlayed} 
                icon={<Award className="text-green-400" />}
              />
              <StatCard 
                title="Longest Streak" 
                value={stats.longestStreak} 
                icon={<History className="text-purple-400" />}
              />
            </div>
            
            {/* Charts and Data Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Digit Distribution Chart */}
              <ChartCard 
                title="Recognition by Digit" 
                description="How well each digit was recognized"
                icon={<BarChart3 />}
              >
                <div className="h-64 flex items-end space-x-1 sm:space-x-2 px-2 py-4">
                  {Object.keys(digitDistribution).map(digit => {
                    const totalAttempts = digitDistribution[digit].total;
                    const correctAttempts = digitDistribution[digit].correct;
                    const accuracy = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;
                    
                    return (
                      <div key={digit} className="flex-1 flex flex-col items-center justify-end">
                        <div className="w-full flex flex-col items-center">
                          {totalAttempts > 0 && (
                            <div 
                              className="w-full bg-green-600/70 rounded-t"
                              style={{ height: `${Math.max(5, (accuracy / 100) * 150)}px` }}
                            ></div>
                          )}
                          {totalAttempts > 0 && (
                            <div 
                              className="w-full bg-red-600/70"
                              style={{ height: `${Math.max(5, ((totalAttempts - correctAttempts) / totalAttempts) * 150)}px` }}
                            ></div>
                          )}
                        </div>
                        <div className="mt-2 text-sm font-medium text-gray-300">{digit}</div>
                        {totalAttempts > 0 && (
                          <div className="text-xs text-gray-400">{Math.round(accuracy)}%</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ChartCard>
              
              {/* Performance Metrics */}
              <ChartCard 
                title="Performance Metrics" 
                description="Key performance indicators"
                icon={<PieChart />}
              >
                <div className="p-4 space-y-4">
                  <MetricBar label="Correct Predictions" value={stats.correctPredictions} max={stats.totalPredictions} />
                  <MetricBar label="Accuracy" value={stats.accuracy} max={100} suffix="%" />
                  <MetricBar label="Games Played" value={stats.gamesPlayed} max={Math.max(20, stats.gamesPlayed * 1.5)} />
                  <MetricBar 
                    label="Best Score" 
                    value={stats.gameScore} 
                    max={Math.max(100, stats.gameScore * 1.2)} 
                  />
                </div>
              </ChartCard>
            </div>
            
            {/* Recent Activity Table with Pagination */}
            <ChartCard 
              title="Recent Activity" 
              description="Your latest prediction results"
              icon={<History />}
            >
              <div className="overflow-x-auto">
                {displayHistory.length > 0 ? (
                  <>
                    <table className="w-full text-sm text-left text-gray-300">
                      <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                        <tr>
                          <th scope="col" className="px-4 py-2">Date & Time</th>
                          <th scope="col" className="px-4 py-2">Target</th>
                          <th scope="col" className="px-4 py-2">Predicted</th>
                          <th scope="col" className="px-4 py-2">Confidence</th>
                          <th scope="col" className="px-4 py-2">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayHistory.map((item) => (
                          <tr key={item.id} className="bg-gray-800/50 border-b border-gray-700">
                            <td className="px-4 py-2 text-xs">
                              <div>{item.date}</div>
                              <div className="text-gray-400">{item.time}</div>
                            </td>
                            <td className="px-4 py-2">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-900/70 rounded-lg text-white font-bold">
                                {item.number}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-white font-bold ${
                                item.correct ? 'bg-green-700/70' : 'bg-red-700/70'
                              }`}>
                                {item.predicted}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              {item.confidence ? `${Math.round(item.confidence * 100)}%` : 'N/A'}
                            </td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                item.correct ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
                              }`}>
                                {item.correct ? 'Correct' : 'Incorrect'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center p-4">
                      <div className="text-sm text-gray-400">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, fullHistory.length)} of {fullHistory.length} entries
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={goToPreviousPage}
                          disabled={currentPage === 1}
                          className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-500' : 'text-white hover:bg-gray-700'}`}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <div className="flex items-center px-3 bg-gray-800 rounded-md">
                          <span className="text-white">{currentPage} / {totalPages || 1}</span>
                        </div>
                        <button 
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages || totalPages === 0}
                          className={`p-2 rounded-md ${currentPage === totalPages || totalPages === 0 ? 'text-gray-500' : 'text-white hover:bg-gray-700'}`}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center text-gray-400">
                    No prediction history yet. Start playing the game to collect data.
                  </div>
                )}
              </div>
            </ChartCard>
          </>
        )}
      </div>
    </motion.div>
  );
};

const ChartCard = ({ title, description, icon, children }) => {
  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <div className="text-indigo-400">
          {React.cloneElement(icon, { size: 20 })}
        </div>
      </div>
      <div className="p-2">
        {children}
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon, valueColor = "text-white" }) => {
  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700 flex flex-col items-center"
      whileHover={{ scale: 1.03 }}
    >
      <div className="p-3 rounded-full bg-gray-700/50 mb-3">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h3 className="text-sm sm:text-base font-medium text-gray-300">{title}</h3>
      <p className={`text-xl sm:text-3xl font-bold ${valueColor} mt-1`}>{value}</p>
    </motion.div>
  );
};

const MetricBar = ({ label, value, max, suffix = "" }) => {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-medium text-indigo-400">{value}{suffix}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-indigo-500 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DashboardPage;
