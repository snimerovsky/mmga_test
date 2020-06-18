import classNames from "classnames";
import React, { Component } from "react";
import styles from './Option.module.scss';

export interface IProps {
  id: string | number;
  text?: string;
  className?: string;
  onClick?: (id: string | number) => void;
}

export class Option extends Component<IProps> {
  onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.props.onClick !== undefined) {
      this.props.onClick(this.props.id);
    }
  };

  render() {
    const { text, className } = this.props;
    return (
      <div className={classNames(styles.Option, className)} onClick={this.onClick}>
        <span className={styles.text}>{text}</span>
      </div>
    )
  }
}
