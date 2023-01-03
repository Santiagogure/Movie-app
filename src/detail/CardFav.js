import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/dataProvider";

export const CardFav = ({ movie }) => {
  const value = useContext(AppContext);
  const IMG_URL = value.IMG_URL;
  const deleteOfFavorites = value.deleteOfFavorites;

  return (
    <>
      <div id="movie-fav" className="movie">
        <box-icon
          id="delete-icon"
          onClick={() => deleteOfFavorites(movie.id)}
          type="solid"
          name="x-circle"
        ></box-icon>

        {movie.title ? (
          <Link to={`/viewmovie/${movie.id}`}>
            {
              movie.poster_path ? (
                <img src={IMG_URL + movie.poster_path} alt={movie.title}></img>
              ) : (
                ""
              ) // Buscar imagen de not found
            }
          </Link>
        ) : (
          <Link to={`/viewseries/${movie.id}`}>
            {
              movie.poster_path ? (
                <img src={IMG_URL + movie.poster_path} alt={movie.name}></img>
              ) : (
                ""
              ) // Buscar imagen de not found
            }
          </Link>
        )}

        <div class="movie-info">
          <div className="movie-title">
            {movie.name ? (
              movie.name.length > 22 ? (
                <h3>{movie.name.slice(0, 20)}...</h3>
              ) : (
                <h3>{movie.name}</h3>
              )
            ) : movie.title.length > 22 ? (
              <h3>{movie.title.slice(0, 20)}...</h3>
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
          {movie.overview.slice(0, 170).concat("...")}
        </div>
      </div>
    </>
  );
};
