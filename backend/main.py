from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import pandas as pd
import pickle
import requests
import os
import jwt
import datetime
from dotenv import load_dotenv

# 1. Initialize the App and Middleware
app = FastAPI(title="MovieBot API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables for the TMDB API
load_dotenv()
TMDB_API_KEY = os.getenv("TMDB_API_KEY")

# 2. Security Configuration and Mock Database
# This secret key is the foundation of your encrypted wristbands; keep it hidden
SECRET_KEY = "super_secret_moviebot_key_change_this_later"
ALGORITHM = "HS256"
security = HTTPBearer()

MOCK_USER_DB = {
    "admin": {
        "username": "admin", 
        "password": "password123",
        "full_name": "System Administrator"
    }
}

# 3. Define the Request Structures
# These must be defined before the endpoints attempt to use them
class LoginRequest(BaseModel):
    username: str
    password: str

# This brand new class dictates exactly what information is required to create a new profile
class RegisterRequest(BaseModel):
    username: str
    password: str
    full_name: str

class RecommendationRequest(BaseModel):
    movie_title: str

# 4. Load the Machine Learning Models
try:
    movies_dict = pickle.load(open('movies.pkl', 'rb'))
    movies = pd.DataFrame(movies_dict) 
    similarity = pickle.load(open('similarity.pkl', 'rb'))
    print("Machine learning assets successfully loaded into active memory.")
except Exception as e:
    print(f"Critical Error Loading Machine Learning Assets: {e}")

# 5. TMDB Metadata Helper Function
def fetch_tmdb_metadata(title):
    try:
        url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={title}"
        response = requests.get(url)
        data = response.json()

        if data['results']:
            movie_data = data['results'][0]
            poster_path = movie_data.get('poster_path')
            
            return {
                "image": f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else "https://via.placeholder.com/500x750?text=No+Poster",
                "rating": round(movie_data.get('vote_average', 0), 1),
                "genre": "Matches Profile"
            }
    except Exception as e:
        print(f"TMDB Fetch Error: {e}")
        
    return {
        "image": "https://via.placeholder.com/500x750?text=Poster+Not+Found",
        "rating": "N/A",
        "genre": "Unknown"
    }

# 6. Security Authentication Endpoints

# The newly integrated registration endpoint that securely adds visitors to the database
@app.post("/api/register")
async def register(request: RegisterRequest):
    # First, verify that the requested username is not already claimed by someone else
    if request.username in MOCK_USER_DB:
        raise HTTPException(status_code=400, detail="This username is already taken. Please choose another.")
    
    # Securely append the brand new user credentials into the active dictionary database
    MOCK_USER_DB[request.username] = {
        "username": request.username,
        "password": request.password,
        "full_name": request.full_name
    }
    
    return {"message": "Account successfully created! You may now log in."}

@app.post("/api/login")
async def login(request: LoginRequest):
    # Verify the incoming credentials against the mock database
    user = MOCK_USER_DB.get(request.username)
    if not user or user["password"] != request.password:
        raise HTTPException(status_code=401, detail="The username or password provided is incorrect.")
        
    # Generate the time-limited JSON Web Token
    expiration_time = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=2)
    token_payload = {
        "sub": user["username"], 
        "exp": expiration_time
    }
    
    encoded_jwt = jwt.encode(token_payload, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": encoded_jwt, "token_type": "bearer"}

# This function intercepts incoming requests and mathematically verifies the digital token
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        raise HTTPException(status_code=401, detail="The provided authentication token is invalid or has expired.")


@app.post("/api/recommend")
async def get_recommendations(request: RecommendationRequest, user: dict = Depends(verify_token)):
    try:
        # Convert both the search query and the database titles to lowercase to find a match
        search_query = request.movie_title.lower().strip()
        matched_movies = movies[movies['title'].str.lower().str.strip() == search_query]
        
        # If the resulting list is empty, the movie does not exist in the dataset
        if matched_movies.empty:
            raise HTTPException(status_code=404, detail="Movie not found in the database.")
            
        # Get the index of the first matched movie
        movie_index = matched_movies.index[0]
        
        # Calculate the mathematical distances
        distances = similarity[movie_index]
        movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:5]
        
        results = []
        for i in movies_list:
            target_index = i[0]
            title = str(movies.iloc[target_index].title)
            
            # Fetch live data from TMDB for each recommended movie
            tmdb_data = fetch_tmdb_metadata(title)
            
            results.append({
                "id": int(movies.iloc[target_index].movie_id),
                "title": title,
                "rating": str(tmdb_data["rating"]),
                "genre": tmdb_data["genre"],
                "image": tmdb_data["image"]
            })
            
        return results

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 8. Health Check Endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "Active", "model_loaded": True}