import { FC, FormEventHandler, ReactNode } from 'react';

import LoadingSpinner from '../LoadingSpinner';

import styles from './Form.module.css';

const Form: FC<{
  onSubmitHandler: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  children: ReactNode;
}> = ({ children, onSubmitHandler, isLoading }) => {
  return (
    <>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        {isLoading && <LoadingSpinner className={styles.overlay} />}
        {children}
      </form>
    </>
  );
};

export default Form;
