import classNames from "classnames";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { withRoute } from "react-router5";
import { Route, Router } from "router5";
import { Header } from "../../../ui/header";
import { RouteNameChoices, RouteNames } from "../router";
import { AuthForm } from "./AuthForm";
import styles from "./AuthorizationPage.module.scss";
import { RegistrationForm } from "./RegistrationForm";
import { SecretRegistrationForm } from "./SecretRegistrationForm";
import { RestoringForm } from "./RestoringForm";

interface IProps {
  route: Route;
  router: Router;
}

@observer
class AuthorizationPageComponent extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.active = this.props.route.name;
  }

  componentDidMount(): void {
    const bodyEl = document.querySelector("body")!;
    if (bodyEl.classList.contains("is-landing")) {
      bodyEl.classList.remove("is-landing");
    }
  }

  @observable
  active: string;

  renderComponentByRoute(routeName: string) {
    if (routeName === RouteNames[RouteNameChoices.authorization]) {
      return <AuthForm />;
    }
    if (
      routeName === RouteNames[RouteNameChoices.registration] ||
      routeName === RouteNames[RouteNameChoices.registrationRef]
    ) {
      return <RegistrationForm />;
    }
    if (routeName === RouteNames[RouteNameChoices.secretRegistration]) {
      return <SecretRegistrationForm />;
    }
    return "Not found";
  }

  onTabClick = (tab: string) =>
    action(() => {
      this.active = tab;
      this.props.router.navigate(tab);
    });

  render() {
    const {
      route,
      route: { path },
    } = this.props;

    return (
      <div className={styles.AuthorizationPage}>
        <Header />
        <main>
          <div className={styles.tabs}>
            <div
              className={classNames(styles.tabItem, {
                [styles.active]:
                  this.active === RouteNames[RouteNameChoices.authorization],
                [styles.hidden]:
                  route.name === RouteNameChoices.registrationRef,
              })}
              onClick={this.onTabClick(
                RouteNames[RouteNameChoices.authorization]
              )}
            >
              Авторизация
            </div>

            <div
              className={classNames(styles.tabItem, {
                [styles.active]:
                  this.active === RouteNames[RouteNameChoices.registration] ||
                  path.indexOf(RouteNames[RouteNameChoices.registration]) > -1,
                [styles.center]:
                  this.active === RouteNames[RouteNameChoices.registrationRef],
              })}
              onClick={this.onTabClick(
                RouteNames[RouteNameChoices.registration]
              )}
            >
              Регистрация
            </div>
          </div>
          <div className={styles.formWrapper}>
            {this.renderComponentByRoute(route.name)}
          </div>
        </main>
      </div>
    );
  }
}

export const AuthorizationPage = withRoute(({ route, router }) => (
  <AuthorizationPageComponent router={router} route={route} />
));
