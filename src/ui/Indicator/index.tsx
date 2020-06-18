import classNames from "classnames";
import React, { Component } from "react";
import styles from "./index.module.scss";

export enum Types {
  default = "default",
  success = "success",
  error = "error"
}

interface IProps {
  status?: Types;
}

export class Indicator extends Component<IProps> {
  static Types = Types;

  render() {
    const {status = Types.default} = this.props;
    return (
      <div
        className={classNames(styles.Indicator, {
          [styles.success]: status === Types.success,
          [styles.error]: status === Types.error
        })}
      />
    )
  }
}
