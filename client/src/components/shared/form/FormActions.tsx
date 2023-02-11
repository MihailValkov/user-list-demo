import { type FC, memo, type ReactNode } from 'react';

import styles from './FormActions.module.css';

type IPosition = 'left' | 'center' | 'right';

const FormActions: FC<{
  children: ReactNode;
  responseError: string | null;
  position?: IPosition;
}> = ({ children, responseError = '', position = 'center' }) => {
  return (
    <div className={`${styles.actions} ${styles[position]}`}>
      <div className={styles['error-container']}>
        <p className={styles.error}>{responseError}</p>
      </div>
      <div className={styles.buttons}>{children}</div>
    </div>
  );
};

export default memo(FormActions);
