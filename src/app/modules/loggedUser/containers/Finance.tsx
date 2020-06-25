import React from "react";
import "./Finance.scss";
import classnames from "classnames";
import TitleHeader from "../components/TitleHeader";
import { Button, Modal, Row, Col } from "antd";
import { Input } from "../../../../ui/input";

import {
  Wallet,
  MasterCard,
  Qiwi,
  Visa,
  Webmoney,
  Yandexmoney,
  Close,
} from "../../../../assets/icons";

import { getIndicatorStatus } from "../../../../ui/Indicator/utils";
import { FinanceStore } from "../../authorization/stores/AuthStore";
import { withRoute } from "react-router5";
import { withApi } from "../../../../api/withApi";
import { inject, observer } from "mobx-react";
import { IStore } from "../../../store";
import { IPlan } from "../../../../api/interfaces";

interface IProps {
  financeStore: FinanceStore;
}

const modalContainer = (
  plan: IPlan,
  closeAction: () => void,
  setTokens: (n: number) => void,
  pay: (plan: IPlan) => void
) => {
  return (
    <div className="Finance-Container_ModalContainer">
      <div
        onClick={closeAction}
        className="Finance-Container_ModalContainer_Close-Button"
      >
        <Close />
      </div>
      <h3 className="__BolderBoldFont">Пополнить баланс</h3>
      <div className="Finance-Container_ModalContainer_Svg">
        <Wallet />
      </div>
      <div className="Finance-Container_ModalContainer_Input-Wrapper">
        <span className="text">Количество монет</span>
        <Input
          type={"text"}
          name={"money"}
          value={plan.tokens.amount === 0 ? "" : plan.tokens.amount.toString()}
          readOnly={plan.id !== 0}
          onChange={(val) => {
            setTokens(parseInt((val || "0") as string));
          }}
          indicator={{
            status: getIndicatorStatus(true, undefined),
          }}
          error={false && false}
        />
        <div className="Finance-Container_ModalContainer_Input-Wrapper_Sum">
          <span className="text">Сумма для пополнения: </span>
          <span className="__BolderBoldFont">{plan.tokens.price} руб</span>
        </div>
      </div>

      <div className="Finance-Container_ModalContainer_Purchase">
        <img src={Yandexmoney} alt="Yandexmoney" />
        <img src={Visa} alt="Visa" />
        <img src={MasterCard} alt="MasterCard" />
        <img src={Qiwi} alt="Qiwi" />
        <img src={Webmoney} alt="Webmoney" />
      </div>
      <Button
        type="primary"
        onClick={() => {
          pay(plan);
        }}
      >
        Оплатить
      </Button>
    </div>
  );
};

const Plan = (
  plan: IPlan,
  setCurrentPlan: (p: IPlan) => void,
  index: number
) => (
  <div className="Finance-Container_Plans_Item" key={index}>
    <div
      className={classnames({
        __BoldFont: true,
        "Finance-Container_Plans_Item_Header": true,
        base: plan.type === "Базовый",
        opt: plan.type === "Оптимальный",
        pro: plan.type === "Продвинутый",
        prof: plan.type === "Профессиональный",
      })}
    >
      {plan.type}
    </div>
    <div className="Finance-Container_Plans_Item_Container">
      <div className="Finance-Container_Plans_Item_Container_Monthes">
        <h3 className="__BolderBoldFont">
          {plan.months}{" "}
          {plan.months > 1
            ? plan.months <= 4
              ? "Месяца"
              : "Месяцев"
            : "Месяц"}
        </h3>
        <span>работы в сервисе</span>
      </div>
      <div className="Finance-Container_Plans_Item_Container_Garantee __BolderBoldFont">
        {plan.guarantee.status ? (
          <span className="Finance-Container_Plans_Item_Container_Garantee__active">
            Гарантия
          </span>
        ) : null}
        {plan.guarantee.description ? (
          <span className="Finance-Container_Plans_Item_Container_Garantee__status __BolderBoldFont">
            {plan.guarantee.description}
          </span>
        ) : null}
        <span className="Finance-Container_Plans_Item_Container_Garantee_Subscribers __BolderBoldFont">
          {plan.guarantee.subscribers
            ? `${plan.guarantee.subscribers} подписчиков`
            : null}
        </span>
      </div>
      <div className="Finance-Container_Plans_Item_Container_Tokens __BolderBoldFont">
        <span className="Finance-Container_Plans_Item_Container_Tokens__active">
          {plan.tokens.amount} токенов
        </span>
      </div>
      <Button
        onClick={() => {
          setCurrentPlan(plan);
        }}
        className="Finance-Container_Plans_Item_Container_Button"
      >
        <Wallet /> Купить
      </Button>
    </div>
  </div>
);

export const Finance = (props: IProps) => {
  return (
    <div className="Finance-Container">
      <TitleHeader>
        <Wallet />
        <span>Финансы</span>
      </TitleHeader>
      <div className="user-wrapper">
        <div className="Finance-Container_Header">
          <div>
            Внутренняя валюта:{" "}
            <span className="Finance-Container_Header__active __BolderBoldFont">
              Токены
            </span>{" "}
            <span className="Finance-Container_Header_Curse __BolderBoldFont">
              1 токен = 5 руб
            </span>
          </div>
          {/* <Button
            onClick={() =>
              props.financeStore.setCurrentPlan({
                guarantee: undefined,
                months: 0,
                tokens: { amount: 0, price: 0 },
                type: '',
                id: 0,
              })
            }
            className="Finance-Container_Header_Button"
          >
            Пополнить баланс коинами
          </Button> */}
        </div>

        <div className="Finance-Container_Plans">
          {props.financeStore.plans.map((plan: any, index: number) =>
            Plan(plan, props.financeStore.setCurrentPlan, index)
          )}
        </div>
      </div>
      <Modal
        visible={props.financeStore.currentPlan !== null}
        onOk={props.financeStore.clearCurrentPlan}
        onCancel={props.financeStore.clearCurrentPlan}
      >
        {props.financeStore.currentPlan !== null
          ? modalContainer(
              props.financeStore.currentPlan,
              props.financeStore.clearCurrentPlan,
              props.financeStore.setTokens,
              props.financeStore.pay
            )
          : null}
      </Modal>
    </div>
  );
};

export default withRoute(
  withApi(
    inject((store: IStore) => ({
      financeStore: store.financeStore,
    }))(observer(Finance))
  )
);
