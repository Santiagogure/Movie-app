import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TransitionsModal({ item }) {
  const [video, setVideo] = useState();

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=f1e5ee17dfc3557c0bc3873167403d84&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchVideo();
  });



  function redirect() {
    window.location = `https://www.youtube.com/watch?v=${video}`;
  }

  return (
    <div className="wrapper">
      <iframe
        title={item.title}
        src={`https://www.youtube.com/embed/${video}`}

        className="video"
      ></iframe>
      <button
        href={`https://www.youtube.com/watch?v=${video}`}
        type="submit"
        onClick={() => redirect()}
      >
        Watch Video
      </button>
    </div>
  );
}
