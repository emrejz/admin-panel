import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

import App from "./components/app";
import store from "./store";

import "./index.scss";

ReactDOM.render(
  <SWRConfig
    value={{
      refreshInterval: 3000,
      fetcher: (resource, init) =>
        fetch(resource, init).then((res) => res.json()),
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </SWRConfig>,
  document.getElementById("root")
);
