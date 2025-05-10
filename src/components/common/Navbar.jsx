import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Menu, 
  X,
  Sparkles,
  Brain,
  LineChart,
  Trophy,
  LayoutDashboard
} from 'lucide-react';
import logo from '/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="nav-icon" />, hoverColor: 'from-blue-400 to-purple-500' },
    { path: '/predict', label: 'Prediction', icon: <Brain className="nav-icon" />, hoverColor: 'from-purple-500 to-pink-500' },
    { path: '/game', label: 'Game', icon: <Trophy className="nav-icon" />, hoverColor: 'from-yellow-400 to-orange-500' },
    { path: '/training', label: 'Contribute', icon: <Sparkles className="nav-icon" />, hoverColor: 'from-green-400 to-teal-500' },
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="nav-icon" />, hoverColor: 'from-cyan-400 to-blue-500' },
    { path: '/analytics', label: 'Analytics', icon: <LineChart className="nav-icon" />, hoverColor: 'from-pink-400 to-red-500' }
  ];

  return (
    
    <motion.nav
      className="bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-lg border-b border-purple-900/50 px-6 py-4 sticky top-0 z-50 shadow-lg shadow-purple-900/10"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <NavLink to="/" className="text-white font-bold text-xl flex items-center justify-center gap-2">
            <motion.img 
              src={logo} 
              alt="logo" 
              className='w-12 h-12 drop-shadow-lg'
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <motion.span 
              className="hidden sm:inline font-mono bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Digi Ai
            </motion.span>
            <span className="sm:hidden bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Digi Ai</span>
          </NavLink>
        </motion.div>
        
        {/* Mobile menu button */}
        <motion.div 
          className="lg:hidden"
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white p-2 bg-gray-800/50 rounded-lg hover:bg-purple-800/30 transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </motion.div>
        
        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg flex items-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-700 to-purple-600 text-white shadow-md shadow-purple-700/40' 
                      : 'text-gray-300 hover:bg-gray-800/70'
                  }`
                }
              >
                <motion.div
                  className="mr-2 relative"
                  whileHover={{ scale: 1.2 }}
                  animate={{ 
                    rotate: hoveredItem === item.path ? [0, 15, 0, -15, 0] : 0
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                >
                  {item.icon}
                  {hoveredItem === item.path && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${item.hoverColor} rounded-full filter blur-md opacity-70 -z-10`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1.5 }}
                      exit={{ scale: 0 }}
                    />
                  )}
                </motion.div>
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.label}
                </motion.span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />
            
            {/* Sidebar menu */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[280px] bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-md border-r border-purple-900/50 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6 pb-4 border-b border-gray-700/70 flex justify-between items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <NavLink to="/" className="text-white font-bold text-xl flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                    <motion.img 
                      src={logo} 
                      alt="logo" 
                      className='w-10 h-10 drop-shadow-md'
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                    />
                    <span className="font-mono text-xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Digi Ai</span>
                  </NavLink>
                </motion.div>
              </div>
              <motion.ul 
                className="py-4 px-2"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.path} 
                    className="mb-1"
                    variants={{
                      open: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          y: { stiffness: 1000, velocity: -100 }
                        }
                      },
                      closed: {
                        y: 50,
                        opacity: 0,
                        transition: {
                          y: { stiffness: 1000 }
                        }
                      }
                    }}
                    whileHover={{ scale: 1.03, x: 5 }}
                  >
                    <NavLink 
                      to={item.path} 
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) => 
                        `px-6 py-3.5 flex items-center rounded-lg transition-all ${
                          isActive 
                            ? `bg-gradient-to-r ${item.hoverColor} text-white shadow-lg shadow-purple-900/30` 
                            : 'text-gray-300 hover:bg-gray-800/70 hover:text-white'
                        }`
                      }
                    >
                      <motion.span 
                        className="mr-4 opacity-90"
                        whileHover={{ rotate: 20, scale: 1.2 }}
                      >
                        {item.icon}
                      </motion.span>
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div 
                className="px-6 py-4 mt-4 border-t border-gray-800/50 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-xs text-gray-500">
                  &copy; {new Date().getFullYear()} Digi Ai
                </div>
                <motion.div 
                  className="text-xs mt-1 text-purple-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Enhancing AI Experience
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.nav>
  );
};

export default Navbar;
