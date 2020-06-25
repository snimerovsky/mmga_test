import { Checkbox } from "antd";
import React from "react";
import "./index.scss";

const CheckboxComp = (props: any) => {
  const { onChange, value, text } = props;

  return (
    <Checkbox
      checked={value}
      className="Checkbox-Container"
      onChange={(e) => onChange(e.target.checked)}
    >
      <div className="text">{text}</div>
    </Checkbox>
  );
};

export default CheckboxComp;
