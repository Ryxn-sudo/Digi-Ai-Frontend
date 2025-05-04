import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, PieChart, LineChart } from 'lucide-react';

// Note: You would need to install a charting library like Chart.js or Recharts
// This is using a placeholder for demonstration

const AnalyticsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
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
            Model Analytics
          </motion.h1>
          
          <div className="w-32"></div> {/* Spacer for alignment */}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Prediction Distribution Chart */}
            <ChartCard 
              title="Number Distribution" 
              description="Distribution of predicted numbers"
              icon={<PieChart />}
            >
              <div className="h-64 flex items-center justify-center">
                {/* Placeholder for actual chart */}
                <div className="flex items-end h-40 space-x-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <div 
                      key={num} 
                      className="w-8 bg-indigo-600 rounded-t-md flex justify-center pb-1 text-xs"
                      style={{ 
                        height: `${(Math.random() * 70 + 20)}%`,
                        opacity: 0.7 + (num / 20)
                      }}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>
            
            {/* Accuracy Trend Chart */}
            <ChartCard 
              title="Accuracy Trend" 
              description="Model accuracy over time"
              icon={<LineChart />}
            >
              <div className="h-64 flex items-center justify-center">
                {/* Placeholder for actual chart */}
                <svg height="160" width="320" className="overflow-visible">
                  <polyline
                    points="0,100 40,95 80,105 120,90 160,60 200,40 240,55 280,45 320,30"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3"
                  />
                  {/* X-axis */}
                  <line x1="0" y1="160" x2="320" y2="160" stroke="#6b7280" strokeWidth="2" />
                  {/* Y-axis */}
                  <line x1="0" y1="0" x2="0" y2="160" stroke="#6b7280" strokeWidth="2" />
                </svg>
              </div>
            </ChartCard>
            
            {/* Confusion Matrix */}
            <ChartCard 
              title="Confusion Matrix" 
              description="Predictions vs ground truth"
              icon={<BarChart3 />}
            >
              <div className="h-64 p-4 overflow-auto">
                <table className="w-full text-sm text-gray-300">
                  <thead>
                    <tr>
                      <th className="p-1 border border-gray-700"></th>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <th key={num} className="p-1 border border-gray-700 text-xs">{num}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(row => (
                      <tr key={row}>
                        <td className="p-1 border border-gray-700 text-xs font-medium">{row}</td>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(col => (
                          <td 
                            key={col} 
                            className="p-1 border border-gray-700 text-center text-xs"
                            style={{ 
                              backgroundColor: row === col ? 
                                `rgba(139, 92, 246, ${0.3 + Math.random() * 0.5})` : 
                                `rgba(59, 130, 246, ${Math.random() * 0.3})`
                            }}
                          >
                            {row === col ? Math.floor(Math.random() * 90 + 10) : Math.floor(Math.random() * 10)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ChartCard>
            
            {/* Performance Metrics */}
            <ChartCard 
              title="Performance Metrics" 
              description="Key model performance indicators"
              icon={<BarChart3 />}
            >
              <div className="p-4 space-y-4">
                <MetricBar label="Overall Accuracy" value={92} />
                <MetricBar label="Precision" value={89} />
                <MetricBar label="Recall" value={94} />
                <MetricBar label="F1 Score" value={91} />
              </div>
            </ChartCard>
          </div>
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

const MetricBar = ({ label, value }) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-medium text-indigo-400">{value}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-indigo-500 h-2.5 rounded-full" 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
