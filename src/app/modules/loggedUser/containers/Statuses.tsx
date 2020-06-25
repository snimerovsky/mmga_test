import React, { useState } from "react";
import "./Statuses.scss";

import TitleHeader from "../components/TitleHeader";
import { Popover } from "antd";
import ProgresBar from "../components/ProgresBar";
import classnames from "classnames";

import {
  Oskar,
  Question,
  Rocket,
  SmallBusiness,
  Safe,
  Factory,
  Bank,
  Group,
  Portfolio,
  Startup,
} from "../../../../assets/icons";

const warningPopover = () => {
  const content = (
    <div className="WarningPopover-Container">
      <p>При 5 предупреждениях, ваш аккаунт автоматически блокируется!</p>
    </div>
  );
  return (
    <Popover content={content}>
      <Question />
    </Popover>
  );
};

const infoPopover = (children: any, status: any) => {
  const content = (
    <div className="WarningPopover-Container __info">
      <span>{status?.content}</span>
      {status?.link ? (
        <a href={status?.link} target="_blank">
          Подробнее
        </a>
      ) : (
        <></>
      )}
    </div>
  );
  return <Popover content={content}>{children}</Popover>;
};

const statusBlock = (status: any, index: any, active: any) => {
  return (
    <div
      className={classnames({
        "Statuses-Container_StatusBlock_Item": true,
        active: index === active,
      })}
    >
      <div className="Statuses-Container_StatusBlock_Item_Content">
        {status?.icon}
        <span className="__BoldFont">{status?.text}</span>
      </div>
    </div>
  );
};

const statuses = [
  {
    icon: <Startup />,
    text: "Новичок",
    content:
      "Данный статус присваиватся при регистрации / авторизации в сервисе. ",
  },
  {
    icon: <Rocket />,
    text: "Стартап",
    content:
      "Данный статус вы можете получить, если приведёте в свою команду 5 пользователей. ",
    link: "https://about.mmga.ru/statusy/startap/",
  },
  {
    icon: <Portfolio />,
    text: "Предприниматель",
    content:
      "Данный статус вы можете получить, если в вашей команде будет 20 пользователей. ",
    link: "https://about.mmga.ru/statusy/predprinimatel/",
  },
  {
    icon: <SmallBusiness />,
    text: "Малый бизнес",
    content:
      "Данный статус вы можете получить, если в вашей команде будет 90 пользователей. ",
    link: "https://about.mmga.ru/statusy/malyj-biznes/",
  },
  {
    icon: <Group />,
    text: "Средний бизнес",
    content:
      "Данный статус вы можете получить, если в вашей команде будет 490 пользователей. ",
    link: "https://about.mmga.ru/statusy/srednij-biznes/",
  },
  {
    icon: <Safe />,
    text: "Бизнес",
    content: "Данный статус возможно получить только по запросу. ",
    link: "https://about.mmga.ru/statusy/biznes/",
  },
  {
    icon: <Factory />,
    text: "Крупный бизнес",
    content:
      "Данный статус вы можете получить, если в вашей команде будет 2490 пользователей.",
    link: "https://about.mmga.ru/statusy/krupnyj-biznes/",
  },
  {
    icon: <Bank />,
    text: "Миллиардер",
    content: "Данный статус является коммерческим.",
    link: "https://about.mmga.ru/statusy/milliarder/",
  },
];

export const Statuses = (props: any) => {
  const [activeStatus, _] = useState(props?.user?.rang - 1);

  const warnings = props?.user?.warnings;

  return (
    <div className="Statuses-Container">
      <TitleHeader>
        <Oskar />
        <span>Статусы</span>
      </TitleHeader>
      <div className="user-wrapper">
        <div className="Statuses-Container_StatusBlock">
          {statuses.map((status, index) =>
            infoPopover(statusBlock(status, index, activeStatus), status)
          )}
        </div>

        {warnings > 0 && (
          <div className="Tasks-Container_Container_Progress-Warning">
            <ProgresBar
              labeLeft="Предупреждения"
              activeColor={"#ee2e24"}
              total={5}
              done={warnings}
              labelTopLeft={warningPopover()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Statuses;
