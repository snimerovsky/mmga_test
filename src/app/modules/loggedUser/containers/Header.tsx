import React from "react";
import "./Header.scss";
import Avatar from "../components/Avatar";
import { withRoute } from "react-router5";
import { RouteNameChoices, RouteNames } from "../../router";
import classnames from "classnames";
import Help from "../../../../assets/icons/Help.png";

import { Gear, Email, Logout } from "../../../../assets/icons";
import { inject, observer } from "mobx-react";

export const Header = (props: any) => {
  const { user } = props;
  console.log(user);
  return (
    <div className="Header-Container">
      <div className="Header_Avatar-Container">
        <div className="Header_Avatar-Container_Wrapper">
          <span className="Header_Avatar-Container_Wrapper_Label __BolderBoldFont">
            Новичок
          </span>
          <div className="Header_Avatar-Container_Img">
            <Avatar
              img={user?.profile_picture}
              name={user?.login}
              city={user?.city}
            />
          </div>
          {/* <div className="Header_Avatar-Container_Text __MarginRight">
            <span className="Header_Avatar-Container_Name __BoldFont">
              {user?.login}
            </span>
            <span className="Header_Avatar-Container_SimpleText">
              {user?.city}
            </span>
          </div> */}
          <div className="Header_Avatar-Container_Text">
            <span
              style={{ marginTop: "2px" }}
              className="Header_Avatar-Container_SimpleText"
            >
              Баланс:&nbsp;
              <span
                className={classnames({
                  __RedText: user?.balance === 0,
                  __GreenText: user?.balance > 0,
                  __BoldFont: true,
                })}
              >
                {user?.balance} токенов
              </span>
            </span>
            <span className="Header_Avatar-Container_SimpleText">
              Срок действия:&nbsp;
              <span
                className={classnames({
                  __RedText: user?.paid_days === 0,
                  __GreenText: user?.paid_days > 0,
                  __BoldFont: true,
                })}
              >
                {user?.paid_days || 0}{" "}
                {user?.paid_days > 5
                  ? "дней"
                  : user?.paid_days === 1
                  ? "день"
                  : "дня" || "дней"}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="Header_Avatar-Container_Right">
        <Gear
          onClick={() => {
            props.router.navigate(RouteNames[RouteNameChoices.privateSettings]);
          }}
        />{" "}
        <a
          href="https://about.mmga.ru/obuchenie/"
          className={"icon"}
          target="_blank"
        >
          <img
            src={Help}
            onClick={() => {
              if (user && user?.first_task_completed) {
                props.router.navigate(RouteNames[RouteNameChoices.tutorial]);
              }
            }}
            className={"iconSize"}
          />
        </a>
        <div
          onClick={() => {
            props.authStore.logout();
            props.router.navigate(RouteNames[RouteNameChoices.home]);
          }}
          className="Header_Avatar-Container_Logout"
        >
          <Logout />
        </div>
      </div>
    </div>
  );
};
export default inject(({ authStore }: any) => ({ authStore }))(
  withRoute(observer(Header))
);
