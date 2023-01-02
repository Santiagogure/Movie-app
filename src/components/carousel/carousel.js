import axios from "axios";
import React, {useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../config/config.js";
import "./carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ item }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((c) => (

    <div className="carousel-item" style={{cursor: 'pointer'}}>
    <div className="carousel-item__img-container">
      <img 
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carousel-item__img"
      />
    </div>
    {c.name.length > 14 ? (
      <b className="carousel-item__txt">{c?.name.slice(0, 10) + "..."}</b>
    ) : (
      <b className="carousel-item__txt">{c?.name}</b>
    )}
  </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=f1e5ee17dfc3557c0bc3873167403d84&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
  });

  return (
    <AliceCarousel
      mouseTracking
      infinite
      responsive={responsive}
      disableDotsControls
      disableButtonsControls
      items={items}
      autoPlay
    />
  );
};

export default Gallery;
