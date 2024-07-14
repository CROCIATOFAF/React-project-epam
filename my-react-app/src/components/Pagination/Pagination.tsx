import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const location = useLocation();
  const createPageLink = (page: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page.toString());
    return `?${searchParams.toString()}`;
  };

  const getPageNumbers = () => {
    const maxPages = 5;
    const halfPages = Math.floor(maxPages / 2);
    let startPage = Math.max(1, currentPage - halfPages);
    let endPage = Math.min(totalPages, currentPage + halfPages);

    if (currentPage <= halfPages) {
      endPage = Math.min(totalPages, maxPages);
    } else if (currentPage + halfPages >= totalPages) {
      startPage = Math.max(1, totalPages - maxPages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <>
          <Link
            to={createPageLink(1)}
            onClick={() => onPageChange(1)}
            className="first"
          >
            <span>&#10094;&#10094; First</span>
          </Link>
          <Link
            to={createPageLink(currentPage - 1)}
            onClick={() => onPageChange(currentPage - 1)}
            className="previous"
          >
            <span>&#10094; Previous</span>
          </Link>
        </>
      )}
      {getPageNumbers().map(page => (
        <Link
          key={page}
          to={createPageLink(page)}
          className={currentPage === page ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          <span>{page}</span>
        </Link>
      ))}
      {currentPage < totalPages && (
        <>
          <Link
            to={createPageLink(currentPage + 1)}
            onClick={() => onPageChange(currentPage + 1)}
            className="next"
          >
            <span>Next &#10095;</span>
          </Link>
          <Link
            to={createPageLink(totalPages)}
            onClick={() => onPageChange(totalPages)}
            className="last"
          >
            <span>Last &#10095;&#10095;</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default Pagination;
