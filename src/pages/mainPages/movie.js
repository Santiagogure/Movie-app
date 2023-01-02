import React, { useContext, useState } from "react";
import { AppContext } from "../../context/dataProvider";
import {CardMovie} from '../../detail/CardMovie'
import { Chip, Pagination } from "@mui/material";
import CustomPagination from "../../componentes/customPagination/customPagination";
import { Loader } from "../../loader/loader";

export const Movie = () => {
  const value = useContext(AppContext);
  const movies = value.movies;
  const setPages = value.setPages;
  const totalPages = value.totalPages;

  const genres = value.genres;
  const setGenres = value.setGenres;
  const selectedGenre = value.selectedGenre;
  const setSelectedGenre = value.setSelectedGenre;
  const setPage = value.setPage;

  const [active, setActive] = useState(false)

  const handleAddGenre = (genre) => {
    setSelectedGenre([...selectedGenre, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
  };

  const handleDeleteGenre = (genre) => {
    setSelectedGenre(selectedGenre.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  setTimeout(() => {
     setActive(true)
  }, 1000);

  return (
    <>
    {active === true ? 
      <div className="menu">
        <div className="genres">
          <div style={{ padding: "6px 0", color: "white" }}>
            <h1>Discover Movies</h1>
            {selectedGenre &&
              selectedGenre.map((genre) => (
                <Chip
                  style={{ margin: 1 }}
                  label={genre.name}
                  key={genre.id}
                  color="secondary"
                  clickable
                  size="small"
                  id="genre"
                  onClick={() => handleDeleteGenre(genre)}
                />
              ))}
            {genres.map((genre) => (
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
            ))}
          </div>
        </div>
        <div className="menu-container">
          {movies.map((movies) => (
            <CardMovie key={movies.id} movie={movies} />
          ))}
        </div>
        <CustomPagination setPages={setPages} totalPages={totalPages} />
      </div>
          :
          <div className="menu">
              <div style={{ marginTop: "150px" }} className="menu-loader">
                <Loader />
              </div>
            </div> 
          }
    </>
  );
};
