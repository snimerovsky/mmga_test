import React, { useEffect } from "react";
import { Logo } from "../../../assets/icons";
import { withRoute } from "react-router5";
import "./Dashboard.scss";
import Header from "./containers/Header";
import Sidebar from "./components/Sidebar";
import { RouteNameChoices, RouteNames } from "../router";

import { Col, Row } from "antd";

export const Dashboard = ({ children, user, router }: any) => {
  return (
    <div className="Dashboard-Container">
      <div className="Dashboard-Container_wrapper">
        <Row>
          <Col className="Dashboard-Container_wrapper_Logo" md={5}>
            <Logo
              onClick={() => {
                router.navigate(RouteNames[RouteNameChoices.home]);
              }}
            />
          </Col>

          <Col md={19}>
            <Header user={user}></Header>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
            <Sidebar />
          </Col>
          <Col className="Dashboard-Container_Content" md={19}>
            {children}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withRoute(Dashboard);
