import React from "react";
import { Link, withRoute } from "react-router5";
import "./Sidebar.scss";
import classnames from "classnames";

import {
  Mark,
  Analytic,
  Brain,
  Team,
  Oskar,
  Wallet,
  News,
  Chat,
} from "../../../../assets/icons";

export const Sidebar = (props: any) => {
  const {
    route: { name: routeName },
  } = props;

  const listItem = [
    {
      title: "Задания",
      to: "tasks",
      icon: <Mark />,
      active: routeName === "tasks",
    },
    // {
    //   title: "Аналитика",
    //   to: "analytics",
    //   icon: <Analytic />,
    //   active: routeName === "analytics",
    // },
    {
      title: "Обучение",
      to: "obuchenie",
      icon: <Brain />,
      active: routeName === "obuchenie",
      subdomain: true,
    },
    {
      title: "Команда",
      to: "crew",
      icon: <Team />,
      active: routeName === "crew",
    },
    {
      title: "Статусы",
      to: "statuses",
      icon: <Oskar />,
      active: routeName === "statuses",
    },
    {
      title: "Финансы",
      to: "finance",
      icon: <Wallet />,
      active: routeName === "finance",
    },
    {
      title: "Новости",
      to: "news",
      icon: <News />,
      active: routeName === "news",
      subdomain: true,
    },
    // {
    //   title: "Обращения",
    //   to: "chatting",
    //   icon: <Chat />,
    //   active: routeName === "chatting",
    // },
  ];
  return (
    <div
      className={`Sidebar-Container ${classnames({
        disabled: routeName === "assignments",
      })}`}
    >
      <nav>
        <ul>
          {listItem.map((item, index) => {
            if (item.subdomain) {
              return (
                <li
                  className={`__BolderBoldFont ${classnames({
                    active: item.active,
                  })}`}
                  key={index}
                >
                  <a href={`https://about.mmga.ru/${item.to}/`} target="_blank">
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </li>
              );
            }

            return (
              <li
                className={`__BolderBoldFont ${classnames({
                  active: item.active,
                })}`}
                key={index}
              >
                <Link routeName={item.to}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default withRoute(Sidebar);
