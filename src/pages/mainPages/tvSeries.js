import React, { useContext } from "react";
import { AppContext } from "../../context/dataProvider";
import {Chip} from "@mui/material";
import CustomPagination from "../../componentes/customPagination/customPagination";
import { CardSeries } from "../../detail/CardSeries";

export const TvSeries = () => {
  const value = useContext(AppContext);
  const series = value.series;
  const setPages = value.setPages;
  const totalPages = value.totalPages;
  const seriesTotalPages = value.seriesTotalPages

  const seriesGenres = value.seriesGenres;
  const setSeriesGenres = value.setSeriesGenres;
  const seriesSelectedGenre = value.seriesSelectedGenre;
  const setSeriesSelectedGenre = value.setSeriesSelectedGenre;

  const handleAddGenre = (genre) => {
    setSeriesSelectedGenre([...seriesSelectedGenre, genre]);
    setSeriesGenres(seriesGenres.filter((g) => g.id !== genre.id));
  };

  const handleDeleteGenre = (genre) => {
    setSeriesSelectedGenre(
      seriesSelectedGenre.filter((g) => g.id !== genre.id)
    );
    setSeriesGenres([...seriesGenres, genre]);
  };

  return (
    <>
      <div className="menu">
        <div className="genres">
          <div style={{ padding: "6px 0", color: "white" }}>
            <h1>Discover Series</h1>
            {seriesSelectedGenre &&
              seriesSelectedGenre.map((genre) => (
                <Chip
                  style={{ margin: 5 }}
                  label={genre.name}
                  key={genre.id}
                  color="secondary"
                  clickable
                  size="small"
                  id="genre"
                  onClick={() => handleDeleteGenre(genre)}
                />
              ))}
            {seriesGenres.map((genre) =>
              genre.length == 0 ? (
                <Chip style={{ display: "none" }}></Chip>
              ) : (
                <Chip
                  style={{ margin: 5 }}
                  label={genre.name}
                  key={genre.id}
                  color="primary"
                  clickable
                  size="small"
                  id="genre"
                  onClick={() => handleAddGenre(genre)}
                />
              )
            )}
          </div>
        </div>
        <div className="menu-container">
          {series.map((series) => (
            <CardSeries key={series.id} series={series} />
          ))}
        </div>
      </div>
      <CustomPagination setPages={setPages} totalPages={seriesTotalPages} />
    </>
  );
};
