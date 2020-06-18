import React from "react";
import { withRoute } from "react-router5";
import { Router } from "router5";
import { RouteNameChoices, RouteNames } from "../../app/modules/router";
import logo from "../../styles/sources/images/logo.svg";
import styles from "./index.module.scss";

interface IProps {
  router: Router;
}

const LogoComponent = (props: IProps) => (
  <img
    onClick={() => {
      props.router.navigate(RouteNames[RouteNameChoices.home]);
    }}
    src={logo}
    alt="logo"
    className={styles.Logo}
  />
);

export const Logo = withRoute(({ router }) => <LogoComponent router={router} />);
