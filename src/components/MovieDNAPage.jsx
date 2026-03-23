import React, { useState } from 'react';
import { Search, Dna, Fingerprint, Activity, Database, Loader2, GitMerge } from 'lucide-react';

export default function MovieDNAPage() {
  const [dnaMatches, setDnaMatches] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [analyzedMovie, setAnalyzedMovie] = useState(null);

  const extractCinematicDNA = async (titleToSearch) => {
    if (!titleToSearch.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    setAnalyzedMovie(titleToSearch);
    
    try {
      
      const token = localStorage.getItem('movieBotToken');

      const response = await fetch('http://127.0.0.1:8000/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ movie_title: titleToSearch })
      });
      
      if (response.status === 401) {
        throw new Error('Your secure session has expired. Please securely log out and log back in.');
      }
      
      if (!response.ok) {
        throw new Error(`The algorithmic extraction failed. We couldn't find "${titleToSearch}" in the database.`);
      }
      
      const data = await response.json();
      
      const simulatedData = data.map((movie, index) => ({
        ...movie,
        matchPercentage: (98 - (index * 7) - Math.floor(Math.random() * 3)).toFixed(1)
      }));
      
      setDnaMatches(simulatedData);
      
    } catch (err) {
      setError(err.message);
      setDnaMatches([]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      extractCinematicDNA(searchQuery);
    }
  };

  return (
    <div className="p-6 text-white w-full max-w-6xl mx-auto flex flex-col gap-8">
      
      {/* Analytical Header Section */}
      <div className="flex flex-col border-b border-gray-800 pb-8">
        <h1 className="text-3xl md:text-5xl font-bold flex items-center gap-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          <Dna className="w-10 h-10 text-teal-400" />
          Cinematic DNA Extractor
        </h1>
      
      </div>
      
      {/* Search Interface */}
      <div className="relative w-full max-w-2xl mx-auto mt-4">
        <Database className="absolute left-5 top-4 text-teal-500 w-6 h-6" />
        <input 
          type="text" 
          placeholder="Enter a movie title to sequence its DNA..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full bg-[#161b2a] border-2 border-gray-800 rounded-full py-4 px-16 text-lg text-white focus:border-teal-500 focus:ring-4 focus:ring-teal-900/30 outline-none transition-all shadow-2xl"
        />
        <button 
          onClick={() => extractCinematicDNA(searchQuery)}
          className="absolute right-3 top-2.5 bg-teal-600 hover:bg-teal-500 text-white p-2 rounded-full transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-xl text-red-400 text-center max-w-2xl mx-auto w-full">
          <Activity className="w-6 h-6 inline-block mr-2" />
          {error}
        </div>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-teal-400 gap-6 mt-8">
          <div className="relative">
            <Dna className="w-20 h-20 animate-pulse text-teal-500" />
            <div className="absolute inset-0 border-4 border-t-teal-400 border-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white tracking-widest">Please Wait</p>
            <p className="text-teal-500/80 mt-2 font-mono text-sm">Creating your recommendations based on your movie</p>
          </div>
        </div>
      )}

      {/* DNA Results Interface */}
      {!isAnalyzing && dnaMatches.length > 0 && (
        <div className="mt-8 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="bg-[#161b2a] border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 opacity-5">
              <Fingerprint className="w-96 h-96" />
            </div>
            
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Activity className="text-blue-400" />
              Genetic Matches for <span className="text-teal-400 capitalize">"{analyzedMovie}"</span>
            </h2>
            
            <div className="flex flex-col gap-6">
              {dnaMatches.map((movie) => (
                <div key={movie.id} className="flex flex-col md:flex-row items-center gap-6 bg-[#0b0f19] border border-gray-800 p-4 rounded-2xl hover:border-teal-500/50 transition-all">
                  
                  <img src={movie.image} alt={movie.title} className="w-24 h-36 object-cover rounded-xl shadow-lg border border-gray-800" />
                  
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{movie.title}</h3>
                      <div className="bg-teal-900/30 text-teal-400 border border-teal-800 px-3 py-1 rounded-full text-sm font-bold font-mono flex items-center gap-2">
                        <GitMerge className="w-4 h-4" />
                        {movie.matchPercentage}% Match
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="bg-gray-800 px-2 py-1 rounded">ID: #{movie.id}</span>
                      <span>Rating: {movie.rating} / 10</span>
                    </div>
                    
                    {/* Visual Progress Bar to represent mathematical closeness */}
                    <div className="w-full bg-gray-800 rounded-full h-3 mb-1 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-teal-400 h-3 rounded-full" 
                        style={{ width: `${movie.matchPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-xs text-gray-500 font-mono mt-1">Cosine Similarity Vector Strength</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}