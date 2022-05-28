import { FC, ReactNode } from 'react';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Button.module.css';

const Button: FC<{
  children?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  classes?: string;
  disabled?: boolean;
  icon?: IconDefinition | null;
  iconPosition?: 'before' | 'after';
  title?: string;
}> = ({ children, onClick, type, classes, disabled, icon, title, iconPosition = 'before' }) => {
  return (
    <button
      type={type || 'button'}
      className={`${styles.btn} ${classes}`}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {iconPosition === 'before' && icon && (
        <FontAwesomeIcon icon={icon} className={styles.before} />
      )}
      {children}
      {iconPosition === 'after' && icon && <FontAwesomeIcon icon={icon} className={styles.after} />}
    </button>
  );
};

export default Button;
