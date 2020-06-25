import React, { useState, useEffect, useRef } from "react";
import clipboard from "clipboard-polyfill";
import "./PrivateSettings.scss";
import TitleHeader from "../components/TitleHeader";
import Label from "../components/Label";
import classNames from "classnames";
import { Input } from "../../../../ui/input";
import { withApi } from "../../../../api/withApi";

import { InputWrapper } from "../../landing-home/InputWrapper";
import { Gear } from "../../../../assets/icons";
import { getIndicatorStatus } from "../../../../ui/Indicator/utils";
import { Button, notification } from "antd";

export const PrivateSettings = (props: any) => {
  const {
    api,
    user: { referrer, email, phone, username, email_confirmed },
  } = props;
  const [referrerInput, setReferrer] = useState("");
  const [emailInput, setEmail] = useState("");
  const [phoneInput, setPhone] = useState("");
  const [usernameInput, setUsername] = useState("");

  const [referrerInputActive, setReferrerActive] = useState(false);
  const [emailInputActive, setEmailActive] = useState(false);
  const [phoneInputActive, setPhoneActive] = useState(false);

  const ref = useRef<any>(null);
  const copyToClipboard = (e: any) => {
    clipboard.writeText(referrerInput);
    notification.success({ message: "Ссылка скопирована в буфер обмена" });
  };

  useEffect(() => {
    setReferrer(`https://mmga.ru/registration/${referrer}`);
    setEmail(email);
    setPhone(phone);
    setUsername(username);
  }, [email, phone, referrer, username]);

  const sendConfirmData = (type: string) => {
    const message =
      type === "email"
        ? `Письмо с подтверждением было отправлено на ваш имейл`
        : "Смс с подтвержденмем было отправлено на ваш номер";
    try {
      notification.success({ message });
      api.sendInfoConfirmation({ email: emailInput, phone: phoneInput });
    } catch (error) {}
  };

  return (
    <div className="PrivateSettings-Container">
      <TitleHeader>
        <Gear />
        <span>Личные настройки</span>
      </TitleHeader>
      <div className="user-wrapper">
        <div className="PrivateSettings-Container_Item">
          <InputWrapper name={"name"} labelText={"Реферальная ссылка"}>
            <Input
              type={"text"}
              name={"city"}
              indicator={{
                status: getIndicatorStatus(true, undefined),
              }}
              value={referrerInput}
              error={false && false}
              ref={ref}
              readOnly
            />
          </InputWrapper>
          <Button
            className={classNames({ active: referrerInputActive })}
            onClick={(e: any) => {
              copyToClipboard(e);
            }}
          >
            Скопировать
          </Button>
        </div>
        <div className="PrivateSettings-Container_Item">
          <InputWrapper name={"name"} labelText={"Электронный адрес"}>
            <Input
              type={"text"}
              name={"city"}
              indicator={{
                status: getIndicatorStatus(true, undefined),
              }}
              value={emailInput}
              error={false && false}
              readOnly
            />
          </InputWrapper>

          <Button
            onClick={() => {
              sendConfirmData("email");
            }}
            className={classNames({ active: emailInputActive })}
            disabled={email_confirmed}
          >
            {email_confirmed ? "Подтверждено" : "Подтвердить"}
          </Button>
        </div>
        <div className="PrivateSettings-Container_Item">
          <InputWrapper name={"name"} labelText={"Номер телефона"}>
            <Input
              type={"text"}
              name={"city"}
              indicator={{
                status: getIndicatorStatus(true, undefined),
              }}
              value={phoneInput}
              error={false && false}
              readOnly
            />
          </InputWrapper>
          <Button
            onClick={() => {
              sendConfirmData("phone");
            }}
            className={classNames({ active: phoneInputActive })}
          >
            Подтвердить
          </Button>
        </div>
        <div className="PrivateSettings-Container_Item">
          <InputWrapper name={"name"} labelText={"Имя аккаунта в сервисе"}>
            <Input
              type={"text"}
              name={"city"}
              indicator={{
                status: getIndicatorStatus(true, undefined),
              }}
              value={usernameInput}
              error={false && false}
              readOnly
            />
          </InputWrapper>
        </div>
      </div>
    </div>
  );
};

export default withApi(PrivateSettings);
