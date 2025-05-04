import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, PieChart, LineChart, Brain } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart as RechartLine, Line, 
  PieChart as RechartPie, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';


const AnalyticsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [modelStats, setModelStats] = useState({
    overallAccuracy: 0,
    precision: 0,
    recall: 0,
    f1Score: 0,
    totalPredictions: 0
  });
  const [distributionData, setDistributionData] = useState([]);
  const [accuracyTrendData, setAccuracyTrendData] = useState([]);
  const [confusionData, setConfusionData] = useState([]);
  const [radarData, setRadarData] = useState([]);

  // Color palette for charts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57'];

  useEffect(() => {
    const loadAnalyticsData = () => {
      try {
        setIsLoading(true);
        
        // Get prediction history
        const predictionHistoryString = localStorage.getItem('numberGame_predictionHistory');
        const predictionHistory = predictionHistoryString ? JSON.parse(predictionHistoryString) : [];
        
        if (predictionHistory.length === 0) {
          // No data yet, set default values
          setIsLoading(false);
          return;
        }
        
        // Process the data for analytics
        processAnalyticsData(predictionHistory);
        
      } catch (error) {
        console.error("Error loading analytics data:", error);
        setIsLoading(false);
      }
    };
    
    loadAnalyticsData();
  }, []);
  
  const processAnalyticsData = (predictionHistory) => {
    // Initialize visualization data structures
    const distribution = [];
    const digitMetrics = Array(10).fill().map(() => ({ 
      truePositives: 0,
      falsePositives: 0,
      falseNegatives: 0,
      total: 0
    }));
    
    // Create confusion matrix data (10x10 for digits 0-9)
    const matrix = Array(10).fill().map(() => Array(10).fill(0));
    
    // Process each prediction
    predictionHistory.forEach(pred => {
      const target = pred.targetDigit;
      const predicted = pred.predictedDigit;
      
      // Update confusion matrix
      matrix[target][predicted]++;
      
      // Update digit metrics
      digitMetrics[target].total++;
      if (target === predicted) {
        digitMetrics[target].truePositives++;
      } else {
        digitMetrics[target].falseNegatives++;
        digitMetrics[predicted].falsePositives++;
      }
    });
    
    // Format distribution data for recharts
    for (let i = 0; i < 10; i++) {
      const metrics = digitMetrics[i];
      const accuracy = metrics.total > 0 
        ? (metrics.truePositives / metrics.total) * 100 
        : 0;
      
      distribution.push({
        digit: i,
        correct: metrics.truePositives,
        incorrect: metrics.total - metrics.truePositives,
        accuracy: Math.round(accuracy)
      });
    }
    
    // Create accuracy trend data (using sliding window of predictions)
    const trendData = [];
    const windowSize = 5;
    const step = Math.max(1, Math.floor(predictionHistory.length / 10)); // Show at most 10 data points
    
    for (let i = 0; i < predictionHistory.length; i += step) {
      const window = predictionHistory.slice(Math.max(0, i - windowSize), i + 1);
      if (window.length > 0) {
        const correct = window.filter(p => p.isCorrect).length;
        const accuracy = (correct / window.length) * 100;
        trendData.push({
          index: i,
          accuracy: Math.round(accuracy),
          predictions: window.length
        });
      }
    }
    
    // Create radar chart data for digit recognition performance
    const radarChartData = [];
    for (let i = 0; i < 10; i++) {
      const metrics = digitMetrics[i];
      const precision = metrics.truePositives + metrics.falsePositives > 0 
        ? (metrics.truePositives / (metrics.truePositives + metrics.falsePositives)) * 100 
        : 0;
      
      radarChartData.push({
        digit: `Digit ${i}`,
        accuracy: Math.round(metrics.total > 0 ? (metrics.truePositives / metrics.total) * 100 : 0),
        precision: Math.round(precision)
      });
    }
    
    // Format confusion matrix for heatmap
    const confusionMatrixData = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        confusionMatrixData.push({
          targetDigit: i,
          predictedDigit: j,
          count: matrix[i][j],
          isCorrect: i === j
        });
      }
    }
    
    // Calculate overall metrics
    const totalPredictions = predictionHistory.length;
    const correctPredictions = predictionHistory.filter(p => p.isCorrect).length;
    const overallAccuracy = Math.round((correctPredictions / totalPredictions) * 100);
    
    // Calculate overall precision, recall, and F1 score
    let totalTruePositives = 0;
    let totalFalsePositives = 0;
    let totalFalseNegatives = 0;
    
    digitMetrics.forEach(metrics => {
      totalTruePositives += metrics.truePositives;
      totalFalsePositives += metrics.falsePositives;
      totalFalseNegatives += metrics.falseNegatives;
    });
    
    const precision = totalTruePositives + totalFalsePositives > 0 
      ? totalTruePositives / (totalTruePositives + totalFalsePositives) 
      : 0;
    const recall = totalTruePositives + totalFalseNegatives > 0 
      ? totalTruePositives / (totalTruePositives + totalFalseNegatives) 
      : 0;
    const f1Score = precision + recall > 0 
      ? 2 * precision * recall / (precision + recall) 
      : 0;
    
    // Update state
    setDistributionData(distribution);
    setAccuracyTrendData(trendData);
    setConfusionData(confusionMatrixData);
    setRadarData(radarChartData);
    
    setModelStats({
      overallAccuracy,
      precision: Math.round(precision * 100),
      recall: Math.round(recall * 100),
      f1Score: Math.round(f1Score * 100),
      totalPredictions
    });
    
    setIsLoading(false);
  };

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
          
          
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="w-16 h-16 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : modelStats.totalPredictions === 0 ? (
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-10 text-center text-white border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">No Analytics Data Available</h2>
            <p className="mb-6 text-gray-300">Play the game to generate model prediction data for analytics.</p>
            <Link to="/game">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Now
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Number Distribution Chart */}
            <ChartCard 
              title="Number Distribution" 
              description="Distribution of predicted numbers"
              icon={<PieChart />}
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={distributionData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="digit" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#2d3748', borderColor: '#4a5568', color: '#fff' }} 
                      labelStyle={{ color: '#fff' }}
                      formatter={(value, name) => [value, name === 'correct' ? 'Correct' : 'Incorrect']}
                    />
                    <Legend />
                    <Bar dataKey="correct" name="Correct" stackId="a" fill="#4ade80" />
                    <Bar dataKey="incorrect" name="Incorrect" stackId="a" fill="#f87171" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
            
            {/* Accuracy Trend Chart */}
            <ChartCard 
              title="Accuracy Trend" 
              description="Model accuracy over time"
              icon={<LineChart />}
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartLine
                    data={accuracyTrendData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="index" tick={false} label={{ value: 'Predictions Over Time', position: 'insideBottom', offset: 0, fill: '#ccc' }} stroke="#ccc" />
                    <YAxis label={{ value: 'Accuracy %', angle: -90, position: 'insideLeft', offset: 10, fill: '#ccc' }} domain={[0, 100]} stroke="#ccc" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#2d3748', borderColor: '#4a5568', color: '#fff' }} 
                      labelStyle={{ color: '#fff' }}
                      formatter={(value) => [`${value}%`, 'Accuracy']}
                      labelFormatter={() => 'Prediction Window'}
                    />
                    <Line type="monotone" dataKey="accuracy" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </RechartLine>
                </ResponsiveContainer>
              </div>
            </ChartCard>
            
            {/* Radar Chart for Digit Recognition Performance */}
            <ChartCard 
              title="Digit Recognition Performance" 
              description="Accuracy across different digits"
              icon={<BarChart3 />}
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#555" />
                    <PolarAngleAxis dataKey="digit" stroke="#ccc" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#ccc" />
                    <Radar name="Accuracy" dataKey="accuracy" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#2d3748', borderColor: '#4a5568', color: '#fff' }} 
                      formatter={(value) => [`${value}%`]}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
            
            {/* Performance Metrics */}
            <ChartCard 
              title="Performance Metrics" 
              description="Key model performance indicators"
              icon={<BarChart3 />}
            >
              <div className="h-72 flex flex-col">
                <div className="p-4 flex-grow">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {name: 'Accuracy', value: modelStats.overallAccuracy},
                        {name: 'Precision', value: modelStats.precision},
                        {name: 'Recall', value: modelStats.recall},
                        {name: 'F1 Score', value: modelStats.f1Score}
                      ]}
                      margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis type="number" domain={[0, 100]} stroke="#ccc" />
                      <YAxis type="category" dataKey="name" stroke="#ccc" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#2d3748', borderColor: '#4a5568', color: '#fff' }} 
                        formatter={(value) => [`${value}%`]}
                      />
                      <Bar dataKey="value" fill="#8884d8">
                        {[0, 1, 2, 3].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="p-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    Total predictions: <span className="text-white font-medium">{modelStats.totalPredictions}</span>
                  </p>
                </div>
              </div>
            </ChartCard>
            
            {/* Confusion Matrix Heatmap */}
            <ChartCard 
              title="Confusion Matrix" 
              description="Visualization of prediction errors"
              icon={<BarChart3 />}
              className="lg:col-span-2"
            >
              <div className="p-4 overflow-auto">
                <div className="flex justify-center">
                  <table className="text-sm text-gray-300">
                    <thead>
                      <tr>
                        <th className="p-1 text-center border border-gray-700 bg-gray-800" colSpan="2" rowSpan="2"></th>
                        <th className="p-1 text-center border border-gray-700 bg-gray-800" colSpan="10">Predicted Class</th>
                      </tr>
                      <tr>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                          <th key={num} className="p-1 border border-gray-700 text-xs bg-gray-800">{num}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(targetDigit => {
                        // Get row total for normalization
                        const rowTotal = confusionData
                          .filter(d => d.targetDigit === targetDigit)
                          .reduce((sum, cell) => sum + cell.count, 0);
                          
                        return (
                          <tr key={targetDigit}>
                            {targetDigit === 0 && (
                              <th className="p-1 border border-gray-700 text-xs bg-gray-800" rowSpan="10" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                Actual Class
                              </th>
                            )}
                            <th className="p-1 border border-gray-700 text-xs font-medium bg-gray-800">{targetDigit}</th>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(predictedDigit => {
                              const cell = confusionData.find(
                                d => d.targetDigit === targetDigit && d.predictedDigit === predictedDigit
                              );
                              
                              const count = cell ? cell.count : 0;
                              const intensity = rowTotal > 0 ? count / rowTotal : 0;
                              const bgColor = targetDigit === predictedDigit
                                ? `rgba(139, 92, 246, ${0.3 + intensity * 0.7})` // Purple for correct predictions
                                : `rgba(239, 68, 68, ${intensity * 0.7})`; // Red for incorrect predictions
                              
                              return (
                                <td 
                                  key={predictedDigit} 
                                  className="p-2 border border-gray-700 text-center text-xs"
                                  style={{ backgroundColor: bgColor }}
                                >
                                  {count}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </ChartCard>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ChartCard = ({ title, description, icon, children, className = "" }) => {
  return (
    <motion.div 
      className={`bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 ${className}`}
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

export default AnalyticsPage;
