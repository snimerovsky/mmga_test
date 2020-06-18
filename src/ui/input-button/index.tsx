import React from "react";
import { Button, IProps as IButtonProps } from "../button";
import { Input, IProps as IInputProps } from "../input";
import styles from "./index.module.scss";

interface IProps extends IInputProps, Omit<IButtonProps, 'type'> {}

export const InputButton = (props: IProps) => {
  const { text, onClick, color, placeholder, name, type } = props;
  return (
    <div className={styles.InputButton}>
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        className={styles.input}
      />
      <Button
        text={text}
        onClick={onClick}
        color={color}
        className={styles.button}
      />
    </div>
  );
};
