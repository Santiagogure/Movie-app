import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../../context/dataProvider";
import { Loader } from "../../loader/loader";
import SeriesCarousel from "../../componentes/carousel/seriesCarousel";
import Video from "../../componentes/video/videoSerie";
import './singleContent.css'

export const ViewSeries = () => {
  const value = useContext(AppContext);
  const series = value.series;
  const contentSeries = value.contentSeries;
  const params = useParams();

  const setShow = value.setShow
  const seriesContentAddToFavorites = value.seriesContentAddToFavorites;
  const seriesContentAddToWatchlist = value.seriesContentAddToWatchlist;
  const seriesAddToFavorites = value.seriesAddToFavorites;
  const seriesAddToWatchlist = value.seriesAddToWatchlist;

  const [active, setActive] = useState(false);
  const [item, setItem] = useState([]);
  const [secondItem, setSecondItem] = useState([]);
  const IMG_URL = value.IMG_URL;

  useEffect(() => {
    series.forEach((series) => {
      if (series.id == params.id) {
        setItem(series);
      }
    });
  }, [params, series]);

  useEffect(() => {
    contentSeries.forEach((series) => {
      if (series.id == params.id) {
        setSecondItem(series);
      }
    });
  }, [params, series]);

  useEffect(() => {
    setShow(true)
  }, []);


  window.scroll(0, 0);

  setTimeout(() => {
    setActive(true);
  }, 1000);


  return (
    <div className="view-all-container">
      {secondItem.length <= 0 ? (
        <>
          {active ? (
            <div className="view-movie-container">
              <div className="movie-information">

              <h1 id="display-title">{item.name}</h1>
                <div className="movie-img">
                  <img src={IMG_URL + item.poster_path} alt={item.name}></img>
                  <div className="add-to">
                    <box-icon
                      id="add-favorites"
                      onClick={() => seriesAddToFavorites(item.id)}
                      type="solid"
                      name="heart"
                    ></box-icon>
                    <box-icon
                      id="add-watchlist"
                      onClick={() => seriesAddToWatchlist(item.id)}
                      name="task"
                    ></box-icon>
                  </div>
                </div>
                <div className="movie-data" style={{}}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <h1 id="disable-title">{item.name}</h1>
                    {/* <h5 style={{marginTop: '30px', opacity: '0.7'}}>({item.release_date.slice(0, 4)})</h5> */}
                    <p id="overview-view">{item.overview}</p>
                  </div>
                  <h3 id="cast-text">Cast</h3>
                  <div style={{ width: "31%", marginTop: '20px' }}>
                    <div className="cast">
                      <SeriesCarousel item={item} />
                    </div>
                  </div>
                </div>
              </div> 
              <Video item={item} />
            </div>
          ) : (
            <div className="menu">
            <div style={{ marginTop: "150px" }} className="menu-loader">
              <Loader />
            </div>
          </div> 
          )}
        </>
      ) : (
        <>
          {active ? (
            <div className="view-movie-container">
              <div className="movie-information">
              <h1 id="display-title">{secondItem.title}</h1>
                <div className="movie-img">
                  <img
                    src={IMG_URL + secondItem.poster_path}
                    alt={secondItem.title}
                  ></img>
                  <div className="add-to">
                    <box-icon
                      id="add-favorites"
                      onClick={() => seriesContentAddToFavorites(secondItem.id)}
                      type="solid"
                      name="heart"
                    ></box-icon>
                    <box-icon
                      id="add-watchlist"
                      onClick={() => seriesContentAddToWatchlist(secondItem.id)}
                      name="task"
                    ></box-icon>
                  </div>
                </div>
                <div className="movie-data" style={{}}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <h1 id="disable-title">{secondItem.name}</h1>
                    {/* <h5 style={{marginTop: '30px', opacity: '0.7'}}>({item.release_date.slice(0, 4)})</h5> */}
                    <p id="overview-view">{secondItem.overview}</p>
                  </div>
                  <h3 id="cast-text">Cast</h3>
                  <div style={{ width: "100%" }}>
                    <div className="cast"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "600px",
                        marginTop: "-50px",
                      }}
                    >
                      <SeriesCarousel item={secondItem} />
                    </div>
                  </div>
                </div>
              </div>
              <Video item={item} />
            </div>
          ) : (
            <div className="menu">
            <div style={{ marginTop: "150px" }} className="menu-loader">
              <Loader />
            </div>
          </div> 
          )}
        </>
      )}
    </div>
  );
};



