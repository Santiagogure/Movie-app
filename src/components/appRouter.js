import { Routes, Route } from "react-router";

import { ViewMovie } from "../pages/singleContent/viewMovie";
import { Movie } from "../pages/mainPages/movie";
import { TvSeries } from "../pages/mainPages/tvSeries";
import { Favorites } from "../pages/mainPages/favorites";
import { Watchlist } from "../pages/mainPages/watchlist";
import { ViewSeries } from "../pages/singleContent/viewSeries";
import { NotFound } from "./mainNav/notFound";
import { SearchAll } from "../pages/searchPages/searchAll";
import Header from "./mainNav/header";
import DataProvider from "../context/dataProvider";

const AppRoute = () => {
  return (
    <div>
      <DataProvider>
        <Header />
        <Routes>
          <Route path="" element={<Movie />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="viewmovie/:id" element={<ViewMovie />}></Route>
          <Route path="viewseries/:id" element={<ViewSeries />}></Route>
          <Route path="search" element={<SearchAll />}></Route>
          <Route path="movies" element={<Movie />}></Route>
          <Route path="series" element={<TvSeries />}></Route>
          <Route path="favorites" element={<Favorites />}></Route>
          <Route path="watchlist" element={<Watchlist />}></Route>
        </Routes>
      </DataProvider>
    </div>
  );
};

export default AppRoute;
