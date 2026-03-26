import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Dna, Clock, LogOut, Film, Heart } from 'lucide-react';

export default function Sidebar({ onLogout }) {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-medium ${
      isActive
        ? 'bg-teal-900/40 text-teal-400 border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.15)]'
        : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 border border-transparent'
    }`;

  return (
    <aside className="w-72 h-full bg-[#161b2a] border-r border-gray-800 flex flex-col shadow-2xl z-10 hidden md:flex">
      

      <div className="p-8 flex items-center gap-3 border-b border-gray-800/50">
        <div className="bg-gradient-to-br from-teal-400 to-blue-600 p-2.5 rounded-xl shadow-lg shadow-teal-900/20">
          <Film className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          PickFlicx 
        </h2>
      </div>

      
      <nav className="flex-1 px-4 py-8 flex flex-col gap-2 overflow-y-auto">
        <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 px-4">
          Main Dashboard
        </div>
        
        <NavLink to="/" className={navLinkClasses} end>
          <Home className="w-5 h-5" />
          <span>Overview</span>
        </NavLink>
        
        <NavLink to="/recommend" className={navLinkClasses}>
          <Compass className="w-5 h-5" />
          <span>Discover</span>
        </NavLink>
        
        <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mt-6 mb-2 px-4">
          Machine Learning
        </div>

        <NavLink to="/dna" className={navLinkClasses}>
          <Dna className="w-5 h-5" />
          <span>Cinematic DNA</span>
        </NavLink>
        
        <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mt-6 mb-2 px-4">
          Personal Records
        </div>

        <NavLink to="/history" className={navLinkClasses}>
          <Clock className="w-5 h-5" />
          <span>Search History</span>
        </NavLink>


        <NavLink to="/favorites" className={navLinkClasses}>
          <Heart className="w-5 h-5" />
          <span>My Favorites</span>
        </NavLink>
      </nav>

      
      <div className="p-6 border-t border-gray-800/50 mt-auto bg-[#0b0f19]/30">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-900/20 hover:bg-red-900/50 text-red-400 border border-red-900/50 hover:border-red-500 py-3.5 rounded-2xl transition-all duration-300 font-bold shadow-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>Secure Logout</span>
        </button>
      </div>
      
    </aside>
  );
}