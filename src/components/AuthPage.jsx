import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, CheckCircle } from 'lucide-react';

export default function AuthPage({ setAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!isLogin) {
      // --- THE NEW REGISTRATION FLOW ---
      try {
        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, full_name: fullName }),
        });

        if (response.ok) {
          // If successful, show a message, clear the password, and flip the UI to the Login state
          setSuccessMessage("Account created successfully! Please sign in below.");
          setPassword('');
          setIsLogin(true);
        } else {
          const errorData = await response.json();
          alert(`Registration Failed: ${errorData.detail}`);
        }
      } catch (error) {
        console.error("Network error during registration:", error);
        alert("Unable to connect to the server. Please ensure your Python backend is running.");
      }
    } else {
      // --- THE EXISTING LOGIN FLOW ---
      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('movieBotToken', data.access_token);
          
          if (setAuth) {
            setAuth(true);
          }
          navigate('/');
        } else {
          alert("The backend rejected your credentials. Please verify your username and password.");
        }
      } catch (error) {
        console.error("Network error during login:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] p-6 font-sans">
      <div className="w-full max-w-md bg-[#161b2a] rounded-[2rem] p-10 shadow-2xl border border-gray-800">
        
        <h2 className="text-3xl font-extrabold text-center mb-2 text-white tracking-tight">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-center text-gray-400 text-sm mb-8">
          {isLogin ? 'Enter your credentials to access the cinematic dashboard.' : 'Join the platform to curate your personalized movie library.'}
        </p>
        
        {/* Dynamic Success Notification */}
        {successMessage && (
          <div className="mb-6 bg-teal-900/30 border border-teal-500/50 p-4 rounded-2xl flex items-center gap-3 text-teal-400 text-sm font-medium">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Active Sign Up Field: Full Name */}
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Full Name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-2xl py-3.5 px-12 text-white outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-900/50 transition-all" 
                required={!isLogin} 
              />
            </div>
          )}

          {/* Unified Username Input */}
          <div className="relative">
            <User className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0b0f19] border border-gray-800 rounded-2xl py-3.5 px-12 text-white outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-900/50 transition-all" 
              required 
            />
          </div>

          {/* Unified Password Input */}
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0b0f19] border border-gray-800 rounded-2xl py-3.5 px-12 text-white outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-900/50 transition-all" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-teal-900/50 mt-4"
          >
            {isLogin ? 'Secure Sign In' : 'Register Account'}
          </button>
        </form>

        <button 
          onClick={() => {
            setIsLogin(!isLogin);
            setSuccessMessage(''); // Clear any success messages when toggling
          }} 
          className="w-full text-center text-gray-400 mt-8 hover:text-teal-400 transition-colors text-sm font-medium"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
        </button>
      </div>
    </div>
  );
}