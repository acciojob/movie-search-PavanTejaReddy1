import React, { useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [movieDetails, setMovieDetails] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  function getMovieDetails(e) {
    e.preventDefault();

    setMovieDetails([]);
    setErrMsg("");

    fetch(`https://www.omdbapi.com/?s=${input}&apikey=99eb9fd1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          setErrMsg("Invalid movie name. Please try again.");
        } else {
          setMovieDetails(data.Search);
        }
      })
      .catch(() => {
        setErrMsg("Invalid movie name. Please try again.");
      });
  }

  return (
    <div>
      <p>Search Movie</p>
    <form onSubmit={getMovieDetails}>
      <input type="text" onChange={(e) => setInput(e.target.value)} value={input} />
      <button type="submit">Search</button>
    </form>

      {errMsg && <p className="error">{errMsg}</p>}

    <ul>
      {movieDetails.map((movie) => (
        <li key={movie.imdbID}>
        <p>{movie.Title} ({movie.Year})</p>
        <img src={movie.Poster} alt={movie.Title} />
        </li>
      ))}
    </ul>
  </div>
  );
};

export default App;
