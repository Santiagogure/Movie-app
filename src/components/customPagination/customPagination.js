import React from "react";
import { Pagination } from "@mui/material";


const CustomPagination = ({ totalPages, setPages }) => {

  const handleChangePage = (pages) => {
    setPages(pages);
    window.scroll(0, 0);
  };

  return (
    <div
      className="pagination"
      style={{ display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: '60px', }}
    >
      <Pagination
        onChange={(e) => handleChangePage(e.target.textContent)}
        count={totalPages}
        color="primary"
        hideNextButton
        hidePrevButton
      ></Pagination>
    </div>
  );
};

export default CustomPagination;
