import React from "react";
import styles from './InputWrapper.module.scss';

export const InputWrapper = (props: { children: React.ReactChild; name: string; labelText: string }) => {
  const { children, labelText, name } = props;
  return (
    <div className={styles.Input}>
      <label htmlFor={name} className={styles.label}>{labelText}</label>
      {children}
    </div>
  )
};
