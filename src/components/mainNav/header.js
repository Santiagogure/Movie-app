import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/dataProvider";
import 'boxicons';
import { SearchRes } from "../../pages/searchPages/searchRes";

export const Header = () => {
  const value = useContext(AppContext);
  const onInputChange = value.onInputChange;
  const valueSearch = value.valueSearch;
  const setPages = value.setPages;
  const setSelectedGenre = value.setSelectedGenre;
  const display = value.display
  const setDisplay = value.setDisplay

  const onSearchSubmit = value.onSearchSubmit;

  useEffect(() => {
    onSearchSubmit();
   
  }, []);

  const [active, setActive] = useState(1);
  

  function showSearch() {
    setDisplay(!display)
    console.log(display)
  }

  const changeSection = (num) => {
    setSelectedGenre([]);
    setActive(num);
    setPages(1);
    window.scroll(0, 0);
  };

  return (
    <div>
      {display === true ? <SearchRes/> : 
      <header>
        <Link
          onClick={() => changeSection(1)}
          to=""
          style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
        >
          <h1 style={{ color: "white" }} className="logo-disable">Gure</h1>
        </Link>
        <div
          className="categories"
          style={{
            color: "white",
            display: "flex",
            gap: "100px",
            fontSize: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "50px",
            }}
          >
            <Link
              onClick={() => changeSection(1)}
              style={{ textDecoration: "none" }}
              to="movies"
            >
              <h3
                onClick={() => changeSection(1)}
                className={active === 1 ? "first-h3-active" : ""}
              >
                Movies
              </h3>
            </Link>

            <Link
              onClick={() => changeSection(2)}
              style={{ textDecoration: "none" }}
              to="/series"
            >
              <h3
                onClick={() => changeSection(2)}
                className={active === 2 ? "second-h3-active" : ""}
              >
                TV Series
              </h3>
            </Link>

            <Link
              onClick={() => setActive(3)}
              to="/favorites"
              style={{ textDecoration: "none" }}
            >
              <h3
                onClick={() => setActive(3)}
                className={active === 3 ? "third-h3-active" : ""}
              >
                Favorites
              </h3>
            </Link>

            <Link
              onClick={() => setActive(4)}
              to="/watchlist"
              style={{ textDecoration: "none" }}
            >
              <h3
                onClick={() => setActive(4)}
                className={active === 4 ? "fourth-h3-active" : ""}
              >
                Watchlist
              </h3>
            </Link>
          </div>
        </div>
        <form onSubmit={onSearchSubmit} id="form">
          <input
            id="input-search"
            onChange={onInputChange}
            name="valueSearch"
            value={valueSearch}
            type="text"
            placeholder="Search..."
          />
          <box-icon id="search-input-logo" name="search-alt-2" />
        </form>

        <box-icon onClick={() => showSearch()} id="search-input-logo-display" name='search-alt-2'></box-icon>
      </header>
      }
    </div>
  );
};

export default Header;
