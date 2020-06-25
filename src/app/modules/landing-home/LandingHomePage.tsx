import { inject } from "mobx-react";
import React, { Component } from "react";
import { withRoute } from "react-router5";
import { Route, Router } from "router5";
import { Button } from "../../../ui/button";
import { Footer } from "../../../ui/footer";
import { Header } from "../../../ui/header";
import { IStore } from "../../store";
import { AuthStore } from "../authorization/stores/AuthStore";
import { RouteNameChoices, RouteNames } from "../router";
import { InfoPage } from "./InfoPage";
import styles from "./LandingHomePage.module.scss";
import { ProfileRegistrationForm } from "./ProfileRegistrationForm";
import Rules from "./Rules";

interface IProps {
  router: Router;
  route: Route;
  authStore?: AuthStore;
}

const Content = (props: { routeName: string }) => {
  const { routeName } = props;

  if (routeName === RouteNames[RouteNameChoices.home]) {
    return <InfoPage />;
  }
  if (routeName === RouteNames[RouteNameChoices.profileRegistrationForm]) {
    return <ProfileRegistrationForm />;
  }
  return null;
};

@inject(({ authStore }: IStore) => ({ authStore }))
class LandingHomePageComponent extends Component<IProps> {
  componentDidMount(): void {
    const bodyEl = document.querySelector("body")!;
    bodyEl.classList.add("is-landing");
  }

  navigateToRegistrationPage = () => {
    const { router } = this.props;

    const authStore = this.props.authStore!;
    if (authStore.isLoggedIn() && authStore.isProfileFormFilled()) {
      router.navigate(RouteNames[RouteNameChoices.assignments]);
    }
    if (authStore.isLoggedIn() && !authStore.isProfileFormFilled()) {
      router.navigate(RouteNames[RouteNameChoices.profileRegistrationForm]);
    }
    if (!authStore.isLoggedIn()) {
      router.navigate(RouteNames[RouteNameChoices.authorization]);
    }
  };

  render() {
    const {
      route,
      route: { path },
    } = this.props;
    return (
      <div className={styles.LandingHomePage}>
        <div className={styles.pageWrapper}>
          <div className={styles.headerWrapper}>
            <Header />

            {path === "/profile-form" ? null : (
              <div className={styles.accountButtonWrapper}>
                <div className={styles.accountButton}>
                  <Button
                    text={"Личный кабинет"}
                    onClick={this.navigateToRegistrationPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <Content routeName={route.name} />
        <Footer />
      </div>
    );
  }
}

export const LandingHomePage = withRoute(({ router, route }) => (
  <LandingHomePageComponent router={router} route={route} />
));
