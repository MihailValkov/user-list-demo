import { memo, type FC, type ReactNode } from 'react';
import styles from './Card.module.css';

const Card: FC<{ children: ReactNode; classes?: string }> = ({ children, classes = '' }) => {
  return <section className={`${styles.card} ${classes}`}>{children}</section>;
};

export default memo(Card);
