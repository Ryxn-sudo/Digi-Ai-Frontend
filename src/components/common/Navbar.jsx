import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Pencil, 
  Gamepad2, 
  BarChart3, 
  PenTool, 
  User, 
  Menu, 
  X
} from 'lucide-react';
import logo from '../../../public/logo.png';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/predict', label: 'Prediction', icon: <Pencil size={18} /> },
    { path: '/game', label: 'Game', icon: <Gamepad2 size={18} /> },
    { path: '/training', label: 'Contribute', icon: <PenTool size={18} /> },
    { path: '/dashboard', label: 'Dashboard', icon: <User size={18} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> }
  ];

  return (
    <motion.nav
      className="bg-gray-900/70 backdrop-blur-md border-b border-purple-900/50 px-6 py-4 sticky top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="text-white font-bold text-xl flex items-center justify-center gap-2">
            <img src={logo} alt="logo" className='w-12 h-12'/>
            <span className="hidden sm:inline font-mono ">Digi Ai</span>
            <span className="sm:hidden">Digi Ai</span>
          </NavLink>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-lg flex items-center transition-all ${
                    isActive 
                      ? 'bg-purple-700 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Mobile Navigation Sidebar */}
      {isMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={toggleMenu}
          />
          
          {/* Sidebar menu */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed left-0 top-0 h-screen w-[280px] bg-gray-900/95 backdrop-blur-md border-r border-purple-900/50 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 pb-4 border-b border-gray-700/70 flex justify-between items-center">
              <NavLink to="/" className="text-white font-bold text-xl flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                <img src={logo} alt="logo" className='w-10 h-10'/>
                <span className="font-mono text-xl">Digi Ai</span>
              </NavLink>
            
            </div>
            <ul className="py-4 px-2">
              {navItems.map((item) => (
                <li key={item.path} className="mb-1">
                  <NavLink 
                    to={item.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => 
                      `px-6 py-3.5 flex items-center rounded-lg transition-all ${
                        isActive 
                          ? 'bg-purple-700/80 text-white shadow-md' 
                          : 'text-gray-300 hover:bg-gray-800/70 hover:text-white'
                      }`
                    }
                  >
                    <span className="mr-4 opacity-80">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="px-6 py-4 mt-4 border-t border-gray-800/50 text-center text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Digi Ai
            </div>
          </motion.div>
        </>
      )}
    </motion.nav>
  );
};

export default Navbar;
