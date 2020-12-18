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
        fetch(process.env.REACT_APP_CUSTOMER_PRODUCT_API + resource, init).then(
          async (res) => {
            if (!res.ok) {
              let error = new Error(
                "An error occurred while fetching the data."
              );
              // Attach extra info to the error object.
              const err = await res.json();
              if (err.error)
                error = {
                  ...error,
                  ...err.error,
                };
              throw error;
            }
            return res.json();
          }
        ),
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </SWRConfig>,
  document.getElementById("root")
);
