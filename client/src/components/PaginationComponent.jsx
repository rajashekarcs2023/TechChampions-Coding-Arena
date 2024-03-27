import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ maxPagesInRow, totalPages, currentPage, paginate }) => {

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => paginate(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pageNumbers;
  };

  const renderPagination = () => {
    if (totalPages <= maxPagesInRow) {
      return renderPageNumbers();
    } else { 
      const pagesToDisplay = renderPageNumbers().slice(
        Math.max(currentPage - Math.floor(maxPagesInRow / 2) - 1, 0),
        Math.min(currentPage + Math.floor(maxPagesInRow / 2), totalPages)
      );

      const firstPage = (
        <>
          <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        </>
      );

      const lastPage = (
        <>
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
        </>
      );

      return (
        <>
          {firstPage}
          {pagesToDisplay}
          {lastPage}
        </>
      );
    }
  };

  return (
    <Pagination>
      {renderPagination()}
    </Pagination>
  );
};

export default PaginationComponent;
