import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/dataProvider";

export const CardSeries = ({ series }) => {
  const value = useContext(AppContext);
  const IMG_URL = value.IMG_URL;

  return (
    <div className="movie">
      <Link to={`/viewseries/${series.id}`}>
        {series.poster_path ? (
          <img src={IMG_URL + series.poster_path} alt={series.title}></img>
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
          {series.name.length > 23 ? (
            <h3>{series.name.slice(0, 15) + "..."}</h3>
          ) : (
            <h3>{series.name}</h3>
          )}
        </div>
        {series.vote_average >= 7 ? (
          <span className={series.vote_average} style={{ color: "green" }}>
            {Math.round(series.vote_average)}
          </span>
        ) : series.vote_average >= 4 ? (
          <span className={series.vote_average} style={{ color: "orange" }}>
            {Math.round(series.vote_average)}
          </span>
        ) : series.vote_average >= 1 ? (
          <span className={series.vote_average} style={{ color: "red" }}>
            {Math.round(series.vote_average)}
          </span>
        ) : (
          <span className={series.vote_average} style={{ color: "white" }}>
            {Math.round(series.vote_average)}
          </span>
        )}
      </div>
      <div class="overview">
        <h3>Overview</h3>
        {series.overview.slice(0, 170).concat("...")}
      </div>
    </div>
  );
};
