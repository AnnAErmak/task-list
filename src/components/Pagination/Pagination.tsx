import * as React from 'react';
import './Pagination.css';

type PaginationProps = {
  count: number;
  limit: number;
  page: number;
  indent: number;
  onChangePage: (number: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ count, limit, page, indent, onChangePage }) => {
  const length = Math.ceil(count / Math.max(limit, 1));

  let left = Math.max(page - indent, 1);
  const right = Math.min(left + indent * 2, length);

  left = Math.max(right - indent * 2, 1);

  const items = [];

  if (left > 1) items.push(1);
  if (left > 2) items.push(null);

  for (let pag = left; pag <= right; pag += 1) items.push(pag);

  if (right < length - 1) items.push(null);
  if (right < length) items.push(length);
  return (
    <div>
      <ul className={'pagination__list'}>
        {items.map((number, index) => (
          <li
            className={`pagination__list__item ${number === page && 'active'}`}
            // className={`${styles.item} ${number === page && styles.active}`}
            key={index}
            onClick={() => onChangePage(number)}
          >
            {number || '...'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
