
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  
  const [input, setInput] = useState("");
  const [movieDetails, setMovieDetails] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  async function getMovieDetails(e) {
    e.preventDefault();

    setMovieDetails([]);
    setErrMsg("");

    try {
      const dataRes = await fetch(
        `https://www.omdbapi.com/?s=${input}&apikey=99eb9fd1`
      );
      const data = await dataRes.json();

      if (data.Response === "False") {
        setErrMsg("Invalid movie name. Please try again.");
      } else {
        setMovieDetails(data.Search);
      }
    } catch (err) {
      setErrMsg("Invalid movie name. Please try again.");
    }
  }
  
  return (
    <div>
      <p>Search Movie</p>

      <form onSubmit={getMovieDetails}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
  
      {errMsg && <p className="error">{errMsg}</p>}

      {movieDetails.map((movie) => (
        <div key={movie.imdbID}>
          <p>
            {movie.Title} ({movie.Year})
          </p>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      ))}
    </div>
  )
}

export default App
