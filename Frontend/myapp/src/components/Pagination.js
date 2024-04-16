// Pagination.js
import React from 'react';

const Pagination = ({ page, setPage }) => {
  return (
    <div className="pages-div">
      <button
        className="pagination"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      <span>Page: {page}</span>
      <button
        className="pagination"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
