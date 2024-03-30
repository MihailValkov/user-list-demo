import { memo, type FC, type ReactNode } from 'react';

import styles from './FormRow.module.css';

const FormRow: FC<{ children: ReactNode; classes?: string; animation?: boolean }> = ({
  children,
  classes = '',
  animation = false
}) => {
  return (
    <div className={`${styles['form-row']} ${animation ? styles.animation : ''} ${classes}`}>
      {children}
    </div>
  );
};

export default memo(FormRow);
