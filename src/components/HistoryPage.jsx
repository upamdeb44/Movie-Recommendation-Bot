import React, { useState, useEffect } from 'react';
import { Clock, Trash2, Film, Search } from 'lucide-react';

export default function HistoryPage() {
  const [searchHistory, setSearchHistory] = useState([]);

  // Retrieve the saved history from the browser's local storage the moment the component mounts
  useEffect(() => {
    const savedHistory = localStorage.getItem('movieSearchHistory');
    if (savedHistory) {
      try {
        // Parse the JSON string back into a functional JavaScript array and update the local state
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("An error occurred while attempting to parse the search history data:", error);
      }
    }
  }, []);

  // Provide a clean mechanism for the user to completely erase their saved historical data
  const clearHistory = () => {
    localStorage.removeItem('movieSearchHistory');
    setSearchHistory([]);
  };

  return (
    <div className="p-6 text-white w-full max-w-5xl mx-auto flex flex-col gap-8">
      
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Clock className="w-8 h-8 text-teal-400" />
            Your Search History
          </h1>
          <p className="text-gray-400 mt-2">
            Review the cinematic journeys you have previously explored within the application.
          </p>
        </div>
        
        {/* Only display the clear button if there is actual history to delete */}
        {searchHistory.length > 0 && (
          <button 
            onClick={clearHistory}
            className="flex items-center gap-2 bg-red-900/30 hover:bg-red-900/60 text-red-400 border border-red-800/50 py-2 px-4 rounded-xl transition-all font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        )}
      </div>

      {/* History Data Rendering Section */}
      {searchHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-[#161b2a] border border-gray-800 rounded-3xl p-16 text-center mt-8 shadow-inner">
          <Search className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-300 mb-2">No History Found</h3>
          <p className="text-gray-500 max-w-md">
            You have not searched for any movie recommendations yet. Head over to the recommendation dashboard to begin your exploration!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {searchHistory.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between bg-[#161b2a] border border-gray-800 p-5 rounded-2xl hover:border-teal-500/50 transition-colors shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="bg-[#0b0f19] p-3 rounded-full border border-gray-700">
                  <Film className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white capitalize">{item.query}</h4>
                  <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                    Searched on {item.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}