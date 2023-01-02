import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/dataProvider";

export const CardMovie = ({ movie }) => {
  const value = useContext(AppContext);
  const IMG_URL = value.IMG_URL;



  return (
    <div className="movie">
      <Link to={`/viewmovie/${movie.id}`}>
        {movie.poster_path ? (
          <img src={IMG_URL + movie.poster_path} alt={movie.title}></img>
        ) : (
          ""
        )}
      </Link>

      <div class="movie-info">
        <div
          className="movie-title"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>{movie.name}</h3>
          {movie.title.length > 28 ? (
            <h3>{movie.title.slice(0, 24) + "..."}</h3>
          ) : (
            <h3>{movie.title}</h3>
          )}
        </div>

        {movie.vote_average >= 7 ? (
          <span className={movie.vote_average} style={{ color: "green" }}>
            {Math.round(movie.vote_average)}
          </span>
        ) : movie.vote_average >= 4 ? (
          <span className={movie.vote_average} style={{ color: "orange" }}>
            {Math.round(movie.vote_average)}
          </span>
        ) : movie.vote_average >= 1 ? (
          <span className={movie.vote_average} style={{ color: "red" }}>
            {Math.round(movie.vote_average)}
          </span>
        ) : (
          <span className={movie.vote_average} style={{ color: "white" }}>
            {Math.round(movie.vote_average)}
          </span>
        )}
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>{movie.overview.slice(0, 170).concat("...")}</p>
      </div>
    </div>
  );
};
