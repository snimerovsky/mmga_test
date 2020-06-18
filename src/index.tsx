import { configure as configureMobx } from "mobx";
import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router5";
import { Provider as MobxProvider } from "mobx-react";
import { App } from "./app";
import "./styles/index.scss";
import { router } from "./app/modules/router";
import { store } from "./app/store";
import * as serviceWorker from "./serviceWorker";

configureMobx({ enforceActions: "observed" });

ReactDOM.render(
  <RouterProvider router={router}>
    <MobxProvider {...store}>
      <App />
    </MobxProvider>
  </RouterProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
