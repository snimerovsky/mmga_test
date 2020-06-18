import cookie from "js-cookie";
import React from "react";
import { Route } from "react-router5";
import { RouteNameChoices, RouteNames } from "../router";

interface IProps {
  children?: (props: { onClick: any }) => JSX.Element;
}

export function Logout(props: IProps) {
  const Children = props.children!;
  return (
    <Route>
      {({ router }) => (
        <Children
          onClick={() => {
            cookie.remove("ssid2");
            router.navigate(RouteNames[RouteNameChoices.home]);
          }}
        />
      )}
    </Route>
  );
}
