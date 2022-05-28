import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

import styles from './Pagination.module.css';

const Pagination: FC<{
  classes?: string;
  path: string;
  currentPage: number;
  pages: number;
  limit: number;
}> = ({ classes, path, currentPage, pages, limit }) => {
  const navigateTo = useNavigate();

  const navigate = useCallback(
    (destination: 'next' | 'previous') => {
      if (destination === 'next') {
        navigateTo(
          `${path}?page=${currentPage + 1 >= pages ? pages : currentPage + 1}&limit=${limit}`
        );
      } else if (destination === 'previous') {
        navigateTo(`${path}?page=${currentPage - 1 < 1 ? 1 : currentPage - 1}&limit=${limit}`);
      }
    },
    [history, currentPage, pages, limit, path]
  );
  return (
    <div className={`${styles.pagination} ${classes}`}>
      <Button
        icon={faArrowAltCircleLeft}
        onClick={navigate.bind(null, 'previous')}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <p className={styles.pages}>
        Page {currentPage} of {pages} pages.
      </p>
      <Button
        onClick={navigate.bind(null, 'next')}
        disabled={currentPage >= pages}
        icon={faArrowAltCircleRight}
        iconPosition='after'
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
