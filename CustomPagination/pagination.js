import React from 'react';
import classNames from 'classnames';
import './pagination.scss';
import { usePagination, DOTS } from './usePagination';

const CustomPagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  // If there are less than 2 times in pagination range we shall not render the component

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      className={classNames('pagination-container', { [className]: className })}
    >
      {/* Left navigation arrow */}
      <li
        className={classNames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        {' '}
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
        return (
          <li
            className={classNames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={classNames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default CustomPagination;
