import React, { createContext, useEffect, useState } from "react";
import { useForm } from "../helper/submitForm";
import axios, { all } from "axios";
import { json, useNavigate } from "react-router";
import useGen from "../hooks/useGen";
import useSeriesGen from "../hooks/seriesUseGen copy";

export const AppContext = createContext();

export default function DataProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState();
  const [allMovies, setAllMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [content, setContent] = useState([]);
  const [contentSeries, setContentSeries] = useState([]);
  const [pages, setPages] = useState(1);
  const [seriesTotalPages, setSeriesTotalPages] = useState()
  const [totalPages, setTotalPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const genreforURL = useGen(selectedGenre);
  const [display, setDisplay] = useState(false)

  const [seriesGenres, setSeriesGenres] = useState([]);
  const [seriesSelectedGenre, setSeriesSelectedGenre] = useState([]);
  const seriesGenreForUrl = useSeriesGen(seriesSelectedGenre);

  const apiKey = "api_key=f1e5ee17dfc3557c0bc3873167403d84"; //Lave personal
  const baseKey = "https://api.themoviedb.org/3"; //Solicitud
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const searchURL = baseKey + "/search/movie?" + apiKey;

  const navigate = useNavigate();

  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });

  const onSearchSubmit = (e) => {
    if (!valueSearch) {
      return;
    }

    setDisplay(false)
    e.preventDefault();
    navigate("/search", {
      state: valueSearch,
    });
    onResetForm();
  };

  // Conseguimos las peliculas o series

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pages}&with_genres=${genreforURL}`
    );
    setMovies(data.results);
    setTotalPages(data.total_pages);
  };

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pages}&with_genres=${seriesGenreForUrl}`
    );
    setSeries(data.results);
    setSeriesTotalPages(data.total_pages);
  };

  //Conseguimos los generos

  const fetchGenresMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=f1e5ee17dfc3557c0bc3873167403d84&language=en-US`
    );
    setGenres(data.genres);
  };

  const fetchGenresSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=f1e5ee17dfc3557c0bc3873167403d84&language=en-US`
    );
    setSeriesGenres(data.genres);
  };

  // Ejecutamos las funciones cada que se cargue la pagina

  useEffect(() => {
    fetchGenresMovies();
    fetchGenresSeries();
  }, []);

  // Button's functions

  const addToList = (id, type) => {
    const check = favoriteMovies.every((item) => {
      return item.id !== id;
    });
    if (check) {
      const data = type.filter((movie) => {
        return movie.id === id;
      });
      window.localStorage.setItem("fav-movie", JSON.stringify(favoriteMovies));
      setFavoriteMovies([...favoriteMovies, ...data]);
    } else {

    }
  };

  function addToFavorites(id, type) {
    addToList(id, movies);
  }

  function seriesAddToFavorites(id, type) {
    addToList(id, series);
  }

  function moviesContentAddToFavorites(id, type) {
    addToList(id, content);
  }

  function seriesContentAddToFavorites(id, type) {
    addToList(id, contentSeries);
  }

  const deleteOfFavorites = (id) => {
    const updateFavorites = favoriteMovies.filter((item) => item.id !== id);
    setFavoriteMovies(updateFavorites);
  };

  const listToWatchlist = (id, type) => {
    const check = watchlistMovies.every((item) => {
      console.log("error");
      return item.id !== id;
    });
    if (check) {
      const data = type.filter((movie) => {
        return movie.id === id;
      });
      setWatchlistMovies([...watchlistMovies, ...data]);
      window.localStorage.setItem(
        "watchlist-movie",
        JSON.stringify(watchlistMovies)
      );
      console.log("Pelicula añadida");
    } else {
      alert("El item ya fue añadido");
    }
  };

  function addToWatchlist(id, type) {
    listToWatchlist(id, movies);
  }

  function seriesAddToWatchlist(id, type) {
    listToWatchlist(id, series);
  }

  function moviesContentAddToWatchlist(id, type) {
    listToWatchlist(id, content);
  }

  function seriesContentAddToWatchlist(id, type) {
    listToWatchlist(id, contentSeries);
  }

  const deleteOfWatchlist = (id) => {
    const updateWatchlist = watchlistMovies.filter((item) => item.id !== id);
    setWatchlistMovies(updateWatchlist);
  };

  const resetWatchlist = () => {
    setWatchlistMovies([]);
    localStorage.removeItem("watchlist-movie");
  };

  const resetFavorite = () => {
    setFavoriteMovies([]);
    localStorage.removeItem("fav-movie");
  };

  // Cada que se haga un cambio sobre los generos o las paginas volvemos a cargar lo que se debe mostrar
  useEffect(() => {
    fetchMovies();
    fetchSeries();
  }, [pages, genreforURL, seriesGenreForUrl]);

  //Local Storage

  
  useEffect(() => {
    const movieFavorites = localStorage.getItem("fav-movie");
    if (movieFavorites) {
      setFavoriteMovies(JSON.parse(movieFavorites));
    }
  }, []);

  useEffect(() => {
    const movieWatchlist = localStorage.getItem("watchlist-movie");
    if (movieWatchlist) {
      setWatchlistMovies(JSON.parse(movieWatchlist));
    }
  }, []);

  const value = {
    movies,
    setMovies,
    series,
    setSeries,
    IMG_URL,
    valueSearch,
    onInputChange,
    onResetForm,
    totalPages,
    setTotalPages,
    seriesTotalPages,
    pages,
    setPages,
    allMovies,
    setAllMovies,
    fetchGenresMovies,
    genres,
    setGenres,
    selectedGenre,
    setSelectedGenre,
    seriesGenres,
    setSeriesGenres,
    seriesSelectedGenre,
    setSeriesSelectedGenre,
    favoriteMovies,
    setFavoriteMovies,
    addToFavorites,
    deleteOfFavorites,
    watchlistMovies,
    setWatchlistMovies,
    addToWatchlist,
    deleteOfWatchlist,
    resetWatchlist,
    resetFavorite,
    onSearchSubmit,
    content,
    setContent,
    contentSeries,
    setContentSeries,
    seriesAddToFavorites,
    moviesContentAddToFavorites,
    seriesContentAddToFavorites,
    seriesAddToWatchlist,
    moviesContentAddToWatchlist,
    seriesContentAddToWatchlist,
    display,
    setDisplay
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
