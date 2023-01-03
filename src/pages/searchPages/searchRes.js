import React, { useContext } from "react";
import { AppContext } from "../../context/dataProvider";

export const SearchRes = () => {
  const value = useContext(AppContext);
  const onInputChange = value.onInputChange;
  const valueSearch = value.valueSearch;
  const onSearchSubmit = value.onSearchSubmit;
  const display = value.display;
  const setDisplay = value.setDisplay;

  function redirect(id) {
    window.location = `/search${id}`;
  }

  return (
    <div >
      <div className="search-res-container">
        <div className="form-container">
          <box-icon
            style={{ height: "50px", fill: "white",
            position: 'relative', top: '-5px', left: '-5px'}}
            name="arrow-back"
            onClick={() => setDisplay()}
          ></box-icon>
          <form onSubmit={onSearchSubmit} id="form-res">
            <input
              id="input-search-res"
              onChange={onInputChange}
              name="valueSearch"
              value={valueSearch}
              type="text"
              placeholder="Search..."
              style={{ textAlign: "left" }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
