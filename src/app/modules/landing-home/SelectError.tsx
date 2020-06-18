import React from "react";
import styles from "./SelectError.module.scss";

interface IProps {
  touched: boolean;
  error?: string;
}

export const SelectError = (props: IProps) => {
  const { touched, error } = props;
  if (touched && error) {
    return <div className={styles.SelectError}>{error}</div>;
  }
  return null;
};
