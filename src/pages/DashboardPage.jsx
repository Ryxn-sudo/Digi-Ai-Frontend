import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, History, PieChart, BarChart3, Percent, Brain, ChevronLeft, ChevronRight, Info } from 'lucide-react';

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
      className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <Link to="/">
            <motion.button 
              className="flex items-center text-white bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-gray-700 shadow-lg border border-gray-700/50 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </motion.button>
          </Link>
          
          <motion.h1 
            className="text-2xl sm:text-3xl font-bold text-white bg-gray-800/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700/30 shadow-md"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            Game Analytics Dashboard
          </motion.h1>
          
          <Link to="/game">
            <motion.button
              className="flex items-center text-white bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 rounded-lg hover:from-green-500 hover:to-emerald-500 shadow-lg border border-green-500/30 w-full sm:w-auto"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Award size={18} className="mr-2" />
              Play Game
            </motion.button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <SkeletonCard key={i} type={i <= 4 ? 'stat' : 'chart'} />
            ))}
          </div>
        ) : (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6">
              {[
                {
                  title: "Total Predictions", 
                  value: stats.totalPredictions, 
                  icon: <Brain className="text-blue-300" />,
                  color: "from-blue-600 to-indigo-700",
                  description: "Total number of digits predicted"
                },
                { 
                  title: "Model Accuracy", 
                  value: `${stats.accuracy}%`, 
                  icon: <Percent className="text-yellow-300" />,
                  color: stats.accuracy > 80 ? "from-green-600 to-emerald-700" : 
                         stats.accuracy > 60 ? "from-yellow-600 to-amber-700" : 
                         "from-red-600 to-rose-700",
                  description: "Percentage of correct predictions"
                },
                { 
                  title: "Games Played", 
                  value: stats.gamesPlayed, 
                  icon: <Award className="text-purple-300" />,
                  color: "from-purple-600 to-fuchsia-700",
                  description: "Number of game sessions"
                },
                { 
                  title: "Longest Streak", 
                  value: stats.longestStreak, 
                  icon: <History className="text-teal-300" />,
                  color: "from-teal-600 to-cyan-700",
                  description: "Highest consecutive correct predictions"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ translateY: -5, boxShadow: "0 10px 25px -5px rgba(13, 16, 45, 0.7)" }}
                >
                  <div className={`h-1.5 bg-gradient-to-r ${stat.color}`}></div>
                  <div className="p-4 sm:p-6 flex flex-col items-center">
                    <div className="p-2 sm:p-3 rounded-full bg-gray-700/50 mb-3 text-indigo-400">
                      {React.cloneElement(stat.icon, { size: 20, className: stat.icon.props.className })}
                    </div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-300 text-center">{stat.title}</h3>
                    <p className={`text-xl sm:text-3xl font-bold text-white mt-1`}>{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-1 text-center hidden sm:block">{stat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Charts and Data Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-6">
              {/* Digit Distribution Chart */}
              <ChartCard 
                title="Recognition by Digit" 
                description="How well each digit was recognized"
                icon={<BarChart3 />}
                tooltipContent="Shows correct vs incorrect predictions for each digit"
              >
                <div className="h-64 sm:h-72 flex items-end space-x-1 sm:space-x-2 px-2 py-4">
                  {Object.keys(digitDistribution).map(digit => {
                    const totalAttempts = digitDistribution[digit].total;
                    const correctAttempts = digitDistribution[digit].correct;
                    const accuracy = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;
                    
                    return (
                      <div key={digit} className="flex-1 flex flex-col items-center justify-end group">
                        <div className="w-full flex flex-col items-center relative">
                          {totalAttempts > 0 ? (
                            <>
                              <div 
                                className="w-full bg-green-600/80 rounded-t transition-all duration-300 group-hover:brightness-110 group-hover:shadow-md group-hover:shadow-green-800/50"
                                style={{ height: `${Math.max(8, (accuracy / 100) * 150)}px` }}
                            >
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-gray-900 text-green-400 text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {correctAttempts} correct
                              </div>
                            </div>
                            <div 
                              className="w-full bg-red-600/80 transition-all duration-300 group-hover:brightness-110 group-hover:shadow-md group-hover:shadow-red-800/50"
                              style={{ height: `${Math.max(8, ((totalAttempts - correctAttempts) / totalAttempts) * 150)}px` }}
                            >
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-1 bg-gray-900 text-red-400 text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {totalAttempts - correctAttempts} incorrect
                              </div>
                            </div>
                          </>
                          ) : (
                            <div className="h-10 w-full flex items-center justify-center">
                              <span className="text-xs text-gray-500">No data</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-center mt-2 min-h-[40px]">
                          <div className="w-8 h-8 rounded-full bg-gray-700/80 flex items-center justify-center text-sm font-medium text-gray-300">{digit}</div>
                          {totalAttempts > 0 && (
                            <div className="text-xs text-gray-400 mt-1">{Math.round(accuracy)}%</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mx-4 mb-2">
                  <div className="flex items-center text-xs text-gray-400">
                    <div className="w-3 h-3 bg-green-600/80 rounded mr-1"></div>
                    <span>Correct predictions</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <div className="w-3 h-3 bg-red-600/80 rounded mr-1"></div>
                    <span>Incorrect predictions</span>
                  </div>
                </div>
              </ChartCard>
              
              {/* Performance Metrics */}
              <ChartCard 
                title="Performance Metrics" 
                description="Key performance indicators"
                icon={<PieChart />}
                tooltipContent="Visual representation of your game performance"
              >
                <div className="p-4 space-y-6">
                  <MetricBar 
                    label="Correct Predictions" 
                    value={stats.correctPredictions} 
                    max={stats.totalPredictions}
                    color="from-blue-600 to-indigo-500"
                    tooltip={`${stats.correctPredictions} out of ${stats.totalPredictions} predictions were correct`}
                  />
                  <MetricBar 
                    label="Accuracy" 
                    value={stats.accuracy} 
                    max={100} 
                    suffix="%" 
                    color={
                      stats.accuracy > 80 ? "from-green-600 to-emerald-500" :
                      stats.accuracy > 60 ? "from-yellow-600 to-amber-500" :
                      "from-red-600 to-rose-500"
                    }
                    tooltip="Percentage of correct predictions"
                  />
                  <MetricBar 
                    label="Games Played" 
                    value={stats.gamesPlayed} 
                    max={Math.max(20, stats.gamesPlayed * 1.5)} 
                    color="from-purple-600 to-fuchsia-500"
                    tooltip="Number of game sessions played"
                  />
                  <MetricBar 
                    label="Best Score" 
                    value={stats.gameScore} 
                    max={Math.max(100, stats.gameScore * 1.2)}
                    color="from-teal-600 to-cyan-500" 
                    tooltip="Your highest achieved score"
                  />
                </div>
              </ChartCard>
            </div>
            
            {/* Recent Activity Table with Pagination */}
            <ChartCard 
              title="Recent Activity" 
              description="Your latest prediction results"
              icon={<History />}
              tooltipContent="History of your most recent predictions"
            >
              {displayHistory.length > 0 ? (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-300">
                      <thead className="text-xs uppercase bg-gray-700/80 text-gray-300">
                        <tr>
                          <th scope="col" className="px-4 py-3">Date & Time</th>
                          <th scope="col" className="px-4 py-3">Target</th>
                          <th scope="col" className="px-4 py-3">Predicted</th>
                          <th scope="col" className="px-4 py-3">Confidence</th>
                          <th scope="col" className="px-4 py-3">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayHistory.map((item, index) => (
                          <motion.tr 
                            key={item.id} 
                            className="bg-gray-800/50 border-b border-gray-700 hover:bg-gray-700/40 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <td className="px-4 py-3 text-xs">
                              <div>{item.date}</div>
                              <div className="text-gray-400">{item.time}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-900/70 rounded-lg text-white font-bold shadow-inner">
                                {item.number}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-white font-bold shadow-inner ${
                                item.correct ? 'bg-green-700/70' : 'bg-red-700/70'
                              }`}>
                                {item.predicted}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="w-full bg-gray-700 rounded-full h-1.5 max-w-[100px]">
                                <div
                                  className={`h-1.5 rounded-full ${item.correct ? 'bg-green-500' : 'bg-amber-500'}`} 
                                  style={{ width: `${Math.round(item.confidence % 100)}%` }}
                                ></div>
                              </div>
                              <div className="text-xs mt-1">
                                {item.confidence ? `${Math.round(item.confidence % 100)}%` : 'N/A'}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.correct ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
                              }`}>
                                {item.correct ? 'Correct' : 'Incorrect'}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination Controls */}
                  <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-3">
                    <div className="text-xs sm:text-sm text-gray-400 order-2 sm:order-1">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, fullHistory.length)} of {fullHistory.length} entries
                    </div>
                    <div className="flex space-x-2 order-1 sm:order-2">
                      <motion.button 
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-500' : 'text-white hover:bg-gray-700'}`}
                        whileTap={{ scale: currentPage === 1 ? 1 : 0.9 }}
                      >
                        <ChevronLeft size={20} />
                      </motion.button>
                      <div className="flex items-center px-3 bg-gray-800 rounded-md">
                        <span className="text-white">{currentPage} / {totalPages || 1}</span>
                      </div>
                      <motion.button 
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className={`p-2 rounded-md ${currentPage === totalPages || totalPages === 0 ? 'text-gray-500' : 'text-white hover:bg-gray-700'}`}
                        whileTap={{ scale: currentPage === totalPages ? 1 : 0.9 }}
                      >
                        <ChevronRight size={20} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Brain size={48} className="mx-auto text-gray-600 mb-4" />
                  <h3 className="text-xl font-medium text-gray-400 mb-2">No prediction history yet</h3>
                  <p className="text-gray-500 mb-6">Start playing the game to collect data</p>
                  <Link to="/game">
                    <motion.button
                      className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg border border-indigo-500/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Play Now
                    </motion.button>
                  </Link>
                </div>
              )}
            </ChartCard>
          </>
        )}
      </div>
    </motion.div>
  );
};

const ChartCard = ({ title, description, icon, children, tooltipContent }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 shadow-lg"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="p-3 sm:p-4 border-b border-gray-700 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-medium text-white flex items-center gap-2">
            {title}
            {tooltipContent && (
              <div className="relative">
                <Info 
                  size={16} 
                  className="text-gray-400 hover:text-white cursor-help" 
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                />
                {showTooltip && (
                  <div className="absolute z-10 bg-gray-900 p-2 text-xs text-gray-300 rounded shadow-lg border border-gray-700 w-48 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2">
                    {tooltipContent}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900 border-r border-b border-gray-700"></div>
                  </div>
                )}
              </div>
            )}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400">{description}</p>
        </div>
        <div className="text-indigo-400">
          {React.cloneElement(icon, { size: 18 })}
        </div>
      </div>
      <div className="p-1 sm:p-2">
        {children}
      </div>
    </motion.div>
  );
};

const MetricBar = ({ label, value, max, suffix = "", color = "from-indigo-600 to-blue-500", tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  
  return (
    <div className="group relative">
      {tooltip && showTooltip && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 p-1.5 text-xs text-gray-300 rounded shadow-lg border border-gray-700 whitespace-nowrap">
          {tooltip}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900 border-r border-b border-gray-700"></div>
        </div>
      )}
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-medium text-indigo-300">{value}{suffix}</span>
      </div>
      <div 
        className="w-full bg-gray-700/70 rounded-full h-2.5 overflow-hidden cursor-help"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <motion.div 
          className={`bg-gradient-to-r ${color} h-2.5 rounded-full`} 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        ></motion.div>
      </div>
    </div>
  );
};

const SkeletonCard = ({ type }) => {
  if (type === 'stat') {
    return (
      <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 animate-pulse">
        <div className="h-1.5 bg-gray-700"></div>
        <div className="p-4 sm:p-6 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gray-700 mb-3"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3 mb-2"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2 mb-1"></div>
          <div className="h-3 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 animate-pulse">
      <div className="p-4 border-b border-gray-700">
        <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
      <div className="p-4">
        <div className="h-48 bg-gray-700/50 rounded flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
