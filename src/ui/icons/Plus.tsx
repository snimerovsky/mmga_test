import React from "react";
import { IIconProps } from "./interfaces";

export const Plus = (props: IIconProps) => {
  const { color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1={12} y1={5} x2={12} y2={19}/>
      <line x1={5} y1={12} x2={19} y2={12}/>
    </svg>
  );
};
