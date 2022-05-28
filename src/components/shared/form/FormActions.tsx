import { FC, memo, ReactNode } from 'react';

import styles from './FormActions.module.css';

const FormActions: FC<{ responseError: string | null; children: ReactNode }> = memo(
  ({ children, responseError = '' }) => {
    return (
      <div className={styles.actions}>
        <div className={styles['error-container']}>
          {responseError && <p className={styles.error}>{responseError}</p>}
        </div>
        <div className={styles.buttons}>{children}</div>
      </div>
    );
  }
);

export default FormActions;
