import { Chip } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../../context/dataProvider";
import { CardWatch } from "../../detail/CardWatch";

export const Watchlist = () => {
  const value = useContext(AppContext);
  const watchlistMovies = value.watchlistMovies;
  const resetWatchlist = value.resetWatchlist;

  window.scroll(0, 0);

  return (
    <div className="watchlist">
      <div className="watchlist-title">
        <h1 style={{ color: "white", letterSpacing: "0.5px" }}>Watchlist</h1>
      </div>
      {watchlistMovies.length <= 0 ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h3 style={{ color: "white", marginTop: "100px", width: "50%" }}>
          Oh, looks like you haven't added movies to the watch list yet. come
          back here when you're done
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
              onClick={() => resetWatchlist()}
            />
          </div>
          <div className="menu-container">
            {watchlistMovies.map((watchMovies) => (
              <CardWatch movie={watchMovies} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
