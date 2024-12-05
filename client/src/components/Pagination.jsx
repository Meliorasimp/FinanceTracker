import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, currentPage, setCurrentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-controls flex justify-center items-center gap-2 text-base rounded-lg mt-1">
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? 'active text-blue-100 font-bold' : ''}
        >
          {page}
        </button>
      ))}
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pages.length}>Next</button>
    </div>
  );
};

export default Pagination;

