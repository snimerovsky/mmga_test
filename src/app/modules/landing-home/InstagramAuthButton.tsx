import React, { Component } from "react";
import { Api } from "../../../api";
import { withApi } from "../../../api/withApi";
import { Button } from "../../../ui/button";
import styles from "./LandingHomePage.module.scss";

interface IProps {
  api?: Api;
}

@withApi
export class InstagramAuthButton extends Component<IProps> {
  onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.location.href = this.props.api!.getInstagramAuthRedirectUrl();
  };

  render() {
    return (
      <div className={styles.connectButtonWrapper}>
        <Button text={"Подключить"} type={"button"} onClick={this.onClick}/>
      </div>
    );
  }
}
