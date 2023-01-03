import { Chip } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../../context/dataProvider";
import { CardFav } from "../../detail/CardFav";

export const Favorites = () => {
  const value = useContext(AppContext);
  const resetFavorite = value.resetFavorite;
  const favoriteMovies = value.favoriteMovies;

  return (
    <div className="favorites">
      <h1 id="favorite-text" style={{ color: "white", letterSpacing: "0.5px" }}>
        Favorites
      </h1>
      <div className="favorite-movies">
        {favoriteMovies.length <= 0 ? (
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h3 style={{ color: "white", marginTop: "100px", width: "50%" }}>
            Oh, looks like you haven't added favorite movies yet. come back here
            when you're done
          </h3>
          </div>
        ) : (
          <>
            <div>
              <Chip
                style={{ margin: 10, padding: "15px" }}
                color="primary"
                label="Delete all"
                clickable
                size="small"
                id="genre"
                onClick={() => resetFavorite()}
              />
            </div>
            <div className="menu-container">
              {favoriteMovies.map((movie) => (
                <CardFav key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
