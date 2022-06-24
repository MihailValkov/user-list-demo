import { FC, useMemo } from 'react';

import styles from './Navigation.module.css';

const Navigation: FC = () => {
  const date = useMemo(() => new Date(), []);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.text}>
          React Course - {month} {year} - User List Demo
        </span>
      </div>
    </header>
  );
};

export default Navigation;
