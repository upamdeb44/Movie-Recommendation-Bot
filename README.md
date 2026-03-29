# PickFlicx

An advanced, full-stack cinematic recommendation platform powered by a custom Content-Based Filtering machine learning model. Designed with a premium, responsive "bento-box" user interface, this application allows users to securely register an account, discover highly personalized movie recommendations, analyze the structural algorithms behind those recommendations, and curate a persistent digital library of their favorite films.

## 🚀 Architectural Overview

This project strictly adheres to a decoupled, headless architecture to ensure maximum performance and distinct separation of concerns. The frontend is a highly dynamic Single Page Application (SPA) that communicates with a heavily secured, mathematically driven Python backend via RESTful API endpoints. 

* **The Frontend Engine:** Built entirely with React and styled using the comprehensive utility classes of Tailwind CSS. It features a robust routing system utilizing React Router, complete with a rigorous authentication gatekeeper that strictly protects the internal dashboard routes from unauthorized visitors.
* **The Backend Fortress:** Engineered using FastAPI, this server actively loads massive machine learning matrices (Pandas DataFrames and Scikit-Learn `.pkl` files) into active memory. It exposes mathematically complex endpoints that are rigorously protected by a custom JSON Web Token (JWT) cryptographic security implementation.
* **The Data Persistence Strategy:** To eliminate network latency for frequently accessed personal data, the application strategically leverages the browser's native `localStorage` API to instantly render the user's historical search logs and personalized favorites gallery, entirely bypassing unnecessary database queries.

## ✨ Core Features

* **Cryptographic Authentication Gateway:** A fully functional registration and login system that issues time-limited JSON Web Tokens, ensuring the machine learning endpoints remain completely inaccessible to unauthenticated HTTP requests.
* **Algorithmic Recommendation Engine:** Utilizes Cosine Similarity matrices to mathematically calculate the nearest structural neighbors to any given film. The engine is precisely optimized to return the top 16 cinematic matches to balance local-compute performance with a perfectly flush grid UI.
* **Live Metadata Integration:** Pulls dynamic movie data and high-resolution poster imagery directly from the TMDB API in real-time.
* **Cinema DNA Extractor:** A highly analytical, data-driven visual interface that simulates the extraction of a movie's genetic algorithm, explicitly displaying the descending match percentages and vector strengths of its nearest cinematic clones.
* **Dynamic Bento-Box Dashboard:** A stunning, responsive control center that greets authenticated users with live statistical data regarding their total queries, system status, and immediate quick-launch access to the primary application features.
* **Persistent User Libraries:** Seamlessly tracks and records the user's chronological search history and allows them to interactively toggle "Favorites" to build a heavily curated, beautifully rendered digital gallery.

## 💻 Technical Stack

**Frontend Architecture:**
* React.js (Vite Build Tool)
* Tailwind CSS (Styling & Responsive Design)
* React Router DOM (Navigation & Protected Routes)
* Lucide React (Scalable Vector Iconography)

**Backend Architecture:**
* Python 3.10+
* FastAPI & Uvicorn (Asynchronous Server Operations)
* Pandas & Scikit-Learn (Machine Learning Matrix Computations)
* PyJWT & Passlib (Cryptographic Token Generation)
* Requests (External API Communication)

## How To Run The Project
To run this project entirely locally based off of your machine, run these commands on the windows terminal (Powershell).
* `git clone https://github.com/upamdeb44/PickFlicx`
* `cd PickFlicx`
* Create a .env file
* Paste your personal TMDB_API_KEY into the .env file created
* `pip install -r requirements.txt`
* `python -m venv venv` to create a fresh virtual environment
* `venv\Scripts\activate` to run the virtual environment
* Finally run the backend server with `uvicorn main:app --reload`
* Open another terminal in vs code and type `npm install`
* `npm run dev` to run the frontend