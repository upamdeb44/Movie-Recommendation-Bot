import React, { useState, useEffect } from 'react';
import { Heart, Film, Star, Trash2 } from 'lucide-react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  // Retrieve the complete collection of liked movies the moment the user navigates to this page
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (err) {
        console.error("Failed to successfully parse the user's favorite movies:", err);
      }
    }
  }, []);

  // Allow the user to remove a movie from their library directly from this dashboard
  const removeFavorite = (movieIdToRemove) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieIdToRemove);
    setFavorites(updatedFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="p-6 text-white w-full max-w-7xl mx-auto flex flex-col gap-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            Your Favorites
          </h1>
          <p className="text-gray-400 mt-2">
            A carefully curated collection of the cinematic masterpieces you have discovered.
          </p>
        </div>
        
        <div className="bg-[#161b2a] border border-gray-800 px-4 py-2 rounded-xl text-sm font-bold text-gray-300">
          {favorites.length} {favorites.length === 1 ? 'Movie' : 'Movies'} Saved
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-[#161b2a] border border-gray-800 rounded-3xl p-16 text-center mt-8 shadow-inner">
          <Heart className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-300 mb-2">Your Library is Empty</h3>
          <p className="text-gray-500 max-w-md">
            You have not added any movies to your favorites collection yet. Head over to the recommendation dashboard and click the heart icon to start building your personal library!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div key={movie.id} className="group relative rounded-2xl overflow-hidden bg-[#161b2a] border border-gray-800 shadow-lg hover:shadow-red-900/20 transition-all hover:-translate-y-2 duration-300">
              <div className="aspect-[2/3] w-full overflow-hidden relative">
                <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/40 to-transparent"></div>
              </div>

              {/* The Interactive Deletion Button */}
              <button 
                onClick={() => removeFavorite(movie.id)}
                className="absolute top-4 right-4 p-2 bg-red-900/50 backdrop-blur-md rounded-full hover:bg-red-600 border border-red-500/50 transition-all z-20 opacity-0 group-hover:opacity-100"
                title="Remove from favorites"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg leading-tight line-clamp-1">{movie.title}</h3>
                  <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold">{movie.rating}</span>
                  </div>
                </div>
                <span className="text-sm text-red-300 font-medium">{movie.genre}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}