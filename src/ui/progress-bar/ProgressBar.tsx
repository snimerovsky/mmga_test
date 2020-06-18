import classNames from "classnames";
import React from "react";
import { range } from "../../utils/range";
import styles from "./ProgressBar.module.scss";

export enum Color {
  green = "green",
  red = "red"
}

interface IProps {
  color: Color;
  progress: number;
  divisionCount: 5 | 12;
  textBlock: React.ReactElement;
}

export const ProgressBar = (props: IProps) => {
  const { color, progress, divisionCount, textBlock } = props;
  return (
    <div className={styles.ProgressBar}>
      {textBlock}
      {range(0, divisionCount).map(div => {
        return (
          <div
            className={classNames(styles.progressDivision, {
              [styles.red]: color === Color.red && progress > div,
              [styles.green]: color === Color.green && progress > div,
              [styles.div5]: divisionCount === 5,
              [styles.div12]: divisionCount === 12,
            })}
            key={div}
          />
        )
      })}
    </div>
  );
};
