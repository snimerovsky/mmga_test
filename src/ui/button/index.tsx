import classNames from "classnames";
import React, { Component } from "react";
import { IIconProps } from "../icons/interfaces";
import styles from "./index.module.scss";

interface IIconConfig {
  color?: string;
  placement?: IconPlacement | "left" | "right";
}

export interface IProps {
  text: string;
  color?: ButtonColor;
  className?: string;
  icon?: (props: IIconProps) => React.ReactElement;
  iconConfig?: IIconConfig;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  disableSolidFill?: boolean;
}

enum ButtonColor {
  blue = "blue",
  red = "red"
}

enum IconPlacement {
  left = "left",
  right = "right"
}

const defaultIconConfig: IIconConfig = {
  color: "#ffffff",
  placement: "left"
};

export class Button extends Component<IProps> {
  static Color = ButtonColor;

  static IconPlacement = IconPlacement;

  render() {
    const {
      text,
      color = ButtonColor.blue,
      onClick,
      className,
      icon: Icon,
      type,
      disabled,
      disableSolidFill = false
    } = this.props;
    let { iconConfig } = this.props;
    iconConfig = {
      ...defaultIconConfig,
      ...iconConfig
    };
    return (
      <button
        className={classNames(styles.Button, className, {
          [styles.colorRed]: color === ButtonColor.red,
          [styles.colorBlue]: color === ButtonColor.blue,
          [styles.withIcon]: Icon !== undefined,
          [styles.reverse]: iconConfig.placement === "right",
          [styles.disabled]: disabled,
          [styles.disableSolidFill]: disableSolidFill
        })}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {Icon && (
          <div className={styles.icon}>
            <Icon color={iconConfig.color} />
          </div>
        )}
        <span
          className={classNames(styles.textBlock, {
            [styles.colorRed]: color === ButtonColor.red,
            [styles.colorBlue]: color === ButtonColor.blue,
            [styles.disableSolidFill]: disableSolidFill
          })}
        >
          {text}
        </span>
      </button>
    );
  }
}
