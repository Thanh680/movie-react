import { useEffect, useState } from 'react';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import './App.css';

const API_URL = "http://www.omdbapi.com?apikey=2fa39b0c";


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {

    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }
  useEffect(() => {
    searchMovies("superman");
  }, []);

  return (
    <div className='app'>
      <h1>MovieLab</h1>

      <div className='search'>
        <input 
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { 
            if (e.key === "Enter")
              searchMovies(searchTerm); 
            }} 
          />
        <img 
          src={SearchIcon} 
          alt="search"
          onClick={() => searchMovies(searchTerm)}
          />
      </div>

      {movies?.length > 0 
      ? ( 
        <div className='container'>
          {movies.map((movie)=>(
            <MovieCard movie={movie}/>
          ))}
        </div>
      ) : (
        <div className='empty'>
           <h2>No movies found</h2>
         </div>
      )
      }
    </div>
  );
}

export default App;
