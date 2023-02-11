import { type FC, type FormEvent, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { faClose, faSearch, type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';
import styles from './SearchBar.module.css';

const SearchBar: FC<{
  title: string;
  icon: IconDefinition;
  criterion: Array<{ value: string; text: string }>;
}> = ({ title, icon, criterion }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState({ search: '', criteria: criterion[0].value });

  const changeHandler = useCallback(
    (
      type: 'search' | 'criteria',
      { currentTarget: { value } }: FormEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
      setState((state) => ({ ...state, [type]: value }));
    },
    []
  );

  const onClear = useCallback(() => setState((state) => ({ ...state, search: '' })), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchParams.set('search', state.search.trim());
      searchParams.set('criteria', state.criteria);
      setSearchParams(searchParams);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [state, searchParams, setSearchParams]);

  return (
    <form className={styles['search-form']}>
      <h2>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        <span>{title}</span>
      </h2>
      <div className={styles['search-input-container']}>
        <input
          type="text"
          placeholder={`Search ${title} by ${state.criteria}`}
          name="search"
          onChange={changeHandler.bind(null, 'search')}
          value={state.search}
        />
        {state.search !== '' && (
          <Button
            icon={faClose}
            classes={`${styles.btn} ${styles['close-btn']}`}
            onClick={onClear}
          />
        )}

        <Button icon={faSearch} classes={styles.btn} />
      </div>

      <div className={styles.filter}>
        <span>Search Criteria:</span>
        <select
          name="criteria"
          className={styles.criteria}
          value={state.criteria}
          onChange={changeHandler.bind(null, 'criteria')}>
          {criterion.map((c) => (
            <option key={c.value} value={c.value}>
              {c.text}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default SearchBar;
