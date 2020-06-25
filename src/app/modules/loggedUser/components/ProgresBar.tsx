import React, { useEffect, useState } from "react";
import "./ProgresBar.scss";
import { useTimer } from "react-timer-hook";

function MyTimer(props: any) {
  const { expiryTimestamp } = props;
  const { minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });
  return (
    <h1 className={"timer"}>
      {hours} <span className={"text"}>часа</span> {minutes}{" "}
      <span className={"text"}>мин</span>
    </h1>
  );
}

export const ProgresBar = (props: any) => {
  const {
    total,
    done,
    activeColor,
    labeLeft,
    labelRightTop,
    labelTopLeft,
  } = props;

  const skeleton = [];
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  for (let i = 0; i < total; i++) {
    skeleton.push(0);
  }
  return (
    <div className="ProgresBar-Container">
      <span className="ProgresBar-Container_LeftLabel">{labeLeft || ""}</span>
      <div className="ProgresBar-Container_Bar">
        {skeleton.map((elem, index) => {
          if (index < done)
            return (
              <div
                key={index}
                style={{
                  width: `${80 / total}%`,
                  backgroundColor: activeColor || "green",
                }}
                className="ProgresBar-Container_Bar-Item active"
              ></div>
            );
          else
            return (
              <div
                key={index}
                style={{
                  width: `${80 / total}%`,
                }}
                className="ProgresBar-Container_Bar-Item empty"
              ></div>
            );
        })}
        <span className="ProgresBar-Container_Bar_Label-Left">
          <span className="__BoldFont" style={{ color: activeColor }}>
            {done}
          </span>
          <span className="__BoldFont">
            {"/ "}
            {total}
          </span>
          {labelTopLeft || ""}
        </span>
        <span className="ProgresBar-Container_Bar_Label-Right">
          <MyTimer expiryTimestamp={time} />
          {labelRightTop || ""}
        </span>
      </div>
    </div>
  );
};

export default ProgresBar;
