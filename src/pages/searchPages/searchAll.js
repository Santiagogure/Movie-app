import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../context/dataProvider";
import { CardSearch } from "../../detail/CardSearch";
import CustomPagination from "../../componentes/customPagination/customPagination";
import { Loader } from "../../loader/loader";
import { Link } from "react-router-dom";

export const SearchAll = () => {
  const value = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(1);
  const IMG_URL = value.IMG_URL;
  const content = value.content;
  const setContent = value.setContent;
  const contentSeries = value.contentSeries;
  const setContentSeries = value.setContentSeries;
  const location = useLocation();

  const apiKey = "api_key=f1e5ee17dfc3557c0bc3873167403d84"; //Lave personal
  const baseKey = "https://api.themoviedb.org/3"; //Solicitud

  const searchURL = baseKey + "/search/movie?" + apiKey;
  const searchURLSeries = baseKey + "/search/tv?" + apiKey;

  function fetchSearch(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setContent(data.results);
      });
  }

  function fetchSeries(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setContentSeries(data.results);
      });
  }

  useEffect(() => {
    fetchSearch(
      searchURL +
        "&query=" +
        location.state +
        `&page=${page}&include_adult=false`
    );
    fetchSeries(
      searchURLSeries +
        "&query=" +
        location.state +
        `&page=${page}&include_adult=false`
    );
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  setTimeout(() => {
    setShow(true);
  }, 800);

  return (
    <>
      {show ? (
        <div className="filter-movies">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alingItems: "center",
              gap: "20px",
              fontFamily: "inherit",
              color: "#eee",
            }}
          >
            <h1
              className={active === 1 ? "view-active" : ""}
              onClick={() => setActive(1)}
              style={{ cursor: "pointer" }}
            >
              Movies{" "}
            </h1>
            <h1
              className={active === 2 ? "view-active" : ""}
              onClick={() => setActive(2)}
              style={{ cursor: "pointer" }}
            >
              {" "}
              Series
            </h1>
          </div>

          {active === 1 ? (
            <div>
              {content.length <= 1 ? (
                <p p-search>
                  {" "}
                  Se encontro{" "}
                  <span>
                    <strong>{content.length}</strong>
                  </span>{" "}
                  resultado
                </p>
              ) : (
                <p className="p-search">
                  {" "}
                  Se encontraron{" "}
                  <span>
                    <strong>{content.length}</strong>
                  </span>{" "}
                  resultados
                </p>
              )}

              <div className="movies-filter">
                {content.map((movie) => (
                 
                 <div className="movie">
  
                   <Link to={`/viewmovie/${movie.id}`}>
                     {
                       movie.poster_path ? (
                         <img src={IMG_URL + movie.poster_path} alt={movie.title}></img>
                       ) : (
                         ""
                       ) // Buscar imagen de not found
                     }
                   </Link>
                 
                 <div class="movie-info">
                 <div className="movie-title" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
           
                      {movie.title.length > 20 ? <h3>{movie.title.slice(0, 18) + "..."} </h3>
                      : 
                      <h3>{movie.title}</h3>
                      } 
         
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


                ))}
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alingItems: "center",
                  gap: "20px",
                  color: "white",
                  fontFamily: "inherit",
                }}
              ></div>
              <div>
                {contentSeries.length <= 1 ? (
                  <p p-search>
                    Se encontro{" "}
                    <span>
                      <strong>{contentSeries.length}</strong>
                    </span>{" "}
                    resultado
                  </p>
                ) : (
                  <p className="p-search">
                    Se encontraron{" "}
                    <span>
                      <strong>{contentSeries.length}</strong>
                    </span>{" "}
                    resultados
                  </p>
                )}

                <div className="movies-filter">
                  {contentSeries.map((movie) => (
                
                   <div className="movie">
                     <Link to={`/viewseries/${movie.id}`}>
                       {
                         movie.poster_path ? (
                           <img src={IMG_URL + movie.poster_path} alt={movie.name}></img>
                         ) : (
                           ""
                         ) // Buscar imagen de not found
                       }
                     </Link>

             
                   <div class="movie-info">
                   <div className="movie-title" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      
                        {movie.name.length > 20 ? <h3>{movie.name.slice(0, 18) + "..."}</h3>
                        : 
                        <h3>{movie.name}</h3>
                        } 
             
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

                  ))}
                </div>
              </div>
            </>
          )}
          <CustomPagination setPages={setPage} totalPages={page} />
        </div>
      ) : (
        <div className="menu">
          <div style={{ marginTop: "150px" }} className="menu-loader">
            <Loader />
          </div>
        </div>
      )}
    </>
  );
};
