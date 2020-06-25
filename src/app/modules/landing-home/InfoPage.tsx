import classNames from "classnames";
import React, { Component, Fragment } from "react";
import { withRoute } from "react-router5";
import { Router } from "router5";
import face2 from "../../../styles/sources/images/bk.svg";
import face3 from "../../../styles/sources/images/bl.svg";
import facesImg from "../../../styles/sources/images/faces.png";
import face1 from "../../../styles/sources/images/lk.svg";
import { MM, SP, WG } from "../../../assets/icons";
import phoneImg from "../../../styles/sources/images/phone.svg";
import face4 from "../../../styles/sources/images/smm.svg";
import { Button } from "../../../ui/button";
import { InputButton } from "../../../ui/input-button";
import { RouteNameChoices, RouteNames } from "../router";
import styles from "./LandingHomePage.module.scss";

interface IProps {
  router: Router;
}

class InfoPageComponent extends Component<IProps> {
  navigateToRegistrationPage = () => {
    this.props.router.navigate(RouteNames[RouteNameChoices.registration], {
      ref: "rrreeef",
    });
  };

  render() {
    return (
      <Fragment>
        <div className={styles.pageWrapper}>
          <div className={styles.info}>
            <div className={styles.wrapperInfo}>
              <div className={styles.leftSide}>
                <span className={styles.mainText}>
                  Коммуна для <br /> продвижения <br /> и монетизации
                </span>
                <span className={styles.additionalText}>
                  Продвижение и монетизация <br /> в ведущих социальных сетях
                </span>
                <div className={styles.buttonWrapper}>
                  <Button
                    text={"Начать работу"}
                    color={Button.Color.red}
                    onClick={this.navigateToRegistrationPage}
                  />
                </div>
              </div>
            </div>
            <div className={styles.rightSide}>
              <img src={phoneImg} alt="phone" className={styles.phone} />
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.leftSide}>
              <span className={styles.mainText}>
                Более 100.000 <br /> пользователей <br /> уже доверяют нам
              </span>
              <span className={styles.additionalText}>
                Станьте частью нашей закрытой <br /> коммуны прямо сейчас
              </span>
              <div className={styles.buttonWrapper2}>
                <Button
                  text={"Бесплатная регистрация"}
                  color={Button.Color.red}
                  onClick={this.navigateToRegistrationPage}
                />
              </div>
            </div>
            <div className={styles.rightSide}>
              <img src={facesImg} alt="people faces" className={styles.faces} />
            </div>
          </div>

          <div className={styles.targetAudience}>
            <div className={styles.title}>Кому подойдет сервис?</div>
            <div className={styles.description}>
              Каждому, кто ежедневно использует социальные сети для личных или
              коммерческих <br /> целей и желает увеличить активность аккаунта.
            </div>
            <div className={styles.audienceFaces}>
              <div className={classNames(styles.face, styles.darkBlue)}>
                <div className={styles.content}>
                  <img src={face1} className={styles.img} alt={"face"} />
                  <div>
                    Личные <br /> аккаунты
                  </div>
                </div>
              </div>
              <div className={classNames(styles.face, styles.blue)}>
                <div className={styles.content}>
                  <img src={face2} className={styles.img} alt={"face"} />
                  <div>
                    Бизнес <br /> аккаунты
                  </div>
                </div>
              </div>
              <div className={classNames(styles.face, styles.red)}>
                <div className={styles.content}>
                  <img src={face3} className={styles.img} alt={"face"} />
                  <div>Блоггеры</div>
                </div>
              </div>
              <div className={classNames(styles.face, styles.orange)}>
                <div className={styles.content}>
                  <img src={face4} className={styles.img} alt={"face"} />
                  <div>
                    SMM <br /> менеджеры
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.partners}>
          <div className={styles.pageWrapper}>
            <div className={styles.partnersInner}>
              <div className={styles.title}>Партнеры</div>
              <div className={styles.content}>
                <div>
                  <a href="https://myum.ma" target="_blank">
                    <img src={MM} alt="partner" />
                  </a>
                </div>
                <div>
                  <a href="https://streampublic.ru" target="_blank">
                    <img src={SP} alt="partner" />
                  </a>
                </div>
                <div>
                  <a href="https://wandigroup.ru" target="_blank">
                    <img src={WG} alt="partner" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export const InfoPage = withRoute(({ router }) => (
  <InfoPageComponent router={router} />
));
