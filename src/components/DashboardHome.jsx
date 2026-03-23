import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Fingerprint, Clock, Heart, Settings } from 'lucide-react'; 

export default function DashboardHome() {
  return (
    <div className="w-full bg-[#0b0f19] text-white font-sans">
      
      {/* The Greeting and Settings Header */}
      <div className="flex justify-between items-start mb-10 mt-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Welcome Back, Explorer</h1>
          <p className="text-gray-400 text-lg">Ready to find your next favorite movie?</p>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors p-2 cursor-pointer">
          <Settings className="w-7 h-7" />
        </button>
      </div>

      {/* The Master Bento Box Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        
        {/* Top Row, Left: Get Recommendations (Wide Card) */}
        <Link 
          to="/recommend" 
          className="md:col-span-2 relative overflow-hidden bg-[#24675e] hover:bg-[#1f5951] transition-all duration-300 rounded-[2rem] p-8 min-h-[200px] flex flex-col justify-between group shadow-lg"
        >
          <div>
            <h2 className="text-2xl font-bold mb-1">Get Recommendations</h2>
            <p className="text-[#a0d8d0] text-sm font-medium">Personalized picks from your ML model</p>
          </div>
          <div className="absolute bottom-6 right-6 bg-[#2dc9b4] p-3 rounded-full text-[#0f3d36] group-hover:scale-110 transition-transform duration-300 shadow-md">
            <Ticket className="w-7 h-7" /> 
          </div>
        </Link>

        {/* Top Row, Right: MovieDNA (Square Card) */}
        <Link 
          to="/dna" 
          className="md:col-span-1 relative overflow-hidden bg-[#358b54] hover:bg-[#2d7848] transition-all duration-300 rounded-[2rem] p-8 min-h-[200px] flex flex-col justify-between group shadow-lg"
        >
          <div>
            <h2 className="text-2xl font-bold mb-1">MovieDNA</h2>
            <p className="text-[#a5e0b8] text-sm font-medium">Analyze your taste profile</p>
          </div>
          <div className="absolute bottom-6 right-6 bg-[#4ade80] p-3 rounded-full text-[#144225] group-hover:scale-110 transition-transform duration-300 shadow-md">
            <Fingerprint className="w-7 h-7" />
          </div>
        </Link>

        {/* Bottom Row, Left: History (Square Card) */}
        <Link 
          to="/history" 
          className="md:col-span-1 relative overflow-hidden bg-[#245b9a] hover:bg-[#1e4e85] transition-all duration-300 rounded-[2rem] p-8 min-h-[200px] flex flex-col justify-between group shadow-lg"
        >
          <div>
            <h2 className="text-2xl font-bold mb-1">History</h2>
            <p className="text-[#9bbdf2] text-sm font-medium">View past recommendations</p>
          </div>
          <div className="absolute bottom-6 right-6 bg-[#60a5fa] p-3 rounded-full text-[#112d52] group-hover:scale-110 transition-transform duration-300 shadow-md">
            <Clock className="w-7 h-7" />
          </div>
        </Link>

        {/* Bottom Row, Right: Favorites Library (Wide Card) */}
        <Link 
          to="/favorites" 
          className="md:col-span-2 relative overflow-hidden bg-[#8b2b46] hover:bg-[#7a253d] transition-all duration-300 rounded-[2rem] p-8 min-h-[200px] flex flex-col justify-between group shadow-lg"
        >
          <div>
            <h2 className="text-2xl font-bold mb-1">Favorites Library</h2>
            <p className="text-[#fca5a5] text-sm font-medium">Access your curated cinematic collection</p>
          </div>
          <div className="absolute bottom-6 right-6 bg-[#fb7185] p-3 rounded-full text-[#4c1322] group-hover:scale-110 transition-transform duration-300 shadow-md">
            <Heart className="w-7 h-7" />
          </div>
        </Link>

      </div>
    </div>
  );
}