import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import RecommendPage from './components/RecommendPage';
import MovieDNAPage from './components/MovieDnaPage';
import HistoryPage from './components/HistoryPage';
import FavoritesPage from './components/FavoritesPage';

export default function App() {
  // THE FIX: We now explicitly check for the secure 'movieBotToken' the exact millisecond the app reloads
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('movieBotToken') !== null;
  });

  // This specific function serves as the unlocking mechanism, allowing the AuthPage to signal the App that a login was successful
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // This function serves as the secure logout mechanism, destroying the encrypted tokens and instantly revoking dashboard access
  const handleLogout = () => {
    localStorage.removeItem('movieBotToken');
    localStorage.removeItem('isAuthenticated'); // We clear this just to keep the browser storage perfectly clean
    setIsAuthenticated(false);
  };

  // The Gatekeeper: If the user has not been securely authenticated, completely restrict their access to the primary application routes
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<AuthPage setAuth={handleLoginSuccess} onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
    );
  }

  // The VIP Area: If the security clearance is verified, render the comprehensive cinematic dashboard and its corresponding multi-page components
  return (
    <div className="flex h-screen bg-[#0b0f19] text-white overflow-hidden">
      
      {/* The Sidebar is rendered globally for authenticated users, and we pass down the secure logout mechanism as a functional prop */}
      <Sidebar onLogout={handleLogout} />
      
      <main className="flex-1 overflow-y-auto p-8 relative">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/dna" element={<MovieDNAPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          
          {/* If an authenticated user attempts to access a broken or non-existent URL, automatically redirect them safely back to the dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
    </div>
  );
}